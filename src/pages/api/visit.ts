import type { APIRoute } from "astro";
import { recordVisit, getVisitorCount } from "@/lib/db";

export const prerender = false;

export const GET: APIRoute = ({ request }) => {
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded ? forwarded.split(",")[0].trim() : "unknown";

  const record = new URL(request.url).searchParams.get("record");

  const count = record !== null ? recordVisit(ip) : getVisitorCount();

  return new Response(JSON.stringify({ count }), {
    headers: { "Content-Type": "application/json" },
  });
};
