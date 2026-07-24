import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Youtube } from 'lucide-react';

const quickLinks = [
  { name: 'Accueil', href: '/' },
  { name: 'Nos Véhicules', href: '/vehicules' },
  { name: 'Services', href: '/services' },
  { name: 'À Propos', href: '/a-propos' },
];

const serviceLinks = [
  { name: 'Financement', href: '/services#financement' },
  { name: 'Reprise Véhicule', href: '/services#reprise' },
  { name: 'Garantie', href: '/services#garantie' },
  { name: 'Service Après-Vente', href: '/services#sav' },
];

const supportLinks = [
  { name: 'FAQ', href: '/faq' },
  { name: 'Témoignages', href: '/temoignages' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contact', href: '/contact' },
];

export const Footer = () => {
  return (
    <footer className="bg-charcoal text-ivory">
      {/* Main Footer */}
      <div className="container-luxury section-padding pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-gradient-gold flex items-center justify-center">
                <span className="text-xl font-display font-bold text-primary-foreground">AC</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-display font-bold tracking-wide">
                  DRIVE IN <span className="text-gold-light">MARRAKECH</span>
                </span>
              </div>
            </Link>
            <p className="text-ivory/70 text-sm leading-relaxed mb-6">
              Votre partenaire de confiance pour la location de véhicules de qualité.
              Excellence, transparence et satisfaction client sont nos engagements.
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.facebook.com/people/Marrakech-Car-Rental/61570262177371/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-ivory/10 flex items-center justify-center hover:bg-gold transition-colors duration-300"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/mavoituremarrakech/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-ivory/10 flex items-center justify-center hover:bg-gold transition-colors duration-300"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-ivory/10 flex items-center justify-center hover:bg-gold transition-colors duration-300"
                aria-label="Youtube"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-6 text-gold-light">
              Navigation
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-ivory/70 hover:text-gold-light transition-colors duration-300 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-6 text-gold-light">
              Nos Services
            </h4>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-ivory/70 hover:text-gold-light transition-colors duration-300 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-6 text-gold-light">
              Contact
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-gold-light mt-0.5 flex-shrink-0" />
                <div className="text-sm">
                  <p className="text-ivory/70">WhatsApp</p>
                  <a href="https://wa.me/0708181515" className="text-ivory hover:text-gold-light transition-colors">
                    0708181515
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-gold-light mt-0.5 flex-shrink-0" />
                <div className="text-sm">
                  <p className="text-ivory/70">Email</p>
                  <a href="mailto:contact@driveinmarrakech.ma" className="text-ivory hover:text-gold-light transition-colors">
                    contact@driveinmarrakech.ma
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Facebook className="w-5 h-5 text-gold-light mt-0.5 flex-shrink-0" />
                <div className="text-sm">
                  <p className="text-ivory/70">Facebook</p>
                  <a href="https://www.facebook.com/people/Marrakech-Car-Rental/61570262177371/" target="_blank" rel="noopener noreferrer" className="text-ivory hover:text-gold-light transition-colors">
                    Marrakech Car Rental
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Instagram className="w-5 h-5 text-gold-light mt-0.5 flex-shrink-0" />
                <div className="text-sm">
                  <p className="text-ivory/70">Instagram</p>
                  <a href="https://www.instagram.com/mavoituremarrakech/" target="_blank" rel="noopener noreferrer" className="text-ivory hover:text-gold-light transition-colors">
                    @mavoituremarrakech
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-gold-light mt-0.5 flex-shrink-0" />
                <div className="text-sm">
                  <p className="text-ivory/70">Horaires</p>
                  <p className="text-ivory">Lun - Sam: 9h - 19h</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-ivory/10">
        <div className="container-luxury py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-ivory/50 text-sm">
              © {new Date().getFullYear()} DRIVE IN MARRAKECH. Tous droits réservés.
            </p>
            <div className="flex gap-6">
              <Link to="/mentions-legales" className="text-ivory/50 hover:text-gold-light text-sm transition-colors">
                Mentions légales
              </Link>
              <Link to="/confidentialite" className="text-ivory/50 hover:text-gold-light text-sm transition-colors">
                Politique de confidentialité
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
