import { object, string } from "zod";

export const LoginSchema = object({
  email: string().email("Email tidak valid."),
  password: string().min(3, "Masukkan minimal 3 karakter."),
});
