"use client";
import { useState } from "react";
import ModalCreateParteTrabajo from "../parte-trabajo/CreateWorkOrderModal";
import CreateParteTrabajo from "./CreateParteTrabajo";

interface PropsParteTrabajo {
  children: React.ReactNode;
}
const ParteTrabajoWrapper = ({ children }: PropsParteTrabajo) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <CreateParteTrabajo openModal={() => setIsModalOpen(true)} />
      {children}
      <ModalCreateParteTrabajo
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};
export default ParteTrabajoWrapper;
