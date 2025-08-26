import Customer from "../models/Customer";

export const insert = async (payload: any) => {
  const customer = new Customer({
    name: payload.name,
    email: payload.email,
    phone: payload.phone,
    address: payload.address,
  });

  const response = await customer.save();
  return response;
};

export const items = async () => {
  const customers = await Customer.find();
  return customers || [];
};

export const remove = async (customerId: string) => {
  const response = await Customer.findByIdAndDelete(customerId);
  return response;
};
