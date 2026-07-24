import { motion } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import { SectionHeader, FeatureCard } from '@/components/ui/SectionComponents';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import {
  CreditCard,
  FileCheck,
  Wrench,
  Car,
  Shield,
  Truck,
  FileText,
  HeartHandshake,
  ArrowRight,
  CheckCircle,
} from 'lucide-react';

const services = [
  {
    id: 'financement',
    icon: <CreditCard className="w-8 h-8" />,
    title: 'Financement Flexible',
    description: 'Des solutions de paiement adaptées à votre budget et votre situation.',
    details: [
      'Crédit classique avec taux compétitifs',
      'Location avec option d\'achat (LOA)',
      'Paiement échelonné sans frais',
      'Partenariat avec les principales banques',
      'Étude de dossier gratuite et rapide',
    ],
  },
  {
    id: 'certification',
    icon: <FileCheck className="w-8 h-8" />,
    title: 'Véhicules Certifiés',
    description: 'Chaque véhicule est rigoureusement inspecté avant la vente.',
    details: [
      'Inspection en 150 points de contrôle',
      'Vérification de l\'historique complet',
      'Contrôle technique à jour',
      'Garantie de conformité',
      'Rapport d\'inspection détaillé',
    ],
  },
  {
    id: 'sav',
    icon: <Wrench className="w-8 h-8" />,
    title: 'Service Après-Vente',
    description: 'Un accompagnement continu pour l\'entretien de votre véhicule.',
    details: [
      'Entretien régulier par des experts',
      'Réparations garanties',
      'Pièces d\'origine',
      'Véhicule de courtoisie disponible',
      'Tarifs préférentiels pour nos clients',
    ],
  },
  {
    id: 'reprise',
    icon: <Car className="w-8 h-8" />,
    title: 'Reprise Véhicule',
    description: 'Estimez et revendez votre ancien véhicule facilement.',
    details: [
      'Estimation gratuite et sans engagement',
      'Reprise immédiate au meilleur prix',
      'Déduction directe sur votre nouvel achat',
      'Prise en charge des formalités',
      'Paiement sécurisé',
    ],
  },
  {
    id: 'garantie',
    icon: <Shield className="w-8 h-8" />,
    title: 'Garantie Étendue',
    description: 'Roulez l\'esprit tranquille avec nos garanties complètes.',
    details: [
      'Garantie mécanique jusqu\'à 24 mois',
      'Assistance 24h/24 et 7j/7',
      'Couverture panne et accident',
      'Extension de garantie disponible',
      'Satisfait ou remboursé sous 7 jours',
    ],
  },
  {
    id: 'livraison',
    icon: <Truck className="w-8 h-8" />,
    title: 'Livraison',
    description: 'Recevez votre véhicule où vous le souhaitez.',
    details: [
      'Livraison à domicile disponible',
      'Mise en main personnalisée',
      'Formation aux fonctionnalités du véhicule',
      'Livraison dans tout le Maroc',
      'Suivi en temps réel',
    ],
  },
  {
    id: 'assurance',
    icon: <FileText className="w-8 h-8" />,
    title: 'Assistance Assurance',
    description: 'Nous vous aidons à trouver la meilleure assurance.',
    details: [
      'Comparatif des meilleures offres',
      'Partenariat avec assureurs reconnus',
      'Tarifs négociés exclusifs',
      'Aide aux formalités',
      'Conseil personnalisé',
    ],
  },
  {
    id: 'accompagnement',
    icon: <HeartHandshake className="w-8 h-8" />,
    title: 'Accompagnement Personnalisé',
    description: 'Un conseiller dédié tout au long de votre parcours.',
    details: [
      'Conseiller attitré',
      'Écoute de vos besoins',
      'Recherche personnalisée',
      'Suivi après-vente',
      'Disponibilité totale',
    ],
  },
];

const Services = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-hero">
        <div className="container-luxury">
          <SectionHeader
            badge="Nos Services"
            title="Un Accompagnement Complet"
            subtitle="De la recherche de votre véhicule au service après-vente, AUTOCONFIANCE vous accompagne à chaque étape"
          />
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding bg-background">
        <div className="container-luxury">
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                id={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="luxury-card p-6 md:p-8 scroll-mt-24"
              >
                <div className="flex items-start gap-5">
                  <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center text-gold flex-shrink-0">
                    {service.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-display font-semibold text-foreground mb-2">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground mb-4">{service.description}</p>
                    <ul className="space-y-2">
                      {service.details.map((detail, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                          <span className="text-foreground">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-charcoal text-ivory">
        <div className="container-luxury text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
              Besoin d'un Conseil Personnalisé ?
            </h2>
            <p className="text-ivory/70 text-lg mb-8 max-w-2xl mx-auto">
              Notre équipe est à votre disposition pour répondre à toutes vos questions
              et vous accompagner dans votre projet automobile.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/contact">
                <Button variant="gold" size="lg">
                  Nous Contacter
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link to="/rendez-vous">
                <Button variant="goldOutline" size="lg" className="border-gold-light text-gold-light hover:bg-gold-light/10">
                  Prendre Rendez-vous
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
