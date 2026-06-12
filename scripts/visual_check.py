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
    page.get_by_label("Email").fill("test@test")
    page.get_by_label("Contrasena").fill("incorrecta")
    page.get_by_role("button", name="Entrar al dashboard").click()
    expect(page.get_by_role("alert")).to_contain_text("incorrectos")
    page.get_by_label("Contrasena").fill("GB2026")
    page.get_by_role("button", name="Entrar al dashboard").click()
    expect(page.get_by_role("heading", name="Obras", exact=True)).to_be_visible()

    # Presupuesto editable.
    page.get_by_role("button", name="Presupuestos").click()
    budget = page.locator('form[data-form="budget"]')
    budget.get_by_label("Nombre").fill("Presupuesto Centro Medico")
    budget.get_by_label("Cliente").fill("Salud Urbana")
    budget.get_by_label("Estado").select_option("Aprobado")
    budget.get_by_role("button", name="Crear presupuesto").click()
    row = page.locator("tr").filter(has_text="Presupuesto Centro Medico")
    row.get_by_role("button", name="Editar planilla").click()
    page.get_by_role("button", name="Agregar fila").click()
    sheet_row = page.locator("[data-budget-item]").last
    sheet_row.locator('[data-budget-field="certificado"]').fill("1")
    sheet_row.locator('[data-budget-field="trabajo"]').fill("Estructura planta baja")
    sheet_row.locator('[data-budget-field="manoObra"]').fill("Cuadrilla de hormigon")
    sheet_row.locator('[data-budget-field="materiales"]').fill("Hormigon y hierro")
    sheet_row.locator('[data-budget-field="montoManoObra"]').fill("1800000")
    sheet_row.locator('[data-budget-field="montoMateriales"]').fill("3200000")
    sheet_row.locator('[data-budget-field="montoDireccion"]').fill("500000")
    sheet_row.locator('[data-budget-field="dias"]').fill("35")
    sheet_row.locator('[data-budget-field="dias"]').press("Tab")
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
    certificate.get_by_label("Modo de monto").select_option("presupuesto")
    certificate.locator('select[name="estado"]').select_option("Presentada")
    certificate.get_by_role("button", name="Agregar certificacion").click()
    expect(page.get_by_text("Certificado estructura PB")).to_be_visible()

    expense = page.locator('form[data-form="project-expense"]')
    expense.locator('select[name="categoria"]').select_option("Materiales")
    expense.locator('select[name="subcategoria"]').select_option("Hierro y estructura")
    expense.get_by_label("Descripcion").fill("Compra hierro estructura")
    expense.get_by_label("Monto").fill("2100000")
    expense.locator('select[name="estado"]').select_option("Pendiente de pago")
    expense.get_by_label("Corresponde al presupuesto").check()
    budget_item_select = expense.get_by_label("Item presupuestado")
    expect(budget_item_select.locator("option")).to_have_count(2)
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
    person.get_by_label("Torre Belgrano").check()
    person.get_by_role("button", name="Guardar integrante").click()
    row = page.locator("tr").filter(has_text="Laura Gomez")
    row.get_by_role("button", name="Editar").click()
    page.locator('[data-person-task="obra-torre"]').fill("Control de certificacion")
    page.locator('[data-person-task="obra-torre"]').press("Tab")
    assert page.locator('[data-person-task="obra-torre"]').input_value() == "Control de certificacion"
    page.screenshot(path=str(artifacts / "gb-team-tasks.png"), full_page=True)

    mobile = browser.new_page(viewport={"width": 390, "height": 844}, is_mobile=True)
    mobile.goto("http://127.0.0.1:8792", wait_until="domcontentloaded")
    mobile.wait_for_load_state("load")
    mobile.evaluate("localStorage.setItem('gb-construction-user', 'test@test')")
    mobile.reload(wait_until="load")
    expect(mobile.get_by_role("heading", name="Obras", exact=True)).to_be_visible()
    mobile.screenshot(path=str(artifacts / "gb-integral-mobile.png"), full_page=True)

    assert not console_errors, "Browser errors: " + " | ".join(console_errors)
    browser.close()

print("Expanded workflow check passed")
