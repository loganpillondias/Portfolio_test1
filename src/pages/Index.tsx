import { useState } from "react";
import { Github, Linkedin, Mail, Download, ExternalLink, Send, Sparkles, MessageCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const { toast } = useToast();
  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" });
  const [aiQuestion, setAiQuestion] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [isContactLoading, setIsContactLoading] = useState(false);

  // Skills data
  const skills = {
    frontend: ["React.js", "JavaScript", "HTML5", "CSS3", "Tailwind CSS"],
    backend: ["Node.js", "TypeScript", "Express", "PostgreSQL", "MySQL"],
    tools: ["Git", "GitHub", "VS Code", "Firebase"]
  };

  // Projects data
  const projects = [
    {
      title: "Sistema de Automação IA",
      description: "Plataforma completa de automação com IA para análise de dados e tomada de decisões inteligentes.",
      tech: ["React", "Node.js", "OpenAI", "PostgreSQL"],
      demo: "#",
      github: "#"
    },
    {
      title: "Dashboard Analytics",
      description: "Dashboard responsivo para visualização de métricas e KPIs em tempo real.",
      tech: ["React", "TypeScript", "Charts.js", "Express"],
      demo: "#",
      github: "#"
    },
    {
      title: "E-commerce Platform",
      description: "Plataforma de e-commerce completa com carrinho, pagamentos e painel administrativo.",
      tech: ["React", "Node.js", "Stripe", "MongoDB"],
      demo: "#",
      github: "#"
    }
  ];

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsContactLoading(true);
    
    try {
      // TODO: Integrate Firebase Firestore here
      // After saving to Firestore, a webhook to N8N would be triggered
      // for further automation (email notifications, CRM integration, etc.)
      
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      toast({
        title: "Mensagem enviada!",
        description: "Obrigado pelo contato. Responderei em breve!",
      });
      
      setContactForm({ name: "", email: "", message: "" });
    } catch (error) {
      toast({
        title: "Erro ao enviar",
        description: "Por favor, tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsContactLoading(false);
    }
  };

  const handleAiQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiQuestion.trim()) return;
    
    setIsAiLoading(true);
    setAiResponse("");
    
    try {
      const { data, error } = await supabase.functions.invoke('ai-assistant', {
        body: { question: aiQuestion }
      });

      if (error) throw error;

      if (data?.answer) {
        setAiResponse(data.answer);
        setAiQuestion("");
      } else {
        throw new Error("Resposta inválida do servidor");
      }
    } catch (error: any) {
      console.error("Erro ao processar pergunta:", error);
      toast({
        title: "Erro ao processar pergunta",
        description: error.message || "Por favor, tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsAiLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl md:text-2xl font-bold text-gradient">Logan Pillon Dias | Desenvolvedor</h1>
          <div className="hidden md:flex gap-6">
            <a href="#sobre" className="hover:text-primary transition-colors">Sobre</a>
            <a href="#habilidades" className="hover:text-primary transition-colors">Habilidades</a>
            <a href="#projetos" className="hover:text-primary transition-colors">Projetos</a>
            <a href="#contato" className="hover:text-primary transition-colors">Contato</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-radial opacity-30"></div>
        <div className="container mx-auto px-4 z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8 animate-float">
              <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-primary to-emerald-400 p-1">
                <div className="w-full h-full rounded-full bg-card flex items-center justify-center text-4xl font-bold text-gradient">
                  LP
                </div>
              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="text-gradient glow-text">Logan Pillon Dias</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-4">
              Desenvolvedor Full Stack
            </p>
            
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Em transição de carreira. Do setor industrial à Tecnologia e Inovação
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center mb-8">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground glow-border">
                <a href="#projetos">Ver Projetos</a>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                <a href="/curriculo.pdf" download>
                  <Download className="mr-2 h-4 w-4" />
                  Download CV
                </a>
              </Button>
            </div>
            
            <div className="flex gap-4 justify-center">
              <Button asChild variant="ghost" size="icon" className="hover:text-primary hover:scale-110 transition-all">
                <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                  <Github className="h-5 w-5" />
                </a>
              </Button>
              <Button asChild variant="ghost" size="icon" className="hover:text-primary hover:scale-110 transition-all">
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="h-5 w-5" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="sobre" className="py-20 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-8 text-gradient">Sobre Mim</h2>
            <div className="space-y-4 text-lg text-muted-foreground">
              <p>
                Minha jornada na tecnologia começou com uma decisão ousada: deixar para trás 
                uma carreira consolidada no setor industrial para perseguir minha verdadeira paixão - 
                desenvolver soluções inovadoras através do código.
              </p>
              <p>
                Especializei-me em <span className="text-primary font-semibold">JavaScript</span>, 
                <span className="text-primary font-semibold"> React.js</span> e 
                <span className="text-primary font-semibold"> Node.js/TypeScript</span>, 
                criando aplicações web modernas e escaláveis. Minha experiência no setor industrial 
                me deu uma perspectiva única sobre automação, eficiência e resolução de problemas complexos.
              </p>
              <p>
                Hoje, combino minha experiência técnica com uma mentalidade orientada a resultados, 
                sempre buscando entregar produtos que façam a diferença no mundo real.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="habilidades" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center text-gradient">Habilidades Técnicas</h2>
          
          <div className="max-w-4xl mx-auto space-y-8">
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-primary">Front-end</h3>
              <div className="flex flex-wrap gap-3">
                {skills.frontend.map((skill) => (
                  <Badge key={skill} variant="secondary" className="text-base px-4 py-2 bg-secondary hover:bg-primary hover:text-primary-foreground transition-colors">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-primary">Back-end</h3>
              <div className="flex flex-wrap gap-3">
                {skills.backend.map((skill) => (
                  <Badge key={skill} variant="secondary" className="text-base px-4 py-2 bg-secondary hover:bg-primary hover:text-primary-foreground transition-colors">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-primary">Ferramentas</h3>
              <div className="flex flex-wrap gap-3">
                {skills.tools.map((skill) => (
                  <Badge key={skill} variant="secondary" className="text-base px-4 py-2 bg-secondary hover:bg-primary hover:text-primary-foreground transition-colors">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projetos" className="py-20 bg-card/50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center text-gradient">Projetos em Destaque</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {projects.map((project, index) => (
              <Card key={index} className="bg-card border-border hover:border-primary transition-all duration-300 hover:glow-border">
                <CardHeader>
                  <CardTitle className="text-xl">{project.title}</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    {project.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech) => (
                      <Badge key={tech} variant="outline" className="border-primary/50 text-primary">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Button asChild variant="outline" size="sm" className="flex-1 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                      <a href={project.demo} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Demo
                      </a>
                    </Button>
                    <Button asChild variant="outline" size="sm" className="flex-1 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        <Github className="mr-2 h-4 w-4" />
                        Código
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* AI Assistant Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <Card className="bg-card border-primary/50 glow-border">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Sparkles className="h-6 w-6 text-primary" />
                  <span className="text-gradient">AI Assistant - Pergunte ao Logan</span>
                </CardTitle>
                <CardDescription>
                  Faça perguntas sobre meu portfólio, habilidades ou experiência
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAiQuestion} className="space-y-4">
                  <Input
                    placeholder="Ex: Quais são suas principais habilidades?"
                    value={aiQuestion}
                    onChange={(e) => setAiQuestion(e.target.value)}
                    className="bg-secondary border-border focus:border-primary"
                  />
                  <Button type="submit" disabled={isAiLoading || !aiQuestion.trim()} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                    {isAiLoading ? "Processando..." : "Perguntar"}
                    <Send className="ml-2 h-4 w-4" />
                  </Button>
                </form>
                
                {aiResponse && (
                  <div className="mt-6 p-4 bg-secondary rounded-lg border border-primary/30">
                    <p className="text-foreground">{aiResponse}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contato" className="py-20 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-4xl font-bold mb-4 text-center text-gradient">Vamos Desenvolver Algo Juntos?</h2>
            <p className="text-center text-muted-foreground mb-8">
              Estou sempre aberto a novos projetos e oportunidades
            </p>
            
            <Card className="bg-card border-border">
              <CardContent className="pt-6">
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div>
                    <Input
                      placeholder="Seu Nome"
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      required
                      className="bg-secondary border-border focus:border-primary"
                    />
                  </div>
                  
                  <div>
                    <Input
                      type="email"
                      placeholder="Seu Email"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      required
                      className="bg-secondary border-border focus:border-primary"
                    />
                  </div>
                  
                  <div>
                    <Textarea
                      placeholder="Sua Mensagem"
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      required
                      rows={5}
                      className="bg-secondary border-border focus:border-primary resize-none"
                    />
                  </div>
                  
                  <Button type="submit" disabled={isContactLoading} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground glow-border">
                    {isContactLoading ? "Enviando..." : "Enviar Mensagem"}
                    <Mail className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">
            © 2025 Logan Pillon Dias. Desenvolvido com React, TypeScript e ❤️
          </p>
        </div>
      </footer>

      {/* WhatsApp Button */}
      <a
        href="https://wa.me/5511999999999"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-full p-4 shadow-lg transition-all hover:scale-110 glow-border"
        aria-label="Contato via WhatsApp"
      >
        <MessageCircle className="h-6 w-6" />
      </a>
    </div>
  );
};

export default Index;
