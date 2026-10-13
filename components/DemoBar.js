import Link from "next/link";

const links = [
  { href: "/hotel", label: "Boutique hotel" },
  { href: "/villa", label: "Villa on messaging" },
  { href: "/multilingual", label: "Multilingual" },
];

export default function DemoBar({ current }) {
  return (
    <header className="demobar">
      <Link href="/" className="demobar__brand">
        <svg width="22" height="22" viewBox="0 0 28 28" fill="none" aria-hidden="true"><circle cx="14" cy="14" r="12" stroke="#C9A45C" strokeWidth="2" /><path d="M17 8a7 7 0 1 0 3 11 6 6 0 0 1-3-11z" fill="#C9A45C" /></svg>
        Nightdesk demos
      </Link>
      <nav aria-label="Demos">
        {links.map((l) => (
          <Link key={l.href} href={l.href} aria-current={current === l.href ? "page" : undefined}>{l.label}</Link>
        ))}
      </nav>
    </header>
  );
}
