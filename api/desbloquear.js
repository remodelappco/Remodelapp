// Valida el código de desbloqueo que Cristian le entrega al usuario.
// El secreto vive solo aquí, en el servidor: el navegador nunca lo ve.
import crypto from "node:crypto";

const norm = s => String(s || "").toUpperCase().replace(/[^A-Z0-9]/g, "");

export const codigoDe = ref => {
  const h = crypto
    .createHmac("sha256", process.env.CODIGO_SECRET)
    .update(norm(ref))
    .digest("base64");
  const limpio = h.replace(/[^A-Za-z0-9]/g, "").toUpperCase();
  return limpio.slice(0, 4) + "-" + limpio.slice(4, 8);
};

export default function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ ok: false });
  if (!process.env.CODIGO_SECRET)
    return res.status(500).json({ ok: false, error: "Falta la variable CODIGO_SECRET en Vercel" });

  const { ref, codigo } = req.body || {};
  if (norm(ref).length < 4) return res.status(400).json({ ok: false, error: "Referencia inválida" });

  const esperado = norm(codigoDe(ref));
  const dado = norm(codigo);

  const ok =
    dado.length === esperado.length &&
    crypto.timingSafeEqual(Buffer.from(dado), Buffer.from(esperado));

  return res.status(ok ? 200 : 401).json({ ok });
}
