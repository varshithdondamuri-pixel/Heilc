import "dotenv/config";

import express from "express";
import nodemailer from "nodemailer";
import { z } from "zod";

const app = express();
const port = Number(process.env.PORT || 8787);

app.disable("x-powered-by");
app.use(express.json({ limit: "16kb" }));

const escapeHtml = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

const parseOrigins = () => {
  const configured = (process.env.ALLOWED_ORIGINS || "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);

  return new Set([
    "http://127.0.0.1:4173",
    "http://localhost:4173",
    "http://127.0.0.1:8080",
    "http://localhost:8080",
    ...configured,
  ]);
};

const allowedOrigins = parseOrigins();
const rateLimitWindowMs = Number(process.env.RATE_LIMIT_WINDOW_MS || 60_000);
const rateLimitMaxRequests = Number(process.env.RATE_LIMIT_MAX_REQUESTS || 5);
const rateLimitStore = new Map();

const projectRequestSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(254),
  phone: z.string().trim().min(7).max(30).regex(/^[+0-9 ()-]+$/, "Phone number contains invalid characters."),
  projectType: z.enum([
    "Business Website",
    "Landing Page",
    "E-commerce Store",
    "AI Automation",
    "Marketing Campaign",
    "Custom Project",
  ]),
  description: z.string().trim().min(10).max(3000),
  website: z.string().max(0).optional().default(""),
});

app.use((req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("Referrer-Policy", "same-origin");
  res.setHeader("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; img-src 'self' data: blob:; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; script-src 'self'; connect-src 'self'; frame-ancestors 'none';",
  );
  next();
});

const checkOrigin = (req, res, next) => {
  const origin = req.headers.origin;

  if (!origin) {
    return next();
  }

  if (!allowedOrigins.has(origin)) {
    return res.status(403).json({
      ok: false,
      error: "Origin not allowed.",
    });
  }

  return next();
};

const applyRateLimit = (req, res, next) => {
  const forwarded = req.headers["x-forwarded-for"];
  const ip =
    typeof forwarded === "string"
      ? forwarded.split(",")[0].trim()
      : req.socket.remoteAddress || "unknown";

  const now = Date.now();
  const entry = rateLimitStore.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitStore.set(ip, {
      count: 1,
      resetAt: now + rateLimitWindowMs,
    });
    return next();
  }

  if (entry.count >= rateLimitMaxRequests) {
    return res.status(429).json({
      ok: false,
      error: "Too many requests. Please wait a minute and try again.",
    });
  }

  entry.count += 1;
  return next();
};

const requiredEnv = ["SMTP_USER", "SMTP_PASS"];

const hasMailConfig = requiredEnv.every((key) => Boolean(process.env[key]));

const transporter = hasMailConfig
  ? nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: Number(process.env.SMTP_PORT || 465),
      secure: process.env.SMTP_SECURE ? process.env.SMTP_SECURE === "true" : true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })
  : null;

app.get("/api/health", (_req, res) => {
  res.json({
    ok: true,
    mailConfigured: hasMailConfig,
    allowedOrigins: Array.from(allowedOrigins),
  });
});

app.post("/api/start-project", checkOrigin, applyRateLimit, async (req, res) => {
  const parsed = projectRequestSchema.safeParse(req.body ?? {});

  if (!parsed.success) {
    return res.status(400).json({
      ok: false,
      error: parsed.error.issues[0]?.message || "Please fill in all required fields.",
    });
  }

  const { name, email, phone, projectType, description, website } = parsed.data;

  if (website) {
    return res.status(400).json({
      ok: false,
      error: "Spam detected.",
    });
  }

  if (!transporter) {
    return res.status(500).json({
      ok: false,
      error: "Mail service is not configured yet.",
    });
  }

  try {
    await transporter.sendMail({
      from: process.env.MAIL_FROM || process.env.SMTP_USER,
      to: process.env.START_PROJECT_TO || "heilc.agen@gmail.com",
      replyTo: email,
      subject: `New Project Request from ${name}`,
      text: [
        "New project request",
        "",
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone: ${phone}`,
        `Project Type: ${projectType}`,
        "",
        "Description:",
        description,
      ].join("\n"),
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111827;">
          <h2 style="margin-bottom: 16px;">New Project Request</h2>
          <p><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
          <p><strong>Project Type:</strong> ${escapeHtml(projectType)}</p>
          <p><strong>Description:</strong></p>
          <p style="white-space: pre-wrap;">${escapeHtml(description)}</p>
        </div>
      `,
    });

    return res.json({ ok: true });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      error: error instanceof Error ? error.message : "Unable to send email.",
    });
  }
});

app.listen(port, () => {
  console.log(`Start-project mail server listening on http://127.0.0.1:${port}`);
});
