import React from 'react';
import { useGovLab } from '../../context/GovLabContext';
import { Brain, Sparkles, CheckCircle2, History, AlertTriangle, ArrowUpRight, Plus } from 'lucide-react';

interface MyReasoningViewProps {
  onOpenModal: () => void;
}

export const MyReasoningView: React.FC<MyReasoningViewProps> = ({ onOpenModal }) => {
  const { metacognitiveEntries, studentProfile } = useGovLab();

  // Calibration metric: Confidence vs Competence
  const avgConfidence =
    metacognitiveEntries.length > 0
      ? Math.round(
          (metacognitiveEntries.reduce((sum, e) => sum + e.confidenceRating, 0) /
            metacognitiveEntries.length) *
            10
        )
      : 65;

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center space-x-2 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Brain className="w-4 h-4" />
            <span>Metacognição & Aprendizagem Reflexiva</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-100 tracking-tight">
            Meu Raciocínio (Metacognitive Dashboard)
          </h2>
          <p className="text-xs text-slate-400">
            Avalie o que você sabe, o que falta, suas hipóteses, evidências, riscos e aprenda com os desfechos reais.
          </p>
        </div>

        <button
          onClick={onOpenModal}
          className="px-4 py-2 bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white rounded-xl text-xs font-bold flex items-center space-x-2 shadow-lg shadow-cyan-600/30 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Nova Reflexão Metacognitiva</span>
        </button>
      </div>

      {/* Metrics of Self-Calibration */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Maturidade Metacognitiva</span>
            <Brain className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-black text-slate-100 font-mono">
            {studentProfile.metacognitiveScore}%
          </div>
          <p className="text-[11px] text-slate-500">
            Habilidade de identificar lacunas de informação antes de decidir
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Calibração: Confiança Média</span>
            <Sparkles className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-2xl font-black text-slate-100 font-mono">
            {avgConfidence}%
          </div>
          <p className="text-[11px] text-slate-500">
            Competência real medida: <strong className="text-cyan-400">{studentProfile.competenceScore}%</strong>
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Reflexões Registradas</span>
            <History className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-slate-100 font-mono">
            {metacognitiveEntries.length}
          </div>
          <p className="text-[11px] text-slate-500">
            Registros salvos no diário de bordo do profissional
          </p>
        </div>
      </div>

      {/* Reflective Journal Entries List */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
            <History className="w-4 h-4 text-cyan-400" />
            Diário de Decisões e Aprendizagem
          </h3>
          <span className="text-xs text-slate-500">
            {metacognitiveEntries.length} registros contemporâneos
          </span>
        </div>

        {metacognitiveEntries.length === 0 ? (
          <div className="text-center py-12 space-y-3">
            <div className="w-12 h-12 rounded-full bg-slate-950 border border-slate-800 flex items-center justify-center text-cyan-400 mx-auto">
              <Brain className="w-6 h-6" />
            </div>
            <h4 className="text-sm font-bold text-slate-300">Nenhuma reflexão metacognitiva registrada ainda</h4>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Antes de tomar decisões importantes na War Room ou aprovar requisitos, abra o checklist "Meu Raciocínio" para explicitar hipóteses e incertezas.
            </p>
            <button
              onClick={onOpenModal}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg transition-colors inline-flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4 text-cyan-400" />
              <span>Registrar Primeira Reflexão</span>
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {metacognitiveEntries.map((entry) => (
              <div
                key={entry.id}
                className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3 text-xs"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-800/80">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-slate-100 text-sm">{entry.decisionTitle}</span>
                    <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-mono">
                      {entry.phase}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3 text-[11px]">
                    <span className="text-cyan-400 font-semibold font-mono">
                      Confiança: {entry.confidenceRating}/10
                    </span>
                    <span className="text-slate-500">{entry.timestamp}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-slate-300">
                  <div className="space-y-1">
                    <strong className="text-slate-500 text-[10px] uppercase block">O que sabia com evidência:</strong>
                    <p className="bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/60 leading-relaxed">
                      {entry.whatIKnow || '-'}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <strong className="text-slate-500 text-[10px] uppercase block">O que faltava / Incertezas:</strong>
                    <p className="bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/60 leading-relaxed text-amber-200">
                      {entry.whatIsMissing || '-'}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <strong className="text-slate-500 text-[10px] uppercase block">Hipótese e Evidência:</strong>
                    <p className="bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/60 leading-relaxed">
                      {entry.hypothesis} (Evidência: {entry.evidenceUsed})
                    </p>
                  </div>
                  <div className="space-y-1">
                    <strong className="text-slate-500 text-[10px] uppercase block">Riscos de Efeito Colateral:</strong>
                    <p className="bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/60 leading-relaxed text-rose-300">
                      {entry.risksConsidered || '-'}
                    </p>
                  </div>
                </div>

                {entry.actualOutcome && (
                  <div className="p-3 bg-indigo-950/30 border border-indigo-800/40 rounded-xl space-y-1 text-indigo-200">
                    <div className="font-bold text-[11px] text-indigo-300">Desfecho e Reflexão Posterior:</div>
                    <p><strong>O que aconteceu:</strong> {entry.actualOutcome}</p>
                    {entry.whatWouldDoDifferently && (
                      <p><strong>O que faria diferente:</strong> {entry.whatWouldDoDifferently}</p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
