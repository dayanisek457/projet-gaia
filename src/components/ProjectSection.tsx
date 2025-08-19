
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
    { label: "Budget", value: "300 €", icon: "💰" },
    { label: "Équipe", value: "5 étudiants", icon: "👥" }
  ];

  return (
    <section id="project" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-section-title mb-6">
              Face à l'urgence climatique mondiale
            </h2>
            <p className="text-body max-w-2xl mx-auto">
              Notre projet GAIA répond aux défis environnementaux majeurs de notre époque 
              par une approche technologique innovante et durable.
            </p>
          </div>

          {/* Project Overview */}
          <Card className="mb-12 border-primary/20 bg-gradient-to-r from-primary/5 to-secondary/5">
            <CardHeader>
              <CardTitle className="text-2xl text-center">Problématique</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-body text-center leading-relaxed">
                Comment utiliser les technologies aériennes pour accélérer la reforestation 
                et restaurer durablement les écosystèmes dégradés face à l'urgence climatique mondiale ?
              </p>
            </CardContent>
          </Card>

          {/* Challenges Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {challenges.map((challenge, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:border-primary/40 animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                        <challenge.icon className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="text-lg">{challenge.title}</CardTitle>
                    </div>
                    <div className="text-sm font-bold text-primary bg-primary/10 px-2 py-1 rounded">
                      {challenge.stats}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{challenge.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Project Timeline */}
          <Card className="bg-gradient-earth-sky text-white animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <CardHeader>
              <CardTitle className="text-center text-white text-2xl mb-2">Informations Projet</CardTitle>
              <p className="text-white/80 text-center">Lycée Saint-Joseph Dijon - Terminale Sciences de l'Ingénieur</p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {projectData.map((item, index) => (
                  <div key={index} className="text-center p-4 bg-white/10 rounded-lg backdrop-blur-sm">
                    <div className="text-2xl mb-2">{item.icon}</div>
                    <div className="text-xl font-bold mb-1">{item.value}</div>
                    <div className="text-white/90 text-sm">{item.label}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ProjectSection;
