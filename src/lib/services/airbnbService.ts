import { Property } from "@/lib/services/propertyService";

interface AirbnbAmenity {
  name: string;
  id: string;
  category?: string;
}

interface AirbnbAddress {
  street: string;
  city: string;
  state: string;
  zip_code: string;
  country: string;
}

interface AirbnbListing {
  id: string;
  name: string;
  description: string;
  price_rate: {
    amount: number;
    currency: string;
  };
  primary_photo: {
    large: string;
    thumbnail: string;
  };
  amenities: AirbnbAmenity[];
  address: AirbnbAddress;
}

interface AirbnbApiResponse {
  listing: AirbnbListing;
  success: boolean;
}

const AIRBNB_API_KEY = process.env.NEXT_PUBLIC_AIRBNB_API_KEY;
const AIRBNB_API_BASE_URL = "https://api.airbnb.com/v2";

export const airbnbService = {
  async getListingDetails(listingId: string): Promise<Property> {
    try {
      const response = await fetch(
        `${AIRBNB_API_BASE_URL}/listings/${listingId}`,
        {
          headers: {
            Authorization: `Bearer ${AIRBNB_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch Airbnb listing");
      }

      const data = await response.json() as AirbnbApiResponse;

      // Transform Airbnb data to match your Property interface
      return {
        id: data.listing.id,
        title: data.listing.name,
        description: data.listing.description,
        price: data.listing.price_rate.amount,
        imageUrl: data.listing.primary_photo.large,
        airbnbUrl: `https://airbnb.com/rooms/${data.listing.id}`,
        vrboUrl: "", // Add if available
        amenities: data.listing.amenities.map((a: AirbnbAmenity) => a.name),
        location: {
          address: data.listing.address.street,
          city: data.listing.address.city,
          state: data.listing.address.state,
          zip: data.listing.address.zip_code,
        },
        features: {
          bedrooms: 0, // Add these from the API response when available
          bathrooms: 0,
          maxGuests: 0,
          squareFeet: 0
        }
      };
    } catch (error) {
      console.error("Error fetching from Airbnb:", error);
      throw error;
    }
  },
};
