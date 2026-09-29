import React from 'react';
import { Calendar, DollarSign, Activity, CheckCircle, ArrowRight, X } from 'lucide-react';

interface MonthlyReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  report: {
    monthAdvancedTo: number;
    financialBurn: number;
    eventsOccurred: string[];
    governanceSummary: string;
  } | null;
}

export const MonthlyReportModal: React.FC<MonthlyReportModalProps> = ({ isOpen, onClose, report }) => {
  if (!isOpen || !report) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-200"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-2 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-2">
          <Calendar className="w-4 h-4" />
          <span>Fechamento Mensal • Nexora Digital</span>
        </div>

        <h3 className="text-xl font-bold text-slate-100 mb-4">
          Início do Mês {report.monthAdvancedTo} de Simulação
        </h3>

        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3 mb-5 text-xs">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <span className="text-slate-400 flex items-center gap-1.5">
              <DollarSign className="w-4 h-4 text-emerald-400" />
              Burn Rate Operacional:
            </span>
            <span className="font-bold text-slate-200 font-mono">
              - R$ {report.financialBurn.toLocaleString('pt-BR')}
            </span>
          </div>
          <div>
            <span className="text-slate-400 font-semibold block mb-1">
              Eventos e Fatos Relevantes do Mês:
            </span>
            <ul className="space-y-1.5 text-slate-300">
              {report.eventsOccurred.map((evt, idx) => (
                <li key={idx} className="flex items-start space-x-2">
                  <CheckCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                  <span>{evt}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="pt-2 border-t border-slate-800 text-slate-400 italic">
            "{report.governanceSummary}"
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 shadow-md flex items-center space-x-2 transition-all"
          >
            <span>Continuar Operação do Mês {report.monthAdvancedTo}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
