import { ImageResponse } from "next/og";
import { readFileSync } from "node:fs";
import { join } from "node:path";

/**
 * The tab icon: the gold monogram on paper, replacing the photograph.
 * At 32px only two letters survive, so that is all it draws.
 */

export const runtime = "nodejs";
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  const cinzel = readFileSync(
    join(process.cwd(), "app/_og-fonts", "Cinzel-SemiBold.ttf"),
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f3e6cf",
          border: "1px solid #8a5a2b",
          fontFamily: "Cinzel",
          fontSize: 17,
          color: "#8a5a2b",
        }}
      >
        EA
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Cinzel", data: cinzel, style: "normal", weight: 600 }],
    },
  );
}
