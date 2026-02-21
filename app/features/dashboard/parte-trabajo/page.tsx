import CalendarWrapper from "@/app/components/calendar/CalendarWrapper";

interface Props {
  children: React.ReactNode;
}
const ParteTrabajo = ({ children }: Props) => {
  return (
    <div className="flex flex-col h-screen p-6">
      {/* Header Superior */}

      {/* <ParteTrabajoWrapper>
      </ParteTrabajoWrapper> */}
      <div className="flex gap-6 flex-1 overflow-hidden">
        {/* Sección Izquierda */}
        <div className="flex-3 rounded-xl shadow-sm flex flex-col">
          {/* <Calendar /> */}
          <CalendarWrapper>{children}</CalendarWrapper>
        </div>
      </div>
    </div>
  );
};

export default ParteTrabajo;
