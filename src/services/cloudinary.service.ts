import Cloud from "../config/cloudinary";
import fs from "fs";

export const upload = async (filePath: string, name: string) => {
  const response = await Cloud.uploader.upload(filePath, {
    public_id: name,
    folder: "vc-products",
    transformation: [{ quality: "auto" }, { format: "auto" }],
  });

  // delete temp file
  fs.unlinkSync(filePath);

  return response;
};

export const remove = async (publicId: string) => {
  const response = await Cloud.uploader.destroy(publicId);
  return response;
};
