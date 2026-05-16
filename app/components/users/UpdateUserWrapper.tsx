"use client";

import { useState } from "react";
import UpdateUser from "./UpdateUser";
import UpdateUserFormModal from "./UpdateUserFormModal";
import { User } from "../../helpers/interfaces/user.interface";

const UpdateUserWrapper = ({ user }: { user: User }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <UpdateUser user={user} onEdit={() => setIsModalOpen(true)} />
      {isModalOpen && (
        <UpdateUserFormModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          user={{ ...user, avatar: undefined, role: [user.role] }}
        />
      )}
    </>
  );
};
export default UpdateUserWrapper;
