import DemoBar from "../../components/DemoBar";
import MultiChat from "./MultiChat";

export const metadata = { title: "Multilingual concierge demo" };

export default function MultilingualDemo() {
  return (
    <>
      <DemoBar current="/multilingual" />
      <main className="wrap">
        <MultiChat />
      </main>
    </>
  );
}
