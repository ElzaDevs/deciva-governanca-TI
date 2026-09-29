import React, { useState } from 'react';
import { useGovLab } from '../../context/GovLabContext';
import {
  Bell,
  Search,
  Brain,
  Calendar,
  Sparkles,
  GraduationCap,
  Activity,
  CheckCircle2,
  AlertTriangle,
  Info,
  FastForward,
} from 'lucide-react';

interface HeaderProps {
  onOpenCommandPalette: () => void;
  onOpenMetacognition: () => void;
  activeViewTitle: string;
  onOpenProfile?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenCommandPalette,
  onOpenMetacognition,
  activeViewTitle,
  onOpenProfile,
}) => {
  const {
    companyState,
    studentProfile,
    notifications,
    markNotificationRead,
    realWorldMode,
    toggleRealWorldMode,
    teacherMode,
    toggleTeacherMode,
    advanceMonth,
    retroScanlinesMode,
    toggleRetroScanlines,
  } = useGovLab();

  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header className="h-16 bg-slate-900 border-b border-slate-800 px-6 flex items-center justify-between sticky top-0 z-30 shadow-sm">
      {/* Left: View title & Breadcrumb */}
      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-2">
          <span className="text-xs uppercase tracking-wider font-semibold text-slate-400">Nexora Digital</span>
          <span className="text-slate-600">/</span>
          <h1 className="text-base font-bold text-slate-100 flex items-center gap-2">
            {activeViewTitle}
          </h1>
        </div>
      </div>

      {/* Center: Command Palette Trigger */}
      <button
        onClick={onOpenCommandPalette}
        className="hidden md:flex items-center space-x-2 bg-slate-800/80 hover:bg-slate-800 text-slate-400 px-3 py-1.5 rounded-lg border border-slate-700/80 text-xs w-64 transition-all"
        title="Busca global de requisitos, incidentes, stakeholders e normas"
      >
        <Search className="w-3.5 h-3.5 text-slate-400" />
        <span className="flex-1 text-left">Buscar na empresa...</span>
        <kbd className="bg-slate-700 text-slate-300 px-1.5 py-0.5 rounded text-[10px] font-mono border border-slate-600">
          ⌘K
        </kbd>
      </button>

      {/* Right Controls */}
      <div className="flex items-center space-x-3">
        {/* Company Health Indicator */}
        <div
          className="hidden lg:flex items-center space-x-2 px-2.5 py-1 bg-slate-800/60 border border-slate-700/60 rounded-full"
          title={`Saúde Organizacional: ${companyState.companyHealthScore}/100 | Disponibilidade: ${companyState.availabilityPercent}% | SLA: ${companyState.slaCompliancePercent}%`}
        >
          <Activity
            className={`w-3.5 h-3.5 ${
              companyState.companyHealthScore >= 75
                ? 'text-emerald-400'
                : companyState.companyHealthScore >= 50
                ? 'text-amber-400'
                : 'text-rose-400'
            }`}
          />
          <span className="text-xs text-slate-300 font-medium">Saúde TI:</span>
          <span
            className={`text-xs font-bold ${
              companyState.companyHealthScore >= 75
                ? 'text-emerald-400'
                : companyState.companyHealthScore >= 50
                ? 'text-amber-400'
                : 'text-rose-400'
            }`}
          >
            {companyState.companyHealthScore}%
          </span>
        </div>

        {/* Simulation Timeline Button */}
        <div className="flex items-center bg-slate-800/80 border border-slate-700 rounded-lg p-0.5">
          <div className="flex items-center px-2 py-1 text-xs text-indigo-300 font-semibold gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-indigo-400" />
            <span>Mês {companyState.currentMonth}/12</span>
          </div>
          <button
            onClick={advanceMonth}
            className="flex items-center gap-1 text-[11px] font-medium bg-indigo-600 hover:bg-indigo-500 text-white px-2 py-1 rounded transition-colors"
            title="Avançar 1 mês na linha do tempo da Nexora Digital"
          >
            <FastForward className="w-3 h-3" />
            <span className="hidden sm:inline">Avançar</span>
          </button>
        </div>

        {/* Real World Mode Switch */}
        <button
          onClick={toggleRealWorldMode}
          className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-lg text-xs font-medium border transition-all ${
            realWorldMode
              ? 'bg-amber-950/40 text-amber-300 border-amber-600/60 shadow-sm'
              : 'bg-slate-800/60 text-slate-400 border-slate-700 hover:text-slate-200'
          }`}
          title={
            realWorldMode
              ? 'Modo Vida Real Ativo: Dicas e frameworks ocultados. Avaliação pura de competência.'
              : 'Clique para ativar o Modo Vida Real (sem facilidades ou frameworks pré-selecionados)'
          }
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span className="hidden xl:inline">Vida Real</span>
        </button>

        {/* Teacher Mode Switch */}
        <button
          onClick={toggleTeacherMode}
          className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-lg text-xs font-medium border transition-all ${
            teacherMode
              ? 'bg-purple-950/40 text-purple-300 border-purple-600/60 shadow-sm'
              : 'bg-slate-800/60 text-slate-400 border-slate-700 hover:text-slate-200'
          }`}
          title="Modo Professor / Avaliador: Acessar rubricas de competência e visão pedagógica"
        >
          <GraduationCap className="w-3.5 h-3.5" />
          <span className="hidden xl:inline">Docente</span>
        </button>

        {/* Quick Reasoning Metacognition Launcher */}
        <button
          onClick={onOpenMetacognition}
          className="flex items-center space-x-1.5 bg-cyan-950/50 hover:bg-cyan-900/60 text-cyan-300 border border-cyan-700/50 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all shadow-sm"
          title="Abrir Meu Raciocínio (Checklist Metacognitivo Pré/Pós Decisão)"
        >
          <Brain className="w-3.5 h-3.5 text-cyan-400" />
          <span className="hidden sm:inline">Meu Raciocínio</span>
        </button>

        {/* Notifications Bell */}
        <div className="relative">
          <button
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="p-2 text-slate-400 hover:text-slate-200 rounded-lg hover:bg-slate-800 relative transition-colors"
            title="Notificações operacionais"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full animate-pulse" />
            )}
          </button>

          {/* Notifications Dropdown */}
          {notificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-3 z-50 animate-in fade-in zoom-in-95 duration-100">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                  Notificações da Nexora
                </span>
                <span className="text-[11px] text-slate-400">{unreadCount} não lidas</span>
              </div>
              <div className="divide-y divide-slate-800/80 max-h-72 overflow-y-auto mt-2">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    onClick={() => markNotificationRead(n.id)}
                    className={`py-2 px-2 rounded-lg cursor-pointer transition-colors text-xs flex items-start space-x-2.5 ${
                      n.read ? 'text-slate-400 hover:bg-slate-800/50' : 'text-slate-200 bg-slate-800/80 hover:bg-slate-800'
                    }`}
                  >
                    {n.type === 'alert' ? (
                      <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                    ) : n.type === 'success' ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    ) : (
                      <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    )}
                    <div className="flex-1">
                      <p className="leading-snug">{n.title}</p>
                      <span className="text-[10px] text-slate-500 mt-1 block">{n.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Retro 2000s CRT Scanlines Toggle */}
        <button
          onClick={toggleRetroScanlines}
          type="button"
          title={retroScanlinesMode ? 'Desativar Efeito CRT Retrô' : 'Ativar Estilo Monitor CRT Anos 2000'}
          className={`px-2 py-1 rounded-lg border text-[11px] font-mono font-bold transition-all flex items-center space-x-1.5 ${
            retroScanlinesMode
              ? 'bg-emerald-950 text-emerald-300 border-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.3)]'
              : 'bg-slate-800/80 text-slate-400 hover:text-slate-200 border-slate-700'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="hidden sm:inline">CRT 2000s</span>
        </button>

        {/* Student Profile Badge */}
        <button
          onClick={onOpenProfile}
          type="button"
          title="Clique para editar seu perfil, nome e crachá funcional"
          className="flex items-center space-x-2 pl-2 border-l border-slate-800 hover:bg-slate-800/60 p-1.5 rounded-xl transition-all text-left group"
        >
          <div className="w-8 h-8 rounded-lg overflow-hidden bg-slate-950 border border-cyan-500/50 flex items-center justify-center text-sm shadow-inner group-hover:scale-105 transition-transform shrink-0">
            {studentProfile.avatar && (studentProfile.avatar.startsWith('http') || studentProfile.avatar.startsWith('/') || studentProfile.avatar.startsWith('data:')) ? (
              <img src={studentProfile.avatar} alt="Avatar" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
            ) : (
              <span>{studentProfile.avatar || '👨‍💻'}</span>
            )}
          </div>
          <div className="hidden md:block text-left">
            <div className="text-xs font-semibold text-slate-200 leading-tight group-hover:text-indigo-300 transition-colors flex items-center gap-1.5">
              <span>{studentProfile.name}</span>
              <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-indigo-950 text-indigo-300 border border-indigo-700">
                IC{studentProfile.careerLevelNumber || 2}
              </span>
            </div>
            <div className="text-[10px] text-cyan-400 font-medium leading-tight">
              {studentProfile.role} • {studentProfile.xp ?? 350} XP
            </div>
          </div>
        </button>
      </div>
    </header>
  );
};
