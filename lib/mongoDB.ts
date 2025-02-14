import mongoose from "mongoose";

let isConnected: boolean = false;

export const connectToDB = async (): Promise<void> => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("Database is already connected");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URL || "", {
      dbName: "Malchieng_Admin",
    });

    isConnected = true;
    console.log("Database connected");
  } catch (error) {
    console.error("Error connecting to database:", error);
  }
};
