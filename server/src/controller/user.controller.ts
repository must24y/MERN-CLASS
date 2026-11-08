import type { Request, Response } from "express";

import { registerUserSchema } from "../dto/user.dto.js";
import type { RegisterUserResponse } from "../dto/user.dto.js";

import {
  registerUser,
  UserAlreadyExistsError,
} from "../services/user.service.js";

export const register = async (req: Request, res: Response): Promise<void> => {
  const validation = registerUserSchema.safeParse(req.body);

  if (!validation.success) {
    res.status(400).json({
      message: "Validation failed",
      errors: validation.error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      })),
    });
    return;
  }

  try {
    const user = await registerUser(validation.data);

    const response: RegisterUserResponse = {
      message: "User registered successfully",
      user: {
        _id: user._id.toString(),
        name: user.name,
        email: user.email,
        educator: user.educator,
      },
    };

    res.status(201).json(response);
  } catch (error: unknown) {
    if (error instanceof UserAlreadyExistsError) {
      res.status(409).json({
        message: error.message,
      });
      return;
    }

    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === 11000
    ) {
      res.status(409).json({
        message: "A user with this email already exists",
      });
      return;
    }

    console.error("Registration error:", error);

    res.status(500).json({
      message: "Internal server error",
    });
  }
};