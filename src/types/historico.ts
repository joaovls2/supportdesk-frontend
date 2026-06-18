import type { StatusChamado } from "./chamado";

export interface HistoricoChamadoResponse {
  id: number;
  status: StatusChamado;
  comentario: string;
  dataAlteracao: string;
  chamadoId: number;
  tecnicoId: number | null;
}