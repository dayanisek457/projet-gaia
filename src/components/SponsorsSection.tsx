import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Plane, 
  TreePine, 
  Building2, 
  TrendingUp, 
  Users, 
  Award,
  Heart,
  Lightbulb,
  Target,
  Globe
} from 'lucide-react';

const SponsorsSection = () => {
  const sponsorTypes = [
    {
      type: "Entreprises Aéronautiques",
      icon: Plane,
      color: "primary",
      gradient: "from-blue-500 to-cyan-500",
      benefits: [
        {
          icon: Lightbulb,
          title: "Opportunité d'Innovation",
          description: "Participez à un projet qui met en avant les technologies aéronautiques durables"
        },
        {
          icon: TrendingUp,
          title: "Visibilité Marque",
          description: "Associez votre marque à une initiative écologique et innovante"
        },
        {
          icon: Award,
          title: "Reconnaissance",
          description: "Soyez reconnu comme leader dans l'aéronautique durable"
        }
      ]
    },
    {
      type: "Jardineries & Reforestation",
      icon: TreePine,
      color: "success",
      gradient: "from-green-500 to-emerald-500",
      benefits: [
        {
          icon: Target,
          title: "Promotion Produits",
          description: "Les Seedballs utilisées peuvent être mises en avant comme produit phare"
        },
        {
          icon: Heart,
          title: "Engagement Environnemental",
          description: "Soutenez un projet aligné avec vos valeurs écologiques"
        },
        {
          icon: Users,
          title: "Impact Client",
          description: "Renforcez votre image auprès d'une clientèle eco-responsable"
        }
      ]
    },
    {
      type: "Collectivités Locales",
      icon: Building2,
      color: "secondary",
      gradient: "from-purple-500 to-indigo-500",
      benefits: [
        {
          icon: Globe,
          title: "Impact Local",
          description: "Utilisez cette technologie pour des projets de reforestation régionaux"
        },
        {
          icon: Users,
          title: "Sensibilisation",
          description: "Promouvoir des initiatives éducatives auprès des citoyens"
        },
        {
          icon: Award,
          title: "Leadership Environnemental",
          description: "Positionnez votre collectivité comme leader du développement durable"
        }
      ]
    }
  ];

  return (
    <section id="sponsors" className="py-20 bg-gradient-to-br from-muted/30 to-background relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 -left-10 w-32 h-32 bg-primary/5 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 -right-10 w-24 h-24 bg-secondary/5 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-section-title mb-6">
              Rejoignez l'Aventure GAIA
            </h2>
            <p className="text-body max-w-3xl mx-auto mb-8">
              Découvrez comment votre organisation peut contribuer à révolutionner 
              la reforestation mondiale tout en bénéficiant d'une visibilité exceptionnelle 
              et d'un impact environnemental mesurable.
            </p>
            <Badge variant="outline" className="px-4 py-2 text-lg animate-bounce">
              🌱 Partenaires Recherchés
            </Badge>
          </div>

          {/* Sponsor Types Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {sponsorTypes.map((sponsor, index) => (
              <Card 
                key={index} 
                className="group hover:shadow-2xl transition-all duration-500 hover:scale-105 border-2 hover:border-primary/30 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm animate-fade-in-up"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <CardHeader className="text-center pb-6">
                  <div className={`mx-auto w-16 h-16 bg-gradient-to-br ${sponsor.gradient} rounded-2xl flex items-center justify-center mb-4 shadow-lg group-hover:shadow-xl transition-shadow duration-300`}>
                    <sponsor.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold">{sponsor.type}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {sponsor.benefits.map((benefit, benefitIndex) => (
                    <div 
                      key={benefitIndex} 
                      className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors duration-300 group/benefit"
                    >
                      <div className="flex-shrink-0 w-8 h-8 bg-muted rounded-lg flex items-center justify-center group-hover/benefit:bg-primary/10 transition-colors duration-300">
                        <benefit.icon className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm mb-1 group-hover/benefit:text-primary transition-colors duration-300">
                          {benefit.title}
                        </h4>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {benefit.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Partnership Benefits */}
          <Card className="bg-gradient-primary text-white mb-12 overflow-hidden relative animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/10"></div>
            <CardHeader className="text-center relative z-10">
              <CardTitle className="text-white text-2xl mb-4">
                Pourquoi Sponsoriser GAIA ?
              </CardTitle>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-white">300€</div>
                  <div className="text-white/90">Budget Initial</div>
                  <div className="text-white/70 text-sm">Investment minimal, impact maximal</div>
                </div>
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-white">1 An</div>
                  <div className="text-white/90">Durée Projet</div>
                  <div className="text-white/70 text-sm">Visibilité garantie sur 12 mois</div>
                </div>
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-white">∞</div>
                  <div className="text-white/90">Potentiel Impact</div>
                  <div className="text-white/70 text-sm">Solution scalable mondialement</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Call to Action */}
          <div className="text-center animate-fade-in-up" style={{ animationDelay: '1s' }}>
            <h3 className="text-2xl font-bold mb-6">
              Prêt à Faire la Différence ?
            </h3>
            <p className="text-body mb-8 max-w-2xl mx-auto">
              Contactez-nous dès maintenant pour discuter des opportunités de partenariat 
              et découvrir comment GAIA peut valoriser votre engagement environnemental.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="group relative overflow-hidden bg-primary hover:bg-primary/90 text-white font-semibold px-8 py-4 shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                <span className="relative z-10">Devenir Partenaire</span>
                <div className="absolute inset-0 bg-white/20 transform translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300"></div>
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="group border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold px-8 py-4 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Télécharger le Dossier Sponsor
                <Award className="ml-2 h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SponsorsSection;