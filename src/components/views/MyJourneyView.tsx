import React, { useState } from 'react';
import { useGovLab } from '../../context/GovLabContext';
import {
  Compass,
  CheckCircle2,
  Lock,
  Play,
  Calendar,
  AlertOctagon,
  Sparkles,
  ArrowRight,
  HelpCircle,
  Brain,
} from 'lucide-react';

interface MyJourneyViewProps {
  onOpenMetacognition: () => void;
}

export const MyJourneyView: React.FC<MyJourneyViewProps> = ({ onOpenMetacognition }) => {
  const { missions, activeMissionId, selectActiveMission, completeMissionStep, realWorldMode } = useGovLab();

  const selectedMission = missions.find((m) => m.id === activeMissionId) || missions[0];
  const [selectedOptionForStep, setSelectedOptionForStep] = useState<Record<string, string>>({});
  const [showHintForStep, setShowHintForStep] = useState<Record<string, boolean>>({});

  const handleSelectOption = (stepId: string, optId: string) => {
    setSelectedOptionForStep((prev) => ({ ...prev, [stepId]: optId }));
  };

  const handleExecuteDecision = (stepId: string) => {
    const optId = selectedOptionForStep[stepId];
    if (!optId) {
      alert('Por favor, selecione uma opção de ação antes de executar.');
      return;
    }
    completeMissionStep(selectedMission.id, stepId, optId);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center space-x-2 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Compass className="w-4 h-4" />
            <span>Campanha Profissional de 12 Meses Simulados</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-100 tracking-tight">
            Minha Jornada na Nexora Digital
          </h2>
          <p className="text-xs text-slate-400">
            Evolução de Zero Experiência Prática até Capacidade de Atuação Profissional em Engenharia e Governança de TI.
          </p>
        </div>

        <button
          onClick={onOpenMetacognition}
          className="px-4 py-2 bg-cyan-950 border border-cyan-700/60 hover:bg-cyan-900/60 text-cyan-300 rounded-xl text-xs font-semibold flex items-center space-x-2 self-start sm:self-auto shadow-sm"
        >
          <Brain className="w-4 h-4 text-cyan-400" />
          <span>Registrar Raciocínio (Metacognição)</span>
        </button>
      </div>

      {/* Main Grid: Mission Selector (Left) + Mission Workspace (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Mission Timeline Navigation (4 cols) */}
        <div className="lg:col-span-4 space-y-3">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
            Cronograma da Campanha
          </span>

          <div className="space-y-2 max-h-[75vh] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-800">
            {missions.map((mission) => {
              const isActive = mission.id === selectedMission.id;
              const isLocked = mission.status === 'bloqueada';
              const isCompleted = mission.status === 'concluida';

              return (
                <div
                  key={mission.id}
                  onClick={() => !isLocked && selectActiveMission(mission.id)}
                  className={`p-3.5 rounded-xl border text-xs transition-all cursor-pointer ${
                    isActive
                      ? 'bg-slate-900 border-indigo-500 shadow-lg shadow-indigo-950/40'
                      : isLocked
                      ? 'bg-slate-950/40 border-slate-800/60 opacity-60 cursor-not-allowed'
                      : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-mono text-[10px] font-bold text-slate-400 flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-indigo-400" />
                      Mês {mission.monthScheduled}
                    </span>
                    {isCompleted ? (
                      <span className="text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-800 px-2 py-0.5 rounded font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        Concluída ({mission.score}%)
                      </span>
                    ) : isLocked ? (
                      <span className="text-[10px] text-slate-500 flex items-center gap-1">
                        <Lock className="w-3 h-3" /> Bloqueada
                      </span>
                    ) : (
                      <span className="text-[10px] bg-indigo-950 text-indigo-300 border border-indigo-800 px-2 py-0.5 rounded font-bold">
                        Em Andamento
                      </span>
                    )}
                  </div>

                  <h4 className="font-bold text-slate-200 text-xs line-clamp-1 mb-1">
                    #{mission.number}: {mission.title}
                  </h4>
                  <div className="text-[11px] text-slate-400 truncate">
                    {mission.subtitle}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mission Workspace & Interactive Steps (8 cols) */}
        <div className="lg:col-span-8 space-y-5">
          {/* Mission Details Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-800">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 bg-indigo-950/60 border border-indigo-800/80 px-2 py-0.5 rounded">
                    Missão #{selectedMission.number} • Mês {selectedMission.monthScheduled}
                  </span>
                  <span className="text-xs text-slate-400">• {selectedMission.track}</span>
                </div>
                <h3 className="text-lg sm:text-xl font-black text-slate-100">
                  {selectedMission.title}
                </h3>
              </div>
              <div className="text-[11px] bg-slate-800 text-slate-300 px-2.5 py-1 rounded-lg font-mono">
                Dificuldade: {selectedMission.difficulty}
              </div>
            </div>

            {/* Narrative Context */}
            <div className="space-y-2 text-xs leading-relaxed text-slate-300">
              <p className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/80 whitespace-pre-line">
                {selectedMission.contextNarrative}
              </p>
            </div>

            {/* Stakeholder Dialogue Intro */}
            {selectedMission.initialDialogue && (
              <div className="bg-slate-950 p-4 rounded-xl border-l-4 border-indigo-500 flex items-start space-x-3.5">
                <div className="w-10 h-10 rounded-xl bg-indigo-900/40 border border-indigo-700/60 flex items-center justify-center text-lg shrink-0">
                  👔
                </div>
                <div className="space-y-1 flex-1">
                  <div className="text-xs font-bold text-slate-200">
                    {selectedMission.initialDialogue.speaker}{' '}
                    <span className="text-[10px] text-slate-400 font-normal">
                      ({selectedMission.initialDialogue.speakerRole})
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 italic">
                    "{selectedMission.initialDialogue.message}"
                  </p>
                </div>
              </div>
            )}

            {/* Competencies Evaluated Pill */}
            <div className="pt-2 flex flex-wrap items-center gap-1.5 text-[11px]">
              <span className="text-slate-500 font-semibold">Competências Avaliadas:</span>
              {selectedMission.competenciesEvaluated.map((comp, idx) => (
                <span
                  key={idx}
                  className="bg-slate-800/80 border border-slate-700 text-slate-300 px-2 py-0.5 rounded text-[10px]"
                >
                  {comp}
                </span>
              ))}
            </div>
          </div>

          {/* Mission Steps Interactive Sequence */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              Etapas de Ação e Tomada de Decisão:
            </h4>

            {selectedMission.steps.length === 0 ? (
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 text-center text-xs text-slate-400">
                Esta missão está agendada para o Mês {selectedMission.monthScheduled}. Avance a linha do tempo para liberar as etapas de ação!
              </div>
            ) : (
              selectedMission.steps.map((step) => {
                const isStepFinished = step.isCompleted;
                const chosenOptId = selectedOptionForStep[step.id] || step.selectedOptionId;
                const chosenOption = step.options?.find((o) => o.id === chosenOptId);

                return (
                  <div
                    key={step.id}
                    className={`bg-slate-900 border rounded-2xl p-5 space-y-4 transition-all ${
                      isStepFinished
                        ? 'border-emerald-800/60 bg-slate-900/90'
                        : 'border-slate-800'
                    }`}
                  >
                    <div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
                      <div className="flex items-center space-x-2">
                        <span className="w-6 h-6 rounded-full bg-indigo-950 border border-indigo-700 text-indigo-400 font-mono font-bold text-xs flex items-center justify-center">
                          {step.order}
                        </span>
                        <h5 className="font-bold text-slate-200 text-sm">{step.title}</h5>
                      </div>
                      {isStepFinished && (
                        <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                          <CheckCircle2 className="w-4 h-4" /> Decisão Executada
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed">
                      {step.instructions}
                    </p>

                    {/* Hints (Hidden in Real World Mode) */}
                    {!realWorldMode && step.hints.length > 0 && (
                      <div>
                        <button
                          type="button"
                          onClick={() =>
                            setShowHintForStep((prev) => ({ ...prev, [step.id]: !prev[step.id] }))
                          }
                          className="text-[11px] text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1"
                        >
                          <HelpCircle className="w-3.5 h-3.5" />
                          <span>{showHintForStep[step.id] ? 'Ocultar Dica Técnica' : 'Ver Dica Técnica'}</span>
                        </button>
                        {showHintForStep[step.id] && (
                          <div className="bg-amber-950/30 border border-amber-800/50 p-3 rounded-lg text-[11px] text-amber-200 mt-2 space-y-1">
                            {step.hints.map((h, i) => (
                              <p key={i}>• {h}</p>
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Decision Options */}
                    {step.options && step.options.length > 0 && (
                      <div className="space-y-2.5 pt-2">
                        <span className="text-[10px] uppercase font-bold text-slate-500 block">
                          Alternativas Técnicas de Ação:
                        </span>
                        {step.options.map((opt) => {
                          const isSelected = chosenOptId === opt.id;
                          return (
                            <div
                              key={opt.id}
                              onClick={() => !isStepFinished && handleSelectOption(step.id, opt.id)}
                              className={`p-3.5 rounded-xl border text-xs transition-all cursor-pointer ${
                                isSelected
                                  ? 'bg-indigo-950/40 border-indigo-500 text-slate-100 shadow-md'
                                  : 'bg-slate-950/60 border-slate-800/80 text-slate-300 hover:border-slate-700'
                              } ${isStepFinished ? 'cursor-default' : ''}`}
                            >
                              <div className="flex items-start space-x-3">
                                <input
                                  type="radio"
                                  name={`step-${step.id}`}
                                  checked={isSelected}
                                  onChange={() => !isStepFinished && handleSelectOption(step.id, opt.id)}
                                  disabled={isStepFinished}
                                  className="mt-0.5 accent-indigo-500"
                                />
                                <div className="space-y-1 flex-1">
                                  <div className="font-semibold">{opt.text}</div>
                                  {isStepFinished && isSelected && (
                                    <div className="pt-2 border-t border-slate-800 space-y-1.5">
                                      <p className="text-[11px] text-slate-400">
                                        <strong>Fundamentação Técnica:</strong> {opt.rationale}
                                      </p>
                                      <div
                                        className={`p-2.5 rounded-lg text-[11px] font-medium flex items-center justify-between ${
                                          opt.quality === 'excelente'
                                            ? 'bg-emerald-950/50 text-emerald-300 border border-emerald-800'
                                            : opt.quality === 'danosa'
                                            ? 'bg-rose-950/50 text-rose-300 border border-rose-800'
                                            : 'bg-amber-950/50 text-amber-300 border border-amber-800'
                                        }`}
                                      >
                                        <span>{opt.consequenceExplanation}</span>
                                        <span className="font-bold uppercase text-[9px] px-2 py-0.5 rounded bg-black/40">
                                          {opt.quality}
                                        </span>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {/* Step Action Button */}
                    {!isStepFinished && (
                      <div className="pt-2 flex justify-end">
                        <button
                          onClick={() => handleExecuteDecision(step.id)}
                          className="px-5 py-2.5 rounded-xl font-bold text-xs text-white bg-indigo-600 hover:bg-indigo-500 shadow-md flex items-center space-x-2 transition-all"
                        >
                          <span>Executar e Concluir Etapa</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
