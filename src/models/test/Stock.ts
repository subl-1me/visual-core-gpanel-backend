export default interface Stock {
  pos?: number;
  id: string;
  shirt_id: string;
  size: "S" | "M" | "L" | "XL";
  color: string;
  quantity: number;
}
