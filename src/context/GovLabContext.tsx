import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  CompanyState,
  StudentProfile,
  Competency,
  Requirement,
  Stakeholder,
  Incident,
  ProblemRecord,
  ChangeRequest,
  NonConformity,
  RiskItem,
  ProjectItem,
  SupplierItem,
  AuditRecord,
  ArchitectureADR,
  GovernanceDocument,
  MetricIndicator,
  Mission,
  MetacognitiveReflection,
} from '../types';
import {
  INITIAL_COMPANY_STATE,
  INITIAL_STUDENT_PROFILE,
  COMPETENCIES_SEED,
  STAKEHOLDERS_SEED,
  REQUIREMENTS_SEED,
  INCIDENTS_SEED,
  NON_CONFORMITIES_SEED,
  RISKS_SEED,
  PROJECTS_SEED,
  SUPPLIERS_SEED,
  AUDITS_SEED,
  ARCHITECTURE_ADRS_SEED,
  GOVERNANCE_DOCUMENTS_SEED,
  INDICATORS_SEED,
  CAMPAIGN_MISSIONS_SEED,
} from '../data/seedData';
import { applyCompanyImpact, evaluateRolePromotion, advanceSimulationMonth } from '../engine/simulationEngine';

export interface NotificationItem {
  id: string;
  title: string;
  time: string;
  read: boolean;
  type: 'alert' | 'info' | 'success';
  targetView?: string;
  targetId?: string;
}

interface MonthlyReportData {
  monthAdvancedTo: number;
  financialBurn: number;
  eventsOccurred: string[];
  governanceSummary: string;
}

interface GovLabContextType {
  companyState: CompanyState;
  studentProfile: StudentProfile;
  competencies: Competency[];
  requirements: Requirement[];
  stakeholders: Stakeholder[];
  incidents: Incident[];
  problems: ProblemRecord[];
  changes: ChangeRequest[];
  nonConformities: NonConformity[];
  risks: RiskItem[];
  projects: ProjectItem[];
  suppliers: SupplierItem[];
  audits: AuditRecord[];
  architectureADRs: ArchitectureADR[];
  governanceDocuments: GovernanceDocument[];
  indicators: MetricIndicator[];
  missions: Mission[];
  activeMissionId: string | null;
  metacognitiveEntries: MetacognitiveReflection[];
  realWorldMode: boolean;
  teacherMode: boolean;
  firstDayModalOpen: boolean;
  notifications: NotificationItem[];
  latestMonthlyReport: MonthlyReportData | null;
  setLatestMonthlyReport: (report: MonthlyReportData | null) => void;
  setFirstDayModalOpen: (open: boolean) => void;
  toggleRealWorldMode: () => void;
  toggleTeacherMode: () => void;
  selectActiveMission: (id: string | null) => void;
  completeMissionStep: (missionId: string, stepId: string, optionId: string) => void;
  createRequirement: (req: Partial<Requirement>) => void;
  updateRequirement: (id: string, req: Partial<Requirement>) => void;
  deleteRequirement: (id: string) => void;
  createNonConformity: (nc: Partial<NonConformity>) => void;
  updateNonConformity: (id: string, nc: Partial<NonConformity>) => void;
  createRisk: (rsk: Partial<RiskItem>) => void;
  updateRisk: (id: string, rsk: Partial<RiskItem>) => void;
  updateIncident: (id: string, inc: Partial<Incident>) => void;
  createChangeRequest: (rfc: Partial<ChangeRequest>) => void;
  updateChangeRequest: (id: string, rfc: Partial<ChangeRequest>) => void;
  createArchitectureADR: (adr: Partial<ArchitectureADR>) => void;
  recordMetacognition: (entry: Omit<MetacognitiveReflection, 'id' | 'timestamp'>) => void;
  updateStudentProfile: (profileUpdates: Partial<StudentProfile>) => void;
  advanceMonth: () => void;
  retroScanlinesMode: boolean;
  toggleRetroScanlines: () => void;
  awardXp: (amount: number, reason: string) => void;
  resetSimulation: () => void;
  markNotificationRead: (id: string) => void;
  addNotification: (notif: { title: string; type: 'alert' | 'info' | 'success' }) => void;
}

const GovLabContext = createContext<GovLabContextType | undefined>(undefined);

const STORAGE_KEY = 'govlab_simulator_v1';

export const GovLabProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [companyState, setCompanyState] = useState<CompanyState>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_company`);
    return saved ? JSON.parse(saved) : INITIAL_COMPANY_STATE;
  });

  const [studentProfile, setStudentProfile] = useState<StudentProfile>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_profile`);
    return saved ? JSON.parse(saved) : INITIAL_STUDENT_PROFILE;
  });

  const [competencies, setCompetencies] = useState<Competency[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_competencies`);
    return saved ? JSON.parse(saved) : COMPETENCIES_SEED;
  });

  const [requirements, setRequirements] = useState<Requirement[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_requirements`);
    return saved ? JSON.parse(saved) : REQUIREMENTS_SEED;
  });

  const [stakeholders, setStakeholders] = useState<Stakeholder[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_stakeholders`);
    return saved ? JSON.parse(saved) : STAKEHOLDERS_SEED;
  });

  const [incidents, setIncidents] = useState<Incident[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_incidents`);
    return saved ? JSON.parse(saved) : INCIDENTS_SEED;
  });

  const [problems, setProblems] = useState<ProblemRecord[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_problems`);
    return saved
      ? JSON.parse(saved)
      : [
          {
            id: 'PRB-01',
            code: 'PRB-042',
            title: 'Exaustão do Pool de Conexões do PostgreSQL por Relatórios Não Otimizados',
            category: 'Banco de Dados & Aplicação',
            associatedIncidents: ['INC-1042'],
            knownErrorDescription: 'Consultas pesadas de auditoria sem query timeout travam as 100 conexões disponíveis para faturamento.',
            temporaryWorkaround: 'Terminar o PID da consulta demorada via pg_terminate_backend.',
            permanentSolution: 'Configurar statement_timeout = 15s no PostgreSQL e isolar relatórios em réplica assíncrona.',
            status: 'Solução Aprovada',
            owner: 'Thiago Valente (DBA)',
            createdAt: '29/03/2026',
          },
        ];
  });

  const [changes, setChanges] = useState<ChangeRequest[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_changes`);
    return saved
      ? JSON.parse(saved)
      : [
          {
            id: 'RFC-01',
            code: 'RFC-308',
            title: 'Aplicação de Timeout de Queries no PostgreSQL de Produção',
            type: 'Normal',
            requester: 'Felipe Santana',
            systemAffected: 'PostgreSQL Primary Cluster',
            riskAssessment: 'Médio',
            impactAssessment: 'Ajuste de configuração para derrubar automaticamente consultas com mais de 15 segundos.',
            rollbackPlan: 'Comando `ALTER SYSTEM RESET statement_timeout; SELECT pg_reload_conf();` em caso de erro.',
            testEvidenceAttached: true,
            executionWindow: '30/03/2026 23:00 às 23:30',
            status: 'Submetida ao CAB',
            approvers: ['Lucas Pinho', 'Roberto Alencar'],
            justification: 'Prevenção do incidente INC-1042 e estabilização do portal B2B.',
          },
        ];
  });

  const [nonConformities, setNonConformities] = useState<NonConformity[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_nonconformities`);
    return saved ? JSON.parse(saved) : NON_CONFORMITIES_SEED;
  });

  const [risks, setRisks] = useState<RiskItem[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_risks`);
    return saved ? JSON.parse(saved) : RISKS_SEED;
  });

  const [projects, setProjects] = useState<ProjectItem[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_projects`);
    return saved ? JSON.parse(saved) : PROJECTS_SEED;
  });

  const [suppliers, setSuppliers] = useState<SupplierItem[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_suppliers`);
    return saved ? JSON.parse(saved) : SUPPLIERS_SEED;
  });

  const [audits, setAudits] = useState<AuditRecord[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_audits`);
    return saved ? JSON.parse(saved) : AUDITS_SEED;
  });

  const [architectureADRs, setArchitectureADRs] = useState<ArchitectureADR[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_adrs`);
    return saved ? JSON.parse(saved) : ARCHITECTURE_ADRS_SEED;
  });

  const [governanceDocuments, setGovernanceDocuments] = useState<GovernanceDocument[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_documents`);
    return saved ? JSON.parse(saved) : GOVERNANCE_DOCUMENTS_SEED;
  });

  const [indicators, setIndicators] = useState<MetricIndicator[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_indicators`);
    return saved ? JSON.parse(saved) : INDICATORS_SEED;
  });

  const [missions, setMissions] = useState<Mission[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_missions`);
    return saved ? JSON.parse(saved) : CAMPAIGN_MISSIONS_SEED;
  });

  const [activeMissionId, setActiveMissionId] = useState<string | null>('MSN-01');

  const [metacognitiveEntries, setMetacognitiveEntries] = useState<MetacognitiveReflection[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_metacognition`);
    return saved ? JSON.parse(saved) : [];
  });

  const [realWorldMode, setRealWorldMode] = useState<boolean>(false);
  const [teacherMode, setTeacherMode] = useState<boolean>(false);
  const [firstDayModalOpen, setFirstDayModalOpen] = useState<boolean>(() => {
    return !localStorage.getItem(`${STORAGE_KEY}_onboarding_seen`);
  });

  const [latestMonthlyReport, setLatestMonthlyReport] = useState<MonthlyReportData | null>(null);
  const [retroScanlinesMode, setRetroScanlinesMode] = useState<boolean>(() => {
    return localStorage.getItem(`${STORAGE_KEY}_retro_scanlines`) === 'true';
  });

  const toggleRetroScanlines = () => {
    setRetroScanlinesMode((prev) => {
      const nextVal = !prev;
      localStorage.setItem(`${STORAGE_KEY}_retro_scanlines`, String(nextVal));
      return nextVal;
    });
  };

  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: 'N-01',
      title: 'Incidente Crítico P1: Instabilidade no Portal B2B (INC-1042)',
      time: 'Há 12 min',
      read: false,
      type: 'alert',
    },
    {
      id: 'N-02',
      title: 'Bem-vindo à Nexora Digital: Seu gestor Roberto Alencar aguarda seu contato.',
      time: 'Hoje',
      read: false,
      type: 'info',
    },
    {
      id: 'N-03',
      title: 'Auditoria Externa: NC-2026-008 identificou 14 contas inativas no GitLab.',
      time: 'Ontem',
      read: false,
      type: 'alert',
    },
  ]);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_company`, JSON.stringify(companyState));
    localStorage.setItem(`${STORAGE_KEY}_profile`, JSON.stringify(studentProfile));
    localStorage.setItem(`${STORAGE_KEY}_competencies`, JSON.stringify(competencies));
    localStorage.setItem(`${STORAGE_KEY}_requirements`, JSON.stringify(requirements));
    localStorage.setItem(`${STORAGE_KEY}_stakeholders`, JSON.stringify(stakeholders));
    localStorage.setItem(`${STORAGE_KEY}_incidents`, JSON.stringify(incidents));
    localStorage.setItem(`${STORAGE_KEY}_problems`, JSON.stringify(problems));
    localStorage.setItem(`${STORAGE_KEY}_changes`, JSON.stringify(changes));
    localStorage.setItem(`${STORAGE_KEY}_nonconformities`, JSON.stringify(nonConformities));
    localStorage.setItem(`${STORAGE_KEY}_risks`, JSON.stringify(risks));
    localStorage.setItem(`${STORAGE_KEY}_projects`, JSON.stringify(projects));
    localStorage.setItem(`${STORAGE_KEY}_suppliers`, JSON.stringify(suppliers));
    localStorage.setItem(`${STORAGE_KEY}_audits`, JSON.stringify(audits));
    localStorage.setItem(`${STORAGE_KEY}_adrs`, JSON.stringify(architectureADRs));
    localStorage.setItem(`${STORAGE_KEY}_documents`, JSON.stringify(governanceDocuments));
    localStorage.setItem(`${STORAGE_KEY}_indicators`, JSON.stringify(indicators));
    localStorage.setItem(`${STORAGE_KEY}_missions`, JSON.stringify(missions));
    localStorage.setItem(`${STORAGE_KEY}_metacognition`, JSON.stringify(metacognitiveEntries));
  }, [
    companyState,
    studentProfile,
    competencies,
    requirements,
    stakeholders,
    incidents,
    problems,
    changes,
    nonConformities,
    risks,
    projects,
    suppliers,
    audits,
    architectureADRs,
    governanceDocuments,
    indicators,
    missions,
    metacognitiveEntries,
  ]);

  const addNotification = (notif: { title: string; type: 'alert' | 'info' | 'success' }) => {
    const newNotif: NotificationItem = {
      id: `N-${Date.now()}`,
      title: notif.title,
      time: 'Agora',
      read: false,
      type: notif.type,
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  const markNotificationRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const toggleRealWorldMode = () => {
    setRealWorldMode((prev) => {
      const next = !prev;
      addNotification({
        title: next
          ? 'Modo Vida Real ATIVADO: dicas, frameworks sugeridos e apoios visuais ocultados.'
          : 'Modo Vida Real DESATIVADO: apoios pedagógicos reativados.',
        type: 'info',
      });
      return next;
    });
  };

  const toggleTeacherMode = () => {
    setTeacherMode((prev) => !prev);
  };

  const selectActiveMission = (id: string | null) => {
    setActiveMissionId(id);
  };

  const completeMissionStep = (missionId: string, stepId: string, optionId: string) => {
    setMissions((prev) =>
      prev.map((mission) => {
        if (mission.id !== missionId) return mission;

        let totalScore = 0;
        let stepCount = 0;

        const updatedSteps = mission.steps.map((step) => {
          if (step.id !== stepId) {
            if (step.isCompleted) {
              stepCount++;
              totalScore += 100;
            }
            return step;
          }

          const chosenOpt = step.options?.find((o) => o.id === optionId);
          stepCount++;

          if (chosenOpt) {
            // Apply impact to company state
            setCompanyState((curr) => applyCompanyImpact(curr, chosenOpt.companyImpact));

            // Increase decisions count and calculate competence
            const scoreDelta = chosenOpt.quality === 'excelente' ? 100 : chosenOpt.quality === 'adequada' ? 70 : 30;
            const xpGained = chosenOpt.quality === 'excelente' ? 120 : chosenOpt.quality === 'adequada' ? 70 : 30;
            totalScore += scoreDelta;

            setStudentProfile((p) => {
              const currentXp = (p.xp ?? 350) + xpGained;
              const updatedDecisions = p.decisionsCount + 1;
              const newCompetence = Math.min(100, Math.round((p.competenceScore * p.decisionsCount + scoreDelta) / updatedDecisions));
              const updatedProfile: StudentProfile = {
                ...p,
                xp: currentXp,
                decisionsCount: updatedDecisions,
                competenceScore: newCompetence,
              };

              // Check promotion with global ladder
              const promotion = evaluateRolePromotion(updatedProfile, companyState);
              if (promotion.newRole) {
                addNotification({
                  title: `🎉 ${promotion.reason}`,
                  type: 'success',
                });
                return {
                  ...updatedProfile,
                  role: promotion.newRole,
                  department: promotion.newDepartment ?? updatedProfile.department,
                  careerLevelNumber: promotion.newLevelNumber ?? updatedProfile.careerLevelNumber,
                  nextLevelXp: promotion.newXpThreshold ?? updatedProfile.nextLevelXp,
                };
              }

              return updatedProfile;
            });

            // Update associated competencies
            setCompetencies((comps) =>
              comps.map((c) => {
                if (mission.competenciesEvaluated.includes(c.name)) {
                  const newLevel = Math.min(8, chosenOpt.quality === 'excelente' ? c.level + 1 : c.level);
                  return { ...c, level: newLevel, evidenceCount: c.evidenceCount + 1 };
                }
                return c;
              })
            );

            // Add notification
            addNotification({
              title: `Decisão registrada (+${xpGained} XP): ${chosenOpt.consequenceExplanation}`,
              type: chosenOpt.quality === 'excelente' ? 'success' : chosenOpt.quality === 'danosa' ? 'alert' : 'info',
            });
          }

          return {
            ...step,
            isCompleted: true,
            selectedOptionId: optionId,
          };
        });

        const allFinished = updatedSteps.every((s) => s.isCompleted);
        const missionFinalScore = stepCount > 0 ? Math.round(totalScore / stepCount) : 100;

        if (allFinished && mission.status !== 'concluida') {
          // Bonus XP on mission completion
          awardXp(250, `Missão "${mission.title}" concluída com sucesso!`);
        }

        return {
          ...mission,
          steps: updatedSteps,
          status: allFinished ? ('concluida' as const) : ('em_andamento' as const),
          score: allFinished ? missionFinalScore : mission.score,
        };
      })
    );
  };

  const awardXp = (amount: number, reason: string) => {
    setStudentProfile((p) => {
      const currentXp = (p.xp ?? 350) + amount;
      const tempProfile: StudentProfile = {
        ...p,
        xp: currentXp,
      };
      const promotion = evaluateRolePromotion(tempProfile, companyState);
      if (promotion.newRole) {
        addNotification({
          title: `🎉 ${promotion.reason}`,
          type: 'success',
        });
        return {
          ...tempProfile,
          role: promotion.newRole,
          department: promotion.newDepartment ?? tempProfile.department,
          careerLevelNumber: promotion.newLevelNumber ?? tempProfile.careerLevelNumber,
          nextLevelXp: promotion.newXpThreshold ?? tempProfile.nextLevelXp,
        };
      }
      return tempProfile;
    });

    addNotification({
      title: `+${amount} XP: ${reason}`,
      type: 'info',
    });
  };

  const createRequirement = (req: Partial<Requirement>) => {
    const newReq: Requirement = {
      id: `REQ-${Date.now()}`,
      code: req.code || `REQ-${String(requirements.length + 1).padStart(3, '0')}`,
      title: req.title || 'Novo Requisito',
      description: req.description || '',
      type: req.type || 'Funcional',
      priority: req.priority || 'Should have',
      status: req.status || 'Rascunho',
      stakeholderId: req.stakeholderId || 'STK-01',
      riskLevel: req.riskLevel || 'Médio',
      acceptanceCriteria: req.acceptanceCriteria || [],
      businessRules: req.businessRules || [],
      dependencies: req.dependencies || [],
      testCaseIds: req.testCaseIds || [],
      version: 1,
      author: studentProfile.name,
      updatedAt: new Date().toLocaleDateString('pt-BR'),
      ambiguityFlags: req.ambiguityFlags || [],
    };
    setRequirements((prev) => [newReq, ...prev]);
    addNotification({ title: `Requisito ${newReq.code} criado com sucesso no Requirement Studio.`, type: 'info' });
  };

  const updateRequirement = (id: string, req: Partial<Requirement>) => {
    setRequirements((prev) =>
      prev.map((r) =>
        r.id === id
          ? {
              ...r,
              ...req,
              version: r.version + 1,
              updatedAt: new Date().toLocaleDateString('pt-BR'),
            }
          : r
      )
    );
    addNotification({ title: `Requisito atualizado para nova versão.`, type: 'info' });
  };

  const deleteRequirement = (id: string) => {
    setRequirements((prev) => prev.filter((r) => r.id !== id));
  };

  const createNonConformity = (nc: Partial<NonConformity>) => {
    const newNC: NonConformity = {
      id: `NC-${Date.now()}`,
      code: nc.code || `NC-2026-${String(nonConformities.length + 1).padStart(3, '0')}`,
      title: nc.title || 'Nova Não Conformidade',
      origin: nc.origin || 'Auditoria Interna ISO 27001',
      classification: nc.classification || 'Não Conformidade Menor',
      identifiedDate: new Date().toLocaleDateString('pt-BR'),
      responsible: nc.responsible || studentProfile.name,
      department: nc.department || 'Governança & TI',
      problemDescription: nc.problemDescription || '',
      immediateContainment: nc.immediateContainment || '',
      fiveWhys: nc.fiveWhys || [],
      ishikawaFishbone: nc.ishikawaFishbone || {
        method: '',
        machine: '',
        material: '',
        measurement: '',
        manpower: '',
        environment: '',
      },
      rootCauseConclusion: nc.rootCauseConclusion || '',
      actionPlan5W2H: nc.actionPlan5W2H || {
        what: '',
        why: '',
        where: '',
        when: '',
        who: '',
        how: '',
        howMuch: '',
      },
      effectivenessEvidence: '',
      status: 'Identificada',
    };
    setNonConformities((prev) => [newNC, ...prev]);
    addNotification({ title: `Não conformidade ${newNC.code} aberta e aguardando contenção.`, type: 'alert' });
  };

  const updateNonConformity = (id: string, nc: Partial<NonConformity>) => {
    setNonConformities((prev) => prev.map((n) => (n.id === id ? { ...n, ...nc } : n)));
    addNotification({ title: `Registro de Não Conformidade atualizado.`, type: 'info' });
  };

  const createRisk = (rsk: Partial<RiskItem>) => {
    const p = rsk.inherentProbability || 3;
    const i = rsk.inherentImpact || 3;
    const newRsk: RiskItem = {
      id: `RSK-${Date.now()}`,
      code: rsk.code || `RSK-${String(risks.length + 1).padStart(3, '0')}`,
      description: rsk.description || 'Novo Risco',
      category: rsk.category || 'Tecnológico',
      threatEvent: rsk.threatEvent || '',
      vulnerabilityOrRootCause: rsk.vulnerabilityOrRootCause || '',
      consequences: rsk.consequences || '',
      inherentProbability: p,
      inherentImpact: i,
      inherentScore: p * i,
      strategy: rsk.strategy || 'Mitigar',
      controlsInPlace: rsk.controlsInPlace || [],
      residualProbability: Math.max(1, p - 1),
      residualImpact: Math.max(1, i - 1),
      residualScore: (p - 1) * (i - 1),
      owner: rsk.owner || studentProfile.name,
      status: 'Ativo',
      reviewDate: new Date().toLocaleDateString('pt-BR'),
    };
    setRisks((prev) => [newRsk, ...prev]);
    addNotification({ title: `Risco ${newRsk.code} inserido na Matriz de Riscos corporativa.`, type: 'info' });
  };

  const updateRisk = (id: string, rsk: Partial<RiskItem>) => {
    setRisks((prev) =>
      prev.map((r) => {
        if (r.id !== id) return r;
        const p = rsk.inherentProbability ?? r.inherentProbability;
        const i = rsk.inherentImpact ?? r.inherentImpact;
        const rp = rsk.residualProbability ?? r.residualProbability;
        const ri = rsk.residualImpact ?? r.residualImpact;
        return {
          ...r,
          ...rsk,
          inherentProbability: p,
          inherentImpact: i,
          inherentScore: p * i,
          residualProbability: rp,
          residualImpact: ri,
          residualScore: rp * ri,
        };
      })
    );
  };

  const updateIncident = (id: string, inc: Partial<Incident>) => {
    setIncidents((prev) => prev.map((i) => (i.id === id ? { ...i, ...inc } : i)));
    addNotification({ title: `Chamado de incidente atualizado.`, type: 'info' });
  };

  const createChangeRequest = (rfc: Partial<ChangeRequest>) => {
    const newRFC: ChangeRequest = {
      id: `RFC-${Date.now()}`,
      code: rfc.code || `RFC-${String(changes.length + 1).padStart(3, '0')}`,
      title: rfc.title || 'Requisição de Mudança',
      type: rfc.type || 'Normal',
      requester: studentProfile.name,
      systemAffected: rfc.systemAffected || 'Core System',
      riskAssessment: rfc.riskAssessment || 'Médio',
      impactAssessment: rfc.impactAssessment || '',
      rollbackPlan: rfc.rollbackPlan || '',
      testEvidenceAttached: rfc.testEvidenceAttached || false,
      executionWindow: rfc.executionWindow || 'Próximo sábado 02:00',
      status: 'Submetida ao CAB',
      approvers: ['Comitê CAB'],
      justification: rfc.justification || '',
    };
    setChanges((prev) => [newRFC, ...prev]);
    addNotification({ title: `RFC ${newRFC.code} enviada para avaliação no Comitê CAB.`, type: 'info' });
  };

  const updateChangeRequest = (id: string, rfc: Partial<ChangeRequest>) => {
    setChanges((prev) => prev.map((c) => (c.id === id ? { ...c, ...rfc } : c)));
  };

  const createArchitectureADR = (adr: Partial<ArchitectureADR>) => {
    const newADR: ArchitectureADR = {
      id: `ADR-${Date.now()}`,
      code: adr.code || `ADR-${String(architectureADRs.length + 1).padStart(3, '0')}`,
      title: adr.title || 'Nova Decisão Arquitetural',
      status: adr.status || 'Proposta',
      context: adr.context || '',
      decision: adr.decision || '',
      qualityAttributes: adr.qualityAttributes || ['Resiliência'],
      tradeOffs: adr.tradeOffs || [],
      consequencesPositive: adr.consequencesPositive || [],
      consequencesNegative: adr.consequencesNegative || [],
      author: studentProfile.name,
      date: new Date().toLocaleDateString('pt-BR'),
    };
    setArchitectureADRs((prev) => [newADR, ...prev]);
    addNotification({ title: `ADR ${newADR.code} formalizada no catálogo de arquitetura.`, type: 'success' });
  };

  const recordMetacognition = (entry: Omit<MetacognitiveReflection, 'id' | 'timestamp'>) => {
    const newEntry: MetacognitiveReflection = {
      id: `META-${Date.now()}`,
      timestamp: new Date().toLocaleString('pt-BR'),
      ...entry,
    };
    setMetacognitiveEntries((prev) => [newEntry, ...prev]);

    // Update student profile metacognitive score
    setStudentProfile((p) => ({
      ...p,
      metacognitiveScore: Math.min(100, p.metacognitiveScore + 4),
      reviewedDecisionsCount: p.reviewedDecisionsCount + 1,
    }));

    addNotification({
      title: `Registro metacognitivo salvo em "Meu Raciocínio". Maturidade analítica aumentada!`,
      type: 'success',
    });
  };

  const advanceMonth = () => {
    const result = advanceSimulationMonth(companyState, studentProfile, missions);
    setCompanyState(result.nextState);
    setStudentProfile(result.nextProfile);
    setMissions(result.updatedMissions);
    setLatestMonthlyReport(result.monthlyReport);

    addNotification({
      title: `🗓️ Avanço no tempo: Mês ${result.monthlyReport.monthAdvancedTo} da Nexora Digital iniciado!`,
      type: 'info',
    });
  };

  const updateStudentProfile = (profileUpdates: Partial<StudentProfile>) => {
    setStudentProfile((prev) => {
      const updated = { ...prev, ...profileUpdates };
      localStorage.setItem(`${STORAGE_KEY}_profile`, JSON.stringify(updated));
      return updated;
    });
    addNotification({
      title: 'Perfil corporativo do analista atualizado com sucesso.',
      type: 'success',
    });
  };

  const resetSimulation = () => {
    localStorage.clear();
    setCompanyState(INITIAL_COMPANY_STATE);
    setStudentProfile(INITIAL_STUDENT_PROFILE);
    setCompetencies(COMPETENCIES_SEED);
    setRequirements(REQUIREMENTS_SEED);
    setStakeholders(STAKEHOLDERS_SEED);
    setIncidents(INCIDENTS_SEED);
    setNonConformities(NON_CONFORMITIES_SEED);
    setRisks(RISKS_SEED);
    setProjects(PROJECTS_SEED);
    setSuppliers(SUPPLIERS_SEED);
    setAudits(AUDITS_SEED);
    setArchitectureADRs(ARCHITECTURE_ADRS_SEED);
    setGovernanceDocuments(GOVERNANCE_DOCUMENTS_SEED);
    setIndicators(INDICATORS_SEED);
    setMissions(CAMPAIGN_MISSIONS_SEED);
    setMetacognitiveEntries([]);
    setFirstDayModalOpen(true);
    addNotification({ title: 'Simulador reiniciado para o estado padrão de contratação.', type: 'info' });
  };

  return (
    <GovLabContext.Provider
      value={{
        companyState,
        studentProfile,
        competencies,
        requirements,
        stakeholders,
        incidents,
        problems,
        changes,
        nonConformities,
        risks,
        projects,
        suppliers,
        audits,
        architectureADRs,
        governanceDocuments,
        indicators,
        missions,
        activeMissionId,
        metacognitiveEntries,
        realWorldMode,
        teacherMode,
        firstDayModalOpen,
        notifications,
        latestMonthlyReport,
        setLatestMonthlyReport,
        setFirstDayModalOpen,
        toggleRealWorldMode,
        toggleTeacherMode,
        selectActiveMission,
        completeMissionStep,
        createRequirement,
        updateRequirement,
        deleteRequirement,
        createNonConformity,
        updateNonConformity,
        createRisk,
        updateRisk,
        updateIncident,
        createChangeRequest,
        updateChangeRequest,
        createArchitectureADR,
        recordMetacognition,
        updateStudentProfile,
        advanceMonth,
        retroScanlinesMode,
        toggleRetroScanlines,
        awardXp,
        resetSimulation,
        markNotificationRead,
        addNotification,
      }}
    >
      {children}
    </GovLabContext.Provider>
  );
};

export const useGovLab = () => {
  const context = useContext(GovLabContext);
  if (!context) {
    throw new Error('useGovLab must be used within a GovLabProvider');
  }
  return context;
};
