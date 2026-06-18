import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { UserLayout } from "../../layouts/UserLayout";
import {
  criarChamado,
  listarChamadosDoUsuario,
} from "../../services/chamadoService";
import type { ChamadoResponse } from "../../types/chamado";
import { PriorityBadge } from "../../components/ui/PriorityBadge";
import { StatusBadge } from "../../components/ui/StatusBadge";
import "../admin/AdminTables.css";

export function UsuarioChamadosPage() {
  const user = JSON.parse(localStorage.getItem("supportdesk:user") || "{}");

  const [chamados, setChamados] = useState<ChamadoResponse[]>([]);
  const [form, setForm] = useState({
    titulo: "",
    descricao: "",
    categoria: "SOFTWARE",
    prioridade: "MEDIA",
  });

  async function carregarChamados() {
    const data = await listarChamadosDoUsuario(user.id);
    setChamados(data);
  }

  useEffect(() => {
    carregarChamados();
  }, []);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    await criarChamado({
      titulo: form.titulo,
      descricao: form.descricao,
      categoria: form.categoria as any,
      prioridade: form.prioridade as any,
      usuarioId: user.id,
    });

    setForm({
      titulo: "",
      descricao: "",
      categoria: "SOFTWARE",
      prioridade: "MEDIA",
    });

    carregarChamados();
  }

  return (
    <UserLayout>
      <div className="page-header">
        <div>
          <span>Usuário</span>
          <h1>Meus chamados</h1>
        </div>
      </div>

      <section className="admin-section">
        <form onSubmit={handleSubmit} className="inline-form chamados-form">
          <input
            placeholder="Título"
            value={form.titulo}
            onChange={(e) => setForm({ ...form, titulo: e.target.value })}
          />

          <input
            placeholder="Descrição"
            value={form.descricao}
            onChange={(e) => setForm({ ...form, descricao: e.target.value })}
          />

          <select
            value={form.categoria}
            onChange={(e) => setForm({ ...form, categoria: e.target.value })}
          >
            <option value="SOFTWARE">Software</option>
            <option value="HARDWARE">Hardware</option>
            <option value="REDE">Rede</option>
            <option value="ACESSO">Acesso</option>
            <option value="OUTROS">Outros</option>
          </select>

          <select
            value={form.prioridade}
            onChange={(e) => setForm({ ...form, prioridade: e.target.value })}
          >
            <option value="BAIXA">Baixa</option>
            <option value="MEDIA">Média</option>
            <option value="ALTA">Alta</option>
            <option value="CRITICA">Crítica</option>
          </select>

          <button className="btn-primary" type="submit">
            Criar chamado
          </button>
        </form>
      </section>

      <section className="admin-section">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Código</th>
              <th>Título</th>
              <th>Prioridade</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>

          <tbody>
            {chamados.map((chamado) => (
              <tr key={chamado.id}>
                <td>#{chamado.id}</td>
                <td>{chamado.titulo}</td>
                <td>
                  <PriorityBadge prioridade={chamado.prioridade} />
                </td>
                <td>
                  <StatusBadge status={chamado.status} />
                </td>
                <td>
                  <Link
                    className="table-link"
                    to={`/usuario/chamados/${chamado.id}`}
                  >
                    Detalhes
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </UserLayout>
  );
}