from pathlib import Path
from playwright.sync_api import sync_playwright, expect

root = Path(__file__).resolve().parents[1]
artifacts = root / "artifacts"
artifacts.mkdir(exist_ok=True)

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1440, "height": 1000})
    page.goto("http://127.0.0.1:8792", wait_until="networkidle")

    expect(page.get_by_role("heading", name="Gestiona tus obras sin papeles")).to_be_visible()
    expect(page.get_by_alt_text("Vista aerea de una obra en construccion")).to_be_visible()
    page.screenshot(path=str(artifacts / "gb-construction-landing.png"), full_page=True)

    page.get_by_role("button", name="Comenzar gratis").click()
    page.get_by_label("Email").fill("demo@gbconstruction.app")
    page.get_by_label("Contrasena").fill("demo1234")
    page.get_by_role("button", name="Entrar al dashboard").click()
    expect(page.get_by_role("heading", name="Obras", exact=True)).to_be_visible()

    page.get_by_label("Nombre").fill("Obra UI Palermo")
    page.get_by_label("Cliente").fill("Cliente UX")
    page.get_by_label("Estado").fill("En obra")
    page.get_by_label("Avance %").fill("34")
    page.get_by_label("Presupuesto").fill("2400000")
    page.get_by_role("button", name="Guardar").click()
    expect(page.get_by_text("Obra UI Palermo")).to_be_visible()
    page.screenshot(path=str(artifacts / "gb-construction-dashboard.png"), full_page=True)

    mobile = browser.new_page(viewport={"width": 390, "height": 844}, is_mobile=True)
    mobile.goto("http://127.0.0.1:8792", wait_until="networkidle")
    expect(mobile.get_by_role("heading", name="Gestiona tus obras sin papeles")).to_be_visible()
    mobile.screenshot(path=str(artifacts / "gb-construction-mobile.png"), full_page=True)

    browser.close()

print("Visual check passed")
