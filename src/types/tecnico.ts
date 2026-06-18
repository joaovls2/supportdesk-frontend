export interface TecnicoResponse {
  id: number;
  nome: string;
  email: string;
  empresaId: number;
}

export interface CriarTecnicoRequest {
  nome: string;
  email: string;
  senha: string;
}