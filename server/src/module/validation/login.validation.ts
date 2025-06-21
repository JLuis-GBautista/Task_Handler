import { z } from "zod";

const loginSchema = z.object({
  email: z.string()
    .email("Correo inválido"),
  password: z.string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .refine(password => /[A-Z]/.test(password), {
      message: 'La contraseña debe contener al menos una letra mayúscula.',
    })
    .refine(password => /[a-z]/.test(password), {
      message: 'La contraseña debe contener al menos una letra minúscula.',
    })
    .refine(password => /[0-9]/.test(password), {
      message: 'La contraseña debe contener al menos un número.',
    })
    .refine(password => /[!@#$%^&*()]/.test(password), {
      message: 'La contraseña debe contener al menos un carácter especial (!@#$%^&*()).',
    }),
});

export default loginSchema;