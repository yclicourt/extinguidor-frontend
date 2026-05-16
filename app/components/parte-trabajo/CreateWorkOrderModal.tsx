// components/ModalCreateRoute.tsx
"use client";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import { CreateParteTrabajoForm } from "@/app/helpers/schemas";
import { useActionState, useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { createParteTrabajoForm } from "@/app/helpers/actions";
import { toast } from "sonner";
import { Ruta } from "@/app/helpers/interfaces/ruta.interface";
import { Facture } from "@/app/helpers/interfaces/facture.interface";
import { Client } from "@/app/helpers/interfaces/client.inteface";
import { Articule } from "@/app/helpers/interfaces/articule.interface";
import { fetchIdsCollectionsParteTrabajo } from "@/app/helpers/api";
import Image from "next/image";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

type CreateParteTrabajoInputs = z.infer<typeof CreateParteTrabajoForm>;

const CreateWorkOrderModal = ({ isOpen, onClose }: Props) => {
  const [clients, setClients] = useState<Client[]>([]);
  const [articules, setArticules] = useState<Articule[]>([]);
  const [rutas, setRutas] = useState<Ruta[]>([]);
  const [factures, setFactures] = useState<Facture[]>([]);

  const [state, formAction, isPending] = useActionState(
    createParteTrabajoForm,
    {
      errors: {},
      message: null,
    },
  );
  const {
    register,
    formState: { errors },
    reset,
    setError,
    control,
  } = useForm({
    resolver: zodResolver(CreateParteTrabajoForm),
  });

  // Vigilamos el campo avatar
  const imageFile = useWatch({ control, name: "imageDoc" });

  // Lógica para decidir qué imagen mostrar
  const getImagePreview = () => {
    if (imageFile instanceof FileList && imageFile.length > 0) {
      // Si hay un archivo seleccionado, creamos una URL temporal
      return URL.createObjectURL(imageFile[0]);
    }
    // Si no hay nada, usamos la de la carpeta public
    return "/unknown.png";
  };

  const messageText = Array.isArray(state.message)
    ? state.message[0]
    : String(state.message);

  const messageLower = messageText.toLowerCase();

  useEffect(() => {
    const loadDataIds = async () => {
      if (isOpen) {
        const { dataArticules, dataClients, dataFactures, dataRutas } =
          await fetchIdsCollectionsParteTrabajo();

        setArticules(dataArticules);
        setClients(dataClients);
        setFactures(dataFactures);
        setRutas(dataRutas?.data);
      }
    };
    loadDataIds();
  }, [isOpen]);

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

      // Actualizamos el toast usando el ID para que deje de cargar
      toast.error(state.message || "Error en el servidor", {
        id: "create-parte-trabajo",
        duration: 5000, // Asegúrate de que dure lo suficiente para leerlo
      }); // Salimos para evitar procesar otros bloques

      if (state.errors) {
        Object.entries(state.errors).forEach(([key, errorMessages]) => {
          setError(key as keyof CreateParteTrabajoInputs, {
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
      toast.success(state.message, { id: "create-parte-trabajo" });
      // Usamos un pequeño delay para limpiar y cerrar
      const timer = setTimeout(() => {
        onClose(); // Esto debería desmontar el modal y con él su estado
        reset(); // Reset de React Hook Form
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [state, setError, onClose, reset, messageLower]);

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
          <h2 className="text-xl font-bold text-white">
            Crear Nuevo Parte de Trabajo
          </h2>
          <p className="text-gray-400 text-xs mt-1">
            Complete todos los campos para registrar el parte.
          </p>
        </div>

        {/* Formulario - Con Scroll */}
        <form
          id="create-parte-trabajo-form"
          action={formAction}
          className="flex-1 overflow-y-auto p-6 custom-scrollbar"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            {/* Sección: Información Principal (Full Width) */}
            <div className="md:col-span-2 space-y-4">
              <div>
                <label className={labelStyles}>Título del Parte</label>
                <input
                  {...register("title", {
                    required: "El título es obligatorio",
                  })}
                  type="text"
                  className={inputStyles(errors.title)}
                  placeholder="Ej: Revisión de extintores"
                />
                {errors.title && (
                  <p className="text-red-500 text-[10px] mt-1">
                    {errors.title.message}
                  </p>
                )}
              </div>

              <div>
                <label className={labelStyles}>Descripción Detallada</label>
                <textarea
                  {...register("description", {
                    required: "La descripción es obligatoria",
                  })}
                  rows={3}
                  className={`${inputStyles(errors.description)} resize-none`}
                  placeholder="Detalles del trabajo a realizar..."
                />
              </div>
            </div>

            {/* Sección: Datos del Cliente y Ubicación */}
            <div>
              <label className={labelStyles}>Cliente</label>
              <select
                {...register("clientId")}
                className={inputStyles(errors.clientId)}
              >
                <option value="">Seleccione un cliente...</option>
                {clients.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className={labelStyles}>Fecha del Trabajo</label>
              <input
                {...register("date", { required: true })}
                type="date"
                className={inputStyles(errors.date)}
              />
            </div>

            <div className="md:col-span-2">
              <label className={labelStyles}>Dirección</label>
              <input
                {...register("address")}
                type="text"
                className={inputStyles(errors.address)}
                placeholder="Calle, número, ciudad..."
              />
            </div>

            {/* Sección: Selectores */}
            <div>
              <label className={labelStyles}>Estado</label>
              <select
                {...register("state", { required: true })}
                className={inputStyles(errors.state)}
              >
                <option value="" disabled>
                  Seleccionar...
                </option>
                <option value="PENDIENTE">PENDIENTE</option>
                <option value="EN_PROGRESO">EN PROGRESO</option>
                <option value="FINALIZADO">FINALIZADO</option>
              </select>
            </div>

            <div>
              <label className={labelStyles}>Tipo de Trabajo</label>
              <select
                {...register("type_work", { required: true })}
                className={inputStyles(errors.type_work)}
              >
                <option value="" disabled>
                  Seleccionar...
                </option>
                <option value="OBRA">OBRA</option>
                <option value="MANTENIMIENTO">MANTENIMIENTO</option>
                <option value="CORRECTIVO">CORRECTIVO</option>
              </select>
            </div>

            <div>
              <label className={labelStyles}>Categoria</label>
              <select
                {...register("category", { required: true })}
                className={inputStyles(errors.category)}
              >
                <option value="" disabled>
                  Seleccionar...
                </option>
                <option value="EXTINTORES">EXTINTORES</option>
                <option value="INCENDIO">INCENDIO</option>
                <option value="ROBO">ROBO</option>
              </select>
            </div>

            {/* Sección: IDs y Facturación */}
            <div>
              <label className={labelStyles}>Artículo</label>
              <select
                {...register("articuleId")}
                className={inputStyles(errors.articuleId)}
              >
                <option value="">Seleccione un articulo...</option>
                {articules.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.title}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelStyles}>Ruta</label>
              <select
                {...register("routeId")}
                className={inputStyles(errors.routeId)}
              >
                <option value="">Seleccione una ruta...</option>
                {rutas.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.title}
                  </option>
                ))}
              </select>
            </div>
            <div>
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
            </div>

            <div>
              <label className={labelStyles}>Importe (€)</label>
              <input
                {...register("amount_facture_parte")}
                type="number"
                step="0.01"
                className={inputStyles(errors.amount_facture_parte)}
              />
            </div>

            {/* Comentarios finales (Full Width) */}
            <div className="md:col-span-2">
              <label className={labelStyles}>Comentarios Internos</label>
              <textarea
                {...register("comment")}
                rows={2}
                placeholder="Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae, cupiditate?"
                className={`${inputStyles(errors.comment)} resize-none`}
              />
            </div>

            {/* File Upload */}
            <div className="md:col-span-2 flex items-center gap-4 bg-slate-700/30 p-4 rounded-lg border border-slate-600">
              <div className="flex-1">
                <label className={labelStyles}>Documentación (Adjuntos)</label>
                <input
                  {...register("docs")}
                  type="file"
                  className="block w-full text-xs text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 cursor-pointer"
                />
              </div>
            </div>
            <div className="md:col-span-2 flex items-center gap-4 bg-slate-700/30 p-4 rounded-lg border border-slate-600">
              <div className="relative shrink-0">
                <Image
                  src={getImagePreview()}
                  height={80}
                  width={80}
                  className="rounded-full object-cover border-2 border-blue-500 shadow-lg"
                  alt="Preview image"
                />
              </div>

              <div className="flex-1">
                <label className={labelStyles}>Foto Documento</label>
                <input
                  {...register("imageDoc")}
                  type="file"
                  accept="image/*"
                  className="block w-full text-xs text-slate-400 
                                file:mr-4 file:py-2 file:px-4 
                                file:rounded-full file:border-0 
                                file:text-xs file:font-semibold 
                                file:bg-blue-600 file:text-white 
                                hover:file:bg-blue-700 cursor-pointer"
                />
                <p className="text-[9px] text-gray-500 mt-1">
                  Si no seleccionas una, se asignará una por defecto.
                </p>
              </div>
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
            form="create-parte-trabajo-form"
            disabled={isPending}
            onClick={() => {
              // Solo disparamos el loading si el formulario es válido visualmente
              if (Object.keys(errors).length === 0) {
                toast.loading("Registrando parte...", {
                  id: "create-parte-trabajo",
                });
              }
            }}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white px-8 py-2 rounded-lg text-sm font-bold transition-all"
          >
            {isPending ? "Guardando..." : "Guardar Parte"}
            {}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateWorkOrderModal;
