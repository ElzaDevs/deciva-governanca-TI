import React, { useState } from 'react';
import { GitBranch, GitPullRequest, CheckCircle2, XCircle, AlertTriangle, Play, RotateCcw, ArrowRight, ShieldCheck } from 'lucide-react';

export const DevOpsView: React.FC = () => {
  const [pipelineState, setPipelineState] = useState<'idle' | 'running' | 'success' | 'failed'>('idle');
  const [activeStage, setActiveStage] = useState<number>(0);
  const [bypassBranchProtection, setBypassBranchProtection] = useState(false);

  const stages = [
    { name: '1. Lint & Typecheck', desc: 'Validar sintaxe e tipagem TypeScript estrita' },
    { name: '2. Testes Unitários', desc: 'Executar Jest com cobertura mínima de 80%' },
    { name: '3. SAST & SonarQube', desc: 'Varredura estática de vulnerabilidades e credenciais' },
    { name: '4. Build da Imagem Docker', desc: 'Criação de imagem imutável e assinatura de digest' },
    { name: '5. Deploy em Homologação', desc: 'Publicação no cluster staging para smoke tests' },
    { name: '6. Canary Release (10%)', desc: 'Roteamento progressivo de 10% do tráfego real' },
  ];

  const handleRunPipeline = () => {
    setPipelineState('running');
    setActiveStage(0);

    let current = 0;
    const interval = setInterval(() => {
      current++;
      if (current >= stages.length) {
        clearInterval(interval);
        if (bypassBranchProtection) {
          setPipelineState('failed');
        } else {
          setPipelineState('success');
        }
      } else {
        setActiveStage(current);
      }
    }, 600);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center space-x-2 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-1">
            <GitBranch className="w-4 h-4" />
            <span>Engenharia & Confiabilidade • DevOps & CI/CD</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-100 tracking-tight">
            Pipeline de Entrega Contínua & Confiabilidade (SRE)
          </h2>
          <p className="text-xs text-slate-400">
            Esteira automatizada de build, validações de branch protection, smoke tests, deploy canary e reversão segura (rollback).
          </p>
        </div>

        <button
          onClick={handleRunPipeline}
          disabled={pipelineState === 'running'}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-all shadow-md shadow-indigo-600/30 self-start sm:self-auto"
        >
          <Play className="w-4 h-4 fill-white" />
          <span>{pipelineState === 'running' ? 'Executando Pipeline...' : 'Disparar Pipeline CI/CD'}</span>
        </button>
      </div>

      {/* Governance check on Branch Protection */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3 text-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span className="font-bold text-slate-200">Regras de Proteção de Branch no Git (Branch Protection Rules)</span>
          </div>
          <label className="flex items-center space-x-2 cursor-pointer text-[11px] text-slate-400">
            <input
              type="checkbox"
              checked={bypassBranchProtection}
              onChange={(e) => setBypassBranchProtection(e.target.checked)}
              className="accent-rose-500 rounded"
            />
            <span className={bypassBranchProtection ? 'text-rose-400 font-bold' : ''}>
              Permitir Bypass de Testes por Administradores (Simular Falha NC-005)
            </span>
          </label>
        </div>
        <p className="text-slate-400 text-[11px]">
          Conforme a política de governança POL-TI-03, nenhum merge para `main` pode ocorrer sem a aprovação de pelo menos um Tech Lead e aprovação de 100% da suíte de testes de regressão.
        </p>
      </div>

      {/* Visual Pipeline Stages */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
        <div className="flex items-center justify-between text-xs pb-3 border-b border-slate-800">
          <span className="font-bold text-slate-200 uppercase tracking-wider">
            Esteira GitLab CI/CD • Release v2.4.1
          </span>
          <span className="font-mono text-slate-400">Commit: f49a21b (Branch: release/billing-split)</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {stages.map((stage, idx) => {
            const isCompleted = pipelineState === 'success' || (pipelineState === 'running' && idx < activeStage);
            const isCurrent = pipelineState === 'running' && idx === activeStage;
            const isFailed = pipelineState === 'failed' && idx === stages.length - 1;

            return (
              <div
                key={idx}
                className={`p-4 rounded-xl border text-xs space-y-1.5 transition-all ${
                  isCurrent
                    ? 'bg-indigo-950/40 border-indigo-500 shadow-md ring-1 ring-indigo-500'
                    : isCompleted
                    ? 'bg-emerald-950/30 border-emerald-800 text-slate-200'
                    : isFailed
                    ? 'bg-rose-950/40 border-rose-800 text-rose-300'
                    : 'bg-slate-950/60 border-slate-800 text-slate-400'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold">{stage.name}</span>
                  {isCompleted ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  ) : isCurrent ? (
                    <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
                  ) : isFailed ? (
                    <XCircle className="w-4 h-4 text-rose-400" />
                  ) : (
                    <span className="text-[10px] text-slate-600 font-mono">Pendente</span>
                  )}
                </div>
                <p className="text-[11px] text-slate-400">{stage.desc}</p>
              </div>
            );
          })}
        </div>

        {pipelineState === 'failed' && (
          <div className="p-4 bg-rose-950/40 border border-rose-800 rounded-xl space-y-2 text-xs text-rose-300">
            <div className="font-bold flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-rose-400" />
              <span>Falha de Confiabilidade Detectada no Deploy Canary (10%)</span>
            </div>
            <p className="text-[11px] text-slate-300">
              Taxa de erro HTTP 500 subiu para 8.4% nos pods canary. A migration de banco causou incompatibilidade com o código legado. O rollback automático foi acionado pelo Prometheus alertmanager!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
