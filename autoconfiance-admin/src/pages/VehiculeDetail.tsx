import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import apiClient from '@/lib/axios';
import { motion } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { CarCard } from '@/components/cars/CarCard';
import { 
  ArrowLeft, 
  CheckCircle, 
  Phone, 
  MessageCircle, 
  Calendar,
  Shield,
  Users,
  MapPin
} from 'lucide-react';

interface Car {
  id: string;
  name: string;
  brand: string;
  categoryId: string;
  categoryLabel: string;
  description: string;
  features: string[];
  idealFor: string;
  comfort: string;
  carUsage: string[];
  image: string;
}

const VehiculeDetail = () => {
  const { id } = useParams();
  const [car, setCar] = useState<Car | null>(null);
  const [relatedCars, setRelatedCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const response = await apiClient.get(`/api/cars/${id}`);
        setCar(response.data);
        
        // Fetch related cars
        const relatedResponse = await apiClient.get(`/api/cars?categoryId=${response.data.categoryId}`);
        setRelatedCars(relatedResponse.data.filter((c: Car) => c.id !== id).slice(0, 4));
      } catch (error) {
        console.error('Error fetching car:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCar();
    }
  }, [id]);

  if (loading) {
    return (
      <Layout>
        <section className="section-padding pt-32">
          <div className="container-luxury text-center">
            <p>Chargement...</p>
          </div>
        </section>
      </Layout>
    );
  }

  if (!car) {
    return (
      <Layout>
        <section className="section-padding pt-32">
          <div className="container-luxury text-center">
            <h1 className="text-2xl font-display font-bold mb-4">Véhicule non trouvé</h1>
            <p className="text-muted-foreground mb-8">Le véhicule que vous recherchez n'existe pas.</p>
            <Link to="/vehicules">
              <Button variant="gold">Voir tous les véhicules</Button>
            </Link>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Breadcrumb */}
      <section className="pt-24 pb-4 bg-secondary">
        <div className="container-luxury">
          <div className="flex items-center gap-2 text-sm">
            <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
              Accueil
            </Link>
            <span className="text-muted-foreground">/</span>
            <Link to="/vehicules" className="text-muted-foreground hover:text-foreground transition-colors">
              Véhicules
            </Link>
            <span className="text-muted-foreground">/</span>
            <span className="text-foreground font-medium">{car.name}</span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 bg-background">
        <div className="container-luxury">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="sticky top-24">
                <div className="relative rounded-xl overflow-hidden bg-gradient-gold-subtle shadow-elevated">
                  <img
                    src={car.image}
                    alt={car.name}
                    className="w-full h-auto aspect-[4/3] object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-4 py-2 bg-background/90 backdrop-blur-sm rounded-full text-sm font-medium">
                      {car.categoryLabel}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Details */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Brand & Name */}
              <p className="text-gold font-medium uppercase tracking-wider mb-2">
                {car.brand}
              </p>
              <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
                {car.name}
              </h1>
              <div className="gold-divider mb-6" />

              {/* Description */}
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                {car.description}
              </p>

              {/* Ideal For */}
              <div className="mb-8 p-4 bg-accent rounded-lg">
                <div className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-gold mt-0.5" />
                  <div>
                    <p className="font-semibold text-foreground mb-1">Idéal pour</p>
                    <p className="text-muted-foreground text-sm">{car.idealFor}</p>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="mb-8">
                <h3 className="text-lg font-display font-semibold text-foreground mb-4">
                  Caractéristiques principales
                </h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {car.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-gold flex-shrink-0" />
                      <span className="text-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Comfort */}
              <div className="mb-8 p-4 bg-secondary rounded-lg">
                <div className="flex items-start gap-3">
                  <Gauge className="w-5 h-5 text-gold mt-0.5" />
                  <div>
                    <p className="font-semibold text-foreground mb-1">Confort de conduite</p>
                    <p className="text-muted-foreground text-sm">{car.comfort}</p>
                  </div>
                </div>
              </div>

              {/* Usage */}
              <div className="mb-8">
                <h3 className="text-lg font-display font-semibold text-foreground mb-4">
                  Utilisation recommandée
                </h3>
                <div className="flex flex-wrap gap-2">
                  {car.usage.map((use, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-accent text-accent-foreground rounded-full text-sm font-medium flex items-center gap-2"
                    >
                      <MapPin className="w-4 h-4" />
                      {use}
                    </span>
                  ))}
                </div>
              </div>

              {/* Guarantee */}
              <div className="mb-8 p-4 border border-gold/30 rounded-lg bg-gold/5">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-gold mt-0.5" />
                  <div>
                    <p className="font-semibold text-foreground mb-1">Garantie AUTOCONFIANCE</p>
                    <p className="text-muted-foreground text-sm">
                      Véhicule inspecté en 150 points, avec historique complet et garantie satisfaction.
                    </p>
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="https://wa.me/212662021536" target="_blank" rel="noopener noreferrer" className="flex-1">
                  <Button variant="gold" size="lg" className="w-full">
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Contacter via WhatsApp
                  </Button>
                </a>
                <Link to="/rendez-vous" className="flex-1">
                  <Button variant="goldOutline" size="lg" className="w-full">
                    <Calendar className="w-5 h-5 mr-2" />
                    Prendre RDV
                  </Button>
                </Link>
              </div>

              {/* Phone */}
              <div className="mt-6 text-center">
                <p className="text-muted-foreground text-sm mb-2">Ou appelez-nous directement</p>
                <div className="flex justify-center gap-4">
                  <a href="tel:+212662021536" className="flex items-center gap-2 text-foreground hover:text-gold transition-colors">
                    <Phone className="w-4 h-4" />
                    +212 662-021536
                  </a>
                  <a href="tel:+212662021536" className="flex items-center gap-2 text-foreground hover:text-gold transition-colors">
                    <Phone className="w-4 h-4" />
                    +212 662-021536
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Related Cars */}
      {relatedCars.length > 0 && (
        <section className="section-padding bg-secondary">
          <div className="container-luxury">
            <h2 className="text-2xl font-display font-bold text-foreground mb-8">
              Véhicules similaires
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedCars.map((relatedCar, index) => (
                <CarCard key={relatedCar.id} car={relatedCar} index={index} />
              ))}
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
};

export default VehiculeDetail;
