export default interface Shirt {
  no: number;
  id: string;
  name: string;
  description: string;
  identificator: string;
  tier: "SEASON" | "DROP" | "CUSTOM" | "UNKNOWN" | "";
  media: Media[];
  colors: string[];
  price: number;
}

export interface Media {
  url: string;
  public_id: string;
}
