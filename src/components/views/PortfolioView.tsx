import React, { useState } from 'react';
import { useGovLab } from '../../context/GovLabContext';
import {
  Briefcase,
  Download,
  Copy,
  CheckCircle2,
  FileText,
  Printer,
  FileCode2,
  ShieldAlert,
  Layers,
  Sparkles,
} from 'lucide-react';

export const PortfolioView: React.FC = () => {
  const {
    studentProfile,
    companyState,
    requirements,
    nonConformities,
    incidents,
    architectureADRs,
    risks,
  } = useGovLab();

  const [selectedArtifact, setSelectedArtifact] = useState<string>('adr');
  const [copied, setCopied] = useState(false);

  const getArtifactContent = (type: string) => {
    if (type === 'adr') {
      const adr = architectureADRs[0];
      return `# NEXORA DIGITAL • ARCHITECTURE DECISION RECORD (ADR)
Código: ${adr.code}
Título: ${adr.title}
Data: ${adr.date}
Autor: ${studentProfile.name} (${studentProfile.role})
Status: ${adr.status}

## 1. Contexto do Problema
${adr.context}

## 2. Decisão Arquitetural
${adr.decision}

## 3. Atributos de Qualidade Atendidos
${adr.qualityAttributes.map((q) => `- ${q}`).join('\n')}

## 4. Trade-Offs e Custos Aceitos
${adr.tradeOffs.map((t) => `- ${t}`).join('\n')}

## 5. Consequências Positivas
${adr.consequencesPositive.map((c) => `- ${c}`).join('\n')}

## 6. Consequências Negativas e Mitigações
${adr.consequencesNegative.map((c) => `- ${c}`).join('\n')}

---
Evidência profissional gerada no IT Governance & Software Engineering Lab (GOVLAB).`;
    }

    if (type === 'postmortem') {
      const inc = incidents[0];
      return `# NEXORA DIGITAL • INCIDENT POST-MORTEM (BLAMELESS)
Incidente: ${inc.code} - ${inc.title}
Severidade: ${inc.severity}
Abertura: ${inc.openedAt}
Duração de Impacto: ${inc.durationMinutes} minutos
SLA Atingido: ${inc.slaBreached ? 'Descumprido' : 'Cumprido'}
Investigador Responsável: ${studentProfile.name} (${studentProfile.role})

## 1. Resumo Executivo
Instabilidade severa nas requisições do Portal B2B com erros 504 Gateway Timeout durante o pico matinal de fechamento contábil dos clientes.

## 2. Linha do Tempo Factual dos Acontecimentos
${inc.timeline.map((t) => `- [${t.time}] ${t.event} (Por: ${t.author})`).join('\n')}

## 3. Análise de Causa Raiz (Root Cause)
${inc.rootCauseAnalysis?.identifiedRootCause || 'Query desotimizada bloqueando connection pool.'}

## 4. Fatores Contribuintes
${inc.rootCauseAnalysis?.contributingFactors.map((f) => `- ${f}`).join('\n') || '- Ausência de query timeout'}

## 5. Ações Corretivas e Preventivas Permanentes
${inc.rootCauseAnalysis?.preventiveActions.map((a) => `- ${a}`).join('\n') || '- statement_timeout configurado'}

---
Evidência profissional emitida no GOVLAB.`;
    }

    if (type === 'capa') {
      const nc = nonConformities[0];
      return `# NEXORA DIGITAL • RELATÓRIO DE TRATAMENTO DE NÃO CONFORMIDADE (CAPA)
Registro: ${nc.code}
Título: ${nc.title}
Origem: ${nc.origin}
Classificação: ${nc.classification}
Data de Identificação: ${nc.identifiedDate}
Responsável pelo Tratamento: ${studentProfile.name}

## 1. Descrição do Desvio / Não Conformidade
${nc.problemDescription}

## 2. Ação Imediata de Contenção (Disposição)
${nc.immediateContainment}

## 3. Investigação de Causa Raiz (5 Porquês)
${nc.fiveWhys.map((why, idx) => `${idx + 1}º Porquê: ${why}`).join('\n')}

## 4. Conclusão da Causa Raiz Estrutural
${nc.rootCauseConclusion}

## 5. Plano de Ação Corretiva (5W2H)
- O que (What): ${nc.actionPlan5W2H.what}
- Por que (Why): ${nc.actionPlan5W2H.why}
- Onde (Where): ${nc.actionPlan5W2H.where}
- Quando (When): ${nc.actionPlan5W2H.when}
- Quem (Who): ${nc.actionPlan5W2H.who}
- Como (How): ${nc.actionPlan5W2H.how}
- Quanto custará (How Much): ${nc.actionPlan5W2H.howMuch}

## 6. Evidência de Verificação de Eficácia
${nc.effectivenessEvidence || 'Em monitoramento de eficácia pós-implantação (30 dias).'}

---
Documento em conformidade com os requisitos da ISO/IEC 27001 e ISO 9001.`;
    }

    return `# NEXORA DIGITAL • ESPECIFICAÇÃO DE REQUISITOS DE SOFTWARE (SRS)
Projeto: Plataforma Nexora B2B
Autor: ${studentProfile.name} (${studentProfile.role})
Empresa: ${companyState.name}

## Requisitos Prioritários Catalogados:
${requirements
  .slice(0, 4)
  .map(
    (r) => `### ${r.code} - ${r.title}
- Tipo: ${r.type} | Prioridade: ${r.priority} | Status: ${r.status}
- Descrição: ${r.description}
- Critérios de Aceitação:
${r.acceptanceCriteria.map((c) => `  * ${c}`).join('\n')}`
  )
  .join('\n\n')}`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getArtifactContent(selectedArtifact));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const content = getArtifactContent(selectedArtifact);
    const blob = new Blob([content], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `nexora_${selectedArtifact}_${Date.now()}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center space-x-2 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Briefcase className="w-4 h-4" />
            <span>Evidências de Carreira • Portfólio Profissional</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-100 tracking-tight">
            My Professional Portfolio
          </h2>
          <p className="text-xs text-slate-400">
            Transforme suas decisões e investigações na Nexora Digital em artefatos formais comprováveis para entrevistas de emprego.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition-colors border border-slate-700"
          >
            {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copiado!' : 'Copiar Texto'}</span>
          </button>
          <button
            onClick={handleDownload}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-all shadow-md shadow-indigo-600/30"
          >
            <Download className="w-4 h-4" />
            <span>Exportar Markdown</span>
          </button>
        </div>
      </div>

      {/* Artifact Type Selector */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-1 text-xs">
        {[
          { id: 'adr', label: 'Architecture Decision Record (ADR)', icon: Layers },
          { id: 'postmortem', label: 'Relatório Post-Mortem de Incidente', icon: FileText },
          { id: 'capa', label: 'Relatório de Não Conformidade (CAPA 5W2H)', icon: ShieldAlert },
          { id: 'srs', label: 'Especificação de Requisitos (SRS)', icon: FileCode2 },
        ].map((art) => {
          const Icon = art.icon;
          const isSelected = selectedArtifact === art.id;
          return (
            <button
              key={art.id}
              onClick={() => setSelectedArtifact(art.id)}
              className={`px-3.5 py-2 rounded-xl font-semibold whitespace-nowrap flex items-center space-x-2 transition-all ${
                isSelected
                  ? 'bg-slate-900 border border-indigo-500 text-indigo-300 shadow-md'
                  : 'bg-slate-950/60 border border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <Icon className="w-4 h-4 text-indigo-400" />
              <span>{art.label}</span>
            </button>
          );
        })}
      </div>

      {/* Artifact Document Preview Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs text-slate-400">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span className="font-semibold text-slate-200">Artefato Oficial de Engenharia</span>
          </div>
          <span className="font-mono text-[11px]">Empresa: Nexora Digital • B2B</span>
        </div>

        <pre className="bg-slate-950 p-6 rounded-xl border border-slate-800 font-mono text-xs text-slate-200 whitespace-pre-wrap leading-relaxed overflow-x-auto">
          {getArtifactContent(selectedArtifact)}
        </pre>
      </div>
    </div>
  );
};
