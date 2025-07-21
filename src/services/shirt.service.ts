import { ENV } from "../config";
import { tierDictionary } from "../const";
import { chooseDatabase } from "../database";
import Shirt from "../models/test/Shirt";

export const items = async () => {
  if (ENV === "development") {
    const db = chooseDatabase();
    const stmt = db.prepare(`SELECT * FROM shirts`);
    const response = stmt.all();
    return response as Shirt[];
  }

  return [];
};

export const insert = async (shirt: Shirt) => {
  if (ENV === "development") {
    const db = chooseDatabase();
    const stmt = db.prepare(
      `INSERT INTO shirts (id, identificator, name, description, coverImageUrl, category, tier, media, color, price) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    );

    // structure indeitificator code
    const totalShirts = await items();
    const tiers = Object.keys(tierDictionary);
    let tier = tiers.find((t) => t === shirt.tier);
    if (!tier) {
      tier = "UNKNOWN"; // never happens
    }
    const creationTimestamp = new Date().getTime();
    const identificator = `VC-${tiers[tier as any]}-${
      totalShirts.length + 2
    }-${creationTimestamp}`;

    const response = stmt.run(
      shirt.id,
      identificator,
      shirt.name,
      shirt.description,
      shirt.coverImageUrl,
      shirt.category,
      tier,
      shirt.media,
      shirt.color,
      shirt.price
    );

    return { error: false, response };
  }
};
