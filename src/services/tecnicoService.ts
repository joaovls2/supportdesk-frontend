import { api } from "./api";
import type {
  CriarTecnicoRequest,
  TecnicoResponse,
} from "../types/tecnico";

export async function listarTecnicos() {
  const response = await api.get<TecnicoResponse[]>("/tecnicos");
  return response.data;
}

export async function criarTecnico(data: CriarTecnicoRequest) {
  const response = await api.post<TecnicoResponse>("/tecnicos", data);
  return response.data;
}

export async function deletarTecnico(id: number) {
  await api.delete(`/tecnicos/${id}`);
}