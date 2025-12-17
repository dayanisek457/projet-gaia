
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
        <div className="flex items-center justify-between h-16">
          {/* Compact Logo */}
          <Link to="/" className="flex items-center">
            <img 
              src="/logo.png" 
              alt="Logo" 
              className="h-12 object-contain drop-shadow-xl" 
            />
          </Link>

          {/* Compact Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            {navigation.map((item) => (
              item.isRoute ? (
                <Link
                  key={item.name}
                  to={item.href}
                  className="text-foreground/85 hover:text-primary transition-all duration-300 font-display font-medium text-sm relative group whitespace-nowrap"
                >
                  {item.name}
                  <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-primary transition-all duration-300 group-hover:w-full group-hover:left-0 rounded-full"></span>
                </Link>
              ) : (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-foreground/85 hover:text-primary transition-all duration-300 font-display font-medium text-sm relative group whitespace-nowrap"
                >
                  {item.name}
                  <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-primary transition-all duration-300 group-hover:w-full group-hover:left-0 rounded-full"></span>
                </a>
              )
            ))}
            
            {/* Instagram Icon Only */}
            <a
              href="https://www.instagram.com/projet_gaia_stjo"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/85 hover:text-primary transition-all duration-300 p-2 hover:bg-primary/10 rounded-lg focus-visible:ring-2 focus-visible:ring-primary"
              title="Suivez-nous sur Instagram @projet_gaia_stjo"
            >
              <Instagram className="h-5 w-5" />
            </a>
            
            <Button 
              variant="outline" 
              size="sm" 
              className="btn-hero border-2 border-primary/30 hover:border-primary text-primary hover:bg-primary hover:text-white font-display font-semibold px-4 py-2 rounded-lg text-sm"
              asChild
            >
              <Link to="/documentation">Doc</Link>
            </Button>
          </nav>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Enhanced Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden">
            <div className="px-3 pt-3 pb-4 space-y-1 glass rounded-xl mt-3 shadow-2xl border border-white/30">
              {navigation.map((item) => (
                item.isRoute ? (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="block px-3 py-2 text-foreground/85 hover:text-primary transition-all duration-300 hover:bg-primary/10 rounded-lg font-display font-medium text-base"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ) : (
                  <a
                    key={item.name}
                    href={item.href}
                    className="block px-3 py-2 text-foreground/85 hover:text-primary transition-all duration-300 hover:bg-primary/10 rounded-lg font-display font-medium text-base"
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
                className="flex items-center px-3 py-2 text-foreground/85 hover:text-primary transition-all duration-300 hover:bg-primary/10 rounded-lg font-display font-medium text-base"
                onClick={() => setIsMenuOpen(false)}
              >
                <Instagram className="h-5 w-5 mr-2" />
                Instagram
              </a>
              
              <div className="px-3 pt-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="btn-hero w-full border-2 border-primary/30 hover:border-primary text-primary hover:bg-primary hover:text-white font-display font-semibold rounded-lg"
                  asChild
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Link to="/documentation">Documentation</Link>
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
