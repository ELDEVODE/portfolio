import { ImageResponse } from "next/og";
import { readFileSync } from "node:fs";
import { join } from "node:path";

import { contact, headline } from "@/data";

/**
 * The card people actually see when the link is pasted into Slack, X,
 * LinkedIn or iMessage. It is the folio's title page rather than a
 * photograph: the name set in Cinzel on aged paper, inside a double rule,
 * with a fleuron and the gold-leaf monogram.
 *
 * The fonts are committed under app/_og-fonts rather than fetched at
 * build time, so a network hiccup on the build machine can never produce
 * a card set in the wrong typeface.
 */

export const runtime = "nodejs";
export const alt = "El-Praise Ayo — Software Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const PAPER = "#f3e6cf";
const INK = "#2a160f";
const INK_SOFT = "#4a3226";
const GOLD = "#8a5a2b";
const LEAF = "#c9a227";
const META = "#7a614c";

/** 2026 → MMXXVI, so the card does not go stale on New Year's Day. */
function romanYear(year: number) {
  const table: [number, string][] = [
    [1000, "M"], [900, "CM"], [500, "D"], [400, "CD"],
    [100, "C"], [90, "XC"], [50, "L"], [40, "XL"],
    [10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"],
  ];
  let left = year;
  let out = "";
  for (const [value, glyph] of table) {
    while (left >= value) {
      out += glyph;
      left -= value;
    }
  }
  return out;
}

function font(file: string) {
  return readFileSync(join(process.cwd(), "app/_og-fonts", file));
}

export default async function Image() {
  const cinzel = font("Cinzel-SemiBold.ttf");
  const cormorant = font("CormorantGaramond-Italic.ttf");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: PAPER,
          // the aged-paper vignette the site itself uses
          backgroundImage: `radial-gradient(ellipse at center, rgba(243,230,207,0) 45%, rgba(90,48,18,0.13) 100%)`,
          padding: 28,
        }}
      >
        {/* outer rule */}
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "100%",
            border: `2px solid ${GOLD}99`,
            padding: 5,
          }}
        >
          {/* inner rule */}
          <div
            style={{
              position: "relative",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              height: "100%",
              border: `1px solid ${GOLD}66`,
            }}
          >
            {/* corner brackets, as on the page */}
            {[
              { top: 14, left: 14, rot: "0deg" },
              { top: 14, right: 14, rot: "90deg" },
              { bottom: 14, right: 14, rot: "180deg" },
              { bottom: 14, left: 14, rot: "270deg" },
            ].map((pos, i) => (
              <div
                key={i}
                style={{
                  position: "absolute",
                  ...pos,
                  display: "flex",
                  width: 34,
                  height: 34,
                  borderTop: `2px solid ${GOLD}77`,
                  borderLeft: `2px solid ${GOLD}77`,
                  transform: `rotate(${pos.rot})`,
                }}
              />
            ))}

            {/* running head */}
            <div
              style={{
                position: "absolute",
                top: 34,
                display: "flex",
                gap: 18,
                fontFamily: "Cinzel",
                fontSize: 17,
                letterSpacing: 7,
                color: META,
              }}
            >
              <span>PORTFOLIO</span>
              <span style={{ color: `${GOLD}` }}>·</span>
              <span>{romanYear(new Date().getFullYear())}</span>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {/* the illuminated monogram */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 92,
                  height: 92,
                  border: `2px solid ${GOLD}88`,
                  marginBottom: 30,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 78,
                    height: 78,
                    border: `1px solid ${GOLD}55`,
                    fontFamily: "Cinzel",
                    fontSize: 40,
                    color: LEAF,
                  }}
                >
                  EA
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  fontFamily: "Cinzel",
                  fontSize: 15,
                  letterSpacing: 13,
                  color: GOLD,
                  marginBottom: 20,
                }}
              >
                ELDEVODE
              </div>

              {/* the name — the whole point of the card */}
              <div
                style={{
                  display: "flex",
                  fontFamily: "Cormorant",
                  fontSize: 116,
                  lineHeight: 1,
                  color: INK,
                  letterSpacing: -1,
                }}
              >
                El-Praise Ayo
              </div>

              {/* double rule under the name */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: 560,
                  marginTop: 28,
                  marginBottom: 22,
                }}
              >
                <div style={{ display: "flex", height: 2, backgroundColor: `${GOLD}aa` }} />
                <div
                  style={{
                    display: "flex",
                    height: 1,
                    marginTop: 4,
                    backgroundColor: `${GOLD}55`,
                  }}
                />
              </div>

              <div
                style={{
                  display: "flex",
                  fontFamily: "Cormorant",
                  fontSize: 38,
                  color: INK_SOFT,
                }}
              >
                {headline}
              </div>

              {/* fleuron: rule — lozenge — rule */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  marginTop: 30,
                }}
              >
                <div style={{ display: "flex", width: 90, height: 1, backgroundColor: `${GOLD}99` }} />
                <div
                  style={{
                    display: "flex",
                    width: 11,
                    height: 11,
                    backgroundColor: GOLD,
                    transform: "rotate(45deg)",
                  }}
                />
                <div style={{ display: "flex", width: 90, height: 1, backgroundColor: `${GOLD}99` }} />
              </div>
            </div>

            {/* foot */}
            <div
              style={{
                position: "absolute",
                bottom: 34,
                display: "flex",
                gap: 16,
                fontFamily: "Cinzel",
                fontSize: 17,
                letterSpacing: 5,
                color: META,
              }}
            >
              <span>RUST</span>
              <span style={{ color: GOLD }}>·</span>
              <span>TYPESCRIPT</span>
              <span style={{ color: GOLD }}>·</span>
              <span>REACT</span>
              <span style={{ color: GOLD }}>·</span>
              <span>{contact.location.toUpperCase()}</span>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Cinzel", data: cinzel, style: "normal", weight: 600 },
        { name: "Cormorant", data: cormorant, style: "italic", weight: 600 },
      ],
    },
  );
}
