import { z } from "zod";

const profileSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres").trim(),
  age: z.number().min(18, "Para registrarte debes ser mayor de edad"),
  salary: z.string().trim()
    .refine(val => {
      // 1. Verificar si es una cadena de número válida
      const num = parseFloat(val);
      if (isNaN(num) || !isFinite(num)) {
        return false; // No es un número válido
      }
      // 2. Verificar que no sea negativo (después de la conversión temporal)
      if (num < 0) {
          return false;
      }
      // 3. Verificar que tenga como máximo 2 decimales
      // Convertir a cadena con 2 decimales y comparar
      const parts = val.split('.');
      if (parts.length === 2 && parts[1].length > 2) {
          return false; // Más de 2 decimales
      }
      return true; // Pasa todas las validaciones
    }, {
      message: "El salario debe ser un número válido con un máximo de 2 decimales y no negativo.",
    }),
  occupation: z.string()
    .min(2, "La ocupación debe tener al menos 2 caracteres.")
    .trim(),
});

export default profileSchema;