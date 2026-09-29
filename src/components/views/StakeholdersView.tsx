import React, { useState } from 'react';
import { useGovLab } from '../../context/GovLabContext';
import { Stakeholder } from '../../types';
import { Users2, Search, Filter, MessageSquare, Key, Shield, ArrowRight } from 'lucide-react';

interface StakeholdersViewProps {
  onOpenDialogue: (stakeholder: Stakeholder) => void;
}

export const StakeholdersView: React.FC<StakeholdersViewProps> = ({ onOpenDialogue }) => {
  const { stakeholders } = useGovLab();

  const [search, setSearch] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');

  const departments = Array.from(new Set(stakeholders.map((s) => s.department)));

  const filteredStakeholders = stakeholders.filter((s) => {
    const matchSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.role.toLowerCase().includes(search.toLowerCase()) ||
      s.initialStatement.toLowerCase().includes(search.toLowerCase());

    const matchDept = departmentFilter === 'all' || s.department === departmentFilter;
    return matchSearch && matchDept;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center space-x-2 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Users2 className="w-4 h-4" />
            <span>Engenharia de Requisitos & Relacionamento • Nexora Digital</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-100 tracking-tight">
            Mapa de Stakeholders & Elicitação Interativa
          </h2>
          <p className="text-xs text-slate-400">
            Identifique interesses, preocupações ocultas, faça perguntas profissionais e descubra o que está por trás das declarações.
          </p>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-500" />
          <input
            type="text"
            placeholder="Buscar stakeholder por nome, cargo ou frase..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
          />
        </div>

        <select
          value={departmentFilter}
          onChange={(e) => setDepartmentFilter(e.target.value)}
          className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-300 focus:outline-none"
        >
          <option value="all">Todos os Departamentos</option>
          {departments.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>
      </div>

      {/* Stakeholders Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredStakeholders.map((s) => (
          <div
            key={s.id}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 hover:border-slate-700 transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center space-x-3.5">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-cyan-600 flex items-center justify-center text-2xl shrink-0 shadow-md">
                  {s.avatar}
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="font-bold text-slate-100 text-sm truncate">{s.name}</h4>
                  <p className="text-[11px] text-slate-400 truncate">{s.role}</p>
                  <span className="text-[10px] text-indigo-400 font-semibold">{s.department}</span>
                </div>
              </div>

              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800/80 space-y-1.5 text-xs">
                <div className="flex justify-between text-[11px]">
                  <span className="text-slate-500">Influência:</span>
                  <span className="font-bold text-cyan-400">{s.influenceLevel}</span>
                </div>
                <div className="flex justify-between text-[11px]">
                  <span className="text-slate-500">Interesse:</span>
                  <span className="font-bold text-indigo-400">{s.interestLevel}</span>
                </div>
                <div className="text-[11px] text-slate-300 italic pt-1 border-t border-slate-800/80">
                  "{s.initialStatement}"
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
              <span className="text-[10px] text-slate-500">
                {s.dialogueTree.length} perguntas disponíveis
              </span>
              <button
                onClick={() => onOpenDialogue(s)}
                className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold flex items-center space-x-1.5 transition-all shadow-md shadow-indigo-600/30"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Entrevistar</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
