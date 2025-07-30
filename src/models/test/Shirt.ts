export default interface Shirt {
  no: number;
  id: string;
  name: string;
  description: string;
  coverImageUrl: string;
  identificator: string;
  tier: "SEASON" | "DROP" | "CUSTOM" | "UNKNOWN" | "";
  media: string[];
  colors: string[];
  price: number;
}
