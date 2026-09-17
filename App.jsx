import { useState, useMemo } from "react";

/* ═══════════════════════════════════════════════════════════
   LOGO — base64 PNG (120×120px, optimizado)
═══════════════════════════════════════════════════════════ */
const LOGO_B64 = "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";

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
    boquilla:     1866,  // 0.28 kg/m² × $6.664/kg con IVA
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
    const m = MULT[tipo]||1.0;
    const dm = DUCHA_MULT[tipo]||1.0;

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
    const a_pin    = muros+a_cielo;

    // ── PUERTAS INTERIORES ──
    const n_puertas_int = h+Math.max(0,b-1)+1; // hab + baños adicionales + cocina

    const raw = {
      // PISOS
      piso_seco:    {grp:"pisos",    label:"Piso sala, comedor y habitaciones", qty:a_seco*(1+W.ceramica),     unit:"m²",  p:P.ceramica*m},
      enc_piso:     {grp:"pisos",    label:"Enchape piso baños y cocina",       qty:enc_piso*(1+W.enchape),    unit:"m²",  p:P.ceramica*m},
      enc_muro:     {grp:"pisos",    label:"Enchape muro baños y cocina",       qty:enc_muro*(1+W.enchape),    unit:"m²",  p:P.ceramica*m},
      pegante:      {grp:"pisos",    label:"Pegante",                           qty:t_inst*(1+W.pegante),      unit:"m²",  p:P.pegante},
      boquilla:     {grp:"pisos",    label:"Boquilla",                          qty:t_inst*(1+W.boquilla),     unit:"m²",  p:P.boquilla},
      guardaescoba: {grp:"pisos",    label:"Guardaescoba",                      qty:ml_gua*(1+W.guardaescoba), unit:"ml",  p:P.guardaescoba*m},
      // MUROS Y TECHO
      estuco:       {grp:"muros",    label:"Estuco y resane (muros y techo)",   qty:a_pin*(1+W.estuco),        unit:"m²",  p:P.estuco},
      pintura:      {grp:"muros",    label:"Pintura 2 manos (muros y techo)",   qty:a_pin*(1+W.pintura),       unit:"m²",  p:P.pintura*m},
      ...(techo==="drywall" ? {
        drywall:    {grp:"muros",    label:"Cielo raso en drywall",             qty:a_cielo*(1+W.drywall),     unit:"m²",  p:P.drywall},
      } : {}),
      // DOTACIÓN (solo baños a renovar)
      ...(banos_renovar>0 ? {
        combo_bano: {grp:"dotacion", label:`Combo dotación baño (sanitario + lavamanos + accesorios)`, qty:banos_renovar, unit:"und", p:P.combo_bano*m},
        ducha:      {grp:"dotacion", label:`Combo ducha y grifería`,           qty:banos_renovar,             unit:"und", p:P.ducha*dm},
      } : {}),
      // NIVELACIÓN PISO (sala, habitaciones y cocina · 4cm · mezcla 1:4)
      ...(inp.nivelar_piso ? {
        cemento_niv: {grp:"pisos", label:"Cemento para nivelación de piso", qty:(a_seco+a_cocina)*15*1.05, unit:"kg",        p:726},
        arena_niv:   {grp:"pisos", label:"Arena de río para nivelación",    qty:(a_seco+a_cocina)*1.5*1.05, unit:"bol. 40kg", p:5950},
      } : {}),
      // PUERTAS
      ...(instala_puertas ? {
        puerta_int: {grp:"puertas",  label:"Puerta interior (hoja + marco + tapajuntas)", qty:n_puertas_int, unit:"und", p:P.puerta_int*m},
      } : {}),
    };

    const items = {};
    Object.entries(raw).forEach(([id,r])=>{
      const qty = Math.ceil(r.qty*10)/10;
      items[id] = {...r, qty, costo:Math.round(qty*r.p), costoFinal:Math.round(qty*r.p), diff:null};
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
const generarPDF = ({area,habs,banos,tipo,enchape,cocina,incluyeMO,grupos,itemsConCot,totalMat,totalConMO,MO_PCT}) => {
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
      <div class="stat"><div class="stat-l">Mano de obra (${(MO_PCT*100).toFixed(0)}%)</div><div class="stat-v">${incluyeMO?copFull(totalMat*MO_PCT):"No incluida"}</div></div>
      <div class="stat"><div class="stat-l">Costo por m²</div><div class="stat-v">${area>0?copFull(totalConMO/area):"—"}</div></div>
    </div>
  </div>
  <div class="section">
    <div class="section-title">Datos del proyecto</div>
    <div class="info-grid">
      ${[["Área total",`${area} m²`],["Habitaciones",`${habs}`],["Baños",`${banos}`],["Nivel de acabados",nivelLabel],["Tipo enchape baños",encLabel],["Tipo cocina",cocLabel],["Ciudad","Bogotá y alrededores"],["Mano de obra",incluyeMO?`${(MO_PCT*100).toFixed(0)}% materiales`:"No incluida"]].map(([l,v])=>`<div class="info-item"><span>${l}</span><span class="info-val">${v}</span></div>`).join("")}
    </div>
  </div>
  <div class="section">
    <div class="section-title">Rango estimado de mercado</div>
    <div class="rango-grid">
      <div class="rango-cell"><div class="rango-label">🔻 Mínimo</div><div class="rango-val">${copFull(totalMat*.80)}</div></div>
      <div class="rango-cell"><div class="rango-label">■ Promedio</div><div class="rango-val">${copFull(totalMat)}</div></div>
      <div class="rango-cell"><div class="rango-label">🔺 Alto</div><div class="rango-val">${copFull(totalMat*1.35)}</div></div>
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
    ${incluyeMO?`<div class="mo-box"><div><div class="mo-label">🔨 Mano de obra estimada</div><div style="font-size:11px;color:#4A6080;margin-top:2px">40% sobre materiales · Estándar APU Bogotá 2026</div></div><div class="mo-val">${copFull(totalMat*MO_PCT)}</div></div>`:""}
  </div>
  <div class="section">
    <div class="section-title">Recomendaciones de compra</div>
    ${["Compra pisos y enchapes con el mismo proveedor: puedes obtener entre 8% y 12% de descuento por volumen.","La grifería tiene el mayor margen de negociación — solicita al menos un 15% de descuento.","Boquilla y pegante: pide siempre mínimo 3 cotizaciones, la diferencia puede ser del 30%.","Compra los materiales de una sola vez por categoría para evitar diferencias de lote en colores.","Guarda el 5% del presupuesto de materiales como reserva para imprevistos y remates."].map((t,i)=>`<div class="tip-row"><span class="tip-num">${i+1}.</span><span>${t}</span></div>`).join("")}
  </div>
  <div class="disclaimer"><b>Aviso:</b> Precios estimados basados en mercado Bogotá 2026. Las cantidades incluyen % de desperdicio. Los precios reales varían según proveedor, calidad y temporada. Este informe es preliminar y no reemplaza un metrado técnico profesional.</div>
  <div class="footer">Generado por <b>RemodelApp.co</b> · Bogotá, Colombia · ${fecha}<br/><span style="opacity:.6">Calcula · Compra · Remodela sin desperdiciar</span></div>
  <script>window.onload=()=>setTimeout(()=>window.print(),400)</script>
  </body></html>`;
  const blob = new Blob([html], {type:"text/html;charset=utf-8"});
  const url  = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "RemodelApp_Presupuesto.html";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(()=>URL.revokeObjectURL(url), 1000);
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
const MO_PCT = 0.40; // 40% — APU estándar Colombia

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
export default function App() {
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
  const [grupos, setGrupos]       = useState(new Set(["pisos","muros","dotacion"]));
  const [comprado, setComp]       = useState(new Set());
  const [incluyeMO, setMO]        = useState(true);
  // Paywall
  const [isPaid, setIsPaid]       = useState(false);
  const [showModal, setModal]     = useState(false);
  const [paying, setPaying]       = useState(false);

  const a      = parseFloat(area)||0;
  const budget = parseFloat((presup||"").replace(/[$.]/g,""))||0;

  // Sincronizar banosRen cuando cambia banos
  const handleBanos = v => { setBanos(v); setBanosRen(v); };

  const {items} = useMemo(()=>{
    if(a<10) return {items:{}};
    return ENGINE.calcProyecto({
      area:a, habitaciones:habs, banos, balcon, ventanas,
      tipo_enchape:enchape, tipo_cocina:cocina, tipo,
      banos_renovar:banosRen, techo, instala_puertas:instalaPtas,
      nivelar_piso:nivelarPiso,
    });
  },[a,habs,banos,balcon,ventanas,enchape,cocina,tipo,banosRen,techo,instalaPtas,nivelarPiso]);

  const {totalMat,totalConMO} = useMemo(()=>{
    let mat=0;
    Object.values(items).forEach(d=>{if(grupos.has(d.grp))mat+=d.costoFinal;});
    return {totalMat:mat, totalConMO:mat*(1+(incluyeMO?MO_PCT:0))};
  },[items,grupos,incluyeMO]);

  // Tres escenarios — propuesta de valor central de RemodelApp
  const ESC = useMemo(()=>({
    remodelapp:  totalMat,
    ferreteria:  Math.round(totalMat*1.755),   // +35% precio ferretería + 30% desperdicio
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
  const simPago = async()=>{setPaying(true);await new Promise(r=>setTimeout(r,2000));setPaying(false);setIsPaid(true);setModal(false);};
  const descargarPDF = ()=>generarPDF({area:a,habs,banos,tipo,enchape,cocina,incluyeMO,grupos,itemsConCot:items,totalMat,totalConMO,MO_PCT});
  const selectedItems = Object.entries(items).filter(([,d])=>grupos.has(d.grp)).map(([id,d])=>({id,...d}));

  return (
    <div style={{fontFamily:"system-ui,-apple-system,sans-serif",background:C.bg,color:C.ink,minHeight:"100vh",WebkitFontSmoothing:"antialiased"}}>

      {/* ── MODAL PAGO ── */}
      {showModal&&(
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.65)",zIndex:200,display:"grid",placeItems:"center",padding:16}} onClick={e=>{if(e.target===e.currentTarget)setModal(false)}}>
          <div style={{background:"#fff",borderRadius:20,overflow:"hidden",width:"100%",maxWidth:380,boxShadow:"0 24px 64px rgba(0,0,0,.25)"}}>
            <div style={{background:C.navy,padding:"22px 22px 20px"}}>
              <div style={{fontSize:10,fontWeight:700,color:"rgba(255,255,255,.5)",textTransform:"uppercase",letterSpacing:1,marginBottom:4}}>Informe completo</div>
              <div style={{fontSize:32,fontWeight:900,color:C.cyan,fontVariantNumeric:"tabular-nums"}}>$29.900</div>
              <div style={{fontSize:13,color:"rgba(255,255,255,.55)",marginTop:2}}>Pago único · Acceso inmediato · PDF descargable</div>
            </div>
            <div style={{padding:"20px 22px"}}>
              {["📄 PDF profesional con tu presupuesto","📦 Cantidades exactas y rendimientos","💰 Comparación vs. precio de mercado","🔨 Estimado de mano de obra (40% APU)","📋 Lista de compras organizada"].map((it,i)=>(
                <div key={i} style={{display:"flex",gap:8,alignItems:"center",padding:"6px 0",fontSize:13,borderBottom:i<4?`1px solid ${C.border}`:"none"}}>{it}</div>
              ))}
              <div style={{fontSize:11,fontWeight:700,color:C.inkMid,textTransform:"uppercase",letterSpacing:.8,margin:"16px 0 10px"}}>Elige tu método de pago</div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:16}}>
                {[{icon:"🏦",l:"PSE",s:"Débito bancario"},{icon:"📱",l:"Nequi",s:"Billetera digital"},{icon:"📲",l:"Daviplata",s:"Billetera digital"},{icon:"💳",l:"Tarjeta",s:"Crédito / débito"}].map(m=>(
                  <button key={m.l} onClick={simPago} disabled={paying} style={{padding:"11px 10px",borderRadius:10,border:`1.5px solid ${C.border}`,background:"#fff",cursor:paying?"default":"pointer",textAlign:"left",fontFamily:"inherit",opacity:paying?.5:1}}>
                    <div style={{fontSize:18,marginBottom:2}}>{m.icon}</div>
                    <div style={{fontSize:13,fontWeight:700,color:C.ink}}>{m.l}</div>
                    <div style={{fontSize:10,color:C.inkMid}}>{m.s}</div>
                  </button>
                ))}
              </div>
              {paying?(
                <div style={{textAlign:"center",padding:14,background:C.cyanLight,borderRadius:12}}>
                  <div style={{fontSize:20,marginBottom:4}}>⏳</div>
                  <div style={{fontWeight:700,fontSize:14,color:C.cyan}}>Procesando pago…</div>
                </div>
              ):(
                <button onClick={()=>setModal(false)} style={{width:"100%",padding:10,background:"transparent",border:"none",color:C.inkMid,fontFamily:"inherit",fontSize:13,cursor:"pointer"}}>Cancelar</button>
              )}
            </div>
          </div>
        </div>
      )}

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
                  <button key={String(o.v)} onClick={()=>setInstalaPtas(o.v)} style={{flex:1,padding:"12px",borderRadius:12,border:`2px solid ${instalaPtas===o.v?C.cyan:C.border}`,background:instalaPtas===o.v?C.cyanLight:"#fff",color:instalaPtas===o.v?C.cyan:C.inkMid,fontWeight:700,fontSize:13,cursor:"pointer",fontFamily:"inherit",transition:"all .15s",boxShadow:C.sh}}>{o.l}</button>
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
                {[["Solo materiales",copFull(totalMat)],["Mano de obra",incluyeMO?copFull(totalMat*MO_PCT):"No incluida"],["Por m²",a>0?copFull(totalConMO/a):"—"]].map(([l,v])=>(
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
                <div style={{fontSize:12,color:C.inkMid}}>{incluyeMO?`40% de materiales · Estándar APU Bogotá · ${copFull(totalMat*MO_PCT)}`:"No incluida en el total actual"}</div>
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
                    <div style={{fontSize:11,color:C.inkMid}}>+35% precio · +30% desperdicio por malos cálculos</div>
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
              {[["🔻","Mínimo",totalMat*.80],["■","Promedio",totalMat],["🔺","Alto",totalMat*1.35]].map(([e,l,v])=>(
                <div key={l} style={{background:"#fff",border:`1px solid ${C.border}`,borderRadius:11,padding:"11px 9px",textAlign:"center",boxShadow:C.sh}}>
                  <div style={{fontSize:10,color:C.inkMid,marginBottom:3}}>{e} {l}</div>
                  <div style={{fontSize:13,fontWeight:900,fontVariantNumeric:"tabular-nums"}}>{cop(v)}</div>
                  <div style={{fontSize:9,color:C.inkDim,marginTop:2}}>materiales</div>
                </div>
              ))}
            </div>

            {/* ── PAYWALL ── */}
            {!isPaid?(
              <div style={{borderRadius:16,overflow:"hidden",marginBottom:14,boxShadow:C.sh}}>
                {/* Preview borrosa */}
                <div style={{padding:"15px",background:"#fff",border:`1px solid ${C.border}`,borderRadius:"13px 13px 0 0",filter:"blur(3px)",opacity:.35,pointerEvents:"none",userSelect:"none"}}>
                  <div style={{fontWeight:700,fontSize:12,color:C.inkMid,marginBottom:8,textTransform:"uppercase",letterSpacing:.8}}>Desglose por área</div>
                  {ENGINE.GRUPOS.filter(g=>grupos.has(g.id)).map(g=>(
                    <div key={g.id} style={{display:"flex",justifyContent:"space-between",padding:"9px 0",borderBottom:`1px solid ${C.border}`}}>
                      <span style={{fontWeight:700}}>{g.emoji} {g.nombre}</span>
                      <span style={{fontWeight:900,color:C.cyan}}>█████</span>
                    </div>
                  ))}
                </div>
                {/* CTA */}
                <div style={{background:C.navy,padding:"20px 20px",borderRadius:"0 0 14px 14px"}}>
                  <div style={{display:"flex",gap:12,alignItems:"flex-start",marginBottom:14}}>
                    <span style={{fontSize:26}}>🔓</span>
                    <div>
                      <div style={{fontWeight:900,fontSize:16,color:"#fff",marginBottom:4}}>Descarga tu informe completo</div>
                      <div style={{fontSize:13,color:"rgba(255,255,255,.55)",lineHeight:1.5}}>PDF profesional con lista detallada de materiales, cantidades exactas y recomendaciones de ahorro.</div>
                    </div>
                  </div>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:7,marginBottom:16}}>
                    {["📄 PDF descargable","📦 Cantidades exactas","💰 Alertas de sobrecosto","🔨 Mano de obra (APU 40%)"].map(it=>(
                      <div key={it} style={{fontSize:12,color:"rgba(255,255,255,.65)"}}>{it}</div>
                    ))}
                  </div>
                  <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12}}>
                    <div>
                      <div style={{fontSize:28,fontWeight:900,color:C.cyan,fontVariantNumeric:"tabular-nums"}}>$29.900</div>
                      <div style={{fontSize:11,color:"rgba(255,255,255,.4)"}}>Pago único · Acceso inmediato</div>
                    </div>
                    <button onClick={()=>setModal(true)} style={{padding:"13px 20px",borderRadius:11,border:"none",background:C.cyan,color:"#fff",fontWeight:900,fontSize:14,cursor:"pointer",fontFamily:"inherit",boxShadow:"0 4px 20px rgba(0,174,239,.45)",transition:"all .2s"}}>Desbloquear →</button>
                  </div>
                  <div style={{fontSize:11,color:"rgba(255,255,255,.25)",textAlign:"center"}}>Pago seguro · PSE · Nequi · Daviplata · Tarjeta</div>
                </div>
              </div>
            ):(
              <div>
                {/* Badge desbloqueado */}
                <div style={{background:C.greenLight,border:`1.5px solid ${C.green}`,borderRadius:13,padding:"13px 15px",marginBottom:13,display:"flex",alignItems:"center",justifyContent:"space-between",boxShadow:C.sh}}>
                  <div>
                    <div style={{fontWeight:800,fontSize:14,color:C.green}}>✅ Informe desbloqueado</div>
                    <div style={{fontSize:12,color:C.inkMid,marginTop:2}}>Descarga tu PDF con el detalle completo</div>
                  </div>
                  <button onClick={descargarPDF} style={{padding:"10px 15px",borderRadius:10,border:"none",background:C.green,color:"#fff",fontWeight:800,fontSize:13,cursor:"pointer",fontFamily:"inherit",flexShrink:0,boxShadow:"0 4px 14px rgba(22,163,74,.3)"}}>📄 Descargar PDF</button>
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
