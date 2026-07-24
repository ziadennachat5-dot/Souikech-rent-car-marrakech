import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, MapPin, User, Phone, Plane, Calculator } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

interface BookingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  car: {
    id: string;
    name: string;
    category: string;
    image_url: string;
    price_per_day: number;
  };
}

export const BookingModal = ({ open, onOpenChange, car }: BookingModalProps) => {
  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    pickupLocation: '',
    startDate: '',
    endDate: '',
    flightNumber: '',
    notes: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [numberOfDays, setNumberOfDays] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    if (formData.startDate && formData.endDate) {
      const start = new Date(formData.startDate);
      const end = new Date(formData.endDate);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setNumberOfDays(diffDays > 0 ? diffDays : 0);
      setTotalPrice(diffDays > 0 ? diffDays * car.price_per_day : 0);
    } else {
      setNumberOfDays(0);
      setTotalPrice(0);
    }
  }, [formData.startDate, formData.endDate, car.price_per_day]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Insert reservation into Supabase
      const { error: supabaseError } = await supabase.from('reservations').insert({
        car_name: car.name,
        car_category: car.category,
        customer_name: formData.customerName,
        phone: formData.phone,
        pickup_location: formData.pickupLocation,
        start_date: new Date(formData.startDate).toISOString(),
        end_date: new Date(formData.endDate).toISOString(),
        total_price: totalPrice,
        flight_number: formData.flightNumber || null,
        notes: formData.notes || null,
        status: 'En attente',
      });

      if (supabaseError) {
        throw supabaseError;
      }

      // Format WhatsApp message
      const whatsappMessage = encodeURIComponent(
        `Bonjour Drive in Marrakech, je souhaite confirmer ma réservation :\n\n` +
        `🚗 Véhicule : ${car.name}\n` +
        `📅 Du : ${new Date(formData.startDate).toLocaleDateString('fr-FR')} au ${new Date(formData.endDate).toLocaleDateString('fr-FR')} (${numberOfDays} jours)\n` +
        `📍 Lieu : ${formData.pickupLocation}\n` +
        `👤 Nom : ${formData.customerName}\n` +
        `📞 Téléphone : ${formData.phone}\n` +
        `${formData.flightNumber ? `✈️ Vol : ${formData.flightNumber}\n` : ''}` +
        `${formData.notes ? `📝 Notes : ${formData.notes}\n` : ''}` +
        `💰 Total : ${totalPrice.toFixed(2)} MAD`
      );

      // Open WhatsApp with pre-filled message
      window.open(`https://wa.me/0708181515?text=${whatsappMessage}`, '_blank');

      toast.success('Réservation envoyée avec succès !');
      onOpenChange(false);
      
      // Reset form
      setFormData({
        customerName: '',
        phone: '',
        pickupLocation: '',
        startDate: '',
        endDate: '',
        flightNumber: '',
        notes: '',
      });
    } catch (error) {
      console.error('Error submitting reservation:', error);
      toast.error('Erreur lors de la réservation. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[95vw] w-full max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-display font-bold">
            Réserver : {car.name}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Vehicle Summary */}
          <div className="flex items-center gap-4 p-4 bg-accent rounded-lg">
            <img
              src={car.image_url}
              alt={car.name}
              className="w-20 h-20 object-cover rounded-lg"
            />
            <div>
              <p className="font-semibold text-lg">{car.name}</p>
              <p className="text-sm text-muted-foreground">{car.category}</p>
              <p className="text-gold font-bold text-lg">{car.price_per_day} MAD/jour</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Dates */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startDate" className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Date de début
                </Label>
                <Input
                  id="startDate"
                  type="datetime-local"
                  required
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate" className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Date de fin
                </Label>
                <Input
                  id="endDate"
                  type="datetime-local"
                  required
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  className="w-full"
                />
              </div>
            </div>

            {/* Duration Display */}
            {numberOfDays > 0 && (
              <div className="flex items-center gap-2 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
                <Calculator className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                <span className="font-medium text-amber-900 dark:text-amber-100">
                  Durée : {numberOfDays} jour{numberOfDays > 1 ? 's' : ''}
                </span>
              </div>
            )}

            {/* Pickup Location */}
            <div className="space-y-2">
              <Label htmlFor="pickupLocation" className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Lieu de prise en charge
              </Label>
              <Select
                required
                value={formData.pickupLocation}
                onValueChange={(value) => setFormData({ ...formData, pickupLocation: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez un lieu" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Aéroport Marrakech Menara (RAK)">
                    Aéroport Marrakech Menara (RAK)
                  </SelectItem>
                  <SelectItem value="Hôtel / Riad à Marrakech">
                    Hôtel / Riad à Marrakech
                  </SelectItem>
                  <SelectItem value="Agence / Centre-Ville">
                    Agence / Centre-Ville
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Customer Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="customerName" className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Nom complet
                </Label>
                <Input
                  id="customerName"
                  required
                  value={formData.customerName}
                  onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                  placeholder="Votre nom"
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone" className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Téléphone / WhatsApp
                </Label>
                <Input
                  id="phone"
                  required
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="06 XX XX XX XX"
                  className="w-full"
                />
              </div>
            </div>

            {/* Optional Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="flightNumber" className="flex items-center gap-2">
                  <Plane className="w-4 h-4" />
                  Numéro de vol (optionnel)
                </Label>
                <Input
                  id="flightNumber"
                  value={formData.flightNumber}
                  onChange={(e) => setFormData({ ...formData, flightNumber: e.target.value })}
                  placeholder="AT XXX"
                  className="w-full"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes (optionnel)</Label>
              <Input
                id="notes"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Demandes spéciales..."
                className="w-full"
              />
            </div>

            {/* Price Summary */}
            {totalPrice > 0 && (
              <div className="p-4 bg-gradient-gold-subtle rounded-lg border border-gold/20">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Prix par jour</span>
                    <span>{car.price_per_day} MAD</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Nombre de jours</span>
                    <span>{numberOfDays}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold pt-2 border-t border-gold/20">
                    <span>Total Estimé</span>
                    <span className="text-gold">{totalPrice.toFixed(2)} MAD</span>
                  </div>
                </div>
              </div>
            )}

            <Button
              type="submit"
              className="w-full bg-amber-500 hover:bg-amber-600 text-white"
              disabled={isSubmitting || numberOfDays === 0}
            >
              {isSubmitting ? 'Traitement...' : 'Confirmer la réservation'}
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
