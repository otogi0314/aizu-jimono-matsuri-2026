import type { MetadataRoute } from "next";
import { getSiteOrigin } from "./site-origin";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const origin = await getSiteOrigin();
  return [{
    url: `${origin}/`,
    lastModified: new Date("2026-08-26T00:00:00+09:00"),
    changeFrequency: "weekly",
    priority: 1,
  }];
}
