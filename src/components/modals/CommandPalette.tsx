import React, { useState, useEffect } from 'react';
import { useGovLab } from '../../context/GovLabContext';
import { Search, X, FileCode2, Users2, AlertOctagon, ShieldAlert, Layers, BookOpen } from 'lucide-react';
import { NavView } from '../layout/Sidebar';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (view: NavView) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose, onNavigate }) => {
  const { requirements, stakeholders, incidents, nonConformities, risks, architectureADRs } = useGovLab();
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else setQuery('');
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const normalizedQuery = query.toLowerCase().trim();

  const filteredRequirements = requirements
    .filter((r) => r.code.toLowerCase().includes(normalizedQuery) || r.title.toLowerCase().includes(normalizedQuery))
    .slice(0, 4);

  const filteredStakeholders = stakeholders
    .filter((s) => s.name.toLowerCase().includes(normalizedQuery) || s.role.toLowerCase().includes(normalizedQuery))
    .slice(0, 4);

  const filteredIncidents = incidents
    .filter((i) => i.code.toLowerCase().includes(normalizedQuery) || i.title.toLowerCase().includes(normalizedQuery))
    .slice(0, 3);

  const filteredNCs = nonConformities
    .filter((nc) => nc.code.toLowerCase().includes(normalizedQuery) || nc.title.toLowerCase().includes(normalizedQuery))
    .slice(0, 3);

  const filteredADRs = architectureADRs
    .filter((adr) => adr.code.toLowerCase().includes(normalizedQuery) || adr.title.toLowerCase().includes(normalizedQuery))
    .slice(0, 2);

  const handleSelect = (view: NavView) => {
    onNavigate(view);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-start justify-center pt-20 p-4 animate-in fade-in duration-150">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-2xl w-full shadow-2xl overflow-hidden flex flex-col">
        {/* Search input */}
        <div className="p-4 border-b border-slate-800 flex items-center space-x-3 bg-slate-950/80">
          <Search className="w-5 h-5 text-indigo-400 shrink-0" />
          <input
            type="text"
            autoFocus
            placeholder="Buscar requisitos, stakeholders, incidentes, NCs, ADRs..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-slate-100 placeholder-slate-500 text-sm focus:outline-none"
          />
          <button onClick={onClose} className="text-slate-500 hover:text-slate-300">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results list */}
        <div className="max-h-96 overflow-y-auto p-3 space-y-4 text-xs scrollbar-thin scrollbar-thumb-slate-800">
          {/* Quick Views */}
          {!query && (
            <div>
              <div className="px-2 text-[10px] uppercase font-bold text-slate-500 mb-1">Acesso Rápido</div>
              <div className="grid grid-cols-2 gap-1.5">
                <button
                  onClick={() => handleSelect('requirements')}
                  className="p-2 rounded-lg bg-slate-800/60 hover:bg-slate-800 text-slate-300 flex items-center space-x-2 text-left"
                >
                  <FileCode2 className="w-4 h-4 text-cyan-400" />
                  <span>Requirement Studio</span>
                </button>
                <button
                  onClick={() => handleSelect('incidents')}
                  className="p-2 rounded-lg bg-slate-800/60 hover:bg-slate-800 text-slate-300 flex items-center space-x-2 text-left"
                >
                  <AlertOctagon className="w-4 h-4 text-rose-400" />
                  <span>Incidentes (ITSM)</span>
                </button>
                <button
                  onClick={() => handleSelect('nonconformities')}
                  className="p-2 rounded-lg bg-slate-800/60 hover:bg-slate-800 text-slate-300 flex items-center space-x-2 text-left"
                >
                  <ShieldAlert className="w-4 h-4 text-orange-400" />
                  <span>Não Conformidades (CAPA)</span>
                </button>
                <button
                  onClick={() => handleSelect('stakeholders')}
                  className="p-2 rounded-lg bg-slate-800/60 hover:bg-slate-800 text-slate-300 flex items-center space-x-2 text-left"
                >
                  <Users2 className="w-4 h-4 text-indigo-400" />
                  <span>Stakeholders & Elicitação</span>
                </button>
              </div>
            </div>
          )}

          {/* Requirements */}
          {filteredRequirements.length > 0 && (
            <div>
              <div className="px-2 text-[10px] uppercase font-bold text-slate-500 mb-1 flex items-center gap-1.5">
                <FileCode2 className="w-3.5 h-3.5 text-cyan-400" />
                Requisitos ({filteredRequirements.length})
              </div>
              <div className="space-y-1">
                {filteredRequirements.map((r) => (
                  <div
                    key={r.id}
                    onClick={() => handleSelect('requirements')}
                    className="p-2 rounded-lg hover:bg-slate-800 cursor-pointer flex items-center justify-between text-slate-300"
                  >
                    <div className="flex items-center space-x-2 truncate">
                      <span className="font-mono text-cyan-400 font-bold">{r.code}</span>
                      <span className="truncate">{r.title}</span>
                    </div>
                    <span className="text-[10px] bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded">
                      {r.type}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Stakeholders */}
          {filteredStakeholders.length > 0 && (
            <div>
              <div className="px-2 text-[10px] uppercase font-bold text-slate-500 mb-1 flex items-center gap-1.5">
                <Users2 className="w-3.5 h-3.5 text-indigo-400" />
                Stakeholders ({filteredStakeholders.length})
              </div>
              <div className="space-y-1">
                {filteredStakeholders.map((s) => (
                  <div
                    key={s.id}
                    onClick={() => handleSelect('stakeholders')}
                    className="p-2 rounded-lg hover:bg-slate-800 cursor-pointer flex items-center justify-between text-slate-300"
                  >
                    <div className="flex items-center space-x-2">
                      <span>{s.avatar}</span>
                      <span className="font-semibold text-slate-200">{s.name}</span>
                      <span className="text-slate-400">({s.role})</span>
                    </div>
                    <span className="text-[10px] text-slate-500">{s.department}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Incidents */}
          {filteredIncidents.length > 0 && (
            <div>
              <div className="px-2 text-[10px] uppercase font-bold text-slate-500 mb-1 flex items-center gap-1.5">
                <AlertOctagon className="w-3.5 h-3.5 text-rose-400" />
                Incidentes
              </div>
              <div className="space-y-1">
                {filteredIncidents.map((i) => (
                  <div
                    key={i.id}
                    onClick={() => handleSelect('incidents')}
                    className="p-2 rounded-lg hover:bg-slate-800 cursor-pointer flex items-center justify-between text-slate-300"
                  >
                    <div className="flex items-center space-x-2 truncate">
                      <span className="font-mono text-rose-400 font-bold">{i.code}</span>
                      <span className="truncate">{i.title}</span>
                    </div>
                    <span className="text-[10px] bg-rose-950 text-rose-300 border border-rose-800 px-1.5 py-0.5 rounded">
                      {i.severity}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* NonConformities */}
          {filteredNCs.length > 0 && (
            <div>
              <div className="px-2 text-[10px] uppercase font-bold text-slate-500 mb-1 flex items-center gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5 text-orange-400" />
                Não Conformidades
              </div>
              <div className="space-y-1">
                {filteredNCs.map((nc) => (
                  <div
                    key={nc.id}
                    onClick={() => handleSelect('nonconformities')}
                    className="p-2 rounded-lg hover:bg-slate-800 cursor-pointer flex items-center justify-between text-slate-300"
                  >
                    <div className="flex items-center space-x-2 truncate">
                      <span className="font-mono text-orange-400 font-bold">{nc.code}</span>
                      <span className="truncate">{nc.title}</span>
                    </div>
                    <span className="text-[10px] bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded">
                      {nc.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
