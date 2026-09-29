import React, { useState } from 'react';
import { useGovLab } from '../../context/GovLabContext';
import { Requirement, ReqType, ReqPriority, ReqStatus } from '../../types';
import {
  FileCode2,
  Plus,
  Search,
  Filter,
  AlertTriangle,
  CheckCircle2,
  Edit3,
  Trash2,
  TableProperties,
  Download,
  ShieldAlert,
} from 'lucide-react';

interface RequirementStudioViewProps {
  onOpenEditor: (req?: Requirement | null) => void;
  onNavigateRtm: () => void;
}

export const RequirementStudioView: React.FC<RequirementStudioViewProps> = ({
  onOpenEditor,
  onNavigateRtm,
}) => {
  const { requirements, deleteRequirement, stakeholders } = useGovLab();

  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterPriority, setFilterPriority] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [selectedReq, setSelectedReq] = useState<Requirement | null>(requirements[0] || null);

  const filteredRequirements = requirements.filter((r) => {
    const matchSearch =
      r.code.toLowerCase().includes(search.toLowerCase()) ||
      r.title.toLowerCase().includes(search.toLowerCase()) ||
      r.description.toLowerCase().includes(search.toLowerCase());

    const matchType = filterType === 'all' || r.type === filterType;
    const matchPriority = filterPriority === 'all' || r.priority === filterPriority;
    const matchStatus = filterStatus === 'all' || r.status === filterStatus;

    return matchSearch && matchType && matchPriority && matchStatus;
  });

  const getStakeholderName = (id: string) => {
    return stakeholders.find((s) => s.id === id)?.name || 'Stakeholder Não Atribuído';
  };

  const handleExportCSV = () => {
    const headers = 'Código,Título,Tipo,Prioridade,Status,Stakeholder,Risco,Versão,Critérios_Qtd\n';
    const rows = requirements
      .map(
        (r) =>
          `"${r.code}","${r.title.replace(/"/g, '""')}","${r.type}","${r.priority}","${r.status}","${getStakeholderName(
            r.stakeholderId
          )}","${r.riskLevel}",${r.version},${r.acceptanceCriteria.length}`
      )
      .join('\n');

    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `nexora_requirements_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center space-x-2 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-1">
            <FileCode2 className="w-4 h-4" />
            <span>Engenharia de Requisitos • Nexora Digital</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-100 tracking-tight">
            Requirement Studio
          </h2>
          <p className="text-xs text-slate-400">
            Elicitação, especificação formal, validação de critérios de aceitação e eliminação de ambiguidades.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={onNavigateRtm}
            className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition-colors border border-slate-700"
          >
            <TableProperties className="w-4 h-4 text-indigo-400" />
            <span>Ver Matriz RTM</span>
          </button>
          <button
            onClick={handleExportCSV}
            className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition-colors border border-slate-700"
            title="Exportar planilha CSV"
          >
            <Download className="w-4 h-4 text-emerald-400" />
            <span className="hidden sm:inline">Exportar CSV</span>
          </button>
          <button
            onClick={() => onOpenEditor(null)}
            className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-all shadow-md shadow-cyan-600/30"
          >
            <Plus className="w-4 h-4" />
            <span>Novo Requisito</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-500" />
          <input
            type="text"
            placeholder="Buscar por código, título ou descrição de requisito..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-2 text-slate-300 focus:outline-none"
          >
            <option value="all">Todos os Tipos</option>
            <option value="Funcional">Funcional</option>
            <option value="Não Funcional">Não Funcional</option>
            <option value="Regra de Negócio">Regra de Negócio</option>
            <option value="Restrição Técnica">Restrição Técnica</option>
          </select>

          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-2 text-slate-300 focus:outline-none"
          >
            <option value="all">Prioridade (MoSCoW)</option>
            <option value="Must have">Must have</option>
            <option value="Should have">Should have</option>
            <option value="Could have">Could have</option>
            <option value="Won't have">Won't have</option>
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-2 text-slate-300 focus:outline-none"
          >
            <option value="all">Todos os Status</option>
            <option value="Rascunho">Rascunho</option>
            <option value="Em Análise">Em Análise</option>
            <option value="Aprovado">Aprovado</option>
            <option value="Validado">Validado</option>
          </select>
        </div>
      </div>

      {/* Main Split: Requirements List (Left 5 cols) + Inspector Detail Card (Right 7 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* List of Requirements */}
        <div className="lg:col-span-5 space-y-2.5 max-h-[75vh] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-800">
          {filteredRequirements.length === 0 ? (
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 text-center text-xs text-slate-400">
              Nenhum requisito localizado com os filtros selecionados.
            </div>
          ) : (
            filteredRequirements.map((req) => {
              const isSelected = selectedReq?.id === req.id;
              const hasAmbiguity = req.ambiguityFlags && req.ambiguityFlags.length > 0;

              return (
                <div
                  key={req.id}
                  onClick={() => setSelectedReq(req)}
                  className={`p-4 rounded-xl border text-xs transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-slate-900 border-cyan-500 shadow-lg shadow-cyan-950/40'
                      : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center space-x-2">
                      <span className="font-mono font-bold text-cyan-400">{req.code}</span>
                      <span className="text-[10px] bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded">
                        v{req.version}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1.5">
                      {hasAmbiguity && (
                        <span
                          className="text-[9px] bg-amber-950 text-amber-300 border border-amber-800 px-1.5 py-0.5 rounded flex items-center gap-1"
                          title="Contém termos ambíguos ou incompletos"
                        >
                          <AlertTriangle className="w-3 h-3 text-amber-400" />
                          Ambíguo
                        </span>
                      )}
                      <span
                        className={`text-[9px] px-1.5 py-0.5 rounded font-semibold ${
                          req.priority === 'Must have'
                            ? 'bg-rose-950 text-rose-300 border border-rose-800'
                            : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {req.priority}
                      </span>
                    </div>
                  </div>

                  <h4 className="font-bold text-slate-200 text-xs line-clamp-1 mb-1">{req.title}</h4>
                  <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                    {req.description}
                  </p>

                  <div className="flex items-center justify-between pt-2 mt-2 border-t border-slate-800/80 text-[10px] text-slate-500">
                    <span>{req.type}</span>
                    <span>Status: {req.status}</span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Selected Requirement Detail Inspector */}
        <div className="lg:col-span-7">
          {selectedReq ? (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5 text-xs">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-xs font-bold text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">
                      {selectedReq.code}
                    </span>
                    <span className="text-[11px] text-slate-400">Versão {selectedReq.version}.0</span>
                    <span className="text-[11px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded">
                      {selectedReq.status}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-100">{selectedReq.title}</h3>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-auto">
                  <button
                    onClick={() => onOpenEditor(selectedReq)}
                    className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                    title="Editar Requisito"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      if (confirm(`Excluir requisito ${selectedReq.code}?`)) {
                        deleteRequirement(selectedReq.id);
                        setSelectedReq(null);
                      }
                    }}
                    className="p-2 rounded-lg bg-slate-800 hover:bg-rose-900/60 text-slate-400 hover:text-rose-300 transition-colors"
                    title="Excluir Requisito"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Ambiguity Alert Card if present */}
              {selectedReq.ambiguityFlags && selectedReq.ambiguityFlags.length > 0 && (
                <div className="bg-amber-950/40 border border-amber-800/80 rounded-xl p-4 space-y-2">
                  <div className="flex items-center space-x-2 text-amber-300 font-bold text-xs">
                    <ShieldAlert className="w-4 h-4 text-amber-400" />
                    <span>Auditoria de Engenharia: Ambiguidades Detectadas</span>
                  </div>
                  <ul className="space-y-1 text-[11px] text-slate-300">
                    {selectedReq.ambiguityFlags.map((flag, idx) => (
                      <li key={idx} className="flex items-start space-x-1.5">
                        <span className="text-amber-400 font-bold">•</span>
                        <span>{flag}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="pt-1">
                    <button
                      onClick={() => onOpenEditor(selectedReq)}
                      className="text-[11px] text-cyan-400 hover:text-cyan-300 font-semibold underline"
                    >
                      Editar agora para tornar o requisito verificável
                    </button>
                  </div>
                </div>
              )}

              {/* Description */}
              <div className="space-y-1">
                <span className="text-slate-400 font-semibold uppercase text-[10px] tracking-wider block">
                  Descrição do Requisito:
                </span>
                <p className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-slate-200 leading-relaxed text-xs">
                  {selectedReq.description}
                </p>
              </div>

              {/* Meta Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                <div>
                  <span className="text-slate-500 text-[10px] uppercase block font-semibold">Tipo</span>
                  <span className="text-slate-200 font-bold">{selectedReq.type}</span>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] uppercase block font-semibold">Prioridade</span>
                  <span className="text-rose-400 font-bold">{selectedReq.priority}</span>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] uppercase block font-semibold">Risco Técnico</span>
                  <span className="text-slate-200 font-bold">{selectedReq.riskLevel}</span>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] uppercase block font-semibold">Stakeholder</span>
                  <span className="text-cyan-400 font-medium truncate block">
                    {getStakeholderName(selectedReq.stakeholderId)}
                  </span>
                </div>
              </div>

              {/* Acceptance Criteria */}
              <div className="space-y-2">
                <span className="text-slate-400 font-semibold uppercase text-[10px] tracking-wider flex items-center justify-between">
                  <span>Critérios de Aceitação Verificáveis ({selectedReq.acceptanceCriteria.length}):</span>
                </span>
                {selectedReq.acceptanceCriteria.length === 0 ? (
                  <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 text-slate-500 italic">
                    Nenhum critério de aceitação cadastrado. Isso impede a criação de testes pelo time de QA!
                  </div>
                ) : (
                  <div className="space-y-1.5">
                    {selectedReq.acceptanceCriteria.map((crit, idx) => (
                      <div
                        key={idx}
                        className="bg-slate-950/80 p-3 rounded-lg border border-slate-800 flex items-start space-x-2 text-slate-300"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                        <span className="leading-snug">{crit}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Business Rules */}
              {selectedReq.businessRules.length > 0 && (
                <div className="space-y-2">
                  <span className="text-slate-400 font-semibold uppercase text-[10px] tracking-wider block">
                    Regras de Negócio Associadas:
                  </span>
                  <div className="space-y-1.5">
                    {selectedReq.businessRules.map((rn, idx) => (
                      <div
                        key={idx}
                        className="bg-slate-950/80 p-2.5 rounded-lg border border-slate-800 text-indigo-300 font-mono text-[11px]"
                      >
                        {rn}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center text-slate-500 text-xs">
              Selecione um requisito na lista à esquerda para inspecionar os detalhes.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
