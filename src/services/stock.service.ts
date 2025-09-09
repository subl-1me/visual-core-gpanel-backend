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
  const items = await Stock.find().populate("details.media");
  return items || [];
};

export const item = async (stockId: string) => {
  const item = await Stock.findById(stockId);
  return item;
};

export const remove = async (stockId: string) => {
  const response = await Stock.findByIdAndDelete(stockId);
  return response;
};

export const update = async (stockId: string, data: any) => {
  const updateData: { [key: string]: any } = {};

  Object.keys(data).forEach((key) => {
    if (data[key] !== undefined && data[key] !== null) {
      updateData[key] = data[key];
    }
  });

  const updatedStock = Stock.findByIdAndUpdate(
    stockId,
    {
      $set: updateData,
    },
    { new: true }
  );

  if (!updatedStock) {
    throw new Error("Stock not found.");
  }

  return updatedStock;
};
