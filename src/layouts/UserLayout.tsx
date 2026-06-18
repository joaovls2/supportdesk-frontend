import type { ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Headphones, Home, LogOut } from "lucide-react";

import "./AdminLayout.css";

interface UserLayoutProps {
  children: ReactNode;
}

export function UserLayout({ children }: UserLayoutProps) {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("supportdesk:token");
    localStorage.removeItem("supportdesk:user");
    navigate("/");
  }

  return (
    <div className="admin-layout">
      <aside className="sidebar">
        <div className="sidebar-logo">
          Support<span>Desk</span>
        </div>

        <nav className="sidebar-nav">
          <Link to="/usuario/dashboard">
            <Home size={18} />
            Dashboard
          </Link>

          <Link to="/usuario/chamados">
            <Headphones size={18} />
            Meus chamados
          </Link>
        </nav>

        <button onClick={handleLogout} className="logout-button">
          <LogOut size={18} />
          Sair
        </button>
      </aside>

      <main className="admin-content">{children}</main>
    </div>
  );
}