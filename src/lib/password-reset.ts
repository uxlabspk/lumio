import { createHash, randomBytes } from "crypto";
import nodemailer from "nodemailer";

const PASSWORD_RESET_TTL_MS = 1000 * 60 * 60;

export function generatePasswordResetToken() {
  return randomBytes(32).toString("hex");
}

export function hashPasswordResetToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

export function getPasswordResetExpiryDate() {
  return new Date(Date.now() + PASSWORD_RESET_TTL_MS);
}

export function buildPasswordResetUrl(token: string) {
  const baseUrl =
    process.env.NEXTAUTH_URL ||
    process.env.NEXT_PUBLIC_APP_URL ||
    "http://localhost:3000";

  return `${baseUrl.replace(/\/$/, "")}/reset-password?token=${token}`;
}

function getMailTransport() {
  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !port || !user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    host,
    port: Number(port),
    secure: Number(port) === 465,
    auth: {
      user,
      pass,
    },
  });
}

export async function sendPasswordResetEmail({
  to,
  name,
  resetUrl,
}: {
  to: string;
  name: string;
  resetUrl: string;
}) {
  const transport = getMailTransport();

  if (!transport) {
    console.info(`Password reset link for ${to}: ${resetUrl}`);
    return { delivered: false, fallback: true };
  }

  const from = process.env.EMAIL_FROM || process.env.SMTP_USER;

  await transport.sendMail({
    from,
    to,
    subject: "Reset your Lumio password",
    text: `Hi ${name},\n\nWe received a request to reset your Lumio password. Use the link below to choose a new password:\n\n${resetUrl}\n\nThis link expires in 1 hour. If you did not request this reset, you can safely ignore this email.`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #18181b;">
        <p>Hi ${name},</p>
        <p>We received a request to reset your Lumio password.</p>
        <p>
          <a href="${resetUrl}" style="display: inline-block; padding: 12px 18px; border-radius: 8px; background: #18181b; color: #ffffff; text-decoration: none;">Reset password</a>
        </p>
        <p>If the button does not work, copy and paste this link into your browser:</p>
        <p><a href="${resetUrl}">${resetUrl}</a></p>
        <p>This link expires in 1 hour. If you did not request this reset, you can safely ignore this email.</p>
      </div>
    `,
  });

  return { delivered: true, fallback: false };
}