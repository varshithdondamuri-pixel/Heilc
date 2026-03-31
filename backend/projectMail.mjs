import nodemailer from "nodemailer";
import { z } from "zod";

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

export const securityHeaders = {
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "Referrer-Policy": "same-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
  "Content-Security-Policy":
    "default-src 'self'; img-src 'self' data: blob:; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; script-src 'self'; connect-src 'self'; frame-ancestors 'none';",
};

export const getHealthPayload = () => ({
  ok: true,
  mailConfigured: hasMailConfig,
  allowedOrigins: Array.from(allowedOrigins),
});

export const verifyOrigin = (origin) => {
  if (!origin) {
    return { ok: true };
  }

  if (!allowedOrigins.has(origin)) {
    return {
      ok: false,
      status: 403,
      error: "Origin not allowed.",
    };
  }

  return { ok: true };
};

export const applyRateLimit = (ip) => {
  const now = Date.now();
  const key = ip || "unknown";
  const entry = rateLimitStore.get(key);

  if (!entry || now > entry.resetAt) {
    rateLimitStore.set(key, {
      count: 1,
      resetAt: now + rateLimitWindowMs,
    });
    return { ok: true };
  }

  if (entry.count >= rateLimitMaxRequests) {
    return {
      ok: false,
      status: 429,
      error: "Too many requests. Please wait a minute and try again.",
    };
  }

  entry.count += 1;
  return { ok: true };
};

export const parseProjectRequest = (body) => {
  const parsed = projectRequestSchema.safeParse(body ?? {});

  if (!parsed.success) {
    return {
      ok: false,
      status: 400,
      error: parsed.error.issues[0]?.message || "Please fill in all required fields.",
    };
  }

  if (parsed.data.website) {
    return {
      ok: false,
      status: 400,
      error: "Spam detected.",
    };
  }

  return {
    ok: true,
    data: parsed.data,
  };
};

export const sendProjectRequestEmail = async ({ name, email, phone, projectType, description }) => {
  if (!transporter) {
    return {
      ok: false,
      status: 500,
      error: "Mail service is not configured yet.",
    };
  }

  try {
    await transporter.sendMail({
      from: process.env.MAIL_FROM || process.env.SMTP_USER,
      to: process.env.START_PROJECT_TO || "your_email@gmail.com",
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

    return { ok: true, status: 200 };
  } catch (error) {
    return {
      ok: false,
      status: 500,
      error: error instanceof Error ? error.message : "Unable to send email.",
    };
  }
};
