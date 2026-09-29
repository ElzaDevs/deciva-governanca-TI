import React, { useState } from 'react';
import { Stakeholder } from '../../types';
import { Users2, MessageSquare, Key, Sparkles, X, ChevronRight, AlertCircle } from 'lucide-react';

interface StakeholderDialogueModalProps {
  isOpen: boolean;
  onClose: () => void;
  stakeholder: Stakeholder | null;
}

export const StakeholderDialogueModal: React.FC<StakeholderDialogueModalProps> = ({
  isOpen,
  onClose,
  stakeholder,
}) => {
  const [unlockedClues, setUnlockedClues] = useState<string[]>([]);
  const [activeDialogueId, setActiveDialogueId] = useState<string | null>(null);

  if (!isOpen || !stakeholder) return null;

  const handleAsk = (dialogue: (typeof stakeholder.dialogueTree)[0]) => {
    setActiveDialogueId(dialogue.id);
    if (dialogue.revealedClue && !unlockedClues.includes(dialogue.revealedClue)) {
      setUnlockedClues((prev) => [...prev, dialogue.revealedClue!]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950">
          <div className="flex items-center space-x-3.5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-cyan-600 flex items-center justify-center text-2xl shadow-md shrink-0">
              {stakeholder.avatar}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-slate-100">{stakeholder.name}</h3>
                <span className="text-[10px] bg-indigo-950 text-indigo-300 border border-indigo-700/60 px-2 py-0.5 rounded font-medium">
                  {stakeholder.department}
                </span>
              </div>
              <p className="text-xs text-slate-400">{stakeholder.role}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-xs scrollbar-thin scrollbar-thumb-slate-800">
          {/* Stakeholder DNA Card */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-slate-950 p-4 rounded-xl border border-slate-800">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-500 block mb-0.5">Perfil & Postura:</span>
              <p className="text-slate-300">{stakeholder.personality}</p>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-500 block mb-0.5">Influência & Interesse:</span>
              <p className="text-slate-300">
                Influência: <strong className="text-cyan-400">{stakeholder.influenceLevel}</strong> | Interesse:{' '}
                <strong className="text-indigo-400">{stakeholder.interestLevel}</strong>
              </p>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-500 block mb-0.5">Objetivo Principal:</span>
              <p className="text-slate-300">{stakeholder.mainGoals[0] || '-'}</p>
            </div>
          </div>

          {/* Initial Statement */}
          <div className="bg-slate-950/60 border-l-4 border-indigo-500 p-4 rounded-r-xl">
            <span className="text-[10px] uppercase font-bold text-indigo-400 block mb-1">
              Declaração Inicial do Stakeholder:
            </span>
            <p className="text-slate-200 italic leading-relaxed text-sm">
              "{stakeholder.initialStatement}"
            </p>
          </div>

          {/* Interactive Dialogue Questions */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <MessageSquare className="w-4 h-4 text-cyan-400" />
                Perguntas de Elicitação / Investigação:
              </span>
              <span className="text-[10px] text-slate-500">Escolha uma pergunta profissional</span>
            </div>

            <div className="space-y-2">
              {stakeholder.dialogueTree.map((item) => {
                const isSelected = activeDialogueId === item.id;
                return (
                  <div
                    key={item.id}
                    className={`rounded-xl border transition-all overflow-hidden ${
                      isSelected
                        ? 'border-indigo-600 bg-indigo-950/20'
                        : 'border-slate-800 bg-slate-950/40 hover:border-slate-700'
                    }`}
                  >
                    <button
                      onClick={() => handleAsk(item)}
                      className="w-full text-left p-3.5 flex items-center justify-between text-slate-200 hover:text-white"
                    >
                      <span className="font-semibold text-xs flex items-center gap-2">
                        <ChevronRight className={`w-3.5 h-3.5 text-indigo-400 transition-transform ${isSelected ? 'rotate-90' : ''}`} />
                        "{item.question}"
                      </span>
                      <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-slate-400 shrink-0">
                        {isSelected ? 'Aberta' : 'Perguntar'}
                      </span>
                    </button>

                    {isSelected && (
                      <div className="p-4 pt-2 border-t border-indigo-900/40 space-y-3 bg-slate-950/80">
                        <p className="text-slate-300 leading-relaxed italic">
                          "{item.response}"
                        </p>

                        {item.revealedClue && (
                          <div className="bg-amber-950/40 border border-amber-800/60 p-3 rounded-lg flex items-start space-x-2 text-amber-200">
                            <Key className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                            <div>
                              <strong className="block text-[11px] text-amber-300 font-bold">
                                Evidência / Fator Oculto Revelado:
                              </strong>
                              <span className="text-[11px]">{item.revealedClue}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Unlocked Clues Notebook */}
          {unlockedClues.length > 0 && (
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-xs font-bold text-slate-300 mb-2 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Caderno de Evidências Coletadas com Este Stakeholder:
              </span>
              <ul className="space-y-1.5 text-slate-300 mt-2">
                {unlockedClues.map((clue, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <span className="text-amber-400 font-bold">✓</span>
                    <span>{clue}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
