import type { Metadata } from "next";
import { getSiteOrigin } from "./site-origin";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const origin = await getSiteOrigin();
  const description =
    "2026年11月8日に福島県会津若松市で開催。会津の食・伝統工芸・農業・デジタルを親子で楽しめる入場無料の体験型イベント「会津じものまつり 2026」公式サイト。";
  const title = "会津じものまつり 2026｜11月8日・会津若松市の体験型イベント";

  return {
    metadataBase: new URL(origin),
    title: {
      default: title,
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
      title,
      description,
      type: "website",
      locale: "ja_JP",
      url: "/",
      siteName: "会津じものまつり",
      images: [{ url: "/og.png", width: 1731, height: 909, alt: "会津じものまつり 2026公式サイト" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og.png"],
    },
  };
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const origin = await getSiteOrigin();
  const organizationId = `${origin}/#organization`;
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${origin}/#website`,
        url: `${origin}/`,
        name: "会津じものまつり",
        alternateName: "AIZU JIMONO MATSURI",
        inLanguage: "ja-JP",
        publisher: { "@id": organizationId },
      },
      {
        "@type": "Organization",
        "@id": organizationId,
        name: "会津じものまつり実行委員会",
        url: `${origin}/`,
        sameAs: ["https://www.instagram.com/aizu_base/"],
      },
      {
        "@type": "Event",
        "@id": `${origin}/#event`,
        name: "会津じものまつり 2026",
        description: "2026年11月8日に福島県会津若松市で開催する、会津の食・伝統工芸・農業・デジタルを親子で楽しめる体験型イベントです。",
        startDate: "2026-11-08T10:00:00+09:00",
        endDate: "2026-11-08T16:00:00+09:00",
        eventStatus: "https://schema.org/EventScheduled",
        eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
        isAccessibleForFree: true,
        inLanguage: "ja-JP",
        location: {
          "@type": "Place",
          name: "スマートシティAiCT・北出丸通り",
          url: "https://aizu-aiyumu.co.jp/about/",
          address: {
            "@type": "PostalAddress",
            postalCode: "965-0872",
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
        organizer: { "@id": organizationId },
        image: [`${origin}/aizu-jimono-poster.png`, `${origin}/og.png`],
        url: `${origin}/`,
      },
    ],
  };

  return (
    <html lang="ja">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
        />
        {children}
      </body>
    </html>
  );
}
