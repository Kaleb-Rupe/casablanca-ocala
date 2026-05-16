export interface HouseRule {
  text: string;
  positive?: boolean;
}

export const houseRules: HouseRule[] = [
  { text: "No smoking on the property" },
  { text: "No partying or hosting events" },
  { text: "Quiet hours begin at 10 PM" },
  { text: "Report any damages immediately" },
  { text: "Contact us before bringing additional guests" },
  { text: "Pets welcome (dogs & cats under 50 lbs, 2 pet max)", positive: true },
  { text: "Feel free to use all amenities", positive: true },
  { text: "Most importantly — have fun!", positive: true },
];

export const stayInfo = {
  checkIn: "4:00 PM",
  checkOut: "11:00 AM",
  minAge: 21,
};
