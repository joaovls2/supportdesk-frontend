import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { cadastrarEmpresa } from "../../services/empresaService";
import { PublicLayout } from "../../layouts/PublicLayout";
import "./AuthPages.css";

export function CreateCompanyPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nomeEmpresa: "",
    cnpj: "",
    nomeAdmin: "",
    emailAdmin: "",
    senhaAdmin: "",
  });

  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    try {
      setLoading(true);
      setErro("");

      await cadastrarEmpresa(form);

      alert("Empresa criada com sucesso!");
      navigate("/login/admin");
    } catch {
      setErro("Não foi possível criar a empresa.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <PublicLayout>
      <section className="auth-page">
        <div className="auth-card large">
          <span className="auth-badge">Primeiro acesso</span>

          <h1>Criar empresa</h1>

          <p>
            Cadastre sua empresa e crie o primeiro administrador para acessar o
            sistema.
          </p>

          <form onSubmit={handleSubmit} className="auth-form">
            <h3>Dados da empresa</h3>

            <input
              placeholder="Nome da empresa"
              value={form.nomeEmpresa}
              onChange={(e) =>
                setForm({ ...form, nomeEmpresa: e.target.value })
              }
            />

            <input
              placeholder="CNPJ"
              value={form.cnpj}
              onChange={(e) => setForm({ ...form, cnpj: e.target.value })}
            />

            <h3>Administrador</h3>

            <input
              placeholder="Nome do administrador"
              value={form.nomeAdmin}
              onChange={(e) => setForm({ ...form, nomeAdmin: e.target.value })}
            />

            <input
              placeholder="E-mail do administrador"
              type="email"
              value={form.emailAdmin}
              onChange={(e) => setForm({ ...form, emailAdmin: e.target.value })}
            />

            <input
              placeholder="Senha"
              type="password"
              value={form.senhaAdmin}
              onChange={(e) => setForm({ ...form, senhaAdmin: e.target.value })}
            />

            {erro && <span className="form-error">{erro}</span>}

            <button disabled={loading} className="btn-primary" type="submit">
              {loading ? "Criando..." : "Criar empresa"}
            </button>
          </form>
        </div>
      </section>
    </PublicLayout>
  );
}