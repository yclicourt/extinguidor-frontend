import Pagination from "@/app/components/Pagination";
import SearchUser from "@/app/components/Search";
import UserTable from "@/app/components/UserTable";
import UserWrapper from "@/app/components/UserWrapper";
import { fetchUsers } from "@/app/helpers/api";
import { Suspense } from "react";

interface PropsUser {
  searchParams: Promise<{
    currentPage?: number;
    query?: string;
  }>;
}
const GestionUsuarios = async ({ searchParams }: PropsUser) => {
  const { data, params, totalPages } = await fetchUsers({ searchParams });
  const filters = await searchParams;
  const query = filters.query || "";
  return (
    <div className="flex flex-col flex-1 p-8 bg-gray-300">
      {/* Header Superior */}
      <UserWrapper>
        {/* Contenedor de Tabla */}
        <div className="bg-slate-800 rounded-[20px] shadow-sm border border-slate-200 overflow-hidden">
          {/* Barra de Búsqueda */}
          <div className="p-5 border-b border-slate-500 flex gap-4">
            <div className="relative flex-1 max-w-md">
              <SearchUser />
            </div>
          </div>

          {/* Tabla Real */}
          <Suspense key={query} fallback={<p>Cargando data .....</p>}>
            <UserTable data={data} />
            {
              <Pagination
                totalPages={totalPages}
                currentPage={params.currentPage}
              />
            }
          </Suspense>
        </div>
      </UserWrapper>
    </div>
  );
};

export default GestionUsuarios;
