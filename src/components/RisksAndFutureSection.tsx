import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  AlertTriangle, 
  CheckCircle, 
  TrendingUp, 
  Globe, 
  Zap, 
  Shield,
  Rocket,
  Users
} from 'lucide-react';

const RisksAndFutureSection = () => {
  const risks = [
    {
      icon: AlertTriangle,
      title: "Équilibrage de l'aéronef",
      description: "Risque de dysfonctionnement en vol nécessitant des tests approfondis",
      mitigation: "Tests de stabilité et simulations aérodynamiques"
    }
  ];

  const hypotheses = [
    {
      icon: CheckCircle,
      title: "Disponibilité matériaux",
      description: "Accès aux composants nécessaires pour la construction"
    },
    {
      icon: CheckCircle,
      title: "Adaptation climatique",
      description: "Seedballs adaptées aux conditions des zones ciblées"
    },
    {
      icon: CheckCircle,
      title: "Support technique",
      description: "Accompagnement du Lycée Saint-Joseph"
    }
  ];

  const futureVisions = [
    {
      icon: TrendingUp,
      title: "Production Grande Échelle",
      description: "Développement d'avions similaires pour projets internationaux",
      timeline: "2027-2030"
    },
    {
      icon: Zap,
      title: "Technologies Avancées",
      description: "Intégration de technologies hydrogène et IA avancée",
      timeline: "2028-2032"
    },
    {
      icon: Globe,
      title: "Collaboration Internationale",
      description: "Partenariats avec ONG et gouvernements pour impact maximum",
      timeline: "2026-2035"
    },
    {
      icon: Users,
      title: "Adaptabilité Multi-Usage",
      description: "Utilisation pour lutte anti-incendie et autres missions environnementales",
      timeline: "2029+"
    }
  ];

  return (
    <section id="risks-future" className="py-20 bg-gradient-to-br from-background to-muted/20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-section-title mb-6">
              Risques & Perspectives d'Avenir
            </h2>
            <p className="text-body max-w-3xl mx-auto">
              Une approche transparente de notre projet avec l'identification des risques, 
              nos hypothèses de travail et notre vision à long terme pour Gaia.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {/* Risks Section */}
            <div className="space-y-6 animate-slide-in-left">
              <div className="text-center">
                <h3 className="text-xl font-bold mb-4 flex items-center justify-center space-x-2">
                  <AlertTriangle className="h-6 w-6 text-orange-500" />
                  <span>Risques Identifiés</span>
                </h3>
              </div>
              {risks.map((risk, index) => (
                <Card key={index} className="border-orange-200 hover:shadow-lg transition-all duration-300">
                  <CardHeader className="pb-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-lg bg-orange-100">
                        <risk.icon className="h-5 w-5 text-orange-600" />
                      </div>
                      <CardTitle className="text-lg text-orange-800">{risk.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-muted-foreground">{risk.description}</p>
                    <div className="bg-green-50 p-3 rounded-lg border-l-4 border-green-400">
                      <p className="text-green-700 text-sm font-medium">
                        <strong>Mitigation:</strong> {risk.mitigation}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Hypotheses Section */}
            <div className="space-y-6 animate-slide-in-right">
              <div className="text-center">
                <h3 className="text-xl font-bold mb-4 flex items-center justify-center space-x-2">
                  <CheckCircle className="h-6 w-6 text-green-500" />
                  <span>Hypothèses de Travail</span>
                </h3>
              </div>
              {hypotheses.map((hypothesis, index) => (
                <Card key={index} className="border-green-200 hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-lg bg-green-100">
                        <hypothesis.icon className="h-5 w-5 text-green-600" />
                      </div>
                      <CardTitle className="text-lg text-green-800">{hypothesis.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{hypothesis.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Future Vision */}
          <div className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <div className="text-center mb-12">
              <h3 className="text-2xl font-bold mb-4 flex items-center justify-center space-x-2">
                <Rocket className="h-7 w-7 text-primary" />
                <span>Vision d'Avenir</span>
              </h3>
              <p className="text-body max-w-2xl mx-auto">
                Gaia n'est que le début. Découvrez notre roadmap pour révolutionner 
                la reforestation mondiale et créer un impact environnemental durable.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {futureVisions.map((vision, index) => (
                <Card 
                  key={index} 
                  className="group hover:shadow-xl transition-all duration-500 hover:scale-105 bg-gradient-to-br from-card to-card/50 border-2 hover:border-primary/30 animate-fade-in-up"
                  style={{ animationDelay: `${0.6 + index * 0.1}s` }}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="p-3 rounded-lg bg-gradient-to-br from-primary/10 to-secondary/10 group-hover:from-primary/20 group-hover:to-secondary/20 transition-colors">
                          <vision.icon className="h-6 w-6 text-primary" />
                        </div>
                        <CardTitle className="text-lg">{vision.title}</CardTitle>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {vision.timeline}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">{vision.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Impact Projection */}
          <Card className="mt-12 bg-gradient-primary text-white animate-fade-in-up" style={{ animationDelay: '1s' }}>
            <CardHeader>
              <CardTitle className="text-center text-white text-2xl">
                Impact Projeté à Long Terme
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div>
                  <div className="text-4xl font-bold text-white mb-2">1000+</div>
                  <div className="text-white/90 mb-2">Hectares Reboisés/An</div>
                  <div className="text-white/70 text-sm">D'ici 2030 avec la production en série</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-white mb-2">50+</div>
                  <div className="text-white/90 mb-2">Pays Partenaires</div>
                  <div className="text-white/70 text-sm">Réseau international de reforestation</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-white mb-2">-50%</div>
                  <div className="text-white/90 mb-2">Coût vs Méthodes Actuelles</div>
                  <div className="text-white/70 text-sm">Économies substantielles garanties</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default RisksAndFutureSection;