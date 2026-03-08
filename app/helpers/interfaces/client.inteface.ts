import { Genre } from "../enums/genre.enum";

export interface Client {
  id: number;
  name: string;
  lastname: string;
  genre?: Genre;
  address: string;
}
