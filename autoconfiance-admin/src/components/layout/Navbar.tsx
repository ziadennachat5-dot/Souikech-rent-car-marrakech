import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, ChevronDown, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const navLinks = [
  { name: 'Accueil', href: '/' },
  { name: 'Nos Véhicules', href: '/#vehicules' },
  { name: 'Services', href: '/services' },
  { name: 'À Propos', href: '/#a-propos' },
  { name: 'Témoignages', href: '/temoignages' },
  { name: 'FAQ', href: '/faq' },
  { name: 'Contact', href: '/contact' },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        isScrolled
          ? 'bg-black/60 backdrop-blur-md border-b border-white/10 py-2'
          : 'bg-transparent py-4'
      )}
    >
      <div className="container-luxury">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-12 h-12 rounded-full bg-gradient-gold flex items-center justify-center shadow-gold">
                <MapPin className="w-6 h-6 text-primary-foreground" />
              </div>
              <div className="absolute inset-0 rounded-full bg-gradient-gold opacity-0 group-hover:opacity-50 blur-md transition-opacity duration-300" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-display font-bold tracking-wide text-white">
                DRIVE IN <span className="text-amber-400">MARRAKECH</span>
              </span>
              <span className="text-[10px] tracking-[0.3em] text-white/70 font-medium uppercase">
                SOUIKECH RENT CAR
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  'px-4 py-2 text-sm font-medium transition-all duration-300 rounded-md',
                  location.pathname === link.href
                    ? 'text-amber-400 bg-white/10'
                    : 'text-white hover:text-amber-400 hover:bg-white/5'
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="https://wa.me/0708181515"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-medium text-white hover:text-amber-400 transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>0708181515</span>
            </a>
            <a
              href="https://wa.me/0708181515"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="gold" size="sm">
                Réserver sur WhatsApp
              </Button>
            </a>
          </div>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <button
                className="lg:hidden p-2 rounded-md hover:bg-white/10 transition-colors"
                aria-label="Menu"
              >
                <Menu className="w-6 h-6 text-white" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[350px] bg-charcoal text-ivory border-white/10">
              <div className="flex flex-col h-full">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-full bg-gradient-gold flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-lg font-display font-bold text-white">
                      DRIVE IN <span className="text-amber-400">MARRAKECH</span>
                    </span>
                  </div>
                </div>

                <nav className="flex-1 space-y-2">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      to={link.href}
                      className={cn(
                        'block px-4 py-3 text-base font-medium rounded-lg transition-all duration-300',
                        location.pathname === link.href
                          ? 'text-amber-400 bg-white/10'
                          : 'text-white hover:text-amber-400 hover:bg-white/5'
                      )}
                    >
                      {link.name}
                    </Link>
                  ))}
                </nav>

                <div className="pt-6 mt-6 border-t border-white/10 space-y-4">
                  <a
                    href="https://wa.me/0708181515"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white"
                  >
                    <Phone className="w-4 h-4" />
                    <span>0708181515</span>
                  </a>
                  <a href="https://wa.me/0708181515" target="_blank" rel="noopener noreferrer" className="block px-4">
                    <Button variant="gold" className="w-full">
                      Réserver sur WhatsApp
                    </Button>
                  </a>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </nav>
      </div>
    </header>
  );
};
