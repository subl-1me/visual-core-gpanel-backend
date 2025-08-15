import { ENV } from "../config";
import { tierDictionary } from "../const";
import { chooseDatabase } from "../database";
import Counter from "../models/Counter";
import Shirt from "../models/Shirt";
import * as uiid from "uuid";

export const items = async () => {
  if (ENV === "development") {
    const db = chooseDatabase();
    const stmt = db.prepare(`SELECT * FROM shirts`);
    const response = stmt.all();
    return response as any[];
  }

  return [];
};

export const insert = async (shirt: any) => {
  if (ENV === "development") {
    const db = chooseDatabase();
    const stmt = db.prepare(
      `INSERT INTO shirts (id, identificator, name, description, coverImageUrl, tier, media, colors, price) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
    );

    // structure indeitificator code
    const totalShirts = await items();
    const tiers = Object.keys(tierDictionary);
    let tier = tiers.find((t) => t === shirt.tier);
    if (!tier) {
      tier = "UNKNOWN"; // never happens
    }
    const creationTimestamp = new Date().getTime();
    const identificator = `VC-${tierDictionary[tier]}-${
      totalShirts.length + 1
    }-${creationTimestamp}`;

    const response = stmt.run(
      uiid.v7(),
      identificator,
      shirt.name,
      shirt.description,
      shirt.coverImageUrl,
      tier,
      JSON.stringify(shirt.media),
      JSON.stringify(shirt.colors),
      shirt.price
    );

    return { error: false, response };
  }
};

export const remove = async (saleId: string) => {};

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
