import Customer from "./Customer";
import PaymentMethod from "./PaymentMethod";
import Shirt from "./Shirt";

export default interface Sale {
  id?: string;
  items: any;
  total: number;
  type: "AUTOMATIC" | "MANUAL";
  status: "REQUESTED" | "DELIVERED" | "ERROR" | "IN PROCESS";
  paymentMethod: string;
  additionalNotes: string;
  customer: Customer;
  created_at?: Date;
  updated_at?: Date;
}
