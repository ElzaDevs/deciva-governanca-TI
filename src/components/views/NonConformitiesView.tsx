import React, { useState } from 'react';
import { useGovLab } from '../../context/GovLabContext';
import { NonConformity, NonConformityClassification, NonConformityStatus } from '../../types';
import {
  ShieldAlert,
  Plus,
  Search,
  Filter,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Layers,
  FileText,
  Clock,
} from 'lucide-react';

interface NonConformitiesViewProps {
  onOpenWorkflow: (nc: NonConformity) => void;
  onCreateNewNC: () => void;
}

export const NonConformitiesView: React.FC<NonConformitiesViewProps> = ({
  onOpenWorkflow,
  onCreateNewNC,
}) => {
  const { nonConformities } = useGovLab();

  const [search, setSearch] = useState('');
  const [filterClass, setFilterClass] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filteredNCs = nonConformities.filter((nc) => {
    const matchSearch =
      nc.code.toLowerCase().includes(search.toLowerCase()) ||
      nc.title.toLowerCase().includes(search.toLowerCase()) ||
      nc.problemDescription.toLowerCase().includes(search.toLowerCase());

    const matchClass = filterClass === 'all' || nc.classification === filterClass;
    const matchStatus = filterStatus === 'all' || nc.status === filterStatus;

    return matchSearch && matchClass && matchStatus;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center space-x-2 text-orange-400 text-xs font-bold uppercase tracking-wider mb-1">
            <ShieldAlert className="w-4 h-4" />
            <span>Qualidade, Riscos & Auditoria • Sistema CAPA</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-100 tracking-tight">
            Gestão de Não Conformidades (CAPA)
          </h2>
          <p className="text-xs text-slate-400">
            Tratamento estruturado conforme ISO 9001, ISO 27001 e ISO 38500: Contenção, 5 Porquês, Ishikawa, 5W2H e Eficácia.
          </p>
        </div>

        <button
          onClick={onCreateNewNC}
          className="px-4 py-2 bg-orange-600 hover:bg-orange-500 text-white rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-all shadow-md shadow-orange-600/30 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Registrar Não Conformidade</span>
        </button>
      </div>

      {/* Filter and Search */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-500" />
          <input
            type="text"
            placeholder="Buscar por código, título ou descrição de não conformidade..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-orange-500"
          />
        </div>

        <div className="flex items-center gap-2 text-xs">
          <select
            value={filterClass}
            onChange={(e) => setFilterClass(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-300 focus:outline-none"
          >
            <option value="all">Todas as Classificações</option>
            <option value="Não Conformidade Maior">Não Conformidade Maior</option>
            <option value="Não Conformidade Menor">Não Conformidade Menor</option>
            <option value="Observação">Observação</option>
            <option value="Oportunidade de Melhoria">Oportunidade de Melhoria</option>
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-300 focus:outline-none"
          >
            <option value="all">Todos os Status</option>
            <option value="Identificada">Identificada</option>
            <option value="Contenção Imediata">Contenção Imediata</option>
            <option value="Análise de Causa Raiz">Análise de Causa Raiz</option>
            <option value="Plano de Ação (5W2H)">Plano de Ação (5W2H)</option>
            <option value="Implementação">Implementação</option>
            <option value="Avaliação de Eficácia">Avaliação de Eficácia</option>
            <option value="Encerrada">Encerrada</option>
          </select>
        </div>
      </div>

      {/* Non-Conformities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredNCs.map((nc) => {
          const isMajor = nc.classification === 'Não Conformidade Maior';
          const isClosed = nc.status === 'Encerrada';

          return (
            <div
              key={nc.id}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 hover:border-slate-700 transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-orange-400 bg-orange-950/70 border border-orange-800/80 px-2 py-0.5 rounded">
                    {nc.code}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      isMajor
                        ? 'bg-rose-950 text-rose-300 border border-rose-800'
                        : 'bg-amber-950 text-amber-300 border border-amber-800'
                    }`}
                  >
                    {nc.classification}
                  </span>
                </div>

                <h4 className="font-bold text-slate-100 text-sm leading-snug">{nc.title}</h4>
                <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                  {nc.problemDescription}
                </p>

                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1.5 text-xs text-slate-300">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-slate-500">Origem:</span>
                    <span className="font-semibold text-slate-200">{nc.origin}</span>
                  </div>
                  <div className="flex justify-between text-[11px]">
                    <span className="text-slate-500">Responsável:</span>
                    <span className="text-slate-300">{nc.responsible}</span>
                  </div>
                  <div className="flex justify-between text-[11px]">
                    <span className="text-slate-500">Etapa Atual do Fluxo:</span>
                    <span className="font-bold text-orange-400">{nc.status}</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-[10px] text-slate-500 font-mono">
                  Identificada em: {nc.identifiedDate}
                </span>
                <button
                  onClick={() => onOpenWorkflow(nc)}
                  className="px-3.5 py-1.5 rounded-lg font-bold text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center space-x-1.5 transition-colors"
                >
                  <span>Abrir Workflow CAPA</span>
                  <ArrowRight className="w-3.5 h-3.5 text-orange-400" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
