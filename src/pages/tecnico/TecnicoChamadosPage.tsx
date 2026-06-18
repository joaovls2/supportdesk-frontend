import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { TechnicianLayout } from "../../layouts/TechnicianLayout";
import { listarChamadosDoTecnico } from "../../services/chamadoService";
import type { ChamadoResponse } from "../../types/chamado";
import { PriorityBadge } from "../../components/ui/PriorityBadge";
import { StatusBadge } from "../../components/ui/StatusBadge";
import "../admin/AdminTables.css";

export function TecnicoChamadosPage() {
  const user = JSON.parse(localStorage.getItem("supportdesk:user") || "{}");

  const [chamados, setChamados] = useState<ChamadoResponse[]>([]);

  async function carregarChamados() {
    const data = await listarChamadosDoTecnico(user.id);
    setChamados(data);
  }

  useEffect(() => {
    carregarChamados();
  }, []);

  return (
    <TechnicianLayout>
      <div className="page-header">
        <div>
          <span>Técnico</span>
          <h1>Chamados atribuídos</h1>
        </div>
      </div>

      <section className="admin-section">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Código</th>
              <th>Título</th>
              <th>Categoria</th>
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
                <td>{chamado.categoria}</td>
                <td>
                  <PriorityBadge prioridade={chamado.prioridade} />
                </td>
                <td>
                  <StatusBadge status={chamado.status} />
                </td>
                <td>
                  <Link
                    className="table-link"
                    to={`/tecnico/chamados/${chamado.id}`}
                  >
                    Detalhes
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </TechnicianLayout>
  );
}