
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
      {/* Cinematic background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Elegant geometric shapes with refined animation */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-white/5 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-32 right-16 w-40 h-40 bg-white/4 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-white/3 rounded-full blur-2xl animate-pulse-slow" style={{ animationDelay: '4s' }}></div>
        <div className="absolute top-2/3 left-1/4 w-28 h-28 bg-white/4 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '6s' }}></div>
        
        {/* Sophisticated overlay with gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/10"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-6xl mx-auto">
          {/* Cinematic hero title with enhanced animation */}
          <div className="animate-scale-in">
            <h1 className="text-hero-clean mb-8 drop-shadow-2xl">
              Gaia.
            </h1>
            <div className="text-hero-subtitle-clean text-white/95 mb-6 drop-shadow-lg">
              L'avenir de la reforestation intelligente.
            </div>
          </div>
          
          {/* Professional subtitle with staggered animation */}
          <div className="animate-fade-in-up-delayed">
            <p className="text-body-clean text-white/90 mb-12 max-w-4xl mx-auto leading-relaxed drop-shadow-md">
              Un drone électrique autonome et intelligent pour accélérer 
              la reforestation mondiale et restaurer durablement nos écosystèmes face 
              à l'urgence climatique. 
              <span className="block mt-6 text-white font-semibold text-xl backdrop-blur-sm bg-white/5 rounded-2xl py-3 px-6 inline-block">
                Solution innovante du Lycée Saint-Joseph Dijon.
              </span>
            </p>
          </div>

          {/* Enhanced action buttons with hover effects */}
          <div className="animate-scale-in-delayed flex flex-col sm:flex-row gap-6 justify-center">
            <Button 
              size="lg" 
              variant="secondary" 
              className="btn-professional group bg-white text-primary hover:bg-white/95 font-semibold px-12 py-4 text-lg rounded-xl shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 transition-all duration-300"
              onClick={handleDiscoverProject}
            >
              Découvrir le projet
              <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-2 transition-transform duration-300" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="btn-professional-outline font-semibold px-12 py-4 text-lg rounded-xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
              onClick={handleSponsorClick}
            >
              <span className="mr-3 text-xl">👥</span>
              Devenir Sponsor
            </Button>
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
