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
  Globe,
  Sparkles,
  Star
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
    <section id="sponsors" className="py-32 bg-gradient-to-br from-muted/40 to-background relative overflow-hidden">
      {/* Premium Background Decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 animate-float-slow">
          <Star className="h-32 w-32 text-primary/8" />
        </div>
        <div className="absolute bottom-32 left-16 animate-float">
          <Sparkles className="h-24 w-24 text-accent/10" />
        </div>
        <div className="absolute top-1/2 right-1/4 animate-float-delayed">
          <Globe className="h-20 w-20 text-secondary/8" />
        </div>
        <div className="absolute inset-0 bg-gradient-cinematic opacity-30"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Premium Header */}
          <div className="text-center mb-20 animate-fade-in-up">
            <h2 className="text-section-title mb-8 font-display">
              Rejoignez l'Aventure GAIA
            </h2>
            <p className="text-body-large max-w-4xl mx-auto mb-8 leading-relaxed">
              Découvrez comment votre organisation peut contribuer à révolutionner 
              la reforestation mondiale tout en bénéficiant d'une visibilité exceptionnelle 
              et d'un impact environnemental mesurable.
            </p>
            <div className="inline-flex items-center gap-3 bg-primary/10 text-primary px-6 py-3 rounded-2xl border border-primary/20 font-display font-medium text-xl animate-bounce-gentle">
              <TreePine className="h-6 w-6" />
              Partenaires Recherchés
            </div>
          </div>

          {/* Premium Sponsor Types Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-20">
            {sponsorTypes.map((sponsor, index) => (
              <div 
                key={index} 
                className="card-premium group cinematic-glow p-8 hover:scale-105 transition-all duration-500 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="text-center mb-8">
                  <div className={`mx-auto w-20 h-20 bg-gradient-to-br ${sponsor.gradient} rounded-3xl flex items-center justify-center mb-6 shadow-2xl group-hover:shadow-3xl group-hover:scale-110 transition-all duration-500`}>
                    <sponsor.icon className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-display font-bold text-foreground">{sponsor.type}</h3>
                </div>

                <div className="space-y-6">
                  {sponsor.benefits.map((benefit, benefitIndex) => (
                    <div 
                      key={benefitIndex} 
                      className="flex items-start space-x-4 p-4 rounded-2xl hover:bg-muted/50 transition-all duration-300 group/benefit"
                    >
                      <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center group-hover/benefit:bg-primary/20 group-hover/benefit:scale-110 transition-all duration-300">
                        <benefit.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-display font-semibold text-lg mb-2 group-hover/benefit:text-primary transition-colors duration-300">
                          {benefit.title}
                        </h4>
                        <p className="text-muted-foreground leading-relaxed">
                          {benefit.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Premium Partnership Benefits */}
          <div className="card-premium bg-gradient-hero text-white mb-16 overflow-hidden relative animate-fade-in-up p-12 cinematic-glow" style={{ animationDelay: '0.8s' }}>
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative z-10 text-center">
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm">
                  <Star className="h-12 w-12 text-white" />
                </div>
              </div>
              <h3 className="text-3xl font-display font-bold text-white mb-8">
                Pourquoi Sponsoriser GAIA ?
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-3xl mx-auto">
                <div className="text-center p-6 bg-white/10 rounded-2xl backdrop-blur-sm">
                  <div className="text-5xl font-display font-black text-white mb-3">1 An</div>
                  <div className="text-white/95 text-xl font-display font-semibold mb-2">Durée Projet</div>
                  <div className="text-white/80 text-lg">Visibilité garantie sur 12 mois</div>
                </div>
                <div className="text-center p-6 bg-white/10 rounded-2xl backdrop-blur-sm">
                  <div className="text-5xl font-display font-black text-white mb-3">∞</div>
                  <div className="text-white/95 text-xl font-display font-semibold mb-2">Potentiel Impact</div>
                  <div className="text-white/80 text-lg">Solution scalable mondialement</div>
                </div>
              </div>
            </div>
          </div>

          {/* Premium Call to Action */}
          <div className="text-center animate-fade-in-up" style={{ animationDelay: '1s' }}>
            <h3 className="text-subsection mb-6 font-display">
              Prêt à Faire la Différence ?
            </h3>
            <p className="text-body-large mb-10 max-w-3xl mx-auto leading-relaxed">
              Contactez-nous dès maintenant pour discuter des opportunités de partenariat 
              et découvrir comment GAIA peut valoriser votre engagement environnemental.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button 
                size="lg" 
                className="btn-hero group relative overflow-hidden bg-primary hover:bg-primary/90 text-white font-display font-semibold px-12 py-4 text-lg rounded-xl cinematic-glow"
              >
                <span className="relative z-10 flex items-center">
                  <Heart className="mr-3 h-5 w-5" />
                  Devenir Partenaire
                </span>
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="btn-hero border-2 border-primary text-primary hover:bg-primary hover:text-white font-display font-semibold px-12 py-4 text-lg rounded-xl"
              >
                <Award className="mr-3 h-5 w-5" />
                Télécharger le Dossier Sponsor
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SponsorsSection;