interface Facture {
  facture_parts: number;
  facture_work_parts: number;
  facture_amount: number;
}

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
