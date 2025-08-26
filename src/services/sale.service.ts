import { ENV } from "../config";
import Sale from "../models/Sale";
import * as shirtService from "../services/shirt.service";

export const insert = async (salePayload: any) => {
  // first add shirts
  const newShirts = await shirtService.insertMany(salePayload.items);
  if (!newShirts || newShirts.length === 0) {
    throw new Error("Error trying to add sale shirts.");
  }

  const sale = new Sale({
    type: salePayload.type,
    status: salePayload.status,
    items: newShirts.map((shirt: any) => shirt._id),
    paymentMethod: salePayload.paymentMethod,
    customer: salePayload.customer._id,
    total: salePayload.total,
  });

  const response = await sale.save();
  return response;
};

export const items = async () => {
  const sales = await Sale.find().populate("customer").populate("items");
  return sales || [];
};

export const item = async (id: string) => {
  if (!id) {
    throw new Error("Sale ID is required.");
  }

  const sale = await Sale.findById(id);
  return sale;
};

export const remove = async (saleId: string) => {
  const sale = await item(saleId);
  if (!sale || (sale as any).error) {
    throw new Error("Sale doesnt exist.");
  }

  // first remove shirts attached to sale
  const removing = await shirtService.removeMany((sale as any).items);

  // remove sale
  const response = await Sale.findOneAndDelete({
    _id: saleId,
  });

  return response;
};
