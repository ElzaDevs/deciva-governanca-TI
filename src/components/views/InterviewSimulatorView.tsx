import React, { useState } from 'react';
import { useGovLab } from '../../context/GovLabContext';
import { MessagesSquare, Sparkles, Send, Award, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';

interface InterviewQuestion {
  id: string;
  roleTrack: string;
  question: string;
  interviewerRole: string;
  keyAspectsLookedFor: string[];
}

export const InterviewSimulatorView: React.FC = () => {
  const { studentProfile } = useGovLab();

  const questions: InterviewQuestion[] = [
    {
      id: 'Q-01',
      roleTrack: 'Engenharia de Requisitos',
      interviewerRole: 'Head de Engenharia de Software',
      question: 'Um cliente corporativo pede uma funcionalidade dizendo apenas: "preciso de um relatório muito rápido e intuitivo até sexta-feira". Como você conduziria a elicitação e trataria a ambiguidade desse pedido?',
      keyAspectsLookedFor: [
        'Desconstruir adjetivos vagos em atributos de qualidade mensuráveis (latência p95, carga)',
        'Mapear stakeholders reais e regras de negócio fiscais',
        'Negociação de prazo baseada em capacidade e priorização MoSCoW',
      ],
    },
    {
      id: 'Q-02',
      roleTrack: 'Gestão de Incidentes (ITSM)',
      interviewerRole: 'Gerente de Operações e SRE',
      question: 'Em uma segunda-feira de manhã, o sistema principal de faturamento para e a infraestrutura diz que a culpa é do código, enquanto o desenvolvimento culpa os servidores. O que você faz nos primeiros 15 minutos de crise?',
      keyAspectsLookedFor: [
        'Abertura de War Room estruturada com foco em restabelecimento, não em buscar culpados (blameless)',
        'Investigação direta de telemetria empírica e logs de banco antes de reinicializações destrutivas',
        'Comunicação proativa e formal de status aos clientes e áreas de negócio afetadas',
      ],
    },
    {
      id: 'Q-03',
      roleTrack: 'Governança & Riscos (ISO 38500)',
      interviewerRole: 'Membro do Conselho de Administração',
      question: 'Qual a diferença conceitual e prática entre GOVERNANÇA de TI e GESTÃO de TI? Como você apresentaria isso para um conselho?',
      keyAspectsLookedFor: [
        'Governança: Avaliar, Dirigir e Monitorar estrategicamente alinhamento e riscos corporativos',
        'Gestão: Planejar, Construir, Executar e Monitorar as operações do dia a dia (COBIT/ISO 38500)',
        'Responsabilidade (Accountability) do Conselho vs Execução da Diretoria Executiva',
      ],
    },
  ];

  const [activeQuestion, setActiveQuestion] = useState<InterviewQuestion>(questions[0]);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleEvaluate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userAnswer.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);

      const length = userAnswer.length;
      const hasKeywords =
        userAnswer.toLowerCase().includes('métrica') ||
        userAnswer.toLowerCase().includes('latência') ||
        userAnswer.toLowerCase().includes('evidência') ||
        userAnswer.toLowerCase().includes('telemetria') ||
        userAnswer.toLowerCase().includes('avaliar') ||
        userAnswer.toLowerCase().includes('risco');

      const score = Math.min(10, Math.max(5, (hasKeywords ? 8.5 : 6.0) + (length > 150 ? 1.0 : 0)));

      setFeedback({
        score: score.toFixed(1),
        strengths: [
          'Demonstrou clareza de raciocínio e foco na resolução do problema prático.',
          hasKeywords ? 'Utilizou terminologia técnica correta e fundamentada.' : 'Boa objetividade na comunicação.',
        ],
        improvements: [
          'Poderia explicitar mais claramente as consequências para o SLA do cliente.',
          'Lembre-se de citar o plano de contingência ou rollback em decisões de risco.',
        ],
        verdict: score >= 8.0 ? 'Aprovado com Destaque na Arguição' : 'Aprovado com Recomendações de Aprimoramento',
      });
    }, 500);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center space-x-2 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-1">
            <MessagesSquare className="w-4 h-4" />
            <span>Preparação de Carreira • Simulador de Entrevistas Profissionais</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-100 tracking-tight">
            Simulador de Entrevistas Técnicas & Governança
          </h2>
          <p className="text-xs text-slate-400">
            Responda a perguntas situacionais reais de processos seletivos e receba avaliação automática de coerência, vocabulário e profundidade.
          </p>
        </div>
      </div>

      {/* Questions list chips */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-1 text-xs">
        {questions.map((q) => {
          const isSelected = activeQuestion.id === q.id;
          return (
            <button
              key={q.id}
              onClick={() => {
                setActiveQuestion(q);
                setUserAnswer('');
                setFeedback(null);
              }}
              className={`px-3.5 py-2 rounded-xl font-semibold whitespace-nowrap transition-all ${
                isSelected
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              {q.roleTrack}
            </button>
          );
        })}
      </div>

      {/* Main Question & Answer Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4 text-xs">
          <div className="space-y-1.5 pb-3 border-b border-slate-800">
            <div className="flex items-center space-x-2 text-slate-400 text-[11px]">
              <span className="text-indigo-400 font-bold uppercase">{activeQuestion.roleTrack}</span>
              <span>•</span>
              <span>Entrevistador: <strong className="text-slate-200">{activeQuestion.interviewerRole}</strong></span>
            </div>
            <h3 className="text-base font-bold text-slate-100 leading-snug">
              "{activeQuestion.question}"
            </h3>
          </div>

          <form onSubmit={handleEvaluate} className="space-y-3">
            <label className="block text-slate-300 font-semibold">
              Sua Resposta Profissional (Estruture com clareza, fatos e postura técnica):
            </label>
            <textarea
              rows={6}
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="Descreva passo a passo como você agiria nessa situação, quais perguntas faria, quais ferramentas/frameworks utilizaria e como justificaria sua postura perante o negócio..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 leading-relaxed"
              required
            />
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting || !userAnswer.trim()}
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-bold rounded-xl flex items-center space-x-2 shadow-md shadow-indigo-600/30"
              >
                <Sparkles className="w-4 h-4" />
                <span>{isSubmitting ? 'Avaliando Resposta...' : 'Submeter Resposta para Avaliação'}</span>
              </button>
            </div>
          </form>
        </div>

        {/* Evaluation Rubric / Result Card */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3 text-xs">
            <span className="font-bold text-slate-300 uppercase tracking-wider text-[10px] block">
              Aspectos Críticos Avaliados pela Banca:
            </span>
            <ul className="space-y-2 text-slate-400 text-[11px]">
              {activeQuestion.keyAspectsLookedFor.map((aspect, idx) => (
                <li key={idx} className="flex items-start space-x-2 bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>{aspect}</span>
                </li>
              ))}
            </ul>
          </div>

          {feedback && (
            <div className="bg-slate-900 border border-emerald-700/60 rounded-2xl p-5 shadow-xl space-y-3 text-xs animate-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="font-bold text-emerald-400 text-sm">{feedback.verdict}</span>
                <span className="text-xl font-black text-slate-100 font-mono">
                  {feedback.score} <span className="text-xs text-slate-400 font-normal">/ 10</span>
                </span>
              </div>

              <div className="space-y-1">
                <strong className="text-emerald-300 block text-[11px]">Pontos Fortes da Resposta:</strong>
                <ul className="space-y-1 text-slate-300 text-[11px]">
                  {feedback.strengths.map((s: string, i: number) => (
                    <li key={i} className="flex items-center gap-1.5">
                      <span className="text-emerald-400 font-bold">✓</span> {s}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-1 pt-1 border-t border-slate-800/80">
                <strong className="text-amber-300 block text-[11px]">Oportunidades de Melhoria:</strong>
                <ul className="space-y-1 text-slate-400 text-[11px]">
                  {feedback.improvements.map((imp: string, i: number) => (
                    <li key={i} className="flex items-center gap-1.5">
                      <span className="text-amber-400 font-bold">•</span> {imp}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
