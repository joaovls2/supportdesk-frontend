import { api } from "./api";

export async function sugerirChamado(problema: string) {
  const response = await api.post("/ia/sugerir-chamado", {
    problema,
  });

  return response.data;
}