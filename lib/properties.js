// Fictional demo properties. Replace with a real hotel's details for a pilot.

export const properties = {
  laneway: {
    id: "laneway",
    name: "The Laneway Hotel",
    location: "Fitzroy, Melbourne",
    unitWord: "room",
    rooms: [
      { id: "courtyard-queen", name: "Courtyard Queen", sleeps: 2, rate: 189 },
      { id: "laneway-king", name: "Laneway King", sleeps: 2, rate: 239 },
      { id: "loft-suite", name: "Loft Suite", sleeps: 4, rate: 349 },
    ],
    knowledge: `
- Address: 12 Example Lane, Fitzroy VIC (fictional demo hotel). 24 boutique rooms.
- Check-in from 2pm, check-out by 10am. Late check-out until 12pm is $30, subject to availability (ask the team).
- Early bag drop available from 8am at no cost.
- Breakfast: 7–10:30am in the ground-floor cafe, $24 per adult, kids under 12 $12.
- Parking: no on-site parking. Secure public car park 200m away on Example St, about $25 per 24 hours.
- Public transport: tram stop 2 minutes' walk; 15 minutes to the CBD.
- Wi-Fi: free, high speed. Network name and password are on the card in every room and given at check-in.
- Gym: none on site; guests get free day passes to a partner gym 5 minutes' walk away.
- Pets: not allowed, except assistance animals.
- Smoking: non-smoking property; $250 cleaning fee if breached.
- Cancellation: free cancellation up to 48 hours before arrival; after that, the first night is charged.
- Front desk staffed 7am–11pm. Overnight, this concierge answers and urgent issues go to the duty manager.
- Local picks: Smith Street cafes and bars (3 min walk), Rose Street Artists' Market (weekends), Fitzroy Gardens (15 min walk), the Royal Exhibition Building (10 min walk).
- Airport: about 30–40 minutes by taxi or rideshare; SkyBus to Southern Cross then a tram.`,
  },
  ridge: {
    id: "ridge",
    name: "Ridgeline Villas",
    location: "Yarra Valley, Victoria",
    unitWord: "villa",
    rooms: [
      { id: "garden-villa", name: "Garden Villa", sleeps: 4, rate: 420 },
      { id: "vineyard-villa", name: "Vineyard View Villa", sleeps: 2, rate: 380 },
      { id: "ridge-retreat", name: "Ridge Retreat (3-bedroom)", sleeps: 6, rate: 690 },
    ],
    knowledge: `
- Six private villas on a hillside in the Yarra Valley, about 1 hour from Melbourne (fictional demo property).
- Check-in from 3pm (self check-in with a door code sent on arrival day), check-out by 10am.
- Minimum stay: 2 nights on Fridays and Saturdays.
- Every villa has a full kitchen, fireplace, private deck and BBQ. The Garden Villa and Ridge Retreat have outdoor hot tubs.
- Breakfast hamper: $45 per villa, order by 5pm the day before.
- Free on-site parking next to each villa. EV charger at reception (Type 2), free for guests.
- Wi-Fi: free Starlink Wi-Fi; details in the villa welcome book.
- Pets: dogs allowed in the Garden Villa only, $50 per stay, maximum 2 dogs.
- Cancellation: free up to 7 days before arrival; within 7 days, 50% of the stay is charged.
- Host on site 9am–6pm. Overnight, this concierge answers and urgent issues go to the on-call host.
- Experiences we can arrange: winery tour with driver ($180 pp), hot-air balloon flight at sunrise ($395 pp), private chef dinner ($150 pp, 48 hours' notice).
- Nearby: wineries within 10 minutes, Healesville Sanctuary 15 minutes, nearest supermarket 12 minutes in Healesville.`,
  },
};

// --- Mock availability engine (stands in for a real PMS / channel manager) ---

function hash(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function parseISO(s) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(s || "")) return null;
  const d = new Date(s + "T00:00:00Z");
  return isNaN(d) ? null : d;
}

export function todayMelbourne() {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Australia/Melbourne" }).format(new Date());
}

export function checkAvailability(propertyId, checkIn, checkOut, guests = 2) {
  const p = properties[propertyId];
  const ci = parseISO(checkIn);
  const co = parseISO(checkOut);
  if (!p) return { error: "Unknown property." };
  if (!ci || !co) return { error: "Dates must be in YYYY-MM-DD format." };
  const today = parseISO(todayMelbourne());
  if (ci < today) return { error: "Check-in date is in the past." };
  const nights = Math.round((co - ci) / 86400000);
  if (nights < 1) return { error: "Check-out must be after check-in." };
  if (nights > 21) return { error: "Stays longer than 21 nights need the team — offer a staff handoff." };

  const weekendNights = [];
  for (let i = 0; i < nights; i++) {
    const d = new Date(ci.getTime() + i * 86400000);
    const dow = d.getUTCDay();
    if (dow === 5 || dow === 6) weekendNights.push(i);
  }
  if (propertyId === "ridge" && weekendNights.length > 0 && nights < 2) {
    return { error: "Minimum stay is 2 nights when the stay includes a Friday or Saturday." };
  }

  const options = [];
  for (const room of p.rooms) {
    if (guests > room.sleeps) continue;
    let free = true;
    for (let i = 0; i < nights; i++) {
      const d = new Date(ci.getTime() + i * 86400000).toISOString().slice(0, 10);
      if (hash(room.id + d) % 4 === 0) { free = false; break; }
    }
    if (!free) continue;
    const total = Math.round(room.rate * nights + room.rate * 0.2 * weekendNights.length);
    options.push({ roomId: room.id, name: room.name, sleeps: room.sleeps, nights, totalAUD: total });
  }
  return { property: p.name, checkIn, checkOut, nights, guests, available: options };
}
