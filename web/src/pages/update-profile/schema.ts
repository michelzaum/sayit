import { z } from "zod";

export const schema = z.object({
  name: z
    .string()
    .min(1)
    .refine((name) => !/\d/.test(name), { error: "Nome invalido" }),
  bio: z.string(),
  password: z
    .string()
    .refine((val) => val === "" || (val.length >= 8 && val.length <= 16), {
      message: "Senha invalida. Minimo 8 caracteres e maximo 16",
    }),
});
