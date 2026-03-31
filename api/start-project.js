import "dotenv/config";

import {
  applyRateLimit,
  parseProjectRequest,
  securityHeaders,
  sendProjectRequestEmail,
  verifyOrigin,
} from "../backend/projectMail.mjs";

export default async function handler(req, res) {
  Object.entries(securityHeaders).forEach(([key, value]) => {
    res.setHeader(key, value);
  });

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({
      ok: false,
      error: "Method not allowed.",
    });
  }

  const originCheck = verifyOrigin(req.headers.origin);
  if (!originCheck.ok) {
    return res.status(originCheck.status).json({ ok: false, error: originCheck.error });
  }

  const forwarded = req.headers["x-forwarded-for"];
  const ip =
    typeof forwarded === "string"
      ? forwarded.split(",")[0].trim()
      : req.socket?.remoteAddress || "unknown";

  const rateLimitResult = applyRateLimit(ip);
  if (!rateLimitResult.ok) {
    return res.status(rateLimitResult.status).json({ ok: false, error: rateLimitResult.error });
  }

  const parsed = parseProjectRequest(req.body);
  if (!parsed.ok) {
    return res.status(parsed.status).json({ ok: false, error: parsed.error });
  }

  const sendResult = await sendProjectRequestEmail(parsed.data);
  if (!sendResult.ok) {
    return res.status(sendResult.status).json({ ok: false, error: sendResult.error });
  }

  return res.status(200).json({ ok: true });
}
