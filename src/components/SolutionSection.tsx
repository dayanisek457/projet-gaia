
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Battery, Package, Radio, Plane, Zap, Waves, Leaf, Wind, Sparkles } from 'lucide-react';

const SolutionSection = () => {
  const technicalSolutions = [
    {
      function: "Voler",
      block: "Motorisation", 
      solution: "Moteurs électriques",
      icon: Plane,
      color: "bg-blue-500"
    },
    {
      function: "Stocker",
      block: "Stockage",
      solution: "Soute à Seedballs",
      icon: Package,
      color: "bg-green-500"
    },
    {
      function: "Piloter",
      block: "Pilotage",
      solution: "Manette de commande",
      icon: Radio,
      color: "bg-purple-500"
    },
    {
      function: "Alimenter",
      block: "Énergie",
      solution: "Système de batterie avancé",
      icon: Battery,
      color: "bg-orange-500"
    },
    {
      function: "Flotter sur l'eau",
      block: "Flottaison",
      solution: "Flotteurs intégrés",
      icon: Waves,
      color: "bg-cyan-500"
    }
  ];

  const keyBenefits = [
    {
      icon: Zap,
      title: "100% Écologique",
      description: "Zéro émission de gaz à effet de serre grâce à la motorisation électrique",
      gradient: "from-primary/20 to-primary/10",
      color: "text-primary",
      border: "border-primary/30"
    },
    {
      icon: Wind,
      title: "Autonome",
      description: "Pas de risque humain, pilotage à distance et fonctionnement automatisé",
      gradient: "from-secondary/20 to-secondary/10",
      color: "text-secondary",
      border: "border-secondary/30"
    },
    {
      icon: Leaf,
      title: "Économique",
      description: "Alternative abordable aux hélicoptères et avions traditionnels",
      gradient: "from-accent/20 to-accent/10",
      color: "text-accent",
      border: "border-accent/30"
    }
  ];

  return (
    <section id="solution" className="py-32 bg-gradient-to-b from-background to-muted/30 relative">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 animate-float-slow">
          <Sparkles className="h-24 w-24 text-primary/10" />
        </div>
        <div className="absolute bottom-32 left-16 animate-float">
          <Wind className="h-20 w-20 text-accent/15" />
        </div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 animate-fade-in-up">
            <h2 className="text-section-title mb-8 font-display">
              Notre Solution : GAIA
            </h2>
            <p className="text-body-large max-w-4xl mx-auto leading-relaxed">
              Un avion 100% électrique intelligent avec batterie haute capacité, 
              muni d'une soute pour larguer des Seedballs. Une solution écologique, économique 
              et sécurisée pour accélérer la reforestation mondiale.
            </p>
          </div>

          {/* Premium Key Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
            {keyBenefits.map((benefit, index) => (
              <div 
                key={index}
                className="card-premium group text-center p-8 cinematic-glow animate-fade-in-up" 
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className={`mx-auto w-20 h-20 bg-gradient-to-br ${benefit.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-xl group-hover:scale-110 transition-all duration-500`}>
                  <benefit.icon className={`h-10 w-10 ${benefit.color}`} />
                </div>
                <h3 className={`text-2xl font-display font-bold mb-4 ${benefit.color}`}>
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>

          {/* Premium Technical Solutions */}
          <div className="mb-20 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <h3 className="text-subsection text-center mb-12 font-display">Solutions Techniques</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {technicalSolutions.map((item, index) => (
                <div 
                  key={index} 
                  className="card-premium group p-8 cinematic-glow hover:scale-105 transition-all duration-500"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center space-x-4 mb-6">
                    <div className={`p-4 rounded-2xl ${item.color} bg-opacity-15 shadow-xl group-hover:shadow-2xl transition-all duration-300 group-hover:scale-110`}>
                      <item.icon className={`h-8 w-8 ${item.color.replace('bg-', 'text-')}`} />
                    </div>
                    <div>
                      <h4 className="text-xl font-display font-bold text-foreground">{item.function}</h4>
                      <div className="mt-2">
                        <span className="text-sm font-display font-medium text-primary bg-primary/15 px-3 py-1 rounded-xl border border-primary/20">
                          {item.block}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="text-lg font-display font-semibold text-accent bg-accent/10 px-4 py-3 rounded-xl border border-accent/20">
                    {item.solution}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Premium Future Vision */}
          <div className="animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
            <div className="card-premium bg-gradient-hero text-white p-12 cinematic-glow relative overflow-hidden">
              <div className="absolute inset-0 bg-black/10"></div>
              <div className="relative z-10 text-center">
                <div className="flex justify-center mb-6">
                  <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm">
                    <Sparkles className="h-12 w-12 text-white" />
                  </div>
                </div>
                <h3 className="text-3xl font-display font-bold text-white mb-6">Vision d'Avenir</h3>
                <p className="text-white/95 text-xl leading-relaxed max-w-4xl mx-auto">
                  Avec les progrès de l'aéronautique, GAIA pourra être produit à grande échelle 
                  tout en restant écologique, notamment grâce aux futures technologies à hydrogène. 
                  Une solution scalable pour un impact environnemental mondial.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
