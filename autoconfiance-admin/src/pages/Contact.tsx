import { motion } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import { SectionHeader } from '@/components/ui/SectionComponents';
import { Button } from '@/components/ui/button';
import { Phone, Clock, MessageCircle, Facebook, Instagram } from 'lucide-react';

const Contact = () => {

  return (
    <Layout>
      <section className="pt-32 pb-16 bg-gradient-hero">
        <div className="container-luxury">
          <SectionHeader
            badge="Contact"
            title="Contactez-Nous"
            subtitle="Notre équipe est à votre disposition pour répondre à toutes vos questions"
          />
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-luxury">
          <div className="max-w-2xl mx-auto">
            {/* Contact Info */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
              <h2 className="text-3xl font-display font-bold mb-8">Nos Coordonnées</h2>
              <div className="space-y-6 mb-12 text-left">
                <div className="flex items-start gap-6 p-6 bg-accent rounded-lg shadow-soft border border-border hover:border-gold/30 transition-all">
                  <div className="p-3 bg-white/50 rounded-full text-gold">
                    <Phone className="w-8 h-8" />
                  </div>
                  <div>
                    <p className="font-semibold text-lg mb-2">Téléphone / WhatsApp</p>
                    <div className="flex flex-col gap-1">
                      <a href="tel:0708181515" className="text-muted-foreground hover:text-gold text-lg transition-colors">0708181515</a>
                      <a href="https://wa.me/0708181515" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-gold text-lg transition-colors">WhatsApp</a>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-6 p-6 bg-accent rounded-lg shadow-soft border border-border hover:border-gold/30 transition-all">
                  <div className="p-3 bg-white/50 rounded-full text-gold">
                    <Clock className="w-8 h-8" />
                  </div>
                  <div>
                    <p className="font-semibold text-lg mb-2">Horaires</p>
                    <p className="text-muted-foreground text-lg">Lundi - Samedi: 9h00 - 19h00</p>
                  </div>
                </div>

                <div className="flex items-start gap-6 p-6 bg-accent rounded-lg shadow-soft border border-border hover:border-gold/30 transition-all">
                  <div className="p-3 bg-white/50 rounded-full text-gold">
                    <Facebook className="w-8 h-8" />
                  </div>
                  <div>
                    <p className="font-semibold text-lg mb-2">Facebook</p>
                    <a href="https://www.facebook.com/people/Marrakech-Car-Rental/61570262177371/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-gold text-lg transition-colors">Marrakech Car Rental</a>
                  </div>
                </div>

                <div className="flex items-start gap-6 p-6 bg-accent rounded-lg shadow-soft border border-border hover:border-gold/30 transition-all">
                  <div className="p-3 bg-white/50 rounded-full text-gold">
                    <Instagram className="w-8 h-8" />
                  </div>
                  <div>
                    <p className="font-semibold text-lg mb-2">Instagram</p>
                    <a href="https://www.instagram.com/mavoituremarrakech/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-gold text-lg transition-colors">@mavoituremarrakech</a>
                  </div>
                </div>
              </div>

              <a href="https://wa.me/0708181515" target="_blank" rel="noopener noreferrer" className="inline-block w-full sm:w-auto">
                <Button variant="gold" size="lg" className="w-full sm:min-w-[300px] h-14 text-lg">
                  <MessageCircle className="w-6 h-6 mr-3" />
                  Contacter via WhatsApp
                </Button>
              </a>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
