import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Building2 } from 'lucide-react';
import { cn } from '../lib/utils';
import { SmartImage } from './SmartImage';

const links = [
  { name: 'Accueil', href: '#accueil' },
  { name: 'À-propos', href: '#a-propos' },
  { name: 'Historique', href: '#historique' },
  { name: 'Services', href: '#services' },
  { name: 'Équipe', href: '#equipe' },
  { name: 'Galerie', href: '#galerie' },
  { name: 'Campagnes', href: '#campagnes' },
  { name: 'Stages', href: '#stages' },
  { name: 'Contact', href: '#contact' },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    
    if (element) {
      const headerOffset = 80; // Adjust this value based on header height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a 
            href="#accueil" 
            onClick={(e) => handleNavClick(e, '#accueil')}
            className="flex items-center gap-3 group"
          >
            <div className="relative w-12 h-12 sm:w-14 sm:h-14 overflow-hidden rounded-xl shadow-md border-2 border-white/30 group-hover:shadow-lg group-hover:scale-105 transition-all bg-white p-1 flex items-center justify-center shrink-0">
              <SmartImage 
                sources={["/logo.png", "/logo.png.jpeg"]} 
                alt="John Medical Center Logo" 
                className="w-full h-full object-contain" 
                referrerPolicy="no-referrer"
                fallbackNode={<Building2 className="w-8 h-8 text-medical-blue" />}
              />
            </div>
            <div className={cn(
              "flex items-center transition-colors duration-300",
              isScrolled ? "text-medical-dark" : "text-white drop-shadow-md"
            )}>
              <span className="font-display font-bold text-2xl leading-none tracking-tight">JMC</span>
              <div 
                className={cn(
                  "flex items-center overflow-hidden transition-all duration-500 whitespace-nowrap",
                  isScrolled ? "max-w-0 opacity-0 ml-0" : "max-w-[250px] opacity-100 ml-2 sm:ml-3"
                )}
              >
                <div className="w-[1.5px] h-8 bg-white/60 mr-2 sm:mr-3 shrink-0" />
                <div className="flex flex-col justify-center">
                  <span className="text-[0.55rem] sm:text-[0.65rem] font-bold tracking-widest uppercase leading-snug">
                    John Medical Center
                  </span>
                  <span className="text-[0.55rem] sm:text-[0.65rem] font-bold tracking-widest uppercase leading-snug">
                    Et Maternité
                  </span>
                </div>
              </div>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-3 xl:gap-8">
            <ul className="flex items-center gap-3 xl:gap-5">
              {links.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={cn(
                      'text-xs xl:text-sm font-medium transition-colors hover:text-medical-green relative after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-medical-green after:transition-all hover:after:w-full whitespace-nowrap',
                      isScrolled ? 'text-slate-700' : 'text-white/90 hover:text-white'
                    )}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className={cn(
                'flex items-center gap-1.5 xl:gap-2 px-3.5 py-2 xl:px-6 xl:py-2.5 rounded-full font-semibold text-xs xl:text-sm transition-all duration-300 hover:scale-105 active:scale-95 shadow-sm shrink-0',
                isScrolled 
                  ? 'bg-medical-blue text-white hover:bg-medical-blue-light hover:shadow-medical-blue/30' 
                  : 'bg-white text-medical-blue hover:bg-gray-50'
              )}
            >
              <Phone className="w-3.5 h-3.5 xl:w-4 xl:h-4" />
              Prendre rendez-vous
            </a>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={cn(
              "lg:hidden p-2 rounded-md transition-colors",
              isScrolled ? "text-medical-dark hover:bg-gray-100" : "text-white hover:bg-white/10"
            )}
            aria-label="Menu"
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <div 
        className={cn(
          "lg:hidden bg-white border-t border-gray-100 shadow-xl absolute top-full left-0 right-0 overflow-hidden transition-all duration-300 ease-in-out origin-top",
          isMobileMenuOpen ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0 h-0"
        )}
      >
        <nav className="flex flex-col p-4 space-y-4">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-lg font-medium text-slate-700 hover:text-medical-blue transition-colors px-2 py-1"
            >
              {link.name}
            </a>
          ))}
          <div className="pt-4 border-t border-gray-100">
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="flex items-center justify-center gap-2 w-full px-6 py-3 rounded-full bg-medical-blue text-white font-semibold hover:bg-medical-blue-light transition-colors"
            >
              <Phone className="w-5 h-5" />
              Prendre rendez-vous
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
