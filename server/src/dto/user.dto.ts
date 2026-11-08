import { string, z } from "zod";

export const registerUserSchema = z.object({
  name: z.string().trim().min(2, "Name must contain at least 2 characters"),

  email: z.string().trim().toLowerCase().email("Invalid email address"),

  password: z.string().min(8, "Password must contain at least 8 characters"),
});

export type RegisterUserInput = z.infer<typeof registerUserSchema>;

export type RegisterUserResponse = {
  message: string;
  user: {
    _id: string;
    name: string;
    email: string;
    educator: boolean;
  };
};


export const loginUserSchema = z.object({
  email: z.string().trim().toLowerCase().email("Invalid email address"),

  password: z.string().min(1, "Password is required"),
});

export type LoginUserInput = z.infer<typeof loginUserSchema>;

export type LoginUserResponse = {
  message: string;
  token: string;
  user: {
    _id: string;
    name: string;
    email: string;
    educator: boolean;
  };
};