
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ContactPopup from './ContactPopup';

const HeroSection = () => {
  const [isContactPopupOpen, setIsContactPopupOpen] = useState(false);
  const [contactType, setContactType] = useState<'sponsor' | 'partner'>('sponsor');
  const navigate = useNavigate();

  const handleDiscoverProject = () => {
    navigate('/documentation');
  };

  const handleSponsorClick = () => {
    setContactType('sponsor');
    setIsContactPopupOpen(true);
  };
  return (
    <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-hero relative overflow-hidden">
      {/* Subtle background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Clean geometric shapes instead of floating icons */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-white/5 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-32 right-16 w-40 h-40 bg-white/3 rounded-full blur-3xl animate-pulse-slow" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-white/4 rounded-full blur-2xl animate-pulse-slow" style={{animationDelay: '4s'}}></div>
        
        {/* Professional overlay */}
        <div className="absolute inset-0 bg-black/5"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-6xl mx-auto">
          {/* Clean, professional hero title */}
          <div className="animate-fade-in-up">
            <h1 className="text-hero-clean mb-8">
              Gaia.
            </h1>
            <div className="text-hero-subtitle-clean text-white/95 mb-6">
              L'avenir de la reforestation intelligente.
            </div>
          </div>
          
          {/* Professional subtitle */}
          <div className="animate-fade-in-up-delayed">
            <p className="text-body-clean text-white/90 mb-12 max-w-4xl mx-auto leading-relaxed">
              Un drone électrique autonome et intelligent pour accélérer 
              la reforestation mondiale et restaurer durablement nos écosystèmes face 
              à l'urgence climatique. 
              <span className="block mt-4 text-white font-semibold text-xl">
                Solution innovante du Lycée Saint-Joseph Dijon.
              </span>
            </p>
          </div>

          {/* Clean action buttons */}
          <div className="animate-fade-in-up flex flex-col sm:flex-row gap-6 justify-center mb-16" style={{ animationDelay: '0.4s' }}>
            <Button 
              size="lg" 
              variant="secondary" 
              className="btn-professional group bg-white text-primary hover:bg-white/95 font-semibold px-12 py-4 text-lg rounded-xl"
              onClick={handleDiscoverProject}
            >
              Découvrir le projet
              <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="btn-professional-outline text-white hover:bg-white/10 font-semibold px-12 py-4 text-lg rounded-xl border-2 border-white/30"
              onClick={handleSponsorClick}
            >
              <span className="mr-3 text-xl">👥</span>
              Devenir Sponsor
            </Button>
          </div>

          {/* Clean key stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <div className="text-center group">
              <div className="card-professional p-8 mx-4">
                <div className="text-5xl font-black text-white mb-4 group-hover:scale-105 transition-all duration-300 font-display">
                  100%
                </div>
                <div className="text-white/90 text-xl font-medium tracking-wide">100% Électrique</div>
              </div>
            </div>
            <div className="text-center group">
              <div className="card-professional p-8 mx-4">
                <div className="text-5xl font-black text-white mb-4 group-hover:scale-105 transition-all duration-300 font-display">
                  0
                </div>
                <div className="text-white/90 text-xl font-medium tracking-wide">Émission CO²</div>
              </div>
            </div>
            <div className="text-center group">
              <div className="card-professional p-8 mx-4">
                <div className="text-5xl font-black text-white mb-4 group-hover:scale-105 transition-all duration-300 font-display">
                  ∞
                </div>
                <div className="text-white/90 text-xl font-medium tracking-wide">Potentiel Impact</div>
              </div>
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

export default HeroSection;
