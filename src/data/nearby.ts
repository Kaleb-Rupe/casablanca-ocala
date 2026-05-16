export interface NearbyItem {
  name: string;
  distance: string;
}

export interface NearbyCategory {
  id: "attractions" | "food" | "transport";
  title: string;
  description: string;
  items: NearbyItem[];
}

export const nearbyCategories: NearbyCategory[] = [
  {
    id: "attractions",
    title: "Things to do",
    description: "Springs, downtown, and Ocala's iconic attractions are a short drive away.",
    items: [
      { name: "Silver Springs State Park", distance: "10–15 min drive" },
      { name: "World Equestrian Center", distance: "25 min drive · 24 km" },
      { name: "Canyons Zip Line & Adventure", distance: "Short drive north" },
      { name: "Ocala Downtown Square", distance: "10 min drive · 5 km" },
      { name: "Marion County Museum of History", distance: "15 min walk · 1.3 km" },
      { name: "Bowlero East Ocala", distance: "5 min drive · 2.8 km" },
    ],
  },
  {
    id: "food",
    title: "Eat & drink",
    description: "Owner-picked local favorites — from steakhouses to small bakeries.",
    items: [
      { name: "Mark's Prime Steakhouse", distance: "Downtown Ocala" },
      { name: "Tony's Sushi", distance: "Downtown Ocala" },
      { name: "La Cuisine", distance: "Downtown Ocala" },
      { name: "Soleil Bakery & Social House", distance: "Downtown Ocala" },
      { name: "Peachwave (dessert)", distance: "Nearby" },
      { name: "Ocala's Chocolate & Confections", distance: "Downtown Ocala" },
    ],
  },
  {
    id: "transport",
    title: "Getting around",
    description: "Major travel hubs and easy regional access.",
    items: [
      { name: "Ocala Station", distance: "10 min drive" },
      { name: "Leesburg Intl. Airport (LEE)", distance: "60 min drive" },
      { name: "Gainesville Regional (GNV)", distance: "~50 min drive" },
    ],
  },
];
