
import { Zap, Leaf, Wind, Sparkles } from 'lucide-react';

const SolutionSection = () => {
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
    <section id="solution" className="py-24 bg-gradient-to-b from-background to-muted/10 relative">
      {/* Subtle background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 opacity-20">
          <Sparkles className="h-20 w-20 text-primary/30" />
        </div>
        <div className="absolute bottom-32 left-16 opacity-20">
          <Wind className="h-16 w-16 text-accent/30" />
        </div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-foreground">
              Notre Solution : GAIA
            </h2>
            <p className="text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed text-foreground/80">
              Un avion 100% électrique intelligent avec batterie haute capacité, 
              muni d'une soute pour larguer des Seedballs. Une solution écologique, économique 
              et sécurisée pour accélérer la reforestation mondiale.
            </p>
          </div>

          {/* Key Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {keyBenefits.map((benefit, index) => (
              <div 
                key={index}
                className="card-professional group text-center p-8" 
              >
                <div className={`mx-auto w-16 h-16 bg-gradient-to-br ${benefit.gradient} rounded-xl flex items-center justify-center mb-5 group-hover:scale-105 transition-transform duration-200`}>
                  <benefit.icon className={`h-8 w-8 ${benefit.color}`} />
                </div>
                <h3 className={`text-xl font-display font-bold mb-3 ${benefit.color}`}>
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>

          {/* Future Vision */}
          <div className="max-w-4xl mx-auto">
            <div className="card-professional bg-gradient-to-r from-primary/10 to-secondary/10 p-10 text-center">
              <div className="flex justify-center mb-5">
                <div className="p-3 bg-primary/10 rounded-xl">
                  <Sparkles className="h-10 w-10 text-primary" />
                </div>
              </div>
              <h3 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-5">Vision d'Avenir</h3>
              <p className="text-lg md:text-xl leading-relaxed text-foreground/85">
                Avec les progrès de l'aéronautique, GAIA pourra être produit à grande échelle 
                tout en restant écologique, notamment grâce aux futures technologies à hydrogène. 
                Une solution scalable pour un impact environnemental mondial.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
