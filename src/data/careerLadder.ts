import { RoleRank } from '../types';

export interface GlobalCareerLevel {
  levelNumber: number; // 1 to 7
  icCode: string; // IC1 to IC7
  title: RoleRank;
  globalStandardTitle: string; // e.g. "L1 - Entry-Level IT & Operations Trainee"
  department: string;
  departmentScope: string;
  requiredXp: number;
  salaryBandUSD: string; // Real benchmark for university students & pros
  salaryBandBRL: string;
  coreResponsibilities: string[];
  keyChallenges: string[];
  unlockedTools: string[];
  recommendedCertifications: string[];
}

export const GLOBAL_CAREER_LADDER: GlobalCareerLevel[] = [
  {
    levelNumber: 1,
    icCode: 'IC1',
    title: 'Trainee',
    globalStandardTitle: 'L1 / IC1 - Estagiário & Operações de TI (ITIL Foundation)',
    department: 'Service Desk & Operações ITIL',
    departmentScope: 'Suporte N1, Catálogo de Serviços, Triagem de Incidentes e Atendimento de Primeiro Contato (FCR)',
    requiredXp: 0,
    salaryBandUSD: '$45k - $60k / ano',
    salaryBandBRL: 'R$ 2.500 - R$ 3.800 / mês',
    coreResponsibilities: [
      'Triagem de chamados operacionais e classificação de severidade (P1 a P4)',
      'Documentação de procedimentos operacionais padrão (SOPs)',
      'Comunicação inicial de incidentes sem induzir pânico nos usuários',
      'Cumprimento rigoroso de prazos de atendimento (SLA de resposta)',
    ],
    keyChallenges: [
      'Saber coletar logs e evidências sem reiniciar sistemas às cegas',
      'Diferenciar incidente de requisição de serviço comum',
    ],
    unlockedTools: ['Console de Incidentes N1', 'Base de Conhecimento ITIL', 'Visualizador de Logs'],
    recommendedCertifications: ['ITIL 4 Foundation', 'CompTIA A+', 'AWS Certified Cloud Practitioner'],
  },
  {
    levelNumber: 2,
    icCode: 'IC2',
    title: 'Analista Júnior',
    globalStandardTitle: 'L2 / IC2 - Analista Júnior de Engenharia & Governança',
    department: 'Engenharia de Sustentação & Governança Básica',
    departmentScope: 'Investigação de Incidentes P3/P4, Elicitação de Requisitos e Rastreabilidade (RTM)',
    requiredXp: 300,
    salaryBandUSD: '$65k - $85k / ano',
    salaryBandBRL: 'R$ 4.500 - R$ 6.800 / mês',
    coreResponsibilities: [
      'Eliminar adjetivos vagos de requisitos (transformar "rápido" em métricas de latência p95)',
      'Mapear casos de teste na Matriz de Rastreabilidade de Requisitos (RTM)',
      'Identificar falhas de concorrência e pools de conexões travados em ambiente de teste',
      'Executar scripts de contenção validados pela gerência',
    ],
    keyChallenges: [
      'Negociar critérios de aceite com Product Owners teimosos',
      'Não aprovar requisitos sem regras de negócio mensuráveis',
    ],
    unlockedTools: ['Requirement Studio', 'Matriz RTM Bidirecional', 'Simulador de Entrevista de Elicitação'],
    recommendedCertifications: ['IREB CPRE-FL (Requirements)', 'ISTQB Foundation', 'Oracle Certified Associate Java'],
  },
  {
    levelNumber: 3,
    icCode: 'IC3',
    title: 'Analista Pleno',
    globalStandardTitle: 'L3 / IC3 - Analista Pleno de Riscos & Governança (GRC)',
    department: 'Governança de Riscos, GRC & Qualidade de Software',
    departmentScope: 'Auditoria de Processos ISO 27001, Matriz de Risco 5x5 e Planos de Ação CAPA (5W2H)',
    requiredXp: 750,
    salaryBandUSD: '$90k - $120k / ano',
    salaryBandBRL: 'R$ 7.500 - R$ 11.500 / mês',
    coreResponsibilities: [
      'Conduzir investigações de causa raiz com método dos 5 Porquês e Diagrama de Ishikawa (6M)',
      'Estruturar planos de ação corretiva e preventiva (CAPA 5W2H) para auditorias externas',
      'Calcular probabilidade e impacto na Matriz de Risco 5x5 e definir estratégias de mitigação',
      'Auditar políticas de menor privilégio (RBAC) e revogação de acessos de ex-funcionários',
    ],
    keyChallenges: [
      'Eliminar a cultura de apontar culpados em incidentes (adotar postura blameless)',
      'Defender planos 5W2H técnicos perante auditorias de certificação',
    ],
    unlockedTools: ['Matriz de Risco 5x5 Interativa', 'Workflow CAPA 5W2H', 'Auditoria Forense de Identidades'],
    recommendedCertifications: ['ISO/IEC 27001 Lead Implementer', 'CRISC (ISACA)', 'Scrum Master (PSM I)'],
  },
  {
    levelNumber: 4,
    icCode: 'IC4',
    title: 'Analista Sênior',
    globalStandardTitle: 'L4 / IC4 - Engenheiro / Analista Sênior de SRE & Mudanças (CAB)',
    department: 'Engenharia de Confiabilidade (SRE) & Comitê de Mudanças (CAB)',
    departmentScope: 'Post-Mortem Blameless SEV-1, Governança de Mudanças (CAB) e Resiliência de Microsserviços',
    requiredXp: 1400,
    salaryBandUSD: '$130k - $170k / ano',
    salaryBandBRL: 'R$ 13.000 - R$ 19.000 / mês',
    coreResponsibilities: [
      'Liderar comitês de homologação de mudanças críticas (CAB) avaliando planos de rollback',
      'Redigir relatórios post-mortem estruturados de incidentes graves (SEV-1) sem culpabilização',
      'Monitorar Service Level Objectives (SLOs) e Error Budgets das squads de produto',
      'Auditar contratos de fornecedores de nuvem e gateways quanto a multas de quebra de SLA',
    ],
    keyChallenges: [
      'Barrar deploys emergenciais que não possuem plano de rollback testado em banco',
      'Conciliar metas de velocidade de entrega com estabilidade de produção',
    ],
    unlockedTools: ['Comitê de Mudanças (CAB) Console', 'War Room de Incidentes P1', 'Calculadora de Error Budget'],
    recommendedCertifications: ['ITIL 4 Managing Professional', 'Certified Kubernetes Administrator (CKA)', 'AWS Solutions Architect Professional'],
  },
  {
    levelNumber: 5,
    icCode: 'IC5',
    title: 'Especialista',
    globalStandardTitle: 'L5 / IC5 - Especialista em Arquitetura Corporativa & Segurança (Staff)',
    department: 'Arquitetura Corporativa, Resiliência & Segurança (Cyber & DPO)',
    departmentScope: 'Architecture Decision Records (ADRs), Estratégia de Migração Modular e DRP/BCP (RTO/RPO)',
    requiredXp: 2200,
    salaryBandUSD: '$175k - $225k / ano',
    salaryBandBRL: 'R$ 20.000 - R$ 28.000 / mês',
    coreResponsibilities: [
      'Escrever Architecture Decision Records (ADRs) formais avaliando trade-offs de escalabilidade',
      'Definir estratégias de transição arquitetural (Strangler Fig Pattern vs Big Bang)',
      'Projetar e validar testes periódicos de continuidade de desastre (DR Restore Drills)',
      'Garantir conformidade arquitetural com a LGPD/GDPR e isolamento transacional contábil',
    ],
    keyChallenges: [
      'Evitar a febre de microsserviços desnecessários que aumentam a latência e o custo de rede',
      'Garantir RTO < 1h e RPO < 15min em simulação de blackout de datacenter',
    ],
    unlockedTools: ['Editor de ADRs Corporativas', 'Simulador de Failover Multirregião', 'Auditor de Fluxo de Dados LGPD'],
    recommendedCertifications: ['TOGAF 10 Enterprise Architect', 'CISSP (ISC²)', 'Google Cloud Certified Professional Cloud Architect'],
  },
  {
    levelNumber: 6,
    icCode: 'IC6',
    title: 'Líder Técnico',
    globalStandardTitle: 'L6 / IC6 - Líder Técnico & Coordenador de Governança Estratégica',
    department: 'Governança Ágil, PMO & Delivery Estratégico',
    departmentScope: 'Alinhamento Estratégico COBIT 2019, Priorização de Portfólio (MoSCoW) e Liderança de Múltiplos Squads',
    requiredXp: 3200,
    salaryBandUSD: '$230k - $290k / ano',
    salaryBandBRL: 'R$ 28.000 - R$ 38.000 / mês',
    coreResponsibilities: [
      'Alocar orçamento de R$ 600k contra demandas de R$ 1.5M usando critérios matemáticos de ROI e Risco',
      'Alinhar objetivos de governança de TI com a diretoria financeira (CFO) e diretoria de negócios',
      'Estruturar a Matriz RACI para entregas multifuncionais e comitês de produto',
      'Mentoria técnica de engenheiros juniores e plenos na cultura de qualidade e governança',
    ],
    keyChallenges: [
      'Dizer não a diretores comerciais sem gerar animosidade política',
      'Manter a cadência de entrega do portfólio dentro da capacidade de engenharia da empresa',
    ],
    unlockedTools: ['Matriz de Priorização de Portfólio', 'Simulador de Capacidade de Engenharia', 'Painel de Alinhamento COBIT'],
    recommendedCertifications: ['COBIT 2019 Foundation & Design', 'PMI-PMP', 'SAFe Practice Consultant (SPC)'],
  },
  {
    levelNumber: 7,
    icCode: 'IC7',
    title: 'Gestor de TI',
    globalStandardTitle: 'L7 / IC7 - Diretor Executivo de Governança & Tecnologia (CIO Office)',
    department: 'Diretoria Executiva de Tecnologia & Governança Corporativa',
    departmentScope: 'Governança Corporativa ISO/IEC 38500, Auditorias Regulatórias Globais e Fusões & Aquisições (M&A)',
    requiredXp: 4500,
    salaryBandUSD: '$300k - $450k+ / ano',
    salaryBandBRL: 'R$ 40.000 - R$ 60.000+ / mês',
    coreResponsibilities: [
      'Defender a maturidade e a conformidade da empresa perante o Conselho de Administração',
      'Liderar a defesa técnica na auditoria externa de certificação internacional (ISO 27001 & ISO 38500)',
      'Gerir o orçamento global de CapEx e OpEx da tecnologia e governança',
      'Conduzir o processo de Due Diligence de TI em processos de fusão e aquisição corporativa (M&A)',
    ],
    keyChallenges: [
      'Traduzir indicadores técnicos complexos em impacto financeiro e risco de negócio para acionistas',
      'Garantir continuidade operacional ininterrupta e sobrevivência legal da companhia',
    ],
    unlockedTools: ['Console Executivo do Conselho (Board of Directors)', 'Painel de Due Diligence M&A', 'Relatório de Auditoria Externa'],
    recommendedCertifications: ['CGEIT (Certified in the Governance of Enterprise IT - ISACA)', 'MIT Sloan Executive Tech Leadership', 'IBGC Certificação de Conselheiros'],
  },
];

export function getCareerLevelForRole(role: RoleRank): GlobalCareerLevel {
  const normalized = (role || '').toLowerCase();
  if (normalized.includes('trainee') || normalized.includes('estágio') || normalized.includes('estagiário')) {
    return GLOBAL_CAREER_LADDER[0];
  }
  if (normalized.includes('júnior') || normalized.includes('junior')) {
    return GLOBAL_CAREER_LADDER[1];
  }
  if (normalized.includes('pleno') || normalized.includes('mid')) {
    return GLOBAL_CAREER_LADDER[2];
  }
  if (normalized.includes('sênior') || normalized.includes('senior')) {
    return GLOBAL_CAREER_LADDER[3];
  }
  if (normalized.includes('especialista') || normalized.includes('staff')) {
    return GLOBAL_CAREER_LADDER[4];
  }
  if (normalized.includes('líder') || normalized.includes('lider') || normalized.includes('coordenador') || normalized.includes('principal')) {
    return GLOBAL_CAREER_LADDER[5];
  }
  if (normalized.includes('gestor') || normalized.includes('diretor') || normalized.includes('head') || normalized.includes('cio')) {
    return GLOBAL_CAREER_LADDER[6];
  }
  // Default to level 2 (Junior)
  return GLOBAL_CAREER_LADDER[1];
}

export function getCareerLevelByNumber(num: number): GlobalCareerLevel {
  const clamped = Math.max(1, Math.min(7, num));
  return GLOBAL_CAREER_LADDER[clamped - 1];
}

export function calculateCareerLevel(xp: number): GlobalCareerLevel {
  for (let i = GLOBAL_CAREER_LADDER.length - 1; i >= 0; i--) {
    if (xp >= GLOBAL_CAREER_LADDER[i].requiredXp) {
      return GLOBAL_CAREER_LADDER[i];
    }
  }
  return GLOBAL_CAREER_LADDER[0];
}
