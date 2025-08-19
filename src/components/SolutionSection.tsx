
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Battery, Package, Radio, Plane, Sun, Waves } from 'lucide-react';

const SolutionSection = () => {
  const technicalSolutions = [
    {
      function: "Capter le rayonnement",
      block: "Captage",
      solution: "Panneaux Solaires",
      icon: Sun,
      color: "bg-yellow-500"
    },
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
      function: "Distribuer l'énergie",
      block: "Distribution",
      solution: "Système de batterie",
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

  return (
    <section id="solution" className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-section-title mb-6">
              Notre Solution : GAIA
            </h2>
            <p className="text-body max-w-3xl mx-auto">
              Un avion 100% électrique et rechargeable grâce à un système de panneaux solaires, 
              muni d'une soute pour larguer des Seedballs. Une solution écologique, économique 
              et sécurisée pour accélérer la reforestation mondiale.
            </p>
          </div>

          {/* Key Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <Card className="text-center border-primary/20 hover:border-primary/40 transition-colors animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Sun className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-primary">100% Écologique</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Zéro émission de gaz à effet de serre grâce à l'alimentation solaire
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-secondary/20 hover:border-secondary/40 transition-colors animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mb-4">
                  <Package className="h-6 w-6 text-secondary" />
                </div>
                <CardTitle className="text-secondary">Autonome</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Pas de risque humain, pilotage à distance et fonctionnement automatisé
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-accent/20 hover:border-accent/40 transition-colors animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mb-4">
                  <Plane className="h-6 w-6 text-accent" />
                </div>
                <CardTitle className="text-accent">Économique</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Alternative abordable aux hélicoptères et avions traditionnels
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Technical Solutions Table */}
          <div className="mb-12">
            <h3 className="text-subsection text-center mb-8">Solutions Techniques</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {technicalSolutions.map((item, index) => (
                <Card key={index} className="group hover:shadow-lg transition-all duration-300">
                  <CardHeader className="pb-4">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${item.color} bg-opacity-10`}>
                        <item.icon className={`h-5 w-5 ${item.color.replace('bg-', 'text-')}`} />
                      </div>
                      <div>
                        <CardTitle className="text-sm font-medium">{item.function}</CardTitle>
                        <Badge variant="outline" className="text-xs mt-1">
                          {item.block}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm font-semibold text-primary">{item.solution}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Future Vision */}
          <Card className="bg-gradient-primary text-white">
            <CardHeader>
              <CardTitle className="text-center text-white text-2xl">Vision d'Avenir</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-white/90 text-lg leading-relaxed">
                Avec les progrès de l'aéronautique, GAIA pourra être produit à grande échelle 
                tout en restant écologique, notamment grâce aux futures technologies à hydrogène. 
                Une solution scalable pour un impact environnemental mondial.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
