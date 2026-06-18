import { useEffect, useState } from "react";
import {
  AlertCircle,
  CheckCircle2,
  Clock,
  FileText,
  RotateCcw,
  XCircle,
} from "lucide-react";

import { AdminLayout } from "../../layouts/AdminLayout";
import { buscarDashboard } from "../../services/dashboardService";
import type { DashboardResponse } from "../../types/dashboard";
import "./AdminDashboardPage.css";

export function AdminDashboardPage() {
  const [dashboard, setDashboard] = useState<DashboardResponse | null>(null);

  useEffect(() => {
    buscarDashboard().then(setDashboard).catch(console.error);
  }, []);

  return (
    <AdminLayout>
      <div className="page-header">
        <div>
          <span>Dashboard</span>
          <h1>Visão geral</h1>
        </div>
      </div>

      {!dashboard ? (
        <p>Carregando indicadores...</p>
      ) : (
        <>
          <div className="dashboard-grid">
            <div className="metric-card">
              <FileText size={26} />
              <span>Total de chamados</span>
              <strong>{dashboard.totalChamados}</strong>
            </div>

            <div className="metric-card">
              <AlertCircle size={26} />
              <span>Abertos</span>
              <strong>{dashboard.chamadosAbertos}</strong>
            </div>

            <div className="metric-card">
              <Clock size={26} />
              <span>Em andamento</span>
              <strong>{dashboard.chamadosEmAndamento}</strong>
            </div>

            <div className="metric-card">
              <CheckCircle2 size={26} />
              <span>Resolvidos</span>
              <strong>{dashboard.chamadosResolvidos}</strong>
            </div>

            <div className="metric-card">
              <RotateCcw size={26} />
              <span>Reabertos</span>
              <strong>{dashboard.chamadosReabertos}</strong>
            </div>

            <div className="metric-card">
              <XCircle size={26} />
              <span>Cancelados</span>
              <strong>{dashboard.chamadosCancelados}</strong>
            </div>
          </div>

          <section className="dashboard-summary">
            <div>
              <span>Resumo operacional</span>
              <h2>Atendimento da empresa</h2>
              <p>
                Acompanhe rapidamente o volume de chamados, pendências e
                solicitações resolvidas pela equipe.
              </p>
            </div>

            <div className="summary-list">
              <p>
                <strong>{dashboard.chamadosAbertos}</strong> chamados aguardando
                atendimento.
              </p>

              <p>
                <strong>{dashboard.chamadosEmAndamento}</strong> chamados em
                execução.
              </p>

              <p>
                <strong>{dashboard.chamadosResolvidos}</strong> chamados já
                resolvidos.
              </p>
            </div>
          </section>
        </>
      )}
    </AdminLayout>
  );
}