// Panel de Cristian: entrega el código que corresponde a una referencia.
// Protegido con ADMIN_CLAVE, que también vive solo en el servidor.
import crypto from "node:crypto";
import { codigoDe } from "./desbloquear.js";

const norm = s => String(s || "").toUpperCase().replace(/[^A-Z0-9]/g, "");

export default function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ ok: false });
  if (!process.env.CODIGO_SECRET || !process.env.ADMIN_CLAVE)
    return res.status(500).json({ ok: false, error: "Faltan variables de entorno en Vercel" });

  const { ref, clave } = req.body || {};
  const a = Buffer.from(String(clave || ""));
  const b = Buffer.from(String(process.env.ADMIN_CLAVE));
  const autorizado = a.length === b.length && crypto.timingSafeEqual(a, b);
  if (!autorizado) return res.status(401).json({ ok: false, error: "Clave incorrecta" });

  if (norm(ref).length < 4) return res.status(400).json({ ok: false, error: "Referencia inválida" });

  return res.status(200).json({ ok: true, ref: norm(ref), codigo: codigoDe(ref) });
}
