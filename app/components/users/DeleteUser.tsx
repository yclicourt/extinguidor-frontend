"use client";
import { Trash2 } from "lucide-react";
import { deleteUserForm } from "../../helpers/actions";
import { toast } from "sonner";

const DeleteUser = ({ id }: { id: number }) => {
  const handleOnClick = async () => {
    const toastId = toast.loading("Eliminando usuario...");

    try {
      const result = await deleteUserForm(id);
      if (result.success) {
        toast.success("Usuario eliminado correctamente", { id: toastId });
      } else {
        toast.error(result.message, { id: toastId });
      }
    } catch (error) {
      console.log(error);
      toast.error("Error de conexion con el servidor", { id: toastId });
    }
  };
  return (
    <button
      onClick={handleOnClick}
      className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
    >
      <Trash2 size={16} />
    </button>
  );
};
export default DeleteUser;
