export interface Property {
  id: string;
  title: string;
  tagline: string;
  description: string;
  imageUrl: string;
  detailImageUrl: string;
  tourVideoUrl: string;
  tourVideoPosterUrl: string;
  furnishedFinderUrl: string;
  vrboUrl: string;
  amenities: string[];
  location: {
    neighborhood: string;
    city: string;
    state: string;
  };
  features: {
    bedrooms: number;
    bathrooms: number;
    maxGuests: number;
    squareFeet: number;
  };
}

const BLOB_BASE = "https://xfrcwgafqy20sjqa.public.blob.vercel-storage.com";

const PROPERTY_IMAGE_URL = `${BLOB_BASE}/images/${encodeURIComponent("Dining Area")}/${encodeURIComponent("Ocala House -34.webp")}`;
const PROPERTY_DETAIL_IMAGE_URL = `${BLOB_BASE}/images/property-main.png`;
const TOUR_VIDEO_URL = `${BLOB_BASE}/videos/casa-blanca-tour.mp4`;
const TOUR_VIDEO_POSTER_URL = `${BLOB_BASE}/videos/casa-blanca-tour-poster.jpg`;

export const mockProperty: Property = {
  id: "casablanca-ocala-main",
  title: "Casablanca Ocala",
  tagline: "Modern Ocala Retreat • Sleeps 8 • Near Springs & Downtown",
  description:
    "A bright, modern 4-bedroom retreat in Ocala's Fort King District. Minutes from the springs, downtown, and the World Equestrian Center — designed for comfortable family stays, weekend getaways, and longer monthly rentals.",
  imageUrl: PROPERTY_IMAGE_URL,
  detailImageUrl: PROPERTY_DETAIL_IMAGE_URL,
  tourVideoUrl: TOUR_VIDEO_URL,
  tourVideoPosterUrl: TOUR_VIDEO_POSTER_URL,
  furnishedFinderUrl:
    "https://www.furnishedfinder.com/property/778350_1?moveDate=%7B%22in%22%3A%222026-06-23%22%7D",
  vrboUrl: "https://www.vrbo.com/4273516",
  amenities: [
    "Hot tub",
    "Fully equipped kitchen",
    "Washer & dryer",
    "Free WiFi",
    "Smart TV",
    "Pet friendly",
  ],
  location: {
    neighborhood: "Fort King District",
    city: "Ocala",
    state: "Florida",
  },
  features: {
    bedrooms: 4,
    bathrooms: 2,
    maxGuests: 8,
    squareFeet: 2000,
  },
};

export interface Review {
  id: string;
  author: string;
  rating: number;
  text: string;
  platform: "VRBO" | "Furnished Finder";
  date: string;
}

export const mockReviews: Review[] = [
  {
    id: "1",
    author: "Cynthia T.",
    rating: 5,
    text: "Beautiful place to stay. Great location to downtown and Silver Springs State Park.",
    platform: "VRBO",
    date: "2026-03-20",
  },
  {
    id: "2",
    author: "Jenny R.",
    rating: 5,
    text: "Beautifully renovated, warm and welcoming, with a fully stocked kitchen. Loved the hot tub and the easy 10–15 minute drive to Silver Springs State Park.",
    platform: "VRBO",
    date: "2025-12-29",
  },
  {
    id: "3",
    author: "Stephanie R.",
    rating: 5,
    text: "Truly a gem. The host was attentive, the home had everything we needed, and the neighborhood is calm and quiet. We plan on coming back.",
    platform: "VRBO",
    date: "2026-01-06",
  },
];

export const mockPropertyService = {
  getProperty: async (): Promise<Property | null> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    return mockProperty;
  },

  getAllProperties: async (): Promise<Property[]> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    return [mockProperty];
  },

  getReviews: async (): Promise<Review[]> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return mockReviews;
  },
};
