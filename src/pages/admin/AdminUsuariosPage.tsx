import { useEffect, useState } from "react";

import { AdminLayout } from "../../layouts/AdminLayout";
import {
  criarUsuario,
  deletarUsuario,
  listarUsuarios,
} from "../../services/usuarioService";
import type { UsuarioResponse } from "../../types/usuario";
import "./AdminTables.css";

export function AdminUsuariosPage() {
  const [usuarios, setUsuarios] = useState<UsuarioResponse[]>([]);
  const [form, setForm] = useState({
    nome: "",
    email: "",
    senha: "",
  });

  async function carregarUsuarios() {
    const data = await listarUsuarios();
    setUsuarios(data);
  }

  useEffect(() => {
    carregarUsuarios();
  }, []);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    await criarUsuario(form);

    setForm({
      nome: "",
      email: "",
      senha: "",
    });

    carregarUsuarios();
  }

  async function handleDelete(id: number) {
    if (!confirm("Deseja excluir este usuário?")) return;

    await deletarUsuario(id);
    carregarUsuarios();
  }

  return (
    <AdminLayout>
      <div className="page-header">
        <div>
          <span>Administração</span>
          <h1>Usuários</h1>
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
            {usuarios.map((usuario) => (
              <tr key={usuario.id}>
                <td>{usuario.nome}</td>
                <td>{usuario.email}</td>
                <td>
                  <button
                    className="danger-button"
                    onClick={() => handleDelete(usuario.id)}
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