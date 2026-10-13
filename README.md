# Nightdesk — 24/7 AI Concierge Demos

Three live demos of an AI concierge & booking agent for boutique hotels:

| Page | What it shows |
|---|---|
| `/hotel` | A boutique hotel website with a floating chat widget: FAQs, live availability, Reserve buttons, staff handoff |
| `/villa` | The same agent in a WhatsApp-style phone chat for a villa property |
| `/multilingual` | Guests writing in Chinese, Hindi, Japanese, Indonesian or Spanish get answers in their language |

The properties are fictional and availability comes from a mock engine (`lib/properties.js`) that stands in for a real PMS. No bookings or payments are made.

## How it works

- `app/api/chat/route.js` — chat endpoint with basic rate limiting
- `lib/agent.js` — Claude agent with two tools: `check_availability` and `request_staff_handoff`, plus guardrails in the system prompt
- `lib/properties.js` — property knowledge, rooms, rates and mock availability
- Without an API key the site runs in **demo mode** (scripted answers), so it never breaks.

## Deploy on Vercel

1. Import this GitHub repo at vercel.com/new (framework: Next.js — detected automatically).
2. Add environment variable `ANTHROPIC_API_KEY` (from console.anthropic.com).
3. Optional: `ANTHROPIC_MODEL` to change the model (default `claude-haiku-5-5`).
4. Deploy. Set a monthly spend limit in the Anthropic Console, since the demo is public.

## Run locally

```bash
npm install
cp .env.example .env.local   # add your key
npm run dev
```

## Customise for a real hotel

Edit the `knowledge` and `rooms` for a property in `lib/properties.js`, and replace `checkAvailability` with a call to the hotel's PMS or channel manager API.
