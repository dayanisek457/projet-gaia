import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const RoadmapSection = () => {
  return (
    <section id="roadmap" className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Roadmap du Projet
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
            Découvrez les étapes clés du développement de Gaia, notre solution de reforestation autonome
          </p>
          <Link to="/roadmap">
            <Button size="lg" className="shadow-lg hover:shadow-xl transition-all">
              Voir la roadmap complète
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default RoadmapSection;