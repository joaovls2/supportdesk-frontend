import { Link } from "react-router-dom";
import { PublicLayout } from "../../layouts/PublicLayout";

export function NotFoundPage() {
  return (
    <PublicLayout>
      <section className="auth-page">
        <div className="auth-card">
          <span className="auth-badge">404</span>

          <h1>Página não encontrada</h1>

          <p>
            A página que você tentou acessar não existe ou foi movida.
          </p>

          <Link to="/" className="btn-primary">
            Voltar para início
          </Link>
        </div>
      </section>
    </PublicLayout>
  );
}