import type { ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  BarChart3,
  Headphones,
  LogOut,
  Users,
  Wrench,
} from "lucide-react";

import { ThemeToggle } from "../components/theme/ThemeToggle";

import "./AdminLayout.css";

interface AdminLayoutProps {
  children: ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
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
          <Link to="/admin/dashboard">
            <BarChart3 size={18} />
            Dashboard
          </Link>

          <Link to="/admin/usuarios">
            <Users size={18} />
            Usuários
          </Link>

          <Link to="/admin/tecnicos">
            <Wrench size={18} />
            Técnicos
          </Link>

          <Link to="/admin/chamados">
            <Headphones size={18} />
            Chamados
          </Link>
        </nav>

        <button onClick={handleLogout} className="logout-button">
          <LogOut size={18} />
          Sair
        </button>
      </aside>

      <main className="admin-content">
        <div className="topbar">
          <ThemeToggle />
        </div>

        {children}
      </main>
    </div>
  );
}