import { CompanyState, StudentProfile, RoleRank, Mission } from '../types';

export interface ConsequenceEvent {
  title: string;
  description: string;
  type: 'positive' | 'warning' | 'critical';
  impactHealth: number;
  impactSla: number;
  impactSecurity: number;
  impactRisk: number;
}

import { GLOBAL_CAREER_LADDER, getCareerLevelForRole, getCareerLevelByNumber } from '../data/careerLadder';

export interface PromotionResult {
  newRole: RoleRank | null;
  newDepartment?: string;
  newLevelNumber?: number;
  newXpThreshold?: number;
  reason?: string;
}

export function evaluateRolePromotion(profile: StudentProfile, state: CompanyState): PromotionResult {
  const currentXp = profile.xp ?? 350;
  const currentLevelNum = profile.careerLevelNumber ?? 2;
  const decisions = profile.decisionsCount;
  const competence = profile.competenceScore;

  // Global Levels (IC1 to IC7)
  // L1 Trainee -> L2 Junior: XP >= 300
  if (currentLevelNum === 1 && currentXp >= 300) {
    const nextLvl = GLOBAL_CAREER_LADDER[1]; // L2
    return {
      newRole: nextLvl.title,
      newDepartment: nextLvl.department,
      newLevelNumber: 2,
      newXpThreshold: 750,
      reason: `Promovido a ${nextLvl.title} (IC2)! Transferido para o departamento de "${nextLvl.department}".`,
    };
  }

  // L2 Junior -> L3 Pleno: XP >= 750, decisions >= 3, competence >= 60
  if (currentLevelNum === 2 && currentXp >= 750 && decisions >= 2) {
    const nextLvl = GLOBAL_CAREER_LADDER[2]; // L3
    return {
      newRole: nextLvl.title,
      newDepartment: nextLvl.department,
      newLevelNumber: 3,
      newXpThreshold: 1400,
      reason: `Promovido a ${nextLvl.title} (IC3)! Assumindo responsabilidades em "${nextLvl.department}".`,
    };
  }

  // L3 Pleno -> L4 Sênior: XP >= 1400, decisions >= 5, competence >= 72
  if (currentLevelNum === 3 && currentXp >= 1400 && decisions >= 4) {
    const nextLvl = GLOBAL_CAREER_LADDER[3]; // L4
    return {
      newRole: nextLvl.title,
      newDepartment: nextLvl.department,
      newLevelNumber: 4,
      newXpThreshold: 2200,
      reason: `Promovido a ${nextLvl.title} (IC4)! Transferido para a linha de frente de "${nextLvl.department}".`,
    };
  }

  // L4 Sênior -> L5 Especialista: XP >= 2200, decisions >= 7, competence >= 80
  if (currentLevelNum === 4 && currentXp >= 2200 && decisions >= 6) {
    const nextLvl = GLOBAL_CAREER_LADDER[4]; // L5
    return {
      newRole: nextLvl.title,
      newDepartment: nextLvl.department,
      newLevelNumber: 5,
      newXpThreshold: 3200,
      reason: `Alçado a ${nextLvl.title} (IC5 / Staff)! Liderando a arquitetura corporativa em "${nextLvl.department}".`,
    };
  }

  // L5 Especialista -> L6 Líder Técnico: XP >= 3200, decisions >= 9
  if (currentLevelNum === 5 && currentXp >= 3200 && decisions >= 8) {
    const nextLvl = GLOBAL_CAREER_LADDER[5]; // L6
    return {
      newRole: nextLvl.title,
      newDepartment: nextLvl.department,
      newLevelNumber: 6,
      newXpThreshold: 4500,
      reason: `Nomeado ${nextLvl.title} (IC6)! Coordenando estratégias e governança em "${nextLvl.department}".`,
    };
  }

  // L6 Líder Técnico -> L7 Gestor de TI: XP >= 4500, decisions >= 11
  if (currentLevelNum === 6 && currentXp >= 4500 && decisions >= 10) {
    const nextLvl = GLOBAL_CAREER_LADDER[6]; // L7
    return {
      newRole: nextLvl.title,
      newDepartment: nextLvl.department,
      newLevelNumber: 7,
      newXpThreshold: 6000,
      reason: `Promovido a ${nextLvl.title} (IC7 / CIO Office)! Assumindo a Diretoria Executiva de Tecnologia & Governança.`,
    };
  }

  return { newRole: null };
}

export function applyCompanyImpact(
  currentState: CompanyState,
  impact: { health?: number; techDebt?: number; sla?: number; risk?: number; security?: number; budget?: number }
): CompanyState {
  const newHealth = Math.min(100, Math.max(10, currentState.companyHealthScore + (impact.health ?? 0)));
  const newTechDebt = Math.min(100, Math.max(0, currentState.techDebtScore + (impact.techDebt ?? 0)));
  const newSla = Math.min(100, Math.max(80, Number((currentState.slaCompliancePercent + (impact.sla ?? 0)).toFixed(2))));
  const newRisk = Math.min(100, Math.max(5, currentState.riskIndexScore + (impact.risk ?? 0)));
  const newSecurity = Math.min(100, Math.max(20, currentState.securityScore + (impact.security ?? 0)));
  const newBudget = currentState.budgetRemaining + (impact.budget ?? 0);

  // Availability recalculation based on health & tech debt
  const availability = Number((99.0 + (newHealth / 100) * 0.98 - (newTechDebt / 1000)).toFixed(2));

  return {
    ...currentState,
    companyHealthScore: newHealth,
    techDebtScore: newTechDebt,
    slaCompliancePercent: newSla,
    riskIndexScore: newRisk,
    securityScore: newSecurity,
    availabilityPercent: Math.min(99.99, Math.max(95.0, availability)),
    budgetRemaining: newBudget,
  };
}

export function advanceSimulationMonth(
  state: CompanyState,
  profile: StudentProfile,
  missions: Mission[]
): {
  nextState: CompanyState;
  nextProfile: StudentProfile;
  updatedMissions: Mission[];
  monthlyReport: {
    monthAdvancedTo: number;
    financialBurn: number;
    eventsOccurred: string[];
    governanceSummary: string;
  };
} {
  const nextMonth = Math.min(12, state.currentMonth + 1);
  const financialBurn = state.monthlyBurnRate;
  const newBudget = Math.max(0, state.budgetRemaining - financialBurn);

  const events: string[] = [
    `Ciclo contábil do Mês ${nextMonth} iniciado. Burn rate de R$ ${financialBurn.toLocaleString('pt-BR')} debitado.`,
    `Auditoria contínua de SLAs apurou índice de conformidade de ${state.slaCompliancePercent}% com os clientes B2B.`,
  ];

  // Unlock mission for new month if available
  const updatedMissions = missions.map((m) => {
    if (m.monthScheduled <= nextMonth && m.status === 'bloqueada') {
      events.push(`Nova missão desbloqueada no Mês ${nextMonth}: "${m.title}".`);
      return { ...m, status: 'disponivel' as const };
    }
    return m;
  });

  const nextState: CompanyState = {
    ...state,
    currentMonth: nextMonth,
    budgetRemaining: newBudget,
  };

  const nextProfile: StudentProfile = {
    ...profile,
    simulationMonth: nextMonth,
  };

  return {
    nextState,
    nextProfile,
    updatedMissions,
    monthlyReport: {
      monthAdvancedTo: nextMonth,
      financialBurn,
      eventsOccurred: events,
      governanceSummary: `A Nexora Digital mantém disponibilidade média de ${state.availabilityPercent}% e índice de saúde organizacional de ${state.companyHealthScore}/100.`,
    },
  };
}
