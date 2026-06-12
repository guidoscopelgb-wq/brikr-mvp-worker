import { chromium } from "playwright";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });

await page.goto("http://127.0.0.1:8791/", { waitUntil: "domcontentloaded" });
await page.getByRole("button", { name: "Comenzar gratis" }).click();
await page.getByLabel("Email").fill("test@test");
await page.getByLabel("Contrasena").fill("GB2026");
await page.getByRole("button", { name: "Entrar al dashboard" }).click();

await page.getByRole("button", { name: "Presupuestos" }).click();
const budgetForm = page.locator('form[data-form="budget"]');
await budgetForm.getByLabel("Nombre").fill("Presupuesto Demo Integral");
await budgetForm.getByLabel("Cliente").fill("Cliente MVP");
await budgetForm.getByRole("button", { name: "Crear presupuesto" }).click();
await page.getByText("Presupuesto Demo Integral", { exact: true }).waitFor();

await page.getByRole("button", { name: "Obras" }).click();
const projectForm = page.locator('form[data-form="obra"]');
await projectForm.getByLabel("Nombre").fill("Obra Demo Palermo");
await projectForm.getByLabel("Cliente").fill("Cliente MVP");
await projectForm.getByLabel("Estado").selectOption("En obra");
await projectForm.getByLabel("Monto total cotizado").fill("1200000");
await projectForm.getByRole("button", { name: "Crear obra" }).click();
await page.getByText("Obra Demo Palermo", { exact: true }).waitFor();

const project = page.locator(".project-row").filter({ hasText: "Obra Demo Palermo" });
await project.getByRole("button", { name: "Seguimiento" }).click();
const expense = page.locator('form[data-form="project-expense"]');
await expense.getByLabel("Descripcion").fill("Ladrillos huecos");
await expense.getByLabel("Monto").fill("780000");
await expense.getByRole("button", { name: "Agregar gasto" }).click();
await page.getByText("Ladrillos huecos", { exact: true }).waitFor();

await page.screenshot({ path: "artifacts/gb-construction-dashboard.png", fullPage: true });
await browser.close();

console.log("Smoke test passed");
