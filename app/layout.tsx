import type { Metadata } from "next";
import { getSiteOrigin } from "./site-origin";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const origin = await getSiteOrigin();
  const description =
    "2026年11月8日に会津若松市で開催。会津の食・ものづくり・人に出会う「会津じものまつり 2026」の公式サイトです。";

  return {
    metadataBase: new URL(origin),
    title: {
      default: "会津じものまつり 2026",
      template: "%s｜会津じものまつり",
    },
    description,
    alternates: { canonical: "/" },
    icons: {
      icon: [{ url: "/favicon.jpg", type: "image/jpeg" }],
      shortcut: "/favicon.jpg",
      apple: "/favicon.jpg",
    },
    openGraph: {
      title: "会津じものまつり 2026",
      description,
      type: "website",
      locale: "ja_JP",
      url: "/",
      siteName: "会津じものまつり",
      images: [{ url: "/aizu-jimono-poster.png", width: 2482, height: 3510, alt: "2026 会津じものまつりのチラシ" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "会津じものまつり 2026",
      description,
      images: ["/aizu-jimono-poster.png"],
    },
  };
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const origin = await getSiteOrigin();
  const eventStructuredData = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: "会津じものまつり 2026",
    description: "会津の食・ものづくり・人に出会う体験型イベントです。",
    startDate: "2026-11-08T10:00:00+09:00",
    endDate: "2026-11-08T16:00:00+09:00",
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: "スマートシティAiCT・北出丸通り",
      address: {
        "@type": "PostalAddress",
        streetAddress: "東栄町1-77",
        addressLocality: "会津若松市",
        addressRegion: "福島県",
        addressCountry: "JP",
      },
    },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "JPY",
      availability: "https://schema.org/InStock",
      url: `${origin}/`,
    },
    organizer: { "@type": "Organization", name: "会津じものまつり実行委員会" },
    image: [`${origin}/aizu-jimono-poster.png`],
    url: `${origin}/`,
  };

  return (
    <html lang="ja">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(eventStructuredData).replace(/</g, "\\u003c") }}
        />
        {children}
      </body>
    </html>
  );
}
