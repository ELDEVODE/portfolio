import Portfolio from "@/components/site/Portfolio";
import { personJsonLd } from "@/lib/site";

export default function Home() {
  return (
    <>
      {/* Schema.org Person, emitted as real markup so crawlers that do not
          run JavaScript still read the CV as structured data. Built from
          data/index.ts, not user input — nothing to escape. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd()) }}
      />
      <Portfolio />
    </>
  );
}
