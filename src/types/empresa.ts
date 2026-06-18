export interface CadastrarEmpresaRequest {
  nomeEmpresa: string;
  cnpj: string;
  nomeAdmin: string;
  emailAdmin: string;
  senhaAdmin: string;
}

export interface EmpresaCadastroResponse {
  empresaId: number;
  nomeEmpresa: string;
  cnpj: string;
  administradorId: number;
  nomeAdmin: string;
  emailAdmin: string;
}