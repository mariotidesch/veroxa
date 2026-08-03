import { Router, type IRouter } from "express";
import { ReplitConnectors } from "@replit/connectors-sdk";
import { z } from "zod";

const router: IRouter = Router();
const connectors = new ReplitConnectors();
const recipient = "info.veroxa@gmail.com";

const ContactRequest = z.object({
  name: z.string().trim().min(1).max(120),
  company: z.string().trim().max(160).optional().default(""),
  email: z.string().trim().email().max(254),
  message: z.string().trim().min(1).max(5000),
});

function encodeBase64Url(value: string) {
  return Buffer.from(value, "utf8")
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

router.post("/contact", async (req, res) => {
  const parsed = ContactRequest.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({
      message: "Controlla i dati inseriti e riprova.",
      issues: parsed.error.flatten().fieldErrors,
    });
    return;
  }

  const { name, company, email, message } = parsed.data;
  const subject = `Richiesta di contatto Veroxa — ${name}`;
  const text = [
    `Nome: ${name}`,
    company ? `Attività: ${company}` : null,
    `Email: ${email}`,
    "",
    "Messaggio:",
    message,
  ]
    .filter((line): line is string => line !== null)
    .join("\n");

  const rawMessage = [
    `To: ${recipient}`,
    `From: ${recipient}`,
    `Reply-To: ${email}`,
    `Subject: ${subject}`,
    "MIME-Version: 1.0",
    "Content-Type: text/plain; charset=UTF-8",
    "Content-Transfer-Encoding: 8bit",
    "",
    text,
  ].join("\r\n");

  try {
    const response = await connectors.proxy(
      "google-mail",
      "/gmail/v1/users/me/messages/send",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ raw: encodeBase64Url(rawMessage) }),
      },
    );

    if (!response.ok) {
      req.log.error({ status: response.status }, "Gmail contact email failed");
      res.status(502).json({ message: "Non è stato possibile inviare la richiesta." });
      return;
    }

    res.status(200).json({ message: "Richiesta inviata correttamente." });
  } catch (error) {
    req.log.error({ err: error }, "Gmail contact email error");
    res.status(502).json({ message: "Non è stato possibile inviare la richiesta." });
  }
});

export default router;