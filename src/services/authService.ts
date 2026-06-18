import { api } from "./api";
import type { LoginRequest, LoginResponse } from "../types/auth";

export async function loginAdmin(data: LoginRequest) {
  const response = await api.post<LoginResponse>("/auth/login/admin", data);
  return response.data;
}

export async function loginUsuario(data: LoginRequest) {
  const response = await api.post<LoginResponse>("/auth/login/usuario", data);
  return response.data;
}

export async function loginTecnico(data: LoginRequest) {
  const response = await api.post<LoginResponse>("/auth/login/tecnico", data);
  return response.data;
}