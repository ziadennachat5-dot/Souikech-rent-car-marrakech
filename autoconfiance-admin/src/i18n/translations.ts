export const translations = {
    fr: {
        // Navbar
        home: 'Accueil',
        vehicles: 'Nos Véhicules',
        services: 'Services',
        about: 'À Propos',
        testimonials: 'Témoignages',
        faq: 'FAQ',
        contact: 'Contact',
        appointment: 'Prendre RDV',

        // Admin Dashboard
        admin_dashboard: 'Tableau de Bord Admin',
        admin_subtitle: 'Gérez les voitures et les catégories de votre showroom',
        manage_cars: 'Gestion des Voitures',
        manage_cars_desc: 'Ajoutez, modifiez ou supprimez les voitures disponibles dans votre catalogue',
        go_to_cars: 'Gérer les Voitures',
        manage_categories: 'Gestion des Catégories',
        manage_categories_desc: 'Organisez les catégories de voitures (Citadine, Berline, SUV, etc.)',
        go_to_categories: 'Gérer les Catégories',
        useful_info: 'Informations Utiles',
        total_cars: 'Total Voitures',
        total_categories: 'Total Catégories',
        quick_actions: 'Actions Rapides',
        add_car: 'Ajouter une voiture',
        add_category: 'Ajouter une catégorie',
        sync_db: 'Synchroniser la BD',
        sync_success: 'Base de données synchronisée avec succès !',

        // Admin Cars
        back_dashboard: 'Retour au Tableau de bord',
        search_placeholder: 'Rechercher par nom ou marque...',
        all_categories: 'Toutes les catégories',
        add_new_car: 'Ajouter une voiture',
        edit_car: 'Modifier la voiture',
        delete_car: 'Supprimer',
        edit: 'Modifier',
        delete_confirm: 'Êtes-vous sûr de vouloir supprimer cette voiture ?',

        // Form Fields
        id: 'ID',
        name: 'Nom',
        brand: 'Marque',
        category: 'Catégorie',
        description: 'Description',
        features: 'Caractéristiques (séparées par des virgules)',
        ideal_for: 'Idéal pour',
        comfort: 'Confort',
        usage: 'Utilisation (séparées par des virgules)',
        image_url: 'URL de l\'image',
        save: 'Enregistrer',
        update: 'Mettre à jour',
        cancel: 'Annuler',
        required_fields: 'Les champs obligatoires doivent être remplis',

        // Admin Categories
        category_label: 'Label',
        category_icon: 'Icône',
        delete_category_confirm: 'Êtes-vous sûr de vouloir supprimer cette catégorie ?',
    },
    en: {
        // Navbar
        home: 'Home',
        vehicles: 'Our Vehicles',
        services: 'Services',
        about: 'About',
        testimonials: 'Testimonials',
        faq: 'FAQ',
        contact: 'Contact',
        appointment: 'Book Appointment',

        // Admin Dashboard
        admin_dashboard: 'Admin Dashboard',
        admin_subtitle: 'Manage cars and categories of your showroom',
        manage_cars: 'Car Management',
        manage_cars_desc: 'Add, edit, or remove cars available in your catalog',
        go_to_cars: 'Manage Cars',
        manage_categories: 'Category Management',
        manage_categories_desc: 'Organize car categories (City, Sedan, SUV, etc.)',
        go_to_categories: 'Manage Categories',
        useful_info: 'Useful Information',
        total_cars: 'Total Cars',
        total_categories: 'Total Categories',
        quick_actions: 'Quick Actions',
        add_car: 'Add Car',
        add_category: 'Add Category',
        sync_db: 'Sync Database',
        sync_success: 'Database synchronized successfully!',

        // Admin Cars
        back_dashboard: 'Back to Dashboard',
        search_placeholder: 'Search by name or brand...',
        all_categories: 'All Categories',
        add_new_car: 'Add New Car',
        edit_car: 'Edit Car',
        delete_car: 'Delete',
        edit: 'Edit',
        delete_confirm: 'Are you sure you want to delete this car?',

        // Form Fields
        id: 'ID',
        name: 'Name',
        brand: 'Brand',
        category: 'Category',
        description: 'Description',
        features: 'Features (comma separated)',
        ideal_for: 'Ideal For',
        comfort: 'Comfort',
        usage: 'Usage (comma separated)',
        image_url: 'Image URL',
        save: 'Save',
        update: 'Update',
        cancel: 'Cancel',
        required_fields: 'Required fields must be filled',

        // Admin Categories
        category_label: 'Label',
        category_icon: 'Icon',
        delete_category_confirm: 'Are you sure you want to delete this category?',
    }
};

export type Language = 'fr' | 'en';
export type TranslationKey = keyof typeof translations.fr;
