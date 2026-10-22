import { useEffect, useRef, useState } from "react";
import { useSendAssistantMessage } from "@workspace/api-client-react";
import { ArrowUp, Bot, RotateCcw, Sparkles, X } from "lucide-react";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

type AIChatPanelProps = {
  open: boolean;
  onClose: () => void;
};

const STARTER_PROMPTS = [
  "Mi aiuti a organizzare meglio la mia settimana?",
  "Puoi spiegarmi un argomento in modo semplice?",
  "Aiutami a scrivere meglio questo messaggio.",
];

const keepLastMessages = (messages: ChatMessage[]) => messages.slice(-16);

export default function AIChatPanel({ open, onClose }: AIChatPanelProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [draft, setDraft] = useState("");
  const mutation = useSendAssistantMessage();
  const composerRef = useRef<HTMLTextAreaElement>(null);
  const messageEndRef = useRef<HTMLDivElement>(null);
  const retryMessagesRef = useRef<ChatMessage[] | null>(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    if (!open) return;
    composerRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onCloseRef.current();
        return;
      }
      if (event.key === "Tab") {
        const panel = document.querySelector<HTMLElement>('[data-testid="panel-ai-assistant"]');
        const focusable = panel?.querySelectorAll<HTMLElement>(
          'button:not([disabled]), textarea:not([disabled]), [href], input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
        );
        if (!focusable?.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && (document.activeElement === first || !panel?.contains(document.activeElement))) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && (document.activeElement === last || !panel?.contains(document.activeElement))) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, mutation.isPending]);

  const sendMessages = (requestMessages: ChatMessage[]) => {
    retryMessagesRef.current = requestMessages;
    mutation.mutate(
      { data: { messages: requestMessages } },
      {
        onSuccess: (response) => {
          setMessages((current) =>
            keepLastMessages([...current, { role: "assistant", content: response.reply }]),
          );
          retryMessagesRef.current = null;
        },
      },
    );
  };

  const submitMessage = (content: string) => {
    const trimmed = content.trim();
    if (!trimmed || mutation.isPending) return;

    mutation.reset();
    setDraft("");
    const userMessage: ChatMessage = { role: "user", content: trimmed };
    const nextMessages = keepLastMessages([...messages, userMessage]);
    setMessages(nextMessages);
    sendMessages(nextMessages);
  };

  const retryLastMessage = () => {
    if (!retryMessagesRef.current || mutation.isPending) return;
    mutation.reset();
    sendMessages(retryMessagesRef.current);
  };

  const clearConversation = () => {
    setMessages([]);
    setDraft("");
    retryMessagesRef.current = null;
    mutation.reset();
    composerRef.current?.focus();
  };

  const isEmpty = messages.length === 0;

  return (
    <section
      aria-hidden={!open}
      role="dialog"
      aria-modal={open}
      aria-labelledby="vexora-assistant-title"
      aria-describedby="vexora-assistant-intro"
      className={`${open ? "flex" : "hidden"} fixed inset-x-0 bottom-0 z-[60] h-[min(720px,100dvh)] flex-col overflow-hidden border border-border bg-background text-foreground shadow-[0_24px_90px_hsl(var(--foreground)/.2)] sm:inset-x-auto sm:bottom-6 sm:right-6 sm:h-[min(690px,calc(100dvh-3rem))] sm:w-[min(430px,calc(100vw-2rem))] sm:rounded-[1.4rem]`}
      data-testid="panel-ai-assistant"
    >
      <header className="relative shrink-0 border-b border-border/80 bg-foreground px-5 pb-5 pt-[max(1.1rem,env(safe-area-inset-top))] text-background sm:pt-5">
        <div className="absolute right-0 top-0 h-full w-28 overflow-hidden opacity-30" aria-hidden="true">
          <div className="absolute -right-5 -top-10 h-36 w-36 rounded-full border border-primary/80" />
          <div className="absolute right-5 top-3 h-20 w-20 rounded-full border border-primary/70" />
        </div>
        <div className="relative flex items-start justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-background/20 bg-background/10 text-primary">
              <Bot className="h-[18px] w-[18px]" aria-hidden="true" />
            </span>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-primary">Vexora · assistente AI</p>
              <h2 id="vexora-assistant-title" className="mt-1 font-serif text-[1.35rem] font-normal leading-tight tracking-tight">
                Chiedimi quello che vuoi.
              </h2>
              <p id="vexora-assistant-intro" className="mt-1 text-xs text-background/65">
                Dalle idee pratiche alle domande quotidiane.
              </p>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-1">
            {!isEmpty && (
              <button
                type="button"
                onClick={clearConversation}
                aria-label="Cancella la conversazione"
                title="Cancella la conversazione"
              disabled={mutation.isPending}
              className="flex h-10 w-10 items-center justify-center rounded-full text-background/70 transition-colors hover:bg-background/10 hover:text-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-45"
                data-testid="button-clear-conversation"
              >
                <RotateCcw className="h-4 w-4" aria-hidden="true" />
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              aria-label="Chiudi assistente"
              className="flex h-10 w-10 items-center justify-center rounded-full text-background/70 transition-colors hover:bg-background/10 hover:text-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              data-testid="button-close-assistant"
            >
              <X className="h-[18px] w-[18px]" aria-hidden="true" />
            </button>
          </div>
        </div>
        <div className="relative mt-4 flex items-center gap-2 text-[10px] uppercase tracking-[0.16em] text-background/55">
          <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden="true" />
          <span>Disponibile per orientarti</span>
        </div>
      </header>

      <div className="min-h-0 flex-1 overflow-y-auto bg-background px-4 py-5 sm:px-5" data-testid="list-assistant-messages">
        {isEmpty ? (
          <div className="flex min-h-full flex-col justify-center">
            <div className="mb-5 flex items-center gap-2 text-primary">
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em]">Da dove cominciamo</p>
            </div>
            <h3 className="max-w-[18rem] font-serif text-[1.75rem] font-normal leading-[1.12] tracking-tight">
              Ogni buon progetto parte da una domanda.
            </h3>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Chiedimi di spiegare un argomento, scrivere un testo o ragionare su una nuova idea.
            </p>
            <div className="mt-7 space-y-2.5">
              {STARTER_PROMPTS.map((prompt, index) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => submitMessage(prompt)}
                  disabled={mutation.isPending}
                  className="group flex min-h-12 w-full items-center justify-between gap-3 rounded-xl border border-border/80 bg-card px-4 py-3 text-left text-[13px] leading-snug text-foreground/80 transition-colors hover:border-primary/50 hover:bg-primary/[0.035] hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-60"
                  data-testid={`button-starter-prompt-${index + 1}`}
                >
                  <span>{prompt}</span>
                  <span className="shrink-0 font-mono text-[10px] text-muted-foreground transition-colors group-hover:text-primary">
                    0{index + 1}
                  </span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-5">
            {messages.map((message, index) => (
              <article
                key={`${index}-${message.role}`}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                aria-live={message.role === "assistant" ? "polite" : undefined}
                data-testid={`message-${message.role}-${index}`}
              >
                <div
                  className={`max-w-[88%] whitespace-pre-wrap break-words rounded-2xl px-4 py-3 text-[13px] leading-relaxed ${
                    message.role === "user"
                      ? "rounded-br-md bg-foreground text-background"
                      : "rounded-bl-md border border-border/80 bg-card text-foreground"
                  }`}
                >
                  {message.content}
                </div>
              </article>
            ))}
            {mutation.isPending && (
              <div className="flex justify-start" role="status" aria-label="L'assistente sta preparando una risposta" data-testid="status-assistant-loading">
                <div className="flex items-center gap-2.5 rounded-2xl rounded-bl-md border border-border/80 bg-card px-4 py-3.5">
                  <span className="flex gap-1" aria-hidden="true">
                    <i className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
                    <i className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary [animation-delay:120ms]" />
                    <i className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary [animation-delay:240ms]" />
                  </span>
                  <span className="text-xs text-muted-foreground">Sto preparando una risposta</span>
                </div>
              </div>
            )}
            {mutation.isError && (
              <div className="rounded-xl border border-primary/30 bg-primary/[0.045] p-4" data-testid="status-assistant-error">
                <p className="text-sm font-medium">Non sono riuscito a inviare il messaggio.</p>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  Controlla la connessione e riprova tra poco. Il tuo messaggio è ancora qui.
                </p>
                <button
                  type="button"
                  onClick={retryLastMessage}
                  disabled={mutation.isPending}
                  className="mt-3 inline-flex min-h-10 items-center gap-2 rounded-full border border-border px-3.5 text-xs font-medium transition-colors hover:border-primary/50 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-60"
                  data-testid="button-retry-message"
                >
                  <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                  Riprova
                </button>
              </div>
            )}
            <div ref={messageEndRef} />
          </div>
        )}
        <div className="sr-only" aria-live="polite" aria-atomic="true" data-testid="status-assistant-announcement">
          {mutation.isPending ? "L'assistente sta preparando una risposta." : ""}
          {mutation.isError ? "Invio non riuscito. Puoi riprovare." : ""}
        </div>
      </div>

      <footer className="shrink-0 border-t border-border/80 bg-background px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3.5 sm:px-5 sm:pb-4">
        <form
          onSubmit={(event) => {
            event.preventDefault();
            submitMessage(draft);
          }}
          className="rounded-[1.15rem] border border-border bg-card p-2 transition-colors focus-within:border-primary/60"
          data-testid="form-assistant-message"
        >
          <label htmlFor="vexora-assistant-composer" className="sr-only">
            Scrivi un messaggio
          </label>
          <textarea
            id="vexora-assistant-composer"
            ref={composerRef}
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                submitMessage(draft);
              }
            }}
            placeholder="Scrivi la tua domanda…"
            rows={2}
            maxLength={3000}
            disabled={mutation.isPending}
            className="block max-h-28 min-h-12 w-full resize-none bg-transparent px-2.5 py-2 text-base leading-relaxed text-foreground placeholder:text-muted-foreground/75 focus:outline-none disabled:opacity-60 sm:text-sm"
            data-testid="input-assistant-message"
          />
          <div className="flex items-center justify-between gap-3 px-1 pb-0.5">
            <p className="text-[10px] leading-snug text-muted-foreground" data-testid="text-ai-disclaimer">
              AI: le risposte possono essere imprecise. I messaggi vengono elaborati per rispondere; evita dati sensibili.
            </p>
            <button
              type="submit"
              disabled={!draft.trim() || mutation.isPending}
              aria-label="Invia messaggio"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition-[background-color,transform] hover:translate-y-[-1px] hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-card disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0"
              data-testid="button-send-message"
            >
              <ArrowUp className="h-[18px] w-[18px]" aria-hidden="true" />
            </button>
          </div>
        </form>
        <p className="mt-2.5 text-center font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground/70">
          Invio per inviare · Maiusc + Invio per andare a capo
        </p>
      </footer>
    </section>
  );
}
