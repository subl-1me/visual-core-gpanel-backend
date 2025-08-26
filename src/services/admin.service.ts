import { ENV } from "../config";
import { chooseDatabase } from "../database";
import Admin from "../models/Admin";
import { ObjectId } from "mongodb";

export const insert = async (user: any) => {
  const createUser = new Admin({
    username: user.username,
    email: user.email,
    password: user.password,
    name: user.name,
    lastName: user.lastName,
  });

  const newUser = await createUser.save();
  return newUser;
};

export const items = async () => {
  const items = await Admin.find();
  return items;
};

export const item = async (
  id: string = "",
  username: string = "",
  email: string = ""
) => {
  const conditions: any[] = [];
  if (id && ObjectId.isValid(id)) {
    conditions.push({ _id: new ObjectId(id) });
  }

  if (username !== "") {
    conditions.push({ username: username });
  }

  if (email !== "") {
    conditions.push({ email: email });
  }

  const admin = await Admin.findOne({ $or: conditions });
  return admin;
};

export const update = async (adminId: string, data: any) => {
  const updateData: { [key: string]: any } = {};

  Object.keys(data).forEach((key) => {
    if (data[key] !== undefined && data[key] !== null) {
      updateData[key] = data[key];
    }
  });

  const updatedAdmin = Admin.findByIdAndUpdate(
    adminId,
    {
      $set: updateData,
    },
    { new: true }
  );

  if (!updatedAdmin) {
    throw new Error("User not found.");
  }

  return updatedAdmin;
};
