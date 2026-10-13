import { runAgent } from "../../../lib/agent";

export const runtime = "nodejs";
export const maxDuration = 30;

// Basic abuse protection for a public demo (best-effort on serverless).
const hits = new Map();
function limited(ip) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < 60 * 60 * 1000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 60; // 60 messages per hour per IP
}

export async function POST(req) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
    if (limited(ip)) {
      return Response.json({ reply: "You've reached the demo limit for now — please try again later.", actions: [] }, { status: 429 });
    }
    const body = await req.json();
    const property = String(body.property || "");
    const raw = Array.isArray(body.messages) ? body.messages : [];
    if (raw.length > 30) {
      return Response.json({ reply: "This demo conversation is getting long — refresh the page to start a new one.", actions: [] });
    }
    const history = raw
      .filter((m) => (m.role === "user" || m.role === "assistant") && typeof m.content === "string" && m.content.trim())
      .map((m) => ({ role: m.role, content: m.content.slice(0, 800) }))
      .slice(-16);
    while (history.length && history[0].role !== "user") history.shift();
    if (!history.length || history[history.length - 1].role !== "user") {
      return Response.json({ error: "Missing message" }, { status: 400 });
    }
    const result = await runAgent(property, history);
    return Response.json(result);
  } catch (err) {
    console.error("chat error", err?.message || err);
    return Response.json(
      { reply: "Sorry — I'm having trouble right now. Please try again in a moment.", actions: [] },
      { status: 500 }
    );
  }
}

export async function GET() {
  return Response.json({ mode: process.env.ANTHROPIC_API_KEY ? "live" : "demo" });
}
