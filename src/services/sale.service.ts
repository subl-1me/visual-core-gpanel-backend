import { ENV } from "../config";
import Shirt from "../models/Shirt";
import Sale from "../models/Sale";
import { tierDictionary } from "../const";
import { getNextSequence } from "../utils/getNextSequence";

export const insert = async (salePayload: any) => {
  console.log(salePayload);
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

  console.log("newShirts", newShirts);
  await Shirt.insertMany(newShirts);

  const shirts = await Shirt.insertMany(newShirts);
  if (!shirts || shirts.length === 0) {
    return { error: true, message: "No shirts were created." };
  }
  console.log("shirts", shirts);

  const sale = new Sale({
    type: salePayload.type,
    status: salePayload.status,
    items: shirts.map((shirt: any) => shirt._id),
    paymentMethod: salePayload.paymentMethod,
    customerId: salePayload.customer._id,
    total: salePayload.total,
  });

  const savedSale = await sale.save();

  // const newSale = await sale.save();
  return { error: false, sale: savedSale, shirts };
};

export const items = async () => {
  const sales = await Sale.find()
    .populate("customerId")
    .populate("items.shirtId");
  return sales;
};
