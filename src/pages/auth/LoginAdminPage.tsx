import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { loginAdmin } from "../../services/authService";
import { PublicLayout } from "../../layouts/PublicLayout";
import "./AuthPages.css";

export function LoginAdminPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    senha: "",
  });

  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    try {
      setLoading(true);
      setErro("");

      const data = await loginAdmin(form);

      localStorage.setItem("supportdesk:token", data.token);
      localStorage.setItem("supportdesk:user", JSON.stringify(data));

      navigate("/admin/dashboard");
    } catch {
      setErro("E-mail ou senha inválidos.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <PublicLayout>
      <section className="auth-page">
        <div className="auth-card">
          <span className="auth-badge">Administrador</span>

          <h1>Entrar no painel</h1>

          <p>Acesse o dashboard da sua empresa.</p>

          <form onSubmit={handleSubmit} className="auth-form">
            <input
              placeholder="E-mail"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />

            <input
              placeholder="Senha"
              type="password"
              value={form.senha}
              onChange={(e) => setForm({ ...form, senha: e.target.value })}
            />

            {erro && <span className="form-error">{erro}</span>}

            <button disabled={loading} className="btn-primary" type="submit">
              {loading ? "Entrando..." : "Entrar"}
            </button>
          </form>
        </div>
      </section>
    </PublicLayout>
  );
}