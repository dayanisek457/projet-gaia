
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: 'Accueil', href: '#home' },
    { name: 'Projet', href: '#project' },
    { name: 'Solution', href: '#solution' },
    { name: 'Roadmap', href: '#roadmap' },
    { name: 'Sponsors', href: '#sponsors' },
    { name: 'Équipe', href: '#team' },
    { name: 'Contact', href: '#contact' }
  ];

  return (
    <header className="fixed top-0 w-full z-50 glass border-b border-white/20 backdrop-blur-lg bg-white/95 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img 
              src="/favicon.ico" 
              alt="GAIA Logo" 
              className="h-9 w-9 object-contain drop-shadow-lg" 
            />
            <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent tracking-tight">
              GAIA
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-foreground/80 hover:text-primary transition-all duration-200 font-medium relative group"
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-200 group-hover:w-full"></span>
              </a>
            ))}
            <Button variant="outline" size="sm" className="ml-4 border-2 border-primary/20 hover:border-primary text-primary hover:bg-primary hover:text-white transition-all duration-200">
              Documentation
            </Button>
          </nav>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white/95 backdrop-blur-lg rounded-lg mt-2 shadow-xl border border-white/20">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 text-foreground/80 hover:text-primary transition-colors duration-200 hover:bg-primary/5 rounded-md font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <div className="px-3 py-2">
                <Button variant="outline" size="sm" className="w-full border-2 border-primary/20 hover:border-primary text-primary hover:bg-primary hover:text-white transition-all duration-200">
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
