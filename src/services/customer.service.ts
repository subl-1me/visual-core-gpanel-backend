import { ENV } from "../config";
import { chooseDatabase } from "../database";
import Customer from "../models/Customer";
import * as uuid from "uuid";

export const insert = async (payload: any) => {
  console.log(payload);
  const customer = new Customer({
    name: payload.name,
    email: payload.email,
    phone: payload.phone,
    address: payload.address,
  });

  const savedCustomer = await customer.save();
  if (!savedCustomer) {
    return { error: true, message: "Customer could not be created." };
  }

  return { error: false, customer: savedCustomer };
};

export const items = async () => {
  const customers = await Customer.find();
  return customers;
};

export const remove = async (customerId: string) => {};
