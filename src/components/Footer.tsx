
import { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Logo and Description */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <img 
                  src="/favicon.ico" 
                  alt="GAIA Logo" 
                  className="h-8 w-8 object-contain filter brightness-0 invert" 
                />
                <span className="text-xl font-bold">GAIA</span>
              </div>
              <p className="text-background/80 text-sm leading-relaxed">
                Révolutionner la reforestation mondiale grâce à une technologie 
                aérienne écologique et autonome.
              </p>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h4 className="font-semibold text-lg">Navigation</h4>
              <nav className="flex flex-col space-y-2">
                <a href="#home" className="text-background/80 hover:text-primary transition-colors text-sm">
                  Accueil
                </a>
                <a href="#project" className="text-background/80 hover:text-primary transition-colors text-sm">
                  Projet
                </a>
                <a href="#solution" className="text-background/80 hover:text-primary transition-colors text-sm">
                  Solution
                </a>
                <a href="#sponsors" className="text-background/80 hover:text-primary transition-colors text-sm">
                  Sponsors
                </a>
                <a href="#team" className="text-background/80 hover:text-primary transition-colors text-sm">
                  Équipe
                </a>
                <a href="#contact" className="text-background/80 hover:text-primary transition-colors text-sm">
                  Contact
                </a>
              </nav>
            </div>

            {/* Project Info */}
            <div className="space-y-4">
              <h4 className="font-semibold text-lg">Projet GAIA</h4>
              <div className="space-y-2 text-sm">
                <p className="text-background/80">Lycée Saint-Joseph Dijon</p>
                <p className="text-background/80">Sciences de l'Ingénieur</p>
                <p className="text-background/80">2025-2026</p>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-background/20 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="flex items-center space-x-2 text-sm text-background/80">
                <span>Fait avec</span>
                <Heart className="h-4 w-4 text-red-400" />
                <span>par l'équipe GAIA</span>
              </div>
              <div className="text-sm text-background/80">
                © 2025 Projet GAIA - Tous droits réservés
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
