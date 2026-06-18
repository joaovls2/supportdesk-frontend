import { useEffect, useState } from "react";

import { AdminLayout } from "../../layouts/AdminLayout";
import {
  criarTecnico,
  deletarTecnico,
  listarTecnicos,
} from "../../services/tecnicoService";
import type { TecnicoResponse } from "../../types/tecnico";
import "./AdminTables.css";

export function AdminTecnicosPage() {
  const [tecnicos, setTecnicos] = useState<TecnicoResponse[]>([]);
  const [form, setForm] = useState({
    nome: "",
    email: "",
    senha: "",
  });

  async function carregarTecnicos() {
    const data = await listarTecnicos();
    setTecnicos(data);
  }

  useEffect(() => {
    carregarTecnicos();
  }, []);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    await criarTecnico(form);

    setForm({
      nome: "",
      email: "",
      senha: "",
    });

    carregarTecnicos();
  }

  async function handleDelete(id: number) {
    if (!confirm("Deseja excluir este técnico?")) return;

    await deletarTecnico(id);
    carregarTecnicos();
  }

  return (
    <AdminLayout>
      <div className="page-header">
        <div>
          <span>Administração</span>
          <h1>Técnicos</h1>
        </div>
      </div>

      <section className="admin-section">
        <form onSubmit={handleSubmit} className="inline-form">
          <input
            placeholder="Nome"
            value={form.nome}
            onChange={(e) => setForm({ ...form, nome: e.target.value })}
          />

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

          <button type="submit" className="btn-primary">
            Cadastrar
          </button>
        </form>
      </section>

      <section className="admin-section">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>E-mail</th>
              <th>Ações</th>
            </tr>
          </thead>

          <tbody>
            {tecnicos.map((tecnico) => (
              <tr key={tecnico.id}>
                <td>{tecnico.nome}</td>
                <td>{tecnico.email}</td>
                <td>
                  <button
                    className="danger-button"
                    onClick={() => handleDelete(tecnico.id)}
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </AdminLayout>
  );
}