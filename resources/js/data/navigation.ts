export type NavLink = {
    label: string;
    href: string;
};

/** Menu utama: berupa link tunggal, atau grup dropdown berisi beberapa link. */
export type NavItem =
    | (NavLink & { children?: never })
    | { label: string; href?: never; children: NavLink[] };

/**
 * Beranda sengaja tidak ada di menu: logo fakultas di header sudah menuju beranda.
 * Halaman yang belum dibuat masih memakai halaman placeholder (routes/web.php).
 */
export const publicNav: NavItem[] = [
    {
        label: 'Profil',
        children: [
            { label: 'Sambutan Dekan', href: '/profil/sambutan-dekan' },
            { label: 'Visi & Misi', href: '/profil/visi-misi' },
            { label: 'Sejarah', href: '/profil/sejarah' },
            {
                label: 'Struktur Organisasi',
                href: '/profil/struktur-organisasi',
            },
        ],
    },
    {
        label: 'Akademik',
        children: [
            { label: 'Program Studi', href: '/akademik/program-studi' },
            { label: 'Dosen', href: '/dosen' },
            { label: 'Kalender Akademik', href: '/akademik/kalender' },
        ],
    },
    {
        label: 'Informasi',
        children: [
            { label: 'Berita', href: '/berita' },
            { label: 'Pengumuman', href: '/pengumuman' },
            { label: 'Agenda', href: '/agenda' },
        ],
    },
    { label: 'Dokumen', href: '/dokumen' },
];

/** Semua link dalam satu daftar datar (untuk footer). */
export const publicNavLinks: NavLink[] = publicNav.flatMap((item) =>
    item.children ? item.children : [item],
);
