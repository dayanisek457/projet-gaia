import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const RoadmapSection = () => {
  return (
    <section id="roadmap" className="py-24 bg-gradient-to-br from-primary/8 via-background to-secondary/8 relative overflow-hidden">
      {/* Elegant background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 -right-20 w-64 h-64 bg-secondary/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '3s' }}></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <div className="animate-fade-in-up">
            <h2 className="text-section-title mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Roadmap du Projet
            </h2>
            <p className="text-body text-foreground/80 max-w-3xl mx-auto mb-10 leading-relaxed">
              Découvrez les étapes clés du développement de Gaia, notre solution de reforestation autonome
            </p>
          </div>
          
          <div className="animate-scale-in-delayed">
            <Link to="/roadmap">
              <Button 
                size="lg" 
                className="btn-professional group shadow-2xl hover:shadow-3xl px-10 py-6 text-lg rounded-2xl bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 transform hover:-translate-y-1 transition-all duration-300"
              >
                Voir la roadmap complète
                <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform duration-300" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoadmapSection;