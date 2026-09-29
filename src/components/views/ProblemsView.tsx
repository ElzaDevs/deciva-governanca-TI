import React, { useState } from 'react';
import { useGovLab } from '../../context/GovLabContext';
import { LifeBuoy, Search, AlertCircle, CheckCircle2, ShieldAlert } from 'lucide-react';

export const ProblemsView: React.FC = () => {
  const { problems } = useGovLab();
  const [search, setSearch] = useState('');

  const filteredProblems = problems.filter((p) =>
    p.code.toLowerCase().includes(search.toLowerCase()) ||
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.knownErrorDescription.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center space-x-2 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-1">
            <LifeBuoy className="w-4 h-4" />
            <span>ITSM • Problem Management & Known Error Database (KEDB)</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-100 tracking-tight">
            Gestão de Problemas & Base de Erros Conhecidos
          </h2>
          <p className="text-xs text-slate-400">
            Descubra por que incidentes recorrentes continuam acontecendo, registre workarounds e implemente soluções definitivas.
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 flex items-center space-x-2 text-xs">
        <Search className="w-4 h-4 text-slate-500" />
        <input
          type="text"
          placeholder="Buscar no KEDB por código, descrição ou workaround..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-transparent text-slate-200 placeholder-slate-500 focus:outline-none"
        />
      </div>

      {/* Problems list */}
      <div className="space-y-4">
        {filteredProblems.map((prb) => (
          <div
            key={prb.id}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4 text-xs"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
              <div className="flex items-center space-x-2.5">
                <span className="font-mono text-cyan-400 font-bold bg-cyan-950 px-2.5 py-0.5 rounded border border-cyan-800">
                  {prb.code}
                </span>
                <h3 className="text-base font-bold text-slate-100">{prb.title}</h3>
              </div>
              <span className="text-[10px] bg-slate-800 text-cyan-300 px-2 py-0.5 rounded font-mono">
                {prb.status}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5 bg-slate-950 p-4 rounded-xl border border-slate-800">
                <strong className="text-slate-400 uppercase text-[10px] tracking-wider block">
                  Erro Conhecido (Known Error):
                </strong>
                <p className="text-slate-300 leading-relaxed">{prb.knownErrorDescription}</p>
                <div className="text-[10px] text-slate-500 pt-1">
                  Incidentes Associados: {prb.associatedIncidents.join(', ')}
                </div>
              </div>

              <div className="space-y-1.5 bg-slate-950 p-4 rounded-xl border border-slate-800">
                <strong className="text-amber-400 uppercase text-[10px] tracking-wider block">
                  Solução Temporária (Workaround Imediato):
                </strong>
                <p className="text-amber-200 font-mono text-[11px] leading-relaxed">
                  {prb.temporaryWorkaround}
                </p>
              </div>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
              <strong className="text-emerald-400 uppercase text-[10px] tracking-wider block">
                Solução Definitiva (Ação Estrutural):
              </strong>
              <p className="text-emerald-300 leading-relaxed font-semibold">
                {prb.permanentSolution}
              </p>
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
              <span>Proprietário: {prb.owner}</span>
              <span>Criado em: {prb.createdAt}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
