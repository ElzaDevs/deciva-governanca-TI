import React, { useState } from 'react';
import { useGovLab } from '../../context/GovLabContext';
import { Incident } from '../../types';
import {
  AlertOctagon,
  Clock,
  Terminal,
  MessageSquare,
  History,
  CheckCircle2,
  ShieldAlert,
  Send,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

export const IncidentsView: React.FC = () => {
  const { incidents, updateIncident, studentProfile } = useGovLab();
  const [selectedIncident, setSelectedIncident] = useState<Incident>(incidents[0] || null);

  const [activeTab, setActiveTab] = useState<'logs' | 'timeline' | 'warroom' | 'rca'>('logs');
  const [newChatMessage, setNewChatMessage] = useState('');

  if (!selectedIncident) return null;

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newChatMessage.trim()) return;

    const newChat = {
      sender: studentProfile.name,
      role: studentProfile.role,
      message: newChatMessage.trim(),
      timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
    };

    updateIncident(selectedIncident.id, {
      warRoomChat: [...selectedIncident.warRoomChat, newChat],
    });

    setSelectedIncident((prev) => ({
      ...prev,
      warRoomChat: [...prev.warRoomChat, newChat],
    }));

    setNewChatMessage('');
  };

  const handleMitigate = () => {
    updateIncident(selectedIncident.id, {
      status: 'Mitigado',
      timeline: [
        ...selectedIncident.timeline,
        {
          time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
          event: `Query PID 48912 encerrada pelo analista ${studentProfile.name}. Pool liberado e latência normalizada para 420ms.`,
          author: studentProfile.name,
        },
      ],
    });

    setSelectedIncident((prev) => ({
      ...prev,
      status: 'Mitigado',
      timeline: [
        ...prev.timeline,
        {
          time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
          event: `Query PID 48912 encerrada pelo analista ${studentProfile.name}. Pool liberado e latência normalizada para 420ms.`,
          author: studentProfile.name,
        },
      ],
    }));
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center space-x-2 text-rose-400 text-xs font-bold uppercase tracking-wider mb-1">
            <AlertOctagon className="w-4 h-4" />
            <span>ITSM • Gestão de Incidentes Críticos</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-100 tracking-tight">
            War Room & Central de Telemetria
          </h2>
          <p className="text-xs text-slate-400">
            Triagem rápida, contenção técnica de incidentes P1 a P4, análise de telemetria e coordenação sem culpados.
          </p>
        </div>

        {selectedIncident.status === 'Investigação' && (
          <button
            onClick={handleMitigate}
            className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-bold flex items-center space-x-2 shadow-lg shadow-rose-600/30 transition-all self-start sm:self-auto"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Executar Contenção (pg_terminate_backend)</span>
          </button>
        )}
      </div>

      {/* Main Grid: Incident Selector (Left) + War Room Workspace (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Incident List */}
        <div className="lg:col-span-4 space-y-2.5">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
            Chamados Abertos
          </span>
          {incidents.map((inc) => {
            const isSelected = selectedIncident.id === inc.id;
            return (
              <div
                key={inc.id}
                onClick={() => setSelectedIncident(inc)}
                className={`p-3.5 rounded-xl border text-xs transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-slate-900 border-rose-500 shadow-lg shadow-rose-950/40'
                    : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-mono font-bold text-rose-400">{inc.code}</span>
                  <span
                    className={`text-[9px] px-1.5 py-0.5 rounded font-bold ${
                      inc.severity.startsWith('P1')
                        ? 'bg-rose-950 text-rose-300 border border-rose-800'
                        : 'bg-amber-950 text-amber-300 border border-amber-800'
                    }`}
                  >
                    {inc.severity}
                  </span>
                </div>
                <h4 className="font-bold text-slate-200 text-xs mb-1 line-clamp-1">{inc.title}</h4>
                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span>{inc.affectedSystem}</span>
                  <span className="text-cyan-400">{inc.status}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* War Room Workspace */}
        <div className="lg:col-span-8 space-y-5">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            {/* Header info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-mono text-xs font-bold text-rose-400 bg-rose-950 px-2 py-0.5 rounded border border-rose-800">
                    {selectedIncident.code}
                  </span>
                  <span className="text-xs text-slate-300 font-semibold">{selectedIncident.severity}</span>
                  <span className="text-xs text-slate-400">• Sistema: {selectedIncident.affectedSystem}</span>
                </div>
                <h3 className="text-lg font-bold text-slate-100 mt-1">{selectedIncident.title}</h3>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-xs bg-slate-800 text-slate-300 px-3 py-1 rounded-lg font-mono">
                  Status: {selectedIncident.status}
                </span>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex border-b border-slate-800 pt-1 gap-2 text-xs">
              <button
                onClick={() => setActiveTab('logs')}
                className={`px-3 py-2 font-semibold border-b-2 flex items-center gap-1.5 transition-all ${
                  activeTab === 'logs'
                    ? 'border-rose-500 text-rose-400'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Terminal className="w-3.5 h-3.5" />
                Telemetria & Logs ({selectedIncident.telemetryLogs.length})
              </button>
              <button
                onClick={() => setActiveTab('warroom')}
                className={`px-3 py-2 font-semibold border-b-2 flex items-center gap-1.5 transition-all ${
                  activeTab === 'warroom'
                    ? 'border-indigo-500 text-indigo-400'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <MessageSquare className="w-3.5 h-3.5" />
                Chat da War Room ({selectedIncident.warRoomChat.length})
              </button>
              <button
                onClick={() => setActiveTab('timeline')}
                className={`px-3 py-2 font-semibold border-b-2 flex items-center gap-1.5 transition-all ${
                  activeTab === 'timeline'
                    ? 'border-cyan-500 text-cyan-400'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <History className="w-3.5 h-3.5" />
                Linha do Tempo
              </button>
              <button
                onClick={() => setActiveTab('rca')}
                className={`px-3 py-2 font-semibold border-b-2 flex items-center gap-1.5 transition-all ${
                  activeTab === 'rca'
                    ? 'border-emerald-500 text-emerald-400'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                Análise de Causa Raiz (RCA)
              </button>
            </div>

            {/* Tab: Logs */}
            {activeTab === 'logs' && (
              <div className="bg-black/90 p-4 rounded-xl border border-slate-800 font-mono text-[11px] space-y-2 text-slate-300 max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-800">
                {selectedIncident.telemetryLogs.map((log, idx) => (
                  <div
                    key={idx}
                    className={`leading-relaxed ${
                      log.includes('[CRITICAL]') || log.includes('[ALERT]')
                        ? 'text-rose-400 font-bold'
                        : log.includes('[ERROR]')
                        ? 'text-amber-300'
                        : log.includes('[WARN]')
                        ? 'text-yellow-200'
                        : 'text-slate-300'
                    }`}
                  >
                    {log}
                  </div>
                ))}
              </div>
            )}

            {/* Tab: War Room Chat */}
            {activeTab === 'warroom' && (
              <div className="space-y-4">
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3 max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-800 text-xs">
                  {selectedIncident.warRoomChat.map((msg, idx) => (
                    <div key={idx} className="space-y-0.5">
                      <div className="flex items-center space-x-2">
                        <strong className="text-slate-200">{msg.sender}</strong>
                        <span className="text-[10px] text-slate-500">({msg.role})</span>
                        <span className="text-[10px] text-slate-600 font-mono">{msg.timestamp}</span>
                      </div>
                      <p className="text-slate-300 bg-slate-900/60 p-2 rounded border border-slate-800/60">
                        {msg.message}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Send chat */}
                <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
                  <input
                    type="text"
                    placeholder="Enviar instrução técnica ou atualização na War Room..."
                    value={newChatMessage}
                    onChange={(e) => setNewChatMessage(e.target.value)}
                    className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                  />
                  <button
                    type="submit"
                    className="p-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            )}

            {/* Tab: Timeline */}
            {activeTab === 'timeline' && (
              <div className="space-y-3 text-xs">
                {selectedIncident.timeline.map((evt, idx) => (
                  <div key={idx} className="flex items-start space-x-3 bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <span className="font-mono text-cyan-400 font-bold text-[11px] shrink-0">
                      {evt.time}
                    </span>
                    <div className="flex-1">
                      <p className="text-slate-200">{evt.event}</p>
                      <span className="text-[10px] text-slate-500">Registrado por: {evt.author}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Tab: RCA */}
            {activeTab === 'rca' && (
              <div className="space-y-3 text-xs bg-slate-950 p-4 rounded-xl border border-slate-800">
                {selectedIncident.rootCauseAnalysis ? (
                  <>
                    <div>
                      <strong className="text-slate-300 block mb-1">Causa Raiz Identificada:</strong>
                      <p className="text-slate-200 bg-slate-900 p-2.5 rounded border border-slate-800">
                        {selectedIncident.rootCauseAnalysis.identifiedRootCause}
                      </p>
                    </div>

                    <div>
                      <strong className="text-slate-300 block mb-1">Fatores Contribuintes:</strong>
                      <ul className="space-y-1 text-slate-400">
                        {selectedIncident.rootCauseAnalysis.contributingFactors.map((f, i) => (
                          <li key={i} className="flex items-center gap-1.5">
                            <span className="text-amber-400">•</span> {f}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <strong className="text-slate-300 block mb-1">Ações Preventivas (Problem Record):</strong>
                      <ul className="space-y-1 text-emerald-300">
                        {selectedIncident.rootCauseAnalysis.preventiveActions.map((a, i) => (
                          <li key={i} className="flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> {a}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                ) : (
                  <div className="text-slate-500 text-center py-4">
                    Análise pós-morte ainda não formalizada para este incidente.
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
