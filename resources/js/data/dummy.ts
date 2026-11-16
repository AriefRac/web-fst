/**
 * Data contoh untuk membangun tampilan sebelum backend siap.
 * Hapus file ini setelah halaman menerima props dari controller.
 */
import type {
    AnnouncementSummary,
    Banner,
    DocumentCategoryLink,
    EventSummary,
    LecturerSummary,
    PostSummary,
} from '@/types/content';

const img = (seed: string, w: number, h: number) =>
    `https://picsum.photos/seed/${seed}/${w}/${h}`;

export const banners: Banner[] = [
    {
        id: 1,
        title: 'Penerimaan Mahasiswa Baru 2027',
        subtitle:
            'Pendaftaran jalur mandiri dibuka hingga 31 Januari 2027. Temukan program studi yang sesuai minatmu.',
        imageDesktop: '/images/hero/gedung-fst.webp',
        imageMobile: '/images/hero/gedung-fst-800.webp',
        ctaLabel: 'Info Pendaftaran',
        ctaUrl: 'https://pmb.uinbanten.ac.id/',
    },
    {
        id: 2,
        title: 'Akreditasi Unggul untuk Tiga Program Studi',
        subtitle:
            'Komitmen fakultas terhadap mutu pendidikan diakui secara nasional.',
        // TODO: resolusi asli hanya 1138x188, ganti dengan foto ≥ 1600 px
        imageDesktop: '/images/hero/gerbang-uin.webp',
        ctaLabel: 'Baca Selengkapnya',
        ctaUrl: '/berita',
    },
    {
        id: 3,
        title: 'Seminar Nasional Teknologi & Masyarakat',
        subtitle: '5 Desember 2026 · Aula Utama Lt. 3 · Terbuka untuk umum',
        imageDesktop: img('fakultas-3', 1920, 800),
        ctaLabel: 'Lihat Agenda',
        ctaUrl: '/agenda',
    },
];

export const headlinePost: PostSummary = {
    id: 1,
    title: 'Mahasiswa Fakultas Raih Juara 1 Kompetisi Inovasi Nasional 2026',
    slug: 'juara-1-kompetisi-inovasi-nasional-2026',
    excerpt:
        'Tim beranggotakan empat mahasiswa berhasil mengungguli 120 tim dari seluruh Indonesia lewat prototipe sistem pemantauan kualitas air berbasis IoT.',
    thumbnail: img('headline', 1280, 720),
    category: 'Prestasi',
    publishedAt: '2026-11-14T09:00:00+07:00',
};

export const latestPosts: PostSummary[] = [
    {
        id: 2,
        title: 'Kuliah Umum Bersama Praktisi Industri Digital',
        slug: 'kuliah-umum-praktisi-industri-digital',
        excerpt:
            'Ratusan mahasiswa mengikuti kuliah umum tentang tren karier di era kecerdasan buatan.',
        thumbnail: img('post-2', 800, 450),
        category: 'Kegiatan',
        publishedAt: '2026-11-12T10:00:00+07:00',
    },
    {
        id: 3,
        title: 'Fakultas Jalin Kerja Sama dengan Tiga Universitas Mitra',
        slug: 'kerja-sama-tiga-universitas-mitra',
        excerpt:
            'Penandatanganan nota kesepahaman mencakup pertukaran mahasiswa dan riset bersama.',
        thumbnail: img('post-3', 800, 450),
        category: 'Kerja Sama',
        publishedAt: '2026-11-10T13:30:00+07:00',
    },
    {
        id: 4,
        title: 'Pengabdian Masyarakat di Desa Binaan Berlanjut',
        slug: 'pengabdian-masyarakat-desa-binaan',
        excerpt:
            'Dosen dan mahasiswa memberikan pelatihan literasi digital bagi pelaku UMKM desa.',
        thumbnail: img('post-4', 800, 450),
        category: 'Pengabdian',
        publishedAt: '2026-11-07T08:00:00+07:00',
    },
];

export const announcements: AnnouncementSummary[] = [
    {
        id: 1,
        title: 'Perpanjangan Batas Pengisian KRS Semester Genap',
        slug: 'perpanjangan-krs-semester-genap',
        category: 'Akademik',
        priority: 'important',
        isPinned: true,
        publishedAt: '2026-11-15T08:00:00+07:00',
    },
    {
        id: 2,
        title: 'Pembukaan Beasiswa Prestasi Tahun 2027',
        slug: 'beasiswa-prestasi-2027',
        category: 'Beasiswa',
        priority: 'normal',
        isPinned: true,
        publishedAt: '2026-11-13T08:00:00+07:00',
    },
    {
        id: 3,
        title: 'Jadwal Ujian Akhir Semester Ganjil 2026/2027',
        slug: 'jadwal-uas-ganjil-2026',
        category: 'Akademik',
        priority: 'normal',
        isPinned: false,
        publishedAt: '2026-11-11T08:00:00+07:00',
    },
    {
        id: 4,
        title: 'Rekrutmen Asisten Laboratorium',
        slug: 'rekrutmen-asisten-laboratorium',
        category: 'Kemahasiswaan',
        priority: 'normal',
        isPinned: false,
        publishedAt: '2026-11-09T08:00:00+07:00',
    },
];

export const upcomingEvents: EventSummary[] = [
    {
        id: 1,
        title: 'Seminar Nasional Teknologi & Masyarakat',
        slug: 'seminar-nasional-teknologi-masyarakat',
        category: 'Seminar',
        startsAt: '2026-12-05T08:00:00+07:00',
        endsAt: '2026-12-05T15:00:00+07:00',
        locationType: 'hybrid',
        venue: 'Aula Utama Lt. 3',
        executionStatus: 'scheduled',
    },
    {
        id: 2,
        title: 'Workshop Penulisan Artikel Ilmiah',
        slug: 'workshop-penulisan-artikel-ilmiah',
        category: 'Workshop',
        startsAt: '2026-11-25T09:00:00+07:00',
        endsAt: '2026-11-25T12:00:00+07:00',
        locationType: 'online',
        venue: 'Zoom Meeting',
        executionStatus: 'scheduled',
    },
    {
        id: 3,
        title: 'Yudisium Periode Desember 2026',
        slug: 'yudisium-desember-2026',
        category: 'Akademik',
        startsAt: '2026-12-12T08:00:00+07:00',
        endsAt: '2026-12-12T11:00:00+07:00',
        locationType: 'offline',
        venue: 'Gedung Serbaguna',
        executionStatus: 'postponed',
    },
];

export const lecturers: LecturerSummary[] = [
    {
        id: 1,
        name: 'Prof. Dr. Siti Rahmawati, M.T.',
        slug: 'siti-rahmawati',
        photo: img('dosen-1', 300, 400),
        studyProgram: 'Teknik Informatika',
        functionalPosition: 'Guru Besar',
    },
    {
        id: 2,
        name: 'Dr. Andi Pratama, M.Kom.',
        slug: 'andi-pratama',
        photo: img('dosen-2', 300, 400),
        studyProgram: 'Sistem Informasi',
        functionalPosition: 'Lektor Kepala',
    },
    {
        id: 3,
        name: 'Rina Kusuma, S.T., M.Sc.',
        slug: 'rina-kusuma',
        photo: img('dosen-3', 300, 400),
        studyProgram: 'Teknik Elektro',
        functionalPosition: 'Lektor',
    },
    {
        id: 4,
        name: 'Budi Santoso, M.Eng.',
        slug: 'budi-santoso',
        photo: img('dosen-4', 300, 400),
        studyProgram: 'Teknik Informatika',
        functionalPosition: 'Asisten Ahli',
    },
];

export const documentCategories: DocumentCategoryLink[] = [
    { label: 'Akademik', count: 24, href: '/dokumen?kategori=akademik' },
    { label: 'Formulir', count: 18, href: '/dokumen?kategori=formulir' },
    { label: 'SK & Peraturan', count: 12, href: '/dokumen?kategori=sk' },
    { label: 'Panduan', count: 9, href: '/dokumen?kategori=panduan' },
];
