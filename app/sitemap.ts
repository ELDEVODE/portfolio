import type { MetadataRoute } from "next";

import { siteUrl } from "@/lib/site";

/** One page, but search engines still want to be told about it. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
