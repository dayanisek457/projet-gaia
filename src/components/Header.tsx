
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

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
    <header className="fixed top-0 w-full z-50 glass-ultra backdrop-blur-2xl shadow-2xl border-b border-white/10">
      <div className="container mx-auto px-8">
        <div className="flex items-center justify-between h-24">
          {/* Premium Logo */}
          <div className="flex items-center">
            <span className="text-4xl font-serif font-black bg-gradient-primary bg-clip-text text-transparent tracking-tighter">
              GAIA
            </span>
          </div>

          {/* Ultra-Premium Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-16">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-foreground/90 hover:text-primary transition-all duration-500 font-display font-medium text-lg relative group tracking-wide"
              >
                {item.name}
                <span className="absolute bottom-0 left-1/2 w-0 h-1 bg-gradient-primary transition-all duration-500 group-hover:w-full group-hover:left-0 rounded-full glow-primary"></span>
              </a>
            ))}
            <Button 
              variant="outline" 
              size="lg" 
              className="btn-hero ml-8 glass-ultra border-2 border-primary/40 hover:border-primary text-primary hover:bg-primary hover:text-white font-display font-semibold px-8 py-3 rounded-2xl tracking-wide glow-primary"
              asChild
            >
              <Link to="/documentation">Documentation</Link>
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

        {/* Ultra-Premium Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-6 pt-6 pb-8 space-y-3 glass-ultra rounded-3xl mt-6 shadow-2xl border border-white/20 backdrop-blur-2xl">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block px-6 py-4 text-foreground/90 hover:text-primary transition-all duration-500 hover:bg-primary/10 rounded-2xl font-display font-medium text-xl tracking-wide"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <div className="px-6 py-4">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="btn-hero w-full glass-ultra border-2 border-primary/40 hover:border-primary text-primary hover:bg-primary hover:text-white font-display font-semibold tracking-wide rounded-2xl py-4"
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
