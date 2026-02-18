"use server";

import { revalidatePath } from "next/cache";
import { CreateUserForm, UpdateUserForm } from "./schemas";

export type FormState = {
  errors?: Record<string, string[]>;
  message?: string | null;
  success?: boolean;
};

export const createUserForm = async (
  prevState: FormState,
  formData: FormData,
): Promise<FormState> => {
  // Validamos la data de entrada
  const rawData = Object.fromEntries(formData.entries());

  const validateFields = CreateUserForm.safeParse({
    ...rawData,
    avatar: formData.get("avatar"),
  });

  if (!validateFields.success) {
    return {
      errors: validateFields.error.flatten().fieldErrors,
      message: "No se encuentran los campos, Fallo al crear el usuario",
    };
  }

  try {
    const response = await fetch(`${process.env.BACKEND_URL}/auth/register`, {
      method: "POST",
      body: formData,
    });
    const errorData = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: errorData.message || "Error en el servidor",
        errors: {},
      };
    }

    revalidatePath("/features/dashboard/users");

    return { success: true, message: "Usuario creado con éxito", errors: {} };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Error en la base de datos", errors: {} };
  }
};

export const editUserForm = async (
  prevState: FormState,
  formData: FormData,
): Promise<FormState> => {

  const rawData = Object.fromEntries(formData.entries());

  // Si el archivo tiene tamaño 0, lo ponemos como undefined para que Zod .optional() funcione
  const avatarFile = formData.get("avatar") as File;
  const cleanedAvatar =
    avatarFile && avatarFile.size > 0 ? avatarFile : undefined;

  const validateFields = UpdateUserForm.safeParse({
    ...rawData,
    id: formData.get("id"),
    avatar: cleanedAvatar,
  });

  if (!validateFields.success) {
    return {
      errors: validateFields.error.flatten().fieldErrors,
      message: "Error de validación en los campos",
    };
  }

  const dataToSend = new FormData();
  const validatedData = validateFields.data;

  Object.entries(validatedData).forEach(([key, value]) => {
    // 1. Evitar enviar password vacía
    if (key === "password" && !value) return;

    // 2. Evitar enviar avatar si no hay uno nuevo
    if (key === "avatar") {
      if (value instanceof File && value.size > 0) {
        dataToSend.append("avatar", value);
      }
      return;
    }

    if (key === "role") {
      const roles = Array.isArray(value) ? value : [value];
      roles.forEach((v) => dataToSend.append("role", String(v))); // NestJS/Multer suele agrupar estos en un array
      return;
    }

    // 4. Otros campos (id, name, email, etc.)
    if (value !== undefined && value !== null) {
      dataToSend.append(key, String(value));
    }
  });

  try {
    const url = `${process.env.BACKEND_URL}/users/${validatedData.id}`;
    const response = await fetch(url, {
      method: "PATCH",
      body: dataToSend, // IMPORTANTE: No añadas headers de Content-Type manualmente
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.log("Error de backend", errorData);
      return {
        success: false,
        message: errorData.message || "Error en el servidor",
      };
    }

    revalidatePath("/features/dashboard/users");
    return { success: true, message: "Usuario actualizado con éxito" };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Error de conexión con el servidor" };
  }
};
export const deleteUserForm = async (userId: number) => {
  if (!userId) return { success: false, message: "Id no provisto" };

  try {
    const url = `${process.env.BACKEND_URL}/users/${userId}`;
    const response = await fetch(url, {
      method: "DELETE",
    });
    if (!response.ok) {
      const errorData = await response.json();
      console.log("Error del backend:", errorData);
      return {
        success: false,
        message: errorData.message || "Error en el servidor",
      };
    }
    revalidatePath("/features/dashboard/users");
    return { success: true, message: "Usuario eliminado con éxito" };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Error en la base de datos" };
  }
};
