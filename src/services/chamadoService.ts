import { api } from "./api";
import type {
  ChamadoResponse,
  CriarChamadoRequest,
  StatusChamado,
} from "../types/chamado";
import type { HistoricoChamadoResponse } from "../types/historico";

export async function listarChamados() {
  const response = await api.get<ChamadoResponse[]>("/chamados");
  return response.data;
}

export async function buscarChamadoPorId(id: number) {
  const response = await api.get<ChamadoResponse>(`/chamados/${id}`);
  return response.data;
}

export async function criarChamado(data: CriarChamadoRequest) {
  const response = await api.post<ChamadoResponse>("/chamados", data);
  return response.data;
}

export async function listarChamadosDoUsuario(usuarioId: number) {
  const response = await api.get<ChamadoResponse[]>(
    `/usuarios/${usuarioId}/chamados`
  );

  return response.data;
}

export async function listarChamadosDoTecnico(tecnicoId: number) {
  const response = await api.get<ChamadoResponse[]>(
    `/tecnicos/${tecnicoId}/chamados`
  );

  return response.data;
}

export async function atribuirTecnico(chamadoId: number, tecnicoId: number) {
  const response = await api.put<ChamadoResponse>(
    `/chamados/${chamadoId}/atribuir-tecnico`,
    { tecnicoId }
  );

  return response.data;
}

export async function atualizarStatusChamado(
  chamadoId: number,
  data: {
    status: StatusChamado;
    comentario: string;
    tecnicoId: number;
  }
) {
  const response = await api.put<ChamadoResponse>(
    `/chamados/${chamadoId}/status`,
    data
  );

  return response.data;
}

export async function buscarHistoricoChamado(chamadoId: number) {
  const response = await api.get<HistoricoChamadoResponse[]>(
    `/chamados/${chamadoId}/historico`
  );

  return response.data;
}