import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { TechnicianLayout } from "../../layouts/TechnicianLayout";
import {
  atualizarStatusChamado,
  buscarChamadoPorId,
  buscarHistoricoChamado,
} from "../../services/chamadoService";
import {
  listarAnexos,
  obterUrlDownloadAnexo,
} from "../../services/anexoService";
import type { ChamadoResponse, StatusChamado } from "../../types/chamado";
import type { HistoricoChamadoResponse } from "../../types/historico";
import type { AnexoResponse } from "../../types/anexo";
import "../admin/AdminChamadoDetalhesPage.css";

export function TecnicoChamadoDetalhesPage() {
  const { id } = useParams();
  const chamadoId = Number(id);

  const user = JSON.parse(localStorage.getItem("supportdesk:user") || "{}");

  const [chamado, setChamado] = useState<ChamadoResponse | null>(null);
  const [historico, setHistorico] = useState<HistoricoChamadoResponse[]>([]);
  const [anexos, setAnexos] = useState<AnexoResponse[]>([]);

  const [status, setStatus] = useState<StatusChamado>("EM_ANDAMENTO");
  const [comentario, setComentario] = useState("");

  async function carregarDados() {
    const [chamadoData, historicoData, anexosData] = await Promise.all([
      buscarChamadoPorId(chamadoId),
      buscarHistoricoChamado(chamadoId),
      listarAnexos(chamadoId),
    ]);

    setChamado(chamadoData);
    setHistorico(historicoData);
    setAnexos(anexosData);
  }

  useEffect(() => {
    carregarDados();
  }, [chamadoId]);

  async function handleAtualizarStatus(event: React.FormEvent) {
    event.preventDefault();

    await atualizarStatusChamado(chamadoId, {
      status,
      comentario,
      tecnicoId: user.id,
    });

    setComentario("");
    carregarDados();
  }

  if (!chamado) {
    return (
      <TechnicianLayout>
        <p>Carregando chamado...</p>
      </TechnicianLayout>
    );
  }

  return (
    <TechnicianLayout>
      <div className="page-header">
        <div>
          <span>Chamado #{chamado.id}</span>
          <h1>{chamado.titulo}</h1>
        </div>
      </div>

      <div className="details-grid">
        <section className="details-card">
          <h2>Informações</h2>

          <div className="info-list">
            <p>
              <strong>Status:</strong> {chamado.status}
            </p>

            <p>
              <strong>Prioridade:</strong> {chamado.prioridade}
            </p>

            <p>
              <strong>Categoria:</strong> {chamado.categoria}
            </p>

            <p>
              <strong>Solicitante:</strong> Usuário #{chamado.usuarioId}
            </p>

            <p>
              <strong>Criado em:</strong>{" "}
              {new Date(chamado.dataCriacao).toLocaleString("pt-BR")}
            </p>

            <p>
              <strong>Limite SLA:</strong>{" "}
              {new Date(chamado.dataLimiteSla).toLocaleString("pt-BR")}
            </p>
          </div>

          <div className="description-box">
            <strong>Descrição</strong>
            <p>{chamado.descricao}</p>
          </div>
        </section>

        <section className="details-card">
          <h2>Atualizar atendimento</h2>

          <form onSubmit={handleAtualizarStatus} className="details-form">
            <label>Status</label>

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as StatusChamado)}
            >
              <option value="EM_ANDAMENTO">Em andamento</option>
              <option value="RESOLVIDO">Resolvido</option>
              <option value="FECHADO">Fechado</option>
              <option value="REABERTO">Reaberto</option>
            </select>

            <textarea
              placeholder="Comentário da atualização"
              value={comentario}
              onChange={(e) => setComentario(e.target.value)}
            />

            <button type="submit" className="btn-primary">
              Atualizar status
            </button>
          </form>
        </section>
      </div>

      <section className="details-card attachments-card">
        <div className="attachments-header">
          <div>
            <h2>Anexos</h2>
            <p>Arquivos enviados no chamado.</p>
          </div>
        </div>

        {anexos.length === 0 ? (
          <p className="empty-text">Nenhum anexo enviado.</p>
        ) : (
          <div className="attachments-grid">
            {anexos.map((anexo) => (
              <a
                key={anexo.id}
                href={obterUrlDownloadAnexo(anexo.id)}
                target="_blank"
                className="attachment-item"
              >
                <span>{anexo.nomeArquivo}</span>
                <small>{Math.round(anexo.tamanhoArquivo / 1024)} KB</small>
              </a>
            ))}
          </div>
        )}
      </section>

      <section className="details-card timeline-card">
        <h2>Histórico</h2>

        <div className="timeline">
          {historico.map((item) => (
            <div key={item.id} className="timeline-item">
              <span className="timeline-dot"></span>

              <div>
                <strong>{item.status}</strong>
                <p>{item.comentario}</p>
                <small>
                  {new Date(item.dataAlteracao).toLocaleString("pt-BR")}
                </small>
              </div>
            </div>
          ))}
        </div>
      </section>
    </TechnicianLayout>
  );
}