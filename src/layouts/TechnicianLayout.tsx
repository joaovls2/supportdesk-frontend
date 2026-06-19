import type { ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ClipboardList, Home, LogOut } from "lucide-react";

import { ThemeToggle } from "../components/theme/ThemeToggle";

import "./AdminLayout.css";

interface TechnicianLayoutProps {
  children: ReactNode;
}

export function TechnicianLayout({ children }: TechnicianLayoutProps) {
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
          <Link to="/tecnico/dashboard">
            <Home size={18} />
            Dashboard
          </Link>

          <Link to="/tecnico/chamados">
            <ClipboardList size={18} />
            Chamados atribuídos
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