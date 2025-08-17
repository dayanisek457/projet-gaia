
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TreePine, Droplets, Wind, AlertTriangle } from 'lucide-react';

const ProjectSection = () => {
  const challenges = [
    {
      icon: TreePine,
      title: "Déforestation massive",
      description: "La progression des déserts (Sahara avance de 5-10 km/an dans les forêts tropicales)"
    },
    {
      icon: Droplets,
      title: "Montée des eaux",
      description: "Plus d'1 milliard de personnes devront migrer d'ici 2050 selon l'ONU"
    },
    {
      icon: Wind,
      title: "Dérèglement climatique",
      description: "Urgence d'agir face aux changements environnementaux globaux"
    },
    {
      icon: AlertTriangle,
      title: "Solutions coûteuses",
      description: "Les méthodes actuelles (hélicoptères, avions) sont onéreuses et polluantes"
    }
  ];

  return (
    <section id="project" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
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
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:border-primary/40">
                <CardHeader className="pb-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <challenge.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{challenge.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{challenge.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Project Timeline */}
          <Card className="bg-gradient-earth-sky text-white">
            <CardHeader>
              <CardTitle className="text-center text-white">Calendrier du Projet</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                <div className="text-center">
                  <div className="text-2xl font-bold mb-2">Juin 2025</div>
                  <div className="text-white/90">Début du projet</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold mb-2">Budget</div>
                  <div className="text-white/90">300 €</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold mb-2">Juin 2026</div>
                  <div className="text-white/90">Finalisation</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ProjectSection;
