import { Router, type IRouter } from "express";
import {
  SendAssistantMessageBody,
  SendAssistantMessageResponse,
} from "@workspace/api-zod";
import { openai } from "@workspace/integrations-openai-ai-server";

const router: IRouter = Router();

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 12;
const MAX_CONTEXT_CHARACTERS = 12_000;
const rateLimits = new Map<string, { count: number; resetAt: number }>();

const systemPrompt = `You are the general-purpose AI assistant on the Vexora website. Help with a broad range of topics: explanations, writing, translation, brainstorming, learning, and practical questions. Reply in the language used by the visitor; use Italian when the language is unclear. Be helpful, clear, and honest about uncertainty. You do not have live internet access, cannot see private data, and must not imply that you are a Vexora employee or can take actions on the visitor's behalf. For medical, legal, or financial topics, provide general information and encourage consulting a qualified professional. Never ask for passwords, API keys, payment details, or other secrets.`;

function isWithinRateLimit(key: string): boolean {
  const now = Date.now();

  if (rateLimits.size > 4096) {
    for (const [storedKey, value] of rateLimits) {
      if (value.resetAt <= now) rateLimits.delete(storedKey);
    }
  }

  const current = rateLimits.get(key);
  if (!current || current.resetAt <= now) {
    rateLimits.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }

  if (current.count >= RATE_LIMIT_MAX_REQUESTS) return false;
  current.count += 1;
  return true;
}

router.post("/assistant/messages", async (req, res): Promise<void> => {
  const clientAddress = req.ip || req.socket.remoteAddress || "unknown";
  if (!isWithinRateLimit(clientAddress)) {
    const resetAt = rateLimits.get(clientAddress)?.resetAt ?? Date.now() + RATE_LIMIT_WINDOW_MS;
    res.setHeader(
      "Retry-After",
      String(Math.max(1, Math.ceil((resetAt - Date.now()) / 1000))),
    );
    res.status(429).json({
      error: "Hai raggiunto il limite temporaneo. Riprova tra un minuto.",
    });
    return;
  }

  const parsed = SendAssistantMessageBody.safeParse(req.body);
  if (!parsed.success) {
    req.log.warn("Invalid AI assistant request");
    res.status(400).json({ error: "Il messaggio non è valido." });
    return;
  }

  const messages = parsed.data.messages;
  const lastMessage = messages[messages.length - 1];
  const hasRepeatedRoles = messages.some(
    (message, index) => index > 0 && messages[index - 1]?.role === message.role,
  );

  if (
    messages[0]?.role !== "user" ||
    lastMessage?.role !== "user" ||
    messages.some((message) => !message.content.trim()) ||
    hasRepeatedRoles
  ) {
    res.status(400).json({
      error: "La conversazione è troppo lunga o ha un formato non valido.",
    });
    return;
  }

  try {
    const contextMessages = [...messages].reverse();
    let contextCharacters = 0;
    const recentMessages = [];
    for (const message of contextMessages) {
      if (
        recentMessages.length > 0 &&
        contextCharacters + message.content.length > MAX_CONTEXT_CHARACTERS
      ) {
        break;
      }
      recentMessages.push(message);
      contextCharacters += message.content.length;
    }
    recentMessages.reverse();

    const completion = await openai.chat.completions.create(
      {
        model: "gpt-5.6-luna",
        max_completion_tokens: 8192,
        messages: [
          { role: "system", content: systemPrompt },
          ...recentMessages,
        ],
      },
      { timeout: 45_000 },
    );

    const reply = completion.choices[0]?.message?.content?.trim();
    if (!reply) {
      req.log.error("AI assistant returned an empty response");
      res.status(502).json({
        error: "Non ho ricevuto una risposta. Riprova tra poco.",
      });
      return;
    }

    res.json(SendAssistantMessageResponse.parse({ reply }));
  } catch (error) {
    req.log.error(
      { errorName: error instanceof Error ? error.name : "UnknownError" },
      "AI assistant request failed",
    );
    res.status(502).json({
      error: "L'assistente non è disponibile in questo momento. Riprova tra poco.",
    });
  }
});

export default router;
