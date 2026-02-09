// components/ModalCreateRoute.tsx
"use client";
import { useForm } from "react-hook-form";
import { EstadoParteTrabajo } from "../helpers/enums/part_work.enum";
import { TipoTrabajo } from "../helpers/enums/type_work.enum";
import { Categoria } from "../helpers/enums/category.enum";

interface ParteTrabajoFormData {
  title: string;
  description?: string;
  clientId: number;
  date: Date;
  address?: string;
  state: EstadoParteTrabajo;
  type_work: TipoTrabajo;
  category: Categoria;
  docs?: string;
  articleId: number;
  comment?: string;
  factureId: number;
  routeId: number;
  amount_facture_parte: number;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: ParteTrabajoFormData) => Promise<void>;
}

const ModalCreateRoute = ({ isOpen, onClose, onSave }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ParteTrabajoFormData>();

  if (!isOpen) return null;

  const onSubmit = async (data: ParteTrabajoFormData) => {
    await onSave(data);
    reset();
    onClose();
  };

  const inputStyles = (hasError: any) => `
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
          onSubmit={handleSubmit(onSubmit)}
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
              <label className={labelStyles}>ID Cliente</label>
              <input
                {...register("clientId", { required: true })}
                type="number"
                className={inputStyles(errors.clientId)}
              />
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
                <option value="">Seleccionar...</option>
                <option value="PENDIENTE text-black">Pendiente</option>
                <option value="EN_PROGRESO">En Progreso</option>
                <option value="FINALIZADO">Finalizado</option>
              </select>
            </div>

            <div>
              <label className={labelStyles}>Tipo de Trabajo</label>
              <select
                {...register("type_work", { required: true })}
                className={inputStyles(errors.type_work)}
              >
                <option value="">Seleccionar...</option>
                <option value="OBRA">Obra</option>
                <option value="MANTENIMIENTO">Mantenimiento</option>
                <option value="CORRECTIVO">Correctivo</option>
              </select>
            </div>

            <div>
              <label className={labelStyles}>Categoria</label>
              <select
                {...register("category", { required: true })}
                className={inputStyles(errors.category)}
              >
                <option value="">Seleccionar...</option>
                <option value="EXTINTORES">Extintores</option>
                <option value="INCENDIO">Incendio</option>
                <option value="ROBO">Robo</option>
              </select>
            </div>

            {/* Sección: IDs y Facturación */}
            <div>
              <label className={labelStyles}>ID Artículo</label>
              <input
                {...register("articleId")}
                type="number"
                className={inputStyles(errors.articleId)}
              />
            </div>
            <div>
              <label className={labelStyles}>ID Ruta</label>
              <input
                {...register("routeId")}
                type="number"
                className={inputStyles(errors.routeId)}
              />
            </div>
            <div>
              <label className={labelStyles}>ID Factura</label>
              <input
                {...register("factureId")}
                type="number"
                className={inputStyles(errors.factureId)}
              />
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
                className={`${inputStyles(errors.comment)} resize-none`}
              />
            </div>

            {/* File Upload */}
            <div className="md:col-span-2">
              <label className={labelStyles}>Documentación (Adjuntos)</label>
              <input
                {...register("docs")}
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
            onClick={() => {
              reset();
              onClose();
            }}
            className="px-4 py-2 text-gray-400 hover:text-white text-sm font-medium transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
            onClick={handleSubmit(onSubmit)}
            disabled={isSubmitting}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white px-8 py-2 rounded-lg text-sm font-bold transition-all"
          >
            {isSubmitting ? "Guardando..." : "Guardar Parte"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalCreateRoute;
