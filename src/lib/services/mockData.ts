export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  airbnbUrl: string;
  vrboUrl: string;
  amenities: string[];
  location: {
    address: string;
    city: string;
    state: string;
    zip: string;
  };
  features: {
    bedrooms: number;
    bathrooms: number;
    maxGuests: number;
    squareFeet: number;
  };
}

export const mockProperty: Property = {
  id: "casablanca-ocala-main",
  title: "Casablanca Ocala",
  description:
    "Experience luxury living in this stunning Ocala property. Perfect for family gatherings and peaceful getaways, featuring modern amenities and spectacular views.",
  price: 299,
  imageUrl: "/images/property-main.jpg",
  airbnbUrl: "https://airbnb.com/your-property-link",
  vrboUrl: "https://vrbo.com/your-property-link",
  amenities: [
    "Swimming Pool",
    "High-Speed WiFi",
    "Fully Equipped Kitchen",
    "Smart TV",
    "Outdoor Grill",
    "Laundry Facilities",
  ],
  location: {
    address: "123 Luxury Lane",
    city: "Ocala",
    state: "Florida",
    zip: "34470",
  },
  features: {
    bedrooms: 4,
    bathrooms: 3,
    maxGuests: 8,
    squareFeet: 2800,
  },
};

export interface Review {
  id: string;
  author: string;
  rating: number;
  text: string;
  platform: "Airbnb" | "VRBO";
  date: string;
}

export const mockReviews: Review[] = [
  {
    id: "1",
    author: "Sarah M.",
    rating: 5,
    text: "Beautiful property with amazing amenities. The location is perfect for visiting the World Equestrian Center. Will definitely return!",
    platform: "Airbnb",
    date: "2024-02-15",
  },
  {
    id: "2",
    author: "John D.",
    rating: 5,
    text: "Exceptional stay! The house is immaculate and the hosts were very responsive. Perfect for our family gathering.",
    platform: "VRBO",
    date: "2024-02-01",
  },
  {
    id: "3",
    author: "Michael R.",
    rating: 4,
    text: "Great location and beautiful property. Very comfortable for our extended family. Would recommend!",
    platform: "Airbnb",
    date: "2024-01-20",
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
