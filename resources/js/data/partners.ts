/**
 * Mitra kerja sama. Nanti bisa dipindah ke tabel `partners` agar dikelola dari CMS.
 */
export type Partner = {
    name: string;
    logo: string;
};

export const partners: Partner[] = [
    {
        name: 'Badan Riset dan Inovasi Nasional',
        logo: '/images/partners/brin.webp',
    },
    {
        name: 'Badan Pengawas Obat dan Makanan',
        logo: '/images/partners/bpom.webp',
    },
    {
        name: 'Pemerintah Provinsi Banten',
        logo: '/images/partners/banten.webp',
    },
    {
        name: 'Pemerintah Kabupaten Tangerang',
        logo: '/images/partners/kab-tangerang.webp',
    },
    {
        name: 'Universitas Sultan Ageng Tirtayasa',
        logo: '/images/partners/untirta.svg',
    },
];
