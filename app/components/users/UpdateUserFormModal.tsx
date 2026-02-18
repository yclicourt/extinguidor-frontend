import { z } from "zod";
import { UpdateUserForm } from "../../helpers/schemas";
import { editUserForm } from "../../helpers/actions";
import { useActionState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

interface PropsModal {
  isOpen: boolean;
  onClose: () => void;
  user: UpdateUserInputs | null;
}
// Creamos un tipo para tipar la key en el useEffect
type UpdateUserInputs = z.infer<typeof UpdateUserForm>;

const UpdateUserFormModal = ({ isOpen, onClose, user }: PropsModal) => {
  // Vinculo de la server Actions con useActionState
  const [state, formAction, isPending] = useActionState(editUserForm, {
    errors: {},
    message: null,
    success: false,
  });
  const {
    register,
    formState: { errors },
    reset,
    setError,
  } = useForm({
    resolver: zodResolver(UpdateUserForm),
  });

  useEffect(() => {
    if (isOpen && user) {
      reset({
        id: user.id,
        name: user.name,
        lastname: user.lastname,
        email: user.email,
        address: user.address,
        status: user.status,
        role: user.role,
        phone: user.phone,
        // No reseteamos el password ni el avatar aquí por seguridad
      });
    }
  }, [isOpen, user, reset]);

  useEffect(() => {
    // Si no hay mensaje, no hacemos nada
    if (!state.message) return;

    if (state.errors) {
      Object.entries(state.errors).forEach(([key, errorMessages]) => {
        if (errorMessages && errorMessages.length > 0) {
          // Casteamos la key con el type que creamos
          setError(key as keyof UpdateUserInputs, {
            type: "server",
            message: errorMessages[0],
          });
        }
      });
    }

    if (state.success === false && state.message) {
      toast.error(state.message); // Notificación roja de error
    }
    if (state.success) {
      toast.success("Usuario actualizado correctamente");
      onClose();
      reset();
    }
  }, [state, setError, onClose, reset]);
  if (!isOpen) return null;

  const handleFormAction = async (formData: FormData) => {
    // Podrías añadir validaciones extra aquí si quisieras
    formAction(formData);
  };

  const inputStyles = (hasError: unknown) => `
    w-full appearance-none bg-slate-700 border ${hasError ? "border-red-500" : "border-slate-600"}
    rounded-lg p-2 text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm
  `;

  const labelStyles =
    "block text-left appearance-none text-[10px] text-gray-400 mb-1 uppercase font-bold tracking-wider";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-slate-800 border border-slate-600 w-full max-w-2xl rounded-xl shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header - Fijo */}
        <div className="p-5 border-b border-slate-700">
          <h2 className="text-xl text-left font-bold text-white">
            Actualizar un usuario
          </h2>
          <p className="text-gray-400 text-left text-xs mt-1">
            Complete todos los campos para registrar el usuario.
          </p>
        </div>

        {/* Formulario - Con Scroll */}
        <form
          id="update-user-form"
          action={handleFormAction}
          className="flex-1 overflow-y-auto p-6 custom-scrollbar"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            {/* Sección: Información Principal (Full Width) */}
            <div className="md:col-span-2 space-y-4">
              <div>
                <label className={labelStyles} hidden>
                  ID
                </label>
                <input
                  {...register("id")}
                  type="hidden"
                  name="id"
                  className={inputStyles(errors.id)}
                  placeholder="Ej: 1"
                />
                {errors.id && (
                  <p className="text-red-500 text-[10px] mt-1 italic">
                    {errors.id.message as string}
                  </p>
                )}
              </div>
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
                <option value="ACTIVO">ACTIVO</option>
                <option value="INACTIVO">INACTIVO</option>
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
                name="avatar"
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
            form="update-user-form"
            disabled={isPending}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white px-8 py-2 rounded-lg text-sm font-bold transition-all"
          >
            {isPending ? "Actualizando..." : "Editar Usuario"}
          </button>
        </div>
      </div>
    </div>
  );
};
export default UpdateUserFormModal;
