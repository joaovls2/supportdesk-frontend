import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { UserLayout } from "../../layouts/UserLayout";
import {
  buscarChamadoPorId,
  buscarHistoricoChamado,
} from "../../services/chamadoService";
import {
  enviarAnexos,
  listarAnexos,
  obterUrlDownloadAnexo,
} from "../../services/anexoService";
import type { ChamadoResponse } from "../../types/chamado";
import type { HistoricoChamadoResponse } from "../../types/historico";
import type { AnexoResponse } from "../../types/anexo";
import "../admin/AdminChamadoDetalhesPage.css";

export function UsuarioChamadoDetalhesPage() {
  const { id } = useParams();
  const chamadoId = Number(id);

  const [chamado, setChamado] = useState<ChamadoResponse | null>(null);
  const [historico, setHistorico] = useState<HistoricoChamadoResponse[]>([]);
  const [anexos, setAnexos] = useState<AnexoResponse[]>([]);

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

  async function handleUpload(event: React.ChangeEvent<HTMLInputElement>) {
    if (!event.target.files || event.target.files.length === 0) {
      return;
    }

    await enviarAnexos(chamadoId, event.target.files);

    event.target.value = "";
    carregarDados();
  }

  if (!chamado) {
    return (
      <UserLayout>
        <p>Carregando chamado...</p>
      </UserLayout>
    );
  }

  return (
    <UserLayout>
      <div className="page-header">
        <div>
          <span>Chamado #{chamado.id}</span>
          <h1>{chamado.titulo}</h1>
        </div>
      </div>

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
            <strong>Técnico:</strong>{" "}
            {chamado.tecnicoId
              ? `Técnico #${chamado.tecnicoId}`
              : "Não atribuído"}
          </p>
        </div>

        <div className="description-box">
          <strong>Descrição</strong>
          <p>{chamado.descricao}</p>
        </div>
      </section>

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
                <small>
                  {new Date(item.dataAlteracao).toLocaleString("pt-BR")}
                </small>
              </div>
            </div>
          ))}
        </div>
      </section>
    </UserLayout>
  );
}