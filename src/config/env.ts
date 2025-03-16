import dotenv from "dotenv";
dotenv.config();

export const config = {
  port: process.env.PORT || 3001,
  apiUrl: process.env.API_URL,
  nodeEnv: process.env.NODE_ENV || "development",
};
