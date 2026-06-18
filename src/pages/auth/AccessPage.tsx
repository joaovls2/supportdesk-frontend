import { Link } from "react-router-dom";
import { PublicLayout } from "../../layouts/PublicLayout";
import "./AuthPages.css";

export function AccessPage() {
  return (
    <PublicLayout>
      <section className="auth-page">
        <div className="auth-card large">
          <span className="auth-badge">Acesso</span>

          <h1>Como deseja entrar?</h1>

          <p>Escolha o tipo de acesso de acordo com seu perfil no sistema.</p>

          <div className="access-grid">
            <Link to="/login/admin" className="access-card">
              <strong>Administrador</strong>
              <span>Gerencie equipe, chamados e indicadores.</span>
            </Link>

            <Link to="/login/tecnico" className="access-card">
              <strong>Técnico</strong>
              <span>Atenda chamados e atualize status.</span>
            </Link>

            <Link to="/login/usuario" className="access-card">
              <strong>Usuário</strong>
              <span>Abra e acompanhe seus chamados.</span>
            </Link>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}