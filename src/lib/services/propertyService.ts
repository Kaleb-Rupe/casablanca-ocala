import { db } from "../firebase";
import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { airbnbService } from "./airbnbService";
import { vrboService } from "./vrboService";

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

export const propertyService = {
  async getProperty(id: string): Promise<Property | null> {
    try {
      const docRef = doc(db, "properties", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as Property;
      }
      return null;
    } catch (error) {
      console.error("Error fetching property:", error);
      return null;
    }
  },

  async getAllProperties(): Promise<Property[]> {
    try {
      const querySnapshot = await getDocs(collection(db, "properties"));
      return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Property[];
    } catch (error) {
      console.error("Error fetching properties:", error);
      return [];
    }
  },

  async getAirbnbProperty(airbnbListingId: string): Promise<Property | null> {
    try {
      const property = await airbnbService.getListingDetails(airbnbListingId);

      // Cache the result in Firebase
      const docRef = doc(db, "properties", `airbnb_${airbnbListingId}`);
      await setDoc(docRef, {
        ...property,
        lastUpdated: new Date().toISOString(),
      });

      return property;
    } catch (error) {
      console.error("Error fetching Airbnb property:", error);
      return null;
    }
  },

  async getVrboProperty(vrboListingId: string): Promise<Property | null> {
    try {
      const property = await vrboService.getListingDetails(vrboListingId);

      // Cache the result in Firebase
      const docRef = doc(db, "properties", `vrbo_${vrboListingId}`);
      await setDoc(docRef, {
        ...property,
        lastUpdated: new Date().toISOString(),
      });

      return property;
    } catch (error) {
      console.error("Error fetching VRBO property:", error);
      return null;
    }
  },
};
