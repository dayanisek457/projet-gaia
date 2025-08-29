
import { Button } from '@/components/ui/button';
import { ArrowRight, Leaf, Zap, Globe, Sparkles, TreePine, Wind } from 'lucide-react';

const HeroSection = () => {
  return (
    <section id="home" className="min-h-screen pt-32 flex items-center justify-center bg-gradient-hero relative overflow-hidden">
      {/* Ultra-Cinematic Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated Mesh Gradient */}
        <div className="absolute inset-0 animate-mesh-gradient" style={{
          background: 'var(--gradient-mesh)',
          backgroundSize: '300% 300%'
        }}></div>
        
        {/* Elite Floating Elements - Pure Professional Icons */}
        <div className="absolute top-20 left-10 animate-elite-float opacity-20">
          <div className="p-6 rounded-full glass-ultra-subtle border-0">
            <TreePine className="h-16 w-16 text-white drop-shadow-2xl" />
          </div>
        </div>
        <div className="absolute top-16 right-16 animate-elite-float opacity-15" style={{ animationDelay: '2s' }}>
          <div className="p-5 rounded-full glass-ultra-subtle border-0">
            <Zap className="h-14 w-14 text-white drop-shadow-2xl" />
          </div>
        </div>
        <div className="absolute bottom-32 left-20 animate-elite-float opacity-25" style={{ animationDelay: '4s' }}>
          <div className="p-7 rounded-full glass-ultra-subtle border-0">
            <Globe className="h-18 w-18 text-white drop-shadow-2xl" />
          </div>
        </div>
        <div className="absolute top-1/3 right-1/4 animate-elite-float opacity-10" style={{ animationDelay: '1s' }}>
          <div className="p-4 rounded-full glass-ultra-subtle border-0">
            <Wind className="h-12 w-12 text-white drop-shadow-2xl" />
          </div>
        </div>
        <div className="absolute bottom-1/4 right-12 animate-elite-float opacity-20" style={{ animationDelay: '3s' }}>
          <div className="p-6 rounded-full glass-ultra-subtle border-0">
            <Leaf className="h-16 w-16 text-white drop-shadow-2xl" />
          </div>
        </div>
        <div className="absolute top-1/2 left-1/4 animate-elite-float opacity-15" style={{ animationDelay: '5s' }}>
          <div className="p-5 rounded-full glass-ultra-subtle border-0">
            <Sparkles className="h-14 w-14 text-white drop-shadow-2xl" />
          </div>
        </div>
        
        {/* Ultra-Cinematic Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/20"></div>
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.1) 70%)'
        }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-6xl mx-auto">
          {/* Ultra-Premium Hero Title */}
          <div className="animate-cinematic-entrance">
            <h1 className="text-hero mb-12 animate-glow-pulse">
              GAIA
            </h1>
            <div className="text-hero-subtitle mb-8">
              L'avenir de la reforestation intelligente
            </div>
          </div>
          
          {/* Ultra-Premium Subtitle */}
          <div className="animate-cinematic-entrance" style={{ animationDelay: '0.5s' }}>
            <p className="text-body-large text-white/95 mb-16 max-w-5xl mx-auto leading-relaxed">
              Un drone électrique autonome et intelligent pour accélérer 
              la reforestation mondiale et restaurer durablement nos écosystèmes face 
              à l'urgence climatique. 
              <span className="block mt-6 text-white font-semibold text-2xl font-serif">
                Solution innovante du Lycée Saint-Joseph Dijon.
              </span>
            </p>
          </div>

          {/* Ultra-Premium Action Buttons */}
          <div className="animate-cinematic-entrance flex flex-col sm:flex-row gap-8 justify-center mb-20" style={{ animationDelay: '1s' }}>
            <Button 
              size="lg" 
              variant="secondary" 
              className="btn-hero cinematic-glow group glass-ultra text-white hover:bg-white/20 font-semibold px-16 py-6 text-xl rounded-2xl border-2 border-white/30 hover:border-white/50 backdrop-blur-2xl"
            >
              Découvrir le projet
              <ArrowRight className="ml-4 h-6 w-6 group-hover:translate-x-2 transition-transform duration-500" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="btn-hero glass-ultra text-white hover:bg-accent/30 font-semibold px-16 py-6 text-xl rounded-2xl border-2 border-accent/40 hover:border-accent/60 backdrop-blur-2xl glow-accent"
            >
              <span className="mr-4 text-2xl">👥</span>
              Devenir Sponsor
            </Button>
          </div>

          {/* Ultra-Premium Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 animate-cinematic-entrance" style={{ animationDelay: '1.5s' }}>
            <div className="text-center group">
              <div className="glass-ultra p-10 mx-4 rounded-3xl border border-white/20 glow-primary group-hover:glow-secondary transition-all duration-700">
                <div className="text-6xl font-black text-white mb-6 group-hover:scale-110 transition-all duration-700 font-serif animate-glow-pulse">
                  100%
                </div>
                <div className="text-white/95 text-2xl font-medium tracking-wide font-display">100% Électrique</div>
              </div>
            </div>
            <div className="text-center group">
              <div className="glass-ultra p-10 mx-4 rounded-3xl border border-white/20 glow-secondary group-hover:glow-accent transition-all duration-700">
                <div className="text-6xl font-black text-white mb-6 group-hover:scale-110 transition-all duration-700 font-serif animate-glow-pulse" style={{ animationDelay: '1s' }}>
                  0
                </div>
                <div className="text-white/95 text-2xl font-medium tracking-wide font-display">Émission CO²</div>
              </div>
            </div>
            <div className="text-center group">
              <div className="glass-ultra p-10 mx-4 rounded-3xl border border-white/20 glow-accent group-hover:glow-primary transition-all duration-700">
                <div className="text-6xl font-black text-white mb-6 group-hover:scale-110 transition-all duration-700 font-serif animate-glow-pulse" style={{ animationDelay: '2s' }}>
                  ∞
                </div>
                <div className="text-white/95 text-2xl font-medium tracking-wide font-display">Potentiel Impact</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
