import { Property } from "@/lib/services/propertyService";

interface VrboAmenity {
  id: string;
  name: string;
  category: string;
}

interface VrboAddress {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

interface VrboListing {
  listingId: string;
  title: string;
  description: string;
  price: {
    amount: number;
    currency: string;
  };
  images: {
    primary: string;
    thumbnail: string;
  }[];
  amenities: VrboAmenity[];
  address: VrboAddress;
  bedrooms: number;
  bathrooms: number;
  maxOccupancy: number;
  squareFeet: number;
}

interface VrboApiResponse {
  listing: VrboListing;
  success: boolean;
}

const VRBO_API_KEY = process.env.NEXT_PUBLIC_VRBO_API_KEY;
const VRBO_API_BASE_URL = "https://api.vrbo.com/v2";

export const vrboService = {
  async getListingDetails(listingId: string): Promise<Property> {
    try {
      const headers = new Headers({
        "X-HomeAway-API-Key": VRBO_API_KEY || "",
        Accept: "application/json",
      });

      const response = await fetch(
        `${VRBO_API_BASE_URL}/listings/${listingId}`,
        {
          headers,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch VRBO listing");
      }

      const data = (await response.json()) as VrboApiResponse;

      return {
        id: data.listing.listingId,
        title: data.listing.title,
        description: data.listing.description,
        price: data.listing.price.amount,
        imageUrl: data.listing.images[0].primary,
        airbnbUrl: "", // Add if available
        vrboUrl: `https://vrbo.com/listing/${data.listing.listingId}`,
        amenities: data.listing.amenities.map((a) => a.name),
        location: {
          address: data.listing.address.street,
          city: data.listing.address.city,
          state: data.listing.address.state,
          zip: data.listing.address.postalCode,
        },
        features: {
          bedrooms: data.listing.bedrooms,
          bathrooms: data.listing.bathrooms,
          maxGuests: data.listing.maxOccupancy,
          squareFeet: data.listing.squareFeet,
        },
      };
    } catch (error) {
      console.error("Error fetching from VRBO:", error);
      throw error;
    }
  },
};
