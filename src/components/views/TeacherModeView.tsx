import React from 'react';
import { useGovLab } from '../../context/GovLabContext';
import { GraduationCap, Users, Award, CheckCircle2, AlertTriangle, FileText } from 'lucide-react';

export const TeacherModeView: React.FC = () => {
  const { studentProfile, companyState, metacognitiveEntries } = useGovLab();

  const rubrics = [
    { dimension: '1. Capacidade de Investigação & Coleta de Evidências', score: 4, desc: 'Prioriza logs de telemetria reais antes de reinicializações destrutivas.' },
    { dimension: '2. Elicitação & Perguntas a Stakeholders', score: 4, desc: 'Formula perguntas objetivas focadas em dados e restrições de negócio.' },
    { dimension: '3. Detecção de Ambiguidades em Requisitos', score: 3, desc: 'Identifica termos vagos ("rápido", "fácil"), porém ainda requer prática em testes de borda.' },
    { dimension: '4. Análise de Causa Raiz (RCA)', score: 4, desc: 'Aprofunda nos 5 Porquês evitando culpar indivíduos isolados.' },
    { dimension: '5. Planos de Ação Estruturais (5W2H)', score: 4, desc: 'Exige controles técnicos automatizados além de simples treinamentos.' },
    { dimension: '6. Gestão de Riscos & Trade-Offs', score: 3, desc: 'Calcula risco residual e avalia reversão (rollback) em mudanças.' },
    { dimension: '7. Postura Metacognitiva & Autocrítica', score: 5, desc: 'Excelente calibração entre confiança e competência demonstrada.' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center space-x-2 text-purple-400 text-xs font-bold uppercase tracking-wider mb-1">
            <GraduationCap className="w-4 h-4" />
            <span>Ambiente Docente • Gestão Pedagógica & Rubricas de Avaliação</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-100 tracking-tight">
            Painel do Professor & Acompanhamento de Turma
          </h2>
          <p className="text-xs text-slate-400">
            Avaliação individual formativa por rubricas de 0 a 5, diagnóstico de raciocínio e histórico de decisões do estudante.
          </p>
        </div>

        <span className="text-xs bg-purple-950 text-purple-300 border border-purple-800 px-3 py-1.5 rounded-xl font-bold font-mono self-start sm:self-auto">
          Turma: GOVLAB-2026.1 • 1 Aluno Ativo
        </span>
      </div>

      {/* Student Overview Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4 text-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
          <div>
            <h3 className="text-base font-bold text-slate-100">{studentProfile.name}</h3>
            <span className="text-slate-400">Cargo Atual: <strong className="text-cyan-400">{studentProfile.role}</strong> • Mês de Simulação: {studentProfile.simulationMonth}</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <span className="text-[10px] text-slate-500 uppercase block font-semibold">Competência Real</span>
              <span className="text-base font-bold text-cyan-400">{studentProfile.competenceScore}%</span>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-slate-500 uppercase block font-semibold">Metacognição</span>
              <span className="text-base font-bold text-purple-400">{studentProfile.metacognitiveScore}%</span>
            </div>
          </div>
        </div>

        {/* Rubrics (0 to 5) */}
        <div className="space-y-3 pt-2">
          <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
            Rubrica de Avaliação de Competências (Escala 0 a 5):
          </span>
          <div className="space-y-2">
            {rubrics.map((r, idx) => (
              <div
                key={idx}
                className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
              >
                <div className="space-y-0.5">
                  <div className="font-bold text-slate-200">{r.dimension}</div>
                  <p className="text-[11px] text-slate-400">{r.desc}</p>
                </div>
                <div className="flex items-center space-x-2 shrink-0">
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        className={`w-5 h-5 rounded flex items-center justify-center font-bold text-[10px] ${
                          star <= r.score
                            ? 'bg-purple-600 text-white'
                            : 'bg-slate-800 text-slate-500'
                        }`}
                      >
                        {star}
                      </span>
                    ))}
                  </div>
                  <span className="font-mono text-purple-300 font-bold ml-1">{r.score} / 5</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
