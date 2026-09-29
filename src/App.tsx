import React, { useState } from 'react';
import { GovLabProvider, useGovLab } from './context/GovLabContext';
import { Sidebar, NavView } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { CommandPalette } from './components/modals/CommandPalette';
import { FirstDayOnboardingModal } from './components/modals/FirstDayOnboardingModal';
import { MetacognitionModal } from './components/modals/MetacognitionModal';
import { MonthlyReportModal } from './components/modals/MonthlyReportModal';
import { RequirementEditorModal } from './components/modals/RequirementEditorModal';
import { StakeholderDialogueModal } from './components/modals/StakeholderDialogueModal';
import { NonConformityWorkflowModal } from './components/modals/NonConformityWorkflowModal';

// Views
import { DashboardView } from './components/views/DashboardView';
import { MyJourneyView } from './components/views/MyJourneyView';
import { CompanyView } from './components/views/CompanyView';
import { RequirementStudioView } from './components/views/RequirementStudioView';
import { RtmView } from './components/views/RtmView';
import { IncidentsView } from './components/views/IncidentsView';
import { ProblemsView } from './components/views/ProblemsView';
import { ChangesView } from './components/views/ChangesView';
import { NonConformitiesView } from './components/views/NonConformitiesView';
import { RiskRegisterView } from './components/views/RiskRegisterView';
import { ProjectsView } from './components/views/ProjectsView';
import { ArchitectureView } from './components/views/ArchitectureView';
import { DataAndApiLabView } from './components/views/DataAndApiLabView';
import { DevOpsView } from './components/views/DevOpsView';
import { SuppliersView } from './components/views/SuppliersView';
import { AuditsView } from './components/views/AuditsView';
import { IndicatorsView } from './components/views/IndicatorsView';
import { DocumentsView } from './components/views/DocumentsView';
import { StakeholdersView } from './components/views/StakeholdersView';
import { MyReasoningView } from './components/views/MyReasoningView';
import { CompetenciesView } from './components/views/CompetenciesView';
import { GovMentorView } from './components/views/GovMentorView';
import { PortfolioView } from './components/views/PortfolioView';
import { InterviewSimulatorView } from './components/views/InterviewSimulatorView';
import { LibraryView } from './components/views/LibraryView';
import { TeacherModeView } from './components/views/TeacherModeView';

import { Requirement, Stakeholder, NonConformity } from './types';

const MainAppContent: React.FC = () => {
  const {
    firstDayModalOpen,
    setFirstDayModalOpen,
    latestMonthlyReport,
    setLatestMonthlyReport,
    selectActiveMission,
    nonConformities,
    retroScanlinesMode,
  } = useGovLab();

  const [currentView, setCurrentView] = useState<NavView>('dashboard');
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [metacognitionModalOpen, setMetacognitionModalOpen] = useState(false);

  // Entities modals
  const [editorReq, setEditorReq] = useState<Requirement | null | undefined>(undefined);
  const [dialogueStakeholder, setDialogueStakeholder] = useState<Stakeholder | null>(null);
  const [workflowNC, setWorkflowNC] = useState<NonConformity | null>(null);

  const viewTitles: Record<NavView, string> = {
    dashboard: 'Dashboard Executivo',
    journey: 'Minha Jornada & Missões (12 Meses)',
    company: 'A Empresa (Nexora Digital)',
    requirements: 'Requirement Studio',
    rtm: 'Matriz de Rastreabilidade (RTM)',
    architecture: 'Arquitetura de Software (ADRs)',
    'data-api': 'Dados & APIs Lab',
    devops: 'DevOps, CI/CD & Confiabilidade',
    incidents: 'Gestão de Incidentes (ITSM)',
    problems: 'Gestão de Problemas & KEDB',
    changes: 'Gestão de Mudanças (CAB)',
    nonconformities: 'Não Conformidades (CAPA)',
    risks: 'Matriz de Riscos (5x5)',
    projects: 'Portfólio de Projetos & Orçamento',
    suppliers: 'Fornecedores & Contratos de SLA',
    audits: 'Auditorias (ISO 38500 & ISO 27001)',
    indicators: 'Painel de Indicadores (KPIs/KRIs)',
    documents: 'Políticas & Catálogo de Governança',
    stakeholders: 'Stakeholders & Elicitação',
    reasoning: 'Meu Raciocínio (Metacognição)',
    competencies: 'Matriz de Competências & Mastery',
    'gov-mentor': 'GOV-MENTOR (IA Pedagógica)',
    portfolio: 'Portfólio Profissional',
    interview: 'Simulador de Entrevistas Técnicas',
    library: 'Biblioteca de Normas & Frameworks',
    teacher: 'Painel do Professor & Rubricas',
  };

  const handleOpenMission = (missionId: string) => {
    selectActiveMission(missionId);
    setCurrentView('journey');
  };

  return (
    <div className={`flex h-screen bg-slate-950 text-slate-100 font-sans antialiased overflow-hidden ${retroScanlinesMode ? 'crt-scanlines' : ''}`}>
      {/* Sidebar Navigation */}
      <Sidebar
        currentView={currentView}
        onSelectView={setCurrentView}
        onOpenProfile={() => setFirstDayModalOpen(true)}
      />

      {/* Main Workspace Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header
          onOpenCommandPalette={() => setCommandPaletteOpen(true)}
          onOpenMetacognition={() => setMetacognitionModalOpen(true)}
          activeViewTitle={viewTitles[currentView]}
          onOpenProfile={() => setFirstDayModalOpen(true)}
        />

        {/* Scrollable View Container */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 scrollbar-thin scrollbar-thumb-slate-800">
          {currentView === 'dashboard' && (
            <DashboardView
              onNavigate={setCurrentView}
              onOpenMission={handleOpenMission}
              onEditProfile={() => setFirstDayModalOpen(true)}
            />
          )}

          {currentView === 'journey' && (
            <MyJourneyView onOpenMetacognition={() => setMetacognitionModalOpen(true)} />
          )}

          {currentView === 'company' && <CompanyView />}

          {currentView === 'requirements' && (
            <RequirementStudioView
              onOpenEditor={(req) => setEditorReq(req)}
              onNavigateRtm={() => setCurrentView('rtm')}
            />
          )}

          {currentView === 'rtm' && <RtmView />}

          {currentView === 'architecture' && <ArchitectureView />}

          {currentView === 'data-api' && <DataAndApiLabView />}

          {currentView === 'devops' && <DevOpsView />}

          {currentView === 'incidents' && <IncidentsView />}

          {currentView === 'problems' && <ProblemsView />}

          {currentView === 'changes' && <ChangesView />}

          {currentView === 'nonconformities' && (
            <NonConformitiesView
              onOpenWorkflow={(nc) => setWorkflowNC(nc)}
              onCreateNewNC={() => setWorkflowNC(nonConformities[0])}
            />
          )}

          {currentView === 'risks' && <RiskRegisterView />}

          {currentView === 'projects' && <ProjectsView />}

          {currentView === 'suppliers' && <SuppliersView />}

          {currentView === 'audits' && <AuditsView />}

          {currentView === 'indicators' && <IndicatorsView />}

          {currentView === 'documents' && <DocumentsView />}

          {currentView === 'stakeholders' && (
            <StakeholdersView onOpenDialogue={(s) => setDialogueStakeholder(s)} />
          )}

          {currentView === 'reasoning' && (
            <MyReasoningView onOpenModal={() => setMetacognitionModalOpen(true)} />
          )}

          {currentView === 'competencies' && <CompetenciesView />}

          {currentView === 'gov-mentor' && <GovMentorView />}

          {currentView === 'portfolio' && <PortfolioView />}

          {currentView === 'interview' && <InterviewSimulatorView />}

          {currentView === 'library' && <LibraryView />}

          {currentView === 'teacher' && <TeacherModeView />}
        </main>
      </div>

      {/* Global Modals */}
      <FirstDayOnboardingModal
        isOpen={firstDayModalOpen}
        onClose={() => setFirstDayModalOpen(false)}
        onGoToMission={() => {
          handleOpenMission('MSN-01');
        }}
      />

      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        onNavigate={(view) => {
          setCurrentView(view);
          setCommandPaletteOpen(false);
        }}
      />

      <MetacognitionModal
        isOpen={metacognitionModalOpen}
        onClose={() => setMetacognitionModalOpen(false)}
      />

      <MonthlyReportModal
        isOpen={latestMonthlyReport !== null}
        onClose={() => setLatestMonthlyReport(null)}
        report={latestMonthlyReport}
      />

      <RequirementEditorModal
        isOpen={editorReq !== undefined}
        onClose={() => setEditorReq(undefined)}
        initialRequirement={editorReq}
      />

      <StakeholderDialogueModal
        isOpen={dialogueStakeholder !== null}
        onClose={() => setDialogueStakeholder(null)}
        stakeholder={dialogueStakeholder}
      />

      <NonConformityWorkflowModal
        isOpen={workflowNC !== null}
        onClose={() => setWorkflowNC(null)}
        nc={workflowNC}
      />
    </div>
  );
};

export default function App() {
  return (
    <GovLabProvider>
      <MainAppContent />
    </GovLabProvider>
  );
}
