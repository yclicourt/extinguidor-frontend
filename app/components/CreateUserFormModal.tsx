"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useActionState, useEffect } from "react";
import { createUserForm } from "../helpers/actions";
import { z } from "zod";
import { CreateUserForm } from "../helpers/schemas";
import { toast } from "sonner";

interface PropsModal {
  isOpen: boolean;
  onClose: () => void;
}
// Creamos un tipo para tipar la key en el useEffect
type CreateUserInputs = z.infer<typeof CreateUserForm>;

const CreateUserFormModal = ({ isOpen, onClose }: PropsModal) => {
  // Vinculo de la server Actions con useActionState
  const [state, formAction, isPending] = useActionState(createUserForm, {
    errors: {},
    message: null,
  });
  const {
    register,
    formState: { errors },
    reset,
    setError,
  } = useForm({
    resolver: zodResolver(CreateUserForm),
  });


  useEffect(() => {
    // Si no hay mensaje, no hacemos nada
    if (!state.message) return;

    // CASO: ERROR
    if (
      state.success === false ||
      (state.errors && Object.keys(state.errors).length > 0)
    ) {
      if (state.message?.toLowerCase().includes("teléfono")) {
        setError("phone", { type: "server", message: state.message });
      }

      if (state.message?.toLowerCase().includes("email")) {
        setError("email", { type: "server", message: state.message });
      }
      // Actualizamos el toast usando el ID para que deje de cargar
      toast.error(state.message || "Error en el servidor", {
        id: "create-user",
        duration: 5000, // Asegúrate de que dure lo suficiente para leerlo
      }); // Salimos para evitar procesar otros bloques

      if (state.errors) {
        Object.entries(state.errors).forEach(([key, errorMessages]) => {
          setError(key as keyof CreateUserInputs, {
            type: "server",
            message: errorMessages?.[0],
          });
        });
      }
      // IMPORTANTE: Limpiamos el mensaje del estado localmente si fuera posible,
      // pero como 'state' es de solo lectura, usaremos el onClose para resetear todo el componente.
    }

    // CASO: ÉXITO
    if (state.success) {
      toast.success(state.message, { id: "create-user" });

      // Usamos un pequeño delay para limpiar y cerrar
      const timer = setTimeout(() => {
        onClose(); // Esto debería desmontar el modal y con él su estado
        reset(); // Reset de React Hook Form
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [state, setError, onClose, reset]);

  if (!isOpen) return null;

  const inputStyles = (hasError: unknown) => `
    w-full bg-slate-700 border ${hasError ? "border-red-500" : "border-slate-600"} 
    rounded-lg p-2 text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm
  `;

  const labelStyles =
    "block text-[10px] text-gray-400 mb-1 uppercase font-bold tracking-wider";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-slate-800 border border-slate-600 w-full max-w-2xl rounded-xl shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header - Fijo */}
        <div className="p-5 border-b border-slate-700">
          <h2 className="text-xl font-bold text-white">Crear Nuevo Usuario</h2>
          <p className="text-gray-400 text-xs mt-1">
            Complete todos los campos para registrar el usuario.
          </p>
        </div>

        {/* Formulario - Con Scroll */}
        <form
          id="create-user-form"
          action={formAction}
          className="flex-1 overflow-y-auto p-6 custom-scrollbar"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            {/* Sección: Información Principal (Full Width) */}
            <div className="md:col-span-2 space-y-4">
              <div>
                <label className={labelStyles}>Nombre</label>
                <input
                  {...register("name")}
                  type="text"
                  className={inputStyles(errors.name)}
                  placeholder="Ej: Juan Carlos"
                />
                {errors.name && (
                  <p className="text-red-500 text-[10px] mt-1 italic">
                    {errors.name.message as string}
                  </p>
                )}
              </div>

              <div>
                <label className={labelStyles}>Apellido</label>
                <input
                  {...register("lastname")}
                  type="text"
                  className={inputStyles(errors.lastname)}
                  placeholder="Ej: Licourt Maqueira"
                />
                {errors.lastname && (
                  <p className="text-red-500 text-[10px] mt-1 italic">
                    {errors.lastname.message as string}
                  </p>
                )}
              </div>
            </div>

            {/* Sección: Datos del Cliente y Ubicación */}
            <div className="md:col-span-2">
              <label className={labelStyles}>Email</label>
              <input
                {...register("email")}
                type="email"
                className={inputStyles(errors.email)}
                placeholder="admin@gmail.co"
              />
              {errors.email && (
                <p className="text-red-500 text-[10px] mt-1 italic">
                  {errors.email.message as string}
                </p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className={labelStyles}>Dirección</label>
              <input
                {...register("address")}
                type="text"
                className={inputStyles(errors.address)}
                placeholder="Calle, número, ciudad..."
              />
              {errors.address && (
                <p className="text-red-500 text-[10px] mt-1 italic">
                  {errors.address.message as string}
                </p>
              )}
            </div>

            {/* Sección: Selectores */}
            <div>
              <label className={labelStyles}>Estado</label>
              <select
                {...register("status")}
                className={inputStyles(errors.status)}
              >
                <option value="" disabled>
                  Seleccionar...
                </option>
                <option value="ACTIVE">ACTIVE</option>
                <option value="INACTIVE">INACTIVE</option>
                <option value="OFFLINE">OFFLINE</option>
              </select>
              {errors.status && (
                <p className="text-red-500 text-[10px] mt-1 italic">
                  {errors.status.message as string}
                </p>
              )}
            </div>

            <div>
              <label className={labelStyles}>Role</label>
              <select
                {...register("role")}
                className={inputStyles(errors.role)}
              >
                <option value="" disabled>
                  Seleccionar...
                </option>
                <option value="ADMINISTRADOR">ADMINISTRADOR</option>
                <option value="TRABAJADOR">TRABAJADOR</option>
              </select>
              {errors.role && (
                <p className="text-red-500 text-[10px] mt-1 italic">
                  {errors.role.message as string}
                </p>
              )}
            </div>

            {/* Sección: IDs y Facturación */}
            <div>
              <label className={labelStyles}>Teléfono</label>
              <input
                {...register("phone")}
                type="tel"
                className={inputStyles(errors.phone)}
                placeholder="123456678"
              />
              {errors.phone && (
                <p className="text-red-500 text-[10px] mt-1 italic">
                  {errors.phone.message as string}
                </p>
              )}
            </div>

            <div>
              <label className={labelStyles}>Contraseña</label>
              <input
                {...register("password")}
                type="password"
                className={inputStyles(errors.password)}
                placeholder="Ej: mipassword.123"
              />
              {errors.password && (
                <p className="text-red-500 text-[10px] mt-1 italic">
                  {errors.password.message as string}
                </p>
              )}
            </div>

            {/* File Upload */}
            <div className="md:col-span-2">
              <label className={labelStyles}>Ávatar</label>
              <input
                {...register("avatar")}
                type="file"
                className="block w-full text-xs text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 cursor-pointer"
              />
            </div>
          </div>
        </form>

        {/* Footer - Fijo */}
        <div className="p-5 border-t border-slate-700 bg-slate-800/50 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-gray-400 hover:text-white text-sm font-medium transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
            form="create-user-form"
            disabled={isPending}
            onClick={() => {
              // Solo disparamos el loading si el formulario es válido visualmente
              if (Object.keys(errors).length === 0) {
                toast.loading("Registrando usuario...", { id: "create-user" });
              }
            }}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white px-8 py-2 rounded-lg text-sm font-bold transition-all"
          >
            {isPending ? "Guardando..." : "Guardar Usuario"}
            {}
          </button>
        </div>
      </div>
    </div>
  );
};
export default CreateUserFormModal;
