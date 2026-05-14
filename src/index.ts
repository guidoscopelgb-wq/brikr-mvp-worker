export interface Env {}

const html = String.raw`<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Brikr MVP - Gestion de Obras</title>
  <meta name="description" content="MVP funcional para gestionar obras, materiales, pagos, remitos y equipos.">
  <style>
    :root {
      color-scheme: light;
      --ink: #17211d;
      --muted: #68726f;
      --line: #dce5df;
      --paper: #fbfcf8;
      --panel: #ffffff;
      --brand: #146b4f;
      --brand-2: #e7b64b;
      --brand-3: #2f6f9f;
      --danger: #b94a48;
      --shadow: 0 20px 60px rgba(24, 40, 35, .12);
      font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    }
    * { box-sizing: border-box; }
    body { margin: 0; background: var(--paper); color: var(--ink); }
    button, input, select, textarea { font: inherit; }
    button { cursor: pointer; border: 0; }
    a { color: inherit; text-decoration: none; }
    .shell { min-height: 100vh; }
    .nav { position: sticky; top: 0; z-index: 10; display: flex; align-items: center; justify-content: space-between; gap: 24px; padding: 18px clamp(18px, 4vw, 64px); background: rgba(251, 252, 248, .88); backdrop-filter: blur(16px); border-bottom: 1px solid rgba(220,229,223,.8); }
    .brand { display: flex; align-items: center; gap: 10px; font-weight: 900; letter-spacing: .02em; }
    .logo { width: 34px; height: 34px; border-radius: 8px; background: linear-gradient(135deg, var(--brand), #45a777); color: white; display: grid; place-items: center; font-weight: 900; }
    .nav-actions { display: flex; gap: 10px; align-items: center; }
    .btn { display: inline-flex; align-items: center; justify-content: center; gap: 8px; min-height: 42px; padding: 0 16px; border-radius: 8px; font-weight: 750; background: #edf3ee; color: var(--ink); border: 1px solid transparent; }
    .btn.primary { background: var(--brand); color: white; box-shadow: 0 12px 30px rgba(20,107,79,.22); }
    .btn.ghost { background: transparent; border-color: var(--line); }
    .btn.warn { background: #fff6df; color: #7a5512; }
    .hero { display: grid; grid-template-columns: minmax(0, 1.03fr) minmax(340px, .97fr); gap: clamp(28px, 5vw, 78px); align-items: center; padding: clamp(38px, 7vw, 92px) clamp(18px, 4vw, 64px) 42px; }
    .eyebrow { color: var(--brand); font-weight: 850; text-transform: uppercase; letter-spacing: .08em; font-size: 13px; }
    h1 { margin: 14px 0 18px; font-size: clamp(42px, 7vw, 84px); line-height: .94; letter-spacing: 0; max-width: 820px; }
    .lead { color: var(--muted); font-size: clamp(18px, 2vw, 22px); line-height: 1.55; max-width: 680px; }
    .hero-ctas { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 28px; }
    .micro { color: var(--muted); margin-top: 14px; font-size: 14px; }
    .preview { background: #f7faf5; border: 1px solid var(--line); border-radius: 8px; box-shadow: var(--shadow); overflow: hidden; }
    .browserbar { display: flex; align-items: center; gap: 7px; padding: 13px 16px; border-bottom: 1px solid var(--line); color: var(--muted); font-size: 13px; }
    .dot { width: 10px; height: 10px; border-radius: 50%; background: #c6d4ca; }
    .preview-body { padding: 20px; }
    .metrics { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; }
    .metric { background: white; border: 1px solid var(--line); border-radius: 8px; padding: 14px; }
    .metric b { display: block; font-size: 28px; }
    .metric span { display: block; color: var(--muted); font-size: 12px; }
    .progress-list, .feed { margin-top: 16px; background: white; border: 1px solid var(--line); border-radius: 8px; padding: 16px; }
    .row { display: flex; justify-content: space-between; gap: 12px; align-items: center; padding: 10px 0; border-bottom: 1px solid #eef3ef; }
    .row:last-child { border-bottom: 0; }
    .bar { height: 8px; min-width: 90px; border-radius: 99px; background: #e9f0eb; overflow: hidden; }
    .bar i { display: block; height: 100%; background: var(--brand); }
    .logos, .section { padding: 34px clamp(18px, 4vw, 64px); }
    .logos { color: var(--muted); border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); }
    .logo-strip { display: flex; flex-wrap: wrap; gap: 18px 28px; margin-top: 12px; font-weight: 800; color: #38443f; }
    .section h2 { font-size: clamp(30px, 4vw, 50px); margin: 0 0 10px; }
    .section > p { color: var(--muted); font-size: 18px; max-width: 760px; }
    .grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 14px; margin-top: 26px; }
    .card { background: var(--panel); border: 1px solid var(--line); border-radius: 8px; padding: 20px; min-height: 148px; }
    .card h3 { margin: 0 0 9px; }
    .card p { margin: 0; color: var(--muted); line-height: 1.5; }
    .steps { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; margin-top: 24px; }
    .step-num { width: 38px; height: 38px; border-radius: 8px; display: grid; place-items: center; background: var(--brand-2); color: #3d2c05; font-weight: 900; margin-bottom: 14px; }
    .cta { background: #11251d; color: white; padding: clamp(34px, 5vw, 68px) clamp(18px, 4vw, 64px); display: flex; justify-content: space-between; gap: 24px; align-items: center; }
    .cta p { color: #c7d8d0; }
    .footer { padding: 24px clamp(18px, 4vw, 64px); color: var(--muted); display: flex; justify-content: space-between; gap: 16px; flex-wrap: wrap; }
    .app { display: none; min-height: 100vh; grid-template-columns: 260px minmax(0, 1fr); }
    .side { background: #10251d; color: white; padding: 22px; position: sticky; top: 0; height: 100vh; }
    .side .brand { margin-bottom: 28px; }
    .tabs { display: grid; gap: 8px; }
    .tab { text-align: left; background: transparent; color: #cfe0d8; border-radius: 8px; padding: 12px 13px; }
    .tab.active { background: rgba(255,255,255,.12); color: white; }
    .main { padding: 24px clamp(18px, 4vw, 44px); }
    .top { display: flex; justify-content: space-between; gap: 18px; align-items: center; margin-bottom: 22px; }
    .top h2 { margin: 0; font-size: clamp(28px, 4vw, 42px); }
    .stat-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 12px; margin-bottom: 18px; }
    .table-wrap { background: white; border: 1px solid var(--line); border-radius: 8px; overflow: hidden; }
    table { width: 100%; border-collapse: collapse; }
    th, td { padding: 13px 14px; text-align: left; border-bottom: 1px solid #edf2ee; }
    th { color: var(--muted); font-size: 13px; background: #f8faf7; }
    .pill { display: inline-flex; align-items: center; border-radius: 999px; padding: 4px 9px; font-size: 12px; font-weight: 800; background: #edf4ef; color: var(--brand); }
    .workspace { display: grid; grid-template-columns: minmax(0, 1fr) 330px; gap: 16px; }
    .form { background: white; border: 1px solid var(--line); border-radius: 8px; padding: 16px; display: grid; gap: 10px; align-content: start; }
    label { color: var(--muted); font-size: 13px; font-weight: 800; }
    input, select, textarea { width: 100%; border: 1px solid var(--line); border-radius: 8px; padding: 11px 12px; background: white; color: var(--ink); }
    textarea { min-height: 90px; resize: vertical; }
    .modal-backdrop { position: fixed; inset: 0; background: rgba(11,22,18,.5); display: none; place-items: center; padding: 18px; z-index: 20; }
    .modal { width: min(430px, 100%); background: white; border-radius: 8px; padding: 22px; box-shadow: var(--shadow); }
    .modal h2 { margin: 0 0 8px; }
    .modal form { display: grid; gap: 11px; margin-top: 16px; }
    .toast { position: fixed; right: 18px; bottom: 18px; background: #10251d; color: white; padding: 12px 14px; border-radius: 8px; display: none; z-index: 30; }
    @media (max-width: 980px) {
      .hero, .workspace { grid-template-columns: 1fr; }
      .grid, .steps, .stat-grid { grid-template-columns: repeat(2, 1fr); }
      .app { grid-template-columns: 1fr; }
      .side { position: static; height: auto; }
      .tabs { grid-template-columns: repeat(4, 1fr); }
    }
    @media (max-width: 640px) {
      .nav { align-items: flex-start; }
      .nav-actions { flex-wrap: wrap; justify-content: flex-end; }
      .metrics, .grid, .steps, .stat-grid { grid-template-columns: 1fr; }
      .tabs { grid-template-columns: 1fr 1fr; }
      .cta { display: block; }
      table { min-width: 680px; }
      .table-wrap { overflow-x: auto; }
    }
  </style>
</head>
<body>
  <div id="site" class="shell">
    <nav class="nav">
      <a class="brand" href="#"><span class="logo">B</span> Brikr</a>
      <div class="nav-actions">
        <button class="btn ghost" data-auth="login">Iniciar sesion</button>
        <button class="btn primary" data-auth="signup">Comenzar gratis</button>
      </div>
    </nav>
    <main>
      <section class="hero">
        <div>
          <div class="eyebrow">Plataforma para profesionales de la construccion</div>
          <h1>Gestiona tus obras sin papeles</h1>
          <p class="lead">Brikr es una plataforma todo-en-uno para arquitectos, ingenieros y corralones. Controla obras, materiales, pagos, remitos y equipos desde un solo lugar.</p>
          <div class="hero-ctas">
            <button class="btn primary" data-auth="signup">Empezar gratis</button>
            <button class="btn ghost" data-auth="login">Iniciar sesion</button>
          </div>
          <p class="micro">Sin tarjeta de credito · Gratis para empezar</p>
        </div>
        <div class="preview" aria-label="Vista previa del dashboard">
          <div class="browserbar"><span class="dot"></span><span class="dot"></span><span class="dot"></span><span>brikr.app/dashboard</span></div>
          <div class="preview-body">
            <div class="metrics">
              <div class="metric"><b>12</b><span>Obras activas</span></div>
              <div class="metric"><b>$480k</b><span>Pagos pendientes</span></div>
              <div class="metric"><b>34</b><span>Materiales</span></div>
              <div class="metric"><b>8</b><span>Equipo</span></div>
            </div>
            <div class="progress-list">
              <strong>AVANCE POR OBRA</strong>
              <div class="row"><span>Torre Belgrano</span><div class="bar"><i style="width:72%"></i></div><b>72%</b></div>
              <div class="row"><span>Residencia Norte</span><div class="bar"><i style="width:45%"></i></div><b>45%</b></div>
              <div class="row"><span>Edificio Central</span><div class="bar"><i style="width:91%"></i></div><b>91%</b></div>
            </div>
            <div class="feed">
              <strong>ACTIVIDAD</strong>
              <div class="row"><span>Nuevo remito cargado</span><span class="pill">hoy</span></div>
              <div class="row"><span>Pago aprobado</span><span class="pill">ayer</span></div>
              <div class="row"><span>Material solicitado</span><span class="pill">2 dias</span></div>
            </div>
          </div>
        </div>
      </section>
      <section class="logos">
        <span>Usado por profesionales de la construccion en todo el pais</span>
        <div class="logo-strip"><span>Arquitectos</span><span>Ingenieros civiles</span><span>Constructoras</span><span>Corralones</span><span>Estudios de diseno</span></div>
      </section>
      <section class="section">
        <h2>Todo lo que necesitas en un solo lugar</h2>
        <p>Desde el primer plano hasta la entrega final, Brikr acompana cada etapa de la obra.</p>
        <div class="grid">
          <article class="card"><h3>Gestion de obras</h3><p>Avance, estado, presupuesto y cronograma de cada obra en tiempo real.</p></article>
          <article class="card"><h3>Materiales</h3><p>Solicitudes, cotizaciones, aprobaciones, entregas y alertas de stock.</p></article>
          <article class="card"><h3>Pagos y cobros</h3><p>Flujo de caja mensual con pagos a proveedores y cobros a clientes.</p></article>
          <article class="card"><h3>Remitos digitales</h3><p>Genera remitos con items de linea y estado de entrega.</p></article>
          <article class="card"><h3>Equipo colaborativo</h3><p>Invita profesionales por obra con roles y permisos claros.</p></article>
          <article class="card"><h3>Rentabilidad</h3><p>Compara presupuesto inicial contra gastos reales y pendientes.</p></article>
        </div>
      </section>
      <section class="section">
        <h2>Empeza en 3 pasos</h2>
        <p>Sin instalaciones ni configuraciones complicadas.</p>
        <div class="steps">
          <article class="card"><div class="step-num">1</div><h3>Crea tu cuenta</h3><p>Registrate gratis en segundos.</p></article>
          <article class="card"><div class="step-num">2</div><h3>Carga tus obras</h3><p>Agrega obras, equipo y presupuesto inicial.</p></article>
          <article class="card"><div class="step-num">3</div><h3>Gestiona todo</h3><p>Controla materiales, pagos, tareas y remitos desde el dashboard.</p></article>
        </div>
      </section>
      <section class="cta">
        <div>
          <h2>Empeza a gestionar tus obras hoy</h2>
          <p>Gratis para siempre en el plan basico. Sin sorpresas.</p>
        </div>
        <div class="hero-ctas">
          <button class="btn primary" data-auth="signup">Crear cuenta gratis</button>
          <button class="btn" data-auth="login">Ya tengo cuenta</button>
        </div>
      </section>
    </main>
    <footer class="footer"><span class="brand"><span class="logo">B</span> Brikr</span><span>Gestion de obras para profesionales · MVP</span></footer>
  </div>

  <div id="app" class="app">
    <aside class="side">
      <div class="brand"><span class="logo">B</span> Brikr</div>
      <div class="tabs">
        <button class="tab active" data-view="obras">Obras</button>
        <button class="tab" data-view="materiales">Materiales</button>
        <button class="tab" data-view="finanzas">Finanzas</button>
        <button class="tab" data-view="equipo">Equipo</button>
      </div>
    </aside>
    <main class="main">
      <div class="top">
        <div><h2 id="viewTitle">Obras</h2><p class="micro" id="viewSub">Resumen operativo de tus proyectos activos.</p></div>
        <button class="btn ghost" id="logout">Cerrar sesion</button>
      </div>
      <section class="stat-grid" id="stats"></section>
      <section class="workspace">
        <div class="table-wrap"><table><thead id="tableHead"></thead><tbody id="tableBody"></tbody></table></div>
        <form class="form" id="entityForm"></form>
      </section>
    </main>
  </div>

  <div class="modal-backdrop" id="authModal">
    <div class="modal">
      <h2 id="authTitle">Crear cuenta</h2>
      <p class="micro">Ingresa cualquier email para entrar al MVP.</p>
      <form id="authForm">
        <label>Email<input id="email" type="email" required placeholder="tu@estudio.com"></label>
        <label>Contrasena<input id="password" type="password" required minlength="4" placeholder="Minimo 4 caracteres"></label>
        <button class="btn primary" type="submit">Entrar al dashboard</button>
        <button class="btn ghost" type="button" id="closeModal">Cancelar</button>
      </form>
    </div>
  </div>
  <div class="toast" id="toast"></div>

  <script>
    const seed = {
      obras: [
        { id: crypto.randomUUID(), nombre: 'Torre Belgrano', cliente: 'Grupo Norte', estado: 'En obra', avance: 72, presupuesto: 18500000 },
        { id: crypto.randomUUID(), nombre: 'Residencia Norte', cliente: 'Familia Ledesma', estado: 'Planificacion', avance: 45, presupuesto: 8200000 },
        { id: crypto.randomUUID(), nombre: 'Edificio Central', cliente: 'M2 Desarrollos', estado: 'Entrega', avance: 91, presupuesto: 26400000 }
      ],
      materiales: [
        { id: crypto.randomUUID(), obra: 'Torre Belgrano', item: 'Cemento x 50kg', cantidad: 120, estado: 'Aprobado' },
        { id: crypto.randomUUID(), obra: 'Residencia Norte', item: 'Hierro 8mm', cantidad: 64, estado: 'Cotizando' }
      ],
      finanzas: [
        { id: crypto.randomUUID(), obra: 'Torre Belgrano', concepto: 'Anticipo proveedor', tipo: 'Pago', monto: 480000, estado: 'Pendiente' },
        { id: crypto.randomUUID(), obra: 'Edificio Central', concepto: 'Certificado avance', tipo: 'Cobro', monto: 1350000, estado: 'Aprobado' }
      ],
      equipo: [
        { id: crypto.randomUUID(), nombre: 'Julia Benitez', rol: 'Arquitecta', obra: 'Torre Belgrano' },
        { id: crypto.randomUUID(), nombre: 'Martin Paz', rol: 'Supervisor', obra: 'Edificio Central' }
      ]
    };
    const views = {
      obras: {
        title: 'Obras', sub: 'Resumen operativo de tus proyectos activos.',
        columns: ['nombre', 'cliente', 'estado', 'avance', 'presupuesto'],
        fields: [['nombre','Nombre'], ['cliente','Cliente'], ['estado','Estado'], ['avance','Avance %','number'], ['presupuesto','Presupuesto','number']]
      },
      materiales: {
        title: 'Materiales', sub: 'Solicitudes, compras y remitos de obra.',
        columns: ['obra', 'item', 'cantidad', 'estado'],
        fields: [['obra','Obra'], ['item','Material o remito'], ['cantidad','Cantidad','number'], ['estado','Estado']]
      },
      finanzas: {
        title: 'Finanzas', sub: 'Pagos, cobros y compromisos pendientes.',
        columns: ['obra', 'concepto', 'tipo', 'monto', 'estado'],
        fields: [['obra','Obra'], ['concepto','Concepto'], ['tipo','Tipo'], ['monto','Monto','number'], ['estado','Estado']]
      },
      equipo: {
        title: 'Equipo', sub: 'Personas asignadas a cada obra.',
        columns: ['nombre', 'rol', 'obra'],
        fields: [['nombre','Nombre'], ['rol','Rol'], ['obra','Obra']]
      }
    };
    let state = JSON.parse(localStorage.getItem('brikr-mvp') || 'null') || seed;
    let current = 'obras';
    const money = value => new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(Number(value || 0));
    const save = () => localStorage.setItem('brikr-mvp', JSON.stringify(state));
    const notify = text => { toast.textContent = text; toast.style.display = 'block'; setTimeout(() => toast.style.display = 'none', 2200); };
    function openApp() { site.style.display = 'none'; app.style.display = 'grid'; render(); }
    function renderStats() {
      const pending = state.finanzas.filter(x => x.estado.toLowerCase().includes('pend')).reduce((sum, x) => sum + Number(x.monto || 0), 0);
      const avg = state.obras.length ? Math.round(state.obras.reduce((sum, x) => sum + Number(x.avance || 0), 0) / state.obras.length) : 0;
      stats.innerHTML = [
        ['Obras activas', state.obras.length],
        ['Pagos pendientes', money(pending)],
        ['Materiales/remitos', state.materiales.length],
        ['Avance promedio', avg + '%']
      ].map(([label, value]) => '<div class="metric"><b>' + value + '</b><span>' + label + '</span></div>').join('');
    }
    function render() {
      const cfg = views[current];
      viewTitle.textContent = cfg.title;
      viewSub.textContent = cfg.sub;
      document.querySelectorAll('.tab').forEach(tab => tab.classList.toggle('active', tab.dataset.view === current));
      renderStats();
      tableHead.innerHTML = '<tr>' + cfg.columns.map(col => '<th>' + col.toUpperCase() + '</th>').join('') + '<th></th></tr>';
      tableBody.innerHTML = state[current].map(item => '<tr>' + cfg.columns.map(col => {
        const value = col === 'presupuesto' || col === 'monto' ? money(item[col]) : item[col];
        return '<td>' + value + '</td>';
      }).join('') + '<td><button class="btn warn" data-delete="' + item.id + '">Eliminar</button></td></tr>').join('');
      entityForm.innerHTML = '<h3>Agregar ' + cfg.title.toLowerCase() + '</h3>' + cfg.fields.map(([name, label, type]) =>
        '<label>' + label + '<input name="' + name + '" type="' + (type || 'text') + '" required></label>'
      ).join('') + '<button class="btn primary" type="submit">Guardar</button>';
    }
    document.querySelectorAll('[data-auth]').forEach(btn => btn.addEventListener('click', () => {
      authTitle.textContent = btn.dataset.auth === 'login' ? 'Iniciar sesion' : 'Crear cuenta';
      authModal.style.display = 'grid';
      email.focus();
    }));
    closeModal.addEventListener('click', () => authModal.style.display = 'none');
    authModal.addEventListener('click', event => { if (event.target === authModal) authModal.style.display = 'none'; });
    authForm.addEventListener('submit', event => {
      event.preventDefault();
      localStorage.setItem('brikr-user', email.value);
      authModal.style.display = 'none';
      notify('Sesion iniciada');
      openApp();
    });
    document.querySelectorAll('.tab').forEach(tab => tab.addEventListener('click', () => { current = tab.dataset.view; render(); }));
    entityForm.addEventListener('submit', event => {
      event.preventDefault();
      const data = Object.fromEntries(new FormData(entityForm).entries());
      data.id = crypto.randomUUID();
      state[current].push(data);
      save();
      notify('Registro guardado');
      render();
    });
    tableBody.addEventListener('click', event => {
      const id = event.target.dataset && event.target.dataset.delete;
      if (!id) return;
      state[current] = state[current].filter(item => item.id !== id);
      save();
      notify('Registro eliminado');
      render();
    });
    logout.addEventListener('click', () => { localStorage.removeItem('brikr-user'); app.style.display = 'none'; site.style.display = 'block'; });
    if (localStorage.getItem('brikr-user')) openApp();
  </script>
</body>
</html>`;

export default {
  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url);
    if (request.method !== "GET" && request.method !== "HEAD") {
      return new Response("Method not allowed", {
        status: 405,
        headers: { allow: "GET, HEAD" },
      });
    }
    if (url.pathname === "/" || url.pathname === "/dashboard") {
      return new Response(request.method === "HEAD" ? null : html, {
        headers: {
          "content-type": "text/html; charset=utf-8",
          "cache-control": "public, max-age=300",
          "x-content-type-options": "nosniff",
          "referrer-policy": "strict-origin-when-cross-origin",
        },
      });
    }
    return new Response("Not found", {
      status: 404,
      headers: { "content-type": "text/plain; charset=utf-8" },
    });
  },
} satisfies ExportedHandler<Env>;
