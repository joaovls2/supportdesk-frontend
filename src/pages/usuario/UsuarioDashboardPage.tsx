import { Link } from "react-router-dom";
import { FilePlus2, Headphones } from "lucide-react";

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
        <section className="metric-card">
          <Headphones size={26} />
          <span>Meus chamados</span>
          <strong>Ver</strong>
        </section>

        <section className="metric-card">
          <FilePlus2 size={26} />
          <span>Novo chamado</span>
          <strong>+</strong>
        </section>
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
          <p>Crie chamados com título, descrição, categoria e prioridade.</p>
          <p>Envie prints e imagens relacionadas ao problema.</p>
          <p>Acompanhe mudanças de status pelo histórico.</p>
        </div>
      </section>

      <Link
        to="/usuario/chamados"
        className="btn-primary"
        style={{
          display: "inline-flex",
          marginTop: "1.5rem",
        }}
      >
        Ver meus chamados
      </Link>
    </UserLayout>
  );
}