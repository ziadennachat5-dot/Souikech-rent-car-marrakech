import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Car {
  id: string;
  name: string;
  category: string;
  image_url: string;
  seats: number;
  luggage: number;
  transmission: 'Automatique' | 'Manuelle';
  fuel: 'Essence' | 'Diesel' | 'Hybride' | 'Électrique';
  price_per_day: number;
  is_available: boolean;
  created_at?: string;
  updated_at?: string;
}
