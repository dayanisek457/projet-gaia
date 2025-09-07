
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

  const projectData = [
    { label: "Début", value: "Juin 2025", icon: "🚀" },
    { label: "Fin", value: "Juin 2026", icon: "🎯" },
    { label: "Équipe", value: "5 étudiants", icon: "👥" }
  ];

  return (
    <section id="project" className="py-32 bg-muted/20 relative">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5"></div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 animate-fade-in-up">
            <h2 className="text-section-title mb-8 font-display">
              Face à l'urgence climatique mondiale
            </h2>
            <p className="text-body-large max-w-4xl mx-auto leading-relaxed">
              Notre projet GAIA répond aux défis environnementaux majeurs de notre époque 
              par une approche technologique innovante et durable.
            </p>
          </div>

          {/* Enhanced Project Overview */}
          <div className="mb-20 animate-fade-in-up">
            <div className="card-professional bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 p-12 text-center">
              <h3 className="text-subsection mb-6 font-display text-primary">Problématique</h3>
              <p className="text-body-large leading-relaxed max-w-5xl mx-auto">
                Comment utiliser les technologies aériennes pour accélérer la reforestation 
                et restaurer durablement les écosystèmes dégradés face à l'urgence climatique mondiale ?
              </p>
            </div>
          </div>

          {/* Premium Challenges Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            {challenges.map((challenge, index) => (
              <div 
                key={index} 
                className="card-professional group hover:scale-[1.01] transition-all duration-300 animate-fade-in-up" 
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <div className="p-4 rounded-2xl bg-primary/10 group-hover:bg-primary/20 transition-all duration-300 group-hover:scale-110">
                        <challenge.icon className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="text-xl font-display font-bold text-foreground">{challenge.title}</h3>
                    </div>
                    <div className="text-sm font-display font-bold text-primary bg-primary/15 px-4 py-2 rounded-xl border border-primary/20">
                      {challenge.stats}
                    </div>
                  </div>
                  <p className="text-muted-foreground leading-relaxed text-lg">{challenge.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Premium Project Timeline */}
          <div className="animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <div className="card-professional bg-gradient-hero text-white p-12 relative overflow-hidden">
              <div className="relative z-10">
                <div className="text-center mb-12">
                  <h3 className="text-3xl font-display font-bold text-white mb-4">Informations Projet</h3>
                  <p className="text-white/90 text-xl font-display">Lycée Saint-Joseph Dijon - Terminale Sciences de l'Ingénieur</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                  {projectData.map((item, index) => (
                    <div key={index} className="text-center p-8 glass rounded-2xl hover:scale-105 transition-all duration-300">
                      <div className="text-4xl mb-4">{item.icon}</div>
                      <div className="text-2xl font-display font-bold mb-2">{item.value}</div>
                      <div className="text-white/90 text-lg font-display font-medium">{item.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectSection;
