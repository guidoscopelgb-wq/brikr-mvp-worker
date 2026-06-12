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
    .project-row { display: grid; grid-template-columns: minmax(170px, 1.3fr) minmax(120px, .8fr) minmax(130px, .8fr) minmax(180px, 1fr); gap: 14px; align-items: center; padding: 16px 18px; border-bottom: 1px solid #edf2ee; }
    .project-row:last-child { border-bottom: 0; }
    .project-row:hover { background: #fbfcf8; }
    .project-row > * { min-width: 0; }
    .project-row .actions { grid-column: 1 / -1; justify-content: flex-end; }
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
    .module-stats { display: grid; grid-template-columns: repeat(6, minmax(0, 1fr)); gap: 10px; margin-bottom: 18px; }
    .module-stats .metric { min-width: 0; }
    .module-stats .metric b { font-size: 22px; overflow-wrap: anywhere; }
    .toolbar { display: flex; flex-wrap: wrap; gap: 10px; align-items: end; padding: 14px 18px; background: #fbfcf8; border-bottom: 1px solid var(--line); }
    .toolbar label { min-width: 150px; flex: 1; }
    .toolbar input, .toolbar select { min-height: 38px; padding: 8px 10px; }
    .sheet-wrap { overflow-x: auto; }
    .sheet { min-width: 1120px; }
    .sheet input, .sheet textarea { min-height: 38px; padding: 8px; border-radius: 5px; }
    .sheet textarea { min-height: 58px; }
    .sheet td { min-width: 112px; }
    .sheet td.wide { min-width: 210px; }
    .sheet-total { font-weight: 900; color: var(--brand-strong); }
    .subitem-list { display: grid; gap: 7px; margin-top: 9px; }
    .subitem { display: grid; grid-template-columns: minmax(0, 1fr) auto; gap: 10px; align-items: start; padding: 9px 10px; border: 1px solid var(--line); border-radius: 6px; background: #f8faf7; }
    .subitem b { display: block; font-size: 13px; }
    .subitem span { color: var(--muted); font-size: 12px; }
    .subitem-editor { display: grid; grid-template-columns: 130px minmax(180px, 1fr) 86px 90px 120px auto; gap: 8px; align-items: end; padding: 10px; border: 1px solid var(--line); border-radius: 7px; background: white; }
    .subitem-editor label { min-width: 0; }
    .subitem-editor input, .subitem-editor select { min-height: 40px; padding: 8px 9px; }
    .detail-grid .subitem-editor { grid-template-columns: 1fr 1fr; }
    .detail-grid .subitem-editor label:nth-child(2), .detail-grid .subitem-editor .btn { grid-column: 1 / -1; }
    .role-badge { display: inline-flex; align-items: center; min-height: 27px; padding: 0 9px; border-radius: 999px; background: #e8f0f6; color: #254f6e; font-size: 12px; font-weight: 850; }
    .permission-note { padding: 10px 12px; border-left: 4px solid var(--brand-3); background: #eef5fa; color: #254f6e; font-size: 13px; }
    .alert { border-left: 4px solid var(--brand-2); padding: 11px 13px; background: #fff8e8; color: #654912; font-size: 13px; }
    .alert.danger { border-left-color: var(--danger); background: var(--danger-soft); color: #752c26; }
    .alert.ok { border-left-color: var(--brand); background: var(--ok-soft); color: var(--brand-strong); }
    .project-cost > b { display: block; white-space: nowrap; }
    .project-cost .alert { display: block; width: 100%; margin-top: 7px; padding: 7px 9px; line-height: 1.3; overflow-wrap: anywhere; }
    .comparison { display: grid; gap: 10px; }
    .comparison-row { display: grid; grid-template-columns: 150px 1fr auto; gap: 12px; align-items: center; }
    .comparison-row .bar { min-width: 0; width: 100%; }
    .status-select { min-height: 36px; padding: 6px 8px; border-radius: 6px; font-size: 13px; font-weight: 800; }
    .chart { display: flex; align-items: end; gap: 9px; min-height: 170px; padding: 18px 16px 8px; border-top: 1px solid var(--line); }
    .chart-group { display: grid; grid-template-columns: 1fr 1fr; align-items: end; gap: 3px; flex: 1; height: 140px; position: relative; }
    .chart-bar { align-self: end; min-height: 3px; background: var(--brand); border-radius: 4px 4px 0 0; }
    .chart-bar.out { background: var(--brand-2); }
    .chart-label { position: absolute; top: 145px; width: 100%; text-align: center; color: var(--muted); font-size: 10px; }
    .split-panels { display: grid; grid-template-columns: 1.2fr .8fr; gap: 16px; }
    .catalog-list { display: grid; gap: 10px; }
    .catalog-item { padding: 11px 12px; border: 1px solid var(--line); border-radius: 7px; background: #fbfcf8; }
    .catalog-item b { display: block; margin-bottom: 5px; }
    .task-list { display: grid; gap: 7px; margin-top: 7px; }
    .task { padding: 8px 10px; border-radius: 6px; background: #f1f5f2; font-size: 13px; }
    .toggle-row { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
    .toggle-row input { width: 20px; min-height: 20px; }
    .hidden { display: none !important; }
    label { color: var(--muted); font-size: 13px; font-weight: 800; }
    fieldset { margin: 0; padding: 0; border: 0; }
    legend { margin-bottom: 7px; color: var(--muted); font-size: 13px; font-weight: 800; }
    input, select, textarea { width: 100%; min-height: 44px; border: 1px solid var(--line); border-radius: 8px; padding: 11px 12px; background: white; color: var(--ink); }
    input:hover, select:hover, textarea:hover { border-color: #b9c8c3; }
    textarea { min-height: 90px; resize: vertical; }
    .modal-backdrop { position: fixed; inset: 0; background: rgba(11,22,18,.5); display: none; place-items: center; padding: 18px; z-index: 20; }
    #confirmModal { z-index: 70; }
    .modal { width: min(430px, 100%); background: white; border-radius: 8px; padding: 22px; box-shadow: var(--shadow); }
    .modal h2 { margin: 0 0 8px; }
    .modal form { display: grid; gap: 11px; margin-top: 16px; }
    .toast { position: fixed; right: 18px; bottom: 18px; background: #10251d; color: white; padding: 12px 14px; border-radius: 8px; display: none; z-index: 30; box-shadow: var(--shadow); }
    @media (prefers-reduced-motion: reduce) {
      *, *::before, *::after { scroll-behavior: auto !important; transition-duration: .01ms !important; animation-duration: .01ms !important; }
    }
    @media (max-width: 980px) {
      .hero, .workspace, .view-grid, .detail-grid, .split-panels { grid-template-columns: 1fr; }
      .visual { min-height: 540px; }
      .grid, .steps, .stat-grid { grid-template-columns: repeat(2, 1fr); }
      .app { grid-template-columns: 1fr; }
      .side { position: static; height: auto; }
      .tabs { grid-template-columns: repeat(5, 1fr); }
      .project-row { grid-template-columns: 1fr 1fr; }
      .project-row .actions { justify-content: flex-start; }
      .module-stats { grid-template-columns: repeat(3, minmax(0, 1fr)); }
      .subitem-editor { grid-template-columns: 1fr 1fr; }
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
      .module-stats { grid-template-columns: 1fr 1fr; }
      .comparison-row { grid-template-columns: 1fr; }
      .detail-backdrop { padding: 0; }
      .detail-modal { min-height: 100%; border-radius: 0; }
      .detail-header { align-items: flex-start; }
      .inline-form { grid-template-columns: 1fr; }
      .inline-form .full, .inline-form .btn { grid-column: auto; }
      .subitem-editor { grid-template-columns: 1fr; }
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
        <button class="tab" data-view="presupuestos">Presupuestos</button>
        <button class="tab" data-view="finanzas">Estudio</button>
        <button class="tab" data-view="equipo">Equipo</button>
        <button class="tab hidden" data-view="usuarios" data-owner-only>Usuarios</button>
      </div>
    </aside>
    <main class="main">
      <div class="top">
        <div><h2 id="viewTitle">Obras</h2><p class="micro" id="viewSub">Resumen operativo de tus proyectos activos.</p></div>
        <div class="actions"><span class="role-badge" id="currentUserLabel"></span><button class="btn ghost" id="logout">Cerrar sesion</button></div>
      </div>
      <section class="module-stats" id="stats"></section>
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
      <p class="micro">Ingresa tus datos para acceder al sistema.</p>
      <form id="authForm" autocomplete="off">
        <label>Email<input id="email" type="email" autocomplete="off" required></label>
        <label>Contrasena<input id="password" type="password" autocomplete="new-password" required minlength="4"></label>
        <div id="authError" class="alert danger hidden" role="alert">Email o contrasena incorrectos.</div>
        <button class="btn primary" type="submit">Entrar al dashboard</button>
        <button class="btn ghost" type="button" id="closeModal">Cancelar</button>
      </form>
    </div>
  </div>
  <div class="modal-backdrop" id="confirmModal">
    <div class="modal" role="dialog" aria-modal="true" aria-labelledby="confirmTitle">
      <h2 id="confirmTitle">Confirmar cambio</h2>
      <p id="confirmMessage"></p>
      <div class="hero-ctas">
        <button class="btn primary" type="button" id="confirmAccept">Confirmar</button>
        <button class="btn ghost" type="button" id="confirmCancel">Cancelar</button>
      </div>
    </div>
  </div>
  <div class="toast" id="toast" role="status" aria-live="polite"></div>

  <script>
    const seed = {
      obras: [
        { id: 'obra-torre', nombre: 'Torre Belgrano', cliente: 'Grupo Norte', estado: 'En obra', presupuesto: 18500000, presupuestoId: 'pres-torre' },
        { id: 'obra-residencia', nombre: 'Residencia Norte', cliente: 'Familia Ledesma', estado: 'Planificacion', presupuesto: 8200000, presupuestoId: '' },
        { id: 'obra-central', nombre: 'Edificio Central', cliente: 'M2 Desarrollos', estado: 'Entrega', presupuesto: 26400000, presupuestoId: '' }
      ],
      presupuestos: [
        {
          id: 'pres-torre', nombre: 'Presupuesto Torre Belgrano', cliente: 'Grupo Norte', estado: 'Aprobado', obraId: 'obra-torre',
          items: [
            { id: 'item-1', certificado: '1', tipo: 'Material', descripcion: 'Cemento Portland', cantidad: 400, unidad: 'bolsas', precioUnitario: 8500, dias: 0 },
            { id: 'item-2', certificado: '1', tipo: 'Material', descripcion: 'Arena gruesa', cantidad: 35, unidad: 'm3', precioUnitario: 32000, dias: 0 },
            { id: 'item-3', certificado: '1', tipo: 'Material', descripcion: 'Cal hidratada', cantidad: 120, unidad: 'bolsas', precioUnitario: 6200, dias: 0 },
            { id: 'item-4', certificado: '1', tipo: 'Mano de obra', descripcion: 'Cuadrilla de estructura y mamposteria', cantidad: 1, unidad: 'global', precioUnitario: 2700000, dias: 53 },
            { id: 'item-5', certificado: '1', tipo: 'Direccion tecnica', descripcion: 'Direccion y control certificado 1', cantidad: 1, unidad: 'global', precioUnitario: 750000, dias: 0 },
            { id: 'item-6', certificado: '2', tipo: 'Material', descripcion: 'Canerias y accesorios sanitarios', cantidad: 1, unidad: 'global', precioUnitario: 1850000, dias: 0 },
            { id: 'item-7', certificado: '2', tipo: 'Mano de obra', descripcion: 'Instalacion sanitaria', cantidad: 1, unidad: 'global', precioUnitario: 1200000, dias: 24 }
          ]
        }
      ],
      certificaciones: [
        { id: crypto.randomUUID(), obraId: 'obra-torre', presupuestoCertificado: '1', periodo: '2026-04', concepto: 'Estructura nivel 8', monto: 2850000, estado: 'Aprobada', subitems: [{ id: crypto.randomUUID(), tipo: 'Material', descripcion: 'Hormigon elaborado', cantidad: 1, unidad: 'global', precioUnitario: 1650000 }, { id: crypto.randomUUID(), tipo: 'Mano de obra', descripcion: 'Cuadrilla de hormigon', cantidad: 1, unidad: 'global', precioUnitario: 1200000 }] },
        { id: crypto.randomUUID(), obraId: 'obra-torre', presupuestoCertificado: '1', periodo: '2026-05', concepto: 'Mamposteria nivel 5', monto: 1980000, estado: 'Pendiente de aprobacion', subitems: [{ id: crypto.randomUUID(), tipo: 'Material', descripcion: 'Ladrillos huecos', cantidad: 1, unidad: 'global', precioUnitario: 1080000 }, { id: crypto.randomUUID(), tipo: 'Mano de obra', descripcion: 'Colocacion de mamposteria', cantidad: 1, unidad: 'global', precioUnitario: 900000 }] },
        { id: crypto.randomUUID(), obraId: 'obra-central', presupuestoCertificado: '', periodo: '2026-05', concepto: 'Terminaciones finales', monto: 4300000, estado: 'Cobrada', subitems: [{ id: crypto.randomUUID(), tipo: 'Trabajo', descripcion: 'Terminaciones finales', cantidad: 1, unidad: 'global', precioUnitario: 4300000 }] }
      ],
      gastosObra: [
        { id: crypto.randomUUID(), obraId: 'obra-torre', fecha: '2026-05-08', categoria: 'Mano de obra', subcategoria: 'Contratistas externos', concepto: 'Cuadrilla estructura', monto: 1480000, estado: 'Pagado', medioPago: 'Transferencia', observaciones: '', presupuestado: true, presupuestoItemId: 'item-1' },
        { id: crypto.randomUUID(), obraId: 'obra-torre', fecha: '2026-05-10', categoria: 'Materiales', subcategoria: 'Cemento y aridos', concepto: 'Compra de cemento', monto: 840000, estado: 'Pendiente de pago', medioPago: 'Cuenta corriente', observaciones: '', presupuestado: true, presupuestoItemId: 'item-1' },
        { id: crypto.randomUUID(), obraId: 'obra-central', fecha: '2026-05-04', categoria: 'Servicios y alquileres', subcategoria: 'Servicios tercerizados', concepto: 'Limpieza final', monto: 310000, estado: 'Pagado', medioPago: 'Transferencia', observaciones: '', presupuestado: false, presupuestoItemId: '' }
      ],
      finanzasEstudio: [
        { id: crypto.randomUUID(), fecha: '2026-05-05', tipo: 'Ingreso', categoria: 'Administracion', subcategoria: 'Otros', concepto: 'Anticipo proyecto Caballito', monto: 2200000, estado: 'Cobrado', observaciones: '' },
        { id: crypto.randomUUID(), fecha: '2026-05-06', tipo: 'Egreso', categoria: 'Administracion', subcategoria: 'Alquiler', concepto: 'Alquiler oficina', monto: 680000, estado: 'Pagado', observaciones: '' },
        { id: crypto.randomUUID(), fecha: '2026-05-09', tipo: 'Egreso', categoria: 'Administracion', subcategoria: 'Software', concepto: 'Licencias y servicios', monto: 175000, estado: 'Pagado', observaciones: '' }
      ],
      equipo: [
        { id: crypto.randomUUID(), nombre: 'Julia Benitez', rol: 'Arquitecta', activo: true, asignaciones: [{ obraId: 'obra-torre', tarea: 'Revision de estructura' }, { obraId: 'obra-residencia', tarea: 'Anteproyecto ejecutivo' }] },
        { id: crypto.randomUUID(), nombre: 'Martin Paz', rol: 'Supervisor', activo: true, asignaciones: [{ obraId: 'obra-torre', tarea: 'Coordinacion de contratistas' }, { obraId: 'obra-central', tarea: 'Control de entrega' }] }
      ],
      usuarios: [
        { id: 'user-owner', nombre: 'Propietario principal', email: 'test@test', password: 'GB2026', tipo: 'Propietario', activo: true, obraIds: [] }
      ],
      catalogos: {
        obra: {
          'Materiales': ['Cemento y aridos', 'Hierro y estructura', 'Ladrillos, bloques y mamposteria', 'Instalaciones electricas', 'Instalaciones sanitarias', 'Revestimientos', 'Pintura', 'Aberturas', 'Equipamiento', 'Otros materiales'],
          'Mano de obra': ['Albanileria', 'Electricidad', 'Plomeria', 'Pintura', 'Carpinteria', 'Herreria', 'Direccion de obra', 'Contratistas externos', 'Jornales', 'Otros'],
          'Servicios y alquileres': ['Alquiler de maquinaria', 'Fletes', 'Volquetes', 'Servicios tercerizados', 'Seguridad e higiene', 'Otros servicios'],
          'Administracion de obra': ['Permisos', 'Tasas', 'Honorarios', 'Documentacion tecnica', 'Imprevistos', 'Otros administrativos']
        },
        estudio: {
          'Administracion': ['Alquiler', 'Servicios', 'Internet y telefonia', 'Software', 'Papeleria', 'Gestion contable', 'Impuestos', 'Otros'],
          'Personal': ['Sueldos', 'Honorarios', 'Cargas sociales', 'Bonos', 'Viaticos', 'Capacitaciones'],
          'Comercial': ['Publicidad', 'Marketing', 'Reuniones comerciales', 'Comisiones', 'Diseno y comunicacion'],
          'Operacion general': ['Movilidad', 'Mantenimiento', 'Equipamiento', 'Compras internas', 'Otros']
        }
      }
    };
    const views = {
      obras: ['Obras', 'Cartera, certificaciones, cobros y desvios por proyecto.'],
      presupuestos: ['Presupuestos', 'Certificaciones presupuestadas con materiales y trabajos desglosados en subitems.'],
      finanzas: ['Finanzas del estudio', 'Ingresos y egresos administrativos separados de las obras.'],
      equipo: ['Equipo', 'Personas, disponibilidad, obras asignadas y tareas actuales.'],
      usuarios: ['Usuarios', 'Accesos internos, roles y proyectos habilitados.']
    };
    const legacyState = localStorage.getItem('brikr-mvp');
    if (legacyState && !localStorage.getItem('gb-construction-assistant')) {
      localStorage.setItem('gb-construction-assistant', legacyState);
    }
    let state = JSON.parse(localStorage.getItem('gb-construction-assistant') || 'null') || seed;
    const normalizeState = () => {
      state.obras = Array.isArray(state.obras) ? state.obras : [];
      state.obras = state.obras.map(({ avanceReal, avance, ...obra }) => ({ ...obra, presupuestoId: obra.presupuestoId || '', presupuesto: number(obra.presupuesto) }));
      state.presupuestos = Array.isArray(state.presupuestos) ? state.presupuestos : [];
      state.presupuestos = state.presupuestos.map(presupuesto => {
        const sourceItems = Array.isArray(presupuesto.items) ? presupuesto.items : [];
        const items = sourceItems.flatMap(item => {
          if (item.tipo || item.descripcion || item.precioUnitario !== undefined) {
            return [{
              id: item.id || crypto.randomUUID(),
              certificado: item.certificado || '',
              tipo: item.tipo || 'Trabajo',
              descripcion: item.descripcion || item.trabajo || 'Item presupuestado',
              cantidad: number(item.cantidad || 1),
              unidad: item.unidad || 'global',
              precioUnitario: number(item.precioUnitario),
              dias: number(item.dias)
            }];
          }
          const legacy = [
            ['Mano de obra', item.manoObra || item.trabajo, item.montoManoObra],
            ['Material', item.materiales || item.trabajo, item.montoMateriales],
            ['Direccion tecnica', 'Direccion tecnica - ' + (item.trabajo || 'Trabajo'), item.montoDireccion]
          ].filter(([, , amount]) => number(amount) > 0);
          return legacy.map(([tipo, descripcion, amount], index) => ({
            id: index ? crypto.randomUUID() : (item.id || crypto.randomUUID()),
            certificado: item.certificado || '',
            tipo,
            descripcion: descripcion || item.trabajo || 'Item presupuestado',
            cantidad: 1,
            unidad: 'global',
            precioUnitario: number(amount),
            dias: index === 0 ? number(item.dias) : 0
          }));
        });
        return { ...presupuesto, items };
      });
      state.certificaciones = (state.certificaciones || []).map(item => {
        const estado = item.estado === 'Presentada' ? 'Pendiente de aprobacion' : item.estado;
        const subitems = Array.isArray(item.subitems) && item.subitems.length
          ? item.subitems.map(subitem => ({
              id: subitem.id || crypto.randomUUID(),
              tipo: subitem.tipo || 'Trabajo',
              descripcion: subitem.descripcion || item.concepto || 'Subitem',
              cantidad: number(subitem.cantidad || 1),
              unidad: subitem.unidad || 'global',
              precioUnitario: number(subitem.precioUnitario ?? subitem.monto)
            }))
          : [{ id: crypto.randomUUID(), tipo: 'Trabajo', descripcion: item.concepto || 'Certificacion', cantidad: 1, unidad: 'global', precioUnitario: number(item.monto) }];
        return {
          ...item,
          estado: ['Pendiente de aprobacion', 'Aprobada', 'Cobrada'].includes(estado) ? estado : 'Pendiente de aprobacion',
          subitems,
          monto: subitems.reduce((sum, subitem) => sum + number(subitem.cantidad) * number(subitem.precioUnitario), 0)
        };
      });
      state.gastosObra = Array.isArray(state.gastosObra) ? state.gastosObra : (state.finanzas || []).filter(item => item.obra).map(item => ({
        id: item.id || crypto.randomUUID(),
        obraId: (state.obras.find(obra => obra.nombre === item.obra) || {}).id || '',
        fecha: item.fecha || '',
        categoria: item.categoria || 'Administracion de obra',
        subcategoria: item.subcategoria || 'Otros administrativos',
        concepto: item.concepto,
        monto: item.monto,
        estado: item.estado === 'Pagado' ? 'Pagado' : 'Pendiente de pago',
        medioPago: item.medioPago || '',
        observaciones: item.observaciones || '',
        presupuestado: Boolean(item.presupuestado),
        presupuestoItemId: item.presupuestoItemId || ''
      }));
      const legacyMaterials = Array.isArray(state.materiales) ? state.materiales : [];
      legacyMaterials.forEach(item => {
        if (!state.gastosObra.some(gasto => gasto.legacyMaterialId === item.id)) {
          state.gastosObra.push({
            id: crypto.randomUUID(), legacyMaterialId: item.id, obraId: item.obraId || '', fecha: today(),
            categoria: 'Materiales', subcategoria: 'Otros materiales', concepto: item.item || 'Material',
            monto: number(item.costo), estado: item.estado === 'Entregado' ? 'Pagado' : 'Pendiente de pago',
            medioPago: '', observaciones: 'Migrado desde el modulo anterior de materiales.',
            presupuestado: false, presupuestoItemId: ''
          });
        }
      });
      delete state.materiales;
      state.finanzasEstudio = Array.isArray(state.finanzasEstudio) ? state.finanzasEstudio : [];
      state.finanzasEstudio = state.finanzasEstudio.map(item => ({
        ...item,
        categoria: item.categoria || 'Administracion',
        subcategoria: item.subcategoria || 'Otros',
        observaciones: item.observaciones || ''
      }));
      state.equipo = (state.equipo || []).map(persona => ({
        ...persona,
        activo: persona.activo !== false,
        asignaciones: Array.isArray(persona.asignaciones)
          ? persona.asignaciones
          : (persona.obraIds || [((state.obras.find(obra => obra.nombre === persona.obra) || {}).id || '')].filter(Boolean)).map(obraId => ({ obraId, tarea: '' }))
      }));
      state.usuarios = Array.isArray(state.usuarios) && state.usuarios.length ? state.usuarios : structuredClone(seed.usuarios);
      state.usuarios = state.usuarios.map(usuario => ({
        ...usuario,
        id: usuario.id || crypto.randomUUID(),
        nombre: usuario.nombre || usuario.email,
        email: String(usuario.email || '').trim().toLowerCase(),
        password: usuario.password || '',
        tipo: usuario.tipo === 'Supervisor' ? 'Supervisor' : 'Propietario',
        activo: usuario.activo !== false,
        obraIds: Array.isArray(usuario.obraIds) ? usuario.obraIds : []
      }));
      state.catalogos = state.catalogos || structuredClone(seed.catalogos);
      state.catalogos.obra = state.catalogos.obra || structuredClone(seed.catalogos.obra);
      state.catalogos.estudio = state.catalogos.estudio || structuredClone(seed.catalogos.estudio);
    };
    let current = 'obras';
    let selectedProjectId = null;
    const money = value => new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(Number(value || 0));
    const number = value => Number(value || 0);
    const escapeHtml = value => String(value ?? '').replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' })[character]);
    const obraById = id => state.obras.find(obra => obra.id === id);
    const obraName = id => (obraById(id) || {}).nombre || 'Obra sin asignar';
    const obraOptions = selected => '<option value="">Seleccionar obra</option>' + state.obras.map(obra => '<option value="' + escapeHtml(obra.id) + '"' + (obra.id === selected ? ' selected' : '') + '>' + escapeHtml(obra.nombre) + '</option>').join('');
    const today = () => new Date().toISOString().slice(0, 10);
    normalizeState();
    const save = () => localStorage.setItem('gb-construction-assistant', JSON.stringify(state));
    const notify = text => { toast.textContent = text; toast.style.display = 'block'; setTimeout(() => toast.style.display = 'none', 2200); };
    const budgetById = id => state.presupuestos.find(item => item.id === id);
    const currentUser = () => state.usuarios.find(usuario => usuario.email === localStorage.getItem('gb-construction-user') && usuario.activo);
    const isOwner = () => currentUser()?.tipo === 'Propietario';
    const canAccessObra = obraId => isOwner() || Boolean(currentUser()?.obraIds.includes(obraId));
    const visibleObras = () => state.obras.filter(obra => canAccessObra(obra.id));
    const budgetItemTotal = item => number(item.cantidad) * number(item.precioUnitario);
    const budgetTotal = presupuesto => (presupuesto?.items || []).reduce((sum, item) => sum + budgetItemTotal(item), 0);
    const budgetDays = presupuesto => Object.values((presupuesto?.items || []).reduce((groups, item) => {
      groups[item.certificado || 'sin-certificado'] = Math.max(groups[item.certificado || 'sin-certificado'] || 0, number(item.dias));
      return groups;
    }, {})).reduce((sum, days) => sum + number(days), 0);
    const certificateTotal = certificate => (certificate.subitems || []).reduce((sum, subitem) => sum + number(subitem.cantidad) * number(subitem.precioUnitario), 0);
    const projectCertificates = obraId => state.certificaciones.filter(item => item.obraId === obraId);
    const projectExpenses = obraId => state.gastosObra.filter(item => item.obraId === obraId);
    const itemTypeOptions = selected => ['Material', 'Mano de obra', 'Direccion tecnica', 'Trabajo', 'Otro'].map(value => '<option' + (value === selected ? ' selected' : '') + '>' + value + '</option>').join('');
    const certificateSubitemEditor = (subitem = {}) =>
      '<div class="subitem-editor" data-certificate-subitem>' +
        '<label>Tipo<select data-subitem-field="tipo">' + itemTypeOptions(subitem.tipo || 'Material') + '</select></label>' +
        '<label>Item / subitem<input data-subitem-field="descripcion" value="' + escapeHtml(subitem.descripcion || '') + '" required></label>' +
        '<label>Cantidad<input data-subitem-field="cantidad" type="number" min="0" step="0.01" value="' + number(subitem.cantidad || 1) + '" required></label>' +
        '<label>Unidad<input data-subitem-field="unidad" value="' + escapeHtml(subitem.unidad || 'unidad') + '" required></label>' +
        '<label>Precio unitario<input data-subitem-field="precioUnitario" type="number" min="0" step="0.01" value="' + number(subitem.precioUnitario) + '" required></label>' +
        '<button class="btn warn small" type="button" data-remove-certificate-subitem>Quitar</button>' +
      '</div>';
    const updateCertificateFormTotal = form => {
      const total = [...form.querySelectorAll('[data-certificate-subitem]')].reduce((sum, row) => {
        return sum + number(row.querySelector('[data-subitem-field="cantidad"]')?.value) * number(row.querySelector('[data-subitem-field="precioUnitario"]')?.value);
      }, 0);
      const output = form.querySelector('[data-certificate-total]');
      if (output) output.textContent = 'Total de la certificacion: ' + money(total);
    };
    const importBudgetCertificateSubitems = form => {
      if (!isOwner() || form.elements.montoModo?.value !== 'presupuesto' || !form.elements.presupuestoCertificado?.value) return;
      const obra = obraById(selectedProjectId);
      const presupuesto = budgetById(obra?.presupuestoId);
      const items = presupuesto?.items.filter(item => item.certificado === form.elements.presupuestoCertificado.value) || [];
      const container = form.querySelector('[data-certificate-subitems]');
      container.innerHTML = items.length ? items.map(item => certificateSubitemEditor(item)).join('') : certificateSubitemEditor();
      updateCertificateFormTotal(form);
    };
    const updateBudgetDetailSummary = presupuesto => {
      const values = {
        total: money(budgetTotal(presupuesto)),
        labor: money(presupuesto.items.filter(item => item.tipo === 'Mano de obra').reduce((sum, item) => sum + budgetItemTotal(item), 0)),
        materials: money(presupuesto.items.filter(item => item.tipo === 'Material').reduce((sum, item) => sum + budgetItemTotal(item), 0)),
        certificates: new Set(presupuesto.items.map(item => item.certificado).filter(Boolean)).size
      };
      Object.entries(values).forEach(([key, value]) => {
        const element = detailContent.querySelector('[data-budget-summary="' + key + '"]');
        if (element) element.textContent = value;
      });
    };
    const categoryOptions = scope => Object.keys(state.catalogos[scope] || {}).map(category => '<option>' + escapeHtml(category) + '</option>').join('');
    const subcategoryOptions = (scope, category, selected = '') => ((state.catalogos[scope] || {})[category] || []).map(value => '<option' + (value === selected ? ' selected' : '') + '>' + escapeHtml(value) + '</option>').join('');
    const askConfirm = message => new Promise(resolve => {
      confirmMessage.textContent = message;
      confirmModal.style.display = 'grid';
      const finish = value => {
        confirmModal.style.display = 'none';
        confirmAccept.onclick = null;
        confirmCancel.onclick = null;
        resolve(value);
      };
      confirmAccept.onclick = () => finish(true);
      confirmCancel.onclick = () => finish(false);
    });
    const metricCards = items => items.map(([label, value, tone]) => '<div class="metric"><b class="' + (tone || '') + '">' + value + '</b><span>' + label + '</span></div>').join('');
    function configureNavigation() {
      const usuario = currentUser();
      const allowedViews = usuario?.tipo === 'Supervisor' ? ['obras', 'equipo'] : Object.keys(views);
      document.querySelectorAll('.tab').forEach(tab => {
        const allowed = allowedViews.includes(tab.dataset.view);
        tab.classList.toggle('hidden', !allowed);
        tab.disabled = !allowed;
      });
      document.querySelectorAll('[data-owner-only]').forEach(element => element.classList.toggle('hidden', !isOwner()));
      if (!allowedViews.includes(current)) current = 'obras';
      currentUserLabel.textContent = (usuario?.nombre || '') + ' · ' + (usuario?.tipo || '');
    }
    function openApp() { site.style.display = 'none'; app.style.display = 'grid'; current = 'obras'; configureNavigation(); render(); }
    function renderStats() {
      if (current === 'obras') {
        const works = visibleObras();
        const active = works.filter(item => item.estado !== 'Finalizada');
        const finished = works.filter(item => item.estado === 'Finalizada');
        if (!isOwner()) {
          const workIds = new Set(works.map(item => item.id));
          const certificates = state.certificaciones.filter(item => workIds.has(item.obraId));
          const expenses = state.gastosObra.filter(item => workIds.has(item.obraId));
          const assignedPeople = state.equipo.filter(persona => persona.asignaciones.some(item => workIds.has(item.obraId))).length;
          stats.innerHTML = metricCards([
            ['Obras habilitadas', works.length],
            ['En curso', active.length],
            ['Certificados pendientes', certificates.filter(item => item.estado === 'Pendiente de aprobacion').length],
            ['Gastos pendientes', expenses.filter(item => item.estado === 'Pendiente de pago').length],
            ['Gastos registrados', money(expenses.reduce((sum, item) => sum + number(item.monto), 0))],
            ['Personal visible', assignedPeople]
          ]);
          return;
        }
        const quoted = active.reduce((sum, item) => sum + number(item.presupuesto), 0);
        const certified = state.certificaciones.reduce((sum, item) => sum + certificateTotal(item), 0);
        const collected = state.certificaciones.filter(item => item.estado === 'Cobrada').reduce((sum, item) => sum + certificateTotal(item), 0);
        const spent = state.gastosObra.reduce((sum, item) => sum + number(item.monto), 0);
        const alerts = state.obras.filter(obra => {
          const spent = projectExpenses(obra.id).reduce((sum, item) => sum + number(item.monto), 0);
          const certified = projectCertificates(obra.id).reduce((sum, item) => sum + certificateTotal(item), 0);
          const certifiedPct = number(obra.presupuesto) ? certified / number(obra.presupuesto) * 100 : 0;
          return spent > number(obra.presupuesto) * Math.max(certifiedPct / 100, .15);
        }).length;
        stats.innerHTML = metricCards([
          ['Obras activas', active.length], ['Finalizadas', finished.length], ['Cotizado activo', money(quoted)],
          ['Certificado', money(certified)], ['Cobrado', money(collected)], ['Gastado', money(spent)], ['Alertas economicas', alerts, alerts ? 'money-out' : 'money-in']
        ]);
      }
      if (current === 'presupuestos') {
        const total = state.presupuestos.reduce((sum, item) => sum + budgetTotal(item), 0);
        const avgDays = state.presupuestos.length ? Math.round(state.presupuestos.reduce((sum, item) => sum + budgetDays(item), 0) / state.presupuestos.length) : 0;
        stats.innerHTML = metricCards([
          ['Presupuestos', state.presupuestos.length],
          ['Aprobados', state.presupuestos.filter(item => item.estado === 'Aprobado').length],
          ['Pendientes', state.presupuestos.filter(item => item.estado === 'Pendiente').length],
          ['Monto total', money(total)],
          ['Promedio', money(state.presupuestos.length ? total / state.presupuestos.length : 0)],
          ['Plazo promedio', avgDays + ' dias'],
          ['Convertidos en obra', state.presupuestos.filter(item => item.obraId).length]
        ]);
      }
      if (current === 'finanzas') {
        const income = state.finanzasEstudio.filter(item => item.tipo === 'Ingreso').reduce((sum, item) => sum + number(item.monto), 0);
        const expense = state.finanzasEstudio.filter(item => item.tipo !== 'Ingreso').reduce((sum, item) => sum + number(item.monto), 0);
        const pending = state.finanzasEstudio.filter(item => item.estado === 'Pendiente').reduce((sum, item) => sum + number(item.monto), 0);
        const byCategory = {};
        state.finanzasEstudio.filter(item => item.tipo !== 'Ingreso').forEach(item => { byCategory[item.categoria] = (byCategory[item.categoria] || 0) + number(item.monto); });
        const mainCategory = Object.entries(byCategory).sort((a, b) => b[1] - a[1])[0]?.[0] || '-';
        stats.innerHTML = metricCards([
          ['Ingresos', money(income), 'money-in'], ['Egresos', money(expense), 'money-out'], ['Resultado neto', money(income - expense)],
          ['Pendiente', money(pending)], ['Categoria principal', escapeHtml(mainCategory)], ['Movimientos', state.finanzasEstudio.length]
        ]);
      }
      if (current === 'equipo') {
        const workIds = new Set(visibleObras().map(item => item.id));
        const availablePeople = isOwner() ? state.equipo : state.equipo.filter(persona => persona.asignaciones.some(item => workIds.has(item.obraId)));
        const activePeople = availablePeople.filter(item => item.activo);
        const assigned = activePeople.filter(item => item.asignaciones.length);
        const activeWorks = visibleObras().filter(item => item.estado !== 'Finalizada');
        const worksWithTeam = activeWorks.filter(obra => activePeople.some(person => person.asignaciones.some(item => item.obraId === obra.id)));
        stats.innerHTML = metricCards([
          ['Personas activas', activePeople.length], ['Asignadas', assigned.length], ['Sin asignacion', activePeople.length - assigned.length],
          ['Obras con equipo', worksWithTeam.length], ['Obras sin equipo', activeWorks.length - worksWithTeam.length],
          ['Promedio de obras', activePeople.length ? (assigned.reduce((sum, item) => sum + item.asignaciones.length, 0) / activePeople.length).toFixed(1) : '0'],
          ['Tareas activas', activePeople.reduce((sum, item) => sum + item.asignaciones.filter(task => task.tarea).length, 0)]
        ]);
      }
      if (current === 'usuarios') {
        const activeUsers = state.usuarios.filter(item => item.activo);
        stats.innerHTML = metricCards([
          ['Usuarios', state.usuarios.length],
          ['Activos', activeUsers.length],
          ['Propietarios', state.usuarios.filter(item => item.tipo === 'Propietario').length],
          ['Supervisores', state.usuarios.filter(item => item.tipo === 'Supervisor').length],
          ['Proyectos habilitados', state.usuarios.reduce((sum, item) => sum + item.obraIds.length, 0)]
        ]);
      }
    }
    function renderObras() {
      const works = visibleObras();
      const rows = works.length ? works.map(obra => {
        const certificates = projectCertificates(obra.id);
        const certified = certificates.reduce((sum, item) => sum + certificateTotal(item), 0);
        const certifiedPct = number(obra.presupuesto) ? Math.round(certified / number(obra.presupuesto) * 100) : 0;
        const expenses = projectExpenses(obra.id).reduce((sum, item) => sum + number(item.monto), 0);
        const expectedSpend = number(obra.presupuesto) * certifiedPct / 100;
        const deviation = expenses - expectedSpend;
        const alertClass = deviation > number(obra.presupuesto) * .08 ? 'danger' : 'ok';
        const costStatus = isOwner()
          ? '<span class="alert ' + alertClass + '">' + (deviation > 0 ? 'Sobre' : 'Bajo') + ' curva: ' + money(Math.abs(deviation)) + '</span>'
          : '<span class="project-meta">Gastos registrados</span>';
        return '<article class="project-row">' +
          '<div><div class="project-name">' + escapeHtml(obra.nombre) + '</div><div class="project-meta">' + escapeHtml(obra.cliente) + '</div></div>' +
          '<div><span class="pill">' + escapeHtml(obra.estado) + '</span></div>' +
          '<div class="progress-cell"><b>' + certifiedPct + '% certificado</b><div class="bar"><i style="width:' + Math.min(100, certifiedPct) + '%"></i></div></div>' +
          '<div class="project-cost"><b>' + money(expenses) + '</b>' + costStatus + '</div>' +
          '<div class="actions"><button class="btn secondary small" type="button" data-open-project="' + escapeHtml(obra.id) + '">Seguimiento</button>' + (isOwner() ? '<button class="btn warn small" type="button" data-delete-project="' + escapeHtml(obra.id) + '">Eliminar</button>' : '') + '</div>' +
        '</article>';
      }).join('') : '<div class="empty">No hay obras habilitadas para este usuario.</div>';
      const budgetOptions = state.presupuestos.filter(item => !item.obraId).map(item => '<option value="' + escapeHtml(item.id) + '">' + escapeHtml(item.nombre) + ' · ' + money(budgetTotal(item)) + '</option>').join('');
      viewContent.innerHTML =
        '<div class="' + (isOwner() ? 'view-grid' : '') + '"><section class="panel"><div class="toolbar"><label>Filtrar por estado<select data-filter="project-status"><option value="">Todos</option><option>Planificacion</option><option>En obra</option><option>Pausada</option><option>Entrega</option><option>Finalizada</option></select></label><label>Buscar<input data-filter="project-search" placeholder="Obra o cliente"></label></div><div class="section-head"><div><h3>Cartera de obras</h3><p>' + (isOwner() ? 'Seguimiento económico, operativo y administrativo.' : 'Solo se muestran las obras habilitadas para tu usuario.') + '</p></div></div><div class="project-list" id="projectList">' + rows + '</div></section>' +
        (isOwner() ?
        '<form class="form" data-form="obra"><h3>Nueva obra</h3>' +
          '<label>Origen<select name="origen" data-project-origin><option value="cero">Crear desde cero</option><option value="presupuesto">Crear desde presupuesto</option></select></label>' +
          '<label class="hidden" data-budget-field>Presupuesto existente<select name="presupuestoId"><option value="">Seleccionar presupuesto</option>' + budgetOptions + '</select></label>' +
          '<label>Nombre<input name="nombre" required></label>' +
          '<label>Cliente<input name="cliente" required></label>' +
          '<label>Estado<select name="estado" required><option>Planificacion</option><option>En obra</option><option>Pausada</option><option>Entrega</option><option>Finalizada</option></select></label>' +
          '<label>Monto total cotizado<input name="presupuesto" type="number" min="0" required></label>' +
          '<label class="hidden toggle-row" data-import-field><span>Importar certificaciones presupuestadas</span><input name="importarCertificados" type="checkbox" checked></label>' +
          '<button class="btn primary" type="submit">Crear obra</button></form>' : '') + '</div>';
    }
    function renderBudgets() {
      const rows = state.presupuestos.length ? state.presupuestos.map(item => {
        const total = budgetTotal(item);
        return '<tr><td><b>' + escapeHtml(item.nombre) + '</b><div class="project-meta">' + escapeHtml(item.cliente || 'Sin cliente') + '</div></td><td><span class="pill">' + escapeHtml(item.estado) + '</span></td><td>' + item.items.length + '</td><td>' + money(total) + '</td><td>' + budgetDays(item) + ' dias</td><td>' + escapeHtml(item.obraId ? obraName(item.obraId) : 'Sin convertir') + '</td><td><div class="actions"><button class="btn secondary small" type="button" data-open-budget="' + item.id + '">Editar planilla</button><button class="btn ghost small" type="button" data-duplicate-budget="' + item.id + '">Duplicar</button><button class="btn warn small" type="button" data-delete-budget="' + item.id + '">Eliminar</button></div></td></tr>';
      }).join('') : '<tr><td colspan="7" class="empty">No hay presupuestos cargados.</td></tr>';
      viewContent.innerHTML =
        '<div class="view-grid"><section class="panel"><div class="toolbar"><label>Estado<select data-filter="budget-status"><option value="">Todos</option><option>Pendiente</option><option>Aprobado</option><option>Rechazado</option></select></label><label>Buscar<input data-filter="budget-search" placeholder="Presupuesto o cliente"></label></div><div class="table-wrap"><table><thead><tr><th>PRESUPUESTO</th><th>ESTADO</th><th>SUBITEMS</th><th>TOTAL</th><th>PLAZO</th><th>OBRA</th><th></th></tr></thead><tbody id="budgetRows">' + rows + '</tbody></table></div></section>' +
        '<form class="form" data-form="budget"><h3>Nuevo presupuesto</h3><label>Nombre<input name="nombre" required></label><label>Cliente<input name="cliente" required></label><label>Estado<select name="estado"><option>Pendiente</option><option>Aprobado</option><option>Rechazado</option></select></label><button class="btn primary" type="submit">Crear presupuesto</button><div class="helper">Luego podrás cargar y editar los ítems en una planilla.</div></form></div>';
    }
    function renderBudgetDetail(id) {
      if (!isOwner()) return;
      const presupuesto = budgetById(id);
      if (!presupuesto) return;
      selectedProjectId = null;
      delete projectDetail.dataset.personId;
      delete projectDetail.dataset.userId;
      projectDetail.dataset.budgetId = id;
      detailTitle.textContent = presupuesto.nombre;
      detailSubtitle.textContent = presupuesto.cliente + ' · ' + presupuesto.estado;
      const labor = presupuesto.items.filter(item => item.tipo === 'Mano de obra').reduce((sum, item) => sum + budgetItemTotal(item), 0);
      const materials = presupuesto.items.filter(item => item.tipo === 'Material').reduce((sum, item) => sum + budgetItemTotal(item), 0);
      const rows = presupuesto.items.map(item =>
        '<tr data-budget-item="' + item.id + '">' +
          '<td><input data-budget-field="certificado" value="' + escapeHtml(item.certificado) + '"></td>' +
          '<td><select data-budget-field="tipo">' + itemTypeOptions(item.tipo) + '</select></td>' +
          '<td class="wide"><textarea data-budget-field="descripcion">' + escapeHtml(item.descripcion) + '</textarea></td>' +
          '<td><input data-budget-field="cantidad" type="number" min="0" step="0.01" value="' + number(item.cantidad) + '"></td>' +
          '<td><input data-budget-field="unidad" value="' + escapeHtml(item.unidad) + '"></td>' +
          '<td><input data-budget-field="precioUnitario" type="number" min="0" step="0.01" value="' + number(item.precioUnitario) + '"></td>' +
          '<td><input data-budget-field="dias" type="number" min="0" value="' + number(item.dias) + '"></td>' +
          '<td class="sheet-total">' + money(budgetItemTotal(item)) + '</td>' +
          '<td><button class="danger-link" type="button" data-delete-budget-item="' + item.id + '">Eliminar</button></td>' +
        '</tr>'
      ).join('');
      const certificateCount = new Set(presupuesto.items.map(item => item.certificado).filter(Boolean)).size;
      detailContent.innerHTML =
        '<div class="summary-band"><div class="summary-item"><b data-budget-summary="total">' + money(budgetTotal(presupuesto)) + '</b><span>Total presupuesto</span></div><div class="summary-item"><b data-budget-summary="labor">' + money(labor) + '</b><span>Mano de obra</span></div><div class="summary-item"><b data-budget-summary="materials">' + money(materials) + '</b><span>Materiales</span></div><div class="summary-item"><b data-budget-summary="certificates">' + certificateCount + '</b><span>Certificaciones</span></div></div>' +
        '<section class="panel" style="margin-top:16px"><div class="section-head"><div><h3>Planilla de subitems</h3><p>Repita el número de certificación para cargar cemento, arena, cal u otros ítems por separado.</p></div><div class="actions"><select class="status-select" data-budget-status-edit><option' + (presupuesto.estado === 'Pendiente' ? ' selected' : '') + '>Pendiente</option><option' + (presupuesto.estado === 'Aprobado' ? ' selected' : '') + '>Aprobado</option><option' + (presupuesto.estado === 'Rechazado' ? ' selected' : '') + '>Rechazado</option></select><button class="btn primary small" type="button" data-add-budget-item>Agregar subitem</button><button class="btn ghost small" type="button" data-print-budget>Imprimir</button></div></div><div class="sheet-wrap"><table class="sheet"><thead><tr><th>CERT.</th><th>TIPO</th><th>ITEM / SUBITEM</th><th>CANT.</th><th>UNIDAD</th><th>PRECIO UNIT.</th><th>DIAS</th><th>TOTAL</th><th></th></tr></thead><tbody>' + rows + '</tbody></table></div></section>';
      projectDetail.classList.add('open');
      projectDetail.setAttribute('aria-hidden', 'false');
    }
    function renderFinances() {
      const income = state.finanzasEstudio.filter(item => item.tipo === 'Ingreso').reduce((sum, item) => sum + number(item.monto), 0);
      const expenses = state.finanzasEstudio.filter(item => item.tipo !== 'Ingreso').reduce((sum, item) => sum + number(item.monto), 0);
      const rows = state.finanzasEstudio.length ? state.finanzasEstudio.slice().sort((a, b) => String(b.fecha).localeCompare(String(a.fecha))).map(item =>
        '<tr><td>' + escapeHtml(item.fecha || '-') + '</td><td><span class="pill">' + escapeHtml(item.tipo) + '</span></td><td><b>' + escapeHtml(item.concepto) + '</b><div class="project-meta">' + escapeHtml(item.categoria) + ' · ' + escapeHtml(item.subcategoria) + '</div></td><td class="' + (item.tipo === 'Ingreso' ? 'money-in' : 'money-out') + '">' + (item.tipo === 'Ingreso' ? '+' : '-') + money(item.monto) + '</td><td>' + escapeHtml(item.estado) + '</td><td><button class="btn warn small" type="button" data-delete-finance="' + escapeHtml(item.id) + '">Eliminar</button></td></tr>'
      ).join('') : '<tr><td colspan="6" class="empty">No hay movimientos del estudio.</td></tr>';
      const monthly = {};
      state.finanzasEstudio.forEach(item => {
        const month = String(item.fecha || '').slice(0, 7) || 'Sin fecha';
        monthly[month] = monthly[month] || { income: 0, expense: 0 };
        if (item.tipo === 'Ingreso') monthly[month].income += number(item.monto); else monthly[month].expense += number(item.monto);
      });
      const months = Object.keys(monthly).sort().slice(-6);
      const maxMonth = Math.max(1, ...months.flatMap(month => [monthly[month].income, monthly[month].expense]));
      const chart = months.map(month => '<div class="chart-group"><div class="chart-bar" title="Ingresos ' + money(monthly[month].income) + '" style="height:' + Math.max(2, monthly[month].income / maxMonth * 100) + '%"></div><div class="chart-bar out" title="Egresos ' + money(monthly[month].expense) + '" style="height:' + Math.max(2, monthly[month].expense / maxMonth * 100) + '%"></div><span class="chart-label">' + escapeHtml(month.slice(5)) + '</span></div>').join('');
      const categories = Object.entries(state.catalogos.estudio).map(([category, values]) => '<div class="catalog-item"><b>' + escapeHtml(category) + '</b><span class="project-meta">' + escapeHtml(values.join(' · ')) + '</span></div>').join('');
      viewContent.innerHTML =
        '<div class="view-grid"><section class="panel"><div class="toolbar"><label>Tipo<select data-filter="finance-type"><option value="">Todos</option><option>Ingreso</option><option>Egreso</option><option>Desembolso</option><option>Movimiento interno</option></select></label><label>Categoria<select data-filter="finance-category"><option value="">Todas</option>' + categoryOptions('estudio') + '</select></label><label>Desde<input type="date" data-filter="finance-from"></label></div><div class="section-head"><div><h3>Administracion del estudio</h3><p>Movimientos generales separados de los costos de obra.</p></div></div><div class="table-wrap"><table><thead><tr><th>FECHA</th><th>TIPO</th><th>CONCEPTO</th><th>MONTO</th><th>ESTADO</th><th></th></tr></thead><tbody id="financeRows">' + rows + '</tbody></table></div><div class="section-head"><div><h3>Evolucion mensual</h3><p>Verde: ingresos. Amarillo: egresos.</p></div></div><div class="chart">' + chart + '</div></section>' +
        '<form class="form" data-form="finance"><h3>Nuevo movimiento</h3>' +
          '<label>Fecha<input name="fecha" type="date" value="' + today() + '" required></label>' +
          '<label>Tipo<select name="tipo" required><option>Ingreso</option><option>Egreso</option><option>Desembolso</option><option>Movimiento interno</option></select></label>' +
          '<label>Categoria<select name="categoria" data-category-scope="estudio" required>' + categoryOptions('estudio') + '</select></label>' +
          '<label>Subcategoria<select name="subcategoria" data-subcategory-scope="estudio" required>' + subcategoryOptions('estudio', Object.keys(state.catalogos.estudio)[0]) + '</select></label>' +
          '<label>Descripcion<input name="concepto" required></label>' +
          '<label>Monto<input name="monto" type="number" min="0" required></label>' +
          '<label>Estado<select name="estado" required><option>Pendiente</option><option>Cobrado</option><option>Pagado</option><option>Vencido</option></select></label>' +
          '<label>Observaciones<textarea name="observaciones"></textarea></label>' +
          '<button class="btn primary" type="submit">Guardar movimiento</button></form></div>' +
          '<section class="panel" style="margin-top:16px"><div class="section-head"><div><h3>Categorias del estudio</h3><p>Catálogo editable para futuras ampliaciones.</p></div></div><div class="panel-body split-panels"><div class="catalog-list">' + categories + '</div><form class="form" data-form="catalog"><input type="hidden" name="scope" value="estudio"><label>Categoria<input name="categoria" required></label><label>Nueva subcategoria<input name="subcategoria" required></label><button class="btn secondary" type="submit">Agregar al catalogo</button></form></div></section>';
    }
    function renderTeam() {
      const workIds = new Set(visibleObras().map(item => item.id));
      const people = isOwner() ? state.equipo : state.equipo.filter(persona => persona.asignaciones.some(item => workIds.has(item.obraId)));
      const rows = people.length ? people.map(persona => {
        const assignments = isOwner() ? persona.asignaciones : persona.asignaciones.filter(item => workIds.has(item.obraId));
        return '<tr><td><b>' + escapeHtml(persona.nombre) + '</b><div class="project-meta">' + (persona.activo ? 'Activa' : 'Inactiva') + '</div></td><td>' + escapeHtml(persona.rol) + '</td><td><div class="tags">' + assignments.map(item => '<span class="tag">' + escapeHtml(obraName(item.obraId)) + '</span>').join('') + '</div></td><td><div class="task-list">' + assignments.map(item => '<div class="task"><b>' + escapeHtml(obraName(item.obraId)) + ':</b> ' + escapeHtml(item.tarea || 'Sin tarea cargada') + '</div>').join('') + '</div></td><td>' + (isOwner() ? '<div class="actions"><button class="btn secondary small" type="button" data-edit-person="' + escapeHtml(persona.id) + '">Editar</button><button class="btn warn small" type="button" data-delete-person="' + escapeHtml(persona.id) + '">Eliminar</button></div>' : '<span class="project-meta">Solo lectura</span>') + '</td></tr>';
      }).join('') : '<tr><td colspan="5" class="empty">No hay integrantes asignados a las obras habilitadas.</td></tr>';
      const assignments = state.obras.map(obra => '<label class="check-row"><input type="checkbox" name="obraIds" value="' + escapeHtml(obra.id) + '"><span>' + escapeHtml(obra.nombre) + '</span></label>').join('');
      viewContent.innerHTML =
        '<div class="' + (isOwner() ? 'view-grid' : '') + '"><section class="panel">' + (!isOwner() ? '<div class="permission-note">Vista de solo lectura. Se muestra únicamente el personal asignado a tus proyectos habilitados.</div>' : '') + '<div class="toolbar"><label>Estado<select data-filter="team-status"><option value="">Todos</option><option value="active">Activos</option><option value="inactive">Inactivos</option></select></label><label>Buscar<input data-filter="team-search" placeholder="Persona, rol u obra"></label></div><div class="table-wrap"><table><thead><tr><th>PERSONA</th><th>ROL</th><th>OBRAS ASIGNADAS</th><th>TAREAS ACTUALES</th><th></th></tr></thead><tbody id="teamRows">' + rows + '</tbody></table></div></section>' +
        (isOwner() ?
        '<form class="form" data-form="person"><h3>Agregar integrante</h3>' +
          '<label>Nombre<input name="nombre" required></label>' +
          '<label>Rol<input name="rol" placeholder="Arquitecta, supervisor..." required></label>' +
          '<label class="toggle-row"><span>Persona activa</span><input type="checkbox" name="activo" checked></label>' +
          '<fieldset><legend>Obras</legend><div class="checkbox-grid">' + (assignments || '<span class="helper">Primero crea una obra.</span>') + '</div></fieldset>' +
          '<div class="helper">Marca todas las obras en las que participa.</div>' +
          '<button class="btn primary" type="submit">Guardar integrante</button></form>' : '') + '</div>';
    }
    function renderPersonDetail(id) {
      if (!isOwner()) return;
      const persona = state.equipo.find(item => item.id === id);
      if (!persona) return;
      selectedProjectId = null;
      delete projectDetail.dataset.budgetId;
      delete projectDetail.dataset.userId;
      projectDetail.dataset.personId = id;
      detailTitle.textContent = persona.nombre;
      detailSubtitle.textContent = persona.rol + ' · ' + (persona.activo ? 'Activa' : 'Inactiva');
      const assignmentRows = state.obras.map(obra => {
        const assignment = persona.asignaciones.find(item => item.obraId === obra.id);
        return '<div class="catalog-item"><label class="check-row"><input type="checkbox" data-person-work="' + obra.id + '"' + (assignment ? ' checked' : '') + '><span>' + escapeHtml(obra.nombre) + '</span></label><label>Tarea actual<input data-person-task="' + obra.id + '" value="' + escapeHtml(assignment?.tarea || '') + '"' + (assignment ? '' : ' disabled') + '></label></div>';
      }).join('');
      detailContent.innerHTML =
        '<div class="view-grid"><section class="panel"><div class="section-head"><div><h3>Asignaciones y tareas</h3><p>Cada tarea queda vinculada a una obra específica.</p></div></div><div class="panel-body catalog-list">' + assignmentRows + '</div></section><form class="form" data-form="edit-person"><input type="hidden" name="id" value="' + id + '"><h3>Datos de la persona</h3><label>Nombre<input name="nombre" value="' + escapeHtml(persona.nombre) + '" required></label><label>Rol<input name="rol" value="' + escapeHtml(persona.rol) + '" required></label><label class="toggle-row"><span>Persona activa</span><input name="activo" type="checkbox"' + (persona.activo ? ' checked' : '') + '></label><button class="btn primary" type="submit">Guardar cambios</button></form></div>';
      projectDetail.classList.add('open');
      projectDetail.setAttribute('aria-hidden', 'false');
    }
    function renderUsers() {
      if (!isOwner()) return renderObras();
      const rows = state.usuarios.map(usuario =>
        '<tr><td><b>' + escapeHtml(usuario.nombre) + '</b><div class="project-meta">' + escapeHtml(usuario.email) + '</div></td><td><span class="role-badge">' + escapeHtml(usuario.tipo) + '</span></td><td>' + (usuario.activo ? '<span class="pill">Activo</span>' : '<span class="pill">Inactivo</span>') + '</td><td><div class="tags">' + (usuario.tipo === 'Propietario' ? '<span class="tag">Todas las obras</span>' : usuario.obraIds.map(id => '<span class="tag">' + escapeHtml(obraName(id)) + '</span>').join('')) + '</div></td><td><div class="actions"><button class="btn secondary small" type="button" data-edit-user="' + usuario.id + '">Configurar</button><button class="btn warn small" type="button" data-delete-user="' + usuario.id + '"' + (usuario.id === currentUser()?.id ? ' disabled' : '') + '>Eliminar</button></div></td></tr>'
      ).join('');
      const assignments = state.obras.map(obra => '<label class="check-row"><input type="checkbox" name="obraIds" value="' + escapeHtml(obra.id) + '"><span>' + escapeHtml(obra.nombre) + '</span></label>').join('');
      viewContent.innerHTML =
        '<div class="view-grid"><section class="panel"><div class="permission-note">Usuarios y permisos son independientes del módulo Equipo.</div><div class="table-wrap"><table><thead><tr><th>USUARIO</th><th>TIPO</th><th>ESTADO</th><th>OBRAS HABILITADAS</th><th></th></tr></thead><tbody>' + rows + '</tbody></table></div></section>' +
        '<form class="form" data-form="user"><h3>Nuevo usuario</h3><label>Nombre<input name="nombre" required></label><label>Email<input name="email" type="email" required></label><label>Contrasena<input name="password" type="password" minlength="4" required></label><label>Tipo de usuario<select name="tipo" data-user-type><option>Supervisor</option><option>Propietario</option></select></label><label class="toggle-row"><span>Usuario activo</span><input name="activo" type="checkbox" checked></label><fieldset data-user-projects><legend>Obras habilitadas</legend><div class="checkbox-grid">' + (assignments || '<span class="helper">No hay obras creadas.</span>') + '</div></fieldset><div class="helper">Los propietarios acceden a todo. Los supervisores solo a las obras seleccionadas.</div><button class="btn primary" type="submit">Crear usuario</button></form></div>';
    }
    function renderUserDetail(id) {
      if (!isOwner()) return;
      const usuario = state.usuarios.find(item => item.id === id);
      if (!usuario) return;
      selectedProjectId = null;
      delete projectDetail.dataset.budgetId;
      delete projectDetail.dataset.personId;
      projectDetail.dataset.userId = id;
      detailTitle.textContent = usuario.nombre;
      detailSubtitle.textContent = usuario.email + ' · ' + usuario.tipo;
      const assignments = state.obras.map(obra => '<label class="check-row"><input type="checkbox" name="obraIds" value="' + escapeHtml(obra.id) + '"' + (usuario.obraIds.includes(obra.id) ? ' checked' : '') + '><span>' + escapeHtml(obra.nombre) + '</span></label>').join('');
      detailContent.innerHTML =
        '<form class="form" data-form="edit-user"><input type="hidden" name="id" value="' + usuario.id + '"><h3>Configuracion de acceso</h3><label>Nombre<input name="nombre" value="' + escapeHtml(usuario.nombre) + '" required></label><label>Email<input name="email" type="email" value="' + escapeHtml(usuario.email) + '" required></label><label>Nueva contrasena<input name="password" type="password" minlength="4"><span class="helper">Dejar en blanco para conservar la actual.</span></label><label>Tipo de usuario<select name="tipo" data-user-type><option' + (usuario.tipo === 'Supervisor' ? ' selected' : '') + '>Supervisor</option><option' + (usuario.tipo === 'Propietario' ? ' selected' : '') + '>Propietario</option></select></label><label class="toggle-row"><span>Usuario activo</span><input name="activo" type="checkbox"' + (usuario.activo ? ' checked' : '') + '></label><fieldset data-user-projects class="' + (usuario.tipo === 'Propietario' ? 'hidden' : '') + '"><legend>Obras habilitadas</legend><div class="checkbox-grid">' + assignments + '</div></fieldset><button class="btn primary" type="submit">Guardar configuracion</button></form>';
      projectDetail.classList.add('open');
      projectDetail.setAttribute('aria-hidden', 'false');
    }
    function render() {
      const cfg = views[current];
      viewTitle.textContent = cfg[0];
      viewSub.textContent = cfg[1];
      document.querySelectorAll('.tab').forEach(tab => tab.classList.toggle('active', tab.dataset.view === current));
      renderStats();
      if (current === 'obras') renderObras();
      if (current === 'presupuestos') renderBudgets();
      if (current === 'finanzas') renderFinances();
      if (current === 'equipo') renderTeam();
      if (current === 'usuarios') renderUsers();
    }
    function renderProjectDetail(id) {
      const obra = obraById(id);
      if (!obra || !canAccessObra(id)) return;
      const owner = isOwner();
      selectedProjectId = id;
      delete projectDetail.dataset.budgetId;
      delete projectDetail.dataset.personId;
      delete projectDetail.dataset.userId;
      const certificates = state.certificaciones.filter(item => item.obraId === id);
      const expenses = state.gastosObra.filter(item => item.obraId === id);
      const certifiedAmount = certificates.reduce((sum, item) => sum + certificateTotal(item), 0);
      const certifiedPct = number(obra.presupuesto) ? Math.round(certifiedAmount / number(obra.presupuesto) * 100) : 0;
      const collectedAmount = certificates.filter(item => item.estado === 'Cobrada').reduce((sum, item) => sum + certificateTotal(item), 0);
      const expenseAmount = expenses.reduce((sum, item) => sum + number(item.monto), 0);
      const paidAmount = expenses.filter(item => item.estado === 'Pagado').reduce((sum, item) => sum + number(item.monto), 0);
      const pendingAmount = expenseAmount - paidAmount;
      const unbudgeted = expenses.filter(item => !item.presupuestado).reduce((sum, item) => sum + number(item.monto), 0);
      const deviation = expenseAmount - number(obra.presupuesto);
      const expectedSpend = number(obra.presupuesto) * certifiedPct / 100;
      const spendGap = expenseAmount - expectedSpend;
      const linkedBudget = budgetById(obra.presupuestoId);
      const budgetItems = linkedBudget?.items || [];
      const plannedCertificates = [...new Set(budgetItems.map(item => item.certificado).filter(Boolean))];
      detailTitle.textContent = obra.nombre;
      detailSubtitle.textContent = obra.cliente + ' · ' + obra.estado;
      const certRows = certificates.length ? certificates.map(item => {
        const subitems = item.subitems.map(subitem =>
          '<div class="subitem"><div><b>' + escapeHtml(subitem.descripcion) + '</b><span>' + escapeHtml(subitem.tipo) + ' · ' + number(subitem.cantidad) + ' ' + escapeHtml(subitem.unidad) + ' × ' + money(subitem.precioUnitario) + '</span></div><b>' + money(number(subitem.cantidad) * number(subitem.precioUnitario)) + '</b></div>'
        ).join('');
        const statusControl = owner
          ? '<select class="status-select" data-certificate-status="' + item.id + '"><option' + (item.estado === 'Pendiente de aprobacion' ? ' selected' : '') + '>Pendiente de aprobacion</option><option' + (item.estado === 'Aprobada' ? ' selected' : '') + '>Aprobada</option><option' + (item.estado === 'Cobrada' ? ' selected' : '') + '>Cobrada</option></select>'
          : '<span class="pill">' + escapeHtml(item.estado) + '</span>';
        return '<div class="ledger-row" data-cert-row="' + item.id + '"><div><div class="ledger-title">' + escapeHtml(item.concepto) + '</div><div class="ledger-meta">' + escapeHtml(item.periodo) + (item.presupuestoCertificado ? ' · Cert. presupuestada ' + escapeHtml(item.presupuestoCertificado) : '') + ' · ' + item.subitems.length + ' subitems</div><div class="subitem-list">' + subitems + '</div></div><div><b>' + money(certificateTotal(item)) + '</b><br>' + statusControl + (owner ? '<br><button class="danger-link" type="button" data-delete-certificate="' + escapeHtml(item.id) + '">Eliminar</button>' : '') + '</div></div>';
      }).join('') : '<div class="empty">Sin certificaciones cargadas.</div>';
      const expenseRows = expenses.length ? expenses.slice().sort((a, b) => String(b.fecha).localeCompare(String(a.fecha))).map(item =>
        '<div class="ledger-row" data-expense-row="' + item.id + '"><div><div class="ledger-title">' + escapeHtml(item.concepto) + '</div><div class="ledger-meta">' + escapeHtml(item.fecha || '-') + ' · ' + escapeHtml(item.categoria) + ' / ' + escapeHtml(item.subcategoria) + (owner ? ' · ' + (item.presupuestado ? 'Presupuestado' : 'No presupuestado') : '') + '</div></div><div><b class="money-out">' + money(item.monto) + '</b><br><select class="status-select" data-expense-status="' + item.id + '"><option' + (item.estado === 'Pendiente de pago' ? ' selected' : '') + '>Pendiente de pago</option><option' + (item.estado === 'Pagado' ? ' selected' : '') + '>Pagado</option></select>' + (owner ? '<br><button class="danger-link" type="button" data-delete-expense="' + escapeHtml(item.id) + '">Eliminar</button>' : '') + '</div></div>'
      ).join('') : '<div class="empty">Sin gastos cargados.</div>';
      const plannedOptions = plannedCertificates.map(value => '<option value="' + escapeHtml(value) + '">Certificacion ' + escapeHtml(value) + '</option>').join('');
      const budgetItemOptions = budgetItems.map(item => '<option value="' + item.id + '">' + escapeHtml('Cert. ' + item.certificado + ' · ' + item.descripcion) + '</option>').join('');
      const spendAlert = spendGap > number(obra.presupuesto) * .08
        ? '<div class="alert danger">El gasto acumulado supera la curva esperada por ' + money(spendGap) + '.</div>'
        : '<div class="alert ok">El gasto está dentro de la curva esperada para el nivel certificado.</div>';
      const categoryTotals = {};
      expenses.forEach(item => {
        const key = item.categoria + ' / ' + item.subcategoria;
        categoryTotals[key] = (categoryTotals[key] || 0) + number(item.monto);
      });
      const categoryBreakdown = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1]).map(([label, amount]) => '<div class="catalog-item"><b>' + escapeHtml(label) + '</b><span>' + money(amount) + '</span></div>').join('') || '<div class="empty">Sin gastos para analizar.</div>';
      const categories = Object.entries(state.catalogos.obra).map(([category, values]) => '<div class="catalog-item"><b>' + escapeHtml(category) + '</b><span class="project-meta">' + escapeHtml(values.join(' · ')) + '</span></div>').join('');
      const metrics = owner
        ? [
            ['Porcentaje certificado', certifiedPct + '%'], ['Monto cotizado', money(obra.presupuesto)],
            ['Monto certificado', money(certifiedAmount)], ['Monto cobrado', money(collectedAmount)], ['Monto gastado', money(expenseAmount)],
            ['Pendiente de pago', money(pendingAmount)], ['Desvio total', money(deviation), deviation > 0 ? 'money-out' : 'money-in']
          ]
        : [
            ['Avance certificado', certifiedPct + '%'], ['Certificaciones', certificates.length],
            ['Pendientes de aprobacion', certificates.filter(item => item.estado === 'Pendiente de aprobacion').length],
            ['Monto certificado', money(certifiedAmount)], ['Monto gastado', money(expenseAmount)], ['Pendiente de pago', money(pendingAmount)]
          ];
      const economicOverview = owner
        ? '<div class="split-panels"><section class="panel"><div class="section-head"><div><h3>Certificación y gasto</h3><p>Comparación económica sobre el monto cotizado.</p></div></div><div class="panel-body comparison"><div class="comparison-row"><b>Certificado</b><div class="bar"><i style="width:' + Math.min(100, certifiedPct) + '%"></i></div><strong>' + certifiedPct + '%</strong></div><div class="comparison-row"><b>Gastado</b><div class="bar"><i style="width:' + Math.min(100, number(obra.presupuesto) ? expenseAmount / number(obra.presupuesto) * 100 : 0) + '%"></i></div><strong>' + (number(obra.presupuesto) ? Math.round(expenseAmount / number(obra.presupuesto) * 100) : 0) + '%</strong></div>' + spendAlert + '</div></section><section class="panel"><div class="section-head"><div><h3>Control económico</h3><p>Presupuestado, real y no previsto.</p></div></div><div class="panel-body catalog-list"><div class="catalog-item"><b>Total pagado</b>' + money(paidAmount) + '</div><div class="catalog-item"><b>Total pendiente</b>' + money(pendingAmount) + '</div><div class="catalog-item"><b>Gastos no presupuestados</b><span class="' + (unbudgeted ? 'money-out' : 'money-in') + '">' + money(unbudgeted) + '</span></div><div class="catalog-item"><b>Disponible contra cotizado</b>' + money(number(obra.presupuesto) - expenseAmount) + '</div></div></section></div>'
        : '<div class="split-panels"><section class="panel"><div class="section-head"><div><h3>Avance de certificación</h3><p>Seguimiento visible sin exponer el presupuesto total.</p></div></div><div class="panel-body comparison"><div class="comparison-row"><b>Certificado</b><div class="bar"><i style="width:' + Math.min(100, certifiedPct) + '%"></i></div><strong>' + certifiedPct + '%</strong></div><div class="permission-note">El presupuesto y los montos totales cotizados están restringidos al propietario.</div></div></section><section class="panel"><div class="section-head"><div><h3>Gastos registrados</h3><p>Control de pagos de la obra habilitada.</p></div></div><div class="panel-body catalog-list"><div class="catalog-item"><b>Total pagado</b>' + money(paidAmount) + '</div><div class="catalog-item"><b>Total pendiente</b>' + money(pendingAmount) + '</div></div></section></div>';
      const certificateForm =
        '<form class="inline-form" data-form="certificate"><label>Periodo<input name="periodo" type="month" required></label>' +
          (owner ? '<label>Certificacion presupuestada<select name="presupuestoCertificado"><option value="">Sin vincular</option>' + plannedOptions + '</select></label>' : '<input name="presupuestoCertificado" type="hidden" value="">') +
          '<label class="full">Concepto<input name="concepto" required></label>' +
          (owner ? '<label>Origen de subitems<select name="montoModo"><option value="manual">Carga manual</option><option value="presupuesto">Importar del presupuesto</option></select></label>' : '<input name="montoModo" type="hidden" value="manual">') +
          '<div class="full"><div class="section-head" style="padding:0 0 10px;border:0"><div><h3>Subitems de la certificacion</h3><p>Agrega cada material o trabajo por separado.</p></div><button class="btn secondary small" type="button" data-add-certificate-subitem>Agregar subitem</button></div><div class="catalog-list" data-certificate-subitems>' + certificateSubitemEditor() + '</div><div class="helper" data-certificate-total>Total de la certificacion: ' + money(0) + '</div></div>' +
          (owner ? '<label>Estado<select name="estado"><option>Pendiente de aprobacion</option><option>Aprobada</option><option>Cobrada</option></select></label>' : '<input name="estado" type="hidden" value="Pendiente de aprobacion"><div class="permission-note">Los certificados cargados por supervisores quedan pendientes de aprobación.</div>') +
          '<button class="btn primary" type="submit">Agregar certificacion</button></form>';
      const expenseBudgetFields = owner
        ? '<label class="toggle-row"><span>Corresponde al presupuesto</span><input name="presupuestado" type="checkbox" data-budgeted-toggle></label><label class="full hidden" data-budget-item-field>Item presupuestado<select name="presupuestoItemId"><option value="">Seleccionar item</option>' + budgetItemOptions + '</select></label>'
        : '<input name="presupuestado" type="hidden" value=""><input name="presupuestoItemId" type="hidden" value="">';
      detailContent.innerHTML =
        '<div class="module-stats">' + metricCards(metrics) + '</div>' + economicOverview +
        '<div class="detail-grid">' +
          '<section class="panel"><div class="section-head"><div><h3>Certificaciones</h3><p>Cada certificación puede contener múltiples subitems.</p></div></div><div class="ledger">' + certRows + '</div>' + certificateForm +
          '</section>' +
          '<section class="panel"><div class="toolbar"><label>Estado<select data-filter="expense-status"><option value="">Todos</option><option>Pendiente de pago</option><option>Pagado</option></select></label><label>Categoria<select data-filter="expense-category"><option value="">Todas</option>' + categoryOptions('obra') + '</select></label></div><div class="section-head"><div><h3>Gastos de la obra</h3><p>Incluye materiales reales, mano de obra y gastos no presupuestados.</p></div></div><div class="ledger" id="expenseRows">' + expenseRows + '</div>' +
            '<form class="inline-form" data-form="project-expense"><label>Fecha<input name="fecha" type="date" value="' + today() + '" required></label><label>Categoria<select name="categoria" data-category-scope="obra">' + categoryOptions('obra') + '</select></label><label>Subcategoria<select name="subcategoria" data-subcategory-scope="obra">' + subcategoryOptions('obra', Object.keys(state.catalogos.obra)[0]) + '</select></label><label class="full">Descripcion<input name="concepto" required></label><label>Monto<input name="monto" type="number" min="0" required></label><label>Estado<select name="estado"><option>Pendiente de pago</option><option>Pagado</option></select></label><label>Medio de pago<input name="medioPago"></label>' + expenseBudgetFields + '<label class="full">Observaciones<textarea name="observaciones"></textarea></label><button class="btn primary" type="submit">Agregar gasto</button></form>' +
          '</section></div>' +
        '<div class="' + (owner ? 'split-panels' : '') + '" style="margin-top:16px"><section class="panel"><div class="section-head"><div><h3>Gasto por categoria</h3><p>Distribución real por categoría y subcategoría.</p></div></div><div class="panel-body catalog-list">' + categoryBreakdown + '</div></section>' + (owner ? '<section class="panel"><div class="section-head"><div><h3>Categorias de gastos de obra</h3><p>Catálogo editable sin modificar código.</p></div></div><div class="panel-body"><div class="catalog-list">' + categories + '</div><form class="form" data-form="catalog" style="margin-top:14px"><input type="hidden" name="scope" value="obra"><label>Categoria<input name="categoria" required></label><label>Nueva subcategoria<input name="subcategoria" required></label><button class="btn secondary" type="submit">Agregar al catalogo</button></form></div></section>' : '') + '</div>';
      projectDetail.classList.add('open');
      projectDetail.setAttribute('aria-hidden', 'false');
    }
    document.querySelectorAll('[data-auth]').forEach(btn => btn.addEventListener('click', () => {
      authTitle.textContent = btn.dataset.auth === 'login' ? 'Iniciar sesion' : 'Crear cuenta';
      authError.classList.add('hidden');
      authForm.reset();
      authModal.style.display = 'grid';
      email.focus();
    }));
    closeModal.addEventListener('click', () => authModal.style.display = 'none');
    authModal.addEventListener('click', event => { if (event.target === authModal) authModal.style.display = 'none'; });
    authForm.addEventListener('submit', event => {
      event.preventDefault();
      const loginEmail = email.value.trim().toLowerCase();
      const usuario = state.usuarios.find(item => item.email === loginEmail && item.password === password.value && item.activo);
      authError.classList.toggle('hidden', Boolean(usuario));
      if (!usuario) return;
      localStorage.setItem('gb-construction-user', usuario.email);
      password.value = '';
      authModal.style.display = 'none';
      notify('Sesion iniciada');
      openApp();
    });
    document.querySelectorAll('.tab').forEach(tab => tab.addEventListener('click', () => {
      if (tab.disabled) return;
      current = tab.dataset.view;
      render();
    }));
    viewContent.addEventListener('submit', event => {
      event.preventDefault();
      const form = event.target;
      const formType = form.dataset.form;
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());
      data.id = data.id || crypto.randomUUID();
      if (!isOwner() && ['obra', 'budget', 'finance', 'person', 'catalog', 'user'].includes(formType)) return;
      if (formType === 'obra') {
        const presupuesto = budgetById(data.presupuestoId);
        let certificacionesPlanificadas = [];
        if (data.origen === 'presupuesto' && presupuesto) {
          data.presupuesto = budgetTotal(presupuesto);
          data.cliente = data.cliente || presupuesto.cliente;
          presupuesto.obraId = data.id;
          if (formData.get('importarCertificados')) {
            certificacionesPlanificadas = [...new Set(presupuesto.items.map(item => item.certificado).filter(Boolean))].map(certificado => ({
              numero: certificado,
              monto: presupuesto.items.filter(item => item.certificado === certificado).reduce((sum, item) => sum + budgetItemTotal(item), 0)
            }));
          }
        }
        state.obras.push({ id: data.id, nombre: data.nombre, cliente: data.cliente, estado: data.estado, presupuesto: number(data.presupuesto), presupuestoId: data.presupuestoId || '', certificacionesPlanificadas });
      }
      if (formType === 'budget') state.presupuestos.push({ id: data.id, nombre: data.nombre, cliente: data.cliente, estado: data.estado, obraId: '', items: [] });
      if (formType === 'finance') state.finanzasEstudio.push(data);
      if (formType === 'person') state.equipo.push({ id: data.id, nombre: data.nombre, rol: data.rol, activo: Boolean(formData.get('activo')), asignaciones: formData.getAll('obraIds').map(obraId => ({ obraId, tarea: '' })) });
      if (formType === 'user') {
        const normalizedEmail = String(data.email).trim().toLowerCase();
        if (state.usuarios.some(usuario => usuario.email === normalizedEmail)) {
          notify('Ya existe un usuario con ese email');
          return;
        }
        state.usuarios.push({
          id: data.id,
          nombre: data.nombre,
          email: normalizedEmail,
          password: data.password,
          tipo: data.tipo,
          activo: Boolean(formData.get('activo')),
          obraIds: data.tipo === 'Supervisor' ? formData.getAll('obraIds') : []
        });
      }
      if (formType === 'catalog') {
        const scope = data.scope;
        state.catalogos[scope][data.categoria] = state.catalogos[scope][data.categoria] || [];
        if (!state.catalogos[scope][data.categoria].includes(data.subcategoria)) state.catalogos[scope][data.categoria].push(data.subcategoria);
      }
      save();
      notify('Registro guardado');
      render();
    });
    viewContent.addEventListener('click', event => {
      const target = event.target;
      const projectId = target.dataset.openProject;
      if (projectId) return renderProjectDetail(projectId);
      const budgetId = target.dataset.openBudget;
      if (budgetId) return renderBudgetDetail(budgetId);
      const personId = target.dataset.editPerson;
      if (personId) return renderPersonDetail(personId);
      const userId = target.dataset.editUser;
      if (userId) return renderUserDetail(userId);
      const duplicateBudget = target.dataset.duplicateBudget;
      if (duplicateBudget) {
        if (!isOwner()) return;
        const original = budgetById(duplicateBudget);
        state.presupuestos.push({ ...structuredClone(original), id: crypto.randomUUID(), nombre: original.nombre + ' (copia)', estado: 'Pendiente', obraId: '', items: original.items.map(item => ({ ...item, id: crypto.randomUUID() })) });
        save();
        notify('Presupuesto duplicado');
        return render();
      }
      const deleteProject = target.dataset.deleteProject;
      const deleteBudget = target.dataset.deleteBudget;
      const deleteFinance = target.dataset.deleteFinance;
      const deletePerson = target.dataset.deletePerson;
      const deleteUser = target.dataset.deleteUser;
      if (!deleteProject && !deleteBudget && !deleteFinance && !deletePerson && !deleteUser) return;
      if (!isOwner()) return;
      if (!confirm('Eliminar este registro?')) return;
      if (deleteProject) {
        state.presupuestos = state.presupuestos.map(item => item.obraId === deleteProject ? { ...item, obraId: '' } : item);
        state.obras = state.obras.filter(item => item.id !== deleteProject);
        state.certificaciones = state.certificaciones.filter(item => item.obraId !== deleteProject);
        state.gastosObra = state.gastosObra.filter(item => item.obraId !== deleteProject);
        state.equipo = state.equipo.map(persona => ({ ...persona, asignaciones: persona.asignaciones.filter(item => item.obraId !== deleteProject) }));
        state.usuarios = state.usuarios.map(usuario => ({ ...usuario, obraIds: usuario.obraIds.filter(id => id !== deleteProject) }));
      }
      if (deleteBudget) {
        state.presupuestos = state.presupuestos.filter(item => item.id !== deleteBudget);
        state.obras = state.obras.map(obra => obra.presupuestoId === deleteBudget ? { ...obra, presupuestoId: '' } : obra);
      }
      if (deleteFinance) state.finanzasEstudio = state.finanzasEstudio.filter(item => item.id !== deleteFinance);
      if (deletePerson) state.equipo = state.equipo.filter(item => item.id !== deletePerson);
      if (deleteUser && deleteUser !== currentUser()?.id) {
        const user = state.usuarios.find(item => item.id === deleteUser);
        const ownerCount = state.usuarios.filter(item => item.tipo === 'Propietario').length;
        if (user?.tipo === 'Propietario' && ownerCount <= 1) {
          notify('Debe existir al menos un propietario');
          return;
        }
        state.usuarios = state.usuarios.filter(item => item.id !== deleteUser);
      }
      save();
      notify('Registro eliminado');
      render();
    });
    viewContent.addEventListener('change', event => {
      const target = event.target;
      if (target.matches('[data-project-origin]')) {
        const form = target.closest('form');
        const fromBudget = target.value === 'presupuesto';
        form.querySelector('[data-budget-field]').classList.toggle('hidden', !fromBudget);
        form.querySelector('[data-import-field]').classList.toggle('hidden', !fromBudget);
      }
      if (target.name === 'presupuestoId' && target.closest('[data-form="obra"]')) {
        const presupuesto = budgetById(target.value);
        const form = target.closest('form');
        if (presupuesto) {
          form.elements.nombre.value = presupuesto.nombre.replace(/^Presupuesto\s*/i, '');
          form.elements.cliente.value = presupuesto.cliente;
          form.elements.presupuesto.value = budgetTotal(presupuesto);
        }
      }
      if (target.matches('[data-category-scope]')) {
        const scope = target.dataset.categoryScope;
        const form = target.closest('form');
        const subcategory = form.querySelector('[data-subcategory-scope="' + scope + '"]');
        if (subcategory) subcategory.innerHTML = subcategoryOptions(scope, target.value);
      }
      if (target.matches('[data-user-type]')) {
        const projects = target.closest('form').querySelector('[data-user-projects]');
        if (projects) projects.classList.toggle('hidden', target.value === 'Propietario');
      }
      applyViewFilters();
    });
    viewContent.addEventListener('input', event => {
      if (event.target.matches('[data-filter]')) applyViewFilters();
    });
    function applyViewFilters() {
      if (current === 'obras') {
        const status = viewContent.querySelector('[data-filter="project-status"]')?.value || '';
        const search = (viewContent.querySelector('[data-filter="project-search"]')?.value || '').toLowerCase();
        viewContent.querySelectorAll('.project-row').forEach(row => {
          const text = row.textContent.toLowerCase();
          row.classList.toggle('hidden', Boolean((status && !text.includes(status.toLowerCase())) || (search && !text.includes(search))));
        });
      }
      if (current === 'presupuestos') {
        const status = viewContent.querySelector('[data-filter="budget-status"]')?.value || '';
        const search = (viewContent.querySelector('[data-filter="budget-search"]')?.value || '').toLowerCase();
        viewContent.querySelectorAll('#budgetRows tr').forEach(row => {
          const text = row.textContent.toLowerCase();
          row.classList.toggle('hidden', Boolean((status && !text.includes(status.toLowerCase())) || (search && !text.includes(search))));
        });
      }
      if (current === 'finanzas') {
        const type = viewContent.querySelector('[data-filter="finance-type"]')?.value || '';
        const category = viewContent.querySelector('[data-filter="finance-category"]')?.value || '';
        const from = viewContent.querySelector('[data-filter="finance-from"]')?.value || '';
        viewContent.querySelectorAll('#financeRows tr').forEach(row => {
          const text = row.textContent.toLowerCase();
          const date = row.cells?.[0]?.textContent || '';
          row.classList.toggle('hidden', Boolean((type && !text.includes(type.toLowerCase())) || (category && !text.includes(category.toLowerCase())) || (from && date < from)));
        });
      }
      if (current === 'equipo') {
        const status = viewContent.querySelector('[data-filter="team-status"]')?.value || '';
        const search = (viewContent.querySelector('[data-filter="team-search"]')?.value || '').toLowerCase();
        viewContent.querySelectorAll('#teamRows tr').forEach(row => {
          const text = row.textContent.toLowerCase();
          const statusMismatch = status === 'active' ? !text.includes('activa') || text.includes('inactiva') : status === 'inactive' ? !text.includes('inactiva') : false;
          row.classList.toggle('hidden', Boolean(statusMismatch || (search && !text.includes(search))));
        });
      }
    }
    detailContent.addEventListener('submit', event => {
      event.preventDefault();
      const form = event.target;
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());
      data.id = data.id || crypto.randomUUID();
      if (form.dataset.form === 'certificate' && selectedProjectId) {
        data.obraId = selectedProjectId;
        data.estado = isOwner() ? data.estado : 'Pendiente de aprobacion';
        data.creadoPor = currentUser()?.id || '';
        data.subitems = [...form.querySelectorAll('[data-certificate-subitem]')].map(row => ({
          id: crypto.randomUUID(),
          tipo: row.querySelector('[data-subitem-field="tipo"]').value,
          descripcion: row.querySelector('[data-subitem-field="descripcion"]').value.trim(),
          cantidad: number(row.querySelector('[data-subitem-field="cantidad"]').value),
          unidad: row.querySelector('[data-subitem-field="unidad"]').value.trim(),
          precioUnitario: number(row.querySelector('[data-subitem-field="precioUnitario"]').value)
        })).filter(item => item.descripcion);
        if (!data.subitems.length) {
          notify('Agrega al menos un subitem');
          return;
        }
        data.monto = certificateTotal(data);
        state.certificaciones.push(data);
      }
      if (form.dataset.form === 'project-expense' && selectedProjectId) {
        data.obraId = selectedProjectId;
        data.presupuestado = isOwner() && Boolean(formData.get('presupuestado'));
        data.creadoPor = currentUser()?.id || '';
        state.gastosObra.push(data);
      }
      if (form.dataset.form === 'catalog') {
        if (!isOwner()) return;
        state.catalogos[data.scope][data.categoria] = state.catalogos[data.scope][data.categoria] || [];
        if (!state.catalogos[data.scope][data.categoria].includes(data.subcategoria)) state.catalogos[data.scope][data.categoria].push(data.subcategoria);
      }
      if (form.dataset.form === 'edit-person') {
        if (!isOwner()) return;
        const persona = state.equipo.find(item => item.id === data.id);
        persona.nombre = data.nombre;
        persona.rol = data.rol;
        persona.activo = Boolean(formData.get('activo'));
      }
      if (form.dataset.form === 'edit-user') {
        if (!isOwner()) return;
        const usuario = state.usuarios.find(item => item.id === data.id);
        const editingCurrentUser = usuario.id === currentUser()?.id;
        const normalizedEmail = String(data.email).trim().toLowerCase();
        if (state.usuarios.some(item => item.email === normalizedEmail && item.id !== usuario.id)) {
          notify('Ya existe un usuario con ese email');
          return;
        }
        const remainsOwner = data.tipo === 'Propietario';
        const otherOwners = state.usuarios.filter(item => item.tipo === 'Propietario' && item.id !== usuario.id).length;
        if (usuario.tipo === 'Propietario' && !remainsOwner && otherOwners === 0) {
          notify('Debe existir al menos un propietario');
          return;
        }
        if (editingCurrentUser && !formData.get('activo')) {
          notify('No puedes desactivar tu propio usuario');
          return;
        }
        usuario.nombre = data.nombre;
        usuario.email = normalizedEmail;
        usuario.tipo = data.tipo;
        usuario.activo = Boolean(formData.get('activo'));
        usuario.obraIds = data.tipo === 'Supervisor' ? formData.getAll('obraIds') : [];
        if (data.password) usuario.password = data.password;
        if (editingCurrentUser) localStorage.setItem('gb-construction-user', usuario.email);
      }
      save();
      notify('Seguimiento actualizado');
      configureNavigation();
      if (projectDetail.dataset.userId && !isOwner()) return closeProjectDetail();
      renderStats();
      if (selectedProjectId) renderProjectDetail(selectedProjectId);
      else if (projectDetail.dataset.personId) renderPersonDetail(projectDetail.dataset.personId);
      else if (projectDetail.dataset.userId) renderUserDetail(projectDetail.dataset.userId);
    });
    detailContent.addEventListener('click', event => {
      const certificateId = event.target.dataset.deleteCertificate;
      const expenseId = event.target.dataset.deleteExpense;
      const deleteBudgetItem = event.target.dataset.deleteBudgetItem;
      if (event.target.matches('[data-add-certificate-subitem]')) {
        const container = event.target.closest('form').querySelector('[data-certificate-subitems]');
        container.insertAdjacentHTML('beforeend', certificateSubitemEditor());
        return updateCertificateFormTotal(event.target.closest('form'));
      }
      if (event.target.matches('[data-remove-certificate-subitem]')) {
        const form = event.target.closest('form');
        const rows = form.querySelectorAll('[data-certificate-subitem]');
        if (rows.length === 1) return notify('La certificacion debe tener al menos un subitem');
        event.target.closest('[data-certificate-subitem]').remove();
        return updateCertificateFormTotal(form);
      }
      if (event.target.matches('[data-add-budget-item]')) {
        if (!isOwner()) return;
        const presupuesto = budgetById(projectDetail.dataset.budgetId);
        presupuesto.items.push({ id: crypto.randomUUID(), certificado: '', tipo: 'Material', descripcion: '', cantidad: 1, unidad: 'unidad', precioUnitario: 0, dias: 0 });
        save();
        return renderBudgetDetail(presupuesto.id);
      }
      if (event.target.matches('[data-print-budget]') && isOwner()) return window.print();
      if (!certificateId && !expenseId && !deleteBudgetItem) return;
      if (!isOwner()) return;
      if (!confirm('Eliminar este registro?')) return;
      if (certificateId) state.certificaciones = state.certificaciones.filter(item => item.id !== certificateId);
      if (expenseId) state.gastosObra = state.gastosObra.filter(item => item.id !== expenseId);
      if (deleteBudgetItem) {
        const presupuesto = budgetById(projectDetail.dataset.budgetId);
        presupuesto.items = presupuesto.items.filter(item => item.id !== deleteBudgetItem);
      }
      save();
      renderStats();
      if (selectedProjectId) renderProjectDetail(selectedProjectId);
      else if (projectDetail.dataset.budgetId) renderBudgetDetail(projectDetail.dataset.budgetId);
    });
    detailContent.addEventListener('change', async event => {
      const target = event.target;
      if (target.matches('[data-budget-field]')) {
        if (!isOwner()) return;
        const presupuesto = budgetById(projectDetail.dataset.budgetId);
        const row = target.closest('[data-budget-item]');
        const item = presupuesto.items.find(value => value.id === row.dataset.budgetItem);
        item[target.dataset.budgetField] = target.type === 'number' ? number(target.value) : target.value;
        save();
        const totalCell = row.querySelector('.sheet-total');
        if (totalCell) totalCell.textContent = money(budgetItemTotal(item));
        updateBudgetDetailSummary(presupuesto);
        return;
      }
      if (target.matches('[data-budget-status-edit]')) {
        if (!isOwner()) return;
        const presupuesto = budgetById(projectDetail.dataset.budgetId);
        presupuesto.estado = target.value;
        save();
        notify('Estado del presupuesto actualizado');
        return renderBudgetDetail(presupuesto.id);
      }
      if (target.matches('[data-person-work]')) {
        if (!isOwner()) return;
        const persona = state.equipo.find(item => item.id === projectDetail.dataset.personId);
        const obraId = target.dataset.personWork;
        if (target.checked && !persona.asignaciones.some(item => item.obraId === obraId)) persona.asignaciones.push({ obraId, tarea: '' });
        if (!target.checked) persona.asignaciones = persona.asignaciones.filter(item => item.obraId !== obraId);
        save();
        return renderPersonDetail(persona.id);
      }
      if (target.matches('[data-person-task]')) {
        if (!isOwner()) return;
        const persona = state.equipo.find(item => item.id === projectDetail.dataset.personId);
        const assignment = persona.asignaciones.find(item => item.obraId === target.dataset.personTask);
        if (assignment) assignment.tarea = target.value;
        save();
      }
      if (target.matches('[data-certificate-status]')) {
        if (!isOwner()) return;
        const item = state.certificaciones.find(value => value.id === target.dataset.certificateStatus);
        const previous = item.estado;
        const next = target.value;
        const approved = await askConfirm("Estas por cambiar el estado de esta certificacion de '" + previous + "' a '" + next + "'. Confirmas esta accion?");
        if (approved) {
          item.estado = next;
          save();
          notify('Estado de certificacion actualizado');
        } else target.value = previous;
        return renderProjectDetail(selectedProjectId);
      }
      if (target.matches('[data-expense-status]')) {
        const item = state.gastosObra.find(value => value.id === target.dataset.expenseStatus);
        const previous = item.estado;
        const next = target.value;
        const approved = await askConfirm("Estas por cambiar el estado de este gasto de '" + previous + "' a '" + next + "'. Confirmas esta accion?");
        if (approved) {
          item.estado = next;
          save();
          notify('Estado de gasto actualizado');
        } else target.value = previous;
        return renderProjectDetail(selectedProjectId);
      }
      if (target.matches('[data-category-scope]')) {
        const scope = target.dataset.categoryScope;
        const subcategory = target.closest('form').querySelector('[data-subcategory-scope="' + scope + '"]');
        if (subcategory) subcategory.innerHTML = subcategoryOptions(scope, target.value);
      }
      if (target.matches('[data-budgeted-toggle]')) {
        target.closest('form').querySelector('[data-budget-item-field]').classList.toggle('hidden', !target.checked);
      }
      if (target.matches('[data-user-type]')) {
        const projects = target.closest('form').querySelector('[data-user-projects]');
        if (projects) projects.classList.toggle('hidden', target.value === 'Propietario');
      }
      if (target.name === 'presupuestoCertificado' || target.name === 'montoModo') {
        importBudgetCertificateSubitems(target.closest('form'));
      }
      applyDetailFilters();
    });
    detailContent.addEventListener('input', event => {
      if (event.target.matches('[data-filter]')) applyDetailFilters();
      if (event.target.matches('[data-subitem-field]')) updateCertificateFormTotal(event.target.closest('form'));
    });
    function applyDetailFilters() {
      const status = detailContent.querySelector('[data-filter="expense-status"]')?.value || '';
      const category = detailContent.querySelector('[data-filter="expense-category"]')?.value || '';
      detailContent.querySelectorAll('#expenseRows [data-expense-row]').forEach(row => {
        const text = row.textContent.toLowerCase();
        row.classList.toggle('hidden', Boolean((status && !text.includes(status.toLowerCase())) || (category && !text.includes(category.toLowerCase()))));
      });
    }
    const closeProjectDetail = () => {
      projectDetail.classList.remove('open');
      projectDetail.setAttribute('aria-hidden', 'true');
      selectedProjectId = null;
      delete projectDetail.dataset.budgetId;
      delete projectDetail.dataset.personId;
      delete projectDetail.dataset.userId;
      render();
    };
    closeDetail.addEventListener('click', closeProjectDetail);
    projectDetail.addEventListener('click', event => { if (event.target === projectDetail) closeProjectDetail(); });
    document.addEventListener('keydown', event => { if (event.key === 'Escape' && projectDetail.classList.contains('open')) closeProjectDetail(); });
    logout.addEventListener('click', () => { localStorage.removeItem('gb-construction-user'); localStorage.removeItem('brikr-user'); app.style.display = 'none'; site.style.display = 'block'; });
    if (currentUser()) openApp();
    else localStorage.removeItem('gb-construction-user');
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
