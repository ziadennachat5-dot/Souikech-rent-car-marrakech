import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Users, Briefcase, Gauge, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { BookingModal } from './BookingModal';

export interface CarCardData {
  id: string;
  name: string;
  category: string;
  image_url: string;
  seats: number;
  luggage: number;
  transmission: string;
  fuel: string;
  price_per_day: number;
  is_available: boolean;
  [key: string]: any;
}

interface CarCardProps {
  car: CarCardData;
  index?: number;
}

export const CarCard = ({ car, index = 0 }: CarCardProps) => {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        viewport={{ once: true }}
        className="group"
      >
      <div className="luxury-card-hover overflow-hidden h-full flex flex-col">
        {/* Image Container */}
        <div className="relative h-52 overflow-hidden bg-gradient-gold-subtle flex-shrink-0">
          <img
            src={car.image_url}
            alt={car.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          {/* Category Badge */}
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 text-xs font-medium bg-amber-500/90 backdrop-blur-sm rounded-full text-white">
              {car.category}
            </span>
          </div>
          {/* Availability Badge */}
          {!car.is_available && (
            <div className="absolute top-4 right-4">
              <span className="px-3 py-1 text-xs font-medium bg-red-600/90 backdrop-blur-sm rounded-full text-white">
                Non disponible
              </span>
            </div>
          )}
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 flex-1 flex flex-col">
          {/* Name */}
          <div className="mb-3">
            <h3 className="text-lg font-display font-semibold text-foreground group-hover:text-primary transition-colors">
              {car.name}
            </h3>
          </div>

          {/* Features */}
          <div className="grid grid-cols-2 gap-3 mb-4 flex-shrink-0">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Users className="w-4 h-4 text-gold flex-shrink-0" />
              <span className="truncate">{car.seats} Places</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Briefcase className="w-4 h-4 text-gold flex-shrink-0" />
              <span className="truncate">{car.luggage} Bagages</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Gauge className="w-4 h-4 text-gold flex-shrink-0" />
              <span className="truncate">{car.transmission}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Zap className="w-4 h-4 text-gold flex-shrink-0" />
              <span className="truncate">{car.fuel}</span>
            </div>
          </div>

          {/* Price */}
          <div className="mb-4">
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-display font-bold text-gold">
                {car.price_per_day}
              </span>
              <span className="text-sm text-muted-foreground">MAD/jour</span>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-auto">
            <button
              onClick={() => setIsBookingModalOpen(true)}
              disabled={!car.is_available}
              className={cn(
                "w-full py-3 px-4 rounded-lg font-medium transition-all duration-300 min-h-[48px] shadow-md hover:shadow-lg",
                car.is_available
                  ? "bg-amber-500 hover:bg-amber-600 text-white"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              )}
            >
              {car.is_available ? "Réserver" : "Indisponible"}
            </button>
          </div>
        </div>
      </div>
    </motion.div>

    <BookingModal
      open={isBookingModalOpen}
      onOpenChange={setIsBookingModalOpen}
      car={car}
    />
    </>
  );
};

export const CarCardCompact = ({ car, index = 0 }: CarCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      viewport={{ once: true }}
      className="group"
    >
      <Link to={`/vehicules/${car.id}`}>
        <div className="flex items-center gap-4 p-4 rounded-lg bg-card border border-border hover:border-gold/30 hover:shadow-soft transition-all duration-300">
          {/* Image */}
          <div className="w-20 h-20 rounded-lg overflow-hidden bg-accent flex-shrink-0">
            <img
              src={car.image}
              alt={car.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-gold uppercase tracking-wider">
              {car.brand}
            </p>
            <h4 className="font-display font-semibold text-foreground truncate">
              {car.name}
            </h4>
            <p className="text-xs text-muted-foreground">
              {car.categoryLabel}
            </p>
          </div>

          {/* Arrow */}
          <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-gold group-hover:translate-x-1 transition-all duration-300" />
        </div>
      </Link>
    </motion.div>
  );
};
