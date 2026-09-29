import React, { useState } from 'react';
import { useGovLab } from '../../context/GovLabContext';
import { RiskItem } from '../../types';
import { ShieldAlert, Plus, Search, Filter, AlertTriangle, CheckCircle2, Sliders } from 'lucide-react';

export const RiskRegisterView: React.FC = () => {
  const { risks, createRisk, updateRisk } = useGovLab();

  const [search, setSearch] = useState('');
  const [selectedCell, setSelectedCell] = useState<{ p: number; i: number } | null>(null);

  const filteredRisks = risks.filter((r) => {
    const matchSearch =
      r.code.toLowerCase().includes(search.toLowerCase()) ||
      r.description.toLowerCase().includes(search.toLowerCase()) ||
      r.threatEvent.toLowerCase().includes(search.toLowerCase());

    const matchCell = selectedCell
      ? r.inherentProbability === selectedCell.p && r.inherentImpact === selectedCell.i
      : true;

    return matchSearch && matchCell;
  });

  const getHeatmapColor = (prob: number, impact: number) => {
    const score = prob * impact;
    if (score >= 15) return 'bg-rose-900/60 text-rose-300 border-rose-700/80 hover:bg-rose-800/80';
    if (score >= 8) return 'bg-amber-900/60 text-amber-300 border-amber-700/80 hover:bg-amber-800/80';
    return 'bg-emerald-900/50 text-emerald-300 border-emerald-700/80 hover:bg-emerald-800/80';
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center space-x-2 text-rose-400 text-xs font-bold uppercase tracking-wider mb-1">
            <ShieldAlert className="w-4 h-4" />
            <span>Gestão e Governança • Gestão de Riscos Corporativos</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-100 tracking-tight">
            Matriz de Riscos de TI (5x5) & Risk Register
          </h2>
          <p className="text-xs text-slate-400">
            Identificação de eventos de ameaça, cálculo de Risco Inerente vs Residual e estratégias de tratamento (Mitigar, Evitar, Transferir, Aceitar).
          </p>
        </div>
      </div>

      {/* Main Split: 5x5 Heatmap Matrix (Left) + Risk Details (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Heatmap Card (5 cols) */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <span className="text-xs font-bold text-slate-200 uppercase tracking-wider">
              Matriz de Probabilidade x Impacto
            </span>
            {selectedCell && (
              <button
                onClick={() => setSelectedCell(null)}
                className="text-[10px] text-cyan-400 underline font-semibold"
              >
                Limpar filtro
              </button>
            )}
          </div>

          {/* 5x5 Grid */}
          <div className="space-y-1 text-xs">
            <div className="text-[10px] text-slate-500 font-bold uppercase text-center mb-1">
              ▲ Probabilidade (1 a 5)
            </div>
            {[5, 4, 3, 2, 1].map((prob) => (
              <div key={prob} className="flex items-center space-x-1.5">
                <span className="w-4 font-mono font-bold text-slate-500 text-right">{prob}</span>
                {[1, 2, 3, 4, 5].map((impact) => {
                  const cellRisks = risks.filter(
                    (r) => r.inherentProbability === prob && r.inherentImpact === impact
                  );
                  const isSelected = selectedCell?.p === prob && selectedCell?.i === impact;

                  return (
                    <button
                      key={impact}
                      onClick={() => setSelectedCell({ p: prob, i: impact })}
                      className={`flex-1 h-10 rounded-lg border font-mono font-bold text-xs flex flex-col items-center justify-center transition-all ${getHeatmapColor(
                        prob,
                        impact
                      )} ${isSelected ? 'ring-2 ring-white scale-105 z-10' : ''}`}
                      title={`Probabilidade ${prob} x Impacto ${impact} (Score: ${prob * impact})`}
                    >
                      <span>{prob * impact}</span>
                      {cellRisks.length > 0 && (
                        <span className="text-[9px] bg-black/60 px-1 rounded-full">
                          {cellRisks.length} {cellRisks.length === 1 ? 'risco' : 'riscos'}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            ))}
            <div className="flex items-center space-x-1.5 pt-1 pl-5">
              {[1, 2, 3, 4, 5].map((i) => (
                <span key={i} className="flex-1 text-center font-mono font-bold text-slate-500 text-[10px]">
                  {i}
                </span>
              ))}
            </div>
            <div className="text-[10px] text-slate-500 font-bold uppercase text-center mt-1">
              Impacto no Negócio (1 a 5) ►
            </div>
          </div>

          <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400 space-y-1">
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded bg-rose-900 border border-rose-700" />
              <span>Risco Crítico (15 a 25): Exige tratamento e mitigação imediata</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded bg-amber-900 border border-amber-700" />
              <span>Risco Médio (8 a 14): Monitoramento ativo com controles</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded bg-emerald-900 border border-emerald-700" />
              <span>Risco Baixo (1 a 7): Aceitável com salvaguardas operacionais</span>
            </div>
          </div>
        </div>

        {/* Risk Register Table (7 cols) */}
        <div className="lg:col-span-7 space-y-3">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 flex items-center space-x-2">
            <Search className="w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Filtrar riscos por ameaça, causa ou dono..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent text-xs text-slate-200 placeholder-slate-500 focus:outline-none"
            />
          </div>

          <div className="space-y-3 max-h-[75vh] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-800">
            {filteredRisks.map((risk) => (
              <div
                key={risk.id}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3 text-xs"
              >
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <div className="flex items-center space-x-2">
                    <span className="font-mono font-bold text-rose-400 bg-rose-950 px-2 py-0.5 rounded border border-rose-800">
                      {risk.code}
                    </span>
                    <span className="font-bold text-slate-200">{risk.category}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] text-slate-400">
                      Inerente: <strong className="text-rose-400">{risk.inherentScore}</strong> (P:{risk.inherentProbability} x I:{risk.inherentImpact})
                    </span>
                    <span className="text-[10px] text-slate-400">
                      Residual: <strong className="text-emerald-400">{risk.residualScore}</strong> (P:{risk.residualProbability} x I:{risk.residualImpact})
                    </span>
                  </div>
                </div>

                <h4 className="font-bold text-slate-100 text-sm leading-snug">{risk.description}</h4>

                <div className="space-y-1.5 bg-slate-950 p-3 rounded-xl border border-slate-800 text-[11px] text-slate-300">
                  <div>
                    <strong className="text-slate-400">Evento de Ameaça:</strong> {risk.threatEvent}
                  </div>
                  <div>
                    <strong className="text-slate-400">Causa / Vulnerabilidade:</strong> {risk.vulnerabilityOrRootCause}
                  </div>
                  <div>
                    <strong className="text-slate-400">Impacto no Negócio:</strong> {risk.consequences}
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-[11px]">
                  <div className="flex items-center space-x-2">
                    <span className="text-slate-400">Estratégia:</span>
                    <select
                      value={risk.strategy}
                      onChange={(e) => updateRisk(risk.id, { strategy: e.target.value as any })}
                      className="bg-slate-950 border border-slate-700 rounded px-2 py-0.5 text-cyan-400 font-semibold focus:outline-none"
                    >
                      <option value="Mitigar">Mitigar (Reduzir P/I)</option>
                      <option value="Evitar">Evitar (Mudar processo)</option>
                      <option value="Transferir">Transferir (Seguro / Fornecedor)</option>
                      <option value="Aceitar">Aceitar (Dentro do apetite)</option>
                    </select>
                  </div>
                  <span className="text-slate-400">
                    Proprietário: <strong className="text-slate-200">{risk.owner}</strong>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
