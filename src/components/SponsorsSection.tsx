import { useState } from 'react';
import { Button } from '@/components/ui/button';
import ContactPopup from './ContactPopup';
import { Link } from 'react-router-dom';
import { 
  TreePine, 
  Heart,
  Globe,
  Sparkles,
  Star,
  ArrowRight
} from 'lucide-react';

const SponsorsSection = () => {
  const [isContactPopupOpen, setIsContactPopupOpen] = useState(false);
  const [contactType, setContactType] = useState<'sponsor' | 'partner'>('partner');

  const handlePartnerClick = () => {
    setContactType('partner');
    setIsContactPopupOpen(true);
  };



  return (
    <section id="sponsors" className="py-24 bg-gradient-to-br from-muted/40 to-background relative overflow-hidden">
      {/* Background Decoration */}
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
        <div className="absolute inset-0 bg-gradient-to-br from-primary/3 to-secondary/5 opacity-60"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Simplified Header */}
          <div className="mb-12 animate-fade-in-up">
            <h2 className="text-section-title mb-6 font-display">
              Nos Partenaires
            </h2>
            <p className="text-body-large max-w-3xl mx-auto mb-8 leading-relaxed">
              Le projet Gaia recherche des partenaires engagés pour révolutionner 
              la reforestation mondiale. Découvrez comment votre organisation peut 
              contribuer à cette initiative écologique innovante.
            </p>
            <div className="inline-flex items-center gap-3 bg-primary/10 text-primary px-6 py-3 rounded-2xl border border-primary/20 font-display font-medium text-xl animate-bounce-gentle">
              <TreePine className="h-6 w-6" />
              Partenaires Recherchés
            </div>
          </div>

          {/* Call to Action Card */}
          <div className="card-professional bg-gradient-hero text-white overflow-hidden relative animate-fade-in-up p-10 mb-10">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative z-10 text-center">
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm">
                  <Star className="h-10 w-10 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-display font-bold text-white mb-4">
                Pourquoi Devenir Partenaire ?
              </h3>
              <p className="text-white/90 text-lg mb-6 max-w-2xl mx-auto leading-relaxed">
                Associez votre marque à une initiative écologique d'ampleur mondiale, 
                bénéficiez d'une visibilité exceptionnelle et contribuez à un impact 
                environnemental mesurable.
              </p>
              <div className="flex items-center justify-center gap-3 text-white/95">
                <TreePine className="h-5 w-5" />
                <span className="font-semibold">Impact Global</span>
                <span>•</span>
                <Globe className="h-5 w-5" />
                <span className="font-semibold">Visibilité Garantie</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="text-center animate-fade-in-up">
            <p className="text-body-large mb-8 leading-relaxed">
              Contactez-nous ou découvrez la liste complète de nos partenaires potentiels.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="btn-professional group relative overflow-hidden bg-primary hover:bg-primary/90 text-white font-display font-semibold px-10 py-4 text-lg rounded-xl"
                onClick={handlePartnerClick}
              >
                <span className="relative z-10 flex items-center">
                  <Heart className="mr-2 h-5 w-5" />
                  Devenir Partenaire
                </span>
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="btn-hero border-2 border-primary text-primary hover:bg-primary hover:text-white font-display font-semibold px-10 py-4 text-lg rounded-xl"
                asChild
              >
                <Link to="/partenaires">
                  <ArrowRight className="mr-2 h-5 w-5" />
                  Découvrir nos Partenaires
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <ContactPopup
        isOpen={isContactPopupOpen}
        onClose={() => setIsContactPopupOpen(false)}
        type={contactType}
      />
    </section>
  );
};

export default SponsorsSection;