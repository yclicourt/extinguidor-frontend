import { Categoria } from "../enums/category.enum";
import { EstadoParteTrabajo } from "../enums/part_work.enum";
import { TipoTrabajo } from "../enums/type_work.enum";

export interface ParteTrabajo {
  id: number;
  title: string;
  description?: string;
  clientId: number;
  client: {
    id: number;
    name: string;
  };
  date: Date | string | null;
  address?: string;
  state: EstadoParteTrabajo;
  type_work: TipoTrabajo;
  category: Categoria;
  imageDoc?: string;
  docs?: string;
  articuleId: number;
  comment?: string;
  factureId: number;
  routeId: number;
  amount_facture_parte: number;
  latCor: number
  longCor: number
}
