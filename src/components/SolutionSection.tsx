
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Battery, Package, Radio, Plane, Zap, Waves } from 'lucide-react';

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

  return (
    <section id="solution" className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-section-title mb-6">
              Notre Solution : GAIA
            </h2>
            <p className="text-body max-w-3xl mx-auto">
              Un avion 100% électrique intelligent avec batterie haute capacité, 
              muni d'une soute pour larguer des Seedballs. Une solution écologique, économique 
              et sécurisée pour accélérer la reforestation mondiale.
            </p>
          </div>

          {/* Key Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <Card className="text-center border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-gradient-to-br from-white to-primary/5 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <CardHeader className="pb-4">
                <div className="mx-auto w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center mb-4 shadow-lg">
                  <Zap className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-primary text-xl font-bold">100% Écologique</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Zéro émission de gaz à effet de serre grâce à la motorisation électrique
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-secondary/20 hover:border-secondary/40 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-gradient-to-br from-white to-secondary/5 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <CardHeader className="pb-4">
                <div className="mx-auto w-16 h-16 bg-gradient-to-br from-secondary/20 to-secondary/10 rounded-full flex items-center justify-center mb-4 shadow-lg">
                  <Package className="h-8 w-8 text-secondary" />
                </div>
                <CardTitle className="text-secondary text-xl font-bold">Autonome</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Pas de risque humain, pilotage à distance et fonctionnement automatisé
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-accent/20 hover:border-accent/40 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-gradient-to-br from-white to-accent/5 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
              <CardHeader className="pb-4">
                <div className="mx-auto w-16 h-16 bg-gradient-to-br from-accent/20 to-accent/10 rounded-full flex items-center justify-center mb-4 shadow-lg">
                  <Plane className="h-8 w-8 text-accent" />
                </div>
                <CardTitle className="text-accent text-xl font-bold">Économique</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Alternative abordable aux hélicoptères et avions traditionnels
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Technical Solutions Table */}
          <div className="mb-12">
            <h3 className="text-subsection text-center mb-8 font-bold">Solutions Techniques</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {technicalSolutions.map((item, index) => (
                <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 border-transparent hover:border-primary/20 bg-gradient-to-br from-white to-gray-50">
                  <CardHeader className="pb-4">
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 rounded-xl ${item.color} bg-opacity-15 shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                        <item.icon className={`h-6 w-6 ${item.color.replace('bg-', 'text-')}`} />
                      </div>
                      <div>
                        <CardTitle className="text-base font-semibold text-gray-900">{item.function}</CardTitle>
                        <Badge variant="outline" className="text-xs mt-1 bg-primary/10 text-primary border-primary/30 font-medium">
                          {item.block}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm font-semibold text-primary bg-primary/5 px-3 py-2 rounded-lg">{item.solution}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Future Vision */}
          <Card className="bg-gradient-primary text-white shadow-2xl border-0 overflow-hidden relative">
            <div className="absolute inset-0 bg-black/20"></div>
            <CardHeader className="relative z-10">
              <CardTitle className="text-center text-white text-2xl font-bold">Vision d'Avenir</CardTitle>
            </CardHeader>
            <CardContent className="text-center relative z-10">
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
