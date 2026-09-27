import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT || 5000;

export const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";

export const FINE_PER_DAY = Number(process.env.FINE_PER_DAY) || 5;
