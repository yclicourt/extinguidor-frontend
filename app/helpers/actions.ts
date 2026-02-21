"use server";

import { revalidatePath } from "next/cache";
import { CreateRouteForm, CreateUserForm, UpdateUserForm } from "./schemas";

export type FormState = {
  errors?: Record<string, string[]>;
  message?: string | null;
  success?: boolean;
};

/**
 * Actions para UserView
 */
export const createUserForm = async (
  prevState: FormState,
  formData: FormData,
): Promise<FormState> => {
  // Validamos la data de entrada
  const rawData = Object.fromEntries(formData.entries());

  const avatarFile = formData.get("avatar") as File;

  const validateFields = CreateUserForm.safeParse({
    ...rawData,
    avatar: avatarFile,
  });

  if (!validateFields.success) {
    return {
      errors: validateFields.error.flatten().fieldErrors,
      message: "No se encuentran los campos, Fallo al crear el usuario",
    };
  }

  const dataToSend = new FormData();
  const data = validateFields.data;

  // Adjuntamos campos de texto
  Object.entries(data).forEach(([key, value]) => {
    if (key !== "avatar" && value !== undefined) {
      if (key === "role" && Array.isArray(value)) {
        value.forEach((v) => dataToSend.append("role", v));
      } else {
        dataToSend.append(key, String(value));
      }
    }
  });

  // Lógica de la imagen
  if (data.avatar && data.avatar.size > 0) {
    dataToSend.append("avatar", data.avatar);
  } else {
    // Si el usuario no subió nada, enviamos el nombre de tu archivo default
    // El backend debe estar listo para recibir este string
    dataToSend.append("avatar", "avatar.svg");
  }

  try {
    const response = await fetch(`${process.env.BACKEND_URL}/auth/register`, {
      method: "POST",
      body: dataToSend,
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
    const errorMessage =
      error instanceof Error ? error.message : "Error en la base de datos";
    return { success: false, message: errorMessage, errors: {} };
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

/**
 * Actions para ParteTrabajo View
 */

export const editParteTrabajoAssignToRoute = async (
  parteId: number,
  routeId: number,
) => {
  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/partes-trabajo/${parteId}/assign/${routeId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          // Aquí puedes añadir tokens de sesión si tu backend lo requiere
        },
      },
    );

    if (!response.ok) {
      return { success: false, error: "Error en el servidor backend" };
    }

    // Esto limpia la caché de la página del calendario para que los datos se refresquen
    revalidatePath("/features/dashboard/parte-trabajo");

    return { success: true };
  } catch (error) {
    console.error("Action Error:", error);
    return { success: false, error: "Fallo de conexión" };
  }
};

/**
 * Actions para Rutas
 */

export type FormStateRoute = {
  errors?: Record<string, string[]>;
  message?: string | null;
  success?: boolean;
};
export const createRouteForm = async (
  prevState: FormState,
  formData: FormData,
): Promise<FormStateRoute> => {
  const validateFields = CreateRouteForm.safeParse({
    title: formData.get("title")?.toString(),
    in_charge: formData.get("in_charge")?.toString(),
    userId: Number(formData.get("userId")),
    vehicleId: Number(formData.get("vehicleId")),
    factureId: Number(formData.get("factureId")),
    tools: formData.getAll("tools"),
    state: formData.get("state")?.toString(),
    amount_facture_route: Number(formData.get("amount_facture_route")),
    date: new Date(formData.get("date")?.toString() || ""),
    comments: formData.get("comments")?.toString(),
  });

  if (!validateFields.success) {
    return {
      errors: validateFields.error.flatten().fieldErrors,
      message: "No se encuentran los campos, Fallo al crear el usuario",
    };
  }

  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_BACKEND_URL || process.env.BACKEND_URL;

    const response = await fetch(`${baseUrl}/rutas`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(validateFields.data),
    });
    const errorData = await response.json();
    if (!response.ok) {
      return {
        success: false,
        message: errorData.message || "Error en el servidor",
        errors: {},
      };
    }

    revalidatePath("/features/dashboard/parte-trabajo");

    return { success: true, message: "Ruta creado con éxito", errors: {} };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Error en la base de datos";
    return { success: false, message: errorMessage, errors: {} };
  }
};
