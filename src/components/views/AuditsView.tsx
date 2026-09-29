import React from 'react';
import { useGovLab } from '../../context/GovLabContext';
import { ClipboardList, ShieldAlert, CheckCircle2, AlertTriangle, FileText, UserCheck } from 'lucide-react';

export const AuditsView: React.FC = () => {
  const { audits } = useGovLab();

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center space-x-2 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-1">
            <ClipboardList className="w-4 h-4" />
            <span>Conformidade, Governança & Auditoria • ISO/IEC 38500 & ISO 27001</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-100 tracking-tight">
            Auditorias de Governança & Evidências Contemporâneas
          </h2>
          <p className="text-xs text-slate-400">
            Diferenciação clara entre requisitos normativos, evidências contemporâneas comprovadas e práticas recomendadas.
          </p>
        </div>
      </div>

      {/* Audits list */}
      <div className="space-y-5">
        {audits.map((aud) => (
          <div
            key={aud.id}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5 text-xs"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="font-mono text-indigo-400 font-bold bg-indigo-950 px-2 py-0.5 rounded border border-indigo-800">
                    {aud.code}
                  </span>
                  <span className="font-bold text-slate-200 text-sm">{aud.title}</span>
                </div>
                <div className="text-[11px] text-slate-400">
                  Escopo: {aud.scope} • Auditor Líder: <strong className="text-slate-300">{aud.leadAuditor}</strong>
                </div>
              </div>
              <span className="text-[10px] bg-slate-800 text-cyan-300 px-3 py-1 rounded-lg font-mono">
                {aud.status}
              </span>
            </div>

            {/* Checklist Items */}
            <div className="space-y-3">
              <span className="font-bold text-slate-300 uppercase text-[10px] tracking-wider block">
                Itens Auditados & Apontamentos de Conformidade:
              </span>

              {aud.checklistItems.map((item, idx) => {
                const isNonConform = item.verdict.includes('Não Conforme');
                return (
                  <div
                    key={idx}
                    className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2.5"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-1.5 border-b border-slate-800/80">
                      <span className="font-bold text-slate-200 text-xs">{item.controlId}</span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                          item.verdict === 'Conforme'
                            ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                            : 'bg-rose-950 text-rose-300 border border-rose-800'
                        }`}
                      >
                        {item.verdict}
                      </span>
                    </div>

                    <p className="text-slate-300 text-[11px] leading-relaxed">
                      <strong>Requisito Normativo:</strong> {item.requirementClause}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px]">
                      <div className="bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
                        <strong className="text-slate-500 block mb-0.5">Evidência Esperada:</strong>
                        <span className="text-slate-400">{item.expectedEvidence}</span>
                      </div>
                      <div className="bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
                        <strong className="text-slate-500 block mb-0.5">Evidência Constatada em Campo:</strong>
                        <span className={isNonConform ? 'text-rose-300 font-semibold' : 'text-emerald-300'}>
                          {item.providedEvidence}
                        </span>
                      </div>
                    </div>

                    <div className="text-[11px] text-slate-400 italic pt-1">
                      <strong>Parecer do Auditor:</strong> "{item.justification}"
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
