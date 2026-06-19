import { api } from "./api";
import type { AnexoResponse } from "../types/anexo";

export async function enviarAnexos(chamadoId: number, arquivos: FileList) {
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

export async function listarAnexos(chamadoId: number) {
  const response = await api.get<AnexoResponse[]>(
    `/chamados/${chamadoId}/anexos`
  );

  return response.data;
}

export async function abrirPreviewAnexo(anexoId: number) {
  const response = await api.get(`/anexos/${anexoId}/download`, {
    responseType: "blob",
  });

  const url = window.URL.createObjectURL(response.data);
  window.open(url, "_blank");
}