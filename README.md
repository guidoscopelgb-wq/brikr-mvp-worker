# GB Construction Assistant

MVP de gestion integral de estudios y obras servido por un Cloudflare Worker.

Produccion: https://gb-construction-assistant.guidoscopel-gb.workers.dev

## Funcionalidad

- Dashboard con metricas consolidadas del estudio y las obras.
- Presupuestos editables por certificacion, con multiples items o subitems.
- Conversion de presupuestos aprobados en obras.
- Certificaciones de obra con multiples materiales, trabajos o conceptos.
- Importacion de los subitems presupuestados al certificar una obra.
- Gastos de obra pendientes o pagados, con categorias y subcategorias.
- Finanzas administrativas del estudio separadas de los costos de obra.
- Equipo con asignacion simultanea a varias obras y tareas por proyecto.
- Modulo independiente para crear usuarios y configurar permisos.
- Rol Propietario con acceso total.
- Rol Supervisor con acceso limitado a las obras habilitadas, carga de gastos,
  certificaciones pendientes de aprobacion y consulta del equipo asignado.
- Persistencia local en el navegador con `localStorage`.

## Acceso MVP

- Usuario propietario: `test@test`
- Contrasena: `GB2026`

Los usuarios adicionales se crean desde el modulo `Usuarios`.

## Desarrollo

```bash
npm install
npm run dev
```

## Verificacion

```bash
npm run typecheck
# Con Wrangler activo en el puerto 8791:
node scripts/smoke.mjs
# Con Wrangler activo en el puerto 8792:
python scripts/visual_check.py
```

## Deploy

```bash
npm run deploy
```

## Alcance de seguridad

Este MVP guarda datos, usuarios y contrasenas en el almacenamiento local del
navegador. Para un uso productivo multiusuario se requiere autenticacion del
lado servidor, base de datos y control de permisos en la API.
