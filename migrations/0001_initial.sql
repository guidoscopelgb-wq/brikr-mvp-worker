PRAGMA foreign_keys = ON;

CREATE TABLE app_state (
  id INTEGER PRIMARY KEY CHECK (id = 1),
  data_json TEXT NOT NULL,
  revision INTEGER NOT NULL DEFAULT 1,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE users (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE COLLATE NOCASE,
  password_salt TEXT NOT NULL,
  password_hash TEXT NOT NULL,
  password_iterations INTEGER NOT NULL DEFAULT 100000,
  role TEXT NOT NULL CHECK (role IN ('Propietario', 'Supervisor')),
  active INTEGER NOT NULL DEFAULT 1 CHECK (active IN (0, 1)),
  obra_ids_json TEXT NOT NULL DEFAULT '[]',
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE sessions (
  token_hash TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  expires_at INTEGER NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX sessions_user_id_idx ON sessions(user_id);
CREATE INDEX sessions_expires_at_idx ON sessions(expires_at);

INSERT INTO app_state (id, data_json)
VALUES (
  1,
  '{"obras":[],"presupuestos":[],"certificaciones":[],"gastosObra":[],"finanzasEstudio":[],"equipo":[],"catalogos":{"obra":{"Materiales":["Cemento y aridos","Hierro y estructura","Ladrillos, bloques y mamposteria","Instalaciones electricas","Instalaciones sanitarias","Revestimientos","Pintura","Aberturas","Equipamiento","Otros materiales"],"Mano de obra":["Albanileria","Electricidad","Plomeria","Pintura","Carpinteria","Herreria","Direccion de obra","Contratistas externos","Jornales","Otros"],"Servicios y alquileres":["Alquiler de maquinaria","Fletes","Volquetes","Servicios tercerizados","Seguridad e higiene","Otros servicios"],"Administracion de obra":["Permisos","Tasas","Honorarios","Documentacion tecnica","Imprevistos","Otros administrativos"]},"estudio":{"Administracion":["Alquiler","Servicios","Internet y telefonia","Software","Papeleria","Gestion contable","Impuestos","Otros"],"Personal":["Sueldos","Honorarios","Cargas sociales","Bonos","Viaticos","Capacitaciones"],"Comercial":["Publicidad","Marketing","Reuniones comerciales","Comisiones","Diseno y comunicacion"],"Operacion general":["Movilidad","Mantenimiento","Equipamiento","Compras internas","Otros"]}}}'
);

INSERT INTO users (
  id,
  name,
  email,
  password_salt,
  password_hash,
  password_iterations,
  role,
  active,
  obra_ids_json
)
VALUES (
  'user-owner',
  'Propietario principal',
  'test@test',
  '_tno7fpfZMqQouupJ2PV2g',
  'KniAETeyP5BGMObgwJ-7MAnx55S2u3Db7XbZFuf0PLw',
  100000,
  'Propietario',
  1,
  '[]'
);
