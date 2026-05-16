"use client";

import { useState } from "react";
import CreateRouteFormModal from "./CreateRouteFormModal";
import CreateRoute from "./CreateRoute";


interface PropsRoute {
  children: React.ReactNode;
  selectedDay: Date;
  onRouteCreated: () => void;
}

const RouteWrapper = ({
  children,
  selectedDay,
  onRouteCreated,
}: PropsRoute) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <CreateRoute openModal={() => setIsModalOpen(true)} />
      {children}
      {isModalOpen && (
        <CreateRouteFormModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSuccess={onRouteCreated}
          defaultDate={selectedDay}
        />
      )}
    </>
  );
};
export default RouteWrapper;
