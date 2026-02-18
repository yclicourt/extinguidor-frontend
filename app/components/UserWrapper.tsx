"use client";
import { useState } from "react";
import CreateUserFormModal from "./CreateUserFormModal";
import HeaderUser from "./HeaderUser";

interface PropsUser {
  children: React.ReactNode;
}
const UserWrapper = ({ children }: PropsUser) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <HeaderUser openModal={() => setIsModalOpen(true)} />
      {children}
      {isModalOpen && (
        <CreateUserFormModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};
export default UserWrapper;
