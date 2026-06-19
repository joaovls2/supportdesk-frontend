import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { UserLayout } from "../../layouts/UserLayout";
import {
  criarChamado,
  listarChamadosDoUsuario,
} from "../../services/chamadoService";
import { enviarAnexos } from "../../services/anexoService";

import type { ChamadoResponse } from "../../types/chamado";
import { PriorityBadge } from "../../components/ui/PriorityBadge";
import { StatusBadge } from "../../components/ui/StatusBadge";

import "../admin/AdminTables.css";
import "./UsuarioChamadosPage.css";

import { sugerirChamado } from "../../services/iaService";

export function UsuarioChamadosPage() {
  const [gerandoIA, setGerandoIA] = useState(false);

  const user = JSON.parse(localStorage.getItem("supportdesk:user") || "{}");

  const [chamados, setChamados] = useState<ChamadoResponse[]>([]);
  const [etapa, setEtapa] = useState<"ia" | "revisao">("ia");

  const [problema, setProblema] = useState("");
  const [arquivos, setArquivos] = useState<File[]>([]);

  const [form, setForm] = useState({
    titulo: "",
    descricao: "",
    categoria: "SOFTWARE",
    prioridade: "MEDIA",
  });

  const [loading, setLoading] = useState(false);

  async function carregarChamados() {
    const data = await listarChamadosDoUsuario(user.id);
    setChamados(data);
  }

  useEffect(() => {
    carregarChamados();
  }, []);

  function handleSelecionarArquivos(event: React.ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) return;

    const novosArquivos = Array.from(event.target.files);

    setArquivos((arquivosAtuais) => {
      const arquivosFiltrados = novosArquivos.filter(
        (novo) =>
          !arquivosAtuais.some(
            (existente) =>
              existente.name === novo.name &&
              existente.size === novo.size
          )
      );

      return [...arquivosAtuais, ...arquivosFiltrados];
    });
}

  function abrirPreviewLocal(arquivo: File) {
    const url = URL.createObjectURL(arquivo);
    window.open(url, "_blank");
  }

  function removerArquivo(nome: string) {
    setArquivos((arquivosAtuais) =>
      arquivosAtuais.filter((arquivo) => arquivo.name !== nome)
    );
  }

  async function gerarComIA() {
  if (!problema.trim()) {
    alert("Descreva o problema antes de gerar com IA.");
    return;
  }

  try {
    setGerandoIA(true);

    const sugestao = await sugerirChamado(problema);

    setForm({
      titulo: sugestao.titulo || problema.slice(0, 60),
      descricao: sugestao.descricao || problema,

      categoria: [
        "SOFTWARE",
        "HARDWARE",
        "REDE",
        "ACESSO",
      ].includes(sugestao.categoria)
        ? sugestao.categoria
        : "SOFTWARE",

      prioridade: [
        "BAIXA",
        "MEDIA",
        "ALTA",
        "CRITICA",
      ].includes(sugestao.prioridade)
        ? sugestao.prioridade
        : "MEDIA",
    });

    setEtapa("revisao");
  } catch (error) {
    console.error(error);
    alert("Não foi possível gerar a sugestão com IA.");
  } finally {
    setGerandoIA(false);
  }
}

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    try {
      setLoading(true);

      const chamadoCriado = await criarChamado({
        titulo: form.titulo,
        descricao: form.descricao,
        categoria: form.categoria as any,
        prioridade: form.prioridade as any,
        usuarioId: user.id,
      });

      if (arquivos.length > 0) {
        const dataTransfer = new DataTransfer();

        arquivos.forEach((arquivo) => {
          dataTransfer.items.add(arquivo);
        });

        await enviarAnexos(chamadoCriado.id, dataTransfer.files);
      }

      setProblema("");
      setArquivos([]);

      setForm({
        titulo: "",
        descricao: "",
        categoria: "SOFTWARE",
        prioridade: "MEDIA",
      });

      setEtapa("ia");
      carregarChamados();
    } finally {
      setLoading(false);
    }
  }

  function renderArquivosSelecionados() {
    if (arquivos.length === 0) return null;

    return (
      <div className="selected-files">
        <strong>Anexos selecionados</strong>

        {arquivos.map((arquivo) => (
          <div key={arquivo.name} className="selected-file-item">
            <button type="button" onClick={() => abrirPreviewLocal(arquivo)}>
              {arquivo.name} — {Math.round(arquivo.size / 1024)} KB
            </button>

            <button
              type="button"
              className="remove-file-button"
              onClick={() => removerArquivo(arquivo.name)}
            >
              Remover
            </button>
          </div>
        ))}
      </div>
    );
  }

  return (
    <UserLayout>
      <div className="page-header">
        <div>
          <span>Usuário</span>
          <h1>{etapa === "ia" ? "Criar chamado com IA ✨" : "Novo chamado"}</h1>
          <p className="page-description">
            {etapa === "ia"
              ? "Descreva o problema com suas palavras. A IA cuida do resto."
              : "Revise os dados antes de registrar o chamado."}
          </p>
        </div>
      </div>

      {etapa === "ia" ? (
        <section className="ai-ticket-card">
          <label>Descreva o problema</label>

          <textarea
            placeholder="Ex: meu notebook não liga depois que atualizei ontem à noite, fica na tela preta..."
            value={problema}
            onChange={(e) => setProblema(e.target.value)}
          />

          <div className="ai-ticket-actions">
            <label className="upload-outline">
              Anexar print/imagem
              <input
                type="file"
                multiple
                accept="image/png,image/jpeg,image/webp"
                onChange={handleSelecionarArquivos}
              />
            </label>

            <button
              type="button"
              className="btn-primary"
              onClick={gerarComIA}
              disabled={gerandoIA}
            >
              {gerandoIA ? "Analisando..." : "Gerar com IA"}
            </button>
          </div>

          {renderArquivosSelecionados()}
        </section>
      ) : (
        <section className="ticket-form-card">
          <form onSubmit={handleSubmit}>
            <label>Título</label>
            <input
              value={form.titulo}
              onChange={(e) => setForm({ ...form, titulo: e.target.value })}
            />

            <label>Descrição</label>
            <textarea
              value={form.descricao}
              onChange={(e) => setForm({ ...form, descricao: e.target.value })}
            />

            <div className="form-grid">
              <div>
                <label>Categoria</label>

                <select
                  value={form.categoria}
                  onChange={(e) =>
                    setForm({ ...form, categoria: e.target.value })
                  }
                >
                  <option value="SOFTWARE">Software</option>
                  <option value="HARDWARE">Hardware</option>
                  <option value="REDE">Rede</option>
                  <option value="ACESSO">Acesso</option>
                  <option value="OUTROS">Outros</option>
                </select>
              </div>

              <div>
                <label>Prioridade</label>

                <select
                  value={form.prioridade}
                  onChange={(e) =>
                    setForm({ ...form, prioridade: e.target.value })
                  }
                >
                  <option value="BAIXA">Baixa</option>
                  <option value="MEDIA">Média</option>
                  <option value="ALTA">Alta</option>
                  <option value="CRITICA">Crítica</option>
                </select>
              </div>
            </div>

            <div className="review-upload">
              <label className="upload-outline">
                Adicionar outro anexo

                <input
                  type="file"
                  multiple
                  accept="image/png,image/jpeg,image/webp"
                  onChange={handleSelecionarArquivos}
                />
              </label>
            </div>

            {renderArquivosSelecionados()}

            <div className="form-actions">
              <button
                type="button"
                className="btn-secondary"
                onClick={() => setEtapa("ia")}
              >
                Voltar
              </button>

              <button className="btn-primary" disabled={loading}>
                {loading ? "Criando..." : "Criar chamado"}
              </button>
            </div>
          </form>
        </section>
      )}

      <section className="admin-section">
        <h2>Meus chamados</h2>

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