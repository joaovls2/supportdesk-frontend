export interface UsuarioResponse {
  id: number;
  nome: string;
  email: string;
  empresaId: number;
}

export interface CriarUsuarioRequest {
  nome: string;
  email: string;
  senha: string;
}