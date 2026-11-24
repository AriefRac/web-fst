export type NavLink = {
    label: string;
    href: string;
};

export type NavSubGroup = {
    group: string;
    links: NavLink[];
};

export type NavChildren = NavLink[] | NavSubGroup[];

/** Menu utama: berupa link tunggal, atau grup dropdown berisi link langsung atau sub-kategori. */
export type NavItem =
    | (NavLink & { children?: never })
    | { label: string; href?: never; children: NavChildren };

/**
 * Beranda sengaja tidak ada di menu: logo fakultas di header sudah menuju beranda.
 * Halaman yang belum dibuat masih memakai halaman placeholder (routes/web.php).
 */
export const publicNav: NavItem[] = [
    {
        label: 'Profil',
        children: [
            { label: 'Sambutan Dekan', href: '/sambutan-dekan' },
            { label: 'Visi & Misi', href: '/visi-misi' },
            { label: 'Sejarah', href: '/sejarah' },
            { label: 'Struktur Organisasi', href: '/struktur-organisasi' },
            { label: 'Alumni', href: '/alumni' },
        ],
    },
    {
        label: 'Akademik',
        children: [
            { label: 'Program Studi', href: '/program-studi' },
            { label: 'Dosen', href: '/dosen' },
            { label: 'Kalender Akademik', href: '/kalender' },
            { label: 'Beasiswa', href: '/beasiswa' },
            { label: 'Etika Mahasiswa', href: '/etika-mahasiswa' },
            { label: 'Akreditasi', href: '/akreditasi' },
        ],
    },
    {
        label: 'Penelitian',
        children: [
            { label: 'Matematika', href: '/matematika' },
            { label: 'Fisika', href: '/fisika' },
            { label: 'Kimia', href: '/kimia' },
            { label: 'Biologi', href: '/biologi' },
            { label: 'Informatika', href: '/informatika' },
        ],
    },
    {
        label: 'Informasi & Layanan',
        children: [
            {
                group: 'Layanan Pendidikan & Administrasi',
                links: [
                    { label: 'Dokumen', href: '/dokumen' },
                    {
                        label: 'Layanan Administrasi',
                        href: '/layanan-administrasi',
                    },
                ],
            },
            {
                group: 'Informasi & Pengaduan',
                links: [
                    { label: 'Berita', href: '/berita' },
                    { label: 'Pengumuman', href: '/pengumuman' },
                    { label: 'Agenda', href: '/agenda' },
                    { label: 'Kritik & Saran', href: '/kritik-saran' },
                ],
            },
        ],
    },
];

/** Fungsi helper untuk memeriksa apakah item adalah subgroup */
export function isSubGroup(item: NavLink | NavSubGroup): item is NavSubGroup {
    return 'group' in item && Array.isArray(item.links);
}

/** Semua link dalam satu daftar datar (untuk footer). */
export const publicNavLinks: NavLink[] = publicNav.flatMap((item) => {
    if (!item.children) return [item];
    return item.children.flatMap((child) =>
        isSubGroup(child) ? child.links : [child],
    );
});
