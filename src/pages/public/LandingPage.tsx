import { ArrowRight, Brain, Clock, ShieldCheck, Building2 } from "lucide-react";

import { PublicLayout } from "../../layouts/PublicLayout";
import "./LandingPage.css";

export function LandingPage() {
  return (
    <PublicLayout>
      <section className="hero-section">
        <div className="hero-content">
          <span className="hero-badge">Gestão inteligente de chamados</span>

          <h1>Suporte organizado, rápido e inteligente.</h1>

          <p>
            O SupportDesk ajuda empresas a gerenciar chamados, técnicos,
            usuários, anexos, histórico, SLA e indicadores em uma experiência
            simples e moderna.
          </p>

          <div className="hero-actions">
            <a href="/criar-empresa" className="btn-primary hero-button">
              Criar Empresa
              <ArrowRight size={18} />
            </a>

            <a href="/login/admin" className="btn-secondary hero-button">
              Entrar no Sistema
            </a>
          </div>
        </div>

        <div className="hero-preview">
          <div className="preview-card">
            <div className="preview-header">
              <span>Dashboard</span>
              <strong>Hoje</strong>
            </div>

            <div className="preview-grid">
              <div>
                <strong>42</strong>
                <span>Total</span>
              </div>

              <div>
                <strong>12</strong>
                <span>Abertos</span>
              </div>

              <div>
                <strong>18</strong>
                <span>Resolvidos</span>
              </div>
            </div>

            <div className="ticket-card">
              <span className="status-dot"></span>
              <div>
                <strong>Erro no sistema</strong>
                <p>Prioridade alta • Em andamento</p>
              </div>
            </div>

            <div className="ticket-card">
              <span className="status-dot success"></span>
              <div>
                <strong>Computador não liga</strong>
                <p>Resolvido • Técnico atribuído</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="recursos" className="features-section">
        <div className="section-header">
          <span>Recursos</span>
          <h2>Construído para equipes que precisam de controle.</h2>
        </div>

        <div className="features-grid">
          <article className="feature-card">
            <Brain size={28} />
            <h3>Chamados com IA</h3>
            <p>
              A IA pode sugerir título, categoria, prioridade e descrição
              estruturada para novos chamados.
            </p>
          </article>

          <article className="feature-card">
            <Clock size={28} />
            <h3>SLA e histórico</h3>
            <p>
              Acompanhe prazos, status, mudanças e toda a linha do tempo do
              chamado.
            </p>
          </article>

          <article className="feature-card">
            <ShieldCheck size={28} />
            <h3>Segurança por perfil</h3>
            <p>
              Administradores, técnicos e usuários possuem acessos separados e
              protegidos.
            </p>
          </article>

          <article className="feature-card">
            <Building2 size={28} />
            <h3>Organização empresarial</h3>
            <p>
              Cada empresa gerencia seus próprios usuários, técnicos, chamados e
              indicadores.
            </p>
          </article>
        </div>
      </section>
    </PublicLayout>
  );
}