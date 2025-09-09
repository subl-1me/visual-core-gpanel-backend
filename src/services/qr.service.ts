import qrcode from "qrcode";

export const generateQr = async (text: string): Promise<String> => {
  return qrcode.toDataURL(text, {
    width: 300,
    margin: 2,
  });
};
