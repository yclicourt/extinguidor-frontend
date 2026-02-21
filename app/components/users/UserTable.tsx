import { Mail, ShieldCheck } from "lucide-react";
import { User } from "../../helpers/interfaces/user.interface";
import DeleteUser from "./DeleteUser";
import UserAvatar from "./UserAvatar";
import UpdateUserWrapper from "./UpdateUserWrapper";

const UserTable = async ({ data }: { data: User[] }) => {
  const getAvatarUrl = (avatarPath: string | null) => {
    if (!avatarPath) return null;

    // Si el avatar es el string por defecto, lo buscamos en el public del FRONTEND
    if (avatarPath === "avatar.svg") {
      return "/avatar.svg";
    }

    // Si es una URL completa (ej. Cloudinary), la usamos tal cual
    if (avatarPath.startsWith("http")) {
      return avatarPath;
    }

    // Si es una ruta local del backend (/uploads/...)
    return `${process.env.BACKEND_URL}${avatarPath}`;
  };
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="bg-slate-800 text-gray-300 border-white text-[11px] uppercase tracking-wider font-bold ">
            <th className="px-6 py-4">Usuario</th>
            <th className="px-6 py-4 text-center">Rol / Permisos</th>
            <th className="px-6 py-4 text-center">Estado</th>
            <th className="px-6 py-4 text-center">Última Actividad</th>
            <th className="px-6 py-4 text-right">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {data.map((user: User) => (
            <tr
              key={user.id}
              className="hover:bg-slate-50/50 transition-colors group"
            >
              <td className="px-6 py-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-700 flex items-center justify-center border border-slate-600">
                    {user.avatar ? (
                      <UserAvatar
                        src={getAvatarUrl(user.avatar) || "/avatar.svg"}
                        alt={user.name}
                      />
                    ) : (
                      <span className="text-xs font-bold text-white uppercase">
                        {user.name.charAt(0)}
                      </span>
                    )}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-gray-300">
                      {user.name}
                    </div>
                    <div className="text-xs text-slate-400 flex items-center gap-1">
                      <Mail size={12} /> {user.email}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center justify-center gap-2 text-sm text-slate-400 font-medium">
                  <ShieldCheck size={18} className="text-blue-500" />
                  {user.role}
                </div>
              </td>
              <td className="px-6 py-4 text-center text-xs font-bold">
                <span
                  className={`px-3 py-1 rounded-full ${
                    user.status === "ACTIVO"
                      ? "bg-green-300 text-green-600"
                      : "bg-slate-400 text-slate-800"
                  }`}
                >
                  {user.status}
                </span>
              </td>
              <td className="px-6 py-4 text-center text-xs text-slate-400 font-medium">
                {user.lastLogin
                  ? new Date(user.lastLogin).toLocaleDateString()
                  : "Nunca"}
              </td>
              <td className="px-6 py-4 text-right">
                <div className="flex justify-end gap-2">
                  <UpdateUserWrapper user={user} />
                  <DeleteUser id={user.id} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default UserTable;
