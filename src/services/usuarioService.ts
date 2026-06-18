import { api } from "./api";
import type {
  CriarUsuarioRequest,
  UsuarioResponse,
} from "../types/usuario";

export async function listarUsuarios() {
  const response = await api.get<UsuarioResponse[]>("/usuarios");
  return response.data;
}

export async function criarUsuario(data: CriarUsuarioRequest) {
  const response = await api.post<UsuarioResponse>("/usuarios", data);
  return response.data;
}

export async function deletarUsuario(id: number) {
  await api.delete(`/usuarios/${id}`);
}