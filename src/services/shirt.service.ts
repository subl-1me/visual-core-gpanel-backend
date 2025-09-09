import { tierDictionary } from "../const";
import Counter from "../models/Counter";
import Shirt from "../models/Shirt";
import { getNextSequence } from "../utils/getNextSequence";

export const items = async () => {
  const shirts = await Shirt.find();
  return shirts || [];
};

export const item = async (identificator: string) => {
  const shirt = await Shirt.findOne({
    identificator: {
      $regex: new RegExp(`^${identificator.trim()}$`, "i"), // Case-insensitive match
    },
  });
  return shirt;
};

export const insert = async (body: any) => {
  if (!body) {
    throw new Error("Shirt body is required.");
  }

  const startSeq = await getNextSequence("shirtId", 1); // Reserve a sequence range
  const identificator = `VS-${tierDictionary[body.details.tier]}-${startSeq}`;
  const shirt = new Shirt({
    name: body.details.name,
    description: body.details.description,
    tier: body.details.tier,
    media: body.details.media,
    price: body.details.price,
    size: body.size.size,
    identificator,
  });

  const save = await shirt.save();
  return save;
};

export const insertMany = async (items: any) => {
  const totalShirtsNeeded = items.reduce(
    (sum: any, item: any) => sum + item.quantity,
    0
  );
  const startSeq = await getNextSequence("shirtId", totalShirtsNeeded); // Reserve a sequence range
  const newShirts = items.flatMap((item: any, index: any) => {
    let shirts = [];
    let offset = items
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
    throw new Error("Error trying to insert Sale shirts.");
  }

  return shirts;
};

export const remove = async (shirtId: string) => {
  const response = await Shirt.findByIdAndDelete(shirtId);
  return response;
};

export const removeMany = async (ids: string[]) => {
  const result = await Shirt.deleteMany({
    _id: { $in: ids },
  });

  // update counter
  const totalShirts = ids.length;
  const counter = await Counter.findByIdAndUpdate("shirtId", {
    $inc: { seq: -totalShirts },
  });

  return result;
};
