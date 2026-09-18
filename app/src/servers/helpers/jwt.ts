import { ObjectId } from "mongodb";
import jwt from "jsonwebtoken" 

interface IPayload {
  _id: ObjectId,
  email: string
}

const secret: string = process.env.JWT_SECRET || "secret_key"

export function signToken(payload: IPayload): string {
  return jwt.sign(payload, secret)
}

export function verifyToken(token: string) {
  return jwt.verify(token, secret)
}
