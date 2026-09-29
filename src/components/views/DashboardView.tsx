import React from 'react';
import { useGovLab } from '../../context/GovLabContext';
import {
  Activity,
  AlertOctagon,
  ShieldAlert,
  Clock,
  CheckCircle2,
  FileCode2,
  ArrowUpRight,
  TrendingDown,
  TrendingUp,
  Brain,
  Calendar,
  Sparkles,
  Play,
  Layers,
} from 'lucide-react';
import { NavView } from '../layout/Sidebar';

interface DashboardViewProps {
  onNavigate: (view: NavView) => void;
  onOpenMission: (missionId: string) => void;
  onEditProfile?: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  onNavigate,
  onOpenMission,
  onEditProfile,
}) => {
  const { companyState, studentProfile, incidents, nonConformities, missions, activeMissionId } = useGovLab();

  const activeIncidents = incidents.filter((i) => i.status !== 'Post-Mortem Concluído');
  const openNCs = nonConformities.filter((n) => n.status !== 'Encerrada');
  const activeMission = missions.find((m) => m.id === activeMissionId) || missions[0];

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      {/* Active Mission Hero Banner */}
      {activeMission && (
        <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-cyan-950 border border-indigo-700/50 rounded-2xl p-5 sm:p-6 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative z-10">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center space-x-2">
                <span className="text-[10px] uppercase font-bold tracking-widest text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800">
                  Missão Atual • Mês {activeMission.monthScheduled}
                </span>
                <span className="text-xs text-slate-400">• {activeMission.track}</span>
                <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-mono">
                  {activeMission.difficulty}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-100 tracking-tight">
                {activeMission.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed line-clamp-2">
                {activeMission.contextNarrative}
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => {
                  onNavigate('journey');
                  onOpenMission(activeMission.id);
                }}
                className="px-5 py-2.5 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 shadow-lg shadow-indigo-600/30 flex items-center space-x-2 transition-all"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Continuar Missão #{activeMission.number}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Corporate Vital Signs Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Availability */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Disponibilidade Global</span>
            <Activity className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-slate-100 font-mono">
            {companyState.availabilityPercent}%
          </div>
          <div className="text-[11px] text-slate-500 flex items-center gap-1">
            <span className={companyState.availabilityPercent >= 99.8 ? 'text-emerald-400' : 'text-amber-400'}>
              Meta: 99.90%
            </span>
            <span>• SLA Clientes B2B</span>
          </div>
        </div>

        {/* SLA Compliance */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Conformidade de SLA</span>
            <CheckCircle2 className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-black text-slate-100 font-mono">
            {companyState.slaCompliancePercent}%
          </div>
          <div className="text-[11px] text-slate-500 flex items-center gap-1">
            <TrendingDown className="w-3.5 h-3.5 text-rose-400" />
            <span className="text-rose-400">-1.2%</span>
            <span>pós-incidente 504</span>
          </div>
        </div>

        {/* Security Score */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Postura de Segurança (ISO 27001)</span>
            <ShieldAlert className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-2xl font-black text-slate-100 font-mono">
            {companyState.securityScore}/100
          </div>
          <div className="text-[11px] text-amber-400">
            14 contas inativas no GitLab
          </div>
        </div>

        {/* Tech Debt */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Índice de Débito Técnico</span>
            <Layers className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-2xl font-black text-slate-100 font-mono">
            {companyState.techDebtScore} pts
          </div>
          <div className="text-[11px] text-slate-500">
            Monólito legado de faturamento
          </div>
        </div>
      </div>

      {/* Main Split: Operations Watch vs Student Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2/3): Operations & Active Situations */}
        <div className="lg:col-span-2 space-y-6">
          {/* Active Incidents Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <AlertOctagon className="w-4 h-4 text-rose-400" />
                <h3 className="text-sm font-bold text-slate-200">Incidentes em Andamento (ITSM)</h3>
                <span className="bg-rose-950 border border-rose-800 text-rose-300 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {activeIncidents.length} ativos
                </span>
              </div>
              <button
                onClick={() => onNavigate('incidents')}
                className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1"
              >
                Abrir War Room <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-2.5">
              {activeIncidents.map((inc) => (
                <div
                  key={inc.id}
                  onClick={() => onNavigate('incidents')}
                  className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-slate-700 cursor-pointer transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                >
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-mono text-xs font-bold text-rose-400">{inc.code}</span>
                      <span className="text-xs font-semibold text-slate-200">{inc.title}</span>
                    </div>
                    <div className="text-[11px] text-slate-400 flex items-center gap-2">
                      <span>Sistema: {inc.affectedSystem}</span>
                      <span>•</span>
                      <span>Aberto às {inc.openedAt.slice(11)}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 shrink-0">
                    <span className="text-[10px] bg-rose-950/80 text-rose-300 border border-rose-800/80 px-2 py-0.5 rounded font-semibold">
                      {inc.severity}
                    </span>
                    <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded">
                      {inc.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Non-Conformities Watch */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <ShieldAlert className="w-4 h-4 text-orange-400" />
                <h3 className="text-sm font-bold text-slate-200">Não Conformidades Críticas (CAPA)</h3>
                <span className="bg-orange-950 border border-orange-800 text-orange-300 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {openNCs.length} pendentes
                </span>
              </div>
              <button
                onClick={() => onNavigate('nonconformities')}
                className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1"
              >
                Gerenciar CAPA <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-2.5">
              {openNCs.slice(0, 2).map((nc) => (
                <div
                  key={nc.id}
                  onClick={() => onNavigate('nonconformities')}
                  className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-slate-700 cursor-pointer transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                >
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-mono text-xs font-bold text-orange-400">{nc.code}</span>
                      <span className="text-xs font-semibold text-slate-200">{nc.title}</span>
                    </div>
                    <div className="text-[11px] text-slate-400">
                      Origem: {nc.origin} • Resp: {nc.responsible}
                    </div>
                  </div>
                  <span className="text-[10px] bg-slate-800 text-orange-300 px-2 py-0.5 rounded font-mono shrink-0">
                    {nc.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (1/3): Student Mastery & Metacognition */}
        <div className="space-y-6">
          {/* Student Profile Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Meu Perfil Profissional
              </span>
              <button
                type="button"
                onClick={onEditProfile}
                className="text-[11px] font-semibold text-indigo-400 hover:text-indigo-300 transition-colors flex items-center gap-1"
                title="Editar meu nome, cargo e perfil"
              >
                <span>Editar Crachá</span>
                <span>✏️</span>
              </button>
            </div>

            {/* Custom User Identity Display */}
            <div className="flex items-center space-x-3 bg-slate-950/80 p-3 rounded-xl border border-slate-800">
              <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-950 border border-cyan-500/50 flex items-center justify-center shrink-0 shadow-md">
                {studentProfile.avatar && (studentProfile.avatar.startsWith('http') || studentProfile.avatar.startsWith('/') || studentProfile.avatar.startsWith('data:')) ? (
                  <img src={studentProfile.avatar} alt="Avatar" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-2xl">{studentProfile.avatar || '👨‍💻'}</span>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center space-x-1.5">
                  <span className="text-sm font-bold text-slate-100 truncate">
                    {studentProfile.name}
                  </span>
                  <span className="text-[10px] font-mono text-cyan-300 font-bold bg-cyan-950/80 px-1.5 py-0.2 rounded border border-cyan-800 shrink-0">
                    IC{studentProfile.careerLevelNumber || 2}
                  </span>
                </div>
                <div className="text-xs text-cyan-400 font-semibold truncate">
                  {studentProfile.role}
                </div>
                <div className="text-[10px] text-slate-400 truncate">
                  {studentProfile.department}
                </div>
              </div>
            </div>

            {/* XP and Level Progression */}
            <div className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-850 space-y-1 text-xs">
              <div className="flex justify-between text-[11px] font-mono">
                <span className="text-slate-400">XP Corporativo:</span>
                <span className="text-emerald-400 font-bold">{studentProfile.xp ?? 350} / {studentProfile.nextLevelXp ?? 750} XP</span>
              </div>
              <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-emerald-500 to-cyan-500 h-1.5 rounded-full transition-all duration-500"
                  style={{
                    width: `${Math.min(100, Math.max(5, (((studentProfile.xp ?? 350) % 1000) / 1000) * 100))}%`,
                  }}
                />
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-400">Competência Técnica Real:</span>
                  <span className="text-cyan-400 font-bold">{studentProfile.competenceScore}%</span>
                </div>
                <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
                  <div
                    className="bg-cyan-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${studentProfile.competenceScore}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-400">Maturidade Metacognitiva:</span>
                  <span className="text-indigo-400 font-bold">{studentProfile.metacognitiveScore}%</span>
                </div>
                <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
                  <div
                    className="bg-indigo-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${studentProfile.metacognitiveScore}%` }}
                  />
                </div>
              </div>

              <div className="pt-2 grid grid-cols-2 gap-2 text-center text-xs">
                <div className="bg-slate-950 p-2 rounded-lg border border-slate-800">
                  <span className="text-slate-500 text-[10px] block">Decisões Tomadas</span>
                  <span className="text-slate-100 font-bold text-base">{studentProfile.decisionsCount}</span>
                </div>
                <div className="bg-slate-950 p-2 rounded-lg border border-slate-800">
                  <span className="text-slate-500 text-[10px] block">Reflexões Feitas</span>
                  <span className="text-slate-100 font-bold text-base">{studentProfile.reviewedDecisionsCount}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onNavigate('competencies')}
              className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Ver Matriz de Mastery (Níveis 0 a 8)</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
            </button>
          </div>

          {/* Quick Shortcuts */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              Ferramentas de Trabalho
            </span>
            <div className="space-y-1.5 text-xs">
              <button
                onClick={() => onNavigate('requirements')}
                className="w-full p-2.5 rounded-lg bg-slate-950/60 hover:bg-slate-800 text-slate-300 flex items-center justify-between transition-colors"
              >
                <div className="flex items-center space-x-2">
                  <FileCode2 className="w-4 h-4 text-cyan-400" />
                  <span>Requirement Studio</span>
                </div>
                <span className="text-[10px] text-slate-500">50+ Requisitos</span>
              </button>

              <button
                onClick={() => onNavigate('rtm')}
                className="w-full p-2.5 rounded-lg bg-slate-950/60 hover:bg-slate-800 text-slate-300 flex items-center justify-between transition-colors"
              >
                <div className="flex items-center space-x-2">
                  <Activity className="w-4 h-4 text-indigo-400" />
                  <span>Matriz de Rastreabilidade (RTM)</span>
                </div>
                <span className="text-[10px] text-slate-500">Grafo</span>
              </button>

              <button
                onClick={() => onNavigate('gov-mentor')}
                className="w-full p-2.5 rounded-lg bg-slate-950/60 hover:bg-slate-800 text-slate-300 flex items-center justify-between transition-colors"
              >
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>GOV-MENTOR (IA)</span>
                </div>
                <span className="text-[10px] text-slate-500">6 Modos</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
