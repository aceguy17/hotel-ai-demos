import Link from "next/link";
import DemoBar from "../../components/DemoBar";
import { properties, checkAvailability } from "../../lib/properties";

export const metadata = { title: "Booking — demo" };

export default async function Book({ searchParams }) {
  const sp = await searchParams;
  const p = properties[sp.p];
  const room = p?.rooms.find((r) => r.id === sp.room);
  const result = p && room ? checkAvailability(p.id, sp.in, sp.out, Number(sp.g) || 2) : null;
  const option = result?.available?.find((o) => o.roomId === room?.id);
  const fmt = (d) => new Date(d + "T00:00:00Z").toLocaleDateString("en-AU", { weekday: "short", day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });

  return (
    <>
      <DemoBar />
      <main className="book">
        <div className="book__card">
          {option ? (
            <>
              <p className="eyebrow" style={{ color: "#7a5a1e" }}>Booking engine handoff</p>
              <h1>{room.name}</h1>
              <p style={{ margin: 0, color: "#5d665f" }}>{p.name} · {p.location}</p>
              <dl>
                <dt>Check-in</dt><dd>{fmt(result.checkIn)}</dd>
                <dt>Check-out</dt><dd>{fmt(result.checkOut)}</dd>
                <dt>Guests</dt><dd>{result.guests}</dd>
                <dt>Total</dt><dd>${option.totalAUD.toLocaleString("en-AU")} AUD</dd>
              </dl>
              <p className="book__note">In a live deployment, this step opens the hotel's own secure booking engine with these details pre-filled, so the guest pays directly — no OTA commission. This is a demo, so no booking is made.</p>
            </>
          ) : (
            <>
              <h1>That option is no longer available</h1>
              <p className="book__note">Go back to the chat and ask the concierge to check other dates.</p>
            </>
          )}
          <p style={{ margin: "20px 0 0" }}><Link href="/" style={{ color: "#1e3029", fontWeight: 600 }}>← Back to demos</Link></p>
        </div>
      </main>
    </>
  );
}
