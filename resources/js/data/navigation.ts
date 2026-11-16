export type PublicNavItem = {
    label: string;
    href: string;
};

export const publicNav: PublicNavItem[] = [
    { label: 'Beranda', href: '/' },
    { label: 'Profil', href: '/profil' },
    { label: 'Berita', href: '/berita' },
    { label: 'Agenda', href: '/agenda' },
    { label: 'Pengumuman', href: '/pengumuman' },
    { label: 'Dosen', href: '/dosen' },
    { label: 'Dokumen', href: '/dokumen' },
];
