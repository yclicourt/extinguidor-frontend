"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useActionState, useEffect, useState } from "react";
import { z } from "zod";
import { CreateRouteForm } from "../../helpers/schemas";
import { toast } from "sonner";
import { fetchIdsCollections } from "@/app/helpers/api";
import { Vehicle } from "@/app/helpers/interfaces/vehicle.interface";
import { User } from "@/app/helpers/interfaces/user.interface";
import { Facture } from "@/app/helpers/interfaces/facture.interface";
import { createRouteForm } from "@/app/helpers/actions";
import { format } from "date-fns";

interface PropsModal {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  defaultDate?: Date;
}
// Creamos un tipo para tipar la key en el useEffect
type CreateRouteInputs = z.infer<typeof CreateRouteForm>;

const CreateRouteFormModal = ({
  isOpen,
  onClose,
  onSuccess,
  defaultDate,
}: PropsModal) => {
  // Vinculo de la server Actions con useActionState
  const [state, formAction, isPending] = useActionState(createRouteForm, {
    errors: {},
    message: null,
  });
  const {
    register,
    formState: { errors },
    reset,
    setError,
    setValue,
  } = useForm({
    resolver: zodResolver(CreateRouteForm),
    defaultValues: {
      date: defaultDate ? format(defaultDate, "yyyy-MM-dd") : "",
    },
  });

  // Estados para los ids correspondientes
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [factures, setFactures] = useState<Facture[]>([]);

  // Convertimos a string por seguridad (maneja arrays o strings)
  const messageText = Array.isArray(state.message)
    ? state.message[0]
    : String(state.message);

  const messageLower = messageText.toLowerCase();

  useEffect(() => {
    const loadDataIds = async () => {
      if (isOpen) {
        const { dataVehicles, dataUsers, dataFactures } =
          await fetchIdsCollections();

        setVehicles(dataVehicles);
        setUsers(dataUsers);
        setFactures(dataFactures);
      }
    };
    loadDataIds();
  }, [isOpen]);

  // Si la fecha seleccionada cambia mientras el modal está abierto (poco probable pero útil)
  useEffect(() => {
    if (defaultDate) {
      setValue("date", format(defaultDate, "yyyy-MM-dd"));
    }
  }, [defaultDate, setValue]);

  useEffect(() => {
    // Si no hay mensaje, no hacemos nada
    if (!state.message) return;

    // CASO: ERROR
    if (
      state.success === false ||
      (state.errors && Object.keys(state.errors).length > 0)
    ) {
      if (messageLower.includes("título")) {
        setError("title", { type: "server", message: state.message });
      }

      if (messageLower.includes("encargado")) {
        setError("in_charge", { type: "server", message: state.message });
      }
      // Actualizamos el toast usando el ID para que deje de cargar
      toast.error(state.message || "Error en el servidor", {
        id: "create-route",
        duration: 5000, // Asegúrate de que dure lo suficiente para leerlo
      }); // Salimos para evitar procesar otros bloques

      if (state.errors) {
        Object.entries(state.errors).forEach(([key, errorMessages]) => {
          setError(key as keyof CreateRouteInputs, {
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
      toast.success(state.message, { id: "create-route" });
      if (onSuccess) onSuccess();
      // Usamos un pequeño delay para limpiar y cerrar
      const timer = setTimeout(() => {
        onClose(); // Esto debería desmontar el modal y con él su estado
        reset(); // Reset de React Hook Form
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [state, setError, onClose, reset, messageLower, onSuccess]);

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
          <h2 className="text-xl font-bold text-white">Crear Nueva Ruta</h2>
          <p className="text-gray-400 text-xs mt-1">
            Complete todos los campos para registrar una ruta.
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
                <label className={labelStyles}>Título</label>
                <input
                  {...register("title")}
                  type="text"
                  className={inputStyles(errors.title)}
                  placeholder="Ruta 305.."
                />
                {errors.title && (
                  <p className="text-red-500 text-[10px] mt-1 italic">
                    {errors.title.message as string}
                  </p>
                )}
              </div>

              <div>
                <label className={labelStyles}>Encargado</label>
                <input
                  {...register("in_charge")}
                  type="text"
                  className={inputStyles(errors.in_charge)}
                  placeholder="Manuel Rosales.."
                />
                {errors.in_charge && (
                  <p className="text-red-500 text-[10px] mt-1 italic">
                    {errors.in_charge.message as string}
                  </p>
                )}
              </div>
            </div>
            {/* Sección: Datos del Cliente y Ubicación */}
            <div className="md:col-span-2">
              <label className={labelStyles}>Usuario</label>
              <select
                {...register("userId")}
                className={inputStyles(errors.userId)}
              >
                <option value="">Seleccione un usuario...</option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </select>
              {errors.userId && (
                <p className="text-red-500 text-[10px] mt-1 italic">
                  {errors.userId.message as string}
                </p>
              )}
            </div>
            <div className="md:col-span-2">
              <label className={labelStyles}>Vehiculo</label>
              <select
                {...register("vehicleId")}
                className={inputStyles(errors.vehicleId)}
              >
                <option value="">Seleccione un vehículo...</option>
                {vehicles.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.matricule}
                  </option>
                ))}
              </select>
              {errors.vehicleId && (
                <p className="text-red-500 text-[10px] mt-1 italic">
                  {errors.vehicleId.message as string}
                </p>
              )}
            </div>
            <div className="md:col-span-2">
              <label className={labelStyles}>Factura</label>
              <select
                {...register("factureId")}
                className={inputStyles(errors.factureId)}
              >
                <option value="">Seleccione una factura...</option>
                {factures.map((f) => (
                  <option key={f.id} value={f.id}>
                    {f.facture_amount}
                  </option>
                ))}
              </select>
              {errors.factureId && (
                <p className="text-red-500 text-[10px] mt-1 italic">
                  {errors.factureId.message as string}
                </p>
              )}
            </div>
            {/* Sección: Selectores */}
            <div>
              <label className={labelStyles}>Herramientas</label>
              <select
                multiple
                {...register("tools")}
                className={inputStyles(errors.tools)}
              >
                <option value="" disabled>
                  Seleccionar Herramienta...
                </option>
                <option value="EXTINTOR">EXTINTOR</option>
                <option value="MARTILLO">MARTILLO</option>
                <option value="DESTORNILLADORES">DESTORNILLADORES</option>
                <option value="CINTRA METRICA">CINTRA METRICA</option>
                <option value="PINZAS">PINZAS</option>
              </select>
              {errors.tools && (
                <p className="text-red-500 text-[10px] mt-1 italic">
                  {errors.tools.message as string}
                </p>
              )}
            </div>
            <div>
              <label className={labelStyles}>Estado del Parte de Trabajo</label>
              <select
                {...register("state")}
                className={inputStyles(errors.state)}
              >
                <option value="" disabled>
                  Seleccionar...
                </option>
                <option value="PENDIENTE">PENDIENTE</option>
                <option value="EN_PROGRESO">EN_PROGRESO</option>
                <option value="FINALIZADO">FINALIZADO</option>
              </select>
              {errors.state && (
                <p className="text-red-500 text-[10px] mt-1 italic">
                  {errors.state.message as string}
                </p>
              )}
            </div>
            {/* Sección: IDs y Facturación */}
            <div>
              <label className={labelStyles}>Monto Factura</label>
              <input
                {...register("amount_facture_route")}
                type="number"
                className={inputStyles(errors.amount_facture_route)}
                placeholder="$1000"
              />
              {errors.amount_facture_route && (
                <p className="text-red-500 text-[10px] mt-1 italic">
                  {errors.amount_facture_route.message as string}
                </p>
              )}
            </div>
            <div>
              <label className={labelStyles}>Fecha</label>
              <input
                {...register("date")}
                type="date"
                className={inputStyles(errors.date)}
                placeholder="Ej: 2/2/26"
              />
              {errors.date && (
                <p className="text-red-500 text-[10px] mt-1 italic">
                  {errors.date.message as string}
                </p>
              )}
            </div>
            <div>
              <label className={labelStyles}>Comentarios</label>
              <textarea
                {...register("comments")}
                className={inputStyles(errors.comments)}
                placeholder="Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente, rem."
              />

              {errors.comments && (
                <p className="text-red-500 text-[10px] mt-1 italic">
                  {errors.comments.message as string}
                </p>
              )}
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
                toast.loading("Registrando ruta...", { id: "create-route" });
              }
            }}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white px-8 py-2 rounded-lg text-sm font-bold transition-all"
          >
            {isPending ? "Guardando..." : "Guardar Ruta"}
            {}
          </button>
        </div>
      </div>
    </div>
  );
};
export default CreateRouteFormModal;
