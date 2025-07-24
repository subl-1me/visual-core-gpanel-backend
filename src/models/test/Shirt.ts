import Stock from "./Stock";

export default interface Shirt {
  no: number;
  id: string;
  name: string;
  description: string;
  coverImageUrl: string;
  category: string;
  identificator: string;
  tier: "SEASON" | "DROP" | "CUSTOM" | "UNKNOWN";
  media: string[];
  stock?: Stock;
  colors: string[];
  price: number;
}
