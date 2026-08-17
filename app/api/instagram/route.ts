import { NextResponse } from "next/server";

const INSTAGRAM_OEMBED_ACCESS_TOKEN = process.env.INSTAGRAM_OEMBED_ACCESS_TOKEN;
const OEMBED_URL = "https://graph.facebook.com/v16.0/instagram_oembed";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");

  if (!url) {
    return NextResponse.json({ error: "Missing url parameter" }, { status: 400 });
  }

  if (!INSTAGRAM_OEMBED_ACCESS_TOKEN) {
    return NextResponse.json({ error: "Missing Instagram API token" }, { status: 500 });
  }

  const fetchUrl = `${OEMBED_URL}?url=${encodeURIComponent(url)}&access_token=${encodeURIComponent(INSTAGRAM_OEMBED_ACCESS_TOKEN)}&omitscript=true`;
  const res = await fetch(fetchUrl);
  const data = await res.json();

  return NextResponse.json(data, {
    status: res.ok ? 200 : 502,
  });
}
