import React, { useState } from 'react';
import { useGovLab } from '../../context/GovLabContext';
import { Brain, Sparkles, CheckCircle2, History, X, Sliders } from 'lucide-react';

interface MetacognitionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MetacognitionModal: React.FC<MetacognitionModalProps> = ({ isOpen, onClose }) => {
  const { recordMetacognition, metacognitiveEntries } = useGovLab();

  const [activeTab, setActiveTab] = useState<'pre' | 'post' | 'history'>('pre');

  // Pre-decision fields
  const [decisionTitle, setDecisionTitle] = useState('');
  const [whatIKnow, setWhatIKnow] = useState('');
  const [whatIsMissing, setWhatIsMissing] = useState('');
  const [hypothesis, setHypothesis] = useState('');
  const [evidenceUsed, setEvidenceUsed] = useState('');
  const [risksConsidered, setRisksConsidered] = useState('');
  const [alternativesConsidered, setAlternativesConsidered] = useState('');
  const [confidenceRating, setConfidenceRating] = useState<number>(7);

  // Post-decision fields
  const [expectedOutcome, setExpectedOutcome] = useState('');
  const [actualOutcome, setActualOutcome] = useState('');
  const [whatWasAccurate, setWhatWasAccurate] = useState('');
  const [whatWasIgnored, setWhatWasIgnored] = useState('');
  const [whatWouldDoDifferently, setWhatWouldDoDifferently] = useState('');

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    if (!decisionTitle.trim()) {
      alert('Por favor, informe o título da decisão ou incidente que você está analisando.');
      return;
    }

    recordMetacognition({
      decisionTitle,
      phase: activeTab === 'post' ? 'Pós-Decisão' : 'Pre-Decisão',
      whatIKnow,
      whatIsMissing,
      hypothesis,
      evidenceUsed,
      risksConsidered,
      alternativesConsidered,
      confidenceRating,
      expectedOutcome: activeTab === 'post' ? expectedOutcome : undefined,
      actualOutcome: activeTab === 'post' ? actualOutcome : undefined,
      whatWasAccurate: activeTab === 'post' ? whatWasAccurate : undefined,
      whatWasIgnored: activeTab === 'post' ? whatWasIgnored : undefined,
      whatWouldDoDifferently: activeTab === 'post' ? whatWouldDoDifferently : undefined,
    });

    // Reset inputs
    setDecisionTitle('');
    setWhatIKnow('');
    setWhatIsMissing('');
    setHypothesis('');
    setEvidenceUsed('');
    setRisksConsidered('');
    setAlternativesConsidered('');
    setExpectedOutcome('');
    setActualOutcome('');
    setWhatWasAccurate('');
    setWhatWasIgnored('');
    setWhatWouldDoDifferently('');

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-950 border border-cyan-700/60 flex items-center justify-center text-cyan-400 shadow-inner">
              <Brain className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
                MEU RACIOCÍNIO • Sistema Metacognitivo
              </h3>
              <p className="text-xs text-slate-400">
                Avalie o próprio pensamento antes de agir e aprenda com o desfecho real.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-800 bg-slate-950/30 px-5 pt-2 gap-2">
          <button
            onClick={() => setActiveTab('pre')}
            className={`px-4 py-2 text-xs font-semibold rounded-t-lg transition-all border-b-2 ${
              activeTab === 'pre'
                ? 'border-cyan-500 text-cyan-400 bg-slate-900'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            1. Pré-Decisão (Antes de Agir)
          </button>
          <button
            onClick={() => setActiveTab('post')}
            className={`px-4 py-2 text-xs font-semibold rounded-t-lg transition-all border-b-2 ${
              activeTab === 'post'
                ? 'border-indigo-500 text-indigo-400 bg-slate-900'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            2. Pós-Decisão (Reflexão e Desfecho)
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`px-4 py-2 text-xs font-semibold rounded-t-lg transition-all border-b-2 flex items-center gap-1.5 ${
              activeTab === 'history'
                ? 'border-amber-500 text-amber-400 bg-slate-900'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <History className="w-3.5 h-3.5" />
            Histórico ({metacognitiveEntries.length})
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-slate-800">
          {activeTab === 'history' ? (
            <div className="space-y-4">
              {metacognitiveEntries.length === 0 ? (
                <div className="text-center py-12 text-slate-500 text-xs">
                  Nenhum registro metacognitivo salvo ainda. Preencha o checklist antes ou depois de tomar decisões em incidentes ou requisitos.
                </div>
              ) : (
                metacognitiveEntries.map((entry) => (
                  <div
                    key={entry.id}
                    className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2 text-xs"
                  >
                    <div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
                      <span className="font-bold text-slate-200 text-sm">{entry.decisionTitle}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-cyan-400 font-mono">
                          Confiança: {entry.confidenceRating}/10
                        </span>
                        <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-slate-400">
                          {entry.timestamp}
                        </span>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-300">
                      <div>
                        <strong className="text-slate-400 block mb-0.5">O que sabia:</strong>
                        <p className="bg-slate-900/60 p-2 rounded border border-slate-800/60">{entry.whatIKnow || '-'}</p>
                      </div>
                      <div>
                        <strong className="text-slate-400 block mb-0.5">O que faltava / Incertezas:</strong>
                        <p className="bg-slate-900/60 p-2 rounded border border-slate-800/60">{entry.whatIsMissing || '-'}</p>
                      </div>
                      <div>
                        <strong className="text-slate-400 block mb-0.5">Hipótese e Evidência:</strong>
                        <p className="bg-slate-900/60 p-2 rounded border border-slate-800/60">{entry.hypothesis} (Evidência: {entry.evidenceUsed})</p>
                      </div>
                      <div>
                        <strong className="text-slate-400 block mb-0.5">Riscos e Trade-offs:</strong>
                        <p className="bg-slate-900/60 p-2 rounded border border-slate-800/60">{entry.risksConsidered || '-'}</p>
                      </div>
                    </div>
                    {entry.phase === 'Pós-Decisão' && (
                      <div className="pt-2 border-t border-slate-800/60 grid grid-cols-1 sm:grid-cols-2 gap-2 text-indigo-300">
                        <div>
                          <strong>Desfecho Real:</strong> {entry.actualOutcome}
                        </div>
                        <div>
                          <strong>O que faria diferente:</strong> {entry.whatWouldDoDifferently}
                        </div>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          ) : (
            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Título da Decisão / Situação em Análise:
                </label>
                <input
                  type="text"
                  placeholder="Ex: Contenção de lentidão no PostgreSQL (INC-1042) ou Aprovação do REQ-002"
                  value={decisionTitle}
                  onChange={(e) => setDecisionTitle(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-cyan-500"
                  required
                />
              </div>

              {activeTab === 'pre' ? (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-300 font-medium mb-1">
                        1. O que você sabe com certeza comprovada?
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Ex: Os logs mostram erro 504 entre Nginx e backend. 100 conexões de pool tomadas."
                        value={whatIKnow}
                        onChange={(e) => setWhatIKnow(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-200 focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 font-medium mb-1">
                        2. O que você NÃO sabe? Qual informação está faltando?
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Ex: Ainda não sei qual usuário disparou a query pesada e se o comercial autorizou o relatório."
                        value={whatIsMissing}
                        onChange={(e) => setWhatIsMissing(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-200 focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-300 font-medium mb-1">
                        3. Qual é sua hipótese técnica?
                      </label>
                      <textarea
                        rows={2}
                        placeholder="Ex: Matar a query com pg_terminate_backend liberará o pool sem reiniciar o banco."
                        value={hypothesis}
                        onChange={(e) => setHypothesis(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-200 focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 font-medium mb-1">
                        4. Qual evidência sustenta essa hipótese?
                      </label>
                      <textarea
                        rows={2}
                        placeholder="Ex: O log do Postgres indica PID 48912 rodando há 248s com status 'active'."
                        value={evidenceUsed}
                        onChange={(e) => setEvidenceUsed(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-200 focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-300 font-medium mb-1">
                        5. Quais são os riscos e o que poderia dar errado?
                      </label>
                      <textarea
                        rows={2}
                        placeholder="Ex: O relatório do cliente financeiro será cancelado pela metade e precisará ser reexecutado."
                        value={risksConsidered}
                        onChange={(e) => setRisksConsidered(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-200 focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 font-medium mb-1">
                        6. Quais alternativas existem e foram descartadas?
                      </label>
                      <textarea
                        rows={2}
                        placeholder="Ex: Reiniciar o cluster Postgres inteiro (descartado por derrubar transações ativas)."
                        value={alternativesConsidered}
                        onChange={(e) => setAlternativesConsidered(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-200 focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-300 font-medium mb-1">
                        1. O que você esperava que acontecesse?
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Ex: Esperava que as conexões baixassem para zero e o sistema estabilizasse em 1 minuto."
                        value={expectedOutcome}
                        onChange={(e) => setExpectedOutcome(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-200 focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 font-medium mb-1">
                        2. O que aconteceu na realidade prática?
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Ex: A query foi encerrada, mas novos relatórios voltaram a encher o pool 10 minutos depois."
                        value={actualOutcome}
                        onChange={(e) => setActualOutcome(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-200 focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-300 font-medium mb-1">
                        3. O que estava correto na sua predição?
                      </label>
                      <textarea
                        rows={2}
                        placeholder="Ex: A contenção imediata realmente restabeleceu os clientes que estavam tentando faturar."
                        value={whatWasAccurate}
                        onChange={(e) => setWhatWasAccurate(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-200 focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 font-medium mb-1">
                        4. Qual evidência você ignorou ou subestimou?
                      </label>
                      <textarea
                        rows={2}
                        placeholder="Ex: Ignorei que o agendador de tarefas dispara 5 relatórios idênticos em sequência."
                        value={whatWasIgnored}
                        onChange={(e) => setWhatWasIgnored(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-200 focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-300 font-medium mb-1">
                      5. O que faria diferente em uma situação semelhante futura?
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Ex: Desativaria o agendador de tarefas antes de terminar a conexão individual."
                      value={whatWouldDoDifferently}
                      onChange={(e) => setWhatWouldDoDifferently(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-200 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </>
              )}

              {/* Confidence rating slider */}
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-semibold text-slate-300 flex items-center gap-1.5">
                    <Sliders className="w-3.5 h-3.5 text-cyan-400" />
                    Qual seu nível de confiança nesta análise? (1 a 10)
                  </span>
                  <span className="text-cyan-400 font-bold font-mono text-sm">
                    {confidenceRating}/10
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={confidenceRating}
                  onChange={(e) => setConfidenceRating(Number(e.target.value))}
                  className="w-full accent-cyan-500"
                />
                <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                  <span>1 - Muita incerteza</span>
                  <span>5 - Razoável com premissas</span>
                  <span>10 - Certeza absoluta com evidências</span>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-lg text-slate-400 hover:text-slate-200 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg font-bold text-white bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 shadow-md flex items-center space-x-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Salvar Registro Metacognitivo</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
