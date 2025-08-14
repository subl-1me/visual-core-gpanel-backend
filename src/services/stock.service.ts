import * as uiid from "uuid";

import { ENV } from "../config";
import { chooseDatabase } from "../database";
import Stock from "../models/Stock";

export const insert = async (stock: any) => {
  const newStock = new Stock({
    sizes: stock.sizes,
    availableColors: stock.availableColors,
    details: stock.details,
    status: stock.status,
    total: stock.total,
  });

  const saved = await newStock.save();
  if (saved) {
    return { error: false, response: saved };
  }

  return { error: true, response: null };
};

export const items = async () => {
  const items = await Stock.find();
  if (items) {
    return items.map((item) => ({
      id: item.id,
      sizes: item.sizes,
      availableColors: item.availableColors,
      details: item.details,
      status: item.status,
      total: item.total,
    }));
  }

  return [];
};

export const remove = async (stockId: string) => {
  const deleted = await Stock.findByIdAndDelete(stockId);
  if (deleted) {
    return { error: false, response: deleted };
  }

  return { error: true, response: null };
};
