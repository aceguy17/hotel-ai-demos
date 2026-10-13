import DemoBar from "../../components/DemoBar";
import Chat from "../../components/Chat";

export const metadata = { title: "Ridgeline Villas — messaging demo" };

export default function VillaDemo() {
  return (
    <>
      <DemoBar current="/villa" />
      <main className="wrap">
        <div className="split">
          <div className="split__copy">
            <p className="eyebrow">Messaging channel</p>
            <h1>Guests message you like a friend. The concierge answers like your best host.</h1>
            <p>This is the same AI agent, shown in a WhatsApp-style chat for Ridgeline Villas, a fictional Yarra Valley property.</p>
            <ul>
              <li>Knows each villa's features, pet rules and minimum stays</li>
              <li>Checks live villa availability and prices</li>
              <li>Suggests paid experiences — winery tours, balloon flights, private chef</li>
              <li>Hands anything unusual to the on-call host with a reference number</li>
            </ul>
            <p style={{ fontSize: 15 }}>In production this connects to the WhatsApp Business API, so guests chat from the app they already use.</p>
          </div>
          <div className="split__demo">
            <div className="phone">
              <Chat
                property="ridge"
                variant="phone"
                title="Ridgeline Villas"
                subtitle="Usually replies instantly"
                initials="RV"
                greeting="Hello from Ridgeline Villas 🍇 How can I help with your Yarra Valley stay?"
                suggestions={["Villa for 4 next weekend?", "Can we bring our dog?", "Which villas have a hot tub?", "Book a winery tour"]}
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
