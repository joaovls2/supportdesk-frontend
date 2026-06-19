import { Link } from "react-router-dom";

import { FilePlus2 } from "lucide-react";

import { UserLayout } from "../../layouts/UserLayout";

export function UsuarioDashboardPage() {
  const user = JSON.parse(localStorage.getItem("supportdesk:user") || "{}");

  return (
    <UserLayout>
      <div className="page-header">
        <div>
          <span>Usuário</span>
          <h1>Olá, {user.nome || "usuário"}</h1>
        </div>
      </div>

      <div className="dashboard-grid">
       <Link to="/usuario/chamados/novo" className="dashboard-card">
          <FilePlus2 size={32} className="card-icon" />

          <span>Novo chamado</span>
          <strong>+</strong>
        </Link>
      </div>

      <section className="dashboard-summary">
        <div>
          <span>Atendimento</span>

          <h2>Acompanhe suas solicitações</h2>

          <p>
            Abra chamados, envie anexos e acompanhe todo o histórico de
            atendimento em um só lugar.
          </p>
        </div>

        <div className="summary-list">
          <p>Crie chamados com auxílio da IA.</p>
          <p>Envie prints e imagens relacionadas ao problema.</p>
          <p>Acompanhe mudanças de status pelo histórico.</p>
        </div>
      </section>
    </UserLayout>
  );
}