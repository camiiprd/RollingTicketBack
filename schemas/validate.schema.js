import { z } from "zod";

export const registerSchema = z.object({
  userName: z.string({
    required_error: "nombre de usuario requerido",
  }),
  password: z
    .string({
      required_error: "contraseña requerida",
    })
    .min(6, { message: "la contraseña debe tener al menos 6 caracteres" }),
  email: z.string({
    required_error: "email requerido",
  }).email({message: "email invalido"}),
});

export const loginSchema = z.object({
  email: z
    .string({
      required_error: "email requerido",
    })
    .email({ message: "email invalido" }),
  password: z
    .string({
      required_error: "contraseña requerida",
    })
    .min(6, { message: "la contraseña debe tener al menos 6 caracteres" }),
});
