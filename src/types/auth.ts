export interface LoginRequest {
  email: string;
  senha: string;
}

export interface LoginResponse {
  id: number;
  nome: string;
  email: string;
  tipo: "ADMIN" | "TECNICO" | "USUARIO";
  empresaId: number;
  token: string;
}