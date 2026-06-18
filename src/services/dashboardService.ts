import { api } from "./api";
import type { DashboardResponse } from "../types/dashboard";

export async function buscarDashboard() {
  const response = await api.get<DashboardResponse>("/dashboard");
  return response.data;
}