import { Edit2 } from "lucide-react";
import { User } from "../../helpers/interfaces/user.interface";

interface PropsUpdateUser {
  user: User;
  onEdit: (user: User) => void;
}
const UpdateUser = ({ user, onEdit }: PropsUpdateUser) => {
  return (
    <button
      onClick={() => onEdit(user)}
      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
    >
      <Edit2 size={16} />
    </button>
  );
};
export default UpdateUser;
