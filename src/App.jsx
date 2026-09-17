import { useState, useMemo } from "react";

/* ═══════════════════════════════════════════════════════════
   LOGO — base64 PNG (120×120px, optimizado)
═══════════════════════════════════════════════════════════ */
const LOGO_B64 = "iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAMAAABiM0N1AAAAwFBMVEXb3eGZoK8GoNHX2N4BV9VQW3YaU3He3+MlNVcHZa8Ik69fa4OepLKXnayzuMPS1NpsdYy3u8V5gpZ7hJgFOolKV3O8wMkFID4/TGsHwdh8hZmwtcC7v8m+wsu/w8sCG0T8/PwBFTsBCzIA1/wByPsBp/sAt/wAmPsMJEsAiPsIN1kAePoGhqsC5v4AbPYGdZgGeqn9/f35+fknN1kGaJYHSW8GR4RJV3I3RmX4+PgHV44FOGtteI4Fdcx6hJcDLG11DE46AAAAQHRSTlNg4P+Y/+LwLdv//95sk9/KsWuuzv+n0f+8/3E+smuT/gD+/v///////f//////////Kk76////+vdx///z//L/0jUPYQAABD5JREFUeNqdmGl7sjoQhiMuVVtb23c5+8GJAhF3KVZr2/P//9WZbEBCQHifL+0lcjuZzJaQWY3unif3/SRmjCWD+5eHu7rvkqoHh39ezgyAAvhcgGLDaTWsAkSmCTJ8S0Apmz63AHX7PvV95rtEYTBpCCJvQCsoyq7zcwPQ8Ru3pl4AfXIL1E1uYsQC2aQWdOgANOHgyun9oRp0vG9kjjLqTKpAx7cWHJ/RhLhBlzNlfhsSMOICHfvtOBaJ/Nq6NClfnf7n8NWew/30drBAHZoFmyFqCMqkbyaoq90D6T7T2tJuEJejHrpFEDpafz4KA6GQa8E1z7SZ/zGOLRQkxwLosfDUCyKUTVso5mY+ZtRcXCcHXZJ88cCiQGFsjjZrYBolY4AYnrZIoUnKVrgzSPRDg4oG8QfXIIhqTCqRfKJAhkG4//TquZ2de/2V2iYh6HgGq2xRSF+VdrnWHvpHK4aiM4gAPZWLvBWHOhzjcWaSV3yJbxxxJge4RWmqF7pJC2/xRCFYPcBdl52oWAfBmJoRQGbd5jnKSaleHSv8Pp0gqNMm7ZG0lh7fFMKS4b6Rw0dLUCw4i/m68B6cDwQLrN+O5M1FdBn7xgjpJi2LGV0L0MIA+V3yxNqCXhXIMLRDnvzWoIXIHsMiBD1CW9DeBfoinZYgAE/m896oPR/tQdeQl4YgfDcLwA0Qz1ULtFZFPYbmIIB0t0uNAYWmimPuPvqoxtk09jYo70oLH6lyHrzTxtuPybAxqz2mrGgx2GQiH2wQq+ZkZWxARRGJ94oTBanlukdMEbjFQdL+ejq9fy4jrZH1EuuSi3sKMThICnrb7Wq1FKhl5PkWKLkQ9xjCOaIWqiaymEe93hZBXNGSWRystcRo1zlnIWvFGn4byxydB5oUfdocRr94qWUujnx5zQPSICFqhIFlkeBvXvxLTipwRMGXBShchL3eajVitDxCswtvR3bR5hyVlqp1yHznpO8cU+LQ/kE0SJsThgYHSTtJCj3BKYM6smUba8s4O8mRTUgWsyAMcM4qg+KjHCKK+8Y5Yg55zX9bkFSuBph4Ngj3TI01ea/VSSk5xcb4Lkg47qSlcGGkNGhxTiRz23CFIAXuNGP5oJWZBLH8ss25QcpHv9lPkJwo5zg64zummQjtIskYRuX5SnOiE3Wd2pB0ilSynaBiPMY8wbAffXKNrq6YUyQJWi1zEvxrHiF+Uj0S0QqOIq2EMpJ9hFCJoiK5ZoI4SdB2JUnlQ41w0w2OJm25BMlxzJKZAjfbLNDvW6nVFZwHv9ns0uDox0nwn9AV94f88uE4O8PxP4xUHtebjIHaj+Yhu3yB0AyFvbJ/V3+l0WykpDC5ecnSaXDJQgekybVPv359QIcPLS6ioHJiGk7aXI29JI7DOVLg94e2l3XP07MPeUHhkch+tL6sU9eHD9P+kDdi8IfDH3/+VXd/+D+SE5ROVZ/kNAAAAABJRU5ErkJggg==";

/* ═══════════════════════════════════════════════════════════
   CAPA 1 — ENGINE v3.0
   Precios reales · IVA 19% incluido · Bogotá 2026
   Basado en criterios profesionales de compras de construcción
═══════════════════════════════════════════════════════════ */
const ENGINE = (() => {
  const ALTURA = 2.40;
  const ML_FACTOR = { 1:1.08, 2:1.18, 3:1.28 };
  const AREA_BANO = { principal:3.1, secundario:2.5 };
  const VANO = { puerta:0.90*2.10, ventanal:2.00*1.80, hab:1.20*1.20, bano:0.60*0.60 };
  const ENCHAPE_MURO = {
    cabina:   { principal:9.0,  secundario:7.5  },
    media:    { principal:13.0, secundario:10.5 },
    completo: { principal:20.0, secundario:16.0 },
  };
  const MESON = { lineal:2.50, l:3.70 };

  // ── PRECIOS REALES CON IVA 19% ──────────────────────────
  // Fuente: cotizaciones mercado Bogotá 2026
  const P = {
    // PISOS (por m² o ml, con IVA)
    ceramica:    34510,  // $29.000/m² + 19% IVA (formato 40×40)
    pegante:      4000,  // 5 kg/m² × $800/kg con IVA
    boquilla:     2666,  // 0.40 kg/m² × $6.664/kg con IVA (junta 3 mm, formato 40×40)
    guardaescoba: 2416,  // ceramica × 0.07m altura (por ml)
    // MUROS Y TECHO (por m²)
    estuco:       6200,  // SikaWall 40kg ($124.000 con IVA) / 20m²
    pintura:      2027,  // Viniltex 5 gal ($223.000 con IVA) / 110m² (2 manos)
    drywall:     28300,  // APU componentes drywall con IVA (placa+perfiles+masilla+tornillos)
    // DOTACIÓN (por baño)
    combo_bano: 416500,  // sanitario + lavamanos + accesorios ($350.000 + 19% IVA)
    ducha:       70000,  // combo ducha básico con IVA
    // PUERTAS (por und)
    puerta_int: 476000,  // hoja + marco + tapajuntas ($400.000 + 19% IVA)
  };

  // Multiplicadores por nivel de acabado (aplica a ítems de calidad)
  const MULT = { basico:1.0, intermedio:1.65, premium:2.8 };

  // Multiplicadores combo ducha (tienen su propia escala)
  const DUCHA_MULT = { basico:1.0, intermedio:2.5, premium:6.0 };

  // Puertas: escala propia. La puerta premium no cuesta 2,8× la basica.
  const PUERTA_MULT = { basico:1.0, intermedio:1.5, premium:2.2 };

  // Estuco y pintura: misma escala para ambos (antes solo la pintura escalaba).
  const MURO_MULT = { basico:1.0, intermedio:1.35, premium:1.9 };

  // Mano de obra por capitulo — factor sobre el costo del material del item.
  // Los consumibles (pegante, boquilla, cemento, arena) van en 0: su instalacion
  // ya esta cobrada en el m² de piso o enchape, contarla aparte seria doble.
  const MO = {
    piso:0.55, enchape:0.85, consumible:0, pintura:0.30,
    drywall:0.60, dotacion:0.25, puerta:0.35,
  };

  // Desperdicios
  const W = {
    ceramica:.05, enchape:.05, boquilla:.05,
    pegante:.05, guardaescoba:.05,
    estuco:.08, pintura:.08, drywall:.05,
  };

  // ── FUNCIÓN PRINCIPAL ────────────────────────────────────
  const calcProyecto = (inp) => {
    const {
      area:a, habitaciones:h, banos:b, balcon, ventanas:v,
      tipo_enchape:te, tipo_cocina:tc, tipo,
      banos_renovar, techo, instala_puertas,
    } = inp;
    const m  = MULT[tipo]||1.0;
    const dm = DUCHA_MULT[tipo]||1.0;
    const pm = PUERTA_MULT[tipo]||1.0;
    const wm = MURO_MULT[tipo]||1.0;

    // ── GEOMETRÍA ──
    const ml = (ML_FACTOR[h]||1.18)*a;
    const muros_brutos = ml*ALTURA;
    const n_p = h+b+2;
    const vanos = n_p*VANO.puerta + VANO.ventanal + Math.max(0,v-1)*VANO.hab + b*VANO.bano;
    const muros = Math.max(muros_brutos-vanos, muros_brutos*0.55);

    // ── ÁREAS ──
    const a_banos  = AREA_BANO.principal + Math.max(0,b-1)*AREA_BANO.secundario;
    const a_cocina = Math.min(Math.max(a*0.0917+0.7,3.5),8.0);
    const a_balcon = balcon?4.0:0;
    const a_seco   = Math.max(a-a_banos-a_cocina-a_balcon,0);
    const a_cielo  = a-a_balcon;

    // ── ENCHAPES ──
    const enc      = ENCHAPE_MURO[te]||ENCHAPE_MURO.cabina;
    const enc_muro = enc.principal+Math.max(0,b-1)*enc.secundario+(MESON[tc]||2.5)*0.60;
    const enc_piso = a_banos+a_cocina;
    const t_inst   = a_seco+enc_piso+enc_muro;
    const ml_gua   = Math.max(0,ml*0.72-n_p*0.90);
    // Los muros enchapados de bano y cocina no llevan estuco ni pintura.
    const a_pin    = Math.max(muros-enc_muro,0)+a_cielo;

    // ── PUERTAS INTERIORES ──
    const n_puertas_int = h+Math.max(0,b-1)+1; // hab + baños adicionales + cocina

    const raw = {
      // PISOS
      piso_seco:    {grp:"pisos",    label:"Piso sala, comedor y habitaciones", qty:a_seco*(1+W.ceramica),     unit:"m²",  p:P.ceramica*m,      mo:MO.piso},
      enc_piso:     {grp:"pisos",    label:"Enchape piso baños y cocina",       qty:enc_piso*(1+W.enchape),    unit:"m²",  p:P.ceramica*m,      mo:MO.enchape},
      enc_muro:     {grp:"pisos",    label:"Enchape muro baños y cocina",       qty:enc_muro*(1+W.enchape),    unit:"m²",  p:P.ceramica*m,      mo:MO.enchape},
      pegante:      {grp:"pisos",    label:"Pegante",                           qty:t_inst*(1+W.pegante),      unit:"m²",  p:P.pegante,         mo:MO.consumible},
      boquilla:     {grp:"pisos",    label:"Boquilla",                          qty:t_inst*(1+W.boquilla),     unit:"m²",  p:P.boquilla,        mo:MO.consumible},
      guardaescoba: {grp:"pisos",    label:"Guardaescoba",                      qty:ml_gua*(1+W.guardaescoba), unit:"ml",  p:P.guardaescoba*m,  mo:MO.piso},
      // MUROS Y TECHO
      estuco:       {grp:"muros",    label:"Estuco y resane (muros y techo)",   qty:a_pin*(1+W.estuco),        unit:"m²",  p:P.estuco*wm,       mo:MO.pintura},
      pintura:      {grp:"muros",    label:"Pintura 2 manos (muros y techo)",   qty:a_pin*(1+W.pintura),       unit:"m²",  p:P.pintura*wm,      mo:MO.pintura},
      ...(techo==="drywall" ? {
        drywall:    {grp:"muros",    label:"Cielo raso en drywall",             qty:a_cielo*(1+W.drywall),     unit:"m²",  p:P.drywall,         mo:MO.drywall},
      } : {}),
      // DOTACIÓN (solo baños a renovar)
      ...(banos_renovar>0 ? {
        combo_bano: {grp:"dotacion", label:`Combo dotación baño (sanitario + lavamanos + accesorios)`, qty:banos_renovar, unit:"und", p:P.combo_bano*m, mo:MO.dotacion},
        ducha:      {grp:"dotacion", label:`Combo ducha y grifería`,           qty:banos_renovar,             unit:"und", p:P.ducha*dm,        mo:MO.dotacion},
      } : {}),
      // NIVELACIÓN PISO (sala, habitaciones y cocina · 4cm · mezcla 1:4)
      ...(inp.nivelar_piso ? {
        cemento_niv: {grp:"pisos", label:"Cemento para nivelación de piso", qty:(a_seco+a_cocina)*15*1.05, unit:"kg",        p:726,  mo:MO.consumible},
        arena_niv:   {grp:"pisos", label:"Arena de río para nivelación",    qty:(a_seco+a_cocina)*1.5*1.05, unit:"bol. 40kg", p:5950, mo:MO.consumible},
      } : {}),
      // PUERTAS
      ...(instala_puertas ? {
        puerta_int: {grp:"puertas",  label:"Puerta interior (hoja + marco + tapajuntas)", qty:n_puertas_int, unit:"und", p:P.puerta_int*pm, mo:MO.puerta},
      } : {}),
    };

    const items = {};
    Object.entries(raw).forEach(([id,r])=>{
      const qty = Math.ceil(r.qty*10)/10;
      const costo = Math.round(qty*r.p);
      items[id] = {...r, qty, costo, costoFinal:costo, mano:Math.round(costo*(r.mo||0)), diff:null};
    });
    return { items };
  };

  const GRUPOS = [
    {id:"pisos",    emoji:"🟫", nombre:"Pisos y enchapes",   desc:"Cerámica, enchapes, pegante, boquilla y guardaescoba"},
    {id:"muros",    emoji:"🎨", nombre:"Muros y techo",      desc:"Estuco, pintura y cielo raso"},
    {id:"dotacion", emoji:"🚿", nombre:"Dotación sanitaria", desc:"Sanitarios, lavamanos, grifería y ducha"},
    {id:"puertas",  emoji:"🚪", nombre:"Puertas interiores", desc:"Puertas completas con marco y tapajuntas"},
  ];
  return { calcProyecto, GRUPOS };
})();

/* ═══════════════════════════════════════════════════════════
   GENERADOR PDF
═══════════════════════════════════════════════════════════ */
const generarPDF = ({area,habs,banos,tipo,enchape,cocina,incluyeMO,grupos,itemsConCot,totalMat,totalMO,totalConMO,moPct}) => {
  const fecha = new Date().toLocaleDateString("es-CO",{year:"numeric",month:"long",day:"numeric"});
  const nivelLabel = {basico:"Básico",intermedio:"Intermedio",premium:"Premium"}[tipo]||tipo;
  const encLabel   = {cabina:"Solo cabina de ducha",media:"Cabina + media altura",completo:"Baño completo"}[enchape]||enchape;
  const cocLabel   = {lineal:"Lineal",l:'En "L"'}[cocina]||cocina;
  const activos    = ENGINE.GRUPOS.filter(g=>grupos.has(g.id));
  const filas      = activos.map(g=>{
    const its = Object.entries(itemsConCot).filter(([,d])=>d.grp===g.id);
    return {g, its, sub:its.reduce((s,[,d])=>s+d.costoFinal,0)};
  });
  const html = `<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8">
  <title>RemodelApp.co · Presupuesto</title>
  <style>
    *{box-sizing:border-box;margin:0;padding:0}
    body{font-family:Arial,sans-serif;color:#0D1B3E;font-size:13px;padding:32px;max-width:860px;margin:0 auto}
    .cover{background:#0D1B3E;color:#fff;border-radius:12px;padding:28px 28px 24px;margin-bottom:24px}
    .logo-row{display:flex;align-items:center;gap:10px;margin-bottom:16px}
    .logo-circle{width:36px;height:36px;border-radius:8px;background:#00AEEF;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:16px;color:#fff}
    .logo-text{font-size:20px;font-weight:900}.logo-text span{color:#00AEEF}
    .tagline{font-size:10px;opacity:.45;letter-spacing:1.5px;text-transform:uppercase;margin-top:2px}
    .total-label{font-size:10px;opacity:.5;text-transform:uppercase;letter-spacing:1px;margin-bottom:4px}
    .total-big{font-size:38px;font-weight:900;color:#00AEEF;letter-spacing:-1px;margin-bottom:4px}
    .total-sub{font-size:13px;opacity:.6;margin-bottom:16px}
    .stats{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:rgba(255,255,255,.1);border-radius:8px;overflow:hidden}
    .stat{padding:10px 12px;background:rgba(255,255,255,.06)}
    .stat-l{font-size:9px;opacity:.5;text-transform:uppercase;letter-spacing:.7px;margin-bottom:3px}
    .stat-v{font-size:13px;font-weight:700}
    .section{margin-bottom:22px}
    .section-title{font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.8px;color:#4A6080;border-bottom:2px solid #D8E6F0;padding-bottom:5px;margin-bottom:10px}
    .info-grid{display:grid;grid-template-columns:1fr 1fr;gap:6px 24px}
    .info-item{display:flex;justify-content:space-between;padding:5px 0;border-bottom:1px solid #EEF4FF;font-size:12px}
    .info-val{font-weight:700}
    .rango-grid{display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin-top:10px}
    .rango-cell{border:1px solid #D8E6F0;border-radius:8px;padding:10px;text-align:center}
    .rango-label{font-size:10px;color:#4A6080;margin-bottom:3px}
    .rango-val{font-size:13px;font-weight:900}
    table{width:100%;border-collapse:collapse;font-size:12px}
    th{background:#EEF4FF;padding:8px 10px;text-align:left;font-size:10px;text-transform:uppercase;letter-spacing:.6px;color:#4A6080;border-bottom:2px solid #D8E6F0}
    th.right,td.right{text-align:right}
    td{padding:7px 10px;border-bottom:1px solid #F0F6FF}
    .cat-row td{background:#EEF4FF;font-size:12px;font-weight:700;padding:8px 10px;border-top:2px solid #D8E6F0}
    .total-row td{background:#0D1B3E;color:#fff;padding:12px 10px;font-size:14px;font-weight:900;border-bottom:none}
    .mo-box{background:#E6F7FF;border:2px solid #00AEEF;border-radius:10px;padding:13px 16px;margin-top:14px;display:flex;justify-content:space-between;align-items:center}
    .mo-label{font-size:13px;font-weight:700;color:#0077B6}
    .mo-val{font-size:18px;font-weight:900;color:#00AEEF}
    .tip-row{display:flex;gap:10px;padding:8px 0;border-bottom:1px solid #F0F6FF;font-size:12px}
    .tip-num{color:#00AEEF;font-weight:700;flex-shrink:0}
    .disclaimer{background:#F5F8FC;border-radius:8px;padding:13px 15px;font-size:11px;color:#4A6080;line-height:1.6;margin-top:20px}
    .footer{text-align:center;font-size:11px;color:#8BA0B8;margin-top:24px;padding-top:14px;border-top:1px solid #D8E6F0}
    @media print{
      body{padding:20px}
      .cover{-webkit-print-color-adjust:exact;print-color-adjust:exact}
      .cat-row td,.total-row td{-webkit-print-color-adjust:exact;print-color-adjust:exact}
    }
  </style></head><body>
  <div class="cover">
    <div class="logo-row">
      <div class="logo-circle">R</div>
      <div><div class="logo-text">Remodel<span>App</span>.co</div><div class="tagline">Calcula · Compra · Remodela sin desperdiciar</div></div>
    </div>
    <div class="total-label">${incluyeMO?"Inversión total con mano de obra":"Total solo materiales"}</div>
    <div class="total-big">${copFull(totalConMO)}</div>
    <div class="total-sub">${area} m² · ${habs} hab. · ${banos} baños · Nivel ${nivelLabel} · Bogotá ${new Date().getFullYear()}</div>
    <div class="stats">
      <div class="stat"><div class="stat-l">Solo materiales</div><div class="stat-v">${copFull(totalMat)}</div></div>
      <div class="stat"><div class="stat-l">Mano de obra (${(moPct*100).toFixed(0)}%)</div><div class="stat-v">${incluyeMO?copFull(totalMO):"No incluida"}</div></div>
      <div class="stat"><div class="stat-l">Costo por m²</div><div class="stat-v">${area>0?copFull(totalConMO/area):"—"}</div></div>
    </div>
  </div>
  <div class="section">
    <div class="section-title">Datos del proyecto</div>
    <div class="info-grid">
      ${[["Área total",`${area} m²`],["Habitaciones",`${habs}`],["Baños",`${banos}`],["Nivel de acabados",nivelLabel],["Tipo enchape baños",encLabel],["Tipo cocina",cocLabel],["Ciudad","Bogotá y alrededores"],["Mano de obra",incluyeMO?`${(moPct*100).toFixed(0)}% materiales`:"No incluida"]].map(([l,v])=>`<div class="info-item"><span>${l}</span><span class="info-val">${v}</span></div>`).join("")}
    </div>
  </div>
  <div class="section">
    <div class="section-title">Rango estimado de mercado</div>
    <div class="rango-grid">
      <div class="rango-cell"><div class="rango-label">🔻 Mínimo</div><div class="rango-val">${copFull(totalConMO*.80)}</div></div>
      <div class="rango-cell"><div class="rango-label">■ Promedio</div><div class="rango-val">${copFull(totalConMO)}</div></div>
      <div class="rango-cell"><div class="rango-label">🔺 Alto</div><div class="rango-val">${copFull(totalConMO*1.35)}</div></div>
    </div>
  </div>
  <div class="section">
    <div class="section-title">Lista de materiales</div>
    <table><thead><tr><th>Material</th><th class="right">Cantidad</th><th class="right">Und</th><th class="right">Precio/und</th><th class="right">Subtotal</th></tr></thead>
    <tbody>
      ${filas.map(({g,its,sub})=>`
        <tr class="cat-row"><td colspan="4">${g.emoji} ${g.nombre}</td><td class="right">${copFull(sub)}</td></tr>
        ${its.map(([,d])=>`<tr><td style="padding-left:18px">${d.label}</td><td class="right">${d.qty.toFixed(d.unit==="und"?0:1)}</td><td class="right">${d.unit}</td><td class="right">${copFull(d.p)}</td><td class="right">${copFull(d.costoFinal)}</td></tr>`).join("")}
      `).join("")}
      <tr class="total-row"><td colspan="4">TOTAL MATERIALES</td><td class="right">${copFull(totalMat)}</td></tr>
    </tbody></table>
    ${incluyeMO?`<div class="mo-box"><div><div class="mo-label">🔨 Mano de obra estimada</div><div style="font-size:11px;color:#4A6080;margin-top:2px">${(moPct*100).toFixed(0)}% sobre materiales · Factor APU por capítulo · Bogotá ${new Date().getFullYear()}</div></div><div class="mo-val">${copFull(totalMO)}</div></div>`:""}
  </div>
  <div class="section">
    <div class="section-title">Recomendaciones de compra</div>
    ${["Compra pisos y enchapes con el mismo proveedor: puedes obtener entre 8% y 12% de descuento por volumen.","La grifería tiene el mayor margen de negociación — solicita al menos un 15% de descuento.","Boquilla y pegante: pide siempre mínimo 3 cotizaciones, la diferencia puede ser del 30%.","Compra los materiales de una sola vez por categoría para evitar diferencias de lote en colores.","Guarda el 5% del presupuesto de materiales como reserva para imprevistos y remates."].map((t,i)=>`<div class="tip-row"><span class="tip-num">${i+1}.</span><span>${t}</span></div>`).join("")}
  </div>
  <div class="disclaimer"><b>Aviso:</b> Precios estimados basados en mercado Bogotá 2026, con IVA incluido. Las cantidades ya incluyen su porcentaje de desperdicio. Los precios reales varían según proveedor, calidad y temporada. Este informe es preliminar y no reemplaza un metrado técnico profesional.<br><br><b>No incluye:</b> mesón y muebles de cocina, closets, ventanería, carpintería metálica, instalaciones eléctricas, hidrosanitarias y de gas, luminarias, aparatos, demoliciones, retiro de escombros ni pintura de puertas.</div>
  <div class="footer">Generado por <b>RemodelApp.co</b> · Bogotá, Colombia · ${fecha}<br/><span style="opacity:.6">Calcula · Compra · Remodela sin desperdiciar</span></div>
  <script>window.onload=()=>setTimeout(()=>window.print(),400)</script>
  </body></html>`;
  const blob = new Blob([html], {type:"text/html;charset=utf-8"});
  const url  = URL.createObjectURL(blob);
  const win  = window.open(url, "_blank");
  if(!win){
    // Ventana emergente bloqueada: se descarga el informe para abrirlo a mano.
    const link = document.createElement("a");
    link.href = url;
    link.download = "RemodelApp_Presupuesto.html";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  setTimeout(()=>URL.revokeObjectURL(url), 60000);
};

/* ═══════════════════════════════════════════════════════════
   UTILS & TOKENS
═══════════════════════════════════════════════════════════ */
const copFull = n => (!n&&n!==0)?"—":"$"+Math.round(n).toLocaleString("es-CO");
const cop = n => {
  if(!n&&n!==0) return "—";
  if(n>=1_000_000) return "$"+(n/1_000_000).toFixed(1).replace(/\.0$/,"")+"M";
  if(n>=1_000) return "$"+Math.round(n/1000)+"k";
  return "$"+Math.round(n).toLocaleString("es-CO");
};
const qFmt = (qty,unit) => unit==="und"?`${Math.round(qty)} ${unit}`:`${qty.toFixed(1)} ${unit}`;

// ── PALETA — colores del logo RemodelApp ──
const C = {
  bg:"#F5F8FC", card:"#FFFFFF",
  navy:"#0D1B3E",    // azul oscuro del logo
  cyan:"#00AEEF",    // cyan del logo
  cyanLight:"#E6F7FF",
  ink:"#0D1B3E", inkMid:"#4A6080", inkDim:"#8BA0B8",
  border:"#D8E6F0",
  green:"#16A34A", greenLight:"#F0FDF4",
  amber:"#D97706", amberLight:"#FFFBEB",
  red:"#DC2626", redLight:"#FEF2F2",
  sh:"0 1px 3px rgba(13,27,62,.06), 0 4px 16px rgba(13,27,62,.04)",
};

/* ═══════════════════════════════════════════════════════════
   APP
═══════════════════════════════════════════════════════════ */
// Se evalúa una sola vez al cargar: el orden de los hooks nunca cambia.
const ES_ADMIN = typeof window!=="undefined" && window.location.hash==="#admin";

export default function App() {
  if(ES_ADMIN) return <AdminPanel/>;

  const [paso, setPaso]           = useState(1);
  const [area, setArea]           = useState("");
  const [habs, setHabs]           = useState(2);
  const [banos, setBanos]         = useState(2);
  const [balcon, setBalcon]       = useState(false);
  const [ventanas, setVentanas]   = useState(3);
  const [enchape, setEnchape]     = useState("cabina");
  const [cocina, setCocina]       = useState("lineal");
  const [tipo, setTipo]           = useState("intermedio");
  const [presup, setPresup]       = useState("");
  // Nuevas preguntas
  const [banosRen, setBanosRen]   = useState(2);   // baños a renovar
  const [techo, setTecho]         = useState("conservar"); // 'conservar'|'drywall'
  const [instalaPtas, setInstalaPtas] = useState(true);
  const [nivelarPiso, setNivelarPiso] = useState(true); // VIS generalmente requiere nivelación
  // Grupos y compras
  const [grupos, setGrupos]       = useState(new Set(["pisos","muros","dotacion","puertas"]));
  // Desbloqueo manual (transferencia Nequi / Daviplata + código)
  // La referencia se guarda en el navegador: si el usuario recarga, abre el panel
  // o cierra la pestaña, sigue siendo la misma. Sin esto, el código que ya se
  // entregó dejaría de corresponder.
  const [refPago] = useState(()=>{
    try{ const g = localStorage.getItem("remodelapp_ref"); if(g) return g; }catch{}
    const abc = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";          // sin O/0/I/1/L
    let c = ""; for(let i=0;i<4;i++) c += abc[Math.floor(Math.random()*abc.length)];
    const nueva = "RA-"+c;
    try{ localStorage.setItem("remodelapp_ref", nueva); }catch{}
    return nueva;
  });
  const [isPaid, setIsPaid] = useState(()=>{
    try{ return localStorage.getItem("remodelapp_ok") === "1"; }catch{ return false; }
  });
  const [codigo, setCodigo]       = useState("");
  const [verificando, setVerif]   = useState(false);
  const [errorCod, setErrorCod]   = useState("");
  const [comprado, setComp]       = useState(new Set());
  const [incluyeMO, setMO]        = useState(true);
  // Numeros: acepta coma decimal y separadores de miles (5.000.000 / 5,000,000 / 65,5)
  const numCO = txt => {
    const m = String(txt||"").match(/[0-9][0-9.,]*/);   // primer número, ignora "m2", "$", texto
    if(!m) return 0;
    return parseFloat(m[0].replace(/[.,](?=\d{3}\b)/g,"").replace(",","."))||0;
  };
  const a      = numCO(area);
  const budget = numCO(presup);

  // Sincronizar banosRen cuando cambia banos
  const handleBanos = v => { setBanos(v); setBanosRen(v); };

  // Un solo interruptor manda sobre las puertas: si el usuario dice que si,
  // el grupo entra al total; si dice que no, sale.
  const handlePuertas = v => {
    setInstalaPtas(v);
    setGrupos(p=>{const s=new Set(p); v?s.add("puertas"):s.delete("puertas"); return s;});
  };

  const {items} = useMemo(()=>{
    if(a<10) return {items:{}};
    return ENGINE.calcProyecto({
      area:a, habitaciones:habs, banos, balcon, ventanas,
      tipo_enchape:enchape, tipo_cocina:cocina, tipo,
      banos_renovar:banosRen, techo, instala_puertas:instalaPtas,
      nivelar_piso:nivelarPiso,
    });
  },[a,habs,banos,balcon,ventanas,enchape,cocina,tipo,banosRen,techo,instalaPtas,nivelarPiso]);

  const {totalMat,totalMO,totalConMO,moPct} = useMemo(()=>{
    let mat=0, mo=0;
    Object.values(items).forEach(d=>{if(grupos.has(d.grp)){mat+=d.costoFinal; mo+=d.mano||0;}});
    return {
      totalMat:mat,
      totalMO:mo,
      totalConMO:mat+(incluyeMO?mo:0),
      moPct: mat>0 ? mo/mat : 0,
    };
  },[items,grupos,incluyeMO]);

  // Tres escenarios — propuesta de valor central de RemodelApp
  const ESC = useMemo(()=>({
    remodelapp:  totalMat,
    // Las cantidades ya traen su desperdicio: aqui solo va el diferencial de precio.
    ferreteria:  Math.round(totalMat*1.35),    // +35% precio ferretería vs. mayorista
    maestroMin:  Math.round(totalMat*1.50),    // +50% maestro a todo costo
    maestroMax:  Math.round(totalMat*1.60),    // +60% maestro a todo costo
  }),[totalMat]);

  const compTotal = useMemo(()=>{
    let t=0; comprado.forEach(id=>{t+=items[id]?.costoFinal||0;}); return t;
  },[comprado,items]);

  const overBudget = budget>0&&totalConMO>budget;
  const pct = totalConMO>0?Math.min((compTotal/totalConMO)*100,100):0;
  const toggleGrupo = id=>setGrupos(p=>{const s=new Set(p);s.has(id)?s.delete(id):s.add(id);return s;});
  const toggleComp  = id=>setComp(p=>{const s=new Set(p);s.has(id)?s.delete(id):s.add(id);return s;});
  const verificarCodigo = async()=>{
    setErrorCod(""); setVerif(true);
    try{
      const r = await fetch("/api/desbloquear",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({ref:refPago, codigo}),
      });
      const j = await r.json().catch(()=>({}));
      if(r.ok && j.ok){
        setIsPaid(true);
        try{ localStorage.setItem("remodelapp_ok","1"); }catch{}
      }
      else setErrorCod(j.error || `Ese código no corresponde a la referencia ${refPago}. Verifica que sea la misma que me enviaste.`);
    }catch{
      setErrorCod("No pude verificar el código. Revisa tu conexión e intenta otra vez.");
    }finally{ setVerif(false); }
  };

  const descargarPDF = ()=>generarPDF({area:a,habs,banos,tipo,enchape,cocina,incluyeMO,grupos,itemsConCot:items,totalMat,totalMO,totalConMO,moPct});
  const selectedItems = Object.entries(items).filter(([,d])=>grupos.has(d.grp)).map(([id,d])=>({id,...d}));

  return (
    <div style={{fontFamily:"system-ui,-apple-system,sans-serif",background:C.bg,color:C.ink,minHeight:"100vh",WebkitFontSmoothing:"antialiased"}}>

      {/* ── NAVBAR ── */}
      <div style={{background:C.navy,padding:"0 16px",position:"sticky",top:0,zIndex:50}}>
        <div style={{maxWidth:560,margin:"0 auto",height:56,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <img src={`data:image/png;base64,${LOGO_B64}`} alt="RemodelApp" style={{width:36,height:36,borderRadius:8,objectFit:"cover"}} />
            <div>
              <div style={{fontWeight:900,fontSize:15,color:"#fff",letterSpacing:"-.3px",lineHeight:1.1}}>
                Remodel<span style={{color:C.cyan}}>App</span><span style={{color:"rgba(255,255,255,.45)",fontSize:11}}>.co</span>
              </div>
              <div style={{fontSize:9,color:"rgba(255,255,255,.35)",letterSpacing:1,textTransform:"uppercase"}}>Calcula · Compra · Remodela</div>
            </div>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:0}}>
            {[1,2,3].map((n,i)=>(
              <div key={n} style={{display:"flex",alignItems:"center"}}>
                <button onClick={()=>{if(n<=paso||(n>1&&a>=10))setPaso(n);}} style={{width:28,height:28,borderRadius:14,border:"none",cursor:"pointer",background:paso===n?C.cyan:paso>n?"rgba(0,174,239,.3)":"rgba(255,255,255,.12)",color:paso>=n?"#fff":"rgba(255,255,255,.35)",fontWeight:900,fontSize:12,fontFamily:"inherit",transition:"all .2s"}}>{n}</button>
                {i<2&&<div style={{width:16,height:2,background:paso>n?C.cyan:"rgba(255,255,255,.12)",margin:"0 2px"}}/>}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{maxWidth:560,margin:"0 auto",padding:"0 14px"}}>

        {/* ══ PASO 1 ══ */}
        {paso===1&&(
          <div style={{paddingTop:26,paddingBottom:80}}>
            <div style={{marginBottom:26}}>
              <div style={{fontSize:11,fontWeight:700,color:C.cyan,letterSpacing:1.2,textTransform:"uppercase",marginBottom:7}}>Calculadora de acabados</div>
              <h1 style={{fontSize:27,fontWeight:900,lineHeight:1.15,margin:0,letterSpacing:"-.5px"}}>Cuéntanos sobre<br/>tu apartamento</h1>
              <p style={{color:C.inkMid,fontSize:14,margin:"9px 0 0",lineHeight:1.6}}>Responde estas preguntas y calculamos materiales, costos y mano de obra automáticamente.</p>
            </div>

            <Block label="¿Cuánto mide el apartamento?">
              <div style={{position:"relative"}}>
                <input type="number" value={area} onChange={e=>setArea(e.target.value)} placeholder="65"
                  style={{width:"100%",padding:"15px 52px 15px 16px",fontSize:26,fontWeight:900,border:`2px solid ${a>=10?C.cyan:C.border}`,borderRadius:13,outline:"none",fontFamily:"inherit",color:C.ink,background:"#fff",boxSizing:"border-box",transition:"border-color .2s",boxShadow:C.sh}}/>
                <span style={{position:"absolute",right:16,top:"50%",transform:"translateY(-50%)",fontWeight:800,fontSize:15,color:a>=10?C.cyan:C.inkDim}}>m²</span>
              </div>
              <p style={{fontSize:12,color:C.inkMid,marginTop:5}}>Área total: sala, habitaciones, cocina y baños</p>
            </Block>

            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:20}}>
              <div style={{background:"#fff",border:`2px solid ${habs?C.cyan:C.border}`,borderRadius:14,padding:"16px 12px",boxShadow:C.sh,textAlign:"center"}}>
                <div style={{fontSize:11,fontWeight:700,color:C.inkMid,textTransform:"uppercase",letterSpacing:.8,marginBottom:14}}>Habitaciones</div>
                <Stepper value={habs} onChange={setHabs} min={1} max={5}/>
              </div>
              <div style={{background:"#fff",border:`2px solid ${banos?C.cyan:C.border}`,borderRadius:14,padding:"16px 12px",boxShadow:C.sh,textAlign:"center"}}>
                <div style={{fontSize:11,fontWeight:700,color:C.inkMid,textTransform:"uppercase",letterSpacing:.8,marginBottom:14}}>Baños</div>
                <Stepper value={banos} onChange={handleBanos} min={1} max={4}/>
              </div>
            </div>

            <Block label="¿El piso requiere nivelación previa?">
              <div style={{display:"flex",gap:10}}>
                {[
                  {v:true,  l:"Sí, necesita nivelación", sub:"Habitual en VIS · losa irregular"},
                  {v:false, l:"No necesita",              sub:"Losa ya nivelada"},
                ].map(o=>(
                  <button key={String(o.v)} onClick={()=>setNivelarPiso(o.v)} style={{
                    flex:1, padding:"13px 10px", borderRadius:12, textAlign:"center",
                    border:`2px solid ${nivelarPiso===o.v?C.cyan:C.border}`,
                    background:nivelarPiso===o.v?C.cyanLight:"#fff",
                    cursor:"pointer", fontFamily:"inherit", transition:"all .15s", boxShadow:C.sh,
                  }}>
                    <div style={{fontWeight:800,fontSize:13,color:nivelarPiso===o.v?C.cyan:C.ink,marginBottom:3}}>{o.l}</div>
                    <div style={{fontSize:10,color:C.inkMid}}>{o.sub}</div>
                  </button>
                ))}
              </div>
              <p style={{fontSize:11,color:C.inkMid,marginTop:5}}>Aplica a sala, habitaciones y cocina · Mortero 1:4 a 4 cm</p>
            </Block>

            <Block label="¿Cuántas ventanas tiene?">
              <PickRow options={[2,3,4,5,6]} labels={["2","3","4","5","5+"]} value={ventanas} onChange={setVentanas}/>
              <p style={{fontSize:11,color:C.inkMid,marginTop:5}}>Mejora el cálculo de pintura y estuco</p>
            </Block>

            <Block label="¿Tiene balcón?">
              <div style={{display:"flex",gap:10}}>
                {[{v:false,l:"No tiene"},{v:true,l:"Sí tiene"}].map(o=>(
                  <button key={String(o.v)} onClick={()=>setBalcon(o.v)} style={{flex:1,padding:"12px",borderRadius:12,border:`2px solid ${balcon===o.v?C.cyan:C.border}`,background:balcon===o.v?C.cyanLight:"#fff",color:balcon===o.v?C.cyan:C.inkMid,fontWeight:700,fontSize:14,cursor:"pointer",fontFamily:"inherit",transition:"all .15s",boxShadow:C.sh}}>{o.l}</button>
                ))}
              </div>
            </Block>

            <Block label="¿Cómo quieres enchapar los baños?">
              {[
                {id:"cabina",  t:"Solo la cabina de ducha",      d:"La más común · Ducha hasta el techo, resto con pintura antihumedad",tag:"Popular"},
                {id:"media",   t:"Ducha + media altura",          d:"Ducha completa + enchape hasta 1.40 m en todo el perímetro"},
                {id:"completo",t:"Baño completamente enchapado",  d:"Todos los muros hasta el techo · Proyectos premium"},
              ].map(o=>(
                <div key={o.id} onClick={()=>setEnchape(o.id)} style={{display:"flex",gap:12,padding:"12px 13px",marginBottom:8,border:`2px solid ${enchape===o.id?C.cyan:C.border}`,background:enchape===o.id?C.cyanLight:"#fff",borderRadius:12,cursor:"pointer",transition:"all .15s",boxShadow:C.sh}}>
                  <Radio checked={enchape===o.id}/>
                  <div style={{flex:1}}>
                    <div style={{fontWeight:800,fontSize:13,color:enchape===o.id?C.cyan:C.ink,display:"flex",gap:7,alignItems:"center"}}>
                      {o.t}{o.tag&&<span style={{fontSize:9,fontWeight:700,background:C.cyan,color:"#fff",padding:"1px 6px",borderRadius:99}}>{o.tag}</span>}
                    </div>
                    <div style={{fontSize:11,color:C.inkMid,marginTop:3,lineHeight:1.4}}>{o.d}</div>
                  </div>
                </div>
              ))}
            </Block>

            <Block label="Tipo de cocina">
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
                {[{id:"lineal",e:"📏",t:"Lineal",d:"Mesón en una pared · Más común en VIS"},{id:"l",e:"📐",t:'En "L"',d:"Mesón en dos paredes"}].map(o=>(
                  <div key={o.id} onClick={()=>setCocina(o.id)} style={{padding:"13px 11px",borderRadius:12,cursor:"pointer",textAlign:"center",border:`2px solid ${cocina===o.id?C.cyan:C.border}`,background:cocina===o.id?C.cyanLight:"#fff",transition:"all .15s",boxShadow:C.sh}}>
                    <div style={{fontSize:22,marginBottom:4}}>{o.e}</div>
                    <div style={{fontSize:13,fontWeight:800,color:cocina===o.id?C.cyan:C.ink}}>{o.t}</div>
                    <div style={{fontSize:10,color:C.inkMid,marginTop:2,lineHeight:1.3}}>{o.d}</div>
                  </div>
                ))}
              </div>
            </Block>

            {/* ── NUEVAS PREGUNTAS ── */}
            <Block label={`¿Cuántos de tus ${banos} baño${banos>1?"s":""} vas a renovar la dotación?`}>
              <PickRow options={[...Array(banos+1).keys()]} labels={[...Array(banos+1).keys()].map(n=>n===0?"Ninguno":n===banos?"Todos":String(n))} value={banosRen} onChange={setBanosRen}/>
              <p style={{fontSize:11,color:C.inkMid,marginTop:5}}>La constructora entrega al menos 1 baño dotado por ley</p>
            </Block>

            <Block label="¿Qué vas a hacer con el techo?">
              {[
                {id:"conservar",t:"Dejarlo como lo entregó la constructora",d:"Carraplast ya aplicado — sin costo adicional"},
                {id:"drywall",  t:"Instalar cielo raso en drywall",         d:"Placa de yeso + estructura metálica"},
              ].map(o=>(
                <div key={o.id} onClick={()=>setTecho(o.id)} style={{display:"flex",gap:12,padding:"12px 13px",marginBottom:8,border:`2px solid ${techo===o.id?C.cyan:C.border}`,background:techo===o.id?C.cyanLight:"#fff",borderRadius:12,cursor:"pointer",transition:"all .15s",boxShadow:C.sh}}>
                  <Radio checked={techo===o.id}/>
                  <div style={{flex:1}}>
                    <div style={{fontWeight:800,fontSize:13,color:techo===o.id?C.cyan:C.ink}}>{o.t}</div>
                    <div style={{fontSize:11,color:C.inkMid,marginTop:3}}>{o.d}</div>
                  </div>
                </div>
              ))}
            </Block>

            <Block label="¿Vas a instalar puertas interiores?">
              <div style={{display:"flex",gap:10}}>
                {[{v:true,l:"Sí, las necesito"},{v:false,l:"No por ahora"}].map(o=>(
                  <button key={String(o.v)} onClick={()=>handlePuertas(o.v)} style={{flex:1,padding:"12px",borderRadius:12,border:`2px solid ${instalaPtas===o.v?C.cyan:C.border}`,background:instalaPtas===o.v?C.cyanLight:"#fff",color:instalaPtas===o.v?C.cyan:C.inkMid,fontWeight:700,fontSize:13,cursor:"pointer",fontFamily:"inherit",transition:"all .15s",boxShadow:C.sh}}>{o.l}</button>
                ))}
              </div>
              <p style={{fontSize:11,color:C.inkMid,marginTop:5}}>La constructora entrega la puerta principal y del baño principal</p>
            </Block>

            <Block label="Nivel de acabados">
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8}}>
                {[{id:"basico",e:"🧱",t:"Básico",d:"Lo esencial"},{id:"intermedio",e:"🏠",t:"Intermedio",d:"Buena calidad"},{id:"premium",e:"✨",t:"Premium",d:"Alta gama"}].map(o=>(
                  <button key={o.id} onClick={()=>setTipo(o.id)} style={{padding:"13px 8px",borderRadius:12,cursor:"pointer",textAlign:"center",fontFamily:"inherit",border:`2px solid ${tipo===o.id?C.cyan:C.border}`,background:tipo===o.id?C.cyanLight:"#fff",transition:"all .15s",boxShadow:C.sh}}>
                    <div style={{fontSize:21,marginBottom:4}}>{o.e}</div>
                    <div style={{fontSize:12,fontWeight:800,color:tipo===o.id?C.cyan:C.ink}}>{o.t}</div>
                    <div style={{fontSize:10,color:C.inkMid,marginTop:2}}>{o.d}</div>
                  </button>
                ))}
              </div>
            </Block>

            <Block label={<>Presupuesto disponible <span style={{fontWeight:400,color:C.inkMid}}>(opcional)</span></>}>
              <div style={{display:"flex",alignItems:"center",background:"#fff",border:`2px solid ${C.border}`,borderRadius:12,overflow:"hidden",boxShadow:C.sh}}>
                <span style={{padding:"0 10px 0 14px",color:C.inkMid,fontWeight:700,fontSize:16}}>$</span>
                <input type="text" value={presup} onChange={e=>setPresup(e.target.value)} placeholder="25.000.000"
                  style={{flex:1,padding:"13px 14px 13px 0",fontSize:15,fontWeight:700,border:"none",outline:"none",fontFamily:"inherit",color:C.ink,background:"transparent"}}/>
              </div>
            </Block>

            <BigBtn disabled={a<10} onClick={()=>setPaso(2)}>Calcular materiales →</BigBtn>
            {a<10&&<p style={{textAlign:"center",color:C.inkDim,fontSize:12,marginTop:8}}>Ingresa el área para continuar</p>}
          </div>
        )}

        {/* ══ PASO 2 ══ */}
        {paso===2&&(
          <div style={{paddingTop:22,paddingBottom:120}}>
            <div style={{marginBottom:18}}>
              <div style={{fontSize:11,fontWeight:700,color:C.cyan,letterSpacing:1.2,textTransform:"uppercase",marginBottom:5}}>Selección</div>
              <h2 style={{fontSize:23,fontWeight:900,margin:0,letterSpacing:"-.4px"}}>¿Qué vas a acabar?</h2>
              <p style={{color:C.inkMid,fontSize:14,margin:"5px 0 0"}}>Selecciona las áreas de tu proyecto. Los valores son automáticos.</p>
            </div>
            {ENGINE.GRUPOS.map(g=>{
              const sel=grupos.has(g.id);
              const sub=Object.entries(items).filter(([,d])=>d.grp===g.id).reduce((s,[,d])=>s+d.costoFinal,0);
              return (
                <div key={g.id} onClick={()=>toggleGrupo(g.id)} style={{display:"flex",alignItems:"center",gap:13,padding:"15px",marginBottom:10,background:"#fff",borderRadius:15,cursor:"pointer",border:`2px solid ${sel?C.cyan:C.border}`,boxShadow:sel?`0 0 0 4px ${C.cyanLight},${C.sh}`:C.sh,transition:"all .18s"}}>
                  <div style={{width:46,height:46,borderRadius:13,display:"grid",placeItems:"center",fontSize:22,flexShrink:0,background:sel?C.cyanLight:"#EEF4FF",transition:"background .18s"}}>{g.emoji}</div>
                  <div style={{flex:1}}>
                    <div style={{fontWeight:800,fontSize:14,color:sel?C.cyan:C.ink}}>{g.nombre}</div>
                    <div style={{fontSize:12,color:C.inkMid,marginTop:2}}>{g.desc}</div>
                  </div>
                  <div style={{textAlign:"right",flexShrink:0,marginRight:8}}>
                    <div style={{fontWeight:900,fontSize:14,color:sel?C.cyan:C.inkMid,fontVariantNumeric:"tabular-nums"}}>{cop(sub)}</div>
                    <div style={{fontSize:10,color:C.inkDim,marginTop:1}}>materiales</div>
                  </div>
                  <Check checked={sel}/>
                </div>
              );
            })}
            {/* FLOATING BAR */}
            {totalMat>0&&(
              <div style={{position:"fixed",bottom:0,left:0,right:0,zIndex:40,background:C.navy,padding:"13px 18px",boxShadow:"0 -8px 32px rgba(13,27,62,.4)"}}>
                <div style={{maxWidth:560,margin:"0 auto",display:"flex",alignItems:"center",gap:13}}>
                  <div style={{flex:1}}>
                    <div style={{fontSize:10,color:"rgba(255,255,255,.45)",fontWeight:600,textTransform:"uppercase",letterSpacing:.8}}>Total estimado</div>
                    <div style={{fontSize:21,fontWeight:900,color:"#fff",fontVariantNumeric:"tabular-nums",lineHeight:1.1}}>{copFull(totalMat)}</div>
                    <div style={{fontSize:10,color:"rgba(255,255,255,.35)",marginTop:1}}>solo materiales · {grupos.size} área{grupos.size!==1?"s":""}</div>
                  </div>
                  <button onClick={()=>grupos.size>0&&setPaso(3)} disabled={grupos.size===0} style={{padding:"13px 18px",borderRadius:12,border:"none",background:grupos.size>0?C.cyan:"rgba(255,255,255,.15)",color:grupos.size>0?"#fff":"rgba(255,255,255,.35)",fontWeight:800,fontSize:14,cursor:grupos.size>0?"pointer":"default",fontFamily:"inherit",transition:"all .2s",flexShrink:0,boxShadow:grupos.size>0?"0 4px 16px rgba(0,174,239,.4)":"none"}}>Ver resultado →</button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ══ PASO 3 ══ */}
        {paso===3&&(
          <div style={{paddingTop:18,paddingBottom:80}}>
            {/* HERO */}
            <div style={{background:C.navy,borderRadius:18,padding:"26px 20px",marginBottom:14,position:"relative",overflow:"hidden"}}>
              <div style={{position:"absolute",top:-35,right:-35,width:140,height:140,borderRadius:"50%",border:`2px solid ${C.cyan}22`}}/>
              <div style={{position:"absolute",top:18,right:18,width:55,height:55,borderRadius:"50%",background:`${C.cyan}18`}}/>
              <div style={{fontSize:10,fontWeight:700,color:"rgba(255,255,255,.45)",letterSpacing:1.2,textTransform:"uppercase",marginBottom:5}}>
                {incluyeMO?"Inversión total con mano de obra":"Total solo materiales"}
              </div>
              <div style={{fontSize:42,fontWeight:900,color:C.cyan,letterSpacing:"-1.5px",lineHeight:1,fontVariantNumeric:"tabular-nums",marginBottom:14}}>
                {copFull(totalConMO)}
              </div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:1,background:"rgba(255,255,255,.08)",borderRadius:11,overflow:"hidden"}}>
                {[["Solo materiales",copFull(totalMat)],["Mano de obra",incluyeMO?copFull(totalMO):"No incluida"],["Por m²",a>0?copFull(totalConMO/a):"—"]].map(([l,v])=>(
                  <div key={l} style={{padding:"10px 9px",background:"rgba(255,255,255,.05)"}}>
                    <div style={{fontSize:9,color:"rgba(255,255,255,.4)",textTransform:"uppercase",letterSpacing:.7,marginBottom:3}}>{l}</div>
                    <div style={{fontSize:12,fontWeight:800,color:"#fff",fontVariantNumeric:"tabular-nums"}}>{v}</div>
                  </div>
                ))}
              </div>
              {budget>0&&(
                <div style={{marginTop:13}}>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}>
                    <span style={{fontSize:11,color:"rgba(255,255,255,.5)"}}>{overBudget?"⚠️ Supera tu presupuesto en":"✅ Dentro del presupuesto, sobran"}</span>
                    <span style={{fontSize:12,fontWeight:800,color:overBudget?"#FC9C7A":"#6EE7A8",fontVariantNumeric:"tabular-nums"}}>{copFull(Math.abs(budget-totalConMO))}</span>
                  </div>
                  <div style={{height:5,background:"rgba(255,255,255,.1)",borderRadius:3,overflow:"hidden"}}>
                    <div style={{height:"100%",background:overBudget?C.cyan:"#34D399",borderRadius:3,width:`${Math.min((totalConMO/budget)*100,100)}%`,transition:"width .5s"}}/>
                  </div>
                </div>
              )}
            </div>

            {/* MO TOGGLE */}
            <div style={{background:"#fff",border:`1px solid ${C.border}`,borderRadius:13,padding:"13px 15px",marginBottom:13,display:"flex",alignItems:"center",gap:13,boxShadow:C.sh}}>
              <div style={{flex:1}}>
                <div style={{fontWeight:800,fontSize:14,marginBottom:2}}>🔨 Mano de obra</div>
                <div style={{fontSize:12,color:C.inkMid}}>{incluyeMO?`${(moPct*100).toFixed(0)}% de materiales · Factor APU por capítulo · ${copFull(totalMO)}`:"No incluida en el total actual"}</div>
              </div>
              <Toggle value={incluyeMO} onChange={setMO}/>
            </div>

            {/* TRES ESCENARIOS */}
            <div style={{background:"#fff",border:`1px solid ${C.border}`,borderRadius:16,overflow:"hidden",marginBottom:13,boxShadow:C.sh}}>
              <div style={{padding:"14px 16px 12px",borderBottom:`1px solid ${C.border}`}}>
                <div style={{fontWeight:900,fontSize:15,marginBottom:2}}>💡 ¿Cuánto podrías estar pagando de más?</div>
                <div style={{fontSize:12,color:C.inkMid}}>Así se ve tu proyecto según cómo compres y contrates.</div>
              </div>
              {/* Escenario 1 */}
              <div style={{padding:"13px 16px",borderBottom:`1px solid ${C.border}`,background:C.cyanLight}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <div>
                    <div style={{display:"flex",alignItems:"center",gap:7,marginBottom:3}}>
                      <span style={{fontSize:15}}>🟢</span>
                      <span style={{fontWeight:800,fontSize:13,color:C.navy}}>Con RemodelApp</span>
                      <span style={{fontSize:9,fontWeight:700,background:C.cyan,color:"#fff",padding:"2px 7px",borderRadius:99}}>TÚ</span>
                    </div>
                    <div style={{fontSize:11,color:C.inkMid}}>Cantidades exactas · Precio real de mercado</div>
                  </div>
                  <div style={{textAlign:"right",flexShrink:0}}>
                    <div style={{fontSize:20,fontWeight:900,color:C.cyan,fontVariantNumeric:"tabular-nums"}}>{cop(ESC.remodelapp)}</div>
                    <div style={{fontSize:10,color:C.green,fontWeight:700}}>Base de referencia</div>
                  </div>
                </div>
              </div>
              {/* Escenario 2 */}
              <div style={{padding:"13px 16px",borderBottom:`1px solid ${C.border}`}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <div>
                    <div style={{display:"flex",alignItems:"center",gap:7,marginBottom:3}}>
                      <span style={{fontSize:15}}>🟡</span>
                      <span style={{fontWeight:800,fontSize:13,color:C.navy}}>Comprando en ferretería</span>
                    </div>
                    <div style={{fontSize:11,color:C.inkMid}}>+35% sobre precio mayorista · mismas cantidades</div>
                  </div>
                  <div style={{textAlign:"right",flexShrink:0}}>
                    <div style={{fontSize:18,fontWeight:900,color:C.amber,fontVariantNumeric:"tabular-nums"}}>{cop(ESC.ferreteria)}</div>
                    <div style={{fontSize:10,fontWeight:700,color:C.amber}}>Ahorras {cop(ESC.ferreteria-ESC.remodelapp)}</div>
                  </div>
                </div>
              </div>
              {/* Escenario 3 */}
              <div style={{padding:"13px 16px"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <div>
                    <div style={{display:"flex",alignItems:"center",gap:7,marginBottom:3}}>
                      <span style={{fontSize:15}}>🔴</span>
                      <span style={{fontWeight:800,fontSize:13,color:C.navy}}>Maestro a todo costo</span>
                    </div>
                    <div style={{fontSize:11,color:C.inkMid}}>El maestro compra y decide todo sin control tuyo</div>
                  </div>
                  <div style={{textAlign:"right",flexShrink:0}}>
                    <div style={{fontSize:15,fontWeight:900,color:C.red,fontVariantNumeric:"tabular-nums"}}>{cop(ESC.maestroMin)}–{cop(ESC.maestroMax)}</div>
                    <div style={{fontSize:10,fontWeight:700,color:C.red}}>Ahorras hasta {cop(ESC.maestroMax-ESC.remodelapp)}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* RANGO MERCADO */}
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginBottom:13}}>
              {[["🔻","Mínimo",totalConMO*.80],["■","Promedio",totalConMO],["🔺","Alto",totalConMO*1.35]].map(([e,l,v])=>(
                <div key={l} style={{background:"#fff",border:`1px solid ${C.border}`,borderRadius:11,padding:"11px 9px",textAlign:"center",boxShadow:C.sh}}>
                  <div style={{fontSize:10,color:C.inkMid,marginBottom:3}}>{e} {l}</div>
                  <div style={{fontSize:13,fontWeight:900,fontVariantNumeric:"tabular-nums"}}>{cop(v)}</div>
                  <div style={{fontSize:9,color:C.inkDim,marginTop:2}}>{incluyeMO?"con M.O.":"materiales"}</div>
                </div>
              ))}
            </div>

            {/* ── DESBLOQUEO / INFORME ── */}
            {!isPaid ? (
              <PagoManual
                refPago={refPago} codigo={codigo} setCodigo={setCodigo}
                verificando={verificando} errorCod={errorCod} onVerificar={verificarCodigo}
                grupos={grupos}
              />
            ) : (
              <div>
                {/* Badge */}
                <div style={{background:C.greenLight,border:`1.5px solid ${C.green}`,borderRadius:13,padding:"13px 15px",marginBottom:13,display:"flex",alignItems:"center",justifyContent:"space-between",boxShadow:C.sh}}>
                  <div>
                    <div style={{fontWeight:800,fontSize:14,color:C.green}}>✅ Informe completo · versión gratuita</div>
                    <div style={{fontSize:12,color:C.inkMid,marginTop:2}}>Se abre listo para imprimir o guardar como PDF</div>
                  </div>
                  <button onClick={descargarPDF} style={{padding:"10px 15px",borderRadius:10,border:"none",background:C.green,color:"#fff",fontWeight:800,fontSize:13,cursor:"pointer",fontFamily:"inherit",flexShrink:0,boxShadow:"0 4px 14px rgba(22,163,74,.3)"}}>📄 Ver informe</button>
                </div>

                {/* DESGLOSE */}
                <SecLabel>Desglose por área</SecLabel>
                {ENGINE.GRUPOS.filter(g=>grupos.has(g.id)).map(g=>{
                  const gItems=Object.entries(items).filter(([,d])=>d.grp===g.id);
                  const sub=gItems.reduce((s,[,d])=>s+d.costoFinal,0);
                  return (
                    <div key={g.id} style={{background:"#fff",border:`1px solid ${C.border}`,borderRadius:13,marginBottom:10,overflow:"hidden",boxShadow:C.sh}}>
                      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"12px 15px",borderBottom:`1px solid #EEF4FF`}}>
                        <div style={{display:"flex",alignItems:"center",gap:9}}><span style={{fontSize:18}}>{g.emoji}</span><span style={{fontWeight:800,fontSize:14}}>{g.nombre}</span></div>
                        <span style={{fontWeight:900,fontSize:14,color:C.cyan,fontVariantNumeric:"tabular-nums"}}>{cop(sub)}</span>
                      </div>
                      {gItems.map(([id,d],idx)=>(
                        <div key={id} style={{padding:"9px 15px",borderBottom:idx<gItems.length-1?`1px solid #F5F8FC`:"none",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                          <div>
                            <div style={{fontSize:13}}>{d.label}</div>
                            <div style={{fontSize:11,color:C.inkDim,marginTop:1}}>{qFmt(d.qty,d.unit)}</div>
                          </div>
                          <div style={{textAlign:"right",flexShrink:0}}>
                            <div style={{fontSize:13,fontWeight:700,fontVariantNumeric:"tabular-nums"}}>{cop(d.costoFinal)}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  );
                })}

                {/* TRACKER */}
                <SecLabel>Control de compras — marca lo que ya tienes</SecLabel>
                <div style={{background:"#fff",border:`1px solid ${C.border}`,borderRadius:13,padding:"14px",marginBottom:10,boxShadow:C.sh}}>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:11}}>
                    <div><div style={{fontSize:10,color:C.inkMid,textTransform:"uppercase",letterSpacing:.8,marginBottom:2}}>Ya invertido</div><div style={{fontSize:22,fontWeight:900,color:C.green,fontVariantNumeric:"tabular-nums"}}>{copFull(compTotal)}</div></div>
                    <div style={{textAlign:"right"}}><div style={{fontSize:10,color:C.inkMid,textTransform:"uppercase",letterSpacing:.8,marginBottom:2}}>Pendiente</div><div style={{fontSize:22,fontWeight:900,color:C.amber,fontVariantNumeric:"tabular-nums"}}>{copFull(totalMat-compTotal)}</div></div>
                  </div>
                  <div style={{height:7,background:"#EEF4FF",borderRadius:4,overflow:"hidden",marginBottom:5}}>
                    <div style={{height:"100%",background:C.green,borderRadius:4,width:`${pct}%`,transition:"width .5s"}}/>
                  </div>
                  <div style={{display:"flex",justifyContent:"space-between",fontSize:11,color:C.inkDim}}>
                    <span>{pct.toFixed(0)}% completado</span><span>{comprado.size} de {selectedItems.length} ítems</span>
                  </div>
                </div>
                <div style={{background:"#fff",border:`1px solid ${C.border}`,borderRadius:13,overflow:"hidden",boxShadow:C.sh,marginBottom:16}}>
                  {selectedItems.map((item,idx)=>{
                    const isBought=comprado.has(item.id);
                    return (
                      <div key={item.id} onClick={()=>toggleComp(item.id)} style={{display:"flex",alignItems:"center",gap:12,padding:"12px 14px",borderBottom:idx<selectedItems.length-1?`1px solid #F5F8FC`:"none",cursor:"pointer",background:isBought?C.greenLight:"#fff",transition:"background .15s"}}>
                        <div style={{width:24,height:24,borderRadius:"50%",flexShrink:0,border:`2px solid ${isBought?C.green:C.border}`,background:isBought?C.green:"transparent",display:"grid",placeItems:"center",transition:"all .15s"}}>
                          {isBought&&<span style={{color:"#fff",fontSize:12,fontWeight:900}}>✓</span>}
                        </div>
                        <div style={{flex:1}}>
                          <div style={{fontSize:13,fontWeight:600,color:isBought?C.inkMid:C.ink,textDecoration:isBought?"line-through":"none"}}>{item.label}</div>
                          <div style={{fontSize:11,color:C.inkDim,marginTop:1}}>{qFmt(item.qty,item.unit)}</div>
                        </div>
                        <div style={{fontSize:13,fontWeight:800,color:isBought?C.green:C.ink,fontVariantNumeric:"tabular-nums"}}>{cop(item.costoFinal)}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

/* ── PANTALLA DE PAGO MANUAL (Nequi / Daviplata) ── */
function PagoManual({refPago,codigo,setCodigo,verificando,errorCod,onVerificar,grupos}){
  const CEL = "3208048325";
  const celBonito = "320 804 8325";
  const msg = encodeURIComponent(`Hola, acabo de pagar el informe de RemodelApp. Mi referencia es ${refPago}.`);
  const wa = `https://wa.me/573208048325?text=${msg}`;
  const copiar = txt => { try{ navigator.clipboard.writeText(txt); }catch{} };
  return (
    <div style={{borderRadius:16,overflow:"hidden",marginBottom:14,boxShadow:C.sh}}>
      {/* Vista previa cubierta */}
      <div style={{padding:"15px",background:"#fff",border:`1px solid ${C.border}`,borderRadius:"13px 13px 0 0",filter:"blur(3px)",opacity:.35,pointerEvents:"none",userSelect:"none"}}>
        <div style={{fontWeight:700,fontSize:12,color:C.inkMid,marginBottom:8,textTransform:"uppercase",letterSpacing:.8}}>Desglose por área</div>
        {ENGINE.GRUPOS.filter(g=>grupos.has(g.id)).map(g=>(
          <div key={g.id} style={{display:"flex",justifyContent:"space-between",padding:"9px 0",borderBottom:`1px solid ${C.border}`}}>
            <span style={{fontWeight:700}}>{g.emoji} {g.nombre}</span>
            <span style={{fontWeight:900,color:C.cyan}}>█████</span>
          </div>
        ))}
      </div>

      <div style={{background:C.navy,padding:"20px",borderRadius:"0 0 14px 14px"}}>
        <div style={{fontWeight:900,fontSize:16,color:"#fff",marginBottom:4}}>Informe completo de materiales</div>
        <div style={{fontSize:13,color:"rgba(255,255,255,.55)",lineHeight:1.5,marginBottom:16}}>
          Desglose ítem por ítem, cantidades exactas con desperdicio y lista de compras para imprimir.
        </div>

        <div style={{fontSize:30,fontWeight:900,color:C.cyan,fontVariantNumeric:"tabular-nums",marginBottom:16}}>$29.900</div>

        {/* PASO 1 */}
        <Paso n="1" titulo="Transfiere por Nequi o Daviplata">
          <div onClick={()=>copiar(CEL)} style={{background:"rgba(255,255,255,.08)",borderRadius:10,padding:"11px 13px",display:"flex",alignItems:"center",justifyContent:"space-between",cursor:"pointer",marginTop:7}}>
            <div>
              <div style={{fontSize:18,fontWeight:900,color:"#fff",fontVariantNumeric:"tabular-nums",letterSpacing:.5}}>{celBonito}</div>
              <div style={{fontSize:11,color:"rgba(255,255,255,.4)",marginTop:1}}>Nequi · Daviplata — toca para copiar</div>
            </div>
            <span style={{fontSize:16}}>📋</span>
          </div>
        </Paso>

        {/* PASO 2 */}
        <Paso n="2" titulo="Envíame el comprobante con tu referencia">
          <div style={{background:"rgba(0,174,239,.12)",border:`1px dashed ${C.cyan}`,borderRadius:10,padding:"10px 13px",marginTop:7,marginBottom:9,textAlign:"center"}}>
            <div style={{fontSize:10,color:"rgba(255,255,255,.45)",textTransform:"uppercase",letterSpacing:1}}>Tu referencia</div>
            <div style={{fontSize:22,fontWeight:900,color:C.cyan,letterSpacing:2,fontVariantNumeric:"tabular-nums"}}>{refPago}</div>
          </div>
          <a href={wa} target="_blank" rel="noreferrer" style={{display:"block",textAlign:"center",padding:"12px",borderRadius:11,background:"#25D366",color:"#fff",fontWeight:900,fontSize:14,textDecoration:"none"}}>
            Escribirme por WhatsApp
          </a>
        </Paso>

        {/* PASO 3 */}
        <Paso n="3" titulo="Te respondo con tu código" ultimo>
          <div style={{display:"flex",gap:8,marginTop:8}}>
            <input
              value={codigo}
              onChange={e=>setCodigo(e.target.value.toUpperCase())}
              onKeyDown={e=>{if(e.key==="Enter")onVerificar();}}
              placeholder="ABCD-1234"
              style={{flex:1,minWidth:0,padding:"12px 13px",borderRadius:11,border:`2px solid ${errorCod?"#FC9C7A":"rgba(255,255,255,.18)"}`,background:"rgba(255,255,255,.07)",color:"#fff",fontSize:16,fontWeight:800,fontFamily:"inherit",letterSpacing:1.5,outline:"none",textAlign:"center"}}
            />
            <button onClick={onVerificar} disabled={verificando||codigo.trim().length<4}
              style={{padding:"12px 17px",borderRadius:11,border:"none",background:codigo.trim().length<4?"rgba(255,255,255,.15)":C.cyan,color:codigo.trim().length<4?"rgba(255,255,255,.35)":"#fff",fontWeight:900,fontSize:14,cursor:verificando||codigo.trim().length<4?"default":"pointer",fontFamily:"inherit",flexShrink:0}}>
              {verificando?"...":"Abrir"}
            </button>
          </div>
          {errorCod&&<div style={{fontSize:12,color:"#FC9C7A",marginTop:8}}>{errorCod}</div>}
        </Paso>

        <div style={{fontSize:11,color:"rgba(255,255,255,.35)",lineHeight:1.6,marginTop:16,paddingTop:14,borderTop:"1px solid rgba(255,255,255,.1)"}}>
          El desbloqueo es manual: reviso la transferencia y te envío el código. Normalmente en menos de 12 horas.
          Tu referencia queda guardada en este navegador, así que puedes cerrar y volver: seguirá siendo la misma.
        </div>
      </div>
    </div>
  );
}

function Paso({n,titulo,children,ultimo}){
  return (
    <div style={{display:"flex",gap:11,paddingBottom:ultimo?0:15,marginBottom:ultimo?0:15,borderBottom:ultimo?"none":"1px solid rgba(255,255,255,.08)"}}>
      <div style={{width:23,height:23,borderRadius:"50%",background:C.cyan,color:"#fff",fontSize:12,fontWeight:900,display:"grid",placeItems:"center",flexShrink:0,marginTop:1}}>{n}</div>
      <div style={{flex:1,minWidth:0}}>
        <div style={{fontSize:13,fontWeight:800,color:"#fff"}}>{titulo}</div>
        {children}
      </div>
    </div>
  );
}

/* ── PANEL DE CRISTIAN (remodelapp.vercel.app/#admin) ── */
function AdminPanel(){
  const [clave,setClave] = useState("");
  const [ref,setRef]     = useState("");
  const [res,setRes]     = useState(null);
  const [cargando,setCargando] = useState(false);
  const pedir = async()=>{
    setCargando(true); setRes(null);
    try{
      const r = await fetch("/api/codigo",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({ref,clave})});
      const j = await r.json().catch(()=>({}));
      setRes(r.ok&&j.ok ? {ok:true,codigo:j.codigo} : {ok:false,msg:j.error||"No autorizado"});
    }catch{ setRes({ok:false,msg:"Sin conexión"}); }
    finally{ setCargando(false); }
  };
  const input = {width:"100%",padding:"13px",borderRadius:11,border:`2px solid ${C.border}`,fontSize:15,fontFamily:"inherit",marginBottom:10,outline:"none",boxSizing:"border-box"};
  return (
    <div style={{fontFamily:"system-ui,-apple-system,sans-serif",background:C.bg,minHeight:"100vh",padding:20}}>
      <div style={{maxWidth:380,margin:"40px auto",background:"#fff",borderRadius:16,padding:22,boxShadow:C.sh}}>
        <div style={{fontWeight:900,fontSize:17,marginBottom:3,color:C.ink}}>Generar código</div>
        <div style={{fontSize:12,color:C.inkMid,marginBottom:16}}>Verifica primero que la transferencia entró.</div>
        <input type="password" value={clave} onChange={e=>setClave(e.target.value)} placeholder="Tu clave" style={input}/>
        <input value={ref} onChange={e=>setRef(e.target.value.toUpperCase())} placeholder="Referencia del cliente (RA-XXXX)" style={{...input,letterSpacing:1.5,fontWeight:700}}/>
        <BigBtn onClick={pedir} disabled={cargando||!clave||ref.length<4}>{cargando?"...":"Generar"}</BigBtn>
        {res&&(
          res.ok
            ? <div style={{marginTop:16,background:C.greenLight,border:`2px solid ${C.green}`,borderRadius:12,padding:16,textAlign:"center"}}>
                <div style={{fontSize:11,color:C.inkMid,textTransform:"uppercase",letterSpacing:1,marginBottom:4}}>Código para el cliente</div>
                <div style={{fontSize:28,fontWeight:900,color:C.green,letterSpacing:3}}>{res.codigo}</div>
              </div>
            : <div style={{marginTop:14,color:C.red,fontSize:13,textAlign:"center",fontWeight:700}}>{res.msg}</div>
        )}
      </div>
    </div>
  );
}

/* ── MICRO COMPONENTES ── */
function Block({label,children,compact}){return <div style={{marginBottom:compact?0:20}}><div style={{fontSize:13,fontWeight:700,marginBottom:8,color:C.ink}}>{label}</div>{children}</div>;}
function SecLabel({children}){return <div style={{fontSize:10,fontWeight:700,color:C.inkMid,textTransform:"uppercase",letterSpacing:1,marginBottom:8,marginTop:4}}>{children}</div>;}
function PickRow({options,labels,value,onChange}){
  return <div style={{display:"flex",gap:7}}>{options.map((o,i)=><button key={o} onClick={()=>onChange(o)} style={{flex:1,padding:"11px 5px",borderRadius:10,border:`2px solid ${value===o?C.cyan:C.border}`,background:value===o?C.cyanLight:"#fff",color:value===o?C.cyan:C.inkMid,fontWeight:800,fontSize:14,cursor:"pointer",fontFamily:"inherit",transition:"all .15s",boxShadow:C.sh}}>{labels?.[i]??o}</button>)}</div>;
}
function Radio({checked}){return <div style={{width:18,height:18,borderRadius:"50%",flexShrink:0,marginTop:2,border:`2px solid ${checked?C.cyan:C.border}`,display:"grid",placeItems:"center",transition:"all .15s"}}>{checked&&<div style={{width:8,height:8,borderRadius:"50%",background:C.cyan}}/>}</div>;}
function Check({checked}){return <div style={{width:23,height:23,borderRadius:6,flexShrink:0,border:`2px solid ${checked?C.cyan:C.border}`,background:checked?C.cyan:"transparent",display:"grid",placeItems:"center",transition:"all .15s"}}>{checked&&<span style={{color:"#fff",fontSize:12,fontWeight:900,lineHeight:1}}>✓</span>}</div>;}
function Toggle({value,onChange}){return <div onClick={()=>onChange(!value)} style={{width:46,height:25,borderRadius:13,background:value?C.cyan:C.border,position:"relative",cursor:"pointer",transition:"background .2s",flexShrink:0}}><div style={{width:21,height:21,borderRadius:11,background:"#fff",position:"absolute",top:2,left:value?23:2,transition:"left .2s",boxShadow:"0 1px 4px rgba(0,0,0,.2)"}}/></div>;}
function BigBtn({children,onClick,disabled}){return <button onClick={onClick} disabled={disabled} style={{width:"100%",padding:"15px",borderRadius:13,border:"none",background:disabled?"#D8E6F0":C.cyan,color:disabled?C.inkDim:"#fff",fontFamily:"inherit",fontWeight:900,fontSize:16,cursor:disabled?"default":"pointer",boxShadow:disabled?"none":"0 6px 24px rgba(0,174,239,.30)",transition:"all .2s"}}>{children}</button>;}
function Stepper({value,onChange,min=1,max=5}){
  return (
    <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:18}}>
      <button onClick={()=>onChange(Math.max(min,value-1))} style={{width:38,height:38,borderRadius:"50%",border:"none",background:value>min?C.border:"#F0F4F8",color:value>min?C.ink:C.inkDim,fontSize:20,fontWeight:700,cursor:value>min?"pointer":"default",fontFamily:"inherit",display:"grid",placeItems:"center",transition:"all .15s"}}>−</button>
      <div style={{fontSize:30,fontWeight:900,color:C.navy,minWidth:28,textAlign:"center",fontVariantNumeric:"tabular-nums"}}>{value}</div>
      <button onClick={()=>onChange(Math.min(max,value+1))} style={{width:38,height:38,borderRadius:"50%",border:"none",background:value<max?C.cyan:"#F0F4F8",color:value<max?"#fff":C.inkDim,fontSize:20,fontWeight:700,cursor:value<max?"pointer":"default",fontFamily:"inherit",display:"grid",placeItems:"center",boxShadow:value<max?"0 3px 10px rgba(0,174,239,.3)":"none",transition:"all .15s"}}>+</button>
    </div>
  );
}
