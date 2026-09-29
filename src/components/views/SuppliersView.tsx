import React from 'react';
import { useGovLab } from '../../context/GovLabContext';
import { Truck, ShieldCheck, AlertTriangle, CheckCircle2, DollarSign, Calendar } from 'lucide-react';

export const SuppliersView: React.FC = () => {
  const { suppliers } = useGovLab();

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center space-x-2 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Truck className="w-4 h-4" />
            <span>Gestão e Governança • Gestão de Fornecedores & Terceiros</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-100 tracking-tight">
            Fornecedores Críticos, Contratos & SLAs
          </h2>
          <p className="text-xs text-slate-400">
            Monitoramento de Acordos de Nível de Serviço (SLAs), riscos de dependência tecnológica e aplicação de penalidades contratuais.
          </p>
        </div>
      </div>

      {/* Suppliers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {suppliers.map((sup) => {
          const isBreached = sup.status === 'Alerta de SLA' || sup.status === 'Penalidade Aplicada';

          return (
            <div
              key={sup.id}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4 text-xs flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-100 text-sm">{sup.name}</span>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                      isBreached
                        ? 'bg-rose-950 text-rose-300 border border-rose-800'
                        : 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                    }`}
                  >
                    {sup.status}
                  </span>
                </div>

                <div className="text-[11px] text-indigo-400 font-semibold">{sup.category}</div>

                <div className="grid grid-cols-2 gap-3 bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                  <div>
                    <span className="text-slate-500 text-[10px] uppercase font-bold block">SLA Contratado</span>
                    <span className="text-slate-200 font-mono font-bold">{sup.contractedSla}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[10px] uppercase font-bold block">Performance Real</span>
                    <span
                      className={`font-mono font-bold ${
                        sup.currentPerformancePercent < 99.0 ? 'text-rose-400' : 'text-emerald-400'
                      }`}
                    >
                      {sup.currentPerformancePercent}%
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[10px] uppercase font-bold block">Custo Mensal</span>
                    <span className="text-slate-200 font-mono">
                      R$ {sup.monthlyCost.toLocaleString('pt-BR')}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[10px] uppercase font-bold block">Rating de Segurança</span>
                    <span className="text-cyan-400 font-bold">Grau {sup.securityRating}</span>
                  </div>
                </div>

                {isBreached && (
                  <div className="p-3 bg-rose-950/40 border border-rose-800 rounded-xl space-y-1 text-rose-300 text-[11px]">
                    <div className="font-bold flex items-center gap-1">
                      <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                      Quebra de Cláusula Contratual
                    </div>
                    <p>
                      Fornecedor causou {sup.incidentsCausedCount} incidentes recentes. O departamento Jurídico foi acionado para aplicação de multa de 10% na fatura.
                    </p>
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500">
                <span>Contato: {sup.contactPerson}</span>
                <span>Vencimento do Contrato: {sup.contractExpiryDate}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
