import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../db/secret";

export function signToken(payload) {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: "7d",
  });
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
}