import { Link } from "react-router-dom";
import { ClipboardList, Wrench } from "lucide-react";

import { TechnicianLayout } from "../../layouts/TechnicianLayout";

export function TecnicoDashboardPage() {
  const user = JSON.parse(localStorage.getItem("supportdesk:user") || "{}");

  return (
    <TechnicianLayout>
      <div className="page-header">
        <div>
          <span>Técnico</span>
          <h1>Olá, {user.nome || "técnico"}</h1>
        </div>
      </div>

      <div className="dashboard-grid">
        <section className="metric-card">
          <ClipboardList size={26} />
          <span>Chamados atribuídos</span>
          <strong>Ver</strong>
        </section>

        <section className="metric-card">
          <Wrench size={26} />
          <span>Atendimentos</span>
          <strong>Status</strong>
        </section>
      </div>

      <section className="dashboard-summary">
        <div>
          <span>Operação</span>
          <h2>Fila de atendimento</h2>
          <p>
            Visualize chamados atribuídos, analise anexos e registre atualizações
            no histórico do atendimento.
          </p>
        </div>

        <div className="summary-list">
          <p>Atualize chamados para em andamento, resolvido ou fechado.</p>
          <p>Registre comentários técnicos no histórico.</p>
          <p>Acesse anexos enviados pelo solicitante.</p>
        </div>
      </section>

      <Link
        to="/tecnico/chamados"
        className="btn-primary"
        style={{
          display: "inline-flex",
          marginTop: "1.5rem",
        }}
      >
        Ver chamados atribuídos
      </Link>
    </TechnicianLayout>
  );
}