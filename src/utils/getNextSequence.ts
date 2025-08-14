import Counter from "../models/Counter";

export const getNextSequence = async (
  name: string,
  increment: number = 1
): Promise<number> => {
  const counter = await Counter.findByIdAndUpdate(
    name,
    { $inc: { seq: increment } },
    { new: true, upsert: true }
  );
  return counter.seq - increment + 1; // 1st free block
};
