import Stock from "../models/Stock";

export const insert = async (stock: any) => {
  const newStock = new Stock({
    sizes: stock.sizes,
    availableColors: stock.availableColors,
    details: stock.details,
    status: stock.status,
    total: stock.total,
  });

  const response = await newStock.save();
  return response;
};

export const items = async () => {
  const items = await Stock.find();
  return items || [];
};

export const remove = async (stockId: string) => {
  const response = await Stock.findByIdAndDelete(stockId);
  return response;
};
