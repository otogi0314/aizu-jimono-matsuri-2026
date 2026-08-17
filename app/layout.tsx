import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const origin = `${protocol}://${host}`;
  const description =
    "会津若松市で開催される、会津の食・ものづくり・人に出会う地域のお祭り「会津じものまつり」の公式サイトです。";

  return {
    title: {
      default: "会津じものまつり",
      template: "%s｜会津じものまつり",
    },
    description,
    icons: {
      icon: "/favicon.svg",
      shortcut: "/favicon.svg",
    },
    openGraph: {
      title: "会津じものまつり｜会津の今とこれからを、ともにつくる",
      description,
      type: "website",
      locale: "ja_JP",
      images: [{ url: `${origin}/og.png`, width: 1792, height: 909, alt: "会津じものまつり" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "会津じものまつり｜会津の今とこれからを、ともにつくる",
      description,
      images: [`${origin}/og.png`],
    },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
