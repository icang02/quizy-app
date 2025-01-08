"use server";
import { signIn } from "@/auth";
import { LoginSchema } from "@/lib/zod";
import { AuthError } from "next-auth";

// Login credentials action
export const loginCredentials = async (
  prevState: unknown,
  formData: FormData
) => {
  const validatedFields = LoginSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { email, password } = validatedFields.data;

  try {
    await signIn("credentials", { email, password, redirectTo: "/dashboard" });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { message: "Invalid credentials!" };
        default:
          return { message: "Something went wrong!" };
      }
    }
    throw error;
  }
};
