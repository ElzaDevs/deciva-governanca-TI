import React, { useState } from 'react';
import { useGovLab } from '../../context/GovLabContext';
import {
  Building2,
  Users,
  Server,
  Network,
  ShieldCheck,
  Cpu,
  Layers,
  HardDrive,
  Workflow,
  Globe2,
} from 'lucide-react';

export const CompanyView: React.FC = () => {
  const { companyState, stakeholders } = useGovLab();
  const [activeTab, setActiveTab] = useState<'departments' | 'systems' | 'infra'>('departments');

  const departments = [
    { name: 'Diretoria Executiva', icon: '👔', lead: 'Dra. Cecília Bastos & Carlos Drummond', staff: 8, focus: 'Estratégia, valuation, governança corporativa e resultados financeiros.' },
    { name: 'Governança de TI & PMO', icon: '📐', lead: 'Roberto Alencar', staff: 14, focus: 'ISO/IEC 38500, alinhamento estratégico, portfólio e gestão de riscos.' },
    { name: 'Segurança da Informação (SecOps)', icon: '🛡️', lead: 'Camila Nogueira (CISO)', staff: 16, focus: 'ISO 27001, IAM Zero Trust, SIEM, gestão de vulnerabilidades e compliance LGPD.' },
    { name: 'Engenharia de Software', icon: '🧑‍💻', lead: 'Lucas Pinho', staff: 82, focus: 'Desenvolvimento das aplicações web, APIs, microsserviços e sustentação.' },
    { name: 'Garantia da Qualidade (QA)', icon: '🔍', lead: 'Juliana Paiva', staff: 18, focus: 'Automação de testes, regressão, testes de carga, critérios de aceitação e DoD.' },
    { name: 'Infraestrutura & Cloud', icon: '☁️', lead: 'Felipe Santana', staff: 24, focus: 'Kubernetes AWS EKS, redes híbridas, observabilidade Datadog e bancos de dados.' },
    { name: 'Engenharia de Dados & BI', icon: '📊', lead: 'Thiago Valente', staff: 15, focus: 'PostgreSQL clusters, data pipelines, modelagem relacional e integridade ACID.' },
    { name: 'Produto & Operações B2B', icon: '📱', lead: 'Mariana Prado', staff: 22, focus: 'Descoberta de produto, gestão de backlog, métricas de adoção e satisfação NPS.' },
    { name: 'Atendimento & Suporte N1/N2', icon: '🎧', lead: 'Beatriz Fonseca & Tatiana Gusmão', staff: 45, focus: 'ITSM, triagem de incidentes, catálogo de serviços e atendimento 24/7 aos clientes.' },
    { name: 'Jurídico & Compliance (DPO)', icon: '⚖️', lead: 'Dr. Otávio Ramos', staff: 12, focus: 'Contratos corporativos de SLA, compliance regulatório e privacidade de dados.' },
    { name: 'Recursos Humanos & Gente', icon: '👩‍💼', lead: 'Renata Albuquerque', staff: 28, focus: 'Gestão de pessoas, onboarding e fluxo formal de desligamento (offboarding).' },
    { name: 'Comercial B2B & Vendas', icon: '🤝', lead: 'Guilherme Toledo', staff: 35, focus: 'Expansão de mercado, contratos enterprise e relacionamento com clientes-chave.' },
    { name: 'Financeiro & Controladoria', icon: '💼', lead: 'Carlos Drummond', staff: 20, focus: 'Gestão orçamentária, faturamento corporativo, fluxo de caixa e ROI de projetos.' },
    { name: 'Marketing Corporativo', icon: '📢', lead: 'Larissa Moura', staff: 16, focus: 'Posicionamento de marca B2B, geração de leads e comunicação institucional.' },
  ];

  const systems = [
    {
      code: 'SYS-01',
      name: 'Portal B2B de Clientes',
      category: 'Frontend Web / SPA',
      tech: 'React, TypeScript, Tailwind, Nginx Ingress',
      slaTarget: '99.90%',
      status: 'Operacional com Degradação Recente',
      criticality: 'Crítica',
      description: 'Painel acessado pelos 64 clientes corporativos para emissão de faturamento e relatórios analíticos.',
    },
    {
      code: 'SYS-02',
      name: 'Nexora Billing API (Core Faturamento)',
      category: 'Backend Core Transacional',
      tech: 'Node.js, Express, PostgreSQL Cluster',
      slaTarget: '99.95%',
      status: 'Em Refatoração',
      criticality: 'Crítica',
      description: 'Módulo transacional responsável pela liquidação de cobranças e conciliação bancária.',
    },
    {
      code: 'SYS-03',
      name: 'Identity & Access Management (IAM)',
      category: 'Autenticação & Segurança',
      tech: 'Active Directory / Okta SSO, JWT, OAuth 2.0',
      slaTarget: '99.99%',
      status: 'Atenção por Não Conformidade NC-008',
      criticality: 'Crítica',
      description: 'Federação central de acessos corporativos, VPN e repositórios de código.',
    },
    {
      code: 'SYS-04',
      name: 'Notification Worker Service',
      category: 'Mensageria Assíncrona',
      tech: 'RabbitMQ, Python, Redis Cache',
      slaTarget: '99.50%',
      status: 'Operacional',
      criticality: 'Média',
      description: 'Disparo de webhooks, e-mails transacionais e alertas de cobrança.',
    },
    {
      code: 'SYS-05',
      name: 'Data Warehouse & Lakehouse',
      category: 'Analytics & Dados',
      tech: 'PostgreSQL Read-Replica, AWS S3, Metabase',
      slaTarget: '99.00%',
      status: 'Gargalo em Pico Matinal',
      criticality: 'Alta',
      description: 'Armazenamento histórico para relatórios gerenciais e inteligência de negócios.',
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      {/* Overview Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2 text-indigo-400 text-xs font-bold uppercase tracking-wider">
              <Building2 className="w-4 h-4" />
              <span>Visão Estrutural da Empresa Virtual</span>
            </div>
            <h2 className="text-2xl font-black text-slate-100">{companyState.name}</h2>
            <p className="text-xs text-slate-400 max-w-2xl">{companyState.tagline}</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-center">
              <span className="text-[10px] text-slate-500 uppercase block font-bold">Colaboradores</span>
              <span className="text-slate-100 font-bold font-mono text-base">{companyState.employeesCount}</span>
            </div>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-center">
              <span className="text-[10px] text-slate-500 uppercase block font-bold">Usuários Internos</span>
              <span className="text-slate-100 font-bold font-mono text-base">{companyState.internalUsers}</span>
            </div>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-center">
              <span className="text-[10px] text-slate-500 uppercase block font-bold">Clientes B2B</span>
              <span className="text-slate-100 font-bold font-mono text-base">{companyState.corporateClients}</span>
            </div>
          </div>
        </div>

        {/* Navigation tabs */}
        <div className="flex border-b border-slate-800 pt-3 gap-2">
          <button
            onClick={() => setActiveTab('departments')}
            className={`px-4 py-2 text-xs font-bold rounded-t-lg transition-all border-b-2 flex items-center gap-1.5 ${
              activeTab === 'departments'
                ? 'border-indigo-500 text-indigo-400 bg-slate-950/60'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            Departamentos & Organograma ({departments.length})
          </button>
          <button
            onClick={() => setActiveTab('systems')}
            className={`px-4 py-2 text-xs font-bold rounded-t-lg transition-all border-b-2 flex items-center gap-1.5 ${
              activeTab === 'systems'
                ? 'border-cyan-500 text-cyan-400 bg-slate-950/60'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            Catálogo de Sistemas de Software ({systems.length})
          </button>
          <button
            onClick={() => setActiveTab('infra')}
            className={`px-4 py-2 text-xs font-bold rounded-t-lg transition-all border-b-2 flex items-center gap-1.5 ${
              activeTab === 'infra'
                ? 'border-emerald-500 text-emerald-400 bg-slate-950/60'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Server className="w-3.5 h-3.5" />
            Topologia de Infraestrutura Híbrida
          </button>
        </div>
      </div>

      {/* Content based on tab */}
      {activeTab === 'departments' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {departments.map((dept, idx) => (
            <div
              key={idx}
              className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-2 hover:border-slate-700 transition-all text-xs"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-xl">{dept.icon}</span>
                  <span className="font-bold text-slate-100">{dept.name}</span>
                </div>
                <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded font-mono">
                  {dept.staff} pessoas
                </span>
              </div>
              <div className="text-slate-400">
                <strong className="text-slate-300">Liderança:</strong> {dept.lead}
              </div>
              <p className="text-slate-400 text-[11px] leading-relaxed pt-1 border-t border-slate-800/80">
                {dept.focus}
              </p>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'systems' && (
        <div className="space-y-3">
          {systems.map((sys) => (
            <div
              key={sys.code}
              className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3 text-xs"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-800">
                <div className="flex items-center space-x-2.5">
                  <span className="font-mono text-cyan-400 font-bold">{sys.code}</span>
                  <span className="font-bold text-slate-100 text-sm">{sys.name}</span>
                  <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded">
                    {sys.category}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] bg-indigo-950 text-indigo-300 px-2 py-0.5 rounded border border-indigo-800">
                    SLA Alvo: {sys.slaTarget}
                  </span>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded font-semibold ${
                      sys.criticality === 'Crítica'
                        ? 'bg-rose-950 text-rose-300 border border-rose-800'
                        : 'bg-amber-950 text-amber-300 border border-amber-800'
                    }`}
                  >
                    Criticidade: {sys.criticality}
                  </span>
                </div>
              </div>
              <p className="text-slate-300 leading-relaxed">{sys.description}</p>
              <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-400 pt-1">
                <span>
                  <strong className="text-slate-300">Stack Tecnológica:</strong> {sys.tech}
                </span>
                <span className="font-medium text-amber-400">Status: {sys.status}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'infra' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 text-xs">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <div className="flex items-center space-x-2 text-indigo-400 font-bold text-sm">
                <Globe2 className="w-4 h-4" />
                <span>Nuvem Primária: AWS (us-east-1)</span>
              </div>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                Cluster Kubernetes EKS gerenciando 42 pods de microsserviços, com balanceamento Nginx Ingress Controller e RDS PostgreSQL Multi-AZ.
              </p>
              <div className="text-[10px] text-emerald-400 font-mono">Uptime: 99.98% nos últimos 90 dias</div>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <div className="flex items-center space-x-2 text-cyan-400 font-bold text-sm">
                <Network className="w-4 h-4" />
                <span>Datacenter On-Premise & VPN</span>
              </div>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                Infraestrutura física legada na sede em São Paulo (SP) conectada via túnel VPN IPsec redundante de 1 Gbps para legado contábil e telefonia.
              </p>
              <div className="text-[10px] text-amber-400 font-mono">Atenção: Latência média de 42ms</div>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <div className="flex items-center space-x-2 text-amber-400 font-bold text-sm">
                <HardDrive className="w-4 h-4" />
                <span>Disaster Recovery (AWS sa-east-1)</span>
              </div>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                Ambiente de contingência em São Paulo com snapshots diários sincronizados em S3 Glacier. RPO de 1 hora e RTO de 4 horas contratuais.
              </p>
              <div className="text-[10px] text-rose-400 font-mono">Alerta: Último Restore Drill realizado há 270 dias (NC-003)</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
