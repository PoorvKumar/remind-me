import { AppDataSource } from "./data-source";

export const connectDatabase = async () => {
  try {
    await AppDataSource.initialize();
    console.log("Datasource has been initialized!");
  } catch (err) {
    console.log("Error during data source initialization!", err);
    throw err;
  }
};
