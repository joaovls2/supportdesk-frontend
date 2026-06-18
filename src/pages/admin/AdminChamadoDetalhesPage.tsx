import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { AdminLayout } from "../../layouts/AdminLayout";
import {
  atribuirTecnico,
  atualizarStatusChamado,
  buscarChamadoPorId,
  buscarHistoricoChamado,
} from "../../services/chamadoService";
import { listarTecnicos } from "../../services/tecnicoService";
import {
  enviarAnexos,
  listarAnexos,
  obterUrlDownloadAnexo,
} from "../../services/anexoService";

import type { ChamadoResponse, StatusChamado } from "../../types/chamado";
import type { HistoricoChamadoResponse } from "../../types/historico";
import type { TecnicoResponse } from "../../types/tecnico";
import type { AnexoResponse } from "../../types/anexo";

import "./AdminChamadoDetalhesPage.css";

export function AdminChamadoDetalhesPage() {
  const { id } = useParams();
  const chamadoId = Number(id);

  const [chamado, setChamado] = useState<ChamadoResponse | null>(null);
  const [historico, setHistorico] = useState<HistoricoChamadoResponse[]>([]);
  const [tecnicos, setTecnicos] = useState<TecnicoResponse[]>([]);
  const [anexos, setAnexos] = useState<AnexoResponse[]>([]);

  const [tecnicoId, setTecnicoId] = useState("");
  const [status, setStatus] = useState<StatusChamado>("EM_ANDAMENTO");
  const [comentario, setComentario] = useState("");

  async function carregarDados() {
    const [chamadoData, historicoData, tecnicosData, anexosData] =
      await Promise.all([
        buscarChamadoPorId(chamadoId),
        buscarHistoricoChamado(chamadoId),
        listarTecnicos(),
        listarAnexos(chamadoId),
      ]);

    setChamado(chamadoData);
    setHistorico(historicoData);
    setTecnicos(tecnicosData);
    setAnexos(anexosData);

    if (chamadoData.tecnicoId) {
      setTecnicoId(String(chamadoData.tecnicoId));
    }
  }

  useEffect(() => {
    carregarDados();
  }, [chamadoId]);

  async function handleAtribuirTecnico(event: React.FormEvent) {
    event.preventDefault();

    if (!tecnicoId) {
      alert("Selecione um técnico.");
      return;
    }

    await atribuirTecnico(chamadoId, Number(tecnicoId));

    alert("Técnico atribuído com sucesso.");
    carregarDados();
  }

  async function handleAtualizarStatus(event: React.FormEvent) {
    event.preventDefault();

    const tecnicoSelecionado = Number(tecnicoId || chamado?.tecnicoId);

    if (!tecnicoSelecionado) {
      alert("Atribua um técnico antes de atualizar o status.");
      return;
    }

    await atualizarStatusChamado(chamadoId, {
      status,
      comentario: comentario || "Status atualizado.",
      tecnicoId: tecnicoSelecionado,
    });

    setComentario("");
    carregarDados();
  }

  async function handleUpload(event: React.ChangeEvent<HTMLInputElement>) {
    if (!event.target.files || event.target.files.length === 0) return;

    await enviarAnexos(chamadoId, event.target.files);

    event.target.value = "";
    carregarDados();
  }

  if (!chamado) {
    return (
      <AdminLayout>
        <p>Carregando chamado...</p>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
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
            <p><strong>Status:</strong> {chamado.status}</p>
            <p><strong>Prioridade:</strong> {chamado.prioridade}</p>
            <p><strong>Categoria:</strong> {chamado.categoria}</p>
            <p><strong>Solicitante:</strong> Usuário #{chamado.usuarioId}</p>
            <p>
              <strong>Técnico:</strong>{" "}
              {chamado.tecnicoId ? `Técnico #${chamado.tecnicoId}` : "Não atribuído"}
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
          <h2>Ações do Admin</h2>

          <form onSubmit={handleAtribuirTecnico} className="details-form">
            <label>Atribuir técnico</label>

            <select
              value={tecnicoId}
              onChange={(e) => setTecnicoId(e.target.value)}
            >
              <option value="">Selecione um técnico</option>

              {tecnicos.map((tecnico) => (
                <option key={tecnico.id} value={tecnico.id}>
                  {tecnico.nome}
                </option>
              ))}
            </select>

            <button type="submit" className="btn-primary">
              Atribuir técnico
            </button>
          </form>

          <form onSubmit={handleAtualizarStatus} className="details-form">
            <label>Atualizar status</label>

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as StatusChamado)}
            >
              <option value="EM_ANDAMENTO">Em andamento</option>
              <option value="RESOLVIDO">Resolvido</option>
              <option value="FECHADO">Fechado</option>
              <option value="REABERTO">Reaberto</option>
              <option value="CANCELADO">Cancelado</option>
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
            <p>Envie prints ou imagens relacionadas ao chamado.</p>
          </div>

          <label className="upload-button">
            Enviar arquivos
            <input
              type="file"
              multiple
              accept="image/png,image/jpeg,image/webp"
              onChange={handleUpload}
            />
          </label>
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
                <small>{new Date(item.dataAlteracao).toLocaleString("pt-BR")}</small>
              </div>
            </div>
          ))}
        </div>
      </section>
    </AdminLayout>
  );
}