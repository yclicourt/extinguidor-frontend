import { Facture } from "./interfaces/facture.interface";
import { ParteTrabajo } from "./interfaces/parte-trabajo.interface";
import { Ruta } from "./interfaces/ruta.interface";
import { User } from "./interfaces/user.interface";
import { Vehicle } from "./interfaces/vehicle.interface";

/**
 * All fetching data to Dashboard View
 */

// Method to Fetching Card Data
export const fetchCardData = async () => {
  try {
    const [
      getTotalFactures,
      getTotalRoutesFinalizes,
      getTotalParteTrabajoPending,
      getTotalUsersActivesWorkers,
    ] = await Promise.all([
      fetch(`${process.env.BACKEND_URL}/factures`),
      fetch(`${process.env.BACKEND_URL}/rutas/count`),
      fetch(`${process.env.BACKEND_URL}/partes-trabajo/count-pending`),
      fetch(`${process.env.BACKEND_URL}/users/count`),
    ]);

    const resultFactureBinding = await getTotalFactures.json();
    const resultRoutesFinalizes = await getTotalRoutesFinalizes.json();
    const resultParteTrabajoPending = await getTotalParteTrabajoPending.json();
    const resultUsersActivesWorkers = await getTotalUsersActivesWorkers.json();

    // Sumamos el total de TODAS las facturas del array
    // Sumamos tanto los partes directos como los de rutas
    const totalBinding = resultFactureBinding.reduce(
      (acc: number, item: Facture) => {
        const sum =
          (Number(item.facture_parts) || 0) +
          (Number(item.facture_work_parts) || 0);
        return acc + sum;
      },
      0,
    );

    const numberOfFactureBinding = totalBinding;
    const numberOfResultFinalizes = Number(resultRoutesFinalizes ?? "0");
    const numberOfParteTrabajoPending = Number(
      resultParteTrabajoPending ?? "0",
    );
    const numberOfUsersActivesWorkers = Number(
      resultUsersActivesWorkers ?? "0",
    );

    return {
      numberOfFactureBinding,
      numberOfResultFinalizes,
      numberOfParteTrabajoPending,
      numberOfUsersActivesWorkers,
    };
  } catch (error) {
    console.log("error: ", error);
    throw new Error("Failed to fetch card data");
  }
};

// Method to fetching data to chart component
export const fetchChartRoutes = async () => {
  try {
    const fetchRoutes = await fetch(`${process.env.BACKEND_URL}/rutas/stats`);
    const resultChartRoute = await fetchRoutes.json();
    return resultChartRoute;
  } catch (error) {
    console.log("error: ", error);
    throw new Error("Failed to fetch fetchRoute data");
  }
};

// Method to fetching data to table component
interface PropsTable {
  searchParams: { tab?: string; month?: string; year?: string; page?: string };
}
export const fetchTablePartsWorks = async ({
  searchParams,
  limit = 5,
}: PropsTable & { limit?: number }) => {
  const params = searchParams || {};
  try {
    const today = new Date();

    const month = params.month ? parseInt(params.month) : today.getMonth();
    const year = params.year ? parseInt(params.year) : today.getFullYear();

    // Obtenemos la pestaña de la URL o por defecto 'assigned'
    const activeTab = params.tab || "assigned";
    const isAssigned = activeTab === "assigned";

    // Obtener la pagina actual
    const currentPage = params.page ? parseInt(params.page) : 1;

    const url = `${process.env.BACKEND_URL}/partes-trabajo/listado?month=${month}&year=${year}&assigned=${isAssigned}&page=${currentPage}&limit=${limit}`;

    const fetchTables = await fetch(url, {
      cache: "no-store",
    });
    const resultFetchTables = await fetchTables.json();

    return {
      data: resultFetchTables.data,
      totalPages: resultFetchTables.totalPages,
      params: { month, year, activeTab, currentPage, limit },
    };
  } catch (error) {
    console.log("error: ", error);
    throw new Error("Failed to fetch fetchRoute data");
  }
};

/**
 * All fetching data to ParteTrabajo View
 */

export const fetchRoutesGest = async ({
  limit = 5,
}: { limit?: number } = {}) => {
  try {
    const fetchRoutes = await fetch(
      `${process.env.BACKEND_URL}/rutas?limit=${limit}`,
      {
        cache: "no-store",
      },
    );

    const resultFetchRoutes = await fetchRoutes.json();

    return {
      data: resultFetchRoutes,
      params: { limit },
    };
  } catch (error) {
    console.log("error", error);
    throw new Error("Failed to fetching RouteGest data");
  }
};

/**
 * All fetching data to users view
 */

interface PropsUser {
  searchParams: Promise<{ page?: string; query?: string }>;
}
export const fetchUsers = async ({
  searchParams,
  limit = 5,
}: PropsUser & { limit?: number }) => {
  const params = (await searchParams) || {};
  const searchTerm = params.query || "";
  try {
    const currentPage = params.page ? parseInt(params.page) : 1;
    const baseUrl =
      process.env.NEXT_PUBLIC_BACKEND_URL || process.env.BACKEND_URL;
    const fetchUser = await fetch(
      `${baseUrl}/users/pagination?query=${searchTerm}&page=${currentPage}&limit=${limit}`,
      {
        cache: "no-store",
      },
    );
    const resultUser = await fetchUser.json();
    return {
      data: resultUser.data,
      totalPages: resultUser.totalPages,
      params: { limit, currentPage },
    };
  } catch (error) {
    console.log("error", error);
    throw new Error("Failed to fetching RouteGest data");
  }
};

// En tu archivo de API (ej: lib/api.ts o services/calendar.service.ts)

export interface CalendarDataResponse {
  dataRoutes: Ruta[]; // Idealmente usa tus interfaces aquí
  dataPartes: ParteTrabajo[];
}

export const fetchCalendarData = async (
  month?: number,
  year?: number,
): Promise<CalendarDataResponse> => {
  try {
    const today = new Date();
    const queryMonth = month || today.getMonth() + 1;
    const queryYear = year || today.getFullYear();

    // Importante: Si esta función se llama desde el cliente, necesitas NEXT_PUBLIC_
    // Si se llama desde el servidor, BACKEND_URL está bien.
    const baseUrl =
      process.env.NEXT_PUBLIC_BACKEND_URL || process.env.BACKEND_URL;

    const [routesRes, partsRes] = await Promise.all([
      fetch(`${baseUrl}/rutas/byMonth?month=${queryMonth}&year=${queryYear}`, {
        cache: "no-store",
      }),
      fetch(
        `${baseUrl}/partes-trabajo/unassigned?month=${queryMonth}&year=${queryYear}`,
        {
          cache: "no-store",
        },
      ),
    ]);

    if (!routesRes.ok) {
      const errorData = await routesRes.json();
      console.error("Error en Rutas:", routesRes.status, errorData);
      throw new Error(`Rutas falló con status ${routesRes.status}`);
    }

    if (!partsRes.ok) {
      const errorData = await partsRes.json();
      console.error("Error en Unassigned:", partsRes.status, errorData);
      throw new Error(`Unassigned falló con status ${partsRes.status}`);
    }

    const partResult = await partsRes.json();
    console.log("Data de partes: ", partResult);

    return {
      dataRoutes: await routesRes.json(),
      dataPartes: partResult,
    };
  } catch (err) {
    console.error("Error in fetchCalendarData:", err);
    return { dataRoutes: [], dataPartes: [] };
  }
};

interface IdsCollectionResponse {
  dataVehicles: Vehicle[];
  dataUsers: User[];
  dataFactures: Facture[];
}

export const fetchIdsCollections = async (): Promise<IdsCollectionResponse> => {
  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_BACKEND_URL || process.env.BACKEND_URL;

    const [vehiclesRes, usersRes, facturesRes] = await Promise.all([
      fetch(`${baseUrl}/vehicles`, { cache: "no-store" }),
      fetch(`${baseUrl}/users`, { cache: "no-store" }),
      fetch(`${baseUrl}/factures`, { cache: "no-store" }),
    ]);

    if (!vehiclesRes.ok) {
      const errorData = await vehiclesRes.json();
      console.error("Error en Vehiculos:", vehiclesRes.status, errorData);
      throw new Error(`Vehiculo falló con status ${vehiclesRes.status}`);
    }
    if (!usersRes.ok) {
      const errorData = await usersRes.json();
      console.error("Error en Usuario:", usersRes.status, errorData);
      throw new Error(`Usuario falló con status ${usersRes.status}`);
    }
    if (!facturesRes.ok) {
      const errorData = await facturesRes.json();
      console.error("Error en Factura:", facturesRes.status, errorData);
      throw new Error(`Factura falló con status ${facturesRes.status}`);
    }

    const vehiclesData = await vehiclesRes.json();
    const userData = await usersRes.json();
    const facturesData = await facturesRes.json();

    return {
      dataVehicles: vehiclesData,
      dataUsers: userData,
      dataFactures: facturesData,
    };
  } catch (err) {
    console.error("Error in fetchCalendarData:", err);
    return { dataVehicles: [], dataUsers: [], dataFactures: [] };
  }
};
