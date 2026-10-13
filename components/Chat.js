"use client";
import { useEffect, useRef, useState } from "react";

export default function Chat({
  property,
  title,
  subtitle = "Replies instantly · 24/7",
  initials = "AI",
  greeting,
  suggestions = [],
  variant = "widget",
  onClose,
  externalPrompt,
}) {
  const [messages, setMessages] = useState([{ role: "assistant", content: greeting, actions: [] }]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [mode, setMode] = useState(null);
  const endRef = useRef(null);

  useEffect(() => {
    fetch("/api/chat").then((r) => r.json()).then((d) => setMode(d.mode)).catch(() => {});
  }, []);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, busy]);

  useEffect(() => {
    if (externalPrompt?.text) send(externalPrompt.text);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [externalPrompt]);

  async function send(text) {
    const t = (text ?? input).trim();
    if (!t || busy) return;
    setInput("");
    const next = [...messages, { role: "user", content: t, actions: [] }];
    setMessages(next);
    setBusy(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          property,
          messages: next.slice(1).map(({ role, content }) => ({ role, content })),
        }),
      });
      const data = await res.json();
      if (data.mode) setMode(data.mode);
      setMessages([...next, { role: "assistant", content: data.reply || "Sorry, something went wrong.", actions: data.actions || [] }]);
    } catch {
      setMessages([...next, { role: "assistant", content: "Sorry — I couldn't connect. Please try again.", actions: [] }]);
    } finally {
      setBusy(false);
    }
  }

  const showSuggestions = messages.length <= 1 && suggestions.length > 0;

  return (
    <div className={`chat chat--${variant}`}>
      <div className="chat__head">
        <div className="chat__avatar" aria-hidden="true">{initials}</div>
        <div className="chat__who">
          <strong>{title}</strong>
          <span>{subtitle}</span>
        </div>
        {onClose && (
          <button className="chat__close" onClick={onClose} aria-label="Close chat">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
          </button>
        )}
      </div>

      <div className="chat__body" aria-live="polite">
        {messages.map((m, i) => (
          <div key={i} className={`msg-row msg-row--${m.role}`}>
            <div className={`msg msg--${m.role}`}>{m.content}</div>
            {m.actions?.filter((a) => a.type === "reserve").length > 0 && (
              <div className="cards">
                {m.actions.filter((a) => a.type === "reserve").map((a, j) => (
                  <div className="card" key={j}>
                    <div className="card__row"><strong>{a.label}</strong><span>{a.detail}</span></div>
                    <a className="card__btn" href={a.url} target="_blank" rel="noopener">Reserve this {property === "ridge" ? "villa" : "room"}</a>
                  </div>
                ))}
              </div>
            )}
            {m.actions?.filter((a) => a.type === "handoff").map((a, j) => (
              <div className={`handoff ${a.urgent ? "handoff--urgent" : ""}`} key={j}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="9" cy="8" r="4" /><path d="M2 21a7 7 0 0 1 14 0M17 11l2 2 4-4" /></svg>
                <span>Passed to the team · ref {a.ref}{a.urgent ? " · urgent" : ""}</span>
              </div>
            ))}
          </div>
        ))}
        {busy && (
          <div className="msg-row msg-row--assistant">
            <div className="msg msg--assistant typing" aria-label="Typing"><i /><i /><i /></div>
          </div>
        )}
        {showSuggestions && (
          <div className="chips">
            {suggestions.map((s) => (
              <button key={s} className="chip" onClick={() => send(s)}>{s}</button>
            ))}
          </div>
        )}
        <div ref={endRef} />
      </div>

      <form className="chat__foot" onSubmit={(e) => { e.preventDefault(); send(); }}>
        <label htmlFor={`in-${property}-${variant}`} className="sr-only">Message</label>
        <input
          id={`in-${property}-${variant}`}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask anything about your stay…"
          maxLength={500}
          autoComplete="off"
        />
        <button type="submit" className="send" aria-label="Send" disabled={busy || !input.trim()}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
        </button>
      </form>
      {mode === "demo" && <div className="chat__mode">Demo mode — add ANTHROPIC_API_KEY for live AI</div>}
    </div>
  );
}
