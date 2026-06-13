from pathlib import Path
from playwright.sync_api import sync_playwright, expect

root = Path(__file__).resolve().parents[1]
artifacts = root / "artifacts"
artifacts.mkdir(exist_ok=True)

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1440, "height": 1000})
    console_errors = []
    page.on("console", lambda message: console_errors.append(message.text) if message.type == "error" else None)
    page.on("pageerror", lambda error: console_errors.append(str(error)))
    page.goto("http://127.0.0.1:8792", wait_until="domcontentloaded")
    page.wait_for_load_state("load")

    page.get_by_role("button", name="Comenzar gratis").click()
    expect(page.get_by_label("Email")).to_have_value("")
    expect(page.get_by_label("Contrasena")).to_have_value("")
    assert page.get_by_label("Email").get_attribute("placeholder") is None
    assert page.get_by_label("Contrasena").get_attribute("placeholder") is None
    page.get_by_label("Email").fill("test@test")
    page.get_by_label("Contrasena").fill("incorrecta")
    page.get_by_role("button", name="Entrar al dashboard").click()
    expect(page.get_by_role("alert")).to_contain_text("incorrectos")
    page.get_by_label("Contrasena").fill("GB2026")
    page.get_by_role("button", name="Entrar al dashboard").click()
    expect(page.get_by_role("heading", name="Obras", exact=True)).to_be_visible()
    initial_state = page.evaluate("fetch('/api/state').then(response => response.json()).then(payload => payload.state)")
    for collection in ["obras", "presupuestos", "certificaciones", "gastosObra", "finanzasEstudio", "equipo"]:
        assert initial_state[collection] == [], f"{collection} should start empty"
    assert len(initial_state["usuarios"]) == 1
    assert initial_state["usuarios"][0]["email"] == "test@test"
    assert page.evaluate("localStorage.length") == 0

    # Presupuesto editable.
    page.get_by_role("button", name="Presupuestos").click()
    budget = page.locator('form[data-form="budget"]')
    budget.get_by_label("Nombre").fill("Presupuesto Centro Medico")
    budget.get_by_label("Cliente").fill("Salud Urbana")
    budget.get_by_label("Estado").select_option("Aprobado")
    budget.get_by_role("button", name="Crear presupuesto").click()
    row = page.locator("tr").filter(has_text="Presupuesto Centro Medico")
    row.get_by_role("button", name="Editar planilla").click()
    for description, quantity, unit, price in [
        ("Cemento Portland", "120", "bolsas", "8500"),
        ("Arena gruesa", "15", "m3", "32000"),
        ("Cal hidratada", "60", "bolsas", "6200"),
    ]:
        page.get_by_role("button", name="Agregar subitem").click()
        sheet_row = page.locator("[data-budget-item]").last
        sheet_row.locator('[data-budget-field="certificado"]').fill("1")
        sheet_row.locator('[data-budget-field="tipo"]').select_option("Material")
        sheet_row.locator('[data-budget-field="descripcion"]').fill(description)
        sheet_row.locator('[data-budget-field="cantidad"]').fill(quantity)
        sheet_row.locator('[data-budget-field="unidad"]').fill(unit)
        sheet_row.locator('[data-budget-field="precioUnitario"]').fill(price)
        sheet_row.locator('[data-budget-field="dias"]').fill("15")
        sheet_row.locator('[data-budget-field="dias"]').press("Tab")
    descriptions = page.locator('[data-budget-field="descripcion"]')
    expect(descriptions).to_have_count(3)
    assert [descriptions.nth(index).input_value() for index in range(3)] == ["Cemento Portland", "Arena gruesa", "Cal hidratada"]
    page.screenshot(path=str(artifacts / "gb-budget-subitems.png"), full_page=True)
    page.get_by_role("button", name="Cerrar", exact=True).click()

    # Obra creada desde presupuesto.
    page.get_by_role("button", name="Obras").click()
    project_form = page.locator('form[data-form="obra"]')
    project_form.get_by_label("Origen").select_option("presupuesto")
    project_form.get_by_label("Presupuesto existente").select_option(index=1)
    project_form.get_by_label("Estado").select_option("En obra")
    project_form.get_by_role("button", name="Crear obra").click()
    expect(page.get_by_text("Centro Medico", exact=True)).to_be_visible()
    page.screenshot(path=str(artifacts / "gb-project-list.png"), full_page=True)

    project = page.locator(".project-row").filter(has_text="Centro Medico")
    project.get_by_role("button", name="Seguimiento").click()

    # Certificacion real y gasto presupuestado.
    certificate = page.locator('form[data-form="certificate"]')
    certificate.get_by_label("Periodo").fill("2026-06")
    certificate.get_by_label("Certificacion presupuestada").select_option("1")
    certificate.get_by_label("Concepto").fill("Certificado estructura PB")
    certificate.get_by_label("Origen de subitems").select_option("presupuesto")
    expect(certificate.locator("[data-certificate-subitem]")).to_have_count(3)
    certificate.locator('select[name="estado"]').select_option("Pendiente de aprobacion")
    certificate.get_by_role("button", name="Agregar certificacion").click()
    expect(page.get_by_text("Certificado estructura PB")).to_be_visible()
    expect(page.get_by_text("Cemento Portland", exact=True)).to_be_visible()
    expect(page.get_by_text("Arena gruesa", exact=True)).to_be_visible()
    expect(page.get_by_text("Cal hidratada", exact=True)).to_be_visible()

    expense = page.locator('form[data-form="project-expense"]')
    expense.locator('select[name="categoria"]').select_option("Materiales")
    expense.locator('select[name="subcategoria"]').select_option("Hierro y estructura")
    expense.get_by_label("Descripcion").fill("Compra hierro estructura")
    expense.get_by_label("Monto").fill("2100000")
    expense.locator('select[name="estado"]').select_option("Pendiente de pago")
    expense.get_by_label("Corresponde al presupuesto").check()
    budget_item_select = expense.get_by_label("Item presupuestado")
    expect(budget_item_select.locator("option")).to_have_count(4)
    budget_item_select.select_option(index=1)
    expense.get_by_role("button", name="Agregar gasto").click()
    expect(page.get_by_text("Compra hierro estructura")).to_be_visible()

    # Cambio de estado con confirmacion adicional.
    page.locator("[data-certificate-status]").select_option("Aprobada")
    expect(page.get_by_role("heading", name="Confirmar cambio")).to_be_visible()
    page.get_by_role("button", name="Confirmar").click()
    page.eval_on_selector("#projectDetail", "element => element.scrollTop = 0")
    page.screenshot(path=str(artifacts / "gb-project-control.png"), full_page=True)
    page.get_by_role("button", name="Cerrar", exact=True).click()

    # Usuario supervisor separado del equipo y limitado a una sola obra.
    page.get_by_role("button", name="Usuarios").click()
    user = page.locator('form[data-form="user"]')
    user.get_by_label("Nombre").fill("Supervisor Centro")
    user.get_by_label("Email").fill("supervisor@test")
    user.get_by_label("Contrasena").fill("SUP2026")
    user.get_by_label("Tipo de usuario").select_option("Supervisor")
    user.get_by_label("Centro Medico").check()
    user.get_by_role("button", name="Crear usuario").click()
    expect(page.get_by_text("Supervisor Centro")).to_be_visible()
    page.screenshot(path=str(artifacts / "gb-users-permissions.png"), full_page=True)

    # Finanzas del estudio y catalogo editable.
    page.get_by_role("button", name="Estudio").click()
    finance = page.locator('form[data-form="finance"]')
    finance.get_by_label("Tipo").select_option("Egreso")
    finance.locator('select[name="categoria"]').select_option("Administracion")
    finance.locator('select[name="subcategoria"]').select_option("Impuestos")
    finance.get_by_label("Descripcion").fill("Anticipo ganancias")
    finance.get_by_label("Monto").fill("350000")
    finance.locator('select[name="estado"]').select_option("Pagado")
    finance.get_by_role("button", name="Guardar movimiento").click()
    expect(page.get_by_text("Anticipo ganancias")).to_be_visible()

    # Equipo con tareas por obra.
    page.get_by_role("button", name="Equipo").click()
    person = page.locator('form[data-form="person"]')
    person.get_by_label("Nombre").fill("Laura Gomez")
    person.get_by_label("Rol").fill("Directora de obra")
    person.get_by_label("Centro Medico").check()
    person.get_by_role("button", name="Guardar integrante").click()
    row = page.locator("tr").filter(has_text="Laura Gomez")
    row.get_by_role("button", name="Editar").click()
    task_input = page.locator("[data-person-task]").first
    task_input.fill("Control de certificacion")
    task_input.press("Tab")
    assert task_input.input_value() == "Control de certificacion"
    page.screenshot(path=str(artifacts / "gb-team-tasks.png"), full_page=True)
    page.get_by_role("button", name="Cerrar", exact=True).click()

    # Validacion integral del rol Supervisor.
    page.get_by_role("button", name="Cerrar sesion").click()
    page.get_by_role("button", name="Iniciar sesion", exact=True).first.click()
    page.get_by_label("Email").fill("supervisor@test")
    page.get_by_label("Contrasena").fill("SUP2026")
    page.get_by_role("button", name="Entrar al dashboard").click()
    expect(page.get_by_role("button", name="Presupuestos")).to_have_count(0)
    expect(page.get_by_role("button", name="Estudio")).to_have_count(0)
    expect(page.get_by_role("button", name="Usuarios")).to_have_count(0)
    supervisor_project = page.locator(".project-row").filter(has_text="Centro Medico")
    expect(supervisor_project).to_be_visible()
    expect(page.locator("#projectList").get_by_text("Torre Belgrano", exact=True)).to_have_count(0)
    supervisor_project.get_by_role("button", name="Seguimiento").click()
    expect(page.get_by_text("Monto cotizado")).to_have_count(0)
    expect(page.get_by_text("Disponible contra cotizado")).to_have_count(0)

    supervisor_certificate = page.locator('form[data-form="certificate"]')
    supervisor_certificate.get_by_label("Periodo").fill("2026-07")
    supervisor_certificate.get_by_label("Concepto").fill("Certificado supervisor")
    first_subitem = supervisor_certificate.locator("[data-certificate-subitem]")
    first_subitem.locator('[data-subitem-field="descripcion"]').fill("Cemento adicional")
    first_subitem.locator('[data-subitem-field="cantidad"]').fill("20")
    first_subitem.locator('[data-subitem-field="unidad"]').fill("bolsas")
    first_subitem.locator('[data-subitem-field="precioUnitario"]').fill("9000")
    supervisor_certificate.get_by_role("button", name="Agregar subitem").click()
    second_subitem = supervisor_certificate.locator("[data-certificate-subitem]").last
    second_subitem.locator('[data-subitem-field="tipo"]').select_option("Material")
    second_subitem.locator('[data-subitem-field="descripcion"]').fill("Arena fina")
    second_subitem.locator('[data-subitem-field="cantidad"]').fill("4")
    second_subitem.locator('[data-subitem-field="unidad"]').fill("m3")
    second_subitem.locator('[data-subitem-field="precioUnitario"]').fill("35000")
    supervisor_certificate.get_by_role("button", name="Agregar certificacion").click()
    cert_row = page.locator("[data-cert-row]").filter(has_text="Certificado supervisor")
    expect(cert_row).to_contain_text("Pendiente de aprobacion")
    expect(cert_row).to_contain_text("2 subitems")

    supervisor_expense = page.locator('form[data-form="project-expense"]')
    supervisor_expense.get_by_label("Descripcion").fill("Compra urgente supervisor")
    supervisor_expense.get_by_label("Monto").fill("180000")
    supervisor_expense.locator('select[name="estado"]').select_option("Pagado")
    supervisor_expense.get_by_role("button", name="Agregar gasto").click()
    expect(page.get_by_text("Compra urgente supervisor")).to_be_visible()
    page.screenshot(path=str(artifacts / "gb-supervisor-project.png"), full_page=True)
    page.get_by_role("button", name="Cerrar", exact=True).click()
    page.get_by_role("button", name="Equipo").click()
    expect(page.get_by_text("Solo lectura", exact=True)).to_be_visible()
    expect(page.get_by_role("button", name="Editar")).to_have_count(0)
    expect(page.get_by_role("button", name="Guardar integrante")).to_have_count(0)

    mobile = browser.new_page(viewport={"width": 390, "height": 844}, is_mobile=True)
    mobile.goto("http://127.0.0.1:8792", wait_until="domcontentloaded")
    mobile.wait_for_load_state("load")
    mobile.get_by_role("button", name="Iniciar sesion", exact=True).first.click()
    mobile.get_by_label("Email").fill("test@test")
    mobile.get_by_label("Contrasena").fill("GB2026")
    mobile.get_by_role("button", name="Entrar al dashboard").click()
    expect(mobile.get_by_role("heading", name="Obras", exact=True)).to_be_visible()
    mobile.screenshot(path=str(artifacts / "gb-integral-mobile.png"), full_page=True)

    unexpected_errors = [message for message in console_errors if "401 (Unauthorized)" not in message]
    assert not unexpected_errors, "Browser errors: " + " | ".join(unexpected_errors)
    browser.close()

print("Expanded workflow check passed")
