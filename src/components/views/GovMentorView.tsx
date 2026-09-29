import React, { useState } from 'react';
import { useGovLab } from '../../context/GovLabContext';
import { askGovMentor, GovMentorMode } from '../../services/geminiService';
import {
  Bot,
  Sparkles,
  Send,
  HelpCircle,
  Brain,
  ShieldAlert,
  Flame,
  UserCheck,
  RotateCcw,
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'mentor';
  text: string;
  mode?: GovMentorMode;
  timestamp: string;
}

export const GovMentorView: React.FC = () => {
  const { studentProfile, companyState, incidents, missions, activeMissionId } = useGovLab();

  const [mode, setMode] = useState<GovMentorMode>('socratic');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'M-01',
      sender: 'mentor',
      text: `Olá, ${studentProfile.name}! Sou o GOV-MENTOR na Nexora Digital. Estou configurado no modo SOCRÁTICO para ajudá-lo a pensar por si mesmo, formular hipóteses com evidências e antecipar riscos de engenharia e governança. O que você gostaria de analisar agora?`,
      mode: 'socratic',
      timestamp: 'Hoje',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const activeMission = missions.find((m) => m.id === activeMissionId);

  const handleSend = async (e?: React.FormEvent, customText?: string) => {
    if (e) e.preventDefault();
    const textToSend = customText || input;
    if (!textToSend.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `U-${Date.now()}`,
      sender: 'user',
      text: textToSend.trim(),
      timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await askGovMentor({
        mode,
        userMessage: textToSend,
        context: {
          currentMissionTitle: activeMission?.title,
          studentRole: studentProfile.role,
          companyHealth: companyState.companyHealthScore,
          activeIncidentCode: incidents[0]?.code,
        },
      });

      const mentorMsg: ChatMessage = {
        id: `M-${Date.now()}`,
        sender: 'mentor',
        text: response,
        mode,
        timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, mentorMsg]);
    } catch {
      // Fallback
    } finally {
      setIsLoading(false);
    }
  };

  const modesConfig = [
    { id: 'socratic' as GovMentorMode, label: 'Socrático', desc: 'Faz perguntas e estimula raciocínio', icon: Brain, color: 'text-cyan-400' },
    { id: 'hint' as GovMentorMode, label: 'Pista Gradual', desc: 'Dicas sem entregar a resposta', icon: HelpCircle, color: 'text-amber-400' },
    { id: 'explain' as GovMentorMode, label: 'Explicar Conceito', desc: 'Definição, exemplo e anti-exemplo', icon: Sparkles, color: 'text-indigo-400' },
    { id: 'review' as GovMentorMode, label: 'Revisar Decisão', desc: 'Feedback e pontuação crítica', icon: ShieldAlert, color: 'text-emerald-400' },
    { id: 'challenge' as GovMentorMode, label: 'Desafio (Hard)', desc: 'Adiciona restrições e casos de borda', icon: Flame, color: 'text-rose-400' },
    { id: 'interview' as GovMentorMode, label: 'Entrevista', desc: 'Simula arguição técnica profissional', icon: UserCheck, color: 'text-purple-400' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center space-x-2 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Bot className="w-4 h-4" />
            <span>Inteligência Artificial Pedagógica • Mentor Corporativo</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-100 tracking-tight">
            GOV-MENTOR
          </h2>
          <p className="text-xs text-slate-400">
            Orientação socrática contextualizada à empresa Nexora Digital. Não entrega respostas prontas em avaliações.
          </p>
        </div>

        <button
          onClick={() => {
            setMessages([
              {
                id: `M-${Date.now()}`,
                sender: 'mentor',
                text: 'Conversa reiniciada. Selecione o modo desejado acima e me diga sua dúvida técnica ou raciocínio em andamento.',
                mode,
                timestamp: 'Agora',
              },
            ]);
          }}
          className="p-2 text-slate-400 hover:text-slate-200 rounded-lg hover:bg-slate-800 self-start sm:self-auto"
          title="Limpar conversa"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Mode Selector Chips */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
        {modesConfig.map((m) => {
          const Icon = m.icon;
          const isSelected = mode === m.id;
          return (
            <button
              key={m.id}
              onClick={() => setMode(m.id)}
              className={`p-3 rounded-xl border text-left transition-all ${
                isSelected
                  ? 'bg-slate-900 border-cyan-500 shadow-md ring-1 ring-cyan-500'
                  : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <Icon className={`w-4 h-4 mb-1.5 ${m.color}`} />
              <div className="font-bold text-xs text-slate-200">{m.label}</div>
              <div className="text-[10px] text-slate-500 line-clamp-1">{m.desc}</div>
            </button>
          );
        })}
      </div>

      {/* Chat Area */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl flex flex-col h-[520px] shadow-xl overflow-hidden">
        {/* Messages list */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 text-xs scrollbar-thin scrollbar-thumb-slate-800">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start space-x-3 ${msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}
            >
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-xs font-bold ${
                  msg.sender === 'mentor'
                    ? 'bg-gradient-to-tr from-cyan-600 to-indigo-600 text-white shadow-md'
                    : 'bg-slate-800 text-slate-300'
                }`}
              >
                {msg.sender === 'mentor' ? 'GM' : 'EU'}
              </div>
              <div
                className={`max-w-xl p-4 rounded-2xl leading-relaxed whitespace-pre-line ${
                  msg.sender === 'mentor'
                    ? 'bg-slate-950 border border-slate-800 text-slate-200 shadow-sm'
                    : 'bg-indigo-600 text-white shadow-sm'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] opacity-60 mb-1">
                  <span>{msg.sender === 'mentor' ? `GOV-MENTOR • Modo ${msg.mode?.toUpperCase()}` : studentProfile.name}</span>
                  <span>{msg.timestamp}</span>
                </div>
                <div>{msg.text}</div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center space-x-2 text-xs text-slate-400 italic">
              <Sparkles className="w-4 h-4 animate-spin text-cyan-400" />
              <span>GOV-MENTOR analisando contexto e evidências da Nexora...</span>
            </div>
          )}
        </div>

        {/* Quick Suggestion Chips */}
        <div className="p-2.5 bg-slate-950/80 border-t border-slate-800/80 flex items-center gap-2 overflow-x-auto text-[11px]">
          <span className="text-slate-500 font-semibold shrink-0">Sugestões rápidas:</span>
          {[
            'Como investigar a query do INC-1042?',
            'Por que "o sistema deve ser rápido" é um requisito falho?',
            'Como diferenciar causa raiz de sintoma nos 5 Porquês?',
            'Qual o risco de aprovar um hotfix sem homologação?',
          ].map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(undefined, prompt)}
              className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 rounded-lg whitespace-nowrap transition-colors"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input box */}
        <form onSubmit={(e) => handleSend(e)} className="p-4 bg-slate-950 border-t border-slate-800 flex items-center space-x-3">
          <input
            type="text"
            placeholder={`Escreva sua pergunta ou raciocínio para o GOV-MENTOR (Modo ${mode.toUpperCase()})...`}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
            className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="px-4 py-2.5 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-all shadow-md shadow-cyan-600/30"
          >
            <Send className="w-4 h-4" />
            <span className="hidden sm:inline">Enviar</span>
          </button>
        </form>
      </div>
    </div>
  );
};
