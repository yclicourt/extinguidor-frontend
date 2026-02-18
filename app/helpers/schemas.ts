import { z } from "zod";
import { Status } from "./enums/status.enum";
import { Role } from "./enums/role.enum";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB en bytes
const ACCEPTED_FORMATS = ["image/webp", "image/jpeg", "image/png"];

const fileSchema = z
  .instanceof(File)
  .refine(
    (file) => file.size <= MAX_FILE_SIZE,
    "El archivo no puede pesar más de 5MB",
  )
  .refine(
    (file) => ACCEPTED_FORMATS.includes(file.type),
    "Solo se aceptan los formatos .webp, .jpg y .png",
  );

const UserFormSchema = z.object({
  id: z.coerce.number(),
  name: z
    .string()
    .min(2, "El nombre debe contener al menos 2 caracteres")
    .max(50, "El nombre es demasiado largo")
    .trim(),
  lastname: z
    .string()
    .min(2, "El apellido debe contener al menos 2 caracteres")
    .max(50, "El apellido es demasiado largo")
    .trim(),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .min(5, "El email es demasiado corto")
    .max(255, "El email es demasiado largo")
    .refine((email) => !email.endsWith(".temp"), {
      message: "No se permiten correos temporales",
    }),
  address: z
    .string()
    .min(2, "La dirección debe contener al menos 2 caracteres")
    .max(255, "La dirección es demasiado larga")
    .trim(),
  phone: z
    .string()
    .transform((val) => val.replace(/\s+/g, ""))
    .pipe(
      z
        .string()
        .regex(
          /^\+?[1-9]\d{1,14}$/,
          "Número de teléfono inválido ( usa formato E.164, ej: + 34000000000)",
        ),
    ),
  password: z
    .string()
    .min(8, "La contraseña debe contener al menos 8 caracteres")
    .regex(/[A-Z]/, "Debe contener al menos una mayúscula")
    .regex(/[0-9]/, "Debe contener al menos un número"),
  status: z.enum(Status, {
    error: "Estado no válido",
  }),
  role: z.preprocess(
    (val) => {
      if (Array.isArray(val)) return val;
      if (typeof val === "string") return [val];
      return undefined;
    },
    z.array(z.enum(Role)),
  ),
  avatar: z.preprocess((val) => {
    // Si no hay archivo o el tamaño es 0, devolvemos undefined
    if (val instanceof File && val.size === 0) return undefined;
    return val;
  }, fileSchema.optional()),
});

const statusValues = Object.values(Status) as [string, ...string[]];

export const CreateUserForm = UserFormSchema.omit({ id: true });
export const UpdateUserForm = UserFormSchema.partial({
  avatar: true,
  password: true,
  status: true,
}).extend({
  id: z.coerce.number(),

  status: z.enum(statusValues, {
    error: () => ({ message: "Estado no válido" }),
  }),

  avatar: z
    .instanceof(File)
    .optional()
    .refine((file) => {
      // Si no hay archivo o el tamaño es 0, es válido (porque es un update opcional)
      if (!file || file.size === 0) return true;
      // Si hay archivo, validamos el formato
      return ACCEPTED_FORMATS.includes(file.type);
    }, "Solo se aceptan los formatos .webp, .jpg y .png")
    .refine((file) => {
      if (!file || file.size === 0) return true;
      return file.size <= MAX_FILE_SIZE;
    }, "El archivo no puede pesar más de 5MB"),

  // Sobrescribimos password para que acepte string vacío y no lo valide si es así
  password: z
    .string()
    .optional()
    .or(z.literal(""))
    .refine((val) => !val || val.length >= 8, {
      message: "La contraseña debe tener al menos 8 caracteres",
    })
    .refine((val) => !val || /[A-Z]/.test(val), {
      message: "Debe contener al menos una mayúscula",
    })
    .refine((val) => !val || /[0-9]/.test(val), {
      message: "Debe contener al menos un número",
    }),
  // Aseguramos que el rol siempre sea un array para que tu backend no sufra
  role: z.preprocess(
    (val) => (typeof val === "string" ? [val] : val),
    z.array(z.enum(Role)),
  ),
});
export const DeleteUserFrom = UserFormSchema;
