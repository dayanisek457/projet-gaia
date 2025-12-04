
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: 'Accueil', href: '#home', isRoute: false },
    { name: 'Projet', href: '#project', isRoute: false },
    { name: 'Solution', href: '#solution', isRoute: false },
    { name: 'Roadmap', href: '/roadmap', isRoute: true },
    { name: 'Partenaires', href: '/partenaires', isRoute: true },
    { name: 'Équipe', href: '#team', isRoute: false },
    { name: 'Contact', href: '#contact', isRoute: false }
  ];

  return (
    <header className="fixed top-0 w-full z-50 glass backdrop-blur-xl bg-white/90 shadow-2xl border-b border-white/30">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Premium Logo */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center justify-center">
              <img 
                src="/logo.png" 
                alt="Logo" 
                className="h-20 object-contain drop-shadow-xl" 
              />
            </div>
          </div>

          {/* Premium Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-12">
            {navigation.map((item) => (
              item.isRoute ? (
                <Link
                  key={item.name}
                  to={item.href}
                  className="text-foreground/85 hover:text-primary transition-all duration-300 font-display font-medium text-lg relative group tracking-wide"
                >
                  {item.name}
                  <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-primary transition-all duration-300 group-hover:w-full group-hover:left-0 rounded-full"></span>
                </Link>
              ) : (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-foreground/85 hover:text-primary transition-all duration-300 font-display font-medium text-lg relative group tracking-wide"
                >
                  {item.name}
                  <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-primary transition-all duration-300 group-hover:w-full group-hover:left-0 rounded-full"></span>
                </a>
              )
            ))}
            
            {/* Instagram Link */}
            <a
              href="https://www.instagram.com/projet_gaia_stjo"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/85 hover:text-primary transition-all duration-300 font-display font-medium text-lg relative group tracking-wide flex items-center"
              title="Suivez-nous sur Instagram @projet_gaia_stjo"
            >
              <Instagram className="h-5 w-5 mr-2" />
              Instagram
              <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-primary transition-all duration-300 group-hover:w-full group-hover:left-0 rounded-full"></span>
            </a>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="btn-hero ml-6 border-2 border-primary/30 hover:border-primary text-primary hover:bg-primary hover:text-white font-display font-semibold px-6 py-2.5 rounded-xl tracking-wide"
              asChild
            >
              <Link to="/documentation">Documentation</Link>
            </Button>
          </nav>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="lg"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Enhanced Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-4 pt-4 pb-6 space-y-2 glass rounded-2xl mt-4 shadow-2xl border border-white/30">
              {navigation.map((item) => (
                item.isRoute ? (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="block px-4 py-3 text-foreground/85 hover:text-primary transition-all duration-300 hover:bg-primary/10 rounded-xl font-display font-medium text-lg tracking-wide"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ) : (
                  <a
                    key={item.name}
                    href={item.href}
                    className="block px-4 py-3 text-foreground/85 hover:text-primary transition-all duration-300 hover:bg-primary/10 rounded-xl font-display font-medium text-lg tracking-wide"
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
                className="flex items-center px-4 py-3 text-foreground/85 hover:text-primary transition-all duration-300 hover:bg-primary/10 rounded-xl font-display font-medium text-lg tracking-wide"
                onClick={() => setIsMenuOpen(false)}
              >
                <Instagram className="h-5 w-5 mr-3" />
                Instagram
              </a>
              
              <div className="px-4 py-3">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="btn-hero w-full border-2 border-primary/30 hover:border-primary text-primary hover:bg-primary hover:text-white font-display font-semibold tracking-wide rounded-xl"
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
