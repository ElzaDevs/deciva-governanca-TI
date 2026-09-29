import React, { useState, useEffect } from 'react';
import { useGovLab } from '../../context/GovLabContext';
import { Requirement, ReqType, ReqPriority, ReqStatus } from '../../types';
import { auditRequirementQuality } from '../../engine/evaluationEngine';
import { FileCode2, AlertTriangle, CheckCircle2, Plus, Trash2, X, ShieldAlert } from 'lucide-react';

interface RequirementEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialRequirement?: Requirement | null;
}

export const RequirementEditorModal: React.FC<RequirementEditorModalProps> = ({
  isOpen,
  onClose,
  initialRequirement,
}) => {
  const { createRequirement, updateRequirement, stakeholders } = useGovLab();

  const [code, setCode] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState<ReqType>('Funcional');
  const [priority, setPriority] = useState<ReqPriority>('Must have');
  const [status, setStatus] = useState<ReqStatus>('Rascunho');
  const [stakeholderId, setStakeholderId] = useState('STK-01');
  const [riskLevel, setRiskLevel] = useState<'Baixo' | 'Médio' | 'Alto' | 'Crítico'>('Médio');
  const [criteria, setCriteria] = useState<string[]>(['']);
  const [businessRules, setBusinessRules] = useState<string[]>(['']);

  useEffect(() => {
    if (initialRequirement) {
      setCode(initialRequirement.code);
      setTitle(initialRequirement.title);
      setDescription(initialRequirement.description);
      setType(initialRequirement.type);
      setPriority(initialRequirement.priority);
      setStatus(initialRequirement.status);
      setStakeholderId(initialRequirement.stakeholderId);
      setRiskLevel(initialRequirement.riskLevel);
      setCriteria(initialRequirement.acceptanceCriteria.length ? initialRequirement.acceptanceCriteria : ['']);
      setBusinessRules(initialRequirement.businessRules.length ? initialRequirement.businessRules : ['']);
    } else {
      setCode('');
      setTitle('');
      setDescription('');
      setType('Funcional');
      setPriority('Must have');
      setStatus('Rascunho');
      setStakeholderId(stakeholders[0]?.id || 'STK-01');
      setRiskLevel('Médio');
      setCriteria(['']);
      setBusinessRules(['']);
    }
  }, [initialRequirement, stakeholders]);

  if (!isOpen) return null;

  // Run live audit check
  const auditResult = auditRequirementQuality({
    title,
    description,
    type,
    acceptanceCriteria: criteria.filter((c) => c.trim()),
    stakeholderId,
    testCaseIds: initialRequirement?.testCaseIds || [],
  });

  const handleAddCriteria = () => setCriteria([...criteria, '']);
  const handleRemoveCriteria = (index: number) => setCriteria(criteria.filter((_, i) => i !== index));
  const handleCriteriaChange = (index: number, val: string) => {
    const next = [...criteria];
    next[index] = val;
    setCriteria(next);
  };

  const handleAddRule = () => setBusinessRules([...businessRules, '']);
  const handleRemoveRule = (index: number) => setBusinessRules(businessRules.filter((_, i) => i !== index));
  const handleRuleChange = (index: number, val: string) => {
    const next = [...businessRules];
    next[index] = val;
    setBusinessRules(next);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      alert('Preencha título e descrição do requisito.');
      return;
    }

    const payload: Partial<Requirement> = {
      code: code.trim() || undefined,
      title: title.trim(),
      description: description.trim(),
      type,
      priority,
      status,
      stakeholderId,
      riskLevel,
      acceptanceCriteria: criteria.filter((c) => c.trim()),
      businessRules: businessRules.filter((b) => b.trim()),
      ambiguityFlags: auditResult.findings.map((f) => f.message),
    };

    if (initialRequirement) {
      updateRequirement(initialRequirement.id, payload);
    } else {
      createRequirement(payload);
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-950 border border-cyan-700/60 flex items-center justify-center text-cyan-400">
              <FileCode2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
                {initialRequirement ? `Editar Requisito ${initialRequirement.code}` : 'Novo Requisito no Requirement Studio'}
              </h3>
              <p className="text-xs text-slate-400">
                Engenharia de requisitos rigorosa: critérios de aceitação, regras de negócio e validação de ambiguidade.
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-slate-800">
          <form onSubmit={handleSubmit} className="space-y-5 text-xs">
            {/* Live Audit Banner */}
            <div
              className={`p-3.5 rounded-xl border flex items-start space-x-3 transition-colors ${
                auditResult.passed
                  ? 'bg-emerald-950/30 border-emerald-800/60 text-emerald-300'
                  : 'bg-amber-950/40 border-amber-800/60 text-amber-200'
              }`}
            >
              {auditResult.passed ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              ) : (
                <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              )}
              <div className="flex-1">
                <div className="flex items-center justify-between font-bold text-xs mb-1">
                  <span>Linter de Requisitos • Qualidade: {auditResult.score}/100</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-slate-900 border border-slate-700">
                    {auditResult.passed ? 'Aprovado para Desenvolvimento' : 'Contém Riscos Metodológicos'}
                  </span>
                </div>
                {auditResult.findings.length > 0 ? (
                  <ul className="space-y-1 text-[11px] text-slate-300 mt-1">
                    {auditResult.findings.map((f, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-amber-400 font-bold">•</span>
                        <span>
                          <strong className="text-amber-300">{f.message}</strong>{' '}
                          <span className="text-slate-400">({f.recommendation})</span>
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-[11px] text-emerald-300">
                    Excelente. Requisito sem termos ambíguos, com critérios verificáveis e stakeholder mapeado.
                  </p>
                )}
              </div>
            </div>

            {/* Basic Info */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Código (ID):</label>
                <input
                  type="text"
                  placeholder="REQ-001"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200 focus:outline-none focus:border-cyan-500 font-mono"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-slate-300 font-semibold mb-1">Título do Requisito:</label>
                <input
                  type="text"
                  placeholder="Ex: Autenticação Multifator Obrigatória para Administradores"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200 focus:outline-none focus:border-cyan-500"
                  required
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-slate-300 font-semibold mb-1">
                Descrição Detalhada do Comportamento Esperado:
              </label>
              <textarea
                rows={3}
                placeholder="Descreva o que o sistema deve fazer em linguagem clara, evitando adjetivos vazios como rápido ou amigável."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-200 focus:outline-none focus:border-cyan-500"
                required
              />
            </div>

            {/* Meta attributes */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Tipo:</label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value as ReqType)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200 focus:outline-none"
                >
                  <option value="Funcional">Funcional</option>
                  <option value="Não Funcional">Não Funcional</option>
                  <option value="Regra de Negócio">Regra de Negócio</option>
                  <option value="Restrição Técnica">Restrição Técnica</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Prioridade (MoSCoW):</label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as ReqPriority)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200 focus:outline-none"
                >
                  <option value="Must have">Must have (Mandatório)</option>
                  <option value="Should have">Should have (Importante)</option>
                  <option value="Could have">Could have (Desejável)</option>
                  <option value="Won't have">Won't have (Fora do ciclo)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Status:</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as ReqStatus)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200 focus:outline-none"
                >
                  <option value="Rascunho">Rascunho</option>
                  <option value="Em Análise">Em Análise</option>
                  <option value="Aprovado">Aprovado</option>
                  <option value="Em Desenvolvimento">Em Desenvolvimento</option>
                  <option value="Validado">Validado</option>
                  <option value="Rejeitado">Rejeitado</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Patrocinador / Stakeholder:</label>
                <select
                  value={stakeholderId}
                  onChange={(e) => setStakeholderId(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200 focus:outline-none"
                >
                  {stakeholders.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name} ({s.role.slice(0, 20)}...)
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Acceptance Criteria */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="block text-slate-300 font-semibold">
                  Critérios de Aceitação Verificáveis (BDD / Given-When-Then):
                </label>
                <button
                  type="button"
                  onClick={handleAddCriteria}
                  className="flex items-center gap-1 text-[11px] text-cyan-400 hover:text-cyan-300"
                >
                  <Plus className="w-3.5 h-3.5" /> Adicionar Critério
                </button>
              </div>
              {criteria.map((c, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    type="text"
                    placeholder="Ex: Dado que o usuário errou 5 vezes a senha, então a conta deve ser bloqueada por 15 minutos."
                    value={c}
                    onChange={(e) => handleCriteriaChange(index, e.target.value)}
                    className="flex-1 bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200 focus:outline-none focus:border-cyan-500"
                  />
                  {criteria.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveCriteria(index)}
                      className="p-2 text-slate-500 hover:text-rose-400"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Business Rules */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="block text-slate-300 font-semibold">
                  Regras de Negócio Associadas (RN):
                </label>
                <button
                  type="button"
                  onClick={handleAddRule}
                  className="flex items-center gap-1 text-[11px] text-indigo-400 hover:text-indigo-300"
                >
                  <Plus className="w-3.5 h-3.5" /> Adicionar Regra
                </button>
              </div>
              {businessRules.map((b, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    type="text"
                    placeholder="Ex: RN-SEG-01: Administradores não podem desativar o MFA sem assinatura do CISO."
                    value={b}
                    onChange={(e) => handleRuleChange(index, e.target.value)}
                    className="flex-1 bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200 focus:outline-none focus:border-indigo-500"
                  />
                  {businessRules.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveRule(index)}
                      className="p-2 text-slate-500 hover:text-rose-400"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-lg text-slate-400 hover:text-slate-200"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-lg font-bold text-white bg-cyan-600 hover:bg-cyan-500 shadow-md flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{initialRequirement ? 'Salvar Nova Versão' : 'Criar Requisito'}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
