"use client";
import { useState } from "react";
import Chat from "../../components/Chat";

export default function FloatingChat() {
  const [open, setOpen] = useState(true);
  if (!open) {
    return (
      <button className="launcher" onClick={() => setOpen(true)}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z" /></svg>
        Chat with us 24/7
      </button>
    );
  }
  return (
    <div className="floating">
      <Chat
        property="laneway"
        title="The Laneway Concierge"
        initials="TL"
        greeting="Hi! I'm the Laneway's 24/7 concierge. Ask me anything about your stay, or tell me your dates and I'll check availability."
        suggestions={["What time is check-out?", "Where can I park?", "Any rooms Nov 1–3 for 2 guests?", "Best bars nearby?"]}
        onClose={() => setOpen(false)}
      />
    </div>
  );
}
