import { BrowserRouter, Route, Routes } from "react-router-dom";

import { LandingPage } from "../pages/public/LandingPage";
import { NotFoundPage } from "../pages/public/NotFoundPage";

import { AccessPage } from "../pages/auth/AccessPage";
import { CreateCompanyPage } from "../pages/auth/CreateCompanyPage";
import { LoginAdminPage } from "../pages/auth/LoginAdminPage";
import { LoginUsuarioPage } from "../pages/auth/LoginUsuarioPage";
import { LoginTecnicoPage } from "../pages/auth/LoginTecnicoPage";

import { AdminDashboardPage } from "../pages/admin/AdminDashboardPage";
import { AdminUsuariosPage } from "../pages/admin/AdminUsuariosPage";
import { AdminTecnicosPage } from "../pages/admin/AdminTecnicosPage";
import { AdminChamadosPage } from "../pages/admin/AdminChamadosPage";
import { AdminChamadoDetalhesPage } from "../pages/admin/AdminChamadoDetalhesPage";

import { UsuarioDashboardPage } from "../pages/usuario/UsuarioDashboardPage";
import { UsuarioChamadosPage } from "../pages/usuario/UsuarioChamadosPage";
import { UsuarioChamadoDetalhesPage } from "../pages/usuario/UsuarioChamadoDetalhesPage";

import { TecnicoDashboardPage } from "../pages/tecnico/TecnicoDashboardPage";
import { TecnicoChamadosPage } from "../pages/tecnico/TecnicoChamadosPage";
import { TecnicoChamadoDetalhesPage } from "../pages/tecnico/TecnicoChamadoDetalhesPage";

import { ProtectedRoute } from "./ProtectedRoute";

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/acesso" element={<AccessPage />} />
        <Route path="/criar-empresa" element={<CreateCompanyPage />} />

        <Route path="/login/admin" element={<LoginAdminPage />} />
        <Route path="/login/usuario" element={<LoginUsuarioPage />} />
        <Route path="/login/tecnico" element={<LoginTecnicoPage />} />

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <AdminDashboardPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/usuarios"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <AdminUsuariosPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/tecnicos"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <AdminTecnicosPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/chamados"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <AdminChamadosPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/chamados/:id"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <AdminChamadoDetalhesPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/usuario/dashboard"
          element={
            <ProtectedRoute allowedRoles={["USUARIO"]}>
              <UsuarioDashboardPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/usuario/chamados"
          element={
            <ProtectedRoute allowedRoles={["USUARIO"]}>
              <UsuarioChamadosPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/usuario/chamados/novo"
          element={
            <ProtectedRoute allowedRoles={["USUARIO"]}>
              <UsuarioChamadosPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/usuario/chamados/:id"
          element={
            <ProtectedRoute allowedRoles={["USUARIO"]}>
              <UsuarioChamadoDetalhesPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/tecnico/dashboard"
          element={
            <ProtectedRoute allowedRoles={["TECNICO"]}>
              <TecnicoDashboardPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/tecnico/chamados"
          element={
            <ProtectedRoute allowedRoles={["TECNICO"]}>
              <TecnicoChamadosPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/tecnico/chamados/:id"
          element={
            <ProtectedRoute allowedRoles={["TECNICO"]}>
              <TecnicoChamadoDetalhesPage />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}