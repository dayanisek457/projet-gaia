
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, Instagram, Presentation, Smartphone } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const ANDROID_APP_URL = 'https://github.com/dayanisek457/projet-gaia/releases/download/Android/Gaia_app_v1.apk';

  const navigation = [
    { name: 'Accueil', href: '/#home', isRoute: false },
    { name: 'Projet', href: '/#project', isRoute: false },
    { name: 'Solution', href: '/#solution', isRoute: false },
    { name: 'Roadmap', href: '/roadmap', isRoute: true },
    { name: 'Galerie', href: '/galerie', isRoute: true },
    { name: 'Partenaires', href: '/partenaires', isRoute: true },
    { name: 'Équipe', href: '/#team', isRoute: false },
    { name: 'Contact', href: '/#contact', isRoute: false }
  ];

  return (
    <header className="fixed top-0 w-full z-50 glass backdrop-blur-xl bg-white/90 shadow-2xl border-b border-white/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img 
              src="/logo.png" 
              alt="Logo" 
              className="h-16 object-contain drop-shadow-xl" 
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              item.isRoute ? (
                <Link
                  key={item.name}
                  to={item.href}
                  className="text-foreground/85 hover:text-primary transition-all duration-300 font-display font-medium text-base relative group whitespace-nowrap"
                >
                  {item.name}
                  <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-primary transition-all duration-300 group-hover:w-full group-hover:left-0 rounded-full"></span>
                </Link>
              ) : (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-foreground/85 hover:text-primary transition-all duration-300 font-display font-medium text-base relative group whitespace-nowrap"
                >
                  {item.name}
                  <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-primary transition-all duration-300 group-hover:w-full group-hover:left-0 rounded-full"></span>
                </a>
              )
            ))}
            
            {/* Instagram Icon */}
            <a
              href="https://www.instagram.com/projet_gaia_stjo"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/85 hover:text-primary transition-all duration-300 p-2 hover:bg-primary/10 rounded-lg focus-visible:ring-2 focus-visible:ring-primary"
              title="Suivez-nous sur Instagram @projet_gaia_stjo"
            >
              <Instagram className="h-6 w-6" />
            </a>
            
            {/* Presentation Mode Button */}
            <Button 
              variant="outline" 
              size="default" 
              className="btn-hero border-2 border-secondary/30 hover:border-secondary text-secondary hover:bg-secondary hover:text-white font-display font-semibold px-6 py-2.5 rounded-lg text-base"
              asChild
            >
              <Link to="/presentation">
                <Presentation className="h-4 w-4 mr-2" />
                Présentation
              </Link>
            </Button>
            
            <Button 
              variant="outline" 
              size="default" 
              className="btn-hero border-2 border-primary/30 hover:border-primary text-primary hover:bg-primary hover:text-white font-display font-semibold px-6 py-2.5 rounded-lg text-base"
              asChild
            >
              <Link to="/documentation">Doc</Link>
            </Button>
            
            <Button 
              variant="outline" 
              size="default" 
              className="btn-hero border-2 border-green-600/30 hover:border-green-600 text-green-600 hover:bg-green-600 hover:text-white font-display font-semibold px-6 py-2.5 rounded-lg text-base"
              asChild
            >
              <a href={ANDROID_APP_URL} download>
                <Smartphone className="h-4 w-4 mr-2" />
                App Android
              </a>
            </Button>
          </nav>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="default"
            className="lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden">
            <div className="px-4 pt-4 pb-5 space-y-2 glass rounded-xl mt-4 shadow-2xl border border-white/30">
              {navigation.map((item) => (
                item.isRoute ? (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="block px-4 py-3 text-foreground/85 hover:text-primary transition-all duration-300 hover:bg-primary/10 rounded-lg font-display font-medium text-lg"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ) : (
                  <a
                    key={item.name}
                    href={item.href}
                    className="block px-4 py-3 text-foreground/85 hover:text-primary transition-all duration-300 hover:bg-primary/10 rounded-lg font-display font-medium text-lg"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                )
              ))}
              
              {/* Instagram Link - Mobile */}
              <a
                href="https://www.instagram.com/projet_gaia_stjo"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center px-4 py-3 text-foreground/85 hover:text-primary transition-all duration-300 hover:bg-primary/10 rounded-lg font-display font-medium text-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                <Instagram className="h-6 w-6 mr-3" />
                Instagram
              </a>
              
              <div className="px-4 pt-2 space-y-2">
                <Button 
                  variant="outline" 
                  size="default" 
                  className="btn-hero w-full border-2 border-secondary/30 hover:border-secondary text-secondary hover:bg-secondary hover:text-white font-display font-semibold rounded-lg text-base"
                  asChild
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Link to="/presentation">
                    <Presentation className="h-4 w-4 mr-2" />
                    Mode Présentation
                  </Link>
                </Button>
                
                <Button 
                  variant="outline" 
                  size="default" 
                  className="btn-hero w-full border-2 border-primary/30 hover:border-primary text-primary hover:bg-primary hover:text-white font-display font-semibold rounded-lg text-base"
                  asChild
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Link to="/documentation">Documentation</Link>
                </Button>
                
                <Button 
                  variant="outline" 
                  size="default" 
                  className="btn-hero w-full border-2 border-green-600/30 hover:border-green-600 text-green-600 hover:bg-green-600 hover:text-white font-display font-semibold rounded-lg text-base"
                  asChild
                  onClick={() => setIsMenuOpen(false)}
                >
                  <a href={ANDROID_APP_URL} download>
                    <Smartphone className="h-4 w-4 mr-2" />
                    Télécharger l'App Android
                  </a>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
