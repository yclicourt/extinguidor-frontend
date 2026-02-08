interface Facture {
  facture_parts: number;
  facture_work_parts: number;
  facture_amount: number;
}

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
