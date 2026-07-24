import { useState, useEffect } from 'react';
import { supabase, Car } from '@/lib/supabase';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { AdminAuth } from '@/components/layout/AdminAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { Plus, Edit, Trash2, Users, Briefcase, Gauge, Zap, Save, X, Car as CarIcon } from 'lucide-react';
import { CarCard, CarCardData } from '@/components/cars/CarCard';
import { ImageUpload } from '@/components/ImageUpload';

const categories = ['BERLINE', 'SUV', 'SUV & 4X4', 'ÉCONOMIQUE', 'LUXE'];
const transmissions = ['Automatique', 'Manuelle'];
const fuels = ['Essence', 'Diesel', 'Hybride', 'Électrique'];

interface FormData {
  id?: string;
  name: string;
  category: string;
  image_url: string;
  seats: number;
  luggage: number;
  transmission: string;
  fuel: string;
  price_per_day: number;
  is_available: boolean;
}

const AdminDashboard = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [reservations, setReservations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'cars' | 'reservations'>('cars');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCar, setEditingCar] = useState<Car | null>(null);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    category: 'BERLINE',
    image_url: '',
    seats: 5,
    luggage: 3,
    transmission: 'Automatique',
    fuel: 'Diesel',
    price_per_day: 350,
    is_available: true,
  });

  useEffect(() => {
    fetchCars();
    fetchReservations();
  }, []);

  const fetchCars = async () => {
    try {
      const { data, error } = await supabase
        .from('cars')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCars(data || []);
    } catch (error) {
      console.error('Error fetching cars:', error);
      toast.error('Erreur lors du chargement des véhicules');
    } finally {
      setLoading(false);
    }
  };

  const fetchReservations = async () => {
    try {
      const { data, error } = await supabase
        .from('reservations')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setReservations(data || []);
    } catch (error) {
      console.error('Error fetching reservations:', error);
      toast.error('Erreur lors du chargement des réservations');
    }
  };

  const updateReservationStatus = async (id: string, status: string) => {
    try {
      const { error } = await supabase
        .from('reservations')
        .update({ status })
        .eq('id', id);

      if (error) throw error;
      toast.success('Statut mis à jour');
      fetchReservations();
    } catch (error) {
      console.error('Error updating reservation:', error);
      toast.error('Erreur lors de la mise à jour');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      category: 'BERLINE',
      image_url: '',
      seats: 5,
      luggage: 3,
      transmission: 'Automatique',
      fuel: 'Diesel',
      price_per_day: 350,
      is_available: true,
    });
    setEditingCar(null);
  };

  const handleEdit = (car: Car) => {
    setEditingCar(car);
    setFormData({
      id: car.id,
      name: car.name,
      category: car.category,
      image_url: car.image_url,
      seats: car.seats,
      luggage: car.luggage,
      transmission: car.transmission,
      fuel: car.fuel,
      price_per_day: car.price_per_day,
      is_available: car.is_available,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce véhicule ?')) return;

    try {
      const { error } = await supabase.from('cars').delete().eq('id', id);
      if (error) throw error;
      
      toast.success('Véhicule supprimé avec succès');
      fetchCars();
    } catch (error) {
      console.error('Error deleting car:', error);
      toast.error('Erreur lors de la suppression');
    }
  };

  const handleToggleAvailability = async (car: Car) => {
    try {
      const { error } = await supabase
        .from('cars')
        .update({ is_available: !car.is_available })
        .eq('id', car.id);

      if (error) throw error;
      
      toast.success(`Véhicule ${car.is_available ? 'désactivé' : 'activé'} avec succès`);
      fetchCars();
    } catch (error) {
      console.error('Error toggling availability:', error);
      toast.error('Erreur lors de la modification');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingCar) {
        // Update existing car
        const { error } = await supabase
          .from('cars')
          .update({
            name: formData.name,
            category: formData.category,
            image_url: formData.image_url,
            seats: formData.seats,
            luggage: formData.luggage,
            transmission: formData.transmission,
            fuel: formData.fuel,
            price_per_day: formData.price_per_day,
            is_available: formData.is_available,
          })
          .eq('id', editingCar.id);

        if (error) throw error;
        toast.success('Véhicule mis à jour avec succès');
      } else {
        // Add new car
        const { error } = await supabase.from('cars').insert([
          {
            name: formData.name,
            category: formData.category,
            image_url: formData.image_url,
            seats: formData.seats,
            luggage: formData.luggage,
            transmission: formData.transmission,
            fuel: formData.fuel,
            price_per_day: formData.price_per_day,
            is_available: formData.is_available,
          },
        ]);

        if (error) throw error;
        toast.success('Véhicule ajouté avec succès');
      }

      setIsDialogOpen(false);
      resetForm();
      fetchCars();
    } catch (error) {
      console.error('Error saving car:', error);
      toast.error('Erreur lors de l\'enregistrement');
    }
  };

  const previewCar: CarCardData = {
    id: formData.id || 'preview',
    name: formData.name || 'Nom du véhicule',
    category: formData.category,
    image_url: formData.image_url || 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800',
    seats: formData.seats,
    luggage: formData.luggage,
    transmission: formData.transmission,
    fuel: formData.fuel,
    price_per_day: formData.price_per_day,
    is_available: formData.is_available,
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="container-luxury py-16">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold"></div>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminAuth>
      <AdminLayout>
        <div className="container-luxury">
        {/* Header Card with Tabs */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-3xl font-display font-bold text-foreground mb-2">
                  Tableau de Bord Admin
                </h1>
                <p className="text-muted-foreground">
                  {cars.length} véhicule{cars.length > 1 ? 's' : ''} • {reservations.length} réservation{reservations.length > 1 ? 's' : ''}
                </p>
              </div>
              {activeTab === 'cars' && (
                <Dialog open={isDialogOpen} onOpenChange={(open) => {
                  setIsDialogOpen(open);
                  if (!open) resetForm();
                }}>
                  <DialogTrigger asChild>
                    <Button onClick={() => resetForm()}>
                      <Plus className="w-4 h-4 mr-2" />
                      Ajouter un véhicule
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-[95vw] w-full max-h-[90vh] overflow-y-auto sm:max-w-4xl">
                    <DialogHeader>
                      <DialogTitle>
                        {editingCar ? 'Modifier le véhicule' : 'Ajouter un véhicule'}
                      </DialogTitle>
                    </DialogHeader>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Form */}
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                          <Label htmlFor="name">Nom du véhicule</Label>
                          <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="Ex: Dacia Logan Auto"
                            required
                        />
                      </div>

                      <div>
                        <Label htmlFor="category">Catégorie</Label>
                        <Select
                          value={formData.category}
                          onValueChange={(value) => setFormData({ ...formData, category: value })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((cat) => (
                              <SelectItem key={cat} value={cat}>
                                {cat}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label>Image du véhicule</Label>
                        <ImageUpload
                          value={formData.image_url}
                          onChange={(url) => setFormData({ ...formData, image_url: url })}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="seats">Places</Label>
                          <Input
                            id="seats"
                            type="number"
                            min="1"
                            max="9"
                            value={formData.seats}
                            onChange={(e) => setFormData({ ...formData, seats: parseInt(e.target.value) })}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="luggage">Bagages</Label>
                          <Input
                            id="luggage"
                            type="number"
                            min="0"
                            max="10"
                            value={formData.luggage}
                            onChange={(e) => setFormData({ ...formData, luggage: parseInt(e.target.value) })}
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="transmission">Transmission</Label>
                        <Select
                          value={formData.transmission}
                          onValueChange={(value) => setFormData({ ...formData, transmission: value })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {transmissions.map((trans) => (
                              <SelectItem key={trans} value={trans}>
                                {trans}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="fuel">Carburant</Label>
                        <Select
                          value={formData.fuel}
                          onValueChange={(value) => setFormData({ ...formData, fuel: value })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {fuels.map((fuel) => (
                              <SelectItem key={fuel} value={fuel}>
                                {fuel}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="price_per_day">Prix par jour (MAD)</Label>
                        <Input
                          id="price_per_day"
                          type="number"
                          min="0"
                          step="0.01"
                          value={formData.price_per_day}
                          onChange={(e) => setFormData({ ...formData, price_per_day: parseFloat(e.target.value) })}
                          required
                        />
                      </div>

                      <div className="flex items-center space-x-2">
                        <Switch
                          id="is_available"
                          checked={formData.is_available}
                          onCheckedChange={(checked) => setFormData({ ...formData, is_available: checked })}
                        />
                        <Label htmlFor="is_available">Disponible</Label>
                      </div>

                      <div className="flex gap-2 pt-4">
                        <Button type="submit" className="flex-1">
                          <Save className="w-4 h-4 mr-2" />
                          {editingCar ? 'Mettre à jour' : 'Ajouter'}
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => {
                            setIsDialogOpen(false);
                            resetForm();
                          }}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </form>

                    {/* Live Preview */}
                    <div className="lg:sticky lg:top-4">
                      <h3 className="font-semibold mb-4 text-foreground">Aperçu en direct</h3>
                      <CarCard car={previewCar} />
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
              )}
            </div>
          </CardHeader>
        </Card>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-6">
          <Button
            variant={activeTab === 'cars' ? 'default' : 'outline'}
            onClick={() => setActiveTab('cars')}
            className="flex items-center gap-2"
          >
            <CarIcon className="w-4 h-4" />
            Véhicules
          </Button>
          <Button
            variant={activeTab === 'reservations' ? 'default' : 'outline'}
            onClick={() => setActiveTab('reservations')}
            className="flex items-center gap-2"
          >
            <Users className="w-4 h-4" />
            Réservations
          </Button>
        </div>

        {/* Cars Table */}
        {activeTab === 'cars' && (
        <Card>
          <CardHeader>
            <CardTitle>Liste des véhicules</CardTitle>
          </CardHeader>
          <CardContent>
            {cars.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-accent flex items-center justify-center">
                  <Plus className="w-10 h-10 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-display font-semibold text-foreground mb-2">
                  Aucun véhicule dans la flotte
                </h3>
                <p className="text-muted-foreground mb-6">
                  Commencez par ajouter votre premier véhicule
                </p>
                <Button onClick={() => setIsDialogOpen(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Ajouter un véhicule
                </Button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Image</TableHead>
                    <TableHead>Nom</TableHead>
                    <TableHead>Catégorie</TableHead>
                    <TableHead>Prix/jour</TableHead>
                    <TableHead>Transmission</TableHead>
                    <TableHead>Carburant</TableHead>
                    <TableHead>Disponible</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cars.map((car) => (
                    <TableRow key={car.id}>
                      <TableCell>
                        <img
                          src={car.image_url}
                          alt={car.name}
                          className="w-16 h-12 object-cover rounded"
                        />
                      </TableCell>
                      <TableCell className="font-medium">{car.name}</TableCell>
                      <TableCell>{car.category}</TableCell>
                      <TableCell>{car.price_per_day} MAD</TableCell>
                      <TableCell>{car.transmission}</TableCell>
                      <TableCell>{car.fuel}</TableCell>
                      <TableCell>
                        <Switch
                          checked={car.is_available}
                          onCheckedChange={() => handleToggleAvailability(car)}
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEdit(car)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDelete(car.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              </div>
            )}
          </CardContent>
        </Card>
        )}

        {/* Reservations Table */}
        {activeTab === 'reservations' && (
        <Card>
          <CardHeader>
            <CardTitle>Liste des réservations</CardTitle>
          </CardHeader>
          <CardContent>
            {reservations.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-muted-foreground">Aucune réservation pour le moment.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Véhicule</TableHead>
                      <TableHead>Client</TableHead>
                      <TableHead>Téléphone</TableHead>
                      <TableHead>Dates</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {reservations.map((reservation) => (
                      <TableRow key={reservation.id}>
                        <TableCell>{reservation.car_name}</TableCell>
                        <TableCell>{reservation.customer_name}</TableCell>
                        <TableCell>{reservation.phone}</TableCell>
                        <TableCell>
                          {new Date(reservation.start_date).toLocaleDateString('fr-FR')} - {new Date(reservation.end_date).toLocaleDateString('fr-FR')}
                        </TableCell>
                        <TableCell>{reservation.total_price} MAD</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            reservation.status === 'Confirmé' ? 'bg-green-100 text-green-800' :
                            reservation.status === 'Annulé' ? 'bg-red-100 text-red-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {reservation.status}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Select
                            value={reservation.status}
                            onValueChange={(value) => updateReservationStatus(reservation.id, value)}
                          >
                            <SelectTrigger className="w-[140px]">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="En attente">En attente</SelectItem>
                              <SelectItem value="Confirmé">Confirmé</SelectItem>
                              <SelectItem value="Annulé">Annulé</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
        )}
      </div>
    </AdminLayout>
    </AdminAuth>
  );
};

export default AdminDashboard;
