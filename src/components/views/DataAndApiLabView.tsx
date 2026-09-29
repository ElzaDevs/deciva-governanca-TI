import React, { useState } from 'react';
import { Database, Terminal, Play, CheckCircle2, AlertTriangle, Send, RefreshCw, Key } from 'lucide-react';

export const DataAndApiLabView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'api' | 'sql'>('api');

  // API Console State
  const [selectedEndpoint, setSelectedEndpoint] = useState('/api/v1/customers/billing-summary');
  const [method, setMethod] = useState('GET');
  const [authHeader, setAuthHeader] = useState('Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.nexora_admin_token');
  const [idempotencyKey, setIdempotencyKey] = useState('idem-90214-uuid');
  const [apiResponse, setApiResponse] = useState<any>(null);
  const [isLoadingApi, setIsLoadingApi] = useState(false);

  // SQL Console State
  const [sqlQuery, setSqlQuery] = useState(
    'SELECT pid, query, state, age(clock_timestamp(), query_start) FROM pg_stat_activity WHERE state != \'idle\';'
  );
  const [sqlResult, setSqlResult] = useState<any>(null);

  const handleSendApi = () => {
    setIsLoadingApi(true);
    setTimeout(() => {
      setIsLoadingApi(false);
      if (selectedEndpoint === '/api/v1/customers/billing-summary') {
        setApiResponse({
          status: 200,
          statusText: 'OK',
          latencyMs: 340,
          headers: {
            'content-type': 'application/json',
            'x-ratelimit-remaining': '498',
            'x-trace-id': 'trc-89a12c',
          },
          body: {
            customer_id: 'CUST-84912',
            company_name: 'Alpha Logística B2B',
            billing_period: '2026-03',
            total_amount: 142850.0,
            invoices: [
              { id: 'INV-1092', amount: 84000.0, status: 'PAID' },
              { id: 'INV-1093', amount: 58850.0, status: 'PENDING' },
            ],
          },
        });
      } else if (selectedEndpoint === '/api/v1/payments/process') {
        if (!idempotencyKey) {
          setApiResponse({
            status: 400,
            statusText: 'Bad Request',
            latencyMs: 45,
            body: {
              error: 'IDEMPOTENCY_KEY_REQUIRED',
              message: 'Regra de negócio RN-FIN-09: Requisições de pagamento exigem cabeçalho Idempotency-Key.',
            },
          });
        } else {
          setApiResponse({
            status: 202,
            statusText: 'Accepted',
            latencyMs: 120,
            body: {
              transaction_id: 'TXN-9041285',
              status: 'PROCESSING_ASYNC',
              queue_name: 'nexora.billing.settlement.dlq',
              message: 'Transação aceita e enfileirada para liquidação com retry exponencial.',
            },
          });
        }
      } else {
        setApiResponse({
          status: 200,
          statusText: 'OK',
          latencyMs: 85,
          body: { success: true, timestamp: new Date().toISOString() },
        });
      }
    }, 400);
  };

  const handleRunSql = () => {
    if (sqlQuery.toLowerCase().includes('pg_terminate_backend')) {
      setSqlResult({
        columns: ['pg_terminate_backend'],
        rows: [['true']],
        executionTimeMs: 12,
        info: 'Query cancelada com sucesso! Pool de conexões do PostgreSQL liberado.',
      });
    } else if (sqlQuery.toLowerCase().includes('select * from audit_logs')) {
      setSqlResult({
        columns: ['id', 'user_id', 'action', 'created_at'],
        rows: [
          [1, 'usr_94', 'LOGIN_MFA_SUCCESS', '2026-03-29 08:12:11'],
          [2, 'usr_14', 'BULK_REPORT_INITIATED', '2026-03-29 08:14:02'],
          [3, 'usr_32', 'INVOICE_DOWNLOAD', '2026-03-29 08:14:45'],
        ],
        executionTimeMs: 245000,
        warning: 'ALERTA: Query rodou sem índice de data e sem limite de linhas, causando varredura de tabela (Seq Scan) de 40 milhões de linhas!',
      });
    } else {
      setSqlResult({
        columns: ['pid', 'query', 'state', 'duration'],
        rows: [
          ['48912', 'SELECT * FROM audit_logs a JOIN billing_events...', 'active', '00:04:08'],
          ['48915', 'SELECT balance FROM accounts WHERE id = 120', 'idle', '00:00:01'],
        ],
        executionTimeMs: 28,
      });
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center space-x-2 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Database className="w-4 h-4" />
            <span>Engenharia de Dados & Integração • Console Técnico</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-100 tracking-tight">
            Dados & APIs Lab
          </h2>
          <p className="text-xs text-slate-400">
            Inspecione endpoints REST da Nexora, teste idempotência, consulte o schema relacional e execute queries no PostgreSQL.
          </p>
        </div>

        <div className="flex border border-slate-800 rounded-xl p-1 bg-slate-900">
          <button
            onClick={() => setActiveTab('api')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'api' ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            API Console (REST)
          </button>
          <button
            onClick={() => setActiveTab('sql')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'sql' ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            SQL Database Query Lab
          </button>
        </div>
      </div>

      {/* Tab: API Console */}
      {activeTab === 'api' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4 text-xs">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
              Configurador de Requisição HTTP
            </span>

            <div className="flex items-center space-x-2">
              <select
                value={method}
                onChange={(e) => setMethod(e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-2 text-cyan-400 font-bold font-mono focus:outline-none"
              >
                <option value="GET">GET</option>
                <option value="POST">POST</option>
                <option value="PUT">PUT</option>
                <option value="DELETE">DELETE</option>
              </select>
              <select
                value={selectedEndpoint}
                onChange={(e) => setSelectedEndpoint(e.target.value)}
                className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 font-mono focus:outline-none"
              >
                <option value="/api/v1/customers/billing-summary">/api/v1/customers/billing-summary</option>
                <option value="/api/v1/payments/process">/api/v1/payments/process</option>
                <option value="/api/v1/auth/mfa/verify">/api/v1/auth/mfa/verify</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-400 font-semibold mb-1">Authorization Bearer Token:</label>
              <input
                type="text"
                value={authHeader}
                onChange={(e) => setAuthHeader(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 font-mono text-[11px] text-slate-300"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-semibold mb-1">Idempotency-Key Header (RN-FIN-09):</label>
              <input
                type="text"
                value={idempotencyKey}
                onChange={(e) => setIdempotencyKey(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 font-mono text-[11px] text-slate-300"
              />
            </div>

            <button
              onClick={handleSendApi}
              disabled={isLoadingApi}
              className="w-full py-2.5 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white font-bold rounded-xl flex items-center justify-center space-x-2 shadow-md"
            >
              <Send className="w-4 h-4" />
              <span>{isLoadingApi ? 'Enviando Requisição...' : 'Executar Chamada de API'}</span>
            </button>
          </div>

          <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3 text-xs flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">Resposta do Servidor</span>
                {apiResponse && (
                  <span
                    className={`font-mono text-xs font-bold px-2 py-0.5 rounded ${
                      apiResponse.status >= 200 && apiResponse.status < 300
                        ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                        : 'bg-rose-950 text-rose-300 border border-rose-800'
                    }`}
                  >
                    HTTP {apiResponse.status} {apiResponse.statusText} • {apiResponse.latencyMs}ms
                  </span>
                )}
              </div>

              {apiResponse ? (
                <pre className="bg-black/90 p-4 rounded-xl border border-slate-800 font-mono text-[11px] text-slate-200 overflow-x-auto max-h-72">
                  {JSON.stringify(apiResponse.body, null, 2)}
                </pre>
              ) : (
                <div className="text-slate-500 text-center py-16 italic">
                  Clique em "Executar Chamada de API" para testar o endpoint.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Tab: SQL Lab */}
      {activeTab === 'sql' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4 text-xs">
          <div className="flex items-center justify-between">
            <span className="font-bold text-slate-200 uppercase tracking-wider">
              Console SQL • Cluster PostgreSQL Primário (Nexora Core)
            </span>
            <span className="text-slate-400 font-mono text-[11px]">Database: nexora_production</span>
          </div>

          <textarea
            rows={4}
            value={sqlQuery}
            onChange={(e) => setSqlQuery(e.target.value)}
            className="w-full bg-black/90 border border-slate-800 rounded-xl p-3 font-mono text-xs text-emerald-400 focus:outline-none focus:border-cyan-500"
          />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSqlQuery('SELECT pg_terminate_backend(48912);')}
                className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-[11px] font-mono"
              >
                pg_terminate_backend(48912)
              </button>
              <button
                onClick={() => setSqlQuery('SELECT * FROM audit_logs WHERE created_at >= "2024-01-01";')}
                className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-[11px] font-mono"
              >
                Query Pesada (INC-1042)
              </button>
            </div>

            <button
              onClick={handleRunSql}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl flex items-center space-x-1.5 shadow-md"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Executar Query</span>
            </button>
          </div>

          {sqlResult && (
            <div className="space-y-3 pt-3 border-t border-slate-800">
              {sqlResult.warning && (
                <div className="bg-rose-950/40 border border-rose-800 p-3 rounded-xl text-rose-300 flex items-start space-x-2">
                  <AlertTriangle className="w-4 h-4 shrink-0 text-rose-400 mt-0.5" />
                  <span>{sqlResult.warning}</span>
                </div>
              )}
              {sqlResult.info && (
                <div className="bg-emerald-950/40 border border-emerald-800 p-3 rounded-xl text-emerald-300 flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400 mt-0.5" />
                  <span>{sqlResult.info}</span>
                </div>
              )}

              <div className="overflow-x-auto">
                <table className="w-full text-left font-mono text-[11px] text-slate-300 border border-slate-800 rounded-lg overflow-hidden">
                  <thead className="bg-slate-950 text-slate-400">
                    <tr>
                      {sqlResult.columns.map((col: string, idx: number) => (
                        <th key={idx} className="p-2 border-b border-slate-800">
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80 bg-slate-950/60">
                    {sqlResult.rows.map((row: any[], rIdx: number) => (
                      <tr key={rIdx}>
                        {row.map((val: any, cIdx: number) => (
                          <td key={cIdx} className="p-2 truncate max-w-xs">
                            {String(val)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
