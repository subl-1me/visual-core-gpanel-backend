import qrcode from "qrcode";

export const generateQr = async (text: string): Promise<Buffer> => {
  return qrcode.toBuffer(JSON.stringify(text), {
    width: 300,
    margin: 2,
    color: {
      dark: "#000000",
      light: "#FFFFFF",
    },
  });
};
