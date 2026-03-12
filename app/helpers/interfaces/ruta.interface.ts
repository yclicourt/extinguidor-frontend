import { RutaState } from "../enums/ruta.enum";
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
  state: RutaState;
  amount_facture_route: number;
  parts?: ParteTrabajo[];
}
