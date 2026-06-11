from pathlib import Path
from playwright.sync_api import sync_playwright, expect

root = Path(__file__).resolve().parents[1]
artifacts = root / "artifacts"
artifacts.mkdir(exist_ok=True)

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1440, "height": 1000})
    page.goto("http://127.0.0.1:8792", wait_until="networkidle")

    page.get_by_role("button", name="Comenzar gratis").click()
    page.get_by_label("Email").fill("demo@gbconstruction.app")
    page.get_by_label("Contrasena").fill("demo1234")
    page.get_by_role("button", name="Entrar al dashboard").click()
    expect(page.get_by_role("heading", name="Obras", exact=True)).to_be_visible()

    page.locator('form[data-form="obra"]').get_by_label("Nombre").fill("Centro Medico Palermo")
    page.locator('form[data-form="obra"]').get_by_label("Cliente").fill("Salud Urbana")
    page.locator('form[data-form="obra"]').get_by_label("Estado").select_option("En obra")
    page.locator('form[data-form="obra"]').get_by_label("Avance fisico %").fill("26")
    page.locator('form[data-form="obra"]').get_by_label("Presupuesto").fill("32000000")
    page.locator('form[data-form="obra"]').get_by_role("button", name="Crear obra").click()
    expect(page.get_by_text("Centro Medico Palermo", exact=True)).to_be_visible()

    project = page.locator(".project-row").filter(has_text="Centro Medico Palermo")
    project.get_by_role("button", name="Seguimiento").click()
    expect(page.get_by_role("heading", name="Centro Medico Palermo")).to_be_visible()

    certificate = page.locator('form[data-form="certificate"]')
    certificate.get_by_label("Periodo").fill("2026-06")
    certificate.get_by_label("Porcentaje").fill("15")
    certificate.get_by_label("Concepto").fill("Hormigon armado planta baja")
    certificate.get_by_label("Monto").fill("4200000")
    certificate.get_by_label("Estado").select_option("Presentada")
    certificate.get_by_role("button", name="Agregar certificacion").click()
    expect(page.get_by_text("Hormigon armado planta baja")).to_be_visible()

    expense = page.locator('form[data-form="project-expense"]')
    expense.get_by_label("Categoria").select_option("Subcontratos")
    expense.get_by_label("Concepto").fill("Instalacion sanitaria inicial")
    expense.get_by_label("Monto").fill("780000")
    expense.get_by_label("Estado").select_option("Pagado")
    expense.get_by_role("button", name="Agregar gasto").click()
    expect(page.get_by_text("Instalacion sanitaria inicial")).to_be_visible()
    page.screenshot(path=str(artifacts / "gb-project-tracking.png"), full_page=True)
    page.get_by_role("button", name="Cerrar", exact=True).click()

    page.get_by_role("button", name="Materiales").click()
    material = page.locator('form[data-form="material"]')
    material.get_by_label("Obra").select_option(label="Centro Medico Palermo")
    material.get_by_label("Material o remito").fill("Canos termofusion")
    material.get_by_label("Proveedor").fill("Sanitarios Sur")
    material.get_by_label("Cantidad").fill("80")
    material.get_by_label("Costo estimado").fill("440000")
    material.get_by_label("Estado").select_option("Aprobado")
    material.get_by_role("button", name="Guardar material").click()
    expect(page.get_by_text("Canos termofusion")).to_be_visible()

    page.get_by_role("button", name="Estudio").click()
    finance = page.locator('form[data-form="finance"]')
    finance.get_by_label("Tipo").select_option("Egreso")
    finance.get_by_label("Categoria").fill("Impuestos")
    finance.get_by_label("Concepto").fill("Anticipo ganancias estudio")
    finance.get_by_label("Monto").fill("350000")
    finance.get_by_label("Estado").select_option("Pagado")
    finance.get_by_role("button", name="Guardar movimiento").click()
    expect(page.get_by_text("Anticipo ganancias estudio")).to_be_visible()

    page.get_by_role("button", name="Equipo").click()
    person = page.locator('form[data-form="person"]')
    person.get_by_label("Nombre").fill("Laura Gomez")
    person.get_by_label("Rol").fill("Directora de obra")
    person.get_by_label("Torre Belgrano").check()
    person.get_by_label("Centro Medico Palermo").check()
    person.get_by_role("button", name="Guardar integrante").click()
    expect(page.get_by_text("Laura Gomez")).to_be_visible()
    page.screenshot(path=str(artifacts / "gb-integral-dashboard.png"), full_page=True)

    mobile = browser.new_page(viewport={"width": 390, "height": 844}, is_mobile=True)
    mobile.goto("http://127.0.0.1:8792", wait_until="networkidle")
    mobile.evaluate("localStorage.setItem('gb-construction-user', 'mobile@test.com')")
    mobile.reload(wait_until="networkidle")
    expect(mobile.get_by_role("heading", name="Obras", exact=True)).to_be_visible()
    mobile.screenshot(path=str(artifacts / "gb-integral-mobile.png"), full_page=True)

    browser.close()

print("Integral workflow check passed")
