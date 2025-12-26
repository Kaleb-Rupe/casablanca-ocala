const baseBlobUrl =
  "https://xfrcwgafqy20sjqa.public.blob.vercel-storage.com/images";

const toBlobUrl = (path: string) => {
  const encoded = path
    .split("/")
    .map((segment) => encodeURIComponent(segment))
    .join("/");
  return `${baseBlobUrl}/${encoded}`;
};

export type GallerySection = {
  id: string;
  name: string;
  description: string;
  cover: string;
  images: string[];
};

const section = (
  id: string,
  name: string,
  description: string,
  paths: string[]
): GallerySection => ({
  id,
  name,
  description,
  cover: toBlobUrl(paths[0]),
  images: paths.map(toBlobUrl),
});

export const gallerySections: GallerySection[] = [
  section("exterior", "Exterior", "Pondside vistas & woodland escapes.", [
    "hero-image.jpg",
    "property-main.jpg",
  ]),
  section("living-room", "Living Room", "Expansive seating & warm textures.", [
    "Living Room/Ocala House -28.webp",
    "Living Room/Ocala House -29.webp",
    "Living Room/Ocala House -30.webp",
    "Living Room/Ocala House -31.webp",
    "Living Room/Ocala House -34.webp",
    "Living Room/Ocala House -35.webp",
    "Living Room/Ocala House -36.webp",
  ]),
  section("kitchen", "Kitchen", "Chef-ready appliances & sunlit prep space.", [
    "Kitchen/Ocala House -32.webp",
    "Kitchen/Ocala House -33.webp",
  ]),
  section("bathrooms", "Bathrooms", "Spa-inspired finishes & polished tile.", [
    "Bathrooms/Ocala House -1.webp",
    "Bathrooms/Ocala House -3.webp",
    "Bathrooms/Ocala House -5.webp",
    "Bathrooms/Ocala House -39.webp",
    "Bathrooms/Ocala House -40.webp",
    "Bathrooms/Ocala House -41.webp",
    "Bathrooms/Ocala House -42.webp",
    "Bathrooms/Ocala House -43.webp",
  ]),
  section("blue-room", "Blue Room", "Calming palette with plush bedding.", [
    "Blue Room/Ocala House -16.webp",
    "Blue Room/Ocala House -17.webp",
    "Blue Room/Ocala House -18.webp",
    "Blue Room/Ocala House -19.webp",
  ]),
  section("purple-room", "Purple Room", "Whimsical hues & layered textiles.", [
    "Purple Room/Ocala House -20.webp",
    "Purple Room/Ocala House -21.webp",
    "Purple Room/Ocala House -22.webp",
    "Purple Room/Ocala House -23.webp",
    "Purple Room/Ocala House -24.webp",
    "Purple Room/Ocala House -25.webp",
  ]),
  section("orange-room", "Orange Room", "Sunny accents & playful lighting.", [
    "Orange Room/Ocala House -13.webp",
    "Orange Room/Ocala House -14.webp",
    "Orange Room/Ocala House -15.webp",
  ]),
  section("green-room", "Green Room", "Nature-inspired suite with views.", [
    "Green Room/Ocala House -9.webp",
    "Green Room/Ocala House -10.webp",
    "Green Room/Ocala House -11.webp",
    "Green Room/Ocala House -12.webp",
    "Green Room/Ocala House .webp",
  ]),
  section("hallway", "Hallway", "Architectural lines & art moments.", [
    "Hallway/Ocala House -6.webp",
    "Hallway/Ocala House -7.webp",
    "Hallway/Ocala House -37.webp",
    "Hallway/Ocala House -38.webp",
  ]),
];
