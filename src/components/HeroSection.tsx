
import { Button } from '@/components/ui/button';
import { ArrowRight, Leaf, Zap, Globe, Sparkles, TreePine, Wind } from 'lucide-react';

const HeroSection = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-hero relative overflow-hidden">
      {/* Cinematic particle background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Enhanced floating elements with more sophisticated animations */}
        <div className="absolute top-20 left-10 animate-float animate-glow">
          <TreePine className="h-20 w-20 text-white/30" />
        </div>
        <div className="absolute top-16 right-16 animate-float-delayed animate-glow">
          <Zap className="h-16 w-16 text-white/25" />
        </div>
        <div className="absolute bottom-32 left-20 animate-float-slow animate-glow">
          <Globe className="h-24 w-24 text-white/20" />
        </div>
        <div className="absolute top-1/3 right-1/4 animate-float">
          <Wind className="h-12 w-12 text-white/15" />
        </div>
        <div className="absolute bottom-1/4 right-12 animate-float-delayed">
          <Leaf className="h-18 w-18 text-white/25" />
        </div>
        <div className="absolute top-1/2 left-1/4 animate-float-slow">
          <Sparkles className="h-14 w-14 text-white/20" />
        </div>
        
        {/* Cinematic overlay gradient */}
        <div className="absolute inset-0 bg-black/10"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-6xl mx-auto">
          {/* Enhanced hero title with premium typography */}
          <div className="animate-fade-in-up">
            <h1 className="text-hero mb-8">
              GAIA
            </h1>
            <div className="text-hero-subtitle text-white/95 mb-6">
              L'avenir de la reforestation intelligente
            </div>
          </div>
          
          {/* Enhanced subtitle with better spacing */}
          <div className="animate-fade-in-up-delayed">
            <p className="text-body-large text-white/90 mb-12 max-w-4xl mx-auto leading-relaxed">
              Un drone électrique autonome et intelligent pour accélérer 
              la reforestation mondiale et restaurer durablement nos écosystèmes face 
              à l'urgence climatique. 
              <span className="block mt-4 text-white font-semibold text-xl">
                Solution innovante du Lycée Saint-Joseph Dijon.
              </span>
            </p>
          </div>

          {/* Premium action buttons */}
          <div className="animate-fade-in-up flex flex-col sm:flex-row gap-6 justify-center mb-16" style={{ animationDelay: '0.4s' }}>
            <Button 
              size="lg" 
              variant="secondary" 
              className="btn-hero cinematic-glow group bg-white text-primary hover:bg-white/95 font-semibold px-12 py-4 text-lg rounded-xl"
            >
              Découvrir le projet
              <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="btn-hero glass text-white hover:bg-white/20 font-semibold px-12 py-4 text-lg rounded-xl border-2 border-white/40"
            >
              <span className="mr-3 text-xl">👥</span>
              Devenir Sponsor
            </Button>
          </div>

          {/* Enhanced key stats with premium styling */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <div className="text-center group">
              <div className="card-premium p-8 mx-4">
                <div className="text-5xl font-black text-white mb-4 group-hover:scale-110 transition-all duration-500 font-display">
                  100%
                </div>
                <div className="text-white/90 text-xl font-medium tracking-wide">100% Électrique</div>
              </div>
            </div>
            <div className="text-center group">
              <div className="card-premium p-8 mx-4">
                <div className="text-5xl font-black text-white mb-4 group-hover:scale-110 transition-all duration-500 font-display">
                  0
                </div>
                <div className="text-white/90 text-xl font-medium tracking-wide">Émission CO²</div>
              </div>
            </div>
            <div className="text-center group">
              <div className="card-premium p-8 mx-4">
                <div className="text-5xl font-black text-white mb-4 group-hover:scale-110 transition-all duration-500 font-display">
                  ∞
                </div>
                <div className="text-white/90 text-xl font-medium tracking-wide">Potentiel Impact</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
