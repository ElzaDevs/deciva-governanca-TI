export type RoleRank =
  | 'Trainee'
  | 'Analista Júnior'
  | 'Analista Pleno'
  | 'Analista Sênior'
  | 'Especialista'
  | 'Líder Técnico'
  | 'Coordenador'
  | 'Gestor de TI'
  | (string & {});

export type CompetencyTrack =
  | 'Fundamentos de TI'
  | 'Engenharia de Requisitos'
  | 'Engenharia de Software'
  | 'Gestão e Governança de TI'
  | 'ITSM'
  | 'Riscos, Compliance e Auditoria'
  | 'Segurança da Informação'
  | 'Arquitetura de Software'
  | 'Engenharia de Dados'
  | 'DevOps e CI/CD'
  | 'Qualidade e QA'
  | 'Profissionalização e Liderança';

export interface Competency {
  id: string;
  name: string;
  track: CompetencyTrack;
  level: number; // 0: Não conhece, 1: Reconhece, 2: Compreende, 3: Aplica com ajuda, 4: Aplica sozinho, 5: Analisa novo, 6: Resolve complexo, 7: Justifica tecnicamente, 8: Ensina
  description: string;
  evidenceCount: number;
  lastAssessedDate: string;
}

export interface CompanyState {
  name: string;
  tagline: string;
  employeesCount: number;
  internalUsers: number;
  corporateClients: number;
  currentMonth: number; // 1 to 12
  companyHealthScore: number; // 0 to 100
  availabilityPercent: number; // e.g. 99.82
  slaCompliancePercent: number; // e.g. 96.4
  securityScore: number; // 0 to 100
  techDebtScore: number; // 0 to 100 (lower is better)
  riskIndexScore: number; // 0 to 100 (lower is better)
  budgetRemaining: number;
  monthlyBurnRate: number;
  userSatisfaction: number; // 0 to 100
  activeIncidentsCount: number;
}

export interface StudentProfile {
  name: string;
  email: string;
  role: RoleRank;
  department: string;
  avatar?: string;
  specializationFocus?: string;
  bio?: string;
  supervisorName: string;
  supervisorRole: string;
  startDate: string;
  simulationMonth: number;
  decisionsCount: number;
  reviewedDecisionsCount: number;
  metacognitiveScore: number;
  confidenceScore: number;
  competenceScore: number;
  certifications: string[];
  recurrentErrors: string[];
  careerLevelNumber?: number; // 1 to 7 (IC1 to IC7)
  xp?: number;
  nextLevelXp?: number;
}

export type ReqType = 'Funcional' | 'Não Funcional' | 'Regra de Negócio' | 'Restrição Técnica';
export type ReqPriority = 'Must have' | 'Should have' | 'Could have' | 'Won\'t have';
export type ReqStatus = 'Rascunho' | 'Em Análise' | 'Aprovado' | 'Em Desenvolvimento' | 'Validado' | 'Rejeitado';

export interface Requirement {
  id: string;
  code: string; // e.g. REQ-001
  title: string;
  description: string;
  type: ReqType;
  priority: ReqPriority;
  status: ReqStatus;
  stakeholderId: string;
  riskLevel: 'Baixo' | 'Médio' | 'Alto' | 'Crítico';
  acceptanceCriteria: string[];
  businessRules: string[];
  dependencies: string[];
  testCaseIds: string[];
  version: number;
  author: string;
  updatedAt: string;
  ambiguityFlags: string[]; // detected ambivalence/vagueness (e.g. "rápido", "fácil", "seguro")
}

export interface Stakeholder {
  id: string;
  name: string;
  role: string;
  department: string;
  avatar: string;
  influenceLevel: 'Alta' | 'Média' | 'Baixa';
  interestLevel: 'Alto' | 'Médio' | 'Baixo';
  personality: string;
  mainGoals: string[];
  hiddenConcerns: string[];
  initialStatement: string;
  dialogueTree: {
    id: string;
    question: string;
    response: string;
    revealedClue?: string;
    impactOnInvestigation?: string;
  }[];
}

export type IncidentSeverity = 'P1 - Crítico' | 'P2 - Alto' | 'P3 - Médio' | 'P4 - Baixo';
export type IncidentStatus = 'Investigação' | 'Contenção' | 'Mitigado' | 'Resolvido' | 'Post-Mortem Concluído';

export interface Incident {
  id: string;
  code: string; // INC-102
  title: string;
  severity: IncidentSeverity;
  status: IncidentStatus;
  affectedSystem: string;
  reportedBy: string;
  openedAt: string;
  durationMinutes: number;
  slaLimitHours: number;
  slaBreached: boolean;
  telemetryLogs: string[];
  timeline: { time: string; event: string; author: string }[];
  warRoomChat: { sender: string; role: string; message: string; timestamp: string }[];
  rootCauseAnalysis?: {
    identifiedRootCause: string;
    contributingFactors: string[];
    preventiveActions: string[];
  };
}

export interface ProblemRecord {
  id: string;
  code: string; // PRB-042
  title: string;
  category: string;
  associatedIncidents: string[];
  knownErrorDescription: string;
  temporaryWorkaround: string;
  permanentSolution: string;
  status: 'Sob Investigação' | 'Known Error Registrado' | 'Solução Aprovada' | 'Resolvido';
  owner: string;
  createdAt: string;
}

export type ChangeType = 'Standard' | 'Normal' | 'Emergencial';
export type ChangeStatus = 'Rascunho' | 'Submetida ao CAB' | 'Aprovada' | 'Rejeitada' | 'Executada' | 'Rollback Realizado';

export interface ChangeRequest {
  id: string;
  code: string; // RFC-308
  title: string;
  type: ChangeType;
  requester: string;
  systemAffected: string;
  riskAssessment: 'Baixo' | 'Médio' | 'Alto';
  impactAssessment: string;
  rollbackPlan: string;
  testEvidenceAttached: boolean;
  executionWindow: string;
  status: ChangeStatus;
  approvers: string[];
  justification: string;
}

export type NonConformityClassification = 'Não Conformidade Maior' | 'Não Conformidade Menor' | 'Observação' | 'Oportunidade de Melhoria';
export type NonConformityStatus =
  | 'Identificada'
  | 'Contenção Imediata'
  | 'Análise de Causa Raiz'
  | 'Plano de Ação (5W2H)'
  | 'Implementação'
  | 'Avaliação de Eficácia'
  | 'Encerrada';

export interface NonConformity {
  id: string;
  code: string; // NC-2024-01
  title: string;
  origin: 'Auditoria Interna ISO 27001' | 'Auditoria ISO/IEC 38500' | 'Incidente de Produção' | 'Reclamação de Cliente B2B' | 'Auditoria de Processos';
  classification: NonConformityClassification;
  identifiedDate: string;
  responsible: string;
  department: string;
  problemDescription: string;
  immediateContainment: string;
  fiveWhys: string[];
  ishikawaFishbone: {
    method: string;
    machine: string;
    material: string;
    measurement: string;
    manpower: string;
    environment: string;
  };
  rootCauseConclusion: string;
  actionPlan5W2H: {
    what: string;
    why: string;
    where: string;
    when: string;
    who: string;
    how: string;
    howMuch: string;
  };
  effectivenessEvidence: string;
  effectivenessEvaluationDate?: string;
  status: NonConformityStatus;
  recurrentPenalty?: boolean;
}

export interface RiskItem {
  id: string;
  code: string; // RSK-01
  description: string;
  category: 'Tecnológico' | 'Segurança da Informação' | 'Operacional' | 'Conformidade/Regulatório' | 'Estratégico' | 'Fornecedores';
  threatEvent: string;
  vulnerabilityOrRootCause: string;
  consequences: string;
  inherentProbability: number; // 1 to 5
  inherentImpact: number; // 1 to 5
  inherentScore: number; // P * I
  strategy: 'Mitigar' | 'Evitar' | 'Transferir' | 'Aceitar';
  controlsInPlace: string[];
  residualProbability: number;
  residualImpact: number;
  residualScore: number;
  owner: string;
  status: 'Ativo' | 'Em Monitoramento' | 'Tratado' | 'Crítico';
  reviewDate: string;
}

export interface ProjectItem {
  id: string;
  code: string; // PRJ-01
  name: string;
  description: string;
  department: string;
  requestedBy: string;
  budgetCap: number;
  estimatedDurationMonths: number;
  strategicAlignment: 'Crítico' | 'Alto' | 'Médio' | 'Baixo';
  roiEstimate: string;
  riskRating: 'Baixo' | 'Médio' | 'Alto' | 'Crítico';
  capacityCostHours: number;
  status: 'Proposto' | 'Em Avaliação de Comitê' | 'Aprovado' | 'Em Execução' | 'Pausado' | 'Cancelado';
}

export interface SupplierItem {
  id: string;
  name: string;
  category: 'Cloud Infrastructure' | 'Gateway de Pagamentos' | 'Segurança Gerenciada (MSSP)' | 'SaaS Corporativo' | 'Helpdesk Terceirizado' | 'Consultoria Especializada';
  contractedSla: string;
  currentPerformancePercent: number;
  monthlyCost: number;
  contractExpiryDate: string;
  securityRating: 'A' | 'B' | 'C' | 'D';
  status: 'Conforme' | 'Alerta de SLA' | 'Penalidade Aplicada' | 'Risco de Ruptura';
  contactPerson: string;
  incidentsCausedCount: number;
}

export interface AuditRecord {
  id: string;
  code: string;
  title: string;
  framework: 'ISO/IEC 38500:2024' | 'ISO/IEC 27001:2022' | 'ITIL 4 Practice Standard' | 'COBIT 2019' | 'LGPD / Privacidade';
  auditDate: string;
  leadAuditor: string;
  scope: string;
  status: 'Planejada' | 'Em Campo' | 'Relatório Emitido' | 'Ações em Acompanhamento';
  checklistItems: {
    controlId: string;
    requirementClause: string;
    expectedEvidence: string;
    providedEvidence: string;
    verdict: 'Conforme' | 'Não Conforme Maior' | 'Não Conforme Menor' | 'Oportunidade de Melhoria' | 'Evidência Insuficiente';
    justification: string;
  }[];
}

export interface ArchitectureADR {
  id: string;
  code: string; // ADR-001
  title: string;
  status: 'Proposta' | 'Aceita' | 'Depreciada' | 'Substituída';
  context: string;
  decision: string;
  qualityAttributes: string[];
  tradeOffs: string[];
  consequencesPositive: string[];
  consequencesNegative: string[];
  author: string;
  date: string;
}

export interface MetacognitiveReflection {
  id: string;
  timestamp: string;
  decisionTitle: string;
  phase: 'Pre-Decisão' | 'Pós-Decisão';
  whatIKnow: string;
  whatIsMissing: string;
  hypothesis: string;
  evidenceUsed: string;
  risksConsidered: string;
  alternativesConsidered: string;
  confidenceRating: number; // 1 to 10
  expectedOutcome?: string;
  actualOutcome?: string;
  whatWasAccurate?: string;
  whatWasIgnored?: string;
  whatWouldDoDifferently?: string;
  scoreEarned?: number;
}

export interface MissionStep {
  id: string;
  order: number;
  title: string;
  instructions: string;
  type:
    | 'investigation'
    | 'dialogue'
    | 'requirement_refine'
    | 'decision_choice'
    | 'rca_5whys'
    | 'action_plan_5w2h'
    | 'audit_evaluation'
    | 'metacognitive_reflection';
  hints: string[];
  options?: {
    id: string;
    text: string;
    rationale: string;
    quality: 'excelente' | 'adequada' | 'superficial' | 'danosa';
    consequenceExplanation: string;
    companyImpact: {
      health: number;
      techDebt: number;
      sla: number;
      risk: number;
    };
  }[];
  isCompleted: boolean;
  selectedOptionId?: string;
  userFreeResponse?: string;
  expertFeedback?: string;
}

export interface Mission {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  track: CompetencyTrack;
  difficulty: 'Iniciante' | 'Intermediário' | 'Avançado' | 'Executivo';
  monthScheduled: number;
  contextNarrative: string;
  problemStatement: string;
  initialDialogue: {
    speaker: string;
    speakerRole: string;
    message: string;
  };
  steps: MissionStep[];
  status: 'disponivel' | 'em_andamento' | 'concluida' | 'bloqueada';
  score?: number; // 0 to 100
  feedbackSummary?: string;
  competenciesEvaluated: string[];
}

export interface GovernanceDocument {
  id: string;
  code: string;
  title: string;
  category: 'Política' | 'Norma' | 'Procedimento Operacional' | 'Catálogo' | 'Plano de Continuidade' | 'Contrato SLA';
  version: string;
  approvedBy: string;
  lastReviewDate: string;
  summary: string;
  contentMarkdown: string;
}

export interface MetricIndicator {
  id: string;
  code: string;
  name: string;
  category: 'ITSM' | 'Segurança' | 'Finanças' | 'Qualidade' | 'Engenharia / DevOps' | 'Governança';
  currentValue: number;
  targetValue: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  isGoodWhenHigh: boolean;
  status: 'bom' | 'alerta' | 'critico';
  description: string;
}
