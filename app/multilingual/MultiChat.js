"use client";
import { useState } from "react";
import Chat from "../../components/Chat";

const samples = [
  { lang: "中文", label: "Chinese", text: "你好！退房时间是几点？可以寄存行李吗？" },
  { lang: "हिन्दी", label: "Hindi", text: "नमस्ते, क्या होटल में पार्किंग है?" },
  { lang: "日本語", label: "Japanese", text: "11月1日から3日まで、2人で泊まれる部屋はありますか？" },
  { lang: "Bahasa", label: "Indonesian", text: "Apakah ada sarapan? Jam berapa?" },
  { lang: "Español", label: "Spanish", text: "¿Cuál es la política de cancelación?" },
];

export default function MultiChat() {
  const [prompt, setPrompt] = useState(null);
  return (
    <div className="split">
      <div className="split__copy">
        <p className="eyebrow">Multilingual guests</p>
        <h1>One knowledge base. Every guest's language.</h1>
        <p>The hotel writes its information once, in English. The concierge answers international guests in whatever language they write in — including availability and bookings.</p>
        <p style={{ fontSize: 15 }}>Tap a sample question, or type in any language:</p>
        <div className="langs">
          {samples.map((s) => (
            <button key={s.label} className="lang" onClick={() => setPrompt({ text: s.text, at: Date.now() })}>
              {s.lang}
              <small>{s.label}</small>
            </button>
          ))}
        </div>
      </div>
      <div className="split__demo">
        <div className="inline-chat">
          <Chat
            property="laneway"
            variant="inline"
            title="The Laneway Concierge"
            subtitle="Speaks your language · 24/7"
            initials="TL"
            greeting="Hi! Ask me anything about your stay — in any language. 你好 · नमस्ते · こんにちは · Hola"
            externalPrompt={prompt}
          />
        </div>
      </div>
    </div>
  );
}
