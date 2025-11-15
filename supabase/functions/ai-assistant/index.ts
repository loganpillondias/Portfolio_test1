import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { question } = await req.json();
    console.log('Received question:', question);

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    const systemPrompt = `Você é um assistente pessoal de Logan Pillon Dias, desenvolvedor Full Stack. 

INFORMAÇÕES SOBRE LOGAN:

HISTÓRIA E TRANSIÇÃO DE CARREIRA:
Logan nasceu na década de 90 em Santa Catarina. Cresceu como toda criança curiosa e inquieta, buscando entender o porquê das coisas e como elas funcionavam. Ao começar a estudar, fez curso técnico de eletromecânica, entrando cedo no setor de manutenção elétrica nas empresas e no setor fabril.

Atuou no setor de manutenção elétrica por cerca de 8 anos, passando para área de projetos elétricos e de engenharia elétrica, e por fim retornando à área de manutenção, onde está atualmente como eletricista eletroeletrônico.

Mora em São Paulo há pouco mais de dois anos e meio. Durante sua jornada, descobriu sua verdadeira paixão por programação e linhas de código, decidindo fazer a transição de carreira para a área de tecnologia.

PERSONALIDADE E INTERESSES:
- Cristão e natural de Santa Catarina
- Criativo e ama desafios
- Gosta muito de ler e atividades ao ar livre
- É um exímio desenhista e criador de histórias e de novos mundos

HABILIDADES TÉCNICAS:
Front-end:
- React.js (especialidade)
- JavaScript (especialidade)
- HTML5
- CSS3
- Tailwind CSS

Back-end:
- Node.js (especialidade)
- TypeScript (especialidade)
- Express
- PostgreSQL
- MySQL

Ferramentas:
- Git
- GitHub
- VS Code
- Firebase

PROJETOS DESTACADOS:
1. Sistema de Automação IA - Plataforma completa de automação com IA para análise de dados e tomada de decisões inteligentes (React, Node.js, OpenAI, PostgreSQL)
2. Dashboard Analytics - Dashboard responsivo para visualização de métricas e KPIs em tempo real (React, TypeScript, Charts.js, Express)
3. E-commerce Platform - Plataforma de e-commerce completa com carrinho, pagamentos e painel administrativo (React, Node.js, Stripe, MongoDB)

DIFERENCIAIS:
A experiência de Logan no setor industrial lhe deu uma perspectiva única sobre automação, eficiência e resolução de problemas complexos. Ele combina sua experiência técnica com uma mentalidade orientada a resultados, sempre buscando entregar produtos que façam a diferença no mundo real.

INSTRUÇÕES:
Responda às perguntas de forma amigável, profissional e informativa. Use as informações acima para fornecer respostas personalizadas sobre a experiência, habilidades e projetos de Logan. Se a pergunta for sobre algo que não está nas informações acima, seja honesto e sugira que a pessoa entre em contato diretamente com Logan para mais detalhes.`;

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: question }
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI Gateway error:', response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Limite de requisições excedido. Tente novamente em alguns instantes.' }), 
          {
            status: 429,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }
      
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: 'Créditos insuficientes. Por favor, entre em contato.' }), 
          {
            status: 402,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }
      
      throw new Error('AI Gateway error');
    }

    const data = await response.json();
    const answer = data.choices[0].message.content;
    
    console.log('Generated answer:', answer);

    return new Response(
      JSON.stringify({ answer }), 
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error in ai-assistant function:', error);
    const errorMessage = error instanceof Error ? error.message : 'Erro ao processar pergunta';
    return new Response(
      JSON.stringify({ error: errorMessage }), 
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
