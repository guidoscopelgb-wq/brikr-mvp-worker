import { chromium } from "playwright";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });

await page.goto("http://127.0.0.1:8791/", { waitUntil: "domcontentloaded" });
await page.getByRole("button", { name: "Comenzar gratis" }).click();
await page.getByLabel("Email").fill("demo@gbconstruction.app");
await page.getByLabel("Contrasena").fill("demo1234");
await page.getByRole("button", { name: "Entrar al dashboard" }).click();
const projectForm = page.locator('form[data-form="obra"]');
await projectForm.getByLabel("Nombre").fill("Obra Demo Palermo");
await projectForm.getByLabel("Cliente").fill("Cliente MVP");
await projectForm.getByLabel("Estado").selectOption("En obra");
await projectForm.getByLabel("Avance fisico %").fill("28");
await projectForm.getByLabel("Presupuesto").fill("1200000");
await projectForm.getByRole("button", { name: "Crear obra" }).click();
await page.getByRole("button", { name: "Materiales" }).click();
const materialForm = page.locator('form[data-form="material"]');
await materialForm.getByLabel("Obra").selectOption({ label: "Obra Demo Palermo" });
await materialForm.getByLabel("Material o remito").fill("Ladrillo hueco 12");
await materialForm.getByLabel("Proveedor").fill("Corralon Demo");
await materialForm.getByLabel("Cantidad").fill("900");
await materialForm.getByLabel("Costo estimado").fill("780000");
await materialForm.getByLabel("Estado").selectOption("Aprobado");
await materialForm.getByRole("button", { name: "Guardar material" }).click();
await page.screenshot({ path: "artifacts/gb-construction-dashboard.png", fullPage: true });

const dashboardVisible = await page.getByText("Obra Demo Palermo").count();
const materialVisible = await page.getByText("Ladrillo hueco 12").count();

await browser.close();

if (!dashboardVisible || !materialVisible) {
  throw new Error("Smoke test failed: expected dashboard records were not visible.");
}

console.log("Smoke test passed");
