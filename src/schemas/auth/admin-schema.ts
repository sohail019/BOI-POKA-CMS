import { z } from "zod";

export const registerSchema = z.object({
  fullName: z.string().min(3, "Full Name must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  mobileNumber: z
    .string()
    .regex(/^[0-9]{10,15}$/, "Mobile number must be 10-15 digits"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  accessTo: z
    .array(z.string())
    .min(1, "At least one access permission required"),
});

export const AdminLoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type RegisterFormData = z.infer<typeof registerSchema>;
export type AdminLoginFormData = z.infer<typeof AdminLoginSchema>;
