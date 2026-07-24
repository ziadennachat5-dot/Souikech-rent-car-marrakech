import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { supabase, Car } from '@/lib/supabase';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { SectionHeader, FeatureCard, StatCard, TestimonialCard } from '@/components/ui/SectionComponents';
import { CarCard } from '@/components/cars/CarCard';
import {
  Shield,
  Award,
  Users,
  ThumbsUp,
  Car as CarIcon,
  Wrench,
  FileCheck,
  CreditCard,
  ArrowRight,
  CheckCircle,
  Phone
} from 'lucide-react';
import heroShowroom from '@/assets/hero-showroom.jpg';
import teamPhoto from '@/assets/team-photo.jpg';

const Index = () => {
  const [featuredCars, setFeaturedCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'Tous' },
    { id: 'BERLINE', label: 'Berlines & Familiales' },
    { id: 'SUV & 4X4', label: 'SUV & Crossovers' },
    { id: 'ÉCONOMIQUE', label: 'Citadines & Compactes' },
    { id: 'LUXE', label: 'Luxe & Premium' },
  ];

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const { data, error } = await supabase
          .from('cars')
          .select('*')
          .limit(6);

        if (error) throw error;
        setFeaturedCars(data || []);
      } catch (error) {
        console.error('Erreur chargement featured cars:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  const filteredCars = selectedCategory === 'all'
    ? featuredCars
    : featuredCars.filter(car => car.category === selectedCategory);

  const features = [
    {
      icon: <Shield className="w-7 h-7" />,
      title: 'Confiance Garantie',
      description: 'Chaque véhicule est rigoureusement inspecté et certifié pour votre tranquillité d\'esprit.',
    },
    {
      icon: <Award className="w-7 h-7" />,
      title: 'Qualité Premium',
      description: 'Sélection minutieuse des meilleures voitures du marché avec historique complet.',
    },
    {
      icon: <Users className="w-7 h-7" />,
      title: 'Service Personnalisé',
      description: 'Une équipe dédiée pour vous accompagner dans chaque étape de votre achat.',
    },
    {
      icon: <ThumbsUp className="w-7 h-7" />,
      title: 'Satisfaction Client',
      description: 'Plus de 1000 clients satisfaits nous font confiance pour leur véhicule.',
    },
  ];

  const services = [
    {
      icon: <CreditCard className="w-6 h-6" />,
      title: 'Financement Flexible',
      description: 'Solutions de paiement adaptées à votre budget.',
    },
    {
      icon: <FileCheck className="w-6 h-6" />,
      title: 'Véhicules Certifiés',
      description: 'Inspection en 150 points pour chaque véhicule.',
    },
    {
      icon: <Wrench className="w-6 h-6" />,
      title: 'Service Après-Vente',
      description: 'Maintenance et réparations par nos experts.',
    },
    {
      icon: <CarIcon className="w-6 h-6" />,
      title: 'Reprise Véhicule',
      description: 'Estimation gratuite et reprise immédiate.',
    },
  ];

  const testimonials = [
    {
      quote: 'Un service exceptionnel ! J\'ai trouvé la voiture parfaite pour ma famille. L\'équipe a été très professionnelle et transparente tout au long du processus.',
      author: 'Mohamed Alami',
      role: 'Client depuis 2023',
    },
    {
      quote: 'DRIVE IN MARRAKECH a dépassé toutes mes attentes. La voiture était exactement comme décrite et la réservation a été simple et rapide.',
      author: 'Fatima Benali',
      role: 'Cliente satisfaite',
    },
    {
      quote: 'Je recommande vivement ! Le service après-vente est excellent et l\'équipe est toujours disponible pour répondre à mes questions.',
      author: 'Youssef Kadiri',
      role: 'Client fidèle',
    },
  ];

  const stats = [
    { value: '100%', label: 'Client Satisfaits' },
    { value: '24/7', label: 'Livraison Aéroport' },
    { value: 'Illimité', label: 'Kilométrage' },
    { value: '98%', label: 'Taux de Satisfaction' },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[85vh] sm:min-h-screen flex flex-col justify-between py-12 sm:py-20 pt-20 sm:pt-32 px-4 sm:px-0">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroShowroom}
            alt="Showroom DRIVE IN MARRAKECH"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90" />
        </div>

        {/* Content */}
        <div className="container-luxury relative z-10 flex-1 flex flex-col justify-center">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block px-4 py-1.5 text-xs font-semibold uppercase tracking-wider bg-gold/20 text-gold-light rounded-full mb-6">
                Location de Voitures à Marrakech
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-ivory mb-4 sm:mb-6 leading-tight">
                Trouvez Votre Voiture Idéale à Marrakech
              </h1>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-200 mb-6 sm:mb-8 leading-relaxed line-clamp-2 sm:line-clamp-none">
                Location premium simple, rapide et sans frais cachés. Livraison gratuite à l'Aéroport Menara, Riad ou Hôtel.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 w-full my-6 px-4 sm:px-0 sm:mb-8">
                <a href="https://wa.me/0708181515" target="_blank" rel="noopener noreferrer" className="w-full">
                  <Button className="w-full py-3.5 text-base font-semibold bg-amber-500/20 backdrop-blur-md border border-amber-400/40 text-amber-300 shadow-[0_8px_32px_0_rgba(212,175,55,0.2)] hover:bg-amber-500/30 hover:border-amber-400 hover:shadow-[0_8px_32px_0_rgba(212,175,55,0.4)] transition-all duration-300 rounded-xl">
                    Réserver via WhatsApp
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </a>
                <Link to="/vehicules" className="w-full">
                  <Button className="w-full py-3.5 text-base font-medium border border-white/30 text-white rounded-xl backdrop-blur-sm hover:bg-white/10">
                    Voir La Flotte
                  </Button>
                </Link>
              </div>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10"
            >
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl font-bold text-amber-400">
                    {stat.value}
                  </div>
                  <div className="text-xs text-gray-300 uppercase tracking-wider mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        >
          <div className="w-6 h-10 border-2 border-ivory/30 rounded-full flex justify-center pt-2">
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 bg-gold rounded-full"
            />
          </div>
        </motion.div>
      </section>

      {/* Featured Cars */}
      <section id="vehicules" className="section-padding bg-background">
        <div className="container-luxury">
          <SectionHeader
            badge="Notre Sélection"
            title="Véhicules en Vedette"
            subtitle="Découvrez notre sélection de véhicules de qualité, prêts à vous accompagner"
          />

          {/* Category Pills */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/30'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>

          {/* Cars Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-96 bg-slate-100 dark:bg-slate-800 rounded-lg animate-pulse" />
              ))}
            </div>
          ) : filteredCars.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
              {filteredCars.map((car, index) => (
                <CarCard key={car.id} car={car} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 mb-8">
              <p className="text-muted-foreground">
                Aucun véhicule disponible dans cette catégorie pour le moment.
              </p>
            </div>
          )}

          <div className="text-center">
            <Link to="/vehicules">
              <Button variant="gold" size="lg">
                Voir tous les véhicules
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="a-propos" className="section-padding bg-background">
        <div className="container-luxury">
          <div className="max-w-4xl mx-auto">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <span className="inline-block px-4 py-1.5 text-xs font-semibold uppercase tracking-wider bg-accent text-gold rounded-full mb-4">
                À Propos
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
                DRIVE IN MARRAKECH, Votre Destination de Location de Confiance
              </h2>
              <div className="gold-divider mb-6 mx-auto" />
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Depuis plus de 15 ans, DRIVE IN MARRAKECH s'est imposé comme le leader de la location
                de véhicules de qualité au Maroc. Notre mission est simple : vous offrir une
                expérience de location transparente et sereine.
              </p>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Chaque véhicule de notre parc est soigneusement sélectionné et inspecté par
                nos experts pour garantir sa qualité et sa fiabilité. Nous croyons que la location
                d'une voiture doit être un moment de joie, pas de stress.
              </p>

              {/* Highlights */}
              <div className="space-y-4 mb-8 max-w-lg mx-auto text-left">
                {[
                  'Véhicules inspectés en 150 points',
                  'Historique complet et transparent',
                  'Garantie satisfaction ou remboursement',
                  'Service après-vente dédié',
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-gold flex-shrink-0" />
                    <span className="text-foreground">{item}</span>
                  </div>
                ))}
              </div>

              <Link to="/a-propos">
                <Button variant="gold">
                  En savoir plus
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding bg-secondary">
        <div className="container-luxury">
          <SectionHeader
            badge="Nos Engagements"
            title="Pourquoi Choisir DRIVE IN MARRAKECH ?"
            subtitle="Des valeurs fortes qui font de nous votre partenaire de confiance"
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="section-padding bg-charcoal text-ivory">
        <div className="container-luxury">
          <SectionHeader
            badge="Nos Services"
            title="Un Accompagnement Complet"
            subtitle="De la recherche au service après-vente, nous sommes à vos côtés"
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-6 rounded-lg bg-ivory/5 border border-ivory/10 hover:border-gold/30 transition-all duration-300 text-center group"
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-gold/10 flex items-center justify-center text-gold-light group-hover:bg-gold group-hover:text-charcoal transition-colors duration-300">
                  {service.icon}
                </div>
                <h3 className="text-lg font-display font-semibold text-ivory mb-2">
                  {service.title}
                </h3>
                <p className="text-ivory/60 text-sm">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Link to="/services">
              <Button variant="goldOutline" size="lg" className="border-gold-light text-gold-light hover:bg-gold-light/10">
                Découvrir nos services
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-background">
        <div className="container-luxury">
          <SectionHeader
            badge="Témoignages"
            title="Ce Que Disent Nos Clients"
            subtitle="La satisfaction de nos clients est notre plus grande fierté"
          />

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={index}
                quote={testimonial.quote}
                author={testimonial.author}
                role={testimonial.role}
                index={index}
              />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/temoignages">
              <Button variant="outline">
                Voir tous les témoignages
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-gold-subtle">
        <div className="container-luxury">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
                Prêt à Trouver Votre Véhicule Idéal ?
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                Contactez-nous dès maintenant pour découvrir notre sélection ou prendre
                rendez-vous pour un essai. Notre équipe est à votre écoute.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link to="/rendez-vous">
                  <Button variant="gold" size="lg">
                    Prendre Rendez-vous
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <a href="https://wa.me/0708181515" target="_blank" rel="noopener noreferrer">
                  <Button variant="goldOutline" size="lg">
                    <Phone className="w-5 h-5 mr-2" />
                    WhatsApp
                  </Button>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
