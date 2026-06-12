# GB Construction Assistant

MVP de gestion de obras servido por un Cloudflare Worker.

Produccion: https://gb-construction-assistant.guidoscopel-gb.workers.dev

## Funcionalidad

- Landing en español para profesionales de la construcción.
- Login/registro simulado.
- Dashboard con métricas consolidadas del estudio y las obras.
- Presupuestos editables tipo planilla, duplicables y convertibles en obra.
- Seguimiento por obra basado en certificaciones, cobros, gastos y desvíos.
- Estados sensibles de certificaciones y gastos con confirmación adicional.
- Materiales reales integrados como gastos de obra, sin módulo duplicado.
- Catálogos editables de categorías y subcategorías para obra y estudio.
- Finanzas administrativas del estudio separadas de los costos de obra.
- Equipo activo/inactivo con asignaciones y tareas específicas por obra.
- Persistencia local en el navegador con `localStorage`.

## Acceso MVP

- Usuario: `test@test`
- Contrasena: `GB2026`

## Desarrollo

```bash
npm install
npm run dev
```

## Deploy

```bash
npm run deploy
```
