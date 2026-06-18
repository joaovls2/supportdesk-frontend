import { api } from "./api";
import type {
  CadastrarEmpresaRequest,
  EmpresaCadastroResponse,
} from "../types/empresa";

export async function cadastrarEmpresa(data: CadastrarEmpresaRequest) {
  const response = await api.post<EmpresaCadastroResponse>(
    "/empresas/cadastrar",
    data
  );

  return response.data;
}