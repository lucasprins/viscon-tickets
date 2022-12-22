import axios from "axios";
import { authHeader } from "../features/auth/authHeader";
import { ObjectValues } from "../utils/types";

const API_URL = `${process.env.REACT_APP_API_URL}token/`;

export const TokenEnum = {
  REGISTER: "REGISTER",
} as const

export type TokenType = ObjectValues<typeof TokenEnum>;

const verifyToken = async (token: string, tokenType: TokenType) => {
  const response = await axios.get(`${API_URL}verify?token=${token}&tokenType=${tokenType}`, {
    headers: authHeader(),
  });
  return response;
};

const TokenService = {
  verifyToken
};

export default TokenService;