import { Requirement, NonConformity, ChangeRequest } from '../types';

export interface AuditCheckResult {
  passed: boolean;
  score: number; // 0 to 100
  title: string;
  findings: {
    type: 'critical' | 'warning' | 'info';
    message: string;
    recommendation: string;
  }[];
}

export function auditRequirementQuality(req: Partial<Requirement>): AuditCheckResult {
  const findings: AuditCheckResult['findings'] = [];
  let score = 100;

  const ambiguousWords = [
    { word: 'rápido', fix: 'especifique percentil de latência (ex: p95 < 800ms sob 500 req/s)' },
    { word: 'fácil', fix: 'defina taxa de sucesso de primeira tentativa ou SUS score > 80' },
    { word: 'amigável', fix: 'especifique padrões de heurística de Nielsen ou tempo limite de onboarding' },
    { word: 'seguro', fix: 'defina controles criptográficos (ex: TLS 1.3, AES-256) e MFA compulsório' },
    { word: 'escalável', fix: 'defina throughput alvo (ex: 2.000 requisições simultâneas sem degradação > 15%)' },
    { word: 'intuitivo', fix: 'utilize métricas de usabilidade verificáveis com usuários reais' },
    { word: 'não demorar muito', fix: 'substitua por tempo máximo de resposta em milissegundos' },
  ];

  const fullText = `${req.title || ''} ${req.description || ''} ${(req.acceptanceCriteria || []).join(' ')}`.toLowerCase();

  ambiguousWords.forEach(({ word, fix }) => {
    if (fullText.includes(word)) {
      findings.push({
        type: 'critical',
        message: `Uso de termo ambíguo/subjetivo: "${word}".`,
        recommendation: `Substitua por critério mensurável: ${fix}.`,
      });
      score -= 20;
    }
  });

  if (!req.acceptanceCriteria || req.acceptanceCriteria.length === 0) {
    findings.push({
      type: 'critical',
      message: 'Ausência total de critérios de aceitação (Given/When/Then ou condições verificáveis).',
      recommendation: 'Escreva pelo menos 2 critérios de aceitação objetivos para viabilizar testes de QA.',
    });
    score -= 30;
  }

  if (!req.stakeholderId) {
    findings.push({
      type: 'warning',
      message: 'Requisito órfão de stakeholder (sem patrocinador de negócio mapeado).',
      recommendation: 'Associe o requisito ao stakeholder legítimo na empresa para garantir alinhamento.',
    });
    score -= 15;
  }

  if (!req.testCaseIds || req.testCaseIds.length === 0) {
    findings.push({
      type: 'warning',
      message: 'Requisito não coberto por caso de teste na Matriz de Rastreabilidade (RTM).',
      recommendation: 'Vincule ao menos um caso de teste funcional ou de regressão.',
    });
    score -= 15;
  }

  return {
    passed: score >= 70,
    score: Math.max(0, score),
    title: 'Auditoria de Engenharia de Requisitos',
    findings,
  };
}

export function auditActionPlanQuality(nc: Partial<NonConformity>): AuditCheckResult {
  const findings: AuditCheckResult['findings'] = [];
  let score = 100;

  const planText = JSON.stringify(nc.actionPlan5W2H || {}).toLowerCase();
  const rootCause = (nc.rootCauseConclusion || '').toLowerCase();

  // Common pitfall: "Treinar os funcionários" as primary root cause fix
  if (planText.includes('treinar') || planText.includes('capacitar') || planText.includes('avisar por e-mail')) {
    if (!planText.includes('automatiz') && !planText.includes('api') && !planText.includes('script') && !planText.includes('política')) {
      findings.push({
        type: 'critical',
        message: 'Anti-padrão detectado: Plano de ação baseado unicamente em "treinamento / aviso verbal".',
        recommendation: 'Treinamento não elimina falha sistêmica. Ações eficazes de ISO 9001/27001 exigem controles técnicos automatizados (ex: automação de webhook, bloqueio de permissão no repositório) além da capacitação.',
      });
      score -= 35;
    }
  }

  if (!nc.fiveWhys || nc.fiveWhys.length < 3) {
    findings.push({
      type: 'warning',
      message: 'Análise de Causa Raiz superficial: menos de 3 níveis de "Porquês" explorados.',
      recommendation: 'Aprofunde até a falha de processo ou de arquitetura que permitiu a ocorrência do erro.',
    });
    score -= 20;
  }

  if (!nc.actionPlan5W2H?.howMuch || nc.actionPlan5W2H.howMuch.trim() === '') {
    findings.push({
      type: 'warning',
      message: 'Orçamento/custo (How Much) do plano de ação 5W2H não quantificado.',
      recommendation: 'Estime o custo em horas técnicas ou contratação para análise de viabilidade.',
    });
    score -= 10;
  }

  return {
    passed: score >= 70,
    score: Math.max(0, score),
    title: 'Auditoria de Eficácia de Plano de Ação (CAPA)',
    findings,
  };
}

export function auditChangeRequest(rfc: Partial<ChangeRequest>): AuditCheckResult {
  const findings: AuditCheckResult['findings'] = [];
  let score = 100;

  if (!rfc.rollbackPlan || rfc.rollbackPlan.trim().length < 15) {
    findings.push({
      type: 'critical',
      message: 'Ausência de Plano de Reversão (Rollback) detalhado e comprovado.',
      recommendation: 'Descreva os passos exatos para reverter o código e o schema de banco de dados caso ocorra falha.',
    });
    score -= 40;
  }

  if (!rfc.testEvidenceAttached) {
    findings.push({
      type: 'critical',
      message: 'Mudança submetida sem evidência de testes executados em ambiente de homologação.',
      recommendation: 'Anexe logs de execução dos testes de regressão antes de enviar ao CAB.',
    });
    score -= 30;
  }

  return {
    passed: score >= 70,
    score: Math.max(0, score),
    title: 'Auditoria de Comitê de Mudanças (CAB)',
    findings,
  };
}
