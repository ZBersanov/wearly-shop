import z from "zod";

const signUpSchema = z
  .object({
    firstName: z.string().min(1, { message: "Это поле является обязательным" }),
    lastName: z.string().min(1, { message: "Это поле является обязательным" }),
    email: z
      .string()
      .min(1, { message: "Это поле является обязательным" })
      .email(),
    password: z
      .string()
      .min(8, { message: "Пароль должен быть не менее из 8 символов" })
      .regex(/.*[!@#$%^&*()_+{}|[\]\\:";'<>?,./].*/, {
        message: "Пароль должен содержать хотя бы один из специальных символов",
      }),
    confirmPassword: z
      .string()
      .min(1, { message: "Это поле является обязательным" }),
  })
  .refine((input) => input.password === input.confirmPassword, {
    message: "Пароли не совпадают",
    path: ["confirmPassword"],
  });

type SignUpTypes = z.infer<typeof signUpSchema>;

export { signUpSchema, type SignUpTypes };
