import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

async function loadFont(text: string) {
  const url = `https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&text=${encodeURIComponent(text)}`;
  const css = await (await fetch(url)).text();
  const match = css.match(/src: url\((.+?)\) format/);
  if (!match) throw new Error("Failed to locate Playfair Display font file");
  return fetch(match[1]).then((res) => res.arrayBuffer());
}

export default async function Icon() {
  const fontData = await loadFont("C");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#EE4D64",
          borderRadius: "8px",
          color: "white",
          fontFamily: "Playfair Display",
          fontSize: 26,
          fontWeight: 700,
          lineHeight: 1,
          paddingBottom: 1,
        }}
      >
        C
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Playfair Display", data: fontData, style: "normal", weight: 700 }],
    }
  );
}
