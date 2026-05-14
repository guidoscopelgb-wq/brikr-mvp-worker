import { chromium } from "playwright";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });

await page.goto("http://127.0.0.1:8791/", { waitUntil: "domcontentloaded" });
await page.getByRole("button", { name: "Comenzar gratis" }).click();
await page.getByLabel("Email").fill("demo@brikr.app");
await page.getByLabel("Contrasena").fill("demo1234");
await page.getByRole("button", { name: "Entrar al dashboard" }).click();
await page.getByLabel("Nombre").fill("Obra Demo Palermo");
await page.getByLabel("Cliente").fill("Cliente MVP");
await page.getByLabel("Estado").fill("En obra");
await page.getByLabel("Avance %").fill("28");
await page.getByLabel("Presupuesto").fill("1200000");
await page.getByRole("button", { name: "Guardar" }).click();
await page.getByRole("button", { name: "Materiales" }).click();
await page.getByLabel("Obra").fill("Obra Demo Palermo");
await page.getByLabel("Material o remito").fill("Ladrillo hueco 12");
await page.getByLabel("Cantidad").fill("900");
await page.getByLabel("Estado").fill("Solicitado");
await page.getByRole("button", { name: "Guardar" }).click();
await page.screenshot({ path: "artifacts/brikr-dashboard.png", fullPage: true });

const dashboardVisible = await page.getByText("Obra Demo Palermo").count();
const materialVisible = await page.getByText("Ladrillo hueco 12").count();

await browser.close();

if (!dashboardVisible || !materialVisible) {
  throw new Error("Smoke test failed: expected dashboard records were not visible.");
}

console.log("Smoke test passed");
