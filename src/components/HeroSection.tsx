
import { Button } from '@/components/ui/button';
import { ArrowRight, Leaf, Zap, Globe } from 'lucide-react';

const HeroSection = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-hero relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 animate-float">
          <Leaf className="h-16 w-16 text-white/20" />
        </div>
        <div className="absolute top-32 right-20 animate-float" style={{ animationDelay: '2s' }}>
          <Zap className="h-12 w-12 text-white/20" />
        </div>
        <div className="absolute bottom-32 left-20 animate-float" style={{ animationDelay: '4s' }}>
          <Globe className="h-20 w-20 text-white/20" />
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <div className="animate-fade-in-up">
            <h1 className="text-hero text-white mb-6">
              GAIA
              <span className="block text-2xl md:text-3xl font-normal mt-2 text-white/90">
                L'avenir de la reforestation intelligente
              </span>
            </h1>
          </div>
          
          <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <p className="text-body text-white/80 mb-8 max-w-2xl mx-auto">
              Un drone électrique autonome alimenté par l'énergie solaire pour accélérer 
              la reforestation mondiale et restaurer durablement nos écosystèmes face 
              à l'urgence climatique.
            </p>
          </div>

          <div className="animate-fade-in-up flex flex-col sm:flex-row gap-4 justify-center" style={{ animationDelay: '0.4s' }}>
            <Button size="lg" variant="secondary" className="group">
              Découvrir le projet
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="lg" variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20">
              Voir la solution technique
            </Button>
          </div>

          {/* Key stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">100%</div>
              <div className="text-white/80">Électrique</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">0</div>
              <div className="text-white/80">Émission CO²</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">∞</div>
              <div className="text-white/80">Seedballs/jour</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
