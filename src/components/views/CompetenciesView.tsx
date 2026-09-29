import React, { useState } from 'react';
import { useGovLab } from '../../context/GovLabContext';
import { Award, CheckCircle2, AlertTriangle, BookOpen, Sparkles, Filter } from 'lucide-react';
import { CompetencyTrack } from '../../types';

export const CompetenciesView: React.FC = () => {
  const { competencies, studentProfile } = useGovLab();
  const [selectedTrack, setSelectedTrack] = useState<string>('all');

  const tracks: CompetencyTrack[] = [
    'Fundamentos de TI',
    'Engenharia de Requisitos',
    'Engenharia de Software',
    'Gestão e Governança de TI',
    'ITSM',
    'Riscos, Compliance e Auditoria',
    'Segurança da Informação',
    'Arquitetura de Software',
    'Engenharia de Dados',
    'DevOps e CI/CD',
    'Qualidade e QA',
    'Profissionalização e Liderança',
  ];

  const masteryLabels = [
    '0 - Não Conhece',
    '1 - Reconhece',
    '2 - Compreende',
    '3 - Aplica com Ajuda',
    '4 - Aplica Sozinho',
    '5 - Analisa Novo',
    '6 - Resolve Complexo',
    '7 - Justifica Tecnicamente',
    '8 - Ensina Outro',
  ];

  const filteredCompetencies = competencies.filter(
    (c) => selectedTrack === 'all' || c.track === selectedTrack
  );

  const recurrentErrors = [
    { title: 'Confundir Sintoma com Causa Raiz', desc: 'Ex: Apontar que "o servidor caiu" como causa, em vez da query pesada que esgotou o pool.', fix: 'Aplicar 5 Porquês até a falha sistêmica.' },
    { title: 'Aceitar Requisitos com Adjetivos Vagos', desc: 'Ex: Aprovar "o sistema deve ser rápido e intuitivo" sem métrica de latência p95 ou taxa de sucesso.', fix: 'Exigir critérios de aceitação verificáveis.' },
    { title: 'Mudança Emergencial sem Rollback', desc: 'Ex: Subir hotfix em produção sem script reverso de migração de banco.', fix: 'Exigir plano de reversão testado no CAB.' },
    { title: 'Ação Corretiva Baseada Somente em "Treinamento"', desc: 'Ex: Dizer que os funcionários precisam de treinamento para evitar esquecer contas ativas.', fix: 'Instituir automação técnica e controles sistêmicos.' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center space-x-2 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Award className="w-4 h-4" />
            <span>Desenvolvimento Profissional • Sistema de Mastery (Níveis 0 a 8)</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-100 tracking-tight">
            Matriz de Competências & Domínio Profissional
          </h2>
          <p className="text-xs text-slate-400">
            A progressão de carreira depende de competência comprovada, qualidade das decisões e justificativas técnicas.
          </p>
        </div>

        <div className="flex items-center space-x-3 bg-slate-900 border border-slate-800 px-4 py-2 rounded-xl text-xs">
          <span className="text-slate-400">Cargo Atual:</span>
          <span className="font-bold text-cyan-400">{studentProfile.role}</span>
        </div>
      </div>

      {/* Mastery Scale Explainer */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3">
        <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
          Régua de Domínio (Mastery Levels)
        </span>
        <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-1.5 text-center text-[10px]">
          {masteryLabels.map((lbl, idx) => (
            <div
              key={idx}
              className="bg-slate-950 p-2 rounded-lg border border-slate-800/80 space-y-1"
            >
              <div className="w-5 h-5 rounded-full bg-indigo-950 text-indigo-400 font-bold mx-auto flex items-center justify-center font-mono">
                {idx}
              </div>
              <span className="text-slate-300 leading-tight block">{lbl.slice(4)}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Track Filter */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-1 text-xs">
        <button
          onClick={() => setSelectedTrack('all')}
          className={`px-3 py-1.5 rounded-lg font-semibold whitespace-nowrap transition-all ${
            selectedTrack === 'all'
              ? 'bg-indigo-600 text-white'
              : 'bg-slate-900 text-slate-400 hover:text-slate-200'
          }`}
        >
          Todas as Trilhas ({competencies.length})
        </button>
        {tracks.map((t) => (
          <button
            key={t}
            onClick={() => setSelectedTrack(t)}
            className={`px-3 py-1.5 rounded-lg font-semibold whitespace-nowrap transition-all ${
              selectedTrack === t
                ? 'bg-indigo-600 text-white'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Competencies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCompetencies.map((comp) => {
          const percent = (comp.level / 8) * 100;
          return (
            <div
              key={comp.id}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3 hover:border-slate-700 transition-all flex flex-col justify-between text-xs"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] bg-slate-800 text-indigo-300 px-2 py-0.5 rounded font-medium">
                    {comp.track}
                  </span>
                  <span className="font-mono text-cyan-400 font-bold">
                    Nível {comp.level} / 8
                  </span>
                </div>

                <h4 className="font-bold text-slate-100 text-sm leading-snug">{comp.name}</h4>
                <p className="text-slate-400 text-[11px] leading-relaxed">{comp.description}</p>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-800/80">
                <div className="flex justify-between text-[10px] text-slate-500">
                  <span>Domínio: {masteryLabels[comp.level]}</span>
                  <span>{comp.evidenceCount} evidências</span>
                </div>
                <div className="w-full bg-slate-950 rounded-full h-1.5 overflow-hidden border border-slate-800">
                  <div
                    className="bg-gradient-to-r from-cyan-500 to-indigo-500 h-1.5 rounded-full"
                    style={{ width: `${percent}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recurrent Errors Bank (Banco de Erros) */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex items-center space-x-2 text-rose-400 font-bold text-sm">
          <AlertTriangle className="w-4 h-4" />
          <span>Banco de Erros Metodológicos Recorrentes (Anti-Padrões de Mercado)</span>
        </div>
        <p className="text-xs text-slate-400">
          Estes são os equívocos mais comuns cometidos por profissionais iniciantes em TI e Governança corporativa:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          {recurrentErrors.map((err, idx) => (
            <div key={idx} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1.5">
              <strong className="text-rose-300 font-semibold block">{err.title}</strong>
              <p className="text-slate-400 text-[11px] leading-relaxed">{err.desc}</p>
              <div className="pt-1 text-[11px] text-emerald-400">
                <strong>Como corrigir:</strong> {err.fix}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
