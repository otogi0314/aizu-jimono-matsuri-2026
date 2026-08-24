import { headers } from "next/headers";

export async function getSiteOrigin() {
  const configuredOrigin = process.env.SITE_URL?.trim().replace(/\/$/, "");
  if (configuredOrigin) return configuredOrigin;

  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  return `${protocol}://${host}`;
}
