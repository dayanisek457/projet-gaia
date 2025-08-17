
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Crown, Users } from 'lucide-react';

const TeamSection = () => {
  const teamMembers = [
    {
      name: "Nathan LIENARD",
      role: "Chef de Projet",
      isLeader: true,
      description: "Responsable de la coordination générale et de la gestion du projet GAIA"
    },
    {
      name: "Constant MOREAU",
      role: "Développement Technique",
      isLeader: false,
      description: "Conception et développement des systèmes techniques"
    },
    {
      name: "Hugues DUCHANOY", 
      role: "Ingénierie Système",
      isLeader: false,
      description: "Architecture et intégration des composants"
    },
    {
      name: "Yanis EL-KFEL",
      role: "Innovation & Design",
      isLeader: false,
      description: "Recherche et développement des solutions innovantes"
    },
    {
      name: "Kylian ROMANOFF",
      role: "Analyse & Test",
      isLeader: false,
      description: "Validation et optimisation des performances"
    }
  ];

  return (
    <section id="team" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-section-title mb-6">
              Notre Équipe
            </h2>
            <p className="text-body max-w-2xl mx-auto">
              Une équipe passionnée d'étudiants de Terminale SI du Lycée Saint-Joseph Dijon, 
              unis pour révolutionner la reforestation mondiale.
            </p>
          </div>

          {/* Team Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {teamMembers.map((member, index) => (
              <Card key={index} className={`group hover:shadow-lg transition-all duration-300 ${
                member.isLeader ? 'border-primary/40 bg-primary/5' : 'hover:border-primary/20'
              }`}>
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mb-4">
                    {member.isLeader ? (
                      <Crown className="h-8 w-8 text-white" />
                    ) : (
                      <Users className="h-8 w-8 text-white" />
                    )}
                  </div>
                  <CardTitle className="text-lg">{member.name}</CardTitle>
                  <Badge 
                    variant={member.isLeader ? "default" : "secondary"}
                    className={member.isLeader ? "bg-primary" : ""}
                  >
                    {member.role}
                  </Badge>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {member.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Institution Info */}
          <Card className="bg-gradient-earth-sky text-white text-center">
            <CardHeader>
              <CardTitle className="text-white text-2xl">Lycée Saint-Joseph Dijon</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-white/90 text-lg">
                Projet de Terminale Sciences de l'Ingénieur
              </p>
              <p className="text-white/80 mt-2">
                Période d'exécution : Juin 2025 - Juin 2026
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
