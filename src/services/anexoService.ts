import { api } from "./api";
import type { AnexoResponse } from "../types/anexo";

export async function listarAnexos(chamadoId: number) {
  const response = await api.get<AnexoResponse[]>(
    `/chamados/${chamadoId}/anexos`
  );

  return response.data;
}

export async function enviarAnexos(
  chamadoId: number,
  arquivos: FileList
) {
  const formData = new FormData();

  Array.from(arquivos).forEach((arquivo) => {
    formData.append("arquivos", arquivo);
  });

  const response = await api.post<AnexoResponse[]>(
    `/chamados/${chamadoId}/anexos`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
}

export function obterUrlDownloadAnexo(anexoId: number) {
  return `http://localhost:8080/chamados/anexos/${anexoId}/download`;
}