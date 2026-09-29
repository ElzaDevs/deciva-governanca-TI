import { GoogleGenAI } from '@google/genai';

export type GovMentorMode = 'socratic' | 'hint' | 'explain' | 'review' | 'challenge' | 'interview';

interface MentorRequest {
  mode: GovMentorMode;
  userMessage: string;
  context: {
    currentMissionTitle?: string;
    studentRole?: string;
    companyHealth?: number;
    activeIncidentCode?: string;
    currentTrack?: string;
  };
}

export async function askGovMentor({ mode, userMessage, context }: MentorRequest): Promise<string> {
  const apiKey = (typeof process !== 'undefined' && process.env?.GEMINI_API_KEY) || '';

  const systemInstructions: Record<GovMentorMode, string> = {
    socratic: `Você é o GOV-MENTOR no modo SOCRÁTICO na empresa virtual Nexora Digital.
Seu objetivo é fazer o estudante pensar por si mesmo. NÃO entregue a resposta pronta.
Faça 2 perguntas investigativas que guiem o estudante a refletir sobre:
1. Quais evidências ele tem ou deixou de coletar;
2. Quais são os riscos e efeitos colaterais de sua hipótese.
Seja profissional, cortês e realista como um mentor sênior de TI e Governança corporativa.`,

    hint: `Você é o GOV-MENTOR no modo PISTA GRADUAL.
Dê uma dica objetiva e prática sem resolver a missão para o estudante.
Aponte onde na empresa ele deve procurar a evidência (ex: logs de banco, matriz RTM, contratos de SLA, atas de CAB).`,

    explain: `Você é o GOV-MENTOR no modo EXPLICAÇÃO CONCEITUAL E PRÁTICA.
Explique o conceito de engenharia de software ou governança de forma didática com:
- Definição clara;
- Exemplo no contexto da Nexora Digital;
- Anti-exemplo comum que causa falhas;
- Referência prática (ISO 38500, ITIL, ISO 27001 ou boas práticas de Clean Architecture).`,

    review: `Você é o GOV-MENTOR no modo REVISÃO CRÍTICA.
Avalie o raciocínio apresentado pelo estudante.
Destaque:
- O que está correto e bem fundamentado;
- O que está frágil ou superficial (ex: confundir sintoma com causa raiz, aceitar adjetivos vagos em requisitos);
- Pontuação de 0 a 10 e recomendação de melhoria.`,

    challenge: `Você é o GOV-MENTOR no modo DESAFIO (HARD MODE).
Apresente uma complicação inesperada ou caso de borda realista para testar a resiliência do estudante (ex: "E se o cliente exigir isso em 24h sem orçamento?", "E se o backup também estiver corrompido?").`,

    interview: `Você é o GOV-MENTOR no modo SIMULADOR DE ENTREVISTA TÉCNICA E GOVERNANÇA.
Faça perguntas de nível profissional para vagas de Analista de Governança, Engenharia de Requisitos ou ITSM. Avalie a clareza, raciocínio e maturidade da resposta do candidato.`,
  };

  if (apiKey) {
    try {
      const ai = new GoogleGenAI();
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [
          {
            role: 'user',
            parts: [
              {
                text: `${systemInstructions[mode]}

Contexto da Nexora Digital:
- Cargo do estudante: ${context.studentRole || 'Analista Júnior'}
- Missão atual: ${context.currentMissionTitle || 'Geral'}
- Saúde da empresa: ${context.companyHealth || 78}/100
- Incidente ativo: ${context.activeIncidentCode || 'Nenhum'}

Mensagem do estudante:
"${userMessage}"`,
              },
            ],
          },
        ],
      });

      if (response.text) {
        return response.text;
      }
    } catch {
      // Fallback gracefully to high-fidelity expert logic
    }
  }

  // Pedagogical high-fidelity fallback responses
  const fallbacks: Record<GovMentorMode, string> = {
    socratic: `Interessante abordagem, Analista. Antes de darmos esse passo, considere:
1. Qual evidência empírica (log, métrica ou contrato) comprova que sua hipótese é a causa primária e não apenas um sintoma colateral?
2. Caso executemos essa ação agora em produção, qual seria o plano de reversão (rollback) se o comportamento for o oposto do esperado?
O que você responde a essas duas questões?`,

    hint: `💡 Pista do Mentor:
Dê uma olhada detalhada na aba de Incidentes (INC-1042) no log da consulta SQL. Note que uma query de relatório analítico está rodando há mais de 240 segundos no banco transacional primário. O que acontece com o connection pool quando muitas conexões ficam presas nessa mesma tabela?`,

    explain: `📘 Explicação do Mentor:
Na Engenharia de Requisitos e na Governança (ISO/IEC 38500), um requisito como "o sistema deve ser rápido" é considerado uma AMBIGUIDADE CRÍTICA.
- Por que é falho? Porque não permite teste objetivo. QA não sabe se 2 segundos é aceitável ou se deve ser 200ms.
- Como transformar em profissional? Defina o atributo de qualidade mensurável: "Sob carga concorrente de 500 requisições simultâneas, o percentil p95 da latência da rota /api/v1/billing não deve exceder 1.200ms."
- Anti-exemplo: Aceitar a palavra do stakeholder sem perguntar o impacto no fechamento contábil.`,

    review: `🔍 Revisão do Raciocínio:
Seu direcionamento foi acertado ao notar a sobrecarga de acessos, mas faltou aprofundar na causa raiz. Culpar o usuário por rodar um relatório é superficial: o papel da engenharia de software e da governança é proteger o banco com limites de execução (statement timeout) e réplicas de leitura para relatórios pesados.
Nota do raciocínio: 7.5/10. Excelente diagnóstico, agora refine a solução estrutural.`,

    challenge: `⚡ Desafio do Mentor:
O Diretor Comercial acabou de entrar na sua sala dizendo que um dos 10 maiores clientes ameaça cancelar um contrato de R$ 5 milhões se o deploy da funcionalidade não ocorrer HOJE, mesmo sem passar pelo CAB e sem testes de regressão.
Como você, como profissional de Governança e Engenharia, negocia com o Diretor sem ceder a um deploy destrutivo e sem desrespeitar o negócio?`,

    interview: `💼 Pergunta de Entrevista Técnica:
"Em uma situação em que você detecta uma Não Conformidade Maior de segurança durante uma auditoria interna, mas o gerente da área afetada afirma que corrigir aquilo vai atrasar a meta trimestral de vendas, como você procede? Qual framework ou instrumento de governança você utiliza para arbitrar o conflito?"`,
  };

  return fallbacks[mode] || fallbacks.explain;
}
