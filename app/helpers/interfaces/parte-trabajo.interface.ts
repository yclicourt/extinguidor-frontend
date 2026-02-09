import { Categoria } from "../enums/category.enum";
import { EstadoParteTrabajo } from "../enums/part_work.enum";
import { TipoTrabajo } from "../enums/type_work.enum";

export interface ParteTrabajo {
  title: string;
  description?: string;
  clientId: number;
  date: Date;
  address?: string;
  state: EstadoParteTrabajo;
  type_work: TipoTrabajo;
  category: Categoria;
  docs?: string;
  articleId: number;
  comment?: string;
  factureId: number;
  routeId: number;
  amount_facture_parte: number;
}
