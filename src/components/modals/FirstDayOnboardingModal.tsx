import React, { useState, useEffect } from 'react';
import { useGovLab } from '../../context/GovLabContext';
import {
  Building2,
  UserCheck,
  ShieldAlert,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Mail,
  Briefcase,
  IdCard,
  TrendingUp,
  Award,
  Terminal,
} from 'lucide-react';
import { AvatarPicker } from '../common/AvatarPicker';
import { GLOBAL_CAREER_LADDER, getCareerLevelForRole } from '../../data/careerLadder';

interface FirstDayOnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGoToMission: () => void;
}

export const FirstDayOnboardingModal: React.FC<FirstDayOnboardingModalProps> = ({
  isOpen,
  onClose,
  onGoToMission,
}) => {
  const { studentProfile, updateStudentProfile } = useGovLab();

  // Local state for profile setup
  const [name, setName] = useState(studentProfile.name || '');
  const [email, setEmail] = useState(studentProfile.email || '');
  const [avatar, setAvatar] = useState(
    studentProfile.avatar || '/src/assets/images/avatar_pixel_office_worker_1790708538323.jpg'
  );
  const [selectedLevelNum, setSelectedLevelNum] = useState<number>(studentProfile.careerLevelNumber || 2);
  const [role, setRole] = useState<string>(studentProfile.role || 'Analista Júnior');
  const [department, setDepartment] = useState(studentProfile.department || 'Engenharia de Sustentação & Governança Básica');
  const [specializationFocus, setSpecializationFocus] = useState(
    studentProfile.specializationFocus || 'Engenharia de Requisitos & Governança de TI'
  );
  const [bio, setBio] = useState(
    studentProfile.bio ||
      'Analista focado em Engenharia de Requisitos, decisões baseadas em evidências e governança ágil na Nexora Digital.'
  );

  const [activeTab, setActiveTab] = useState<'badge' | 'ladder' | 'dialogue'>('badge');

  useEffect(() => {
    if (isOpen) {
      setName(studentProfile.name || '');
      setEmail(studentProfile.email || '');
      setAvatar(studentProfile.avatar || '/src/assets/images/avatar_pixel_office_worker_1790708538323.jpg');
      setSelectedLevelNum(studentProfile.careerLevelNumber || 2);
      setRole(studentProfile.role || 'Analista Júnior');
      setDepartment(studentProfile.department || 'Engenharia de Sustentação & Governança Básica');
      setSpecializationFocus(
        studentProfile.specializationFocus || 'Engenharia de Requisitos & Governança de TI'
      );
      setBio(studentProfile.bio || '');
    }
  }, [isOpen, studentProfile]);

  if (!isOpen) return null;

  const currentLevelConfig = GLOBAL_CAREER_LADDER.find((l) => l.levelNumber === selectedLevelNum) || GLOBAL_CAREER_LADDER[1];

  const handleLevelSelect = (levelNum: number) => {
    setSelectedLevelNum(levelNum);
    const targetLadder = GLOBAL_CAREER_LADDER.find((l) => l.levelNumber === levelNum);
    if (targetLadder) {
      setRole(targetLadder.title);
      setDepartment(targetLadder.department);
    }
  };

  const handleNameChange = (val: string) => {
    setName(val);
    const clean = val
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '.')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
    if (clean) {
      setEmail(`${clean}@nexora.digital`);
    }
  };

  const handleSaveAndStart = (goToMission: boolean) => {
    const finalName = name.trim() || 'Analista Júnior';
    const finalEmail = email.trim() || 'analista@nexora.digital';
    const finalRole = role.trim() || currentLevelConfig.title;
    const finalDept = department.trim() || currentLevelConfig.department;

    updateStudentProfile({
      name: finalName,
      email: finalEmail,
      avatar,
      role: finalRole,
      department: finalDept,
      careerLevelNumber: selectedLevelNum,
      specializationFocus,
      bio,
    });

    localStorage.setItem('govlab_simulator_v1_onboarding_seen', 'true');
    onClose();

    if (goToMission) {
      onGoToMission();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-slate-900 border-2 border-slate-700/80 rounded-2xl max-w-4xl w-full p-4 sm:p-6 shadow-[0_20px_60px_rgba(0,0,0,0.8),inset_1px_1px_0px_rgba(255,255,255,0.1)] relative overflow-hidden flex flex-col max-h-[94vh]">
        {/* Retro 2000s Tech Window Titlebar */}
        <div className="flex items-center justify-between bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-850 mb-3 text-xs font-mono">
          <div className="flex items-center space-x-2 text-emerald-400 font-bold">
            <Terminal className="w-3.5 h-3.5" />
            <span>NEXORA_OS // ONBOARDING_WORKSTATION_2026</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-500/80 inline-block" />
          </div>
        </div>

        {/* Header Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-3 mb-4 shrink-0 gap-3">
          <div className="flex items-center space-x-2 text-indigo-400 text-xs font-bold uppercase tracking-wider">
            <Building2 className="w-4 h-4 text-cyan-400" />
            <span>Nexora Digital • Crachá Funcional & Plano de Carreira Global</span>
          </div>

          <div className="flex items-center space-x-1 bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs font-medium">
            <button
              onClick={() => setActiveTab('badge')}
              className={`px-3 py-1.5 rounded-md transition-all ${
                activeTab === 'badge' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              1. Identidade & Avatar
            </button>
            <button
              onClick={() => setActiveTab('ladder')}
              className={`px-3 py-1.5 rounded-md transition-all ${
                activeTab === 'ladder' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              2. Trilha Global (IC1 - IC7)
            </button>
            <button
              onClick={() => setActiveTab('dialogue')}
              className={`px-3 py-1.5 rounded-md transition-all ${
                activeTab === 'dialogue' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              3. Briefing do Gestor
            </button>
          </div>
        </div>

        {/* Tab 1: Badge & Avatar */}
        <div className="overflow-y-auto flex-1 pr-1 space-y-4">
          {activeTab === 'badge' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              {/* Introduction Banner */}
              <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3 sm:p-4">
                <h2 className="text-lg sm:text-xl font-black text-slate-100 tracking-tight flex items-center space-x-2">
                  <span>Monte seu Perfil Profissional de Engenharia</span>
                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-700/60">
                    Nível Atual: {currentLevelConfig.icCode}
                  </span>
                </h2>
                <p className="text-slate-400 text-xs mt-1 leading-relaxed">
                  Conforme você resolve incidentes, requisitos e auditorias, seu cargo e departamento evoluem automaticamente, com tarefas progressivamente mais complexas (padrão de Big Techs globais).
                </p>
              </div>

              {/* Avatar Selector with User Uploads */}
              <AvatarPicker selectedAvatar={avatar} onSelectAvatar={(val) => setAvatar(val)} />

              {/* Name & Corporate Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
                <div>
                  <label className="text-xs font-semibold text-slate-200 block mb-1">
                    Digite seu Nome Profissional <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    autoFocus
                    required
                    value={name}
                    onChange={(e) => handleNameChange(e.target.value)}
                    placeholder="Ex: Seu Nome Completo..."
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-200 block mb-1">
                    E-mail Corporativo (@nexora.digital)
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="nome@nexora.digital"
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-3.5 py-2.5 text-xs font-mono text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>
              </div>

              {/* Career Level Selector Quick Strip */}
              <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center space-x-1.5">
                    <TrendingUp className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Nível de Entrada na Carreira Global</span>
                  </label>
                  <span className="text-[11px] text-cyan-300 font-mono">
                    {currentLevelConfig.globalStandardTitle}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-1.5">
                  {GLOBAL_CAREER_LADDER.map((lvl) => {
                    const isSelected = selectedLevelNum === lvl.levelNumber;
                    return (
                      <button
                        type="button"
                        key={lvl.icCode}
                        onClick={() => handleLevelSelect(lvl.levelNumber)}
                        className={`p-2 rounded-lg text-left transition-all border ${
                          isSelected
                            ? 'bg-indigo-950/80 border-indigo-400 text-white shadow-md'
                            : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-850'
                        }`}
                      >
                        <div className="text-[10px] font-mono text-cyan-400 font-bold">{lvl.icCode}</div>
                        <div className="text-xs font-bold truncate">{lvl.title}</div>
                        <div className="text-[9px] text-slate-400 truncate">{lvl.department.split('&')[0]}</div>
                      </button>
                    );
                  })}
                </div>

                <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span className="text-slate-400">Departamento Alinhado: </span>
                    <span className="font-semibold text-slate-200">{currentLevelConfig.department}</span>
                    <p className="text-[11px] text-slate-400 mt-0.5">{currentLevelConfig.departmentScope}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-[10px] text-emerald-400 font-mono block">Benchmark Salarial:</span>
                    <span className="text-xs font-bold text-emerald-300 font-mono">{currentLevelConfig.salaryBandBRL}</span>
                  </div>
                </div>
              </div>

              {/* Dynamic Live Badge Card */}
              <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950/60 border-2 border-indigo-600/60 rounded-xl p-4 flex items-center space-x-4 shadow-xl">
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-950 border border-cyan-500/50 flex items-center justify-center shrink-0 shadow-lg">
                  {avatar.startsWith('http') || avatar.startsWith('/') || avatar.startsWith('data:') ? (
                    <img src={avatar} alt="Crachá" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-3xl">{avatar}</span>
                  )}
                </div>
                <div className="space-y-1 min-w-0 flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-cyan-400 bg-cyan-950/90 px-2 py-0.5 rounded border border-cyan-700">
                      Crachá Funcional • {currentLevelConfig.icCode}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">ID: NX-2026</span>
                  </div>
                  <div className="text-lg font-black text-slate-100 truncate tracking-tight">
                    {name.trim() || 'Digite seu nome acima...'}
                  </div>
                  <div className="text-xs text-indigo-300 font-semibold truncate">
                    {role} • <span className="text-slate-300 font-normal">{department}</span>
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono truncate">
                    {email || 'analista@nexora.digital'}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Global Career Ladder Breakdown */}
          {activeTab === 'ladder' && (
            <div className="space-y-3 animate-in fade-in duration-150">
              <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4">
                <h3 className="text-base font-bold text-slate-100 flex items-center space-x-2">
                  <Award className="w-4 h-4 text-amber-400" />
                  <span>Estrutura de Carreira & Senioridade (Padrão Empresas Globais)</span>
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Assim como na Google, Meta e Microsoft, cada nível (IC1 a IC7) corresponde a um escopo de responsabilidade, departamento e grau de dificuldade das missões.
                </p>
              </div>

              <div className="space-y-2.5">
                {GLOBAL_CAREER_LADDER.map((lvl) => {
                  const isCurrent = selectedLevelNum === lvl.levelNumber;
                  return (
                    <div
                      key={lvl.icCode}
                      className={`p-3.5 rounded-xl border transition-all ${
                        isCurrent
                          ? 'bg-slate-900 border-indigo-500 shadow-md ring-1 ring-indigo-500/40'
                          : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div className="flex items-center space-x-2.5">
                          <span className={`px-2 py-0.5 rounded text-xs font-mono font-bold ${
                            isCurrent ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-300'
                          }`}>
                            {lvl.icCode}
                          </span>
                          <div>
                            <span className="text-sm font-bold text-slate-200">{lvl.title}</span>
                            <span className="text-xs text-slate-400 ml-2">({lvl.department})</span>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2 text-xs font-mono">
                          <span className="text-emerald-400 font-semibold">{lvl.salaryBandBRL}</span>
                          <span className="text-slate-500">|</span>
                          <span className="text-slate-400">{lvl.salaryBandUSD}</span>
                        </div>
                      </div>

                      <p className="text-xs text-slate-400 mt-1.5">{lvl.departmentScope}</p>

                      <div className="mt-2.5 grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] border-t border-slate-850 pt-2">
                        <div>
                          <span className="text-slate-500 font-semibold block">Responsabilidades Principais:</span>
                          <ul className="list-disc list-inside text-slate-300 space-y-0.5 mt-0.5">
                            {lvl.coreResponsibilities.slice(0, 2).map((r, i) => (
                              <li key={i} className="truncate">{r}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <span className="text-slate-500 font-semibold block">Ferramentas & Certificações Recomendadas:</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {lvl.recommendedCertifications.map((c) => (
                              <span key={c} className="text-[10px] bg-slate-800/90 text-slate-300 px-1.5 py-0.5 rounded">
                                {c}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Tab 3: Manager Briefing */}
          {activeTab === 'dialogue' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="bg-indigo-950/50 border border-indigo-800/60 rounded-xl p-4 flex items-center space-x-3.5">
                <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-900 border border-indigo-500 flex items-center justify-center shrink-0">
                  {avatar.startsWith('http') || avatar.startsWith('/') || avatar.startsWith('data:') ? (
                    <img src={avatar} alt="Crachá" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-2xl">{avatar}</span>
                  )}
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-200 block">
                    Crachá emitido com sucesso para: {name.trim() || 'Analista'}
                  </span>
                  <span className="text-[11px] text-indigo-300 font-medium">
                    {role} • {department} • Nexora Digital
                  </span>
                </div>
              </div>

              {/* Manager urgent dialogue customized with the user's name */}
              <div className="bg-slate-950/90 border border-slate-800 rounded-xl p-4 sm:p-5 relative">
                <div className="flex items-start space-x-3.5">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-600 flex items-center justify-center text-white text-xl shrink-0 shadow-md">
                    👨‍💼
                  </div>
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-bold text-slate-100">Roberto Alencar</h4>
                        <p className="text-[11px] text-indigo-400">
                          Gerente Executivo de Governança de TI • Nexora Digital
                        </p>
                      </div>
                      <span className="text-[10px] text-rose-400 font-bold bg-rose-950/80 px-2 py-0.5 rounded border border-rose-800 animate-pulse">
                        SITUAÇÃO DE CRISE
                      </span>
                    </div>

                    <div className="text-xs text-slate-300 space-y-2 leading-relaxed bg-slate-900/60 p-3.5 rounded-lg border border-slate-800">
                      <p>
                        "Olá, <strong>{name.trim() || 'colega'}</strong>! Seja muito bem-vindo à Nexora Digital. Infelizmente não teremos tempo para uma integração tranquila de semanas."
                      </p>
                      <p>
                        "Neste exato momento, o portal de faturamento dos nossos 64 clientes B2B está apresentando instabilidade crítica (INC-1042). A diretoria quer reiniciar tudo no desespero, mas precisamos de <strong>análise de evidências reais em logs</strong> e método de governança."
                      </p>
                      <p className="text-cyan-300 font-medium">
                        "Seu crachá está ativo. Sua primeira missão é assumir a War Room, conter o incidente e garantir que nosso SLA não seja quebrado."
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer actions with retro tech styling */}
        <div className="border-t border-slate-800 pt-3.5 mt-3 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="text-xs text-slate-400 flex items-center space-x-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Perfil: <strong>{name.trim() || 'Analista'}</strong> ({role})</span>
          </div>

          <div className="flex items-center space-x-2 w-full sm:w-auto">
            {activeTab !== 'dialogue' ? (
              <button
                type="button"
                onClick={() => setActiveTab(activeTab === 'badge' ? 'ladder' : 'dialogue')}
                className="flex-1 sm:flex-none px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-1.5 shadow-md shadow-indigo-600/30"
              >
                <span>Avançar</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => handleSaveAndStart(true)}
                className="flex-1 sm:flex-none px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-slate-950 font-black rounded-xl text-xs uppercase tracking-wider transition-all flex items-center justify-center space-x-2 shadow-lg shadow-emerald-600/30"
              >
                <span>Salvar Crachá & Iniciar Missão 1</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
