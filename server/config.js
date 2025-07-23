import dotenv from "dotenv";
dotenv.config();

export const config = {
  jwtSecret: process.env.JWT_SECRET,
  huggingFaceKey: process.env.HUGGINGFACE_API_KEY,
};
