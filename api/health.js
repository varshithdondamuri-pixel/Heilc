import "dotenv/config";

import { getHealthPayload, securityHeaders } from "../backend/projectMail.mjs";

export default function handler(_req, res) {
  Object.entries(securityHeaders).forEach(([key, value]) => {
    res.setHeader(key, value);
  });

  res.status(200).json(getHealthPayload());
}
