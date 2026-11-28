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
    SekilasFstContent,
    StudyProgramSummary,
} from '@/types/content';

const img = (seed: string, w: number, h: number) =>
    `https://picsum.photos/seed/${seed}/${w}/${h}`;

export const banners: Banner[] = [
    {
        id: 1,
        title: 'Sains Unggul, Teknologi Inovatif, Berkarakter Islami',
        subtitle:
            'Mencetak lulusan unggul berwawasan global melalui riset inovatif, pengabdian bernilai keislaman, kemitraan strategis, dan tata kelola unggul.',
        imageDesktop: '/images/hero/1.webp',
        imageFit: 'contain',
        ctaLabel: 'Jelajahi Program Studi',
        ctaUrl: '#program-studi',
    },
    {
        id: 2,
        title: 'Akreditasi Unggul untuk Tiga Program Studi',
        subtitle:
            'Komitmen fakultas terhadap mutu pendidikan diakui secara nasional.',
        imageDesktop: '/images/hero/2.webp',
        imageFit: 'contain',
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

export const studyPrograms: StudyProgramSummary[] = [
    {
        id: 1,
        name: 'Matematika',
        slug: 'matematika',
        degree: 'S1',
        accreditation: 'Unggul',
        href: '/program-studi/matematika',
    },
    {
        id: 2,
        name: 'Kimia',
        slug: 'kimia',
        degree: 'S1',
        accreditation: 'Baik Sekali',
        href: '/program-studi/kimia',
    },
    {
        id: 3,
        name: 'Biologi',
        slug: 'biologi',
        degree: 'S1',
        accreditation: 'Unggul',
        href: '/program-studi/biologi',
    },
    {
        id: 4,
        name: 'Fisika',
        slug: 'fisika',
        degree: 'S1',
        accreditation: 'Baik Sekali',
        href: '/program-studi/fisika',
    },
    {
        id: 5,
        name: 'Informatika',
        slug: 'informatika',
        degree: 'S1',
        accreditation: 'Unggul',
        logo: '/images/prodi/informatika.png',
        href: '/program-studi/informatika',
    },
];

/**
 * Konten contoh halaman Sekilas FST (ganti dengan naskah resmi fakultas / data database).
 */
export const sekilasFst: SekilasFstContent = {
    historyTitle:
        'Sejarah Fakultas Sains dan Teknologi UIN Sultan Maulana Hasanuddin Banten',
    historyParagraphs: [
        'Lahirnya Fakultas Sains berawal dari terbitnya Peraturan Presiden Nomor 39 Tahun 2017 tentang UIN Sultan Maulana Hasanuddin Banten, yang memandatkan perluasan kajian keilmuan—tidak lagi terbatas pada ilmu-ilmu keagamaan dan sosial, melainkan turut mengemban kewajiban mengembangkan keilmuan umum lainnya. Mandat tersebut kemudian diwujudkan secara kelembagaan melalui Peraturan Menteri Agama Nomor 39 Tahun 2019 tentang perubahan organisasi dan tata kerja UIN Sultan Maulana Hasanuddin Banten yang menandai berdirinya Fakultas Sains.',
        'Jauh sebelum fakultas ini resmi berdiri, cikal bakalnya telah dimulai ketika Program Studi Fisika dan Program Studi Biologi memperoleh izin operasional pada 27 Desember 2018 berdasarkan Keputusan Menristekdikti RI Nomor 1177/KPT/I/2018, dan langsung membuka penerimaan mahasiswa baru pada tahun akademik 2019–2020 di bawah naungan Fakultas Tarbiyah dan Keguruan. Kepemimpinan perdana Fakultas Sains kemudian resmi ditetapkan lewat SK Rektor Nomor 169/Un.17/B.III.2/KP.07.6/02/2020 tertanggal 5 Februari 2020 dengan Dr. Hidayatullah, M.Pd. sebagai Dekan, didampingi Dr. Asep Saefurrohman, M.Si. sebagai Wakil Dekan Bidang Akademik dan Kemahasiswaan serta Dr. Hj. Fitri Hilmiyati, M.Ed. sebagai Wakil Dekan Bidang Administrasi Umum, Perencanaan, dan Keuangan.',
        'Memasuki periode 2021 hingga 2025, tongkat estafet kepemimpinan beralih berdasarkan SK Rektor UIN Sultan Maulana Hasanuddin Banten Nomor 874/Un.17/BA.III.2/KP.07.6/08/2021. Pada masa ini, Fakultas Sains dipimpin oleh Dr. Asep Saefurohman, M.Si. selaku Dekan bersama Dr. Eko Wahyu Wibowo, M.M. sebagai Wakil Dekan Bidang Akademik dan Kemahasiswaan serta Dr. Shobri, S.Kom., M.M. sebagai Wakil Dekan Bidang Administrasi Umum, Perencanaan, dan Keuangan.',
        'Momentum ekspansi besar terjadi pada tahun 2023 saat Fakultas Sains meraih tiga izin operasional program studi baru sekaligus, yakni Informatika, Matematika, dan Kimia. Kehadiran ketiganya menggenapkan jumlah program studi di bawah naungan Fakultas Sains menjadi lima program studi yang terus didorong bertumbuh menuju akreditasi unggul.',
        'Seiring pergantian Rektor pada tahun 2025, jajaran pimpinan Fakultas Sains kembali mengalami pembaruan melalui SK Rektor UIN Sultan Maulana Hasanuddin Banten Nomor 383/Un.17/BA.III.2/KP.07.6/8/2025. Fakultas ini kini dipimpin kembali oleh Prof. Dr. Hidayatullah, M.Pd. sebagai Dekan, bersama Dr. Eko Wahyu Wibowo, M.M. sebagai Wakil Dekan Bidang Akademik dan Kemahasiswaan dan Dr. Aan Anshori, M.Kom. sebagai Wakil Dekan Bidang Administrasi Umum, Perencanaan, dan Keuangan.',
    ],
    timeline: [
        {
            year: '2017',
            title: 'Mandat perluasan keilmuan UIN SMH Banten (Perpres No. 39/2017)',
        },
        {
            year: '2018',
            title: 'Izin operasional Prodi Fisika & Biologi (27 Desember 2018)',
        },
        {
            year: '2019',
            title: 'Pendirian Fakultas Sains (PMA No. 39/2019) & PMB perdana',
        },
        {
            year: '2020',
            title: 'Pelantikan pimpinan perdana Fakultas Sains (5 Februari 2020)',
        },
        {
            year: '2021',
            title: 'Kepemimpinan periode 2021–2025 (SK Rektor No. 874/2021)',
        },
        {
            year: '2023',
            title: 'Penambahan 3 prodi baru: Informatika, Matematika & Kimia',
        },
        {
            year: '2025',
            title: 'Pembaruan pimpinan fakultas (SK Rektor No. 383/2025)',
        },
    ],
    vision: 'Menjadi Fakultas Sains dan Teknologi Yang Unggul dan Berkarakter Dalam Pengembangan Keilmuan Bidang Sains dan Teknologi.',
    missions: [
        'Melaksanakan pendidikan akademik dan non akademik secara profesional.',
        'Melaksanakan penelitian yang inovatif dan integratif dalam bidang sains dan teknologi.',
        'Melaksanakan pengabdian masyarakat dalam bidang sains dan teknologi, sesuai dengan nilai-nilai keislaman dan peradaban.',
        'Melaksanakan kerjasama yang produktif dan berkelanjutan.',
        'Melaksanakan tata kelola yang baik dan akuntabel.',
    ],
    objectives: [
        'Tercapainya lulusan yang unggul pada bidang sains dan teknologi dengan terintegrasi pada nilai-nilai keislaman yang berkualitas dan berwawasan global.',
        'Terlaksananya penelitian yang inovatif dan integratif pada bidang sains dan teknologi dengan terintegrasi pada nilai-nilai keislaman yang berkualitas.',
        'Terlaksananya pengabdian kepada masyarakat dengan transformasi masyarakat pada bidang sains dan teknologi dengan terintegrasi pada nilai-nilai keislaman.',
        'Terwujudnya kerjasama yang produktif dan keberlanjutan dengan lembaga baik di dalam negeri maupun di luar negeri dalam kegiatan tri dharma perguruan tinggi.',
        'Terwujudnya tata kelola good university governance.',
    ],
    strategicTargets: [
        'Lulusan yang kompetitif dan berdaya saing dalam bidang sains dan teknologi.',
        'Akreditasi nasional dengan kriteria unggul, serta melaksanakan persiapan akreditasi internasional.',
        'Pendidikan kualitas global/internasional. Peningkatan atmosfer akademik untuk menghasilkan lulusan berdaya saing, berkarakter, bermartabat, berjiwa kepeloporan dan memiliki integritas.',
        'Penelitian dan pengabdian kepada masyarakat sebagai penguatan Fakultas Sains UIN SMH Banten dalam mendukung UIN SMH Banten unggul dalam integrasi keilmuan berwawasan global.',
        'Kolaborasi industri. Peningkatan peran kepeloporan Fakultas Sains UIN SMH Banten dalam memberikan kontribusi terbaik bagi bangsa dan negara.',
        'Manajemen islami dan modern/inovasi dalam pengelolaan Pendidikan dengan kampus merdeka.',
        'Peningkatan efektivitas sistem dan operasi pengelolaan organisasi dan kapasitas layanan kelembagaan.',
        'Sumber daya produktif. Peningkatan produktivitas sumber daya insani yang mampu berkarya di tingkat nasional dan internasional, penguatan kapasitas sarana dan prasarana, dan peningkatan sumber serta kapasitas pendanaan.',
    ],
};
