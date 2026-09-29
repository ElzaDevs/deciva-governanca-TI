import React from 'react';
import { useGovLab } from '../../context/GovLabContext';
import { TableProperties, AlertTriangle, CheckCircle2, ShieldAlert, ArrowRight } from 'lucide-react';

export const RtmView: React.FC = () => {
  const { requirements, stakeholders, risks } = useGovLab();

  const getStakeholderName = (id: string) => {
    return stakeholders.find((s) => s.id === id)?.name || 'Sem Dono';
  };

  const getRelatedRisk = (r: (typeof requirements)[0]) => {
    return risks.find((rk) => rk.category === 'Tecnológico' || rk.category === 'Operacional')?.code || 'RSK-103';
  };

  // Automated sanity checks on the RTM
  const reqsWithoutTests = requirements.filter((r) => r.testCaseIds.length === 0);
  const orphanReqs = requirements.filter((r) => !r.stakeholderId);

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center space-x-2 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-1">
            <TableProperties className="w-4 h-4" />
            <span>Engenharia de Software • Rastreabilidade Bidirecional</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-100 tracking-tight">
            Matriz de Rastreabilidade de Requisitos (RTM)
          </h2>
          <p className="text-xs text-slate-400">
            Mapeamento ponta a ponta: Requisito → Stakeholder → Regra de Negócio → Testes de QA → Riscos → Mudanças.
          </p>
        </div>
      </div>

      {/* RTM Health Dashboard */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-950 border border-cyan-700/60 flex items-center justify-center text-cyan-400 shrink-0">
            {requirements.length}
          </div>
          <div>
            <div className="text-xs font-bold text-slate-200">Total de Requisitos Mapeados</div>
            <div className="text-[11px] text-slate-400">100% catalogados na base</div>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-center space-x-3">
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 font-bold ${
              reqsWithoutTests.length === 0
                ? 'bg-emerald-950 text-emerald-400 border border-emerald-700'
                : 'bg-amber-950 text-amber-400 border border-amber-700'
            }`}
          >
            {reqsWithoutTests.length}
          </div>
          <div>
            <div className="text-xs font-bold text-slate-200">Requisitos sem Casos de Teste</div>
            <div className="text-[11px] text-amber-400">
              {reqsWithoutTests.length > 0 ? 'Risco de defeito em produção (QA gap)' : 'Total cobertura de testes'}
            </div>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-center space-x-3">
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 font-bold ${
              orphanReqs.length === 0
                ? 'bg-emerald-950 text-emerald-400 border border-emerald-700'
                : 'bg-rose-950 text-rose-400 border border-rose-700'
            }`}
          >
            {orphanReqs.length}
          </div>
          <div>
            <div className="text-xs font-bold text-slate-200">Requisitos Órfãos (Sem Patrocinador)</div>
            <div className="text-[11px] text-slate-400">Garante alinhamento estratégico</div>
          </div>
        </div>
      </div>

      {/* RTM Visual Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="p-4 border-b border-slate-800 bg-slate-950/60 flex items-center justify-between">
          <span className="text-xs font-bold text-slate-200 uppercase tracking-wider">
            Matriz de Vínculos e Dependências
          </span>
          <span className="text-[11px] text-slate-400">Mostrando {requirements.length} itens</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Código</th>
                <th className="py-3 px-4">Título do Requisito</th>
                <th className="py-3 px-4">Stakeholder Patrocinador</th>
                <th className="py-3 px-4">Regra de Negócio (RN)</th>
                <th className="py-3 px-4">Casos de Teste (QA)</th>
                <th className="py-3 px-4">Risco Associado</th>
                <th className="py-3 px-4 text-center">Status RTM</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {requirements.map((req) => {
                const hasTests = req.testCaseIds.length > 0;
                const hasRules = req.businessRules.length > 0;
                const riskCode = getRelatedRisk(req);

                return (
                  <tr key={req.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-cyan-400 whitespace-nowrap">
                      {req.code}
                    </td>
                    <td className="py-3 px-4 font-semibold text-slate-100 max-w-xs truncate">
                      {req.title}
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap text-slate-300">
                      {getStakeholderName(req.stakeholderId)}
                    </td>
                    <td className="py-3 px-4 max-w-xs truncate text-[11px] text-indigo-300">
                      {hasRules ? req.businessRules[0] : <span className="text-slate-500 italic">Nenhuma</span>}
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      {hasTests ? (
                        <div className="flex items-center space-x-1">
                          {req.testCaseIds.map((tc) => (
                            <span
                              key={tc}
                              className="bg-emerald-950/80 text-emerald-400 border border-emerald-800 px-1.5 py-0.5 rounded text-[10px] font-mono font-semibold"
                            >
                              {tc}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-amber-400 text-[11px] font-semibold flex items-center gap-1">
                          <AlertTriangle className="w-3.5 h-3.5" /> Sem Teste
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 font-mono text-[11px] text-rose-300 whitespace-nowrap">
                      {riskCode}
                    </td>
                    <td className="py-3 px-4 text-center whitespace-nowrap">
                      {hasTests && req.stakeholderId ? (
                        <span className="text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-800 px-2 py-0.5 rounded font-bold">
                          Rastreável
                        </span>
                      ) : (
                        <span className="text-[10px] bg-amber-950 text-amber-300 border border-amber-800 px-2 py-0.5 rounded font-bold">
                          Gargalo
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
