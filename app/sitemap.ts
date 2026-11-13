import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { teachings } from "@/lib/teachings";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "about/", "beliefs/", "expressions/", "immersion/", "articles/", "teachings/", "give/", "contact/"];
  return [
    ...pages.map((p) => ({ url: `${site.url}/${p}`, changeFrequency: "monthly" as const, priority: p === "" ? 1 : 0.7 })),
    ...teachings.filter((t) => !t.sample).map((t) => ({ url: `${site.url}/teachings/${t.slug}/`, priority: 0.5 })),
  ];
}
