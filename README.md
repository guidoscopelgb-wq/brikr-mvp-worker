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
- Persistencia centralizada en Cloudflare D1.
- Sesiones `HttpOnly` y permisos validados por la API del Worker.
- Contrasenas derivadas con PBKDF2 antes de almacenarse.

## Acceso MVP

- Usuario propietario: `test@test`
- Contrasena: `GB2026`

Los usuarios adicionales se crean desde el modulo `Usuarios`.

## Desarrollo

```bash
npm install
npx wrangler d1 migrations apply DB --local
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
npx wrangler d1 migrations apply DB --remote
npm run deploy
```

## Alcance de seguridad

Los datos y usuarios se guardan en Cloudflare D1. La autenticacion, las sesiones
y las restricciones de Propietario y Supervisor se validan en el Worker. Para
operacion productiva se recomienda rotar la clave inicial, definir una politica
de copias de seguridad y revisar periodicamente los usuarios activos.
