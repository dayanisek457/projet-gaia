
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: 'Accueil', href: '#home' },
    { name: 'Projet', href: '#project' },
    { name: 'Solution', href: '#solution' },
    { name: 'Sponsors', href: '#sponsors' },
    { name: 'Équipe', href: '#team' },
    { name: 'Contact', href: '#contact' }
  ];

  return (
    <header className="fixed top-0 w-full z-50 glass backdrop-blur-xl bg-white/90 shadow-2xl border-b border-white/30">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Premium Logo */}
          <div className="flex items-center space-x-4">
            <div className="cinematic-glow">
              <img 
                src="/favicon.ico" 
                alt="GAIA Logo" 
                className="h-12 w-12 object-contain drop-shadow-xl" 
              />
            </div>
            <span className="text-2xl font-display font-black bg-gradient-primary bg-clip-text text-transparent tracking-tight">
              GAIA
            </span>
          </div>

          {/* Premium Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-12">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-foreground/85 hover:text-primary transition-all duration-300 font-display font-medium text-lg relative group tracking-wide"
              >
                {item.name}
                <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-primary transition-all duration-300 group-hover:w-full group-hover:left-0 rounded-full"></span>
              </a>
            ))}
            <Button 
              variant="outline" 
              size="lg" 
              className="btn-hero ml-6 border-2 border-primary/30 hover:border-primary text-primary hover:bg-primary hover:text-white font-display font-semibold px-6 py-2.5 rounded-xl tracking-wide"
            >
              Documentation
            </Button>
          </nav>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="lg"
            className="md:hidden cinematic-glow"
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
                <a
                  key={item.name}
                  href={item.href}
                  className="block px-4 py-3 text-foreground/85 hover:text-primary transition-all duration-300 hover:bg-primary/10 rounded-xl font-display font-medium text-lg tracking-wide"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <div className="px-4 py-3">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="btn-hero w-full border-2 border-primary/30 hover:border-primary text-primary hover:bg-primary hover:text-white font-display font-semibold tracking-wide rounded-xl"
                >
                  Documentation
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
