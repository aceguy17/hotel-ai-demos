import "./globals.css";

export const metadata = {
  title: "Nightdesk — AI concierge demos",
  description: "Live demos of a 24/7 AI concierge and booking agent for boutique hotels and villas.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,700&family=IBM+Plex+Sans:wght@400;500;600&family=Noto+Sans+SC:wght@400;500&family=Noto+Sans+Devanagari:wght@400;500&family=Noto+Sans+JP:wght@400;500&display=swap"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
