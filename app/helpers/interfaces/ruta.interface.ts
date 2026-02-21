import { EstadoParteTrabajo } from "../enums/part_work.enum";
import { ParteTrabajo } from "./parte-trabajo.interface";

export interface Ruta {
  id: number;
  title: string;
  in_charge: string;
  userId: number;
  vehicle: {
    matricule: string;
  };
  factureId: number;
  tools: string[];
  date: Date;
  comments?: string;
  status: EstadoParteTrabajo;
  amount_facture_route: number;
  partes?: ParteTrabajo[];
}
