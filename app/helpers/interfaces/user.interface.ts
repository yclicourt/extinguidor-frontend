import { Role } from "../enums/role.enum";
import { Status } from "../enums/status.enum";

export interface User {
  id: number;
  name: string;
  lastname: string;
  email: string;
  phone: string;
  address: string;
  password: string;
  avatar?: string;
  status: Status;
  role: Role;
  lastLogin: string;
}
