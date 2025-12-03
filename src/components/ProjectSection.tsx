
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TreePine, Droplets, Wind, AlertTriangle } from 'lucide-react';

const ProjectSection = () => {
  const challenges = [
    {
      icon: TreePine,
      title: "Déforestation massive",
      description: "Le Sahara avance de 5-10 km/an dans les forêts tropicales, accélérant la désertification",
      stats: "5-10 km/an"
    },
    {
      icon: Droplets,
      title: "Montée des eaux",
      description: "Plus d'1 milliard de personnes devront migrer d'ici 2050 selon l'ONU",
      stats: "+1 Md migrants"
    },
    {
      icon: Wind,
      title: "Dérèglement climatique",
      description: "Urgence d'agir face aux changements environnementaux globaux",
      stats: "Urgence maximale"
    },
    {
      icon: AlertTriangle,
      title: "Solutions coûteuses",
      description: "Les méthodes actuelles (hélicoptères, avions) sont onéreuses et polluantes",
      stats: "Très coûteux"
    }
  ];

  return (
    <section id="project" className="py-24 bg-muted/10 relative">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/3 to-secondary/3"></div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-foreground">
              Face à l'urgence climatique mondiale
            </h2>
            <p className="text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed text-foreground/80">
              Notre projet GAIA répond aux défis environnementaux majeurs de notre époque 
              par une approche technologique innovante et durable.
            </p>
          </div>

          {/* Enhanced Project Overview */}
          <div className="mb-16">
            <div className="card-professional bg-gradient-to-r from-primary/8 via-secondary/8 to-accent/8 p-10 text-center">
              <h3 className="text-2xl md:text-3xl font-display font-semibold mb-4 text-primary">Problématique</h3>
              <p className="text-xl md:text-2xl leading-relaxed max-w-5xl mx-auto text-foreground/85">
                Comment utiliser les technologies aériennes pour accélérer la reforestation 
                et restaurer durablement les écosystèmes dégradés face à l'urgence climatique mondiale ?
              </p>
            </div>
          </div>

          {/* Premium Challenges Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {challenges.map((challenge, index) => (
              <div 
                key={index} 
                className="card-professional group hover:scale-[1.01] transition-all duration-200" 
              >
                <div className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/15 transition-colors duration-200">
                        <challenge.icon className="h-7 w-7 text-primary" />
                      </div>
                      <h3 className="text-lg font-display font-bold text-foreground">{challenge.title}</h3>
                    </div>
                    <div className="text-sm font-display font-semibold text-primary bg-primary/10 px-3 py-1.5 rounded-lg">
                      {challenge.stats}
                    </div>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">{challenge.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectSection;
