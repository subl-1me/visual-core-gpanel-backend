import { ENV } from "../config";
import Shirt from "../models/Shirt";
import Sale from "../models/Sale";
import { tierDictionary } from "../const";
import { getNextSequence } from "../utils/getNextSequence";
import { removeMany } from "./shirt.service";

export const insert = async (salePayload: any) => {
  const totalShirtsNeeded = salePayload.items.reduce(
    (sum: any, item: any) => sum + item.quantity,
    0
  );
  const startSeq = await getNextSequence("shirtId", totalShirtsNeeded); // Reserve a sequence range

  const newShirts = salePayload.items.flatMap((item: any, index: any) => {
    let shirts = [];
    let offset = salePayload.items
      .slice(0, index)
      .reduce((sum: any, i: any) => sum + i.quantity, 0);

    for (let i = 0; i < item.quantity; i++) {
      const currentSeq = startSeq + offset + i;
      const identificator = `VS-${
        tierDictionary[item.details.tier]
      }-${currentSeq}`;

      shirts.push({
        name: item.details.name,
        description: item.details.description,
        imageUrl: item.details.imageUrl || "https://example.com/default.jpg",
        tier: item.details.tier,
        media: item.details.media,
        price: item.details.price,
        size: item.size.size,
        identificator,
      });
    }
    return shirts;
  });

  const shirts = await Shirt.insertMany(newShirts);
  if (!shirts || shirts.length === 0) {
    return { error: true, message: "No shirts were created." };
  }

  const sale = new Sale({
    type: salePayload.type,
    status: salePayload.status,
    items: shirts.map((shirt: any) => shirt._id),
    paymentMethod: salePayload.paymentMethod,
    customer: salePayload.customer._id,
    total: salePayload.total,
  });

  const savedSale = await sale.save();

  // const newSale = await sale.save();
  return { error: false, sale: savedSale, shirts };
};

export const items = async () => {
  const sales = await Sale.find()
    .populate("customer")
    .populate("items.shirtId");
  return sales;
};

export const item = async (id: string) => {
  if (!id) {
    return { error: true, message: "Sale ID is required." };
  }

  const sale = await Sale.findById(id);
  return sale;
};

export const remove = async (saleId: string) => {
  const sale = await item(saleId);
  if (!sale || (sale as any).error) {
    return { error: true, message: "Sale doesn't exist." };
  }

  // first remove shirts attached to sale
  const removing = await removeMany((sale as any).items);

  // remove sale
  const response = await Sale.findOneAndDelete({
    _id: saleId,
  });

  return response;
};
