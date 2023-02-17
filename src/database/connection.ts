import { client } from "./config";

export const conectDataBase = async (): Promise<void> => {
  await client.connect();
  console.log("Database is conected!");
};
