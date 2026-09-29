import React, { useState } from 'react';
import {
  BookOpen,
  Search,
  CheckCircle2,
  AlertTriangle,
  Layers,
  Sparkles,
  HelpCircle,
  Award,
  ArrowRight,
  Terminal,
  RotateCcw,
  Check,
  X,
  FileSpreadsheet,
  Cpu,
} from 'lucide-react';
import { useGovLab } from '../../context/GovLabContext';

interface QuizQuestion {
  id: string;
  question: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
    explanation: string;
  }[];
}

interface LibraryTopic {
  id: string;
  name: string;
  category: 'Governança' | 'ITSM' | 'Segurança' | 'Processos' | 'Qualidade' | 'Confiabilidade SRE';
  officialSource: string;
  definition: string;
  whenToUse: string;
  whenNotToUse: string;
  realWorldExample: string;
  commonPitfall: string;
  quiz?: QuizQuestion;
}

export const LibraryView: React.FC = () => {
  const { awardXp } = useGovLab();

  const topics: LibraryTopic[] = [
    {
      id: 'iso-38500',
      name: 'ISO/IEC 38500:2024 (Governança Corporativa de TI)',
      category: 'Governança',
      officialSource: 'ISO (International Organization for Standardization)',
      definition:
        'Norma internacional que provê princípios orientadores para membros de órgãos de governança sobre o uso eficaz, eficiente e aceitável da TI. Baseia-se no modelo EDM: Avaliar (Evaluate), Dirigir (Direct) e Monitorar (Monitor).',
      whenToUse:
        'Ao definir papéis estratégicos do Conselho de Administração, alinhamento de investimentos e limites de tolerância a risco corporativo.',
      whenNotToUse:
        'Não deve ser usada como manual de procedimentos operacionais ou esteira técnica de codificação (papel do ITIL/DevOps).',
      realWorldExample:
        'O Conselho de Administração da Nexora determina que a TI não pode ter risco residual acima de 10 e exige auditorias semestrais de continuidade.',
      commonPitfall:
        'Confundir Governança com Gestão, achando que o Conselho deve decidir qual banco de dados comprar.',
      quiz: {
        id: 'q-iso38500',
        question: 'Qual é o modelo fundamental de atuação da governança corporativa preconizado pela ISO/IEC 38500?',
        options: [
          {
            id: 'opt-a',
            text: 'EDM: Avaliar (Evaluate), Dirigir (Direct) e Monitorar (Monitor)',
            isCorrect: true,
            explanation: 'Correto! O modelo EDM define que os dirigentes avaliam o uso atual e futuro da TI, dirigem a preparação de planos e monitoram a conformidade e o desempenho.',
          },
          {
            id: 'opt-b',
            text: 'PDCA: Planejar, Fazer, Checar e Agir em nível operacional de código',
            isCorrect: false,
            explanation: 'Incorreto. O ciclo PDCA é voltado à melhoria contínua de processos operacionais (Lean/ISO 9001), enquanto a ISO 38500 foca na governança do Conselho (EDM).',
          },
          {
            id: 'opt-c',
            text: 'Scrum: Sprints semanais e reuniões diárias de 15 minutos',
            isCorrect: false,
            explanation: 'Incorreto. Scrum é uma metodologia ágil de gestão de projetos de equipe, e não governança corporativa.',
          },
        ],
      },
    },
    {
      id: 'itil-4',
      name: 'ITIL 4 (Information Technology Infrastructure Library)',
      category: 'ITSM',
      officialSource: 'PeopleCert / AXELOS',
      definition:
        'Framework de boas práticas para gerenciamento de serviços de TI (ITSM), centrado no Sistema de Valor de Serviço (SVS) e na co-criação de valor com clientes.',
      whenToUse:
        'Para desenhar e operar fluxos de Incidentes, Mudanças (CAB), Problemas (KEDB), Catálogo de Serviços e Acordos de Nível de Serviço (SLAs).',
      whenNotToUse:
        'Quando a organização tenta aplicar burocracia rígida sem adaptar os princípios orientadores ("Foque no valor", "Comece de onde você está").',
      realWorldExample:
        'Abertura de War Room estruturada com separação entre contenção de incidente P1 e posterior abertura de Problem Record para causa raiz.',
      commonPitfall:
        'Fechar chamados de incidentes repetitivos sem abrir um registro de Problema para tratar a causa raiz.',
      quiz: {
        id: 'q-itil4',
        question: 'No ITIL 4, qual é a diferença fundamental entre Gerenciamento de Incidentes e Gerenciamento de Problemas?',
        options: [
          {
            id: 'opt-a',
            text: 'Incidentes focam em restabelecer a operação normal o mais rápido possível; Problemas focam em identificar e eliminar a causa raiz subjacente.',
            isCorrect: true,
            explanation: 'Exato! A prioridade do incidente é o restabelecimento do serviço (contenção/workaround). A prioridade do problema é a investigação definitiva da causa.',
          },
          {
            id: 'opt-b',
            text: 'Problemas são incidentes que custam mais de R$ 10.000 para a empresa.',
            isCorrect: false,
            explanation: 'Incorreto. O valor financeiro não define a classificação de ITSM.',
          },
          {
            id: 'opt-c',
            text: 'Incidentes são abertos por clientes e Problemas são abertos pela Diretoria Executiva.',
            isCorrect: false,
            explanation: 'Incorreto. Problemas podem ser abertos proativamente por qualquer equipe técnica após incidentes recorrentes ou análises de telemetria.',
          },
        ],
      },
    },
    {
      id: 'iso-27001',
      name: 'ISO/IEC 27001:2022 (Segurança da Informação)',
      category: 'Segurança',
      officialSource: 'ISO / IEC',
      definition:
        'Padrão internacional para implementação de um Sistema de Gestão de Segurança da Informação (SGSI), preservando Confidencialidade, Integridade e Disponibilidade (CID).',
      whenToUse:
        'Ao implementar controles de controle de acesso (IAM), gestão de vulnerabilidades, resposta a incidentes de vazamento e conscientização.',
      whenNotToUse:
        'Para tentar blindar sistemas com bloqueios excessivos que inviabilizem o funcionamento do negócio.',
      realWorldExample:
        'Bloqueio automático de credenciais de ex-funcionários no prazo máximo de 1 hora após rescisão (Controle A.9.2.6).',
      commonPitfall:
        'Assinar políticas de segurança no papel que nunca são verificadas por auditorias técnicas ou automações.',
      quiz: {
        id: 'q-iso27001',
        question: 'O princípio do menor privilégio (Least Privilege) exige que:',
        options: [
          {
            id: 'opt-a',
            text: 'Cada usuário e processo tenha apenas os acessos estritamente necessários para executar suas atribuições funcionais legítimas.',
            isCorrect: true,
            explanation: 'Perfeito! Evita a concessão de perfis de superusuário generalizados, mitigando riscos de exfiltração de dados e abusos de privilégios.',
          },
          {
            id: 'opt-b',
            text: 'Todos os desenvolvedores tenham acesso de gravação direta ao banco de produção para corrigir bugs rápido.',
            isCorrect: false,
            explanation: 'Gravíssimo anti-padrão de segurança que viola a segregação de ambientes e a ISO 27001.',
          },
        ],
      },
    },
    {
      id: 'cobit-2019',
      name: 'COBIT 2019 (Governança e Gestão de TI Empresarial)',
      category: 'Governança',
      officialSource: 'ISACA',
      definition:
        'Framework abrangente que conecta os objetivos corporativos de negócio aos objetivos de TI através de 40 objetivos de governança e gestão agrupados em 5 domínios (EDM, APO, BAI, DSS, MEA).',
      whenToUse:
        'Para alinhar a estratégia de TI com a diretoria executiva, mensurar maturidade de processos e justificar orçamentos de tecnologia perante acionistas.',
      whenNotToUse:
        'Como manual de implementação técnica de código ou configuração de redes.',
      realWorldExample:
        'Aplicação do domínio DSS02 (Gerenciar Solicitações e Incidentes) para reduzir o MTTR de 48min para 30min na Nexora.',
      commonPitfall:
        'Tentar implementar todos os 40 objetivos simultaneamente sem priorizar os fatores de desenho específicos do negócio.',
      quiz: {
        id: 'q-cobit',
        question: 'Qual é a distinção primordial entre Governança e Gestão no COBIT 2019?',
        options: [
          {
            id: 'opt-a',
            text: 'Governança assegura que as necessidades dos stakeholders sejam avaliadas e dirigidas; Gestão planeja, constrói, executa e monitora as atividades sob a direção da Governança.',
            isCorrect: true,
            explanation: 'Exato! Governança é responsabilidade do Conselho/Board; Gestão é responsabilidade da Diretoria Executiva liderada pelo CEO/CIO.',
          },
          {
            id: 'opt-b',
            text: 'Governança trata de hardware; Gestão trata de software.',
            isCorrect: false,
            explanation: 'Incorreto. Essa divisão é anacrônica e não tem relação com o framework.',
          },
        ],
      },
    },
    {
      id: '5w2h',
      name: 'Metodologia 5W2H (Plano de Ação Corretiva & CAPA)',
      category: 'Qualidade',
      officialSource: 'Gestão da Qualidade Total / Lean',
      definition:
        'Ferramenta estruturada de planejamento que detalha: What (O que), Why (Por que), Where (Onde), When (Quando), Who (Quem), How (Como) e How Much (Quanto custa).',
      whenToUse:
        'Ao elaborar planos de ação para Não Conformidades (CAPA), projetos de melhoria contínua e mitigação de riscos críticos.',
      whenNotToUse:
        'Para tarefas triviais do dia a dia que não demandam investimento ou rastreabilidade de auditoria.',
      realWorldExample:
        'Plano 5W2H para implementar webhook de desativação de contas entre RH e Active Directory no valor de R$ 18.000 em 30 dias.',
      commonPitfall:
        'Criar planos vagos como "Treinar os colaboradores" sem definir o Como ou o Quanto custa.',
      quiz: {
        id: 'q-5w2h',
        question: 'Em uma auditoria de Não Conformidade (CAPA), por que um plano com "What: Treinar a equipe" é rotineiramente rejeitado?',
        options: [
          {
            id: 'opt-a',
            text: 'Porque treinamento é genérico e não ataca a causa raiz sistêmica, não estabelece métrica de efetividade nem prazo ou custo definidos.',
            isCorrect: true,
            explanation: 'Correto! Auditores exigem controles preventivos e estruturais que impeçam a repetição da falha mesmo na troca de operadores humanos.',
          },
          {
            id: 'opt-b',
            text: 'Porque treinamentos são proibidos pelas normas ISO.',
            isCorrect: false,
            explanation: 'Incorreto. Treinamentos são bem-vindos, mas não bastam como única ação corretiva para falhas sistêmicas.',
          },
        ],
      },
    },
    {
      id: 'raci',
      name: 'Matriz RACI (Responsabilidade & Governança)',
      category: 'Processos',
      officialSource: 'PMI / COBIT',
      definition:
        'Matriz de atribuição de responsabilidades que define: R (Responsible / Quem executa), A (Accountable / Dono que responde pelo resultado), C (Consulted / Quem deve ser consultado) e I (Informed / Quem deve ser informado).',
      whenToUse:
        'Em processos multifuncionais onde há atrito de autoridade (ex: CAB, contratação de nuvem, aprovação de requisitos).',
      whenNotToUse:
        'Quando atribuem mais de uma pessoa como "Accountable" para a mesma entrega, gerando diluição de culpa.',
      realWorldExample:
        'Na aprovação de mudanças emergenciais: Tech Lead é Responsible, CISO é Accountable, QA é Consulted e Suporte é Informed.',
      commonPitfall:
        'Nomear vários Accountables para o mesmo processo, o que faz com que ninguém assuma a responsabilidade real.',
      quiz: {
        id: 'q-raci',
        question: 'Qual regra de ouro da Matriz RACI NUNCA deve ser violada sob pena de diluição de responsabilidade?',
        options: [
          {
            id: 'opt-a',
            text: 'Deve existir EXATAMENTE UM Accountable (A) para cada atividade ou entrega.',
            isCorrect: true,
            explanation: 'Perfeito! "Se dois são donos, ninguém é dono." Pode haver múltiplos Responsibles (R), mas somente um Accountable (A).',
          },
          {
            id: 'opt-b',
            text: 'Todos os funcionários devem ser Informed (I) em todas as reuniões.',
            isCorrect: false,
            explanation: 'Incorreto. Isso causa sobrecarga cognitiva e spam desnecessário.',
          },
        ],
      },
    },
    {
      id: 'sre-sli-slo',
      name: 'SRE: SLI, SLO e Error Budget (Site Reliability Engineering)',
      category: 'Confiabilidade SRE',
      officialSource: 'Google SRE Book',
      definition:
        'Disciplina de engenharia que aplica práticas de software a problemas de operações. SLI (Service Level Indicator) é a métrica real medida; SLO (Service Level Objective) é a meta interna acordada; Error Budget é a margem de falha tolerada para inovar com segurança.',
      whenToUse:
        'Ao negociar a velocidade de deploys contra a estabilidade da plataforma entre times de Produto e Engenharia.',
      whenNotToUse:
        'Exigir 100% de disponibilidade irrealista, pois o custo marginal entre 99.9% e 100% é astronômico e paralisa lançamentos.',
      realWorldExample:
        'Na Nexora, se o Error Budget mensal de 0.1% de erros 5xx esgotar, os deploys de novas features são congelados e o time foca exclusivamente em confiabilidade.',
      commonPitfall:
        'Estabelecer um SLA externo mais rigoroso do que o SLO interno, deixando a empresa sem margem de aviso prévio.',
      quiz: {
        id: 'q-sre',
        question: 'O que acontece quando uma squad de produto esgota seu "Error Budget" no modelo SRE do Google?',
        options: [
          {
            id: 'opt-a',
            text: 'Os deploys de novas funcionalidades são pausados temporariamente e o foco da equipe é direcionado para resiliência e correção de bugs.',
            isCorrect: true,
            explanation: 'Exato! O Error Budget é o mecanismo matemático que alinha Produto e Operações: quando o orçamento de erro acaba, a estabilidade vira prioridade absoluta.',
          },
          {
            id: 'opt-b',
            text: 'Todos os engenheiros recebem advertência formal no RH.',
            isCorrect: false,
            explanation: 'Incorreto. A cultura SRE é blameless (sem culpabilização). O erro é visto como oportunidade de aprendizado.',
          },
        ],
      },
    },
  ];

  const [selectedTopic, setSelectedTopic] = useState<LibraryTopic>(topics[0]);
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState<'content' | 'quiz' | 'builder' | 'compare'>('content');
  const [userQuizAnswers, setUserQuizAnswers] = useState<Record<string, string>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<Record<string, boolean>>({});

  // 5W2H Builder State
  const [builderWhat, setBuilderWhat] = useState('Implementar webhook de revogação imediata de credenciais');
  const [builderWhy, setBuilderWhy] = useState('Eliminar contas órfãs e atender controle A.9.2.6 da ISO 27001');
  const [builderWhere, setBuilderWhere] = useState('Integração entre ERP Senior (RH) e Active Directory / GitLab');
  const [builderWhen, setBuilderWhen] = useState('Prazo máximo de 30 dias (até o fechamento da auditoria)');
  const [builderWho, setBuilderWho] = useState('Squad de Integrações (Tech Lead: Rafael Lima)');
  const [builderHow, setBuilderHow] = useState('API REST disparada em tempo real no evento de demissão com conciliação diária');
  const [builderHowMuch, setBuilderHowMuch] = useState('R$ 18.000 (80 horas de desenvolvimento)');
  const [builderValidated, setBuilderValidated] = useState(false);

  const filteredTopics = topics.filter(
    (t) =>
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.definition.toLowerCase().includes(search.toLowerCase()) ||
      t.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelectQuizOption = (questionId: string, optionId: string) => {
    if (quizSubmitted[questionId]) return;
    setUserQuizAnswers((prev) => ({ ...prev, [questionId]: optionId }));
  };

  const handleVerifyQuiz = (topic: LibraryTopic) => {
    if (!topic.quiz) return;
    const selectedOptionId = userQuizAnswers[topic.quiz.id];
    if (!selectedOptionId) return;

    setQuizSubmitted((prev) => ({ ...prev, [topic.quiz!.id]: true }));
    const chosenOption = topic.quiz.options.find((o) => o.id === selectedOptionId);

    if (chosenOption?.isCorrect) {
      awardXp(50, `Acerto no Quiz de Governança: "${topic.name}"!`);
    }
  };

  const handleValidateBuilder = () => {
    setBuilderValidated(true);
    awardXp(80, 'Plano de Ação Corretiva 5W2H estruturado e validado com sucesso!');
  };

  return (
    <div className="space-y-4 animate-in fade-in duration-150">
      {/* 2000s Tech Console Header */}
      <div className="bg-slate-900 border-2 border-slate-700/80 rounded-2xl p-4 sm:p-5 shadow-lg relative overflow-hidden">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2.5 mb-3 text-xs font-mono">
          <div className="flex items-center space-x-2 text-emerald-400 font-bold">
            <Terminal className="w-3.5 h-3.5" />
            <span>NEXORA_ACADEMY // KNOWLEDGE_BASE_V2000</span>
          </div>
          <span className="text-[10px] text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">
            EDUCAÇÃO EXECUTIVA & CERTIFICAÇÕES
          </span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-100 tracking-tight flex items-center space-x-2">
              <BookOpen className="w-5 h-5 text-indigo-400" />
              <span>Base Interativa de Governança, ITSM & Engenharia</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Treinamento prático para profissionais e universitários: domine ISO 38500, ITIL 4, COBIT 2019, ISO 27001 e SRE com simulados e ferramentas ativas.
            </p>
          </div>

          {/* Interactive Mode Switcher */}
          <div className="flex items-center space-x-1 bg-slate-950 p-1 rounded-xl border border-slate-800 shrink-0 text-xs font-medium">
            <button
              onClick={() => setActiveTab('content')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'content' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              📖 Diretrizes
            </button>
            <button
              onClick={() => setActiveTab('quiz')}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center space-x-1.5 ${
                activeTab === 'quiz' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>Simulado (+XP)</span>
            </button>
            <button
              onClick={() => setActiveTab('builder')}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center space-x-1.5 ${
                activeTab === 'builder' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-cyan-400" />
              <span>Laboratório 5W2H</span>
            </button>
            <button
              onClick={() => setActiveTab('compare')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'compare' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              ⚖️ Comparador
            </button>
          </div>
        </div>
      </div>

      {/* Main Split: Topics (Left) + Detail Reader (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Topic Selector */}
        <div className="lg:col-span-4 space-y-2.5">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 flex items-center space-x-2 text-xs">
            <Search className="w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Buscar norma, framework ou conceito..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent text-slate-200 placeholder-slate-500 focus:outline-none font-sans"
            />
          </div>

          <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
            {filteredTopics.map((topic) => {
              const isSelected = selectedTopic.id === topic.id;
              const hasAnsweredQuiz = topic.quiz && quizSubmitted[topic.quiz.id];

              return (
                <div
                  key={topic.id}
                  onClick={() => setSelectedTopic(topic)}
                  className={`p-3.5 rounded-xl border text-xs transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-slate-900 border-indigo-500 shadow-md ring-1 ring-indigo-500/30'
                      : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] text-cyan-400 font-bold uppercase font-mono tracking-wider">
                      {topic.category}
                    </span>
                    {hasAnsweredQuiz && (
                      <span className="text-[10px] text-emerald-400 font-bold flex items-center space-x-1">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Quiz Concluído</span>
                      </span>
                    )}
                  </div>
                  <h4 className="font-bold text-slate-100 text-xs mb-1">{topic.name}</h4>
                  <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">{topic.definition}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Interactive Area */}
        <div className="lg:col-span-8">
          {/* TAB 1: Theory & Guidelines */}
          {activeTab === 'content' && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-7 shadow-xl space-y-4 text-xs animate-in fade-in duration-150">
              <div className="pb-3 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="text-[10px] bg-indigo-950 text-indigo-300 border border-indigo-800 px-2 py-0.5 rounded font-bold uppercase font-mono">
                    {selectedTopic.category} • Fonte Oficial: {selectedTopic.officialSource}
                  </span>
                  <h3 className="text-lg sm:text-xl font-black text-slate-100 mt-1">{selectedTopic.name}</h3>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveTab('quiz')}
                  className="px-3 py-1.5 bg-indigo-600/30 hover:bg-indigo-600 border border-indigo-500 text-indigo-200 hover:text-white rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-colors self-start sm:self-auto"
                >
                  <Award className="w-3.5 h-3.5 text-amber-400" />
                  <span>Testar Conhecimento (+XP)</span>
                </button>
              </div>

              <div className="space-y-1">
                <strong className="text-slate-400 uppercase text-[10px] tracking-wider font-mono block">
                  Definição Técnica & Conceitual:
                </strong>
                <p className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-slate-200 leading-relaxed text-xs">
                  {selectedTopic.definition}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="bg-slate-950 p-3.5 rounded-xl border border-emerald-900/40 space-y-1">
                  <strong className="text-emerald-400 uppercase text-[10px] tracking-wider font-mono flex items-center space-x-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Quando Utilizar:</span>
                  </strong>
                  <p className="text-slate-300 leading-relaxed text-[11px]">{selectedTopic.whenToUse}</p>
                </div>

                <div className="bg-slate-950 p-3.5 rounded-xl border border-rose-900/40 space-y-1">
                  <strong className="text-rose-400 uppercase text-[10px] tracking-wider font-mono flex items-center space-x-1.5">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>Quando NÃO Utilizar:</span>
                  </strong>
                  <p className="text-slate-300 leading-relaxed text-[11px]">{selectedTopic.whenNotToUse}</p>
                </div>
              </div>

              <div className="bg-slate-950 p-3.5 rounded-xl border border-cyan-900/40 space-y-1">
                <strong className="text-cyan-400 uppercase text-[10px] tracking-wider font-mono block">
                  Aplicação Concreta na Nexora Digital:
                </strong>
                <p className="text-slate-200 leading-relaxed font-medium text-xs">
                  "{selectedTopic.realWorldExample}"
                </p>
              </div>

              <div className="bg-amber-950/20 p-3.5 rounded-xl border border-amber-800/40 space-y-1 text-amber-200">
                <strong className="text-amber-400 uppercase text-[10px] tracking-wider font-mono block">
                  Erro Típico no Mercado Corporativo (Anti-Padrão):
                </strong>
                <p className="text-xs leading-relaxed">{selectedTopic.commonPitfall}</p>
              </div>
            </div>
          )}

          {/* TAB 2: Interactive Quiz Simulation with Real XP */}
          {activeTab === 'quiz' && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-7 shadow-xl space-y-4 text-xs animate-in fade-in duration-150">
              <div className="pb-3 border-b border-slate-800 flex items-center justify-between">
                <div>
                  <div className="flex items-center space-x-2 text-amber-400 font-mono text-[10px] uppercase font-bold">
                    <Award className="w-4 h-4" />
                    <span>Simulado Prático de Certificação & Avaliação Universitária</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-100 mt-1">
                    {selectedTopic.name}
                  </h3>
                </div>
                <span className="text-[10px] font-mono bg-emerald-950 text-emerald-300 border border-emerald-700 px-2 py-0.5 rounded font-bold">
                  Valendo +50 XP
                </span>
              </div>

              {selectedTopic.quiz ? (
                <div className="space-y-4">
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <p className="text-sm font-semibold text-slate-100 leading-relaxed">
                      {selectedTopic.quiz.question}
                    </p>
                  </div>

                  <div className="space-y-2">
                    {selectedTopic.quiz.options.map((opt) => {
                      const isSelected = userQuizAnswers[selectedTopic.quiz!.id] === opt.id;
                      const hasSubmitted = quizSubmitted[selectedTopic.quiz!.id];
                      let borderClass = 'border-slate-800 hover:border-slate-700 bg-slate-950/80';

                      if (hasSubmitted) {
                        if (opt.isCorrect) {
                          borderClass = 'border-emerald-500 bg-emerald-950/40 text-emerald-200';
                        } else if (isSelected && !opt.isCorrect) {
                          borderClass = 'border-rose-500 bg-rose-950/40 text-rose-200';
                        }
                      } else if (isSelected) {
                        borderClass = 'border-indigo-500 bg-indigo-950/50 text-white';
                      }

                      return (
                        <div
                          key={opt.id}
                          onClick={() => handleSelectQuizOption(selectedTopic.quiz!.id, opt.id)}
                          className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start space-x-3 ${borderClass}`}
                        >
                          <div
                            className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 text-[10px] font-bold ${
                              isSelected
                                ? 'bg-indigo-600 border-indigo-400 text-white'
                                : 'border-slate-700 text-slate-400'
                            }`}
                          >
                            {hasSubmitted ? (
                              opt.isCorrect ? (
                                <Check className="w-3 h-3 text-emerald-400" />
                              ) : isSelected ? (
                                <X className="w-3 h-3 text-rose-400" />
                              ) : null
                            ) : (
                              opt.id.slice(-1).toUpperCase()
                            )}
                          </div>

                          <div className="flex-1 space-y-1">
                            <div className="text-xs text-slate-200">{opt.text}</div>
                            {hasSubmitted && (
                              <div
                                className={`text-[11px] p-2 rounded-lg mt-2 leading-relaxed ${
                                  opt.isCorrect
                                    ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-800/60'
                                    : 'bg-rose-950/60 text-rose-300 border border-rose-800/60'
                                }`}
                              >
                                {opt.explanation}
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-[11px] text-slate-400">
                      {quizSubmitted[selectedTopic.quiz.id]
                        ? 'Resposta registrada no seu prontuário de competência.'
                        : 'Selecione a melhor alternativa técnica.'}
                    </span>

                    {!quizSubmitted[selectedTopic.quiz.id] ? (
                      <button
                        type="button"
                        disabled={!userQuizAnswers[selectedTopic.quiz.id]}
                        onClick={() => handleVerifyQuiz(selectedTopic)}
                        className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 disabled:opacity-40 text-white font-bold rounded-xl text-xs transition-all shadow-md"
                      >
                        Verificar Resposta
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => {
                          setQuizSubmitted((prev) => ({ ...prev, [selectedTopic.quiz!.id]: false }));
                        }}
                        className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-medium flex items-center space-x-1.5 transition-colors"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Refazer Questão</span>
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                <p className="text-slate-400">Nenhuma questão disponível para este tópico.</p>
              )}
            </div>
          )}

          {/* TAB 3: Interactive 5W2H Action Plan Builder */}
          {activeTab === 'builder' && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-7 shadow-xl space-y-4 text-xs animate-in fade-in duration-150">
              <div className="pb-3 border-b border-slate-800 flex items-center justify-between">
                <div>
                  <div className="flex items-center space-x-2 text-cyan-400 font-mono text-[10px] uppercase font-bold">
                    <FileSpreadsheet className="w-4 h-4" />
                    <span>Laboratório Prático: Construtor de Plano de Ação 5W2H (CAPA)</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-100 mt-1">
                    Elaboração de Resposta para Auditoria ISO 27001
                  </h3>
                </div>
                <span className="text-[10px] font-mono bg-indigo-950 text-indigo-300 border border-indigo-700 px-2 py-0.5 rounded font-bold">
                  Valendo +80 XP
                </span>
              </div>

              <p className="text-slate-300 text-xs leading-relaxed">
                Preencha os 7 campos fundamentais da metodologia 5W2H para sanar o apontamento de auditoria e submeta para validação técnica.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-300">1. WHAT (O que fazer):</label>
                  <input
                    type="text"
                    value={builderWhat}
                    onChange={(e) => setBuilderWhat(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs text-slate-200"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-300">2. WHY (Por que fazer):</label>
                  <input
                    type="text"
                    value={builderWhy}
                    onChange={(e) => setBuilderWhy(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs text-slate-200"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-300">3. WHERE (Onde):</label>
                  <input
                    type="text"
                    value={builderWhere}
                    onChange={(e) => setBuilderWhere(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs text-slate-200"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-300">4. WHEN (Quando / Prazo):</label>
                  <input
                    type="text"
                    value={builderWhen}
                    onChange={(e) => setBuilderWhen(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs text-slate-200"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-300">5. WHO (Quem é o responsável):</label>
                  <input
                    type="text"
                    value={builderWho}
                    onChange={(e) => setBuilderWho(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs text-slate-200"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-300">6. HOW MUCH (Quanto custa):</label>
                  <input
                    type="text"
                    value={builderHowMuch}
                    onChange={(e) => setBuilderHowMuch(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs text-slate-200"
                  />
                </div>

                <div className="sm:col-span-2 space-y-1">
                  <label className="text-[11px] font-bold text-slate-300">7. HOW (Como será executado tecnicamente):</label>
                  <textarea
                    rows={2}
                    value={builderHow}
                    onChange={(e) => setBuilderHow(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs text-slate-200"
                  />
                </div>
              </div>

              {builderValidated && (
                <div className="bg-emerald-950/60 border border-emerald-500/80 p-3.5 rounded-xl text-emerald-200 space-y-1 animate-in fade-in">
                  <div className="flex items-center space-x-2 font-bold text-xs">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Plano Aprovado pelo Comitê de Auditoria Interna!</span>
                  </div>
                  <p className="text-[11px] text-emerald-300">
                    O plano 5W2H é específico, mensurável e mitiga o risco de contas inativas na raiz sem depender de lembretes manuais. +80 XP concedidos ao seu perfil!
                  </p>
                </div>
              )}

              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={handleValidateBuilder}
                  className="px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-slate-950 font-black rounded-xl text-xs uppercase tracking-wider transition-all shadow-lg"
                >
                  Validar & Homologar Plano 5W2H
                </button>
              </div>
            </div>
          )}

          {/* TAB 4: Framework Comparison Matrix */}
          {activeTab === 'compare' && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-7 shadow-xl space-y-4 text-xs animate-in fade-in duration-150">
              <div className="pb-3 border-b border-slate-800">
                <div className="flex items-center space-x-2 text-cyan-400 font-mono text-[10px] uppercase font-bold">
                  <Layers className="w-4 h-4" />
                  <span>Matriz de Comparação Estratégica</span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-100 mt-1">
                  Qual Framework Usar em Cada Cenário Organizacional?
                </h3>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-800 bg-slate-950 text-slate-400 font-mono text-[11px]">
                      <th className="p-2.5">Framework / Norma</th>
                      <th className="p-2.5">Foco Principal</th>
                      <th className="p-2.5">Público-Alvo</th>
                      <th className="p-2.5">Principal Entrega</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-slate-300 text-[11px]">
                    <tr className="hover:bg-slate-850/50">
                      <td className="p-2.5 font-bold text-indigo-400">ISO/IEC 38500</td>
                      <td className="p-2.5">Governança Corporativa de TI (EDM)</td>
                      <td className="p-2.5">Conselho de Administração, CEO, C-Level</td>
                      <td className="p-2.5">Políticas de investimento, tolerância a risco e diretrizes estratégicas</td>
                    </tr>
                    <tr className="hover:bg-slate-850/50">
                      <td className="p-2.5 font-bold text-cyan-400">COBIT 2019</td>
                      <td className="p-2.5">Alinhamento Estratégico Negócio-TI</td>
                      <td className="p-2.5">CIO, Gerentes de Governança, Auditores</td>
                      <td className="p-2.5">40 Objetivos de Governança e Gestão, Matriz RACI corporativa</td>
                    </tr>
                    <tr className="hover:bg-slate-850/50">
                      <td className="p-2.5 font-bold text-emerald-400">ITIL 4</td>
                      <td className="p-2.5">Gerenciamento de Serviços de TI (ITSM)</td>
                      <td className="p-2.5">Operações, Suporte, Service Desk, SRE</td>
                      <td className="p-2.5">Gestão de Incidentes, Mudanças (CAB), Problemas (KEDB), SLAs</td>
                    </tr>
                    <tr className="hover:bg-slate-850/50">
                      <td className="p-2.5 font-bold text-rose-400">ISO/IEC 27001</td>
                      <td className="p-2.5">Sistema de Gestão de Segurança (SGSI)</td>
                      <td className="p-2.5">CISO, DPO, Equipe de SecOps, Auditores</td>
                      <td className="p-2.5">Preservação de CID, controles de acesso IAM, resposta a incidentes</td>
                    </tr>
                    <tr className="hover:bg-slate-850/50">
                      <td className="p-2.5 font-bold text-amber-400">Google SRE</td>
                      <td className="p-2.5">Engenharia de Confiabilidade</td>
                      <td className="p-2.5">Engenheiros de Software, DevOps, Arquitetos</td>
                      <td className="p-2.5">SLIs, SLOs, Error Budgets, Post-Mortem Blameless</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-[11px] text-slate-400 space-y-1">
                <span className="font-bold text-slate-200 block">Dica de Ouro para Entrevistas e Concursos:</span>
                <p>
                  "Governança (ISO 38500 / COBIT) decide <strong>O QUE</strong> e <strong>POR QUÊ</strong> deve ser feito. Gestão de Serviços (ITIL 4) e Engenharia (SRE / DevOps) decidem <strong>COMO</strong> e <strong>QUANDO</strong> executar com confiabilidade."
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
