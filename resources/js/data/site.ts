/**
 * Identitas situs. Nanti dipindah ke tabel `settings` (PRD 4.10)
 * dan dikirim sebagai shared props Inertia.
 */
export const site = {
    facultyName: 'Fakultas Sains dan Teknologi',
    facultyShort: 'FST',
    university: 'UIN Sultan Maulana Hasanuddin Banten',
    logo: '/images/logo-uin.webp',
    logo2x: '/images/logo-uin@2x.webp',
    logo3x: '/images/logo-uin@3x.webp',
    /** PNG resolusi tinggi untuk favicon / gambar share (Open Graph) */
    logoPng: '/images/logo-uin.png',

    // TODO: lengkapi alamat resmi
    address: 'Kota Serang, Banten',
    phone: '(0254) 200323',
    phoneHref: 'tel:+62254200323',
    email: 'fsains@uinbanten.ac.id',

    /** Tautan eksternal di top bar */
    links: {
        portalAkademik: 'https://neosiakad.uinbanten.ac.id',
        pmb: 'https://pmb.uinbanten.ac.id/',
    },

    /** Angka di section statistik (nanti diambil dari database / pengaturan) */
    stats: [
        { label: 'Dosen', value: 40 },
        { label: 'Mahasiswa', value: 778 },
        { label: 'Program Studi', value: 5 },
        { label: 'Perjanjian Kerja Sama', value: 36 },
    ],

    dean: {
        // TODO: ganti dengan nama & gelar lengkap dekan
        name: 'Nama Dekan, Gelar',
        photo: '/images/dekan.webp',
        photo2x: '/images/dekan@2x.webp',
    },

    /** Video profil fakultas (section terpisah dari sambutan dekan) */
    profileVideo: {
        youtubeId: 'YEbLl6_FOqE',
        start: 2,
    },

    /** Dipakai untuk embed Google Maps di footer (tanpa API key) */
    mapsQuery:
        'Fakultas Sains dan Teknologi UIN Sultan Maulana Hasanuddin Banten',
    mapsUrl: 'https://share.google/ELDpOFNkel8rPCJvH',
} as const;
