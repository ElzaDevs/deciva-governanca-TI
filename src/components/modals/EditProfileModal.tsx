import React, { useState } from 'react';
import { useGovLab } from '../../context/GovLabContext';
import {
  UserCheck,
  Building2,
  Sparkles,
  X,
  Check,
  Shield,
  Award,
  Mail,
  Briefcase,
  FileText,
  TrendingUp,
  Terminal,
} from 'lucide-react';
import { RoleRank } from '../../types';
import { AvatarPicker } from '../common/AvatarPicker';
import { GLOBAL_CAREER_LADDER, getCareerLevelForRole } from '../../data/careerLadder';

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EditProfileModal: React.FC<EditProfileModalProps> = ({ isOpen, onClose }) => {
  const { studentProfile, updateStudentProfile, companyState } = useGovLab();

  const [name, setName] = useState(studentProfile.name || '');
  const [email, setEmail] = useState(studentProfile.email || '');
  const [role, setRole] = useState<RoleRank>(studentProfile.role || 'Analista Júnior');
  const [department, setDepartment] = useState(studentProfile.department || 'Engenharia de Sustentação & Governança Básica');
  const [avatar, setAvatar] = useState(
    studentProfile.avatar || '/src/assets/images/avatar_pixel_office_worker_1790708538323.jpg'
  );
  const [selectedLevelNum, setSelectedLevelNum] = useState<number>(studentProfile.careerLevelNumber || 2);
  const [specializationFocus, setSpecializationFocus] = useState(
    studentProfile.specializationFocus || 'Engenharia de Requisitos & Governança de TI'
  );
  const [bio, setBio] = useState(
    studentProfile.bio ||
      'Analista de Tecnologia focado em requisitos verificáveis, governança corporativa e decisões orientadas a evidências.'
  );

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

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateStudentProfile({
      name: name.trim() || 'Analista Nexora',
      email: email.trim() || 'analista@nexora.digital',
      role,
      department,
      avatar,
      careerLevelNumber: selectedLevelNum,
      specializationFocus,
      bio: bio.trim(),
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-slate-900 border-2 border-slate-700/80 rounded-2xl max-w-3xl w-full p-4 sm:p-6 shadow-[0_20px_60px_rgba(0,0,0,0.8),inset_1px_1px_0px_rgba(255,255,255,0.1)] relative overflow-hidden flex flex-col max-h-[92vh]">
        {/* Retro 2000s Tech Window Titlebar */}
        <div className="flex items-center justify-between bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-850 mb-3 text-xs font-mono">
          <div className="flex items-center space-x-2 text-emerald-400 font-bold">
            <Terminal className="w-3.5 h-3.5" />
            <span>NEXORA_SECURITY // EMPLOYEE_BADGE_EDITOR</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-100 hover:bg-slate-800 rounded transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800 shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-950 border border-cyan-500/50 flex items-center justify-center text-white text-xl shadow-md shrink-0">
              {avatar.startsWith('http') || avatar.startsWith('/') || avatar.startsWith('data:') ? (
                <img src={avatar} alt="Avatar" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
              ) : (
                <span className="text-2xl">{avatar}</span>
              )}
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-100 flex items-center gap-2">
                <span>Editar Crachá & Identidade Funcional</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-700/60">
                  {currentLevelConfig.icCode}
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Altere sua foto de perfil, dados corporativos e acompanhe o nível de maturidade global.
              </p>
            </div>
          </div>
        </div>

        {/* Scrollable Form */}
        <form onSubmit={handleSave} className="overflow-y-auto py-4 space-y-4 flex-1 pr-1">
          {/* Avatar Selector with User Images & Retro Tech */}
          <AvatarPicker selectedAvatar={avatar} onSelectAvatar={(val) => setAvatar(val)} />

          {/* Name & Email Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Nome do Analista / Estudante <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder="Ex: Elza Mendes, Alexandre Silva..."
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                E-mail Corporativo (@nexora.digital)
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nome@nexora.digital"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-3.5 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 font-mono"
                />
              </div>
            </div>
          </div>

          {/* Global Career Ladder (IC1 to IC7) Selection */}
          <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center space-x-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-cyan-400" />
                <span>Nível de Carreira Global & Departamento</span>
              </label>
              <span className="text-[11px] text-cyan-300 font-mono">
                XP Atual: {studentProfile.xp ?? 350} / Próximo Nível: {studentProfile.nextLevelXp ?? 750} XP
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
                <span className="text-slate-400">Departamento Atual: </span>
                <span className="font-semibold text-slate-200">{department}</span>
                <p className="text-[11px] text-slate-400 mt-0.5">{currentLevelConfig.departmentScope}</p>
              </div>
              <div className="text-right shrink-0">
                <span className="text-[10px] text-emerald-400 font-mono block">Benchmark Multinacional:</span>
                <span className="text-xs font-bold text-emerald-300 font-mono">{currentLevelConfig.salaryBandBRL}</span>
              </div>
            </div>
          </div>

          {/* Bio and Focus */}
          <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800 space-y-3">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Especialização Principal
              </label>
              <input
                type="text"
                value={specializationFocus}
                onChange={(e) => setSpecializationFocus(e.target.value)}
                placeholder="Ex: Engenharia de Requisitos, Governança COBIT, SRE..."
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Biografia / Declaração Profissional
              </label>
              <textarea
                rows={2}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Live Preview Card */}
          <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950/60 border-2 border-indigo-600/60 rounded-xl p-3.5 flex items-center space-x-3.5 shadow-xl">
            <div className="w-14 h-14 rounded-xl overflow-hidden bg-slate-950 border border-cyan-500/50 flex items-center justify-center shrink-0 shadow-lg">
              {avatar.startsWith('http') || avatar.startsWith('/') || avatar.startsWith('data:') ? (
                <img src={avatar} alt="Crachá" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
              ) : (
                <span className="text-2xl">{avatar}</span>
              )}
            </div>
            <div className="space-y-0.5 min-w-0 flex-1">
              <div className="flex items-center space-x-2">
                <span className="text-[10px] uppercase font-bold tracking-widest text-cyan-400 bg-cyan-950/90 px-2 py-0.5 rounded border border-cyan-700">
                  {currentLevelConfig.icCode} • Crachá Oficial
                </span>
                <span className="text-[10px] text-slate-400 font-mono">ID: NX-2026</span>
              </div>
              <div className="text-base font-bold text-slate-100 truncate">
                {name.trim() || 'Nome do Analista'}
              </div>
              <div className="text-xs text-indigo-300 font-semibold truncate">
                {role} • <span className="text-slate-300 font-normal">{department}</span>
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="pt-2 flex items-center justify-end space-x-3 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-medium transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white font-bold rounded-xl text-xs transition-all shadow-md shadow-indigo-600/30 flex items-center space-x-2"
            >
              <Check className="w-4 h-4" />
              <span>Salvar Alterações</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
