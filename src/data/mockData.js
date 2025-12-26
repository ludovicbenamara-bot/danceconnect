export const INITIAL_TEACHERS = [
    {
        id: 1,
        name: 'Sophie Martin',
        style: 'Ballet Classique',
        location: 'Paris 11e',
        rating: 4.9,
        reviews: 128,
        price: '30',
        image: 'https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?auto=format&fit=crop&q=80&w=600',
        Lat: 48.8584,
        Lng: 2.3733,
        bio: 'Passionnée par la danse classique depuis mon plus jeune âge, j\'enseigne aujourd\'hui la rigueur et la grâce du ballet aux élèves de tous niveaux.',
        styles: ['Ballet', 'Barre au sol', 'Pointes'],
        experience: '12 ans d\'enseignement',
        videoThumb: 'https://images.unsplash.com/photo-1518834107812-3006bb00021c?auto=format&fit=crop&q=80&w=800',
        courses: [
            { id: 101, title: 'Ballet Débutant', style: 'Ballet', level: 'Débutant', price: '30', duration: '60', reviews: 45, rating: 4.9 }
        ]
    },
    {
        id: 2,
        name: 'Lucas Dubois',
        style: 'Hip Hop / Street',
        location: 'Paris 13e',
        rating: 4.8,
        reviews: 85,
        price: '25',
        image: 'https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&q=80&w=600',
        Lat: 48.8315,
        Lng: 2.3605,
        bio: 'Danseur urbain professionnel, je partage ma passion pour le Hip Hop et la culture street.',
        styles: ['Hip Hop', 'Street Jazz', 'Break'],
        experience: '8 ans de pratique',
        videoThumb: 'https://images.unsplash.com/photo-1535525153412-5a42439a210d?auto=format&fit=crop&q=80&w=800',
        courses: []
    },
    {
        id: 3,
        name: 'Elena Rodriguez',
        style: 'Salsa & Bachata',
        location: 'Paris 5e',
        rating: 5.0,
        reviews: 210,
        price: '40',
        image: 'https://images.unsplash.com/photo-1508700929628-666bc9536e2d?auto=format&fit=crop&q=80&w=600',
        Lat: 48.8448,
        Lng: 2.3498,
        bio: 'Venez apprendre les danses latines dans une ambiance chaleureuse et festive !',
        styles: ['Salsa', 'Bachata', 'Kizomba'],
        experience: '15 ans d\'enseignement',
        videoThumb: 'https://images.unsplash.com/photo-1516627145497-293526c27632?auto=format&fit=crop&q=80&w=800',
        courses: []
    },
    {
        id: 4,
        name: 'Marc V.',
        style: 'Contemporain',
        location: 'Paris 10e',
        rating: 4.7,
        reviews: 64,
        price: '35',
        image: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=600',
        Lat: 48.8759,
        Lng: 2.3584,
        bio: 'Exploration du mouvement et improvisation sont au cœur de mes cours de danse contemporaine.',
        styles: ['Contemporain', 'Improvisation', 'Floorwork'],
        experience: '10 ans de scène',
        videoThumb: 'https://images.unsplash.com/photo-1508807526345-15e9b5f4eaff?auto=format&fit=crop&q=80&w=800',
        courses: []
    },
];

export const INITIAL_BOOKINGS = [
    {
        id: 1,
        teacherId: 3,
        teacher: 'Elena Rodriguez',
        style: 'Salsa & Bachata',
        date: 'Jeu 26 Nov',
        time: '14:00 - 15:30',
        location: 'Paris 5e',
        status: 'upcoming',
        statusLabel: 'Payé',
        price: 'CHF 30',
        image: 'https://images.unsplash.com/photo-1508700929628-666bc9536e2d?auto=format&fit=crop&q=80&w=200'
    }
];
