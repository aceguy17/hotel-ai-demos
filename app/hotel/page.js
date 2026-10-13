import DemoBar from "../../components/DemoBar";
import FloatingChat from "./FloatingChat";

export const metadata = { title: "The Laneway Hotel — concierge demo" };

const rooms = [
  { name: "Courtyard Queen", text: "Quiet, light-filled room facing the garden courtyard. Sleeps 2. From $189." },
  { name: "Laneway King", text: "Our signature room with street-art views and a king bed. Sleeps 2. From $239." },
  { name: "Loft Suite", text: "Two levels, a lounge and a kitchenette — perfect for families. Sleeps 4. From $349." },
];

export default function HotelDemo() {
  return (
    <>
      <DemoBar current="/hotel" />
      <div className="site">
        <div className="site__nav">
          <span className="site__logo">THE LANEWAY</span>
          <span className="site__links"><span>Rooms</span><span>Dining</span><span>Fitzroy guide</span><span>Contact</span></span>
        </div>
        <div className="site__hero">
          <h1>Stay in the heart of Fitzroy.</h1>
          <p>24 boutique rooms steps from Smith Street's cafes, bars and galleries.</p>
        </div>
        <div className="site__rooms">
          {rooms.map((r) => (
            <div className="room" key={r.name}>
              <h3>{r.name}</h3>
              <p>{r.text}</p>
            </div>
          ))}
        </div>
      </div>
      <FloatingChat />
    </>
  );
}
