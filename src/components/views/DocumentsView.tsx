import React, { useState } from 'react';
import { useGovLab } from '../../context/GovLabContext';
import { GovernanceDocument } from '../../types';
import { FileText, Search, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const DocumentsView: React.FC = () => {
  const { governanceDocuments } = useGovLab();
  const [selectedDoc, setSelectedDoc] = useState<GovernanceDocument>(governanceDocuments[0] || null);

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center space-x-2 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-1">
            <FileText className="w-4 h-4" />
            <span>Governança Corporativa • Políticas, Normas & Procedimentos</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-100 tracking-tight">
            Catálogo de Políticas & Procedimentos Oficiais
          </h2>
          <p className="text-xs text-slate-400">
            Base normativa interna da Nexora Digital: Política de Segurança, Gestão de Mudanças e Planos de Continuidade.
          </p>
        </div>
      </div>

      {/* Main Split: Documents List (Left) + Document Reader (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-4 space-y-2.5">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
            Documentos Oficiais Homologados
          </span>
          {governanceDocuments.map((doc) => {
            const isSelected = selectedDoc?.id === doc.id;
            return (
              <div
                key={doc.id}
                onClick={() => setSelectedDoc(doc)}
                className={`p-4 rounded-xl border text-xs transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-slate-900 border-indigo-500 shadow-md'
                    : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-mono font-bold text-indigo-400">{doc.code}</span>
                  <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded">
                    v{doc.version}
                  </span>
                </div>
                <h4 className="font-bold text-slate-200 text-xs mb-1 line-clamp-1">{doc.title}</h4>
                <p className="text-[11px] text-slate-400 line-clamp-2">{doc.summary}</p>
              </div>
            );
          })}
        </div>

        <div className="lg:col-span-8">
          {selectedDoc ? (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl space-y-5 text-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-xs font-bold text-indigo-400 bg-indigo-950 px-2 py-0.5 rounded border border-indigo-800">
                      {selectedDoc.code}
                    </span>
                    <span className="text-xs text-slate-400">Versão {selectedDoc.version}</span>
                    <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded">
                      {selectedDoc.category}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-100">{selectedDoc.title}</h3>
                </div>
                <div className="text-[11px] text-slate-400 text-right">
                  <div>Aprovado por: <strong className="text-slate-200">{selectedDoc.approvedBy}</strong></div>
                  <div>Última revisão: {selectedDoc.lastReviewDate}</div>
                </div>
              </div>

              <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 text-slate-300 leading-relaxed font-sans text-xs whitespace-pre-line space-y-4">
                {selectedDoc.contentMarkdown}
              </div>
            </div>
          ) : (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center text-slate-500 text-xs">
              Selecione um documento oficial para leitura.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
