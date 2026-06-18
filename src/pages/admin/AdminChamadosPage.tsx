import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { AdminLayout } from "../../layouts/AdminLayout";

import {
  criarChamado,
  listarChamados,
} from "../../services/chamadoService";

import { listarUsuarios } from "../../services/usuarioService";

import type { ChamadoResponse } from "../../types/chamado";
import type { UsuarioResponse } from "../../types/usuario";

import { StatusBadge } from "../../components/ui/StatusBadge";
import { PriorityBadge } from "../../components/ui/PriorityBadge";

import "./AdminTables.css";

export function AdminChamadosPage() {
  const [chamados, setChamados] = useState<ChamadoResponse[]>([]);
  const [usuarios, setUsuarios] = useState<UsuarioResponse[]>([]);

  const [busca, setBusca] = useState("");

  const [form, setForm] = useState({
    titulo: "",
    descricao: "",
    categoria: "SOFTWARE",
    prioridade: "MEDIA",
    usuarioId: "",
  });

  async function carregarDados() {
    const [chamadosData, usuariosData] = await Promise.all([
      listarChamados(),
      listarUsuarios(),
    ]);

    setChamados(chamadosData);
    setUsuarios(usuariosData);
  }

  useEffect(() => {
    carregarDados();
  }, []);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    await criarChamado({
      titulo: form.titulo,
      descricao: form.descricao,
      categoria: form.categoria as any,
      prioridade: form.prioridade as any,
      usuarioId: Number(form.usuarioId),
    });

    setForm({
      titulo: "",
      descricao: "",
      categoria: "SOFTWARE",
      prioridade: "MEDIA",
      usuarioId: "",
    });

    carregarDados();
  }

  const chamadosFiltrados = chamados.filter((chamado) =>
    chamado.titulo.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="page-header">
        <div>
          <span>Atendimento</span>
          <h1>Chamados</h1>
        </div>
      </div>

      <section className="admin-section">
        <form onSubmit={handleSubmit} className="inline-form chamados-form">
          <input
            placeholder="Título"
            value={form.titulo}
            onChange={(e) =>
              setForm({
                ...form,
                titulo: e.target.value,
              })
            }
          />

          <input
            placeholder="Descrição"
            value={form.descricao}
            onChange={(e) =>
              setForm({
                ...form,
                descricao: e.target.value,
              })
            }
          />

          <select
            value={form.categoria}
            onChange={(e) =>
              setForm({
                ...form,
                categoria: e.target.value,
              })
            }
          >
            <option value="SOFTWARE">Software</option>
            <option value="HARDWARE">Hardware</option>
            <option value="REDE">Rede</option>
            <option value="ACESSO">Acesso</option>
            <option value="OUTROS">Outros</option>
          </select>

          <select
            value={form.prioridade}
            onChange={(e) =>
              setForm({
                ...form,
                prioridade: e.target.value,
              })
            }
          >
            <option value="BAIXA">Baixa</option>
            <option value="MEDIA">Média</option>
            <option value="ALTA">Alta</option>
            <option value="CRITICA">Crítica</option>
          </select>

          <select
            value={form.usuarioId}
            onChange={(e) =>
              setForm({
                ...form,
                usuarioId: e.target.value,
              })
            }
          >
            <option value="">Solicitante</option>

            {usuarios.map((usuario) => (
              <option
                key={usuario.id}
                value={usuario.id}
              >
                {usuario.nome}
              </option>
            ))}
          </select>

          <button
            type="submit"
            className="btn-primary"
          >
            Criar chamado
          </button>
        </form>
      </section>

      <section className="admin-section">
        <input
          placeholder="Buscar chamado..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          style={{
            width: "100%",
            marginBottom: "1rem",
            height: "44px",
            padding: "0 14px",
            border: "1px solid var(--border)",
            borderRadius: "10px",
          }}
        />

        <table className="admin-table">
          <thead>
            <tr>
              <th>Código</th>
              <th>Título</th>
              <th>Categoria</th>
              <th>Prioridade</th>
              <th>Status</th>
              <th>Técnico</th>
              <th>Ações</th>
            </tr>
          </thead>

          <tbody>
            {chamadosFiltrados.map((chamado) => (
              <tr key={chamado.id}>
                <td>#{chamado.id}</td>

                <td>{chamado.titulo}</td>

                <td>{chamado.categoria}</td>

                <td>
                  <PriorityBadge
                    prioridade={chamado.prioridade}
                  />
                </td>

                <td>
                  <StatusBadge
                    status={chamado.status}
                  />
                </td>

                <td>
                  {chamado.tecnicoId
                    ? `#${chamado.tecnicoId}`
                    : "Não atribuído"}
                </td>

                <td>
                  <Link
                    className="table-link"
                    to={`/admin/chamados/${chamado.id}`}
                  >
                    Detalhes
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </AdminLayout>
  );
}