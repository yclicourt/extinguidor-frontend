"use client";
import { useState } from "react";
import HeaderCalendar from "./HeaderCalendar";  
import ModalCreateRoute from "./CreateWorkOrderModal";
import { ParteTrabajo } from "../helpers/interfaces/parte-trabajo.interface";

interface PropsParteTrabajo {
  children: React.ReactNode;
}
const ParteTrabajoWrapper = ({ children }: PropsParteTrabajo) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSaveOrder = async (data: ParteTrabajo) => {
    try {
      const response = await fetch(`${process.env.BACKEND_URL}/parte-trabajo`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          status: "PENDIENTE",
        }),
      });

      if (!response.ok) throw new Error("Error al crear un parte de trabajo");

      alert("Parte trabajo creada con éxito");
    } catch (error) {
      console.error(error);
      alert("Hubo un fallo al guardar");
    }
  };
  return (
    <>
      <HeaderCalendar openModal={() => setIsModalOpen(true)} />
      {children}
      <ModalCreateRoute
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveOrder}
      />
    </>
  );
};
export default ParteTrabajoWrapper;
