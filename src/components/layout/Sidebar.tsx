import React from 'react';
import { useGovLab } from '../../context/GovLabContext';
import {
  LayoutDashboard,
  Compass,
  Building2,
  FileCode2,
  TableProperties,
  Layers,
  Database,
  GitBranch,
  AlertOctagon,
  LifeBuoy,
  FileCheck2,
  ShieldAlert,
  FolderGit2,
  Truck,
  ClipboardList,
  LineChart,
  FileText,
  Users2,
  Brain,
  Award,
  Bot,
  Briefcase,
  MessagesSquare,
  BookOpen,
  GraduationCap,
  Sparkles,
} from 'lucide-react';

export type NavView =
  | 'dashboard'
  | 'journey'
  | 'company'
  | 'requirements'
  | 'rtm'
  | 'architecture'
  | 'data-api'
  | 'devops'
  | 'incidents'
  | 'problems'
  | 'changes'
  | 'nonconformities'
  | 'risks'
  | 'projects'
  | 'suppliers'
  | 'audits'
  | 'indicators'
  | 'documents'
  | 'stakeholders'
  | 'reasoning'
  | 'competencies'
  | 'gov-mentor'
  | 'portfolio'
  | 'interview'
  | 'library'
  | 'teacher';

interface NavItem {
  id: NavView;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  badgeCount?: number;
  badgeColor?: string;
}

interface NavGroup {
  group: string;
  items: NavItem[];
}

interface SidebarProps {
  currentView: NavView;
  onSelectView: (view: NavView) => void;
  onOpenProfile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, onSelectView, onOpenProfile }) => {
  const { incidents, changes, nonConformities, teacherMode, studentProfile } = useGovLab();

  const activeIncidents = incidents.filter((i) => i.status !== 'Post-Mortem Concluído').length;
  const pendingCAB = changes.filter((c) => c.status === 'Submetida ao CAB').length;
  const openNCs = nonConformities.filter((n) => n.status !== 'Encerrada').length;

  const navGroups: NavGroup[] = [
    {
      group: 'Visão Geral',
      items: [
        { id: 'dashboard' as NavView, label: 'Dashboard Executivo', icon: LayoutDashboard },
        { id: 'journey' as NavView, label: 'Minha Jornada & Missões', icon: Compass, badge: 'Mês 1' },
        { id: 'company' as NavView, label: 'A Empresa (Nexora)', icon: Building2 },
      ],
    },
    {
      group: 'Engenharia de Software & Dados',
      items: [
        { id: 'requirements' as NavView, label: 'Requirement Studio', icon: FileCode2 },
        { id: 'rtm' as NavView, label: 'Matriz Rastreabilidade (RTM)', icon: TableProperties },
        { id: 'architecture' as NavView, label: 'Arquitetura & ADRs', icon: Layers },
        { id: 'data-api' as NavView, label: 'Dados & APIs Lab', icon: Database },
        { id: 'devops' as NavView, label: 'DevOps & Confiabilidade', icon: GitBranch },
      ],
    },
    {
      group: 'Governança & ITSM (ISO / ITIL)',
      items: [
        {
          id: 'incidents' as NavView,
          label: 'Incidentes (ITSM)',
          icon: AlertOctagon,
          badgeCount: activeIncidents > 0 ? activeIncidents : undefined,
          badgeColor: 'bg-rose-500 text-white',
        },
        { id: 'problems' as NavView, label: 'Problemas & KEDB', icon: LifeBuoy },
        {
          id: 'changes' as NavView,
          label: 'Mudanças (CAB)',
          icon: FileCheck2,
          badgeCount: pendingCAB > 0 ? pendingCAB : undefined,
          badgeColor: 'bg-amber-500 text-slate-900',
        },
        {
          id: 'nonconformities' as NavView,
          label: 'Não Conformidades (CAPA)',
          icon: ShieldAlert,
          badgeCount: openNCs > 0 ? openNCs : undefined,
          badgeColor: 'bg-orange-600 text-white',
        },
        { id: 'risks' as NavView, label: 'Matriz de Riscos (5x5)', icon: ShieldAlert },
        { id: 'projects' as NavView, label: 'Projetos & Portfólio', icon: FolderGit2 },
        { id: 'suppliers' as NavView, label: 'Fornecedores & SLAs', icon: Truck },
        { id: 'audits' as NavView, label: 'Auditorias (ISO 38500)', icon: ClipboardList },
        { id: 'indicators' as NavView, label: 'Indicadores (KPI/KRI)', icon: LineChart },
        { id: 'documents' as NavView, label: 'Políticas & Catálogo', icon: FileText },
      ],
    },
    {
      group: 'Pessoas & Aprendizagem',
      items: [
        { id: 'stakeholders' as NavView, label: 'Stakeholders & Elicitação', icon: Users2 },
        { id: 'gov-mentor' as NavView, label: 'GOV-MENTOR (IA)', icon: Bot, badge: 'Socrático' },
        { id: 'reasoning' as NavView, label: 'Meu Raciocínio (Metacognição)', icon: Brain },
        { id: 'competencies' as NavView, label: 'Competências & Mastery', icon: Award },
        { id: 'portfolio' as NavView, label: 'Portfólio Profissional', icon: Briefcase },
        { id: 'interview' as NavView, label: 'Simulador de Entrevistas', icon: MessagesSquare },
        { id: 'library' as NavView, label: 'Biblioteca & Frameworks', icon: BookOpen },
      ],
    },
  ];

  if (teacherMode) {
    navGroups.push({
      group: 'Gestão Docente',
      items: [
        { id: 'teacher' as NavView, label: 'Painel do Professor & Rubricas', icon: GraduationCap, badge: 'Docente' },
      ],
    });
  }

  return (
    <aside className="w-64 bg-slate-950 border-r border-slate-800 flex flex-col shrink-0 select-none">
      {/* Brand & Logo */}
      <div className="h-16 px-5 border-b border-slate-800/80 flex items-center justify-between">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 via-indigo-500 to-purple-600 flex items-center justify-center text-white font-black text-sm shadow-md">
            G
          </div>
          <div>
            <div className="text-sm font-black tracking-wider text-slate-100 uppercase flex items-center gap-1.5">
              GOVLAB
              <span className="text-[9px] bg-cyan-950 border border-cyan-700/60 text-cyan-300 px-1 py-0.2 rounded font-mono">
                PRO
              </span>
            </div>
            <div className="text-[10px] text-slate-400 font-medium">IT Governance & Eng Lab</div>
          </div>
        </div>
      </div>

      {/* Navigation List */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6 scrollbar-thin scrollbar-thumb-slate-800">
        {navGroups.map((grp) => (
          <div key={grp.group} className="space-y-1">
            <div className="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
              {grp.group}
            </div>
            {grp.items.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectView(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all group ${
                    isActive
                      ? 'bg-gradient-to-r from-indigo-900/60 to-slate-900 text-indigo-300 font-semibold border border-indigo-700/50 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/70'
                  }`}
                >
                  <div className="flex items-center space-x-2.5 min-w-0">
                    <Icon
                      className={`w-4 h-4 shrink-0 transition-colors ${
                        isActive ? 'text-indigo-400' : 'text-slate-500 group-hover:text-slate-300'
                      }`}
                    />
                    <span className="truncate">{item.label}</span>
                  </div>
                  {item.badgeCount !== undefined && (
                    <span
                      className={`px-1.5 py-0.2 text-[10px] font-bold rounded-full ${item.badgeColor}`}
                    >
                      {item.badgeCount}
                    </span>
                  )}
                  {item.badge && !item.badgeCount && (
                    <span className="text-[9px] bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded font-mono border border-slate-700/60">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* Bottom User Role Status */}
      <div
        onClick={onOpenProfile}
        className="p-3 border-t border-slate-800/80 bg-slate-950/70 hover:bg-slate-900 cursor-pointer transition-colors group"
        title="Clique para editar seu perfil, foto e crachá funcional"
      >
        <div className="flex items-center space-x-2.5 mb-1.5">
          <div className="w-8 h-8 rounded-lg overflow-hidden bg-slate-950 border border-cyan-500/50 flex items-center justify-center shrink-0">
            {studentProfile.avatar && (studentProfile.avatar.startsWith('http') || studentProfile.avatar.startsWith('/') || studentProfile.avatar.startsWith('data:')) ? (
              <img src={studentProfile.avatar} alt="Avatar" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
            ) : (
              <span className="text-base">{studentProfile.avatar || '👨‍💻'}</span>
            )}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs text-slate-100 truncate group-hover:text-indigo-300 transition-colors">
                {studentProfile.name}
              </span>
              <span className="font-mono text-[9px] text-cyan-300 font-bold bg-cyan-950/80 px-1.5 py-0.2 rounded border border-cyan-800">
                IC{studentProfile.careerLevelNumber || 2}
              </span>
            </div>
            <div className="text-[10px] text-slate-400 truncate">
              {studentProfile.role}
            </div>
          </div>
        </div>

        {/* XP Progress Bar */}
        <div className="space-y-0.5">
          <div className="flex items-center justify-between text-[9px] text-slate-400 font-mono">
            <span>XP: {studentProfile.xp ?? 350}</span>
            <span>Meta: {studentProfile.nextLevelXp ?? 750}</span>
          </div>
          <div className="w-full bg-slate-850 rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-gradient-to-r from-emerald-500 via-cyan-500 to-indigo-500 h-1.5 rounded-full transition-all duration-500"
              style={{
                width: `${Math.min(100, Math.max(5, (((studentProfile.xp ?? 350) % 1000) / 1000) * 100))}%`,
              }}
            />
          </div>
        </div>

        <div className="flex items-center justify-between text-[9px] text-slate-500 mt-1.5">
          <span className="truncate max-w-[110px]">{studentProfile.department.split('&')[0]}</span>
          <span className="text-indigo-400 font-semibold group-hover:underline">Editar Crachá ✏️</span>
        </div>
      </div>
    </aside>
  );
};
