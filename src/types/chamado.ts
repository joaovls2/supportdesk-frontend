export type StatusChamado =
  | "ABERTO"
  | "EM_ANDAMENTO"
  | "RESOLVIDO"
  | "FECHADO"
  | "REABERTO"
  | "CANCELADO";

export type PrioridadeChamado =
  | "BAIXA"
  | "MEDIA"
  | "ALTA"
  | "CRITICA";

export type CategoriaChamado =
  | "HARDWARE"
  | "SOFTWARE"
  | "REDE"
  | "ACESSO"
  | "OUTROS";

export interface ChamadoResponse {
  id: number;
  titulo: string;
  descricao: string;
  status: StatusChamado;
  prioridade: PrioridadeChamado;
  categoria: CategoriaChamado;
  dataCriacao: string;
  dataLimiteSla: string;
  usuarioId: number;
  tecnicoId: number | null;
  empresaId: number;
}

export interface CriarChamadoRequest {
  titulo: string;
  descricao: string;
  categoria: CategoriaChamado;
  prioridade: PrioridadeChamado;
  usuarioId: number;
}