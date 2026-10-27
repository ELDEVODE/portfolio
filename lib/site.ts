import { contact, headline, profile } from "@/data";

/** The live site. Canonical URLs point here from every environment. */
const PRODUCTION_URL = "https://eldevode.dev";

/**
 * The canonical origin, resolved once.
 *
 * The production domain is the default so that local builds and preview
 * deploys still emit correct canonical and image URLs — a preview that
 * advertises its own throwaway hostname as canonical is how duplicate
 * URLs end up in a search index. NEXT_PUBLIC_SITE_URL overrides it when
 * a deployment genuinely needs to speak as itself.
 */
function resolveSiteUrl() {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");
  return PRODUCTION_URL;
}

export const siteUrl = resolveSiteUrl();

export const site = {
  name: "El-Praise Ayo",
  title: `El-Praise Ayo — ${headline}`,
  /** Kept under ~160 characters so search results are not truncated. */
  description:
    "Software engineer building scalable systems in Rust, TypeScript and React — from DSP and blockchain backends to production web applications.",
  locale: "en_NG",
  twitter: "@Eldevode_",
  url: siteUrl,
} as const;

/** Schema.org Person, so search engines read the CV as structured data. */
export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    alternateName: "Eldevode",
    jobTitle: headline,
    description: profile.lede,
    email: `mailto:${contact.email}`,
    telephone: contact.phone,
    url: site.url,
    image: `${site.url}/opengraph-image`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Abuja",
      addressCountry: "NG",
    },
    sameAs: contact.links.map((link) => link.href),
    knowsAbout: [
      "Rust",
      "TypeScript",
      "React",
      "Next.js",
      "Node.js",
      "Python",
      "Django",
      "Docker",
      "PostgreSQL",
      "MongoDB",
      "Digital Signal Processing",
      "Internet Computer Protocol",
    ],
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Federal University of Technology, Minna",
    },
  };
}
