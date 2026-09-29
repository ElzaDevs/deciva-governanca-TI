import React, { useState } from 'react';
import { useGovLab } from '../../context/GovLabContext';
import { ChangeRequest } from '../../types';
import { auditChangeRequest } from '../../engine/evaluationEngine';
import { FileCheck2, Plus, CheckCircle2, XCircle, AlertTriangle, ShieldCheck } from 'lucide-react';

export const ChangesView: React.FC = () => {
  const { changes, updateChangeRequest, createChangeRequest } = useGovLab();

  const [isCreating, setIsCreating] = useState(false);
  const [title, setTitle] = useState('');
  const [systemAffected, setSystemAffected] = useState('Portal B2B & APIs');
  const [rollbackPlan, setRollbackPlan] = useState('');
  const [testEvidenceAttached, setTestEvidenceAttached] = useState(true);
  const [justification, setJustification] = useState('');

  const handleApprove = (rfc: ChangeRequest) => {
    const audit = auditChangeRequest(rfc);
    if (!audit.passed) {
      if (!confirm(`Atenção: Esta mudança possui riscos no CAB (${audit.findings[0]?.message}). Deseja aprovar mesmo assim?`)) {
        return;
      }
    }
    updateChangeRequest(rfc.id, { status: 'Aprovada' });
  };

  const handleReject = (rfc: ChangeRequest) => {
    updateChangeRequest(rfc.id, { status: 'Rejeitada' });
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    createChangeRequest({
      title: title.trim(),
      systemAffected,
      rollbackPlan,
      testEvidenceAttached,
      justification,
      type: 'Normal',
      riskAssessment: 'Médio',
      executionWindow: 'Sábado 23h00',
    });

    setIsCreating(false);
    setTitle('');
    setRollbackPlan('');
    setJustification('');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center space-x-2 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-1">
            <FileCheck2 className="w-4 h-4" />
            <span>ITSM • Change Advisory Board (CAB)</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-100 tracking-tight">
            Gestão de Mudanças em Produção (RFCs)
          </h2>
          <p className="text-xs text-slate-400">
            Análise de risco, validação de evidências de homologação e planos de reversão (rollback) para proteção do negócio.
          </p>
        </div>

        <button
          onClick={() => setIsCreating(!isCreating)}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-all shadow-md shadow-indigo-600/30 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Solicitar Mudança (RFC)</span>
        </button>
      </div>

      {/* Creation form */}
      {isCreating && (
        <form onSubmit={handleCreate} className="bg-slate-900 border border-indigo-700/60 rounded-2xl p-6 space-y-4 text-xs shadow-xl">
          <h3 className="text-sm font-bold text-slate-100">Abrir Nova Requisição de Mudança (RFC)</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Título da Mudança:</label>
              <input
                type="text"
                placeholder="Ex: Atualização do statement_timeout do PostgreSQL"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-200"
                required
              />
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Sistema Afetado:</label>
              <input
                type="text"
                value={systemAffected}
                onChange={(e) => setSystemAffected(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-200"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">
              Plano de Reversão / Rollback (Mandatório):
            </label>
            <textarea
              rows={2}
              placeholder="Descreva o procedimento exato de reversão caso a mudança cause instabilidade em produção."
              value={rollbackPlan}
              onChange={(e) => setRollbackPlan(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-200"
              required
            />
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Justificativa de Negócio:</label>
            <textarea
              rows={2}
              placeholder="Por que esta mudança é necessária agora?"
              value={justification}
              onChange={(e) => setJustification(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-200"
              required
            />
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="evidenceCheck"
              checked={testEvidenceAttached}
              onChange={(e) => setTestEvidenceAttached(e.target.checked)}
              className="accent-indigo-500 rounded"
            />
            <label htmlFor="evidenceCheck" className="text-slate-300">
              Evidência de testes em homologação anexada à solicitação
            </label>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setIsCreating(false)}
              className="px-4 py-2 rounded-lg text-slate-400 hover:text-slate-200"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 font-bold text-white shadow-md"
            >
              Enviar ao CAB
            </button>
          </div>
        </form>
      )}

      {/* Changes list */}
      <div className="space-y-4">
        {changes.map((rfc) => {
          const audit = auditChangeRequest(rfc);
          return (
            <div
              key={rfc.id}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4 text-xs"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
                <div className="flex items-center space-x-2.5">
                  <span className="font-mono text-indigo-400 font-bold bg-indigo-950 px-2.5 py-0.5 rounded border border-indigo-800">
                    {rfc.code}
                  </span>
                  <h3 className="text-base font-bold text-slate-100">{rfc.title}</h3>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-mono">
                    Tipo: {rfc.type}
                  </span>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                      rfc.status === 'Aprovada'
                        ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                        : rfc.status === 'Rejeitada'
                        ? 'bg-rose-950 text-rose-400 border border-rose-800'
                        : 'bg-amber-950 text-amber-300 border border-amber-800'
                    }`}
                  >
                    {rfc.status}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                  <strong className="text-slate-400 uppercase text-[10px] tracking-wider block">
                    Avaliação de Impacto & Risco:
                  </strong>
                  <p className="text-slate-300 leading-relaxed">{rfc.impactAssessment}</p>
                  <div className="text-[10px] text-slate-500 pt-1">
                    Sistema Afetado: <span className="text-slate-300">{rfc.systemAffected}</span> • Risco: <span className="text-amber-400">{rfc.riskAssessment}</span>
                  </div>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                  <strong className="text-cyan-400 uppercase text-[10px] tracking-wider block">
                    Plano de Reversão (Rollback):
                  </strong>
                  <p className="text-slate-300 font-mono text-[11px] leading-relaxed">
                    {rfc.rollbackPlan}
                  </p>
                  <div className="text-[10px] text-emerald-400 pt-1">
                    Evidência de Teste Anexa: {rfc.testEvidenceAttached ? 'Sim (Auditada)' : 'Não'}
                  </div>
                </div>
              </div>

              {/* CAB Decision Actions */}
              {rfc.status === 'Submetida ao CAB' && (
                <div className="pt-2 flex items-center justify-between border-t border-slate-800/80">
                  <span className="text-[11px] text-slate-400">
                    Aguardando deliberação dos membros do comitê CAB: {rfc.approvers.join(', ')}
                  </span>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleReject(rfc)}
                      className="px-3.5 py-1.5 bg-slate-800 hover:bg-rose-950/60 text-slate-300 hover:text-rose-300 rounded-lg font-bold transition-colors"
                    >
                      Rejeitar no CAB
                    </button>
                    <button
                      onClick={() => handleApprove(rfc)}
                      className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-bold shadow-md transition-all flex items-center space-x-1"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Aprovar Mudança</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
