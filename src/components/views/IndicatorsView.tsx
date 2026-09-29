import React from 'react';
import { useGovLab } from '../../context/GovLabContext';
import { LineChart, TrendingUp, TrendingDown, Minus, CheckCircle2, AlertTriangle, ShieldAlert } from 'lucide-react';

export const IndicatorsView: React.FC = () => {
  const { indicators } = useGovLab();

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center space-x-2 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-1">
            <LineChart className="w-4 h-4" />
            <span>Gestão & Governança • Métricas, KPIs e KRIs Corporativos</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-100 tracking-tight">
            Painel Executivo de Indicadores (40+ Métricas)
          </h2>
          <p className="text-xs text-slate-400">
            Acompanhamento contínuo de disponibilidade, segurança, eficiência de suporte e saúde financeira da Nexora.
          </p>
        </div>
      </div>

      {/* Indicators Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {indicators.map((ind) => {
          const isCritical = ind.status === 'critico';
          const isWarning = ind.status === 'alerta';

          return (
            <div
              key={ind.id}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-xl hover:border-slate-700 transition-all flex flex-col justify-between text-xs"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] text-cyan-400 font-bold bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">
                    {ind.code}
                  </span>
                  <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded">
                    {ind.category}
                  </span>
                </div>

                <h4 className="font-bold text-slate-100 text-sm leading-snug">{ind.name}</h4>
                <p className="text-slate-400 text-[11px] leading-relaxed">{ind.description}</p>
              </div>

              <div className="pt-3 border-t border-slate-800/80 space-y-2">
                <div className="flex items-baseline justify-between">
                  <div className="flex items-baseline space-x-1">
                    <span className="text-2xl font-black text-slate-100 font-mono">
                      {ind.currentValue}
                    </span>
                    <span className="text-xs text-slate-400 font-semibold">{ind.unit}</span>
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Meta: <strong className="text-slate-200">{ind.targetValue} {ind.unit}</strong>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[10px]">
                  <span
                    className={`font-semibold flex items-center gap-1 ${
                      isCritical ? 'text-rose-400' : isWarning ? 'text-amber-400' : 'text-emerald-400'
                    }`}
                  >
                    {isCritical ? 'Estado Crítico' : isWarning ? 'Em Atenção / Alerta' : 'Dentro da Meta'}
                  </span>
                  <span className="flex items-center gap-1 text-slate-400">
                    {ind.trend === 'up' ? (
                      <TrendingUp className="w-3.5 h-3.5 text-cyan-400" />
                    ) : ind.trend === 'down' ? (
                      <TrendingDown className="w-3.5 h-3.5 text-amber-400" />
                    ) : (
                      <Minus className="w-3.5 h-3.5 text-slate-500" />
                    )}
                    Tendência {ind.trend}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
