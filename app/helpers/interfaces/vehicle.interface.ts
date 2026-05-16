import { TipoVehiculo } from "../enums/type_vehicle.enum";

export interface Vehicle {
  id: number;
  type: TipoVehiculo;
  matricule: string;
}
