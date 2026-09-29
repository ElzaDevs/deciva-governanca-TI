import React from 'react';
import { useGovLab } from '../../context/GovLabContext';
import { FolderGit2, DollarSign, CheckCircle2, Clock, AlertTriangle, ArrowRight } from 'lucide-react';

export const ProjectsView: React.FC = () => {
  const { projects, companyState } = useGovLab();

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center space-x-2 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-1">
            <FolderGit2 className="w-4 h-4" />
            <span>Gestão e Governança • Portfólio Estratégico de TI</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-100 tracking-tight">
            Projetos & Alocação Orçamentária
          </h2>
          <p className="text-xs text-slate-400">
            Alinhamento com o plano de negócios, análise de ROI, capacidade técnica e priorização perante o Comitê Executivo.
          </p>
        </div>

        <div className="flex items-center space-x-3 bg-slate-900 border border-slate-800 px-4 py-2 rounded-xl text-xs">
          <DollarSign className="w-4 h-4 text-emerald-400" />
          <span className="text-slate-400">Orçamento Restante:</span>
          <span className="font-bold text-slate-100 font-mono">
            R$ {companyState.budgetRemaining.toLocaleString('pt-BR')}
          </span>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="space-y-4">
        {projects.map((prj) => (
          <div
            key={prj.id}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4 text-xs"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
              <div className="flex items-center space-x-2.5">
                <span className="font-mono text-indigo-400 font-bold bg-indigo-950 px-2.5 py-0.5 rounded border border-indigo-800">
                  {prj.code}
                </span>
                <h3 className="text-base font-bold text-slate-100">{prj.name}</h3>
              </div>
              <div className="flex items-center space-x-2">
                <span
                  className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                    prj.strategicAlignment === 'Crítico'
                      ? 'bg-rose-950 text-rose-300 border border-rose-800'
                      : 'bg-indigo-950 text-indigo-300 border border-indigo-800'
                  }`}
                >
                  Alinhamento: {prj.strategicAlignment}
                </span>
                <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-mono">
                  {prj.status}
                </span>
              </div>
            </div>

            <p className="text-slate-300 leading-relaxed text-xs">{prj.description}</p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-950 p-4 rounded-xl border border-slate-800">
              <div>
                <span className="text-slate-500 text-[10px] uppercase font-bold block">Orçamento Teto</span>
                <span className="text-slate-100 font-bold font-mono">
                  R$ {prj.budgetCap.toLocaleString('pt-BR')}
                </span>
              </div>
              <div>
                <span className="text-slate-500 text-[10px] uppercase font-bold block">Duração Estimada</span>
                <span className="text-slate-300 font-bold">{prj.estimatedDurationMonths} meses</span>
              </div>
              <div>
                <span className="text-slate-500 text-[10px] uppercase font-bold block">Capacidade Demandada</span>
                <span className="text-slate-300 font-bold">{prj.capacityCostHours} horas dev</span>
              </div>
              <div>
                <span className="text-slate-500 text-[10px] uppercase font-bold block">Risco do Projeto</span>
                <span className="text-amber-400 font-bold">{prj.riskRating}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1 text-[11px] text-slate-400">
              <span>
                <strong className="text-slate-300">Estimativa de Retorno (ROI):</strong> {prj.roiEstimate}
              </span>
              <span>Solicitante: <strong className="text-slate-300">{prj.requestedBy}</strong></span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
