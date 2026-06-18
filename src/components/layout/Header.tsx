import { Link } from "react-router-dom";
import "./Header.css";

export function Header() {
  return (
    <header className="header">
      <Link to="/" className="logo">
        Support<span>Desk</span>
      </Link>

      <nav>
        <a href="#recursos">Recursos</a>
        <a href="#como-funciona">Como funciona</a>
      </nav>

      <div className="actions">
        <Link to="/acesso" className="btn-secondary">
          Entrar
        </Link>

        <Link to="/criar-empresa" className="btn-primary">
          Criar Empresa
        </Link>
      </div>
    </header>
  );
}