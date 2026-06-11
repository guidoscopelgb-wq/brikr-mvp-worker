export interface Env {}

const html = String.raw`<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>GB Construction Assistant - Gestion de Obras</title>
  <meta name="description" content="MVP funcional para gestionar obras, materiales, pagos, remitos y equipos.">
  <style>
    :root {
      color-scheme: light;
      --ink: #16201f;
      --muted: #5d6a67;
      --line: #d9e1df;
      --paper: #f6f7f3;
      --panel: #ffffff;
      --brand: #0f6b57;
      --brand-strong: #0a4539;
      --brand-2: #f0b23e;
      --brand-3: #315f83;
      --danger: #a43d35;
      --danger-soft: #fff0ed;
      --ok-soft: #e9f7ef;
      --shadow: 0 18px 48px rgba(22, 32, 31, .13);
      --shadow-sm: 0 8px 24px rgba(22, 32, 31, .08);
      font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    }
    * { box-sizing: border-box; }
    html { scroll-behavior: smooth; }
    body { margin: 0; background: var(--paper); color: var(--ink); font-size: 16px; line-height: 1.5; }
    button, input, select, textarea { font: inherit; }
    button { cursor: pointer; border: 0; touch-action: manipulation; }
    button:focus-visible, input:focus-visible, textarea:focus-visible, a:focus-visible { outline: 3px solid rgba(240, 178, 62, .72); outline-offset: 3px; }
    a { color: inherit; text-decoration: none; }
    .skip { position: fixed; left: 16px; top: 12px; z-index: 100; transform: translateY(-140%); background: white; color: var(--brand-strong); border: 1px solid var(--line); border-radius: 8px; padding: 10px 14px; box-shadow: var(--shadow-sm); }
    .skip:focus { transform: translateY(0); }
    .shell { min-height: 100vh; }
    .nav { position: sticky; top: 0; z-index: 10; display: flex; align-items: center; justify-content: space-between; gap: 24px; padding: 14px clamp(18px, 4vw, 64px); background: rgba(246, 247, 243, .9); backdrop-filter: blur(16px); border-bottom: 1px solid rgba(217,225,223,.82); }
    .brand { display: flex; align-items: center; gap: 10px; font-weight: 900; letter-spacing: .01em; }
    .logo { width: 36px; height: 36px; border-radius: 8px; background: var(--brand-strong); color: white; display: grid; place-items: center; font-weight: 900; box-shadow: inset 0 -3px 0 rgba(255,255,255,.1); }
    .nav-actions { display: flex; gap: 10px; align-items: center; }
    .btn { display: inline-flex; align-items: center; justify-content: center; gap: 8px; min-height: 44px; padding: 0 17px; border-radius: 8px; font-weight: 800; background: #e8efeb; color: var(--ink); border: 1px solid transparent; transition: transform .18s ease, box-shadow .18s ease, background .18s ease; }
    .btn:hover { transform: translateY(-1px); box-shadow: var(--shadow-sm); }
    .btn:active { transform: translateY(0); box-shadow: none; }
    .btn.primary { background: var(--brand); color: white; box-shadow: 0 12px 28px rgba(15,107,87,.24); }
    .btn.primary:hover { background: var(--brand-strong); }
    .btn.ghost { background: rgba(255,255,255,.64); border-color: var(--line); }
    .btn.warn { background: var(--danger-soft); color: var(--danger); border-color: #f1c9c3; }
    .hero { display: grid; grid-template-columns: minmax(0, .92fr) minmax(420px, 1.08fr); gap: clamp(30px, 5vw, 72px); align-items: center; padding: clamp(44px, 7vw, 88px) clamp(18px, 4vw, 64px) 42px; max-width: 1480px; margin: 0 auto; }
    .eyebrow { color: var(--brand); font-weight: 900; text-transform: uppercase; letter-spacing: .08em; font-size: 12px; }
    h1 { margin: 14px 0 18px; font-size: clamp(42px, 7vw, 76px); line-height: .96; letter-spacing: 0; max-width: 760px; }
    .lead { color: var(--muted); font-size: clamp(18px, 2vw, 21px); line-height: 1.58; max-width: 660px; }
    .hero-ctas { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 28px; }
    .micro { color: var(--muted); margin-top: 14px; font-size: 14px; }
    .hero-proof { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 24px; }
    .chip { display: inline-flex; align-items: center; min-height: 34px; border-radius: 999px; padding: 0 12px; background: white; border: 1px solid var(--line); color: #33413e; font-size: 13px; font-weight: 800; box-shadow: var(--shadow-sm); }
    .visual { position: relative; min-height: 630px; border-radius: 8px; overflow: hidden; box-shadow: var(--shadow); background: #18231f; }
    .hero-photo { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; opacity: .76; }
    .visual::after { content: ""; position: absolute; inset: 0; background: linear-gradient(180deg, rgba(12,28,23,.12), rgba(12,28,23,.62)); }
    .preview { position: absolute; z-index: 1; left: 24px; right: 24px; bottom: 24px; background: rgba(249, 251, 248, .96); border: 1px solid rgba(255,255,255,.76); border-radius: 8px; box-shadow: 0 24px 60px rgba(5, 18, 14, .28); overflow: hidden; }
    .browserbar { display: flex; align-items: center; gap: 7px; padding: 12px 16px; border-bottom: 1px solid var(--line); color: var(--muted); font-size: 13px; background: rgba(255,255,255,.72); }
    .dot { width: 10px; height: 10px; border-radius: 50%; background: #c6d4ca; }
    .preview-body { padding: 20px; }
    .metrics { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; }
    .metric { background: white; border: 1px solid var(--line); border-radius: 8px; padding: 14px; box-shadow: 0 1px 0 rgba(22,32,31,.02); }
    .metric b { display: block; font-size: 28px; line-height: 1.1; font-variant-numeric: tabular-nums; }
    .metric span { display: block; color: var(--muted); font-size: 12px; font-weight: 760; }
    .progress-list, .feed { margin-top: 16px; background: white; border: 1px solid var(--line); border-radius: 8px; padding: 16px; }
    .row { display: flex; justify-content: space-between; gap: 12px; align-items: center; padding: 10px 0; border-bottom: 1px solid #eef3ef; }
    .row:last-child { border-bottom: 0; }
    .bar { height: 8px; min-width: 90px; border-radius: 99px; background: #e9f0eb; overflow: hidden; }
    .bar i { display: block; height: 100%; background: linear-gradient(90deg, var(--brand), var(--brand-2)); }
    .logos, .section { padding: 42px clamp(18px, 4vw, 64px); max-width: 1480px; margin: 0 auto; }
    .logos { color: var(--muted); border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); max-width: none; }
    .logo-strip { display: flex; flex-wrap: wrap; gap: 18px 28px; margin-top: 12px; font-weight: 800; color: #38443f; }
    .section h2 { font-size: clamp(30px, 4vw, 50px); margin: 0 0 10px; }
    .section > p { color: var(--muted); font-size: 18px; max-width: 760px; }
    .grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 14px; margin-top: 26px; }
    .card { background: var(--panel); border: 1px solid var(--line); border-radius: 8px; padding: 20px; min-height: 148px; box-shadow: var(--shadow-sm); }
    .card h3 { margin: 0 0 9px; }
    .card p { margin: 0; color: var(--muted); line-height: 1.5; }
    .steps { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; margin-top: 24px; }
    .step-num { width: 38px; height: 38px; border-radius: 8px; display: grid; place-items: center; background: var(--brand-2); color: #3d2c05; font-weight: 900; margin-bottom: 14px; }
    .cta { background: #11251d; color: white; padding: clamp(34px, 5vw, 68px) clamp(18px, 4vw, 64px); display: flex; justify-content: space-between; gap: 24px; align-items: center; }
    .cta p { color: #c7d8d0; }
    .footer { padding: 24px clamp(18px, 4vw, 64px); color: var(--muted); display: flex; justify-content: space-between; gap: 16px; flex-wrap: wrap; }
    .app { display: none; min-height: 100vh; grid-template-columns: 280px minmax(0, 1fr); background: #f4f6f2; }
    .side { background: #10251d; color: white; padding: 22px; position: sticky; top: 0; height: 100vh; border-right: 1px solid rgba(255,255,255,.1); }
    .side .brand { margin-bottom: 28px; }
    .tabs { display: grid; gap: 8px; }
    .tab { text-align: left; background: transparent; color: #cfe0d8; border-radius: 8px; padding: 12px 13px; min-height: 46px; }
    .tab:hover { background: rgba(255,255,255,.08); }
    .tab.active { background: rgba(255,255,255,.14); color: white; box-shadow: inset 3px 0 0 var(--brand-2); }
    .main { padding: 24px clamp(18px, 4vw, 44px); }
    .top { display: flex; justify-content: space-between; gap: 18px; align-items: center; margin-bottom: 22px; }
    .top h2 { margin: 0; font-size: clamp(28px, 4vw, 42px); }
    .stat-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 12px; margin-bottom: 18px; }
    .table-wrap { background: white; border: 1px solid var(--line); border-radius: 8px; overflow: hidden; box-shadow: var(--shadow-sm); }
    table { width: 100%; border-collapse: collapse; }
    th, td { padding: 13px 14px; text-align: left; border-bottom: 1px solid #edf2ee; vertical-align: middle; }
    th { color: var(--muted); font-size: 12px; background: #f8faf7; letter-spacing: .04em; }
    td { font-variant-numeric: tabular-nums; }
    tr:hover td { background: #fbfcf8; }
    .pill { display: inline-flex; align-items: center; border-radius: 999px; padding: 4px 9px; font-size: 12px; font-weight: 800; background: #edf4ef; color: var(--brand); }
    .workspace { display: grid; grid-template-columns: minmax(0, 1fr) 330px; gap: 16px; }
    .form { background: white; border: 1px solid var(--line); border-radius: 8px; padding: 18px; display: grid; gap: 11px; align-content: start; box-shadow: var(--shadow-sm); }
    .view-grid { display: grid; grid-template-columns: minmax(0, 1fr) 360px; gap: 16px; align-items: start; }
    .panel { background: white; border: 1px solid var(--line); border-radius: 8px; box-shadow: var(--shadow-sm); overflow: hidden; }
    .panel-body { padding: 18px; }
    .section-head { display: flex; align-items: flex-start; justify-content: space-between; gap: 16px; padding: 18px; border-bottom: 1px solid var(--line); }
    .section-head h3, .panel h3, .form h3 { margin: 0; }
    .section-head p { margin: 4px 0 0; color: var(--muted); font-size: 14px; }
    .project-list { display: grid; }
    .project-row { display: grid; grid-template-columns: minmax(180px, 1.3fr) minmax(130px, .8fr) 120px 150px auto; gap: 14px; align-items: center; padding: 16px 18px; border-bottom: 1px solid #edf2ee; }
    .project-row:last-child { border-bottom: 0; }
    .project-row:hover { background: #fbfcf8; }
    .project-name { font-weight: 850; }
    .project-meta { color: var(--muted); font-size: 13px; margin-top: 3px; }
    .progress-cell { min-width: 110px; }
    .progress-cell .bar { margin-top: 7px; min-width: 100%; }
    .actions { display: flex; flex-wrap: wrap; gap: 8px; justify-content: flex-end; }
    .btn.small { min-height: 36px; padding: 0 11px; font-size: 13px; }
    .btn.secondary { background: #e8f0f6; color: #254f6e; border-color: #cddce7; }
    .summary-band { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1px; background: var(--line); border-bottom: 1px solid var(--line); }
    .summary-item { background: #fbfcf8; padding: 14px 18px; }
    .summary-item b { display: block; font-size: 22px; font-variant-numeric: tabular-nums; }
    .summary-item span { color: var(--muted); font-size: 12px; font-weight: 750; }
    .empty { padding: 34px 18px; color: var(--muted); text-align: center; }
    .select-multiple { min-height: 122px; }
    .helper { color: var(--muted); font-size: 12px; margin-top: -5px; }
    .checkbox-grid { display: grid; gap: 8px; padding: 10px; border: 1px solid var(--line); border-radius: 8px; background: #fbfcf8; }
    .check-row { display: flex; align-items: center; gap: 9px; min-height: 36px; color: var(--ink); font-size: 14px; font-weight: 700; cursor: pointer; }
    .check-row input[type="checkbox"] { width: 18px; min-height: 18px; height: 18px; margin: 0; accent-color: var(--brand); }
    .tags { display: flex; flex-wrap: wrap; gap: 6px; }
    .tag { display: inline-flex; align-items: center; min-height: 27px; border-radius: 999px; padding: 0 9px; background: #edf4ef; color: var(--brand-strong); font-size: 12px; font-weight: 800; }
    .money-in { color: #176a49; font-weight: 850; }
    .money-out { color: var(--danger); font-weight: 850; }
    .detail-backdrop { position: fixed; inset: 0; z-index: 40; display: none; padding: 24px; background: rgba(7, 21, 17, .62); overflow-y: auto; }
    .detail-backdrop.open { display: block; }
    .detail-modal { width: min(1180px, 100%); margin: 0 auto; background: var(--paper); border-radius: 8px; box-shadow: 0 28px 80px rgba(5,18,14,.38); overflow: hidden; }
    .detail-header { position: sticky; top: 0; z-index: 2; display: flex; align-items: center; justify-content: space-between; gap: 18px; padding: 18px 22px; background: rgba(255,255,255,.96); border-bottom: 1px solid var(--line); backdrop-filter: blur(12px); }
    .detail-header h2 { margin: 0; }
    .detail-content { padding: 18px; }
    .detail-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-top: 16px; }
    .ledger { display: grid; }
    .ledger-row { display: grid; grid-template-columns: minmax(0, 1fr) auto; gap: 12px; align-items: center; padding: 13px 16px; border-bottom: 1px solid #edf2ee; }
    .ledger-row:last-child { border-bottom: 0; }
    .ledger-title { font-weight: 800; }
    .ledger-meta { color: var(--muted); font-size: 12px; margin-top: 3px; }
    .inline-form { padding: 16px; display: grid; grid-template-columns: 1fr 1fr; gap: 10px; border-top: 1px solid var(--line); background: #fbfcf8; }
    .inline-form .full { grid-column: 1 / -1; }
    .inline-form .btn { grid-column: 1 / -1; }
    .danger-link { color: var(--danger); background: transparent; min-height: 32px; padding: 4px 0; font-weight: 800; }
    label { color: var(--muted); font-size: 13px; font-weight: 800; }
    fieldset { margin: 0; padding: 0; border: 0; }
    legend { margin-bottom: 7px; color: var(--muted); font-size: 13px; font-weight: 800; }
    input, select, textarea { width: 100%; min-height: 44px; border: 1px solid var(--line); border-radius: 8px; padding: 11px 12px; background: white; color: var(--ink); }
    input:hover, select:hover, textarea:hover { border-color: #b9c8c3; }
    textarea { min-height: 90px; resize: vertical; }
    .modal-backdrop { position: fixed; inset: 0; background: rgba(11,22,18,.5); display: none; place-items: center; padding: 18px; z-index: 20; }
    .modal { width: min(430px, 100%); background: white; border-radius: 8px; padding: 22px; box-shadow: var(--shadow); }
    .modal h2 { margin: 0 0 8px; }
    .modal form { display: grid; gap: 11px; margin-top: 16px; }
    .toast { position: fixed; right: 18px; bottom: 18px; background: #10251d; color: white; padding: 12px 14px; border-radius: 8px; display: none; z-index: 30; box-shadow: var(--shadow); }
    @media (prefers-reduced-motion: reduce) {
      *, *::before, *::after { scroll-behavior: auto !important; transition-duration: .01ms !important; animation-duration: .01ms !important; }
    }
    @media (max-width: 980px) {
      .hero, .workspace, .view-grid, .detail-grid { grid-template-columns: 1fr; }
      .visual { min-height: 540px; }
      .grid, .steps, .stat-grid { grid-template-columns: repeat(2, 1fr); }
      .app { grid-template-columns: 1fr; }
      .side { position: static; height: auto; }
      .tabs { grid-template-columns: repeat(4, 1fr); }
      .project-row { grid-template-columns: 1fr 1fr; }
      .project-row .actions { grid-column: 1 / -1; justify-content: flex-start; }
    }
    @media (max-width: 640px) {
      .nav { align-items: flex-start; }
      .nav-actions { flex-wrap: wrap; justify-content: flex-end; }
      .hero { padding-top: 32px; }
      .visual { min-height: auto; padding: 96px 12px 12px; }
      .preview { position: relative; left: auto; right: auto; bottom: auto; }
      .metrics, .grid, .steps, .stat-grid { grid-template-columns: 1fr; }
      .tabs { grid-template-columns: 1fr 1fr; }
      .cta { display: block; }
      table { min-width: 680px; }
      .table-wrap { overflow-x: auto; }
      .project-row, .summary-band { grid-template-columns: 1fr; }
      .detail-backdrop { padding: 0; }
      .detail-modal { min-height: 100%; border-radius: 0; }
      .detail-header { align-items: flex-start; }
      .inline-form { grid-template-columns: 1fr; }
      .inline-form .full, .inline-form .btn { grid-column: auto; }
    }
  </style>
</head>
<body>
  <a class="skip" href="#main">Saltar al contenido</a>
  <div id="site" class="shell">
    <nav class="nav">
      <a class="brand" href="#"><span class="logo">GB</span> GB Construction Assistant</a>
      <div class="nav-actions">
        <button class="btn ghost" data-auth="login">Iniciar sesion</button>
        <button class="btn primary" data-auth="signup">Comenzar gratis</button>
      </div>
    </nav>
    <main id="main">
      <section class="hero">
        <div>
          <div class="eyebrow">Plataforma para profesionales de la construccion</div>
          <h1>Gestiona tus obras sin papeles</h1>
          <p class="lead">GB Construction Assistant es una plataforma todo-en-uno para arquitectos, ingenieros y corralones. Controla obras, materiales, pagos, remitos y equipos desde un solo lugar.</p>
          <div class="hero-ctas">
            <button class="btn primary" data-auth="signup">Empezar gratis</button>
            <button class="btn ghost" data-auth="login">Iniciar sesion</button>
          </div>
          <p class="micro">Sin tarjeta de credito · Gratis para empezar</p>
          <div class="hero-proof" aria-label="Modulos principales">
            <span class="chip">Obras</span>
            <span class="chip">Materiales</span>
            <span class="chip">Remitos</span>
            <span class="chip">Finanzas</span>
          </div>
        </div>
        <div class="visual" aria-label="Vista previa de gestion de obra">
          <img class="hero-photo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/View_Above_Construction_Site_%28Unsplash%29.jpg/1280px-View_Above_Construction_Site_%28Unsplash%29.jpg" alt="Vista aerea de una obra en construccion">
          <div class="preview" aria-label="Vista previa del dashboard">
            <div class="browserbar"><span class="dot"></span><span class="dot"></span><span class="dot"></span><span>GB Construction Assistant / Dashboard</span></div>
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
        </div>
      </section>
      <section class="logos">
        <span>Usado por profesionales de la construccion en todo el pais</span>
        <div class="logo-strip"><span>Arquitectos</span><span>Ingenieros civiles</span><span>Constructoras</span><span>Corralones</span><span>Estudios de diseno</span></div>
      </section>
      <section class="section">
        <h2>Todo lo que necesitas en un solo lugar</h2>
        <p>Desde el primer plano hasta la entrega final, GB Construction Assistant acompana cada etapa de la obra.</p>
        <div class="grid">
          <article class="card"><h3>Gestion de obras</h3><p>Certificaciones, estado, presupuesto y costos de cada obra en tiempo real.</p></article>
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
    <footer class="footer"><span class="brand"><span class="logo">GB</span> GB Construction Assistant</span><span>Gestion de obras para profesionales · MVP</span></footer>
  </div>

  <div id="app" class="app">
    <aside class="side">
      <div class="brand"><span class="logo">GB</span> GB Construction Assistant</div>
      <div class="tabs">
        <button class="tab active" data-view="obras">Obras</button>
        <button class="tab" data-view="materiales">Materiales</button>
        <button class="tab" data-view="finanzas">Estudio</button>
        <button class="tab" data-view="equipo">Equipo</button>
      </div>
    </aside>
    <main class="main">
      <div class="top">
        <div><h2 id="viewTitle">Obras</h2><p class="micro" id="viewSub">Resumen operativo de tus proyectos activos.</p></div>
        <button class="btn ghost" id="logout">Cerrar sesion</button>
      </div>
      <section class="stat-grid" id="stats"></section>
      <section id="viewContent"></section>
    </main>
  </div>

  <div class="detail-backdrop" id="projectDetail" aria-hidden="true">
    <section class="detail-modal" role="dialog" aria-modal="true" aria-labelledby="detailTitle">
      <header class="detail-header">
        <div><h2 id="detailTitle">Seguimiento de obra</h2><p class="micro" id="detailSubtitle"></p></div>
        <button class="btn ghost" type="button" id="closeDetail">Cerrar</button>
      </header>
      <div class="detail-content" id="detailContent"></div>
    </section>
  </div>

  <div class="modal-backdrop" id="authModal">
    <div class="modal">
      <h2 id="authTitle">Crear cuenta</h2>
      <p class="micro">Ingresa cualquier email para entrar al MVP.</p>
      <form id="authForm">
        <label>Email<input id="email" type="email" autocomplete="email" required placeholder="tu@estudio.com"></label>
        <label>Contrasena<input id="password" type="password" autocomplete="current-password" required minlength="4" placeholder="Minimo 4 caracteres"></label>
        <button class="btn primary" type="submit">Entrar al dashboard</button>
        <button class="btn ghost" type="button" id="closeModal">Cancelar</button>
      </form>
    </div>
  </div>
  <div class="toast" id="toast" role="status" aria-live="polite"></div>

  <script>
    const seed = {
      obras: [
        { id: 'obra-torre', nombre: 'Torre Belgrano', cliente: 'Grupo Norte', estado: 'En obra', presupuesto: 18500000 },
        { id: 'obra-residencia', nombre: 'Residencia Norte', cliente: 'Familia Ledesma', estado: 'Planificacion', presupuesto: 8200000 },
        { id: 'obra-central', nombre: 'Edificio Central', cliente: 'M2 Desarrollos', estado: 'Entrega', presupuesto: 26400000 }
      ],
      materiales: [
        { id: crypto.randomUUID(), obraId: 'obra-torre', item: 'Cemento x 50kg', cantidad: 120, proveedor: 'Corralon Norte', costo: 840000, estado: 'Aprobado' },
        { id: crypto.randomUUID(), obraId: 'obra-residencia', item: 'Hierro 8mm', cantidad: 64, proveedor: 'Aceros SA', costo: 560000, estado: 'Cotizando' }
      ],
      certificaciones: [
        { id: crypto.randomUUID(), obraId: 'obra-torre', periodo: '2026-04', concepto: 'Estructura nivel 8', porcentaje: 18, monto: 2850000, estado: 'Aprobada' },
        { id: crypto.randomUUID(), obraId: 'obra-torre', periodo: '2026-05', concepto: 'Mamposteria nivel 5', porcentaje: 12, monto: 1980000, estado: 'Presentada' },
        { id: crypto.randomUUID(), obraId: 'obra-central', periodo: '2026-05', concepto: 'Terminaciones finales', porcentaje: 20, monto: 4300000, estado: 'Cobrada' }
      ],
      gastosObra: [
        { id: crypto.randomUUID(), obraId: 'obra-torre', fecha: '2026-05-08', categoria: 'Mano de obra', concepto: 'Cuadrilla estructura', monto: 1480000, estado: 'Pagado' },
        { id: crypto.randomUUID(), obraId: 'obra-torre', fecha: '2026-05-10', categoria: 'Materiales', concepto: 'Compra de cemento', monto: 840000, estado: 'Pendiente' },
        { id: crypto.randomUUID(), obraId: 'obra-central', fecha: '2026-05-04', categoria: 'Servicios', concepto: 'Limpieza final', monto: 310000, estado: 'Pagado' }
      ],
      finanzasEstudio: [
        { id: crypto.randomUUID(), fecha: '2026-05-05', tipo: 'Ingreso', categoria: 'Honorarios', concepto: 'Anticipo proyecto Caballito', monto: 2200000, estado: 'Cobrado' },
        { id: crypto.randomUUID(), fecha: '2026-05-06', tipo: 'Egreso', categoria: 'Alquiler', concepto: 'Alquiler oficina', monto: 680000, estado: 'Pagado' },
        { id: crypto.randomUUID(), fecha: '2026-05-09', tipo: 'Egreso', categoria: 'Software', concepto: 'Licencias y servicios', monto: 175000, estado: 'Pagado' }
      ],
      equipo: [
        { id: crypto.randomUUID(), nombre: 'Julia Benitez', rol: 'Arquitecta', obraIds: ['obra-torre', 'obra-residencia'] },
        { id: crypto.randomUUID(), nombre: 'Martin Paz', rol: 'Supervisor', obraIds: ['obra-torre', 'obra-central'] }
      ]
    };
    const views = {
      obras: ['Obras', 'Cartera, certificaciones y costos por proyecto.'],
      materiales: ['Materiales', 'Compras y solicitudes vinculadas a una obra existente.'],
      finanzas: ['Finanzas del estudio', 'Ingresos y egresos administrativos separados de las obras.'],
      equipo: ['Equipo', 'Personas, roles y asignacion simultanea a varias obras.']
    };
    const legacyState = localStorage.getItem('brikr-mvp');
    const legacyUser = localStorage.getItem('brikr-user');
    if (legacyState && !localStorage.getItem('gb-construction-assistant')) {
      localStorage.setItem('gb-construction-assistant', legacyState);
    }
    if (legacyUser && !localStorage.getItem('gb-construction-user')) {
      localStorage.setItem('gb-construction-user', legacyUser);
    }
    let state = JSON.parse(localStorage.getItem('gb-construction-assistant') || 'null') || seed;
    const normalizeState = () => {
      state.obras = Array.isArray(state.obras) ? state.obras : [];
      state.materiales = (state.materiales || []).map(item => ({
        ...item,
        obraId: item.obraId || (state.obras.find(obra => obra.nombre === item.obra) || {}).id || ''
      }));
      state.certificaciones = Array.isArray(state.certificaciones) ? state.certificaciones : [];
      state.gastosObra = Array.isArray(state.gastosObra) ? state.gastosObra : (state.finanzas || []).filter(item => item.obra).map(item => ({
        id: item.id || crypto.randomUUID(),
        obraId: (state.obras.find(obra => obra.nombre === item.obra) || {}).id || '',
        fecha: item.fecha || '',
        categoria: item.categoria || 'General',
        concepto: item.concepto,
        monto: item.monto,
        estado: item.estado || 'Pendiente'
      }));
      state.finanzasEstudio = Array.isArray(state.finanzasEstudio) ? state.finanzasEstudio : [];
      state.equipo = (state.equipo || []).map(persona => ({
        ...persona,
        obraIds: Array.isArray(persona.obraIds) ? persona.obraIds : [((state.obras.find(obra => obra.nombre === persona.obra) || {}).id || '')].filter(Boolean)
      }));
    };
    normalizeState();
    let current = 'obras';
    let selectedProjectId = null;
    const money = value => new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(Number(value || 0));
    const number = value => Number(value || 0);
    const escapeHtml = value => String(value ?? '').replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' })[character]);
    const obraById = id => state.obras.find(obra => obra.id === id);
    const obraName = id => (obraById(id) || {}).nombre || 'Obra sin asignar';
    const obraOptions = selected => '<option value="">Seleccionar obra</option>' + state.obras.map(obra => '<option value="' + escapeHtml(obra.id) + '"' + (obra.id === selected ? ' selected' : '') + '>' + escapeHtml(obra.nombre) + '</option>').join('');
    const today = () => new Date().toISOString().slice(0, 10);
    const save = () => localStorage.setItem('gb-construction-assistant', JSON.stringify(state));
    const notify = text => { toast.textContent = text; toast.style.display = 'block'; setTimeout(() => toast.style.display = 'none', 2200); };
    function openApp() { site.style.display = 'none'; app.style.display = 'grid'; render(); }
    function renderStats() {
      const certified = state.certificaciones.reduce((sum, item) => sum + number(item.monto), 0);
      const projectExpenses = state.gastosObra.reduce((sum, item) => sum + number(item.monto), 0);
      const studioBalance = state.finanzasEstudio.reduce((sum, item) => sum + (item.tipo === 'Ingreso' ? number(item.monto) : -number(item.monto)), 0);
      stats.innerHTML = [
        ['Obras activas', state.obras.length],
        ['Monto certificado', money(certified)],
        ['Gastos de obra', money(projectExpenses)],
        ['Caja del estudio', money(studioBalance)]
      ].map(([label, value]) => '<div class="metric"><b>' + value + '</b><span>' + label + '</span></div>').join('');
    }
    function renderObras() {
      const totalBudget = state.obras.reduce((sum, obra) => sum + number(obra.presupuesto), 0);
      const totalCertified = state.certificaciones.reduce((sum, item) => sum + number(item.monto), 0);
      const totalExpenses = state.gastosObra.reduce((sum, item) => sum + number(item.monto), 0);
      const rows = state.obras.length ? state.obras.map(obra => {
        const certifiedPct = Math.min(100, state.certificaciones.filter(item => item.obraId === obra.id).reduce((sum, item) => sum + number(item.porcentaje), 0));
        const expenses = state.gastosObra.filter(item => item.obraId === obra.id).reduce((sum, item) => sum + number(item.monto), 0);
        return '<article class="project-row">' +
          '<div><div class="project-name">' + escapeHtml(obra.nombre) + '</div><div class="project-meta">' + escapeHtml(obra.cliente) + '</div></div>' +
          '<div><span class="pill">' + escapeHtml(obra.estado) + '</span><div class="project-meta">' + state.certificaciones.filter(item => item.obraId === obra.id).length + ' certificados</div></div>' +
          '<div class="progress-cell"><b>' + certifiedPct + '% cert.</b><div class="bar"><i style="width:' + certifiedPct + '%"></i></div></div>' +
          '<div><b>' + money(expenses) + '</b><div class="project-meta">Gastos cargados</div></div>' +
          '<div class="actions"><button class="btn secondary small" type="button" data-open-project="' + escapeHtml(obra.id) + '">Seguimiento</button><button class="btn warn small" type="button" data-delete-project="' + escapeHtml(obra.id) + '">Eliminar</button></div>' +
        '</article>';
      }).join('') : '<div class="empty">Todavia no hay obras. Crea la primera desde el formulario.</div>';
      viewContent.innerHTML =
        '<div class="view-grid"><section class="panel"><div class="summary-band">' +
          '<div class="summary-item"><b>' + state.obras.length + '</b><span>Obras</span></div>' +
          '<div class="summary-item"><b>' + money(totalBudget) + '</b><span>Presupuesto total</span></div>' +
          '<div class="summary-item"><b>' + money(totalCertified) + '</b><span>Certificado</span></div>' +
          '<div class="summary-item"><b>' + money(totalExpenses) + '</b><span>Gastos</span></div>' +
        '</div><div class="section-head"><div><h3>Cartera de obras</h3><p>Entra al seguimiento para cargar certificados y gastos.</p></div></div><div class="project-list">' + rows + '</div></section>' +
        '<form class="form" data-form="obra"><h3>Nueva obra</h3>' +
          '<label>Nombre<input name="nombre" required></label>' +
          '<label>Cliente<input name="cliente" required></label>' +
          '<label>Estado<select name="estado" required><option>Planificacion</option><option>En obra</option><option>Pausada</option><option>Entrega</option><option>Finalizada</option></select></label>' +
          '<label>Presupuesto<input name="presupuesto" type="number" min="0" required></label>' +
          '<button class="btn primary" type="submit">Crear obra</button></form></div>';
    }
    function renderMaterials() {
      const total = state.materiales.reduce((sum, item) => sum + number(item.costo), 0);
      const rows = state.materiales.length ? state.materiales.map(item =>
        '<tr><td>' + escapeHtml(obraName(item.obraId)) + '</td><td><b>' + escapeHtml(item.item) + '</b><div class="project-meta">' + escapeHtml(item.proveedor || 'Sin proveedor') + '</div></td><td>' + escapeHtml(item.cantidad) + '</td><td>' + money(item.costo) + '</td><td><span class="pill">' + escapeHtml(item.estado) + '</span></td><td><button class="btn warn small" type="button" data-delete-material="' + escapeHtml(item.id) + '">Eliminar</button></td></tr>'
      ).join('') : '<tr><td colspan="6" class="empty">No hay materiales cargados.</td></tr>';
      viewContent.innerHTML =
        '<div class="view-grid"><section class="panel"><div class="summary-band">' +
          '<div class="summary-item"><b>' + state.materiales.length + '</b><span>Registros</span></div>' +
          '<div class="summary-item"><b>' + money(total) + '</b><span>Costo estimado</span></div>' +
          '<div class="summary-item"><b>' + state.materiales.filter(item => item.estado === 'Pendiente').length + '</b><span>Pendientes</span></div>' +
          '<div class="summary-item"><b>' + new Set(state.materiales.map(item => item.obraId).filter(Boolean)).size + '</b><span>Obras vinculadas</span></div>' +
        '</div><div class="table-wrap"><table><thead><tr><th>OBRA</th><th>MATERIAL</th><th>CANTIDAD</th><th>COSTO</th><th>ESTADO</th><th></th></tr></thead><tbody>' + rows + '</tbody></table></div></section>' +
        '<form class="form" data-form="material"><h3>Cargar material</h3>' +
          '<label>Obra<select name="obraId" required>' + obraOptions('') + '</select></label>' +
          '<label>Material o remito<input name="item" required></label>' +
          '<label>Proveedor<input name="proveedor"></label>' +
          '<label>Cantidad<input name="cantidad" type="number" min="0" required></label>' +
          '<label>Costo estimado<input name="costo" type="number" min="0" required></label>' +
          '<label>Estado<select name="estado" required><option>Pendiente</option><option>Cotizando</option><option>Aprobado</option><option>Entregado</option></select></label>' +
          '<button class="btn primary" type="submit"' + (state.obras.length ? '' : ' disabled') + '>Guardar material</button></form></div>';
    }
    function renderFinances() {
      const income = state.finanzasEstudio.filter(item => item.tipo === 'Ingreso').reduce((sum, item) => sum + number(item.monto), 0);
      const expenses = state.finanzasEstudio.filter(item => item.tipo === 'Egreso').reduce((sum, item) => sum + number(item.monto), 0);
      const rows = state.finanzasEstudio.length ? state.finanzasEstudio.slice().sort((a, b) => String(b.fecha).localeCompare(String(a.fecha))).map(item =>
        '<tr><td>' + escapeHtml(item.fecha || '-') + '</td><td><span class="pill">' + escapeHtml(item.tipo) + '</span></td><td><b>' + escapeHtml(item.concepto) + '</b><div class="project-meta">' + escapeHtml(item.categoria) + '</div></td><td class="' + (item.tipo === 'Ingreso' ? 'money-in' : 'money-out') + '">' + (item.tipo === 'Ingreso' ? '+' : '-') + money(item.monto) + '</td><td>' + escapeHtml(item.estado) + '</td><td><button class="btn warn small" type="button" data-delete-finance="' + escapeHtml(item.id) + '">Eliminar</button></td></tr>'
      ).join('') : '<tr><td colspan="6" class="empty">No hay movimientos del estudio.</td></tr>';
      viewContent.innerHTML =
        '<div class="view-grid"><section class="panel"><div class="summary-band">' +
          '<div class="summary-item"><b class="money-in">' + money(income) + '</b><span>Ingresos</span></div>' +
          '<div class="summary-item"><b class="money-out">' + money(expenses) + '</b><span>Egresos</span></div>' +
          '<div class="summary-item"><b>' + money(income - expenses) + '</b><span>Saldo</span></div>' +
          '<div class="summary-item"><b>' + state.finanzasEstudio.length + '</b><span>Movimientos</span></div>' +
        '</div><div class="section-head"><div><h3>Administracion del estudio</h3><p>Estos movimientos no impactan en los costos de las obras.</p></div></div><div class="table-wrap"><table><thead><tr><th>FECHA</th><th>TIPO</th><th>CONCEPTO</th><th>MONTO</th><th>ESTADO</th><th></th></tr></thead><tbody>' + rows + '</tbody></table></div></section>' +
        '<form class="form" data-form="finance"><h3>Nuevo movimiento</h3>' +
          '<label>Fecha<input name="fecha" type="date" value="' + today() + '" required></label>' +
          '<label>Tipo<select name="tipo" required><option>Ingreso</option><option>Egreso</option></select></label>' +
          '<label>Categoria<input name="categoria" placeholder="Honorarios, alquiler, software..." required></label>' +
          '<label>Concepto<input name="concepto" required></label>' +
          '<label>Monto<input name="monto" type="number" min="0" required></label>' +
          '<label>Estado<select name="estado" required><option>Pendiente</option><option>Cobrado</option><option>Pagado</option><option>Vencido</option></select></label>' +
          '<button class="btn primary" type="submit">Guardar movimiento</button></form></div>';
    }
    function renderTeam() {
      const rows = state.equipo.length ? state.equipo.map(persona =>
        '<tr><td><b>' + escapeHtml(persona.nombre) + '</b></td><td>' + escapeHtml(persona.rol) + '</td><td><div class="tags">' + (persona.obraIds || []).map(id => '<span class="tag">' + escapeHtml(obraName(id)) + '</span>').join('') + '</div></td><td><button class="btn warn small" type="button" data-delete-person="' + escapeHtml(persona.id) + '">Eliminar</button></td></tr>'
      ).join('') : '<tr><td colspan="4" class="empty">No hay integrantes cargados.</td></tr>';
      const assignments = state.obras.map(obra => '<label class="check-row"><input type="checkbox" name="obraIds" value="' + escapeHtml(obra.id) + '"><span>' + escapeHtml(obra.nombre) + '</span></label>').join('');
      viewContent.innerHTML =
        '<div class="view-grid"><section class="panel"><div class="summary-band">' +
          '<div class="summary-item"><b>' + state.equipo.length + '</b><span>Personas</span></div>' +
          '<div class="summary-item"><b>' + state.equipo.reduce((sum, persona) => sum + (persona.obraIds || []).length, 0) + '</b><span>Asignaciones</span></div>' +
          '<div class="summary-item"><b>' + new Set(state.equipo.map(persona => persona.rol)).size + '</b><span>Roles</span></div>' +
          '<div class="summary-item"><b>' + state.obras.length + '</b><span>Obras</span></div>' +
        '</div><div class="table-wrap"><table><thead><tr><th>PERSONA</th><th>ROL</th><th>OBRAS ASIGNADAS</th><th></th></tr></thead><tbody>' + rows + '</tbody></table></div></section>' +
        '<form class="form" data-form="person"><h3>Agregar integrante</h3>' +
          '<label>Nombre<input name="nombre" required></label>' +
          '<label>Rol<input name="rol" placeholder="Arquitecta, supervisor..." required></label>' +
          '<fieldset><legend>Obras</legend><div class="checkbox-grid">' + (assignments || '<span class="helper">Primero crea una obra.</span>') + '</div></fieldset>' +
          '<div class="helper">Marca todas las obras en las que participa.</div>' +
          '<button class="btn primary" type="submit">Guardar integrante</button></form></div>';
    }
    function render() {
      const cfg = views[current];
      viewTitle.textContent = cfg[0];
      viewSub.textContent = cfg[1];
      document.querySelectorAll('.tab').forEach(tab => tab.classList.toggle('active', tab.dataset.view === current));
      renderStats();
      if (current === 'obras') renderObras();
      if (current === 'materiales') renderMaterials();
      if (current === 'finanzas') renderFinances();
      if (current === 'equipo') renderTeam();
    }
    function renderProjectDetail(id) {
      const obra = obraById(id);
      if (!obra) return;
      selectedProjectId = id;
      const certificates = state.certificaciones.filter(item => item.obraId === id);
      const expenses = state.gastosObra.filter(item => item.obraId === id);
      const certifiedPct = Math.min(100, certificates.reduce((sum, item) => sum + number(item.porcentaje), 0));
      const certifiedAmount = certificates.reduce((sum, item) => sum + number(item.monto), 0);
      const expenseAmount = expenses.reduce((sum, item) => sum + number(item.monto), 0);
      const balance = number(obra.presupuesto) - expenseAmount;
      detailTitle.textContent = obra.nombre;
      detailSubtitle.textContent = obra.cliente + ' · ' + obra.estado;
      const certRows = certificates.length ? certificates.map(item =>
        '<div class="ledger-row"><div><div class="ledger-title">' + escapeHtml(item.concepto) + '</div><div class="ledger-meta">' + escapeHtml(item.periodo) + ' · ' + number(item.porcentaje) + '% · ' + escapeHtml(item.estado) + '</div></div><div><b>' + money(item.monto) + '</b><br><button class="danger-link" type="button" data-delete-certificate="' + escapeHtml(item.id) + '">Eliminar</button></div></div>'
      ).join('') : '<div class="empty">Sin certificaciones cargadas.</div>';
      const expenseRows = expenses.length ? expenses.slice().sort((a, b) => String(b.fecha).localeCompare(String(a.fecha))).map(item =>
        '<div class="ledger-row"><div><div class="ledger-title">' + escapeHtml(item.concepto) + '</div><div class="ledger-meta">' + escapeHtml(item.fecha || '-') + ' · ' + escapeHtml(item.categoria) + ' · ' + escapeHtml(item.estado) + '</div></div><div><b class="money-out">' + money(item.monto) + '</b><br><button class="danger-link" type="button" data-delete-expense="' + escapeHtml(item.id) + '">Eliminar</button></div></div>'
      ).join('') : '<div class="empty">Sin gastos cargados.</div>';
      detailContent.innerHTML =
        '<div class="summary-band">' +
          '<div class="summary-item"><b>' + certifiedPct + '%</b><span>Progreso certificado</span></div>' +
          '<div class="summary-item"><b>' + certificates.length + '</b><span>Certificaciones</span></div>' +
          '<div class="summary-item"><b>' + money(certifiedAmount) + '</b><span>Monto certificado</span></div>' +
          '<div class="summary-item"><b>' + money(balance) + '</b><span>Presupuesto disponible</span></div>' +
        '</div><div class="detail-grid">' +
          '<section class="panel"><div class="section-head"><div><h3>Certificaciones de obra</h3><p>Historial de certificados por periodo y estado.</p></div></div><div class="ledger">' + certRows + '</div>' +
            '<form class="inline-form" data-form="certificate"><label>Periodo<input name="periodo" type="month" required></label><label>Porcentaje<input name="porcentaje" type="number" min="0" max="100" required></label><label class="full">Concepto<input name="concepto" required></label><label>Monto<input name="monto" type="number" min="0" required></label><label>Estado<select name="estado"><option>Borrador</option><option>Presentada</option><option>Aprobada</option><option>Cobrada</option></select></label><button class="btn primary" type="submit">Agregar certificacion</button></form>' +
          '</section>' +
          '<section class="panel"><div class="section-head"><div><h3>Gastos de la obra</h3><p>Costos directos separados de la administracion del estudio.</p></div></div><div class="ledger">' + expenseRows + '</div>' +
            '<form class="inline-form" data-form="project-expense"><label>Fecha<input name="fecha" type="date" value="' + today() + '" required></label><label>Categoria<select name="categoria"><option>Materiales</option><option>Mano de obra</option><option>Servicios</option><option>Subcontratos</option><option>Equipos</option><option>Otros</option></select></label><label class="full">Concepto<input name="concepto" required></label><label>Monto<input name="monto" type="number" min="0" required></label><label>Estado<select name="estado"><option>Pendiente</option><option>Pagado</option><option>Vencido</option></select></label><button class="btn primary" type="submit">Agregar gasto</button></form>' +
          '</section></div>';
      projectDetail.classList.add('open');
      projectDetail.setAttribute('aria-hidden', 'false');
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
      localStorage.setItem('gb-construction-user', email.value);
      authModal.style.display = 'none';
      notify('Sesion iniciada');
      openApp();
    });
    document.querySelectorAll('.tab').forEach(tab => tab.addEventListener('click', () => { current = tab.dataset.view; render(); }));
    viewContent.addEventListener('submit', event => {
      event.preventDefault();
      const form = event.target;
      const formType = form.dataset.form;
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());
      data.id = crypto.randomUUID();
      if (formType === 'obra') state.obras.push(data);
      if (formType === 'material') state.materiales.push(data);
      if (formType === 'finance') state.finanzasEstudio.push(data);
      if (formType === 'person') state.equipo.push({ id: data.id, nombre: data.nombre, rol: data.rol, obraIds: formData.getAll('obraIds') });
      save();
      notify('Registro guardado');
      render();
    });
    viewContent.addEventListener('click', event => {
      const target = event.target;
      const projectId = target.dataset.openProject;
      if (projectId) return renderProjectDetail(projectId);
      const deleteProject = target.dataset.deleteProject;
      const deleteMaterial = target.dataset.deleteMaterial;
      const deleteFinance = target.dataset.deleteFinance;
      const deletePerson = target.dataset.deletePerson;
      if (!deleteProject && !deleteMaterial && !deleteFinance && !deletePerson) return;
      if (!confirm('Eliminar este registro?')) return;
      if (deleteProject) {
        state.obras = state.obras.filter(item => item.id !== deleteProject);
        state.materiales = state.materiales.filter(item => item.obraId !== deleteProject);
        state.certificaciones = state.certificaciones.filter(item => item.obraId !== deleteProject);
        state.gastosObra = state.gastosObra.filter(item => item.obraId !== deleteProject);
        state.equipo = state.equipo.map(persona => ({ ...persona, obraIds: persona.obraIds.filter(id => id !== deleteProject) }));
      }
      if (deleteMaterial) state.materiales = state.materiales.filter(item => item.id !== deleteMaterial);
      if (deleteFinance) state.finanzasEstudio = state.finanzasEstudio.filter(item => item.id !== deleteFinance);
      if (deletePerson) state.equipo = state.equipo.filter(item => item.id !== deletePerson);
      save();
      notify('Registro eliminado');
      render();
    });
    detailContent.addEventListener('submit', event => {
      event.preventDefault();
      if (!selectedProjectId) return;
      const form = event.target;
      const data = Object.fromEntries(new FormData(form).entries());
      data.id = crypto.randomUUID();
      data.obraId = selectedProjectId;
      if (form.dataset.form === 'certificate') state.certificaciones.push(data);
      if (form.dataset.form === 'project-expense') state.gastosObra.push(data);
      save();
      notify('Seguimiento actualizado');
      renderStats();
      renderProjectDetail(selectedProjectId);
    });
    detailContent.addEventListener('click', event => {
      const certificateId = event.target.dataset.deleteCertificate;
      const expenseId = event.target.dataset.deleteExpense;
      if (!certificateId && !expenseId) return;
      if (!confirm('Eliminar este registro de seguimiento?')) return;
      if (certificateId) state.certificaciones = state.certificaciones.filter(item => item.id !== certificateId);
      if (expenseId) state.gastosObra = state.gastosObra.filter(item => item.id !== expenseId);
      save();
      renderStats();
      renderProjectDetail(selectedProjectId);
    });
    const closeProjectDetail = () => {
      projectDetail.classList.remove('open');
      projectDetail.setAttribute('aria-hidden', 'true');
      selectedProjectId = null;
      render();
    };
    closeDetail.addEventListener('click', closeProjectDetail);
    projectDetail.addEventListener('click', event => { if (event.target === projectDetail) closeProjectDetail(); });
    document.addEventListener('keydown', event => { if (event.key === 'Escape' && projectDetail.classList.contains('open')) closeProjectDetail(); });
    logout.addEventListener('click', () => { localStorage.removeItem('gb-construction-user'); localStorage.removeItem('brikr-user'); app.style.display = 'none'; site.style.display = 'block'; });
    if (localStorage.getItem('gb-construction-user')) openApp();
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
