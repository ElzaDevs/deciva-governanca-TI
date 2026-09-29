import React, { useState } from 'react';
import { useGovLab } from '../../context/GovLabContext';
import { NonConformity, NonConformityStatus } from '../../types';
import { auditActionPlanQuality } from '../../engine/evaluationEngine';
import { ShieldAlert, CheckCircle2, AlertTriangle, X, ArrowRight, GitCommit, Layers, FileText } from 'lucide-react';

interface NonConformityWorkflowModalProps {
  isOpen: boolean;
  onClose: () => void;
  nc: NonConformity | null;
}

export const NonConformityWorkflowModal: React.FC<NonConformityWorkflowModalProps> = ({
  isOpen,
  onClose,
  nc,
}) => {
  const { updateNonConformity } = useGovLab();

  const [activeTab, setActiveTab] = useState<'containment' | '5whys' | 'ishikawa' | '5w2h' | 'effectiveness'>('5whys');

  const [immediateContainment, setImmediateContainment] = useState(nc?.immediateContainment || '');
  const [fiveWhys, setFiveWhys] = useState<string[]>(nc?.fiveWhys || ['', '', '']);
  const [rootCauseConclusion, setRootCauseConclusion] = useState(nc?.rootCauseConclusion || '');
  const [ishikawa, setIshikawa] = useState(
    nc?.ishikawaFishbone || {
      method: '',
      machine: '',
      material: '',
      measurement: '',
      manpower: '',
      environment: '',
    }
  );
  const [plan5W2H, setPlan5W2H] = useState(
    nc?.actionPlan5W2H || {
      what: '',
      why: '',
      where: '',
      when: '',
      who: '',
      how: '',
      howMuch: '',
    }
  );
  const [effectivenessEvidence, setEffectivenessEvidence] = useState(nc?.effectivenessEvidence || '');
  const [status, setStatus] = useState<NonConformityStatus>(nc?.status || 'Identificada');

  if (!isOpen || !nc) return null;

  // Run audit on the action plan
  const auditResult = auditActionPlanQuality({
    fiveWhys,
    rootCauseConclusion,
    actionPlan5W2H: plan5W2H,
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateNonConformity(nc.id, {
      immediateContainment,
      fiveWhys: fiveWhys.filter((w) => w.trim()),
      rootCauseConclusion,
      ishikawaFishbone: ishikawa,
      actionPlan5W2H: plan5W2H,
      effectivenessEvidence,
      status,
    });
    onClose();
  };

  const handleWhyChange = (index: number, val: string) => {
    const next = [...fiveWhys];
    next[index] = val;
    setFiveWhys(next);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950">
          <div className="flex items-center space-x-3.5">
            <div className="w-10 h-10 rounded-xl bg-orange-950 border border-orange-700/60 flex items-center justify-center text-orange-400">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-orange-400">{nc.code}</span>
                <h3 className="text-base font-bold text-slate-100">{nc.title}</h3>
              </div>
              <p className="text-xs text-slate-400">
                Origem: {nc.origin} • Classificação: <strong className="text-slate-300">{nc.classification}</strong>
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Workflow Steps Tabs */}
        <div className="flex border-b border-slate-800 bg-slate-950/60 px-5 pt-2 gap-1 overflow-x-auto">
          {[
            { id: 'containment', label: '1. Contenção Imediata' },
            { id: '5whys', label: '2. 5 Porquês (Causa)' },
            { id: 'ishikawa', label: '3. Diagrama de Ishikawa' },
            { id: '5w2h', label: '4. Plano de Ação 5W2H' },
            { id: 'effectiveness', label: '5. Eficácia e Fechamento' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-2 text-xs font-semibold rounded-t-lg transition-all border-b-2 whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-orange-500 text-orange-400 bg-slate-900'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Form Body */}
        <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-slate-800">
          <form onSubmit={handleSave} className="space-y-5 text-xs">
            {/* Action Plan Audit Banner */}
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
                <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              )}
              <div className="flex-1">
                <div className="flex items-center justify-between font-bold text-xs mb-1">
                  <span>Validador ISO 9001/27001 de Não Conformidade • Score: {auditResult.score}/100</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-slate-900 border border-slate-700">
                    {auditResult.passed ? 'Conforme com Boas Práticas' : 'Risco de Rejeição em Auditoria'}
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
                    Plano de ação ataca causas estruturais e previne reincidência com controles técnicos.
                  </p>
                )}
              </div>
            </div>

            {/* TAB 1: Contenção */}
            {activeTab === 'containment' && (
              <div className="space-y-4">
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <span className="text-slate-400 font-bold block mb-1">Descrição do Fato Auditado:</span>
                  <p className="text-slate-200 leading-relaxed">{nc.problemDescription}</p>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Ação Imediata de Contenção (Disposição):
                  </label>
                  <p className="text-slate-400 text-[11px] mb-2">
                    Ação rápida para conter o sangramento ou mitigar o dano imediato antes da investigação de causa raiz.
                  </p>
                  <textarea
                    rows={4}
                    value={immediateContainment}
                    onChange={(e) => setImmediateContainment(e.target.value)}
                    placeholder="Ex: Revogação imediata no Active Directory de todas as 14 contas identificadas..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-slate-200 focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>
            )}

            {/* TAB 2: 5 Porquês */}
            {activeTab === '5whys' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-slate-300 font-bold">Investigação pelos 5 Porquês:</span>
                  <span className="text-[10px] text-slate-400">Vá além do erro humano superficial</span>
                </div>
                {fiveWhys.map((why, idx) => (
                  <div key={idx} className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
                    <span className="text-orange-400 font-bold font-mono text-[11px]">
                      {idx + 1}º Porquê:
                    </span>
                    <input
                      type="text"
                      value={why}
                      onChange={(e) => handleWhyChange(idx, e.target.value)}
                      placeholder={`Ex: Por que isso aconteceu? Resposta ${idx + 1}`}
                      className="w-full bg-transparent border-b border-slate-800 pb-1 text-slate-200 focus:outline-none focus:border-orange-500"
                    />
                  </div>
                ))}
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Conclusão Definitiva da Causa Raiz:
                  </label>
                  <textarea
                    rows={3}
                    value={rootCauseConclusion}
                    onChange={(e) => setRootCauseConclusion(e.target.value)}
                    placeholder="Ex: Falha no processo de comunicação assíncrona entre RH e TI por envio semanal de planilha manual sem automação via webhook."
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-slate-200 focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>
            )}

            {/* TAB 3: Ishikawa (6M) */}
            {activeTab === 'ishikawa' && (
              <div className="space-y-4">
                <span className="text-slate-300 font-bold block mb-1">
                  Diagrama de Ishikawa (Espinha de Peixe / 6M):
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-slate-400 font-semibold block mb-1">Método (Processos):</label>
                    <input
                      type="text"
                      value={ishikawa.method}
                      onChange={(e) => setIshikawa({ ...ishikawa, method: e.target.value })}
                      placeholder="Ex: Processo manual semanal sem SLA formal"
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200"
                    />
                  </div>
                  <div>
                    <label className="text-slate-400 font-semibold block mb-1">Máquina (Sistemas e Infra):</label>
                    <input
                      type="text"
                      value={ishikawa.machine}
                      onChange={(e) => setIshikawa({ ...ishikawa, machine: e.target.value })}
                      placeholder="Ex: Falta de integração API entre Senior e Okta"
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200"
                    />
                  </div>
                  <div>
                    <label className="text-slate-400 font-semibold block mb-1">Material (Dados e Insumos):</label>
                    <input
                      type="text"
                      value={ishikawa.material}
                      onChange={(e) => setIshikawa({ ...ishikawa, material: e.target.value })}
                      placeholder="Ex: Planilha de Excel despadronizada"
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200"
                    />
                  </div>
                  <div>
                    <label className="text-slate-400 font-semibold block mb-1">Medição (Indicadores):</label>
                    <input
                      type="text"
                      value={ishikawa.measurement}
                      onChange={(e) => setIshikawa({ ...ishikawa, measurement: e.target.value })}
                      placeholder="Ex: Falta de indicador de tempo de revogação de acessos"
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200"
                    />
                  </div>
                  <div>
                    <label className="text-slate-400 font-semibold block mb-1">Mão de Obra (Pessoas):</label>
                    <input
                      type="text"
                      value={ishikawa.manpower}
                      onChange={(e) => setIshikawa({ ...ishikawa, manpower: e.target.value })}
                      placeholder="Ex: Helpdesk sem rotina formal de conferência"
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200"
                    />
                  </div>
                  <div>
                    <label className="text-slate-400 font-semibold block mb-1">Meio Ambiente (Cultura):</label>
                    <input
                      type="text"
                      value={ishikawa.environment}
                      onChange={(e) => setIshikawa({ ...ishikawa, environment: e.target.value })}
                      placeholder="Ex: Cultura permissiva com compartilhamento de senhas"
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: 5W2H */}
            {activeTab === '5w2h' && (
              <div className="space-y-3">
                <span className="text-slate-300 font-bold block mb-1">
                  Plano de Ação Corretiva 5W2H (Ação Estrutural):
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-slate-400 font-semibold block mb-0.5">What (O que será feito?):</label>
                    <input
                      type="text"
                      value={plan5W2H.what}
                      onChange={(e) => setPlan5W2H({ ...plan5W2H, what: e.target.value })}
                      placeholder="Ex: Desenvolver integração automática via webhook entre RH e IAM..."
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200"
                    />
                  </div>
                  <div>
                    <label className="text-slate-400 font-semibold block mb-0.5">Why (Por que?):</label>
                    <input
                      type="text"
                      value={plan5W2H.why}
                      onChange={(e) => setPlan5W2H({ ...plan5W2H, why: e.target.value })}
                      placeholder="Ex: Eliminar intervalo de vulnerabilidade e atender ISO 27001..."
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200"
                    />
                  </div>
                  <div>
                    <label className="text-slate-400 font-semibold block mb-0.5">Where (Onde?):</label>
                    <input
                      type="text"
                      value={plan5W2H.where}
                      onChange={(e) => setPlan5W2H({ ...plan5W2H, where: e.target.value })}
                      placeholder="Ex: No cluster de IAM da Nexora Digital"
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200"
                    />
                  </div>
                  <div>
                    <label className="text-slate-400 font-semibold block mb-0.5">When (Quando / Prazo?):</label>
                    <input
                      type="text"
                      value={plan5W2H.when}
                      onChange={(e) => setPlan5W2H({ ...plan5W2H, when: e.target.value })}
                      placeholder="Ex: Até 15/04/2026"
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200"
                    />
                  </div>
                  <div>
                    <label className="text-slate-400 font-semibold block mb-0.5">Who (Quem é o responsável?):</label>
                    <input
                      type="text"
                      value={plan5W2H.who}
                      onChange={(e) => setPlan5W2H({ ...plan5W2H, who: e.target.value })}
                      placeholder="Ex: Alexandre Moreira e Rodrigo Brandão"
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200"
                    />
                  </div>
                  <div>
                    <label className="text-slate-400 font-semibold block mb-0.5">How (Como será executado?):</label>
                    <input
                      type="text"
                      value={plan5W2H.how}
                      onChange={(e) => setPlan5W2H({ ...plan5W2H, how: e.target.value })}
                      placeholder="Ex: Criando Azure Function segura que consome evento de rescisão..."
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-slate-400 font-semibold block mb-0.5">How Much (Quanto custará?):</label>
                    <input
                      type="text"
                      value={plan5W2H.howMuch}
                      onChange={(e) => setPlan5W2H({ ...plan5W2H, howMuch: e.target.value })}
                      placeholder="Ex: R$ 8.500 em horas técnicas de engenharia"
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* TAB 5: Eficácia & Fechamento */}
            {activeTab === 'effectiveness' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Evidência Objetiva de Eficácia da Ação:
                  </label>
                  <p className="text-slate-400 text-[11px] mb-2">
                    Uma ação só é considerada eficaz se houver prova objetiva de que a não conformidade não se repetiu após 30 a 60 dias.
                  </p>
                  <textarea
                    rows={4}
                    value={effectivenessEvidence}
                    onChange={(e) => setEffectivenessEvidence(e.target.value)}
                    placeholder="Ex: Relatório de auditoria automatizada realizada em 20/05/2026 comprovando 100% dos 22 desligamentos do mês sincronizados em menos de 15 minutos com zero contas órfãs."
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-slate-200 focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Status do Registro:</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as NonConformityStatus)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200"
                  >
                    <option value="Identificada">Identificada</option>
                    <option value="Contenção Imediata">Contenção Imediata</option>
                    <option value="Análise de Causa Raiz">Análise de Causa Raiz</option>
                    <option value="Plano de Ação (5W2H)">Plano de Ação (5W2H)</option>
                    <option value="Implementação">Implementação</option>
                    <option value="Avaliação de Eficácia">Avaliação de Eficácia</option>
                    <option value="Encerrada">Encerrada (Comprovada com Evidência)</option>
                  </select>
                </div>
              </div>
            )}

            {/* Submit */}
            <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-lg text-slate-400 hover:text-slate-200"
              >
                Fechar
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-lg font-bold text-white bg-orange-600 hover:bg-orange-500 shadow-md flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Salvar Atualizações do CAPA</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
