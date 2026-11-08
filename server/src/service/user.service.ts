import bcrypt from "bcryptjs";

import UserModel from "../models/user.model.js";
import type { RegisterUserInput } from "../dto/user.dto.js";

export class UserAlreadyExistsError extends Error {
  constructor() {
    super("A user with this email already exists");
    this.name = "UserAlreadyExistsError";
  }
}

export const registerUser = async (data: RegisterUserInput) => {
  const existingUser = await UserModel.findOne({
    email: data.email,
  });

  if (existingUser) {
    throw new UserAlreadyExistsError();
  }

  const passwordHash = await bcrypt.hash(data.password, 12);

  const user = await UserModel.create({
    name: data.name,
    email: data.email,
    passwordHash,
  });

  return user;
};