import React, { useState } from 'react';
import { useGovLab } from '../../context/GovLabContext';
import { ArchitectureADR } from '../../types';
import { Layers, Plus, Search, CheckCircle2, AlertTriangle, ArrowRight, ShieldCheck } from 'lucide-react';

export const ArchitectureView: React.FC = () => {
  const { architectureADRs, createArchitectureADR } = useGovLab();
  const [selectedADR, setSelectedADR] = useState<ArchitectureADR>(architectureADRs[0] || null);

  const [isCreating, setIsCreating] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContext, setNewContext] = useState('');
  const [newDecision, setNewDecision] = useState('');
  const [newQualityAttributes, setNewQualityAttributes] = useState('Resiliência, Escalabilidade');
  const [newTradeOffs, setNewTradeOffs] = useState('Aumento de complexidade de mensageria');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newDecision.trim()) return;

    createArchitectureADR({
      title: newTitle.trim(),
      context: newContext.trim(),
      decision: newDecision.trim(),
      qualityAttributes: newQualityAttributes.split(',').map((s) => s.trim()),
      tradeOffs: newTradeOffs.split(',').map((s) => s.trim()),
      consequencesPositive: ['Redução de incidentes em pico transacional'],
      consequencesNegative: ['Exige monitoramento de filas em tempo real'],
      status: 'Proposta',
    });

    setIsCreating(false);
    setNewTitle('');
    setNewContext('');
    setNewDecision('');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center space-x-2 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Layers className="w-4 h-4" />
            <span>Engenharia de Software • Decisões Arquiteturais Formais</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-100 tracking-tight">
            Architecture Decision Records (ADR Studio)
          </h2>
          <p className="text-xs text-slate-400">
            Documentação técnica de trade-offs, atributos de qualidade (desempenho vs manutenibilidade vs custo) e consequências sistêmicas.
          </p>
        </div>

        <button
          onClick={() => setIsCreating(!isCreating)}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-all shadow-md shadow-indigo-600/30 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Nova Decisão (ADR)</span>
        </button>
      </div>

      {/* Create Form Modal or In-line */}
      {isCreating && (
        <form onSubmit={handleCreate} className="bg-slate-900 border border-indigo-700/60 rounded-2xl p-6 space-y-4 text-xs shadow-xl">
          <h3 className="text-sm font-bold text-slate-100">Redigir Nova Architecture Decision Record</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Título da Decisão:</label>
              <input
                type="text"
                placeholder="Ex: Adoção do Strangler Fig Pattern para migração gradual do monólito"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-200"
                required
              />
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Atributos de Qualidade (separados por vírgula):</label>
              <input
                type="text"
                value={newQualityAttributes}
                onChange={(e) => setNewQualityAttributes(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-200"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Contexto e Forças do Problema:</label>
            <textarea
              rows={3}
              placeholder="Descreva o problema de negócio e técnico, como lentidão, acoplamento ou gargalo de escalabilidade."
              value={newContext}
              onChange={(e) => setNewContext(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-200"
              required
            />
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Decisão Técnica:</label>
            <textarea
              rows={3}
              placeholder="Descreva a escolha arquitetural selecionada."
              value={newDecision}
              onChange={(e) => setNewDecision(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-slate-200"
              required
            />
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
              Publicar ADR
            </button>
          </div>
        </form>
      )}

      {/* ADR Grid List */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-4 space-y-2.5">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
            Catálogo de Decisões
          </span>
          {architectureADRs.map((adr) => {
            const isSelected = selectedADR?.id === adr.id;
            return (
              <div
                key={adr.id}
                onClick={() => setSelectedADR(adr)}
                className={`p-4 rounded-xl border text-xs transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-slate-900 border-indigo-500 shadow-md'
                    : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-mono font-bold text-indigo-400">{adr.code}</span>
                  <span className="text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-800 px-2 py-0.5 rounded font-bold">
                    {adr.status}
                  </span>
                </div>
                <h4 className="font-bold text-slate-200 text-xs mb-1 line-clamp-1">{adr.title}</h4>
                <div className="text-[10px] text-slate-500">Autor: {adr.author} • {adr.date}</div>
              </div>
            );
          })}
        </div>

        <div className="lg:col-span-8">
          {selectedADR ? (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5 text-xs">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-xs font-bold text-indigo-400 bg-indigo-950 px-2 py-0.5 rounded border border-indigo-800">
                      {selectedADR.code}
                    </span>
                    <span className="text-xs text-slate-400">{selectedADR.date}</span>
                    <span className="text-xs text-emerald-400 font-semibold">{selectedADR.status}</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-100">{selectedADR.title}</h3>
                </div>
              </div>

              <div className="space-y-1.5">
                <span className="font-bold text-slate-400 uppercase text-[10px] tracking-wider block">Contexto:</span>
                <p className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-slate-200 leading-relaxed">
                  {selectedADR.context}
                </p>
              </div>

              <div className="space-y-1.5">
                <span className="font-bold text-slate-400 uppercase text-[10px] tracking-wider block">Decisão Adotada:</span>
                <p className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-indigo-300 leading-relaxed font-semibold">
                  {selectedADR.decision}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5 bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <span className="font-bold text-slate-400 uppercase text-[10px] tracking-wider block">Atributos de Qualidade:</span>
                  <ul className="space-y-1 text-slate-300">
                    {selectedADR.qualityAttributes.map((q, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" /> {q}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-1.5 bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <span className="font-bold text-slate-400 uppercase text-[10px] tracking-wider block">Trade-Offs e Custos Aceitos:</span>
                  <ul className="space-y-1 text-amber-300">
                    {selectedADR.tradeOffs.map((t, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-400" /> {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center text-slate-500 text-xs">
              Selecione uma ADR para inspecionar os trade-offs arquiteturais.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
