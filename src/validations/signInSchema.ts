import z from "zod";

const signInSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Это поле является обязательным" })
    .email(),
  password: z.string().min(8, { message: "Пароль обязателен" }),
});

type SignInTypes = z.infer<typeof signInSchema>;

export { signInSchema, type SignInTypes };
