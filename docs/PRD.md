# PRD — Website Fakultas + CMS

| | |
|---|---|
| **Versi** | 1.0 — semua pertanyaan terbuka sudah diputuskan |
| **Tanggal** | 16 November 2026 |
| **Stack** | Laravel 13 · Inertia.js 3 · React 19 (TypeScript) · PostgreSQL |
| **Status** | Disetujui, siap dikerjakan |

---

## 1. Latar Belakang & Tujuan

Fakultas butuh website publik yang informatif (berita, profil dosen, dokumen unduhan) dan CMS internal supaya konten bisa dikelola banyak orang tanpa menyentuh kode, dengan alur persetujuan berjenjang agar konten yang tayang terkontrol.

**Tujuan**
1. Pengunjung (mahasiswa, calon mahasiswa, publik) mudah menemukan berita, profil dosen, dan dokumen resmi.
2. Konten dibuat oleh banyak kontributor, tetapi hanya tayang setelah melewati persetujuan Operator lalu Supervisor.
3. Tampilan beranda selalu segar: banner hero bisa diganti, dan berita terbaru otomatis tampil sebagai headline.

**Di luar cakupan v1**
- Login untuk dosen (dosen mengedit profil sendiri)
- Multi-bahasa (ID/EN)
- Komentar publik pada berita
- Integrasi SIAKAD / SINTA otomatis (hanya simpan tautan)

---

## 2. Stakeholder & Peran

| Peran | Deskripsi | Tanggung jawab utama |
|---|---|---|
| **Admin** | Pengelola sistem | Kelola akun & peran, pengaturan situs, master data (kategori, prodi), akses penuh ke semua modul |
| **Supervisor** | Penyetuju akhir (mis. Wakil Dekan / Kabag Humas) | Menyetujui atau menolak konten yang sudah lolos Operator, lalu konten terbit. Menentukan berita default (headline tetap) |
| **Operator** | Penyetuju lapis pertama (mis. staf humas) | Memeriksa draft dari User, minta revisi atau meneruskan ke Supervisor. Mengelola banner dan data dosen |
| **User** | Kontributor konten (mis. staf prodi, admin jurusan) | Membuat dan mengedit draft berita & dokumen miliknya sendiri, lalu mengajukan ke Operator |
| **Pengunjung** | Publik, tanpa login | Membaca berita, melihat profil dosen, mengunduh dokumen |

### 2.1 Matriks Hak Akses

Keterangan: ✅ boleh · 🟡 hanya milik sendiri · ❌ tidak boleh

| Aksi | User | Operator | Supervisor | Admin |
|---|:-:|:-:|:-:|:-:|
| Buat draft berita / agenda / pengumuman / dokumen | ✅ | ✅ | ✅ | ✅ |
| Edit draft (status draft / revisi) | 🟡 | ✅ | ✅ | ✅ |
| Ajukan ke persetujuan | 🟡 | ✅ | ✅ | ✅ |
| Setujui lapis 1 (Operator) | ❌ | ✅ | ✅ | ✅ |
| Setujui akhir & terbitkan | ❌ | ❌ | ✅ | ✅ |
| Tolak / minta revisi | ❌ | ✅ | ✅ | ✅ |
| Arsipkan / turunkan konten terbit | ❌ | ❌ | ✅ | ✅ |
| Hapus konten | 🟡 (hanya draft) | ❌ | ✅ | ✅ |
| Set berita default (headline tetap) | ❌ | ❌ | ✅ | ✅ |
| Sematkan / lepas sematan pengumuman | ❌ | ✅ | ✅ | ✅ |
| Tandai agenda terbit sebagai ditunda / dibatalkan | ❌ | ✅ | ✅ | ✅ |
| Kelola banner hero | ❌ | ✅ | ✅ | ✅ |
| Kelola data dosen | ❌ | ✅ | ✅ | ✅ |
| Kelola kategori & master data | ❌ | ❌ | ❌ | ✅ |
| Kelola akun & peran | ❌ | ❌ | ❌ | ✅ |
| Pengaturan situs | ❌ | ❌ | ❌ | ✅ |
| Lihat log aktivitas | ❌ | ❌ | ✅ | ✅ |

> Implementasi: `spatie/laravel-permission` untuk peran & permission, ditambah Laravel Policy untuk aturan kepemilikan (🟡).

---

## 3. Alur Persetujuan Konten (Workflow)

Berlaku untuk **Berita**, **Agenda**, **Pengumuman**, dan **Dokumen**. (Banner & Dosen dikelola langsung oleh Operator ke atas tanpa workflow, lihat bagian 4.)

### 3.1 Status

| Status | Arti |
|---|---|
| `draft` | Sedang ditulis, hanya terlihat oleh pembuat & peninjau |
| `pending_operator` | Diajukan, menunggu Operator |
| `revision` | Dikembalikan dengan catatan revisi ke pembuat |
| `pending_supervisor` | Lolos Operator, menunggu Supervisor |
| `published` | Tayang di website publik |
| `rejected` | Ditolak final (tidak bisa diajukan ulang tanpa diduplikasi) |
| `archived` | Pernah tayang, sudah diturunkan |

### 3.2 Diagram Alur

```
             ┌──────────── revisi (catatan wajib) ────────────┐
             ▼                                                 │
 [draft] ──ajukan──► [pending_operator] ──setujui──► [pending_supervisor] ──setujui──► [published] ──► [archived]
                          │       │                     │    │                            ▲
                          │       └─ tolak ─► [rejected] ◄┘    │                            │
                          └─ revisi ─► [revision] ──ajukan ulang──► [pending_operator]      │
                                                               └── > 7 hari tanpa aksi ──────┘
                                                                    (auto-publish)
```

### 3.3 Aturan

1. **Pengajuan**: User mengubah `draft`/`revision` menjadi `pending_operator`. Konten terkunci (tidak bisa diedit User) selama proses review.
2. **Operator**: bisa *setujui* (ke `pending_supervisor`), *minta revisi* (ke `revision`, catatan wajib), atau *tolak* (ke `rejected`, alasan wajib). Operator boleh melakukan koreksi kecil sebelum meneruskan; perubahan tercatat di riwayat.
3. **Supervisor**: bisa *setujui* (langsung `published`, `published_at` = sekarang atau jadwal yang dipilih), *minta revisi*, atau *tolak*.
4. **Auto-publish 7 hari**: jika konten berada di `pending_supervisor` **lebih dari 7 hari** tanpa aksi Supervisor, sistem otomatis menerbitkannya. Riwayat mencatat aktor = `system` dengan alasan "auto-publish: melewati batas 7 hari".
   - Dijalankan oleh Laravel Scheduler (command `content:auto-publish`, tiap jam).
   - Pengingat ke Supervisor pada hari ke-5 dan ke-6 (notifikasi in-app + email).
   - Batas hari bisa diubah Admin di Pengaturan (default 7).
5. **Jalan pintas peran tinggi**: konten yang dibuat oleh Operator langsung masuk `pending_supervisor`. Konten yang dibuat Supervisor/Admin boleh langsung diterbitkan.
6. **Penjadwalan**: Supervisor boleh mengisi `scheduled_at`; konten berstatus `published` tetapi baru tampil di publik saat `published_at <= now()`.
7. **Riwayat**: setiap perpindahan status tersimpan di tabel `approval_logs` (siapa, kapan, dari status → ke status, catatan).
8. **Notifikasi** (in-app, opsional email):
   - User: saat kontennya disetujui, diminta revisi, ditolak, atau terbit.
   - Operator: saat ada pengajuan baru.
   - Supervisor: saat ada konten masuk `pending_supervisor` dan pengingat hari ke-5/6.

---

## 4. Fitur

### 4.1 Website Publik

| Halaman | Konten |
|---|---|
| **Beranda** | Banner hero (slider), headline berita (besar), daftar berita terbaru, pengumuman (yang disematkan + terbaru), agenda mendatang, sorotan dosen, pintasan ke dokumen populer |
| **Berita** | Daftar berita (paginasi, filter kategori, pencarian), detail berita (konten, gambar, tag, berita terkait, tombol bagikan) |
| **Agenda** | Tab "Mendatang" & "Selesai", tampilan list dan kalender bulanan, filter kategori; detail agenda (waktu, lokasi/link online, pendaftaran, tombol "Tambah ke Kalender", tautan liputan jika ada) |
| **Pengumuman** | Daftar pengumuman (yang disematkan di atas), filter kategori, label "Kedaluwarsa" untuk yang sudah lewat masa berlaku; detail pengumuman + lampiran |
| **Dosen** | Direktori dosen (filter prodi, jabatan fungsional, pencarian nama/bidang keahlian), halaman profil dosen |
| **Unduhan Dokumen** | Daftar dokumen per kategori, pencarian, info ukuran/tipe/tanggal, tombol unduh, jumlah unduhan |
| **Profil Fakultas** | Halaman statis (sejarah, visi-misi, struktur organisasi, kontak), dapat diedit Admin |

### 4.2 Modul Berita (CRUD + Workflow)

**Field**
- Judul, slug (otomatis, bisa diedit, unik)
- Ringkasan / excerpt (maks. 300 karakter)
- Isi (rich text editor, mis. Tiptap: heading, list, tautan, gambar, embed YouTube, tabel)
- Gambar utama / thumbnail (wajib, rasio 16:9, otomatis di-resize ke beberapa ukuran)
- Kategori (1), tag (banyak)
- Opsi **"Boleh jadi headline"** (default: aktif)
- SEO: meta title, meta description (otomatis dari judul/ringkasan jika kosong)
- `published_at`, `scheduled_at`
- Penulis (otomatis dari akun pembuat)

**Fungsi CMS**
- Daftar berita dengan filter status, kategori, penulis, rentang tanggal; pencarian judul
- Tab "Perlu Ditinjau" untuk Operator/Supervisor (berisi konten yang menunggu peran tersebut)
- Pratinjau sebelum terbit
- Riwayat persetujuan per berita
- Duplikasi berita
- Soft delete (bisa dipulihkan oleh Admin/Supervisor)

### 4.3 Logika Headline Berita (Berita Default + Rotasi 7 Hari)

Posisi headline di beranda (tampilan paling besar) diisi dengan aturan berikut:

1. Supervisor/Admin menandai **satu** berita sebagai **Berita Default** (`is_default_headline = true`). Hanya boleh ada satu; memilih yang baru otomatis melepas yang lama.
2. Saat ada berita baru **terbit** (dan opsi "Boleh jadi headline" aktif), berita itu **menggantikan** posisi headline selama **7 hari** sejak `published_at`.
3. Setelah 7 hari, posisi headline **kembali** ke Berita Default.
4. Jika dalam 7 hari ada lebih dari satu berita baru, yang **paling baru** terbit yang tampil di headline.
5. Jika belum ada Berita Default dan tidak ada berita baru dalam 7 hari, headline diisi berita terbit terbaru.

**Query (pseudo):**
```sql
-- 1. Cari berita baru dalam 7 hari terakhir
SELECT * FROM posts
WHERE status = 'published'
  AND headline_eligible = true
  AND published_at <= now()
  AND published_at > now() - interval '7 days'
ORDER BY published_at DESC
LIMIT 1;

-- 2. Jika kosong → berita default
SELECT * FROM posts WHERE is_default_headline = true AND status = 'published' LIMIT 1;

-- 3. Jika masih kosong → berita terbit terbaru
```

Catatan:
- Dihitung saat request (tidak perlu cron), hasil di-cache ±5 menit dan cache dibersihkan setiap ada berita terbit atau perubahan default.
- Berita yang sedang jadi headline **tidak** diulang di daftar "Berita Terbaru" di bawahnya.
- Durasi 7 hari dapat diubah Admin di Pengaturan.
- CMS menampilkan indikator: "Headline saat ini: *[judul]* — sampai *[tanggal]*, lalu kembali ke default *[judul]*".

### 4.4 Modul Banner Hero

**Field**: judul, subjudul, gambar desktop (wajib, 1920×800), gambar mobile (opsional, 768×960), teks tombol & URL tautan (opsional), urutan, status aktif, tanggal mulai & selesai tayang (opsional).

**Fungsi**
- CRUD oleh Operator, Supervisor, Admin (tanpa workflow persetujuan)
- Atur urutan dengan drag & drop
- Aktif/nonaktif cepat (toggle)
- Penjadwalan: banner hanya tampil jika aktif **dan** sekarang berada dalam rentang mulai–selesai
- Slider di beranda: autoplay ±6 detik, bisa digeser manual, berhenti saat hover, menghormati `prefers-reduced-motion`
- Jika tidak ada banner aktif, tampil banner fallback dari Pengaturan
- Maksimal banner aktif bersamaan: 8 (bisa diatur)

### 4.5 Modul Unduhan Dokumen (CRUD + Workflow)

**Field**: judul, deskripsi singkat, kategori (mis. Akademik, Formulir, SK/Peraturan, Panduan, Akreditasi), file, tahun / tanggal dokumen, status.

**Aturan file**
- Tipe yang diizinkan: PDF, DOC/DOCX, XLS/XLSX, PPT/PPTX, ZIP
- Ukuran maks. 20 MB (dapat diatur)
- Validasi MIME di server, nama file di-*rename* (UUID) saat disimpan
- Unduhan melewati route Laravel (`/dokumen/{slug}/unduh`) agar jumlah unduhan tercatat dan nama file asli dipulihkan

**Fungsi**
- Melewati workflow persetujuan yang sama dengan berita
- Ganti file tanpa mengubah tautan (versi lama disimpan di riwayat)
- Halaman publik: filter kategori & tahun, pencarian, urut terbaru / terpopuler
- Penghitung unduhan

### 4.6 Modul Agenda (CRUD + Workflow)

Agenda adalah **acara yang akan datang** (seminar, kuliah umum, wisuda, yudisium, batas pendaftaran, dll.). Berbeda dengan berita yang melaporkan acara yang **sudah** terjadi.

**Field**
- Judul, slug
- Kategori agenda (mis. Akademik, Seminar/Workshop, Kemahasiswaan, Kerja Sama)
- Deskripsi (rich text sederhana)
- Poster / gambar (opsional, rasio 4:5 atau 16:9)
- Waktu mulai & waktu selesai (tanggal + jam, zona waktu Asia/Jakarta), opsi "Sepanjang hari"
- Jenis lokasi: Luring / Daring / Hybrid
- Lokasi (nama tempat + alamat) dan/atau link daring (Zoom/Meet/YouTube)
- Penyelenggara (mis. Prodi Informatika, BEM)
- Link pendaftaran & batas pendaftaran (opsional)
- Narahubung (nama + kontak, opsional)
- Status pelaksanaan: `scheduled` (default) / `postponed` / `cancelled`, dengan catatan

**Status waktu (dihitung otomatis, tidak disimpan)**
- **Mendatang**: `starts_at > now()`
- **Berlangsung**: `starts_at <= now() <= ends_at`
- **Selesai**: `ends_at < now()`

Agenda otomatis pindah dari "Mendatang" ke "Selesai" tanpa diubah manual.

**Fungsi**
- Melewati workflow persetujuan yang sama dengan berita
- Setelah terbit, Operator ke atas boleh menandai agenda **ditunda / dibatalkan** (tanpa ulang persetujuan); di publik muncul label mencolok
- Tombol **"Tambah ke Kalender"**: unduh file `.ics` dan link Google Calendar
- **Tautan liputan**: saat membuat berita, penulis bisa memilih agenda terkait (`posts.event_id`). Di halaman agenda yang sudah selesai muncul tombol "Baca liputannya →", dan di berita muncul info acara aslinya
- Beranda menampilkan 3–5 agenda mendatang terdekat (urut `starts_at` ASC)
- Halaman `/agenda`: tampilan list dan kalender bulanan
- Agenda **tidak** memengaruhi posisi headline berita

Di luar cakupan v1: agenda berulang (recurring), pendaftaran peserta di dalam sistem.

### 4.7 Modul Pengumuman (CRUD + Workflow)

Pengumuman adalah **informasi singkat yang harus diperhatikan dalam periode tertentu** (jadwal KRS, beasiswa, perubahan jadwal ujian, lowongan asisten, dll.).

**Field**
- Judul, slug
- Kategori (mis. Akademik, Beasiswa, Kemahasiswaan, Kepegawaian)
- Isi (rich text sederhana, tanpa gambar utama)
- Lampiran (0–5 file: PDF, DOCX, XLSX, gambar; maks. 10 MB per file)
- Berlaku mulai (default = saat terbit) & **berlaku sampai** (opsional)
- Disematkan / *pinned* (bool)
- Tingkat penting: Normal / Penting (Penting diberi badge merah)

**Aturan**
- Melewati workflow persetujuan yang sama dengan berita
- Pengumuman yang melewati `valid_until` **hilang dari beranda** tetapi tetap ada di arsip `/pengumuman` dengan label "Kedaluwarsa"
- Maksimal **3 pengumuman disematkan** sekaligus (bisa diatur); sematan otomatis lepas saat kedaluwarsa
- Urutan tampil: disematkan dulu, lalu terbaru berdasarkan `published_at`
- Pengumuman **tidak** memengaruhi posisi headline berita
- Lampiran diunduh lewat route Laravel (validasi MIME sama seperti modul dokumen)

### 4.8 CMS Dosen

**Field**
- Nama lengkap, gelar depan, gelar belakang
- NIP, NIDN (unik)
- Foto (rasio 3:4)
- Program studi (relasi ke master prodi)
- Jabatan fungsional (Asisten Ahli, Lektor, Lektor Kepala, Guru Besar)
- Jabatan struktural (opsional, mis. Kaprodi)
- Bidang keahlian (multi-tag)
- Email institusi
- Riwayat pendidikan (S1/S2/S3: institusi, tahun lulus) — repeater
- Mata kuliah yang diampu (opsional)
- Tautan: Google Scholar, SINTA, Scopus, ORCID, ResearchGate
- Biografi singkat (rich text sederhana)
- Status: aktif / nonaktif (tugas belajar, pensiun)
- Urutan tampil

**Fungsi**
- CRUD oleh Operator, Supervisor, Admin
- Import massal dari CSV/Excel (template disediakan)
- Halaman publik `/dosen` (direktori) dan `/dosen/{slug}` (profil)
- Dosen nonaktif tidak tampil di direktori publik

### 4.9 Manajemen Pengguna (Admin)

- CRUD akun: nama, email, password, peran (satu peran per akun), unit/prodi (opsional), status aktif
- Reset password, paksa ganti password saat login pertama
- Tidak bisa menghapus akun yang punya konten; hanya menonaktifkan

### 4.10 Pengaturan Situs (Admin)

- Identitas: nama fakultas, logo, favicon, alamat, telepon, email, media sosial, peta lokasi
- Parameter: batas hari auto-publish (default 7), durasi headline (default 7 hari), ukuran maks. upload, maks. banner aktif, maks. pengumuman disematkan (default 3), jumlah agenda di beranda (default 4)
- Banner fallback
- Halaman statis (profil fakultas)

### 4.11 Dashboard CMS

Ringkasan sesuai peran:
- **User**: draft saya, konten yang perlu direvisi, status pengajuan
- **Operator**: antrean `pending_operator` (semua tipe konten), jumlah banner aktif, pengumuman yang akan kedaluwarsa ≤ 3 hari
- **Supervisor**: antrean `pending_supervisor` beserta sisa hari sebelum auto-publish (diberi warna jika ≤ 2 hari), headline saat ini, agenda 7 hari ke depan
- **Admin**: semua di atas + statistik (total berita, agenda, pengumuman, dokumen, unduhan, pengguna)

> Antrean review menggabungkan Berita, Agenda, Pengumuman, dan Dokumen dalam satu daftar dengan kolom "Tipe".

### 4.12 Log Aktivitas

Catat aksi penting (login, CRUD, perubahan status, perubahan pengaturan) dengan `spatie/laravel-activitylog`. Bisa difilter per pengguna, modul, dan tanggal.

---

## 5. Model Data (Ringkas)

```
users                 id, name, email, password, is_active, study_program_id?, must_change_password, timestamps
roles / permissions   (spatie/laravel-permission)

categories            id, name, slug, type ('post'|'event'|'announcement'|'document')
tags                  id, name, slug
post_tag              post_id, tag_id

posts                 id, title, slug (unique), excerpt, body (text), thumbnail_path,
                      category_id, author_id, status (enum), headline_eligible (bool, default true),
                      is_default_headline (bool), event_id? (liputan agenda), meta_title, meta_description,
                      submitted_at, published_at, scheduled_at, published_by, view_count,
                      search_vector (tsvector), timestamps, deleted_at

documents             id, title, slug, description, category_id, file_path, original_name,
                      mime_type, size_bytes, document_date, author_id, status (enum),
                      submitted_at, published_at, published_by, download_count, timestamps, deleted_at
document_versions     id, document_id, file_path, original_name, size_bytes, uploaded_by, created_at

events                id, title, slug, category_id, description, poster_path,
                      starts_at (timestamptz), ends_at (timestamptz), is_all_day,
                      location_type ('offline'|'online'|'hybrid'), venue, address, online_url,
                      organizer, registration_url, registration_deadline, contact_name, contact_phone,
                      execution_status ('scheduled'|'postponed'|'cancelled'), execution_note,
                      author_id, status (workflow enum), submitted_at, published_at, published_by,
                      timestamps, deleted_at

announcements         id, title, slug, category_id, body, priority ('normal'|'important'),
                      is_pinned, valid_from, valid_until?, author_id, status (workflow enum),
                      submitted_at, published_at, published_by, timestamps, deleted_at
announcement_attachments  id, announcement_id, file_path, original_name, mime_type, size_bytes, sort_order

approval_logs         id, approvable_type, approvable_id (morph), actor_id (null = system),
                      from_status, to_status, note, created_at

banners               id, title, subtitle, image_desktop, image_mobile, cta_label, cta_url,
                      sort_order, is_active, starts_at, ends_at, created_by, timestamps

study_programs        id, name, code, degree (S1/S2/S3), slug
lecturers             id, full_name, front_title, back_title, slug, nip, nidn, photo_path,
                      study_program_id, functional_position, structural_position, email,
                      bio, scholar_url, sinta_url, scopus_url, orcid_url, researchgate_url,
                      is_active, sort_order, timestamps
lecturer_educations   id, lecturer_id, level, institution, major, graduation_year
expertises            id, name
expertise_lecturer    expertise_id, lecturer_id

settings              key (pk), value (jsonb)
pages                 id, title, slug, body, updated_by, timestamps
notifications         (bawaan Laravel)
activity_log          (spatie/laravel-activitylog)
```

**Catatan PostgreSQL**
- Kolom `status` pakai `varchar` + PHP enum (lebih mudah dimigrasi dibanding tipe ENUM Postgres).
- Partial unique index untuk memastikan hanya satu berita default:
  `CREATE UNIQUE INDEX one_default_headline ON posts (is_default_headline) WHERE is_default_headline = true;`
- Pencarian berita: kolom `tsvector` + indeks GIN (konfigurasi `simple` atau `indonesian` jika tersedia).
- Indeks pada `(status, published_at DESC)` untuk query beranda & headline.
- Indeks `events (status, starts_at)` untuk agenda mendatang dan `announcements (status, is_pinned, valid_until)` untuk pengumuman beranda.
- Kolom waktu agenda pakai `timestamptz`; tampilan dikonversi ke Asia/Jakarta.
- Logika workflow (status, submit/approve/revise/reject, auto-publish) dibuat sebagai **trait `HasApprovalWorkflow`** yang dipakai bersama oleh Post, Event, Announcement, dan Document.

---

## 6. Arsitektur & Teknologi

| Lapisan | Pilihan |
|---|---|
| Backend | Laravel 13 (React starter kit, Fortify auth), PHP 8.5 |
| Frontend | React 19 + TypeScript via Inertia.js 3, Vite+ |
| UI | Tailwind CSS 4 + shadcn/ui (CMS); desain khusus untuk halaman publik |
| Animasi | Motion (ex-Framer Motion) via `LazyMotion` + `m.*` untuk animasi & transisi; Embla Carousel + Autoplay untuk slider banner; CSS untuk efek sederhana |
| Font | Plus Jakarta Sans (variable, self-hosted via `laravel-vite-plugin/fonts`) + `fontaine` untuk fallback metrics |
| Database | PostgreSQL 16 |
| Auth | Laravel Fortify dari starter kit React (session-based) |
| Hak akses | spatie/laravel-permission + Policy |
| Rich text | Tiptap (frontend), sanitasi HTML di server (mis. `mews/purifier`) |
| Media | Laravel Storage (disk `public`), resize gambar dengan `intervention/image` (otomatis ke WebP) |
| Antrean & jadwal | Laravel Queue (database driver) + Scheduler (`content:auto-publish`, pengingat) |
| Log | spatie/laravel-activitylog |
| Routing JS | Laravel Wayfinder (bawaan starter kit) |
| Testing | Pest (feature test workflow, policy, headline) |

**Struktur route**
- Publik: `/`, `/berita`, `/berita/{slug}`, `/agenda`, `/agenda/{slug}`, `/agenda/{slug}/ics`, `/pengumuman`, `/pengumuman/{slug}`, `/pengumuman/lampiran/{id}`, `/dosen`, `/dosen/{slug}`, `/dokumen`, `/dokumen/{slug}/unduh`, `/profil/{slug}`
- CMS: prefix `/cms` dengan middleware `auth` + `role`
  - `/cms/dashboard`, `/cms/berita`, `/cms/agenda`, `/cms/pengumuman`, `/cms/dokumen`, `/cms/banner`, `/cms/dosen`, `/cms/review`, `/cms/pengguna`, `/cms/pengaturan`, `/cms/log`
- Aksi workflow: `POST /cms/{type}/{id}/submit|approve|revise|reject|archive`

**Halaman publik & SEO**: Inertia SSR diaktifkan agar berita bisa diindeks mesin pencari, lengkap dengan meta tag Open Graph per berita, `sitemap.xml`, dan `robots.txt`.

---

## 7. Kebutuhan Non-Fungsional

| Aspek | Kebutuhan |
|---|---|
| Performa | Lihat 7.1 — beranda LCP < 2,5 dtk di 4G, JS awal ≤ 170 KB gzip |
| Keamanan | CSRF (bawaan), validasi & sanitasi input, validasi MIME upload, rate-limit login, password ter-hash, policy di setiap aksi |
| Responsif | Mobile-first, nyaman dari 360 px hingga desktop |
| Aksesibilitas | Kontras WCAG AA, alt text wajib pada gambar, navigasi keyboard, slider bisa dijeda |
| Keandalan | Backup database harian; soft delete untuk konten |
| Audit | Semua perubahan status & aksi admin tercatat |
| Browser | 2 versi terakhir Chrome, Firefox, Edge, Safari |

### 7.1 Anggaran & Aturan Performa

Web harus tetap ringan karena banyak pengunjung (mahasiswa, calon mahasiswa) membuka dari HP dengan kuota terbatas.

**Anggaran (halaman publik, diukur dari build produksi):**

| Metrik | Batas | Kondisi saat ini (beranda) |
|---|---|---|
| JS awal (gzip) | ≤ 170 KB | 162 KB (sebelum optimasi: 252 KB) |
| CSS (gzip) | ≤ 25 KB | 16 KB |
| Font | 1 file woff2, ≤ 40 KB | 27 KB (variable, latin) |
| LCP (4G) | < 2,5 dtk | — (ukur dengan Lighthouse saat deploy) |
| CLS | < 0,1 | — |

**Aturan frontend (wajib diikuti saat menambah fitur):**
- Kode CMS **tidak boleh** masuk bundle halaman publik. Layout dimuat dinamis per jenis halaman (`resources/js/app.tsx`), dan provider khusus CMS (tooltip, toast) ada di `layouts/cms-providers.tsx`.
- Animasi memakai `m.*` dari Motion di dalam `LazyMotion` (bukan `motion.*`); fitur animasi dimuat async. Efek sederhana (hover, denyut, marquee) cukup pakai CSS.
- Komponen berat yang jarang dipakai dimuat lazy saat dibutuhkan (contoh: menu mobile `components/public/mobile-menu.tsx`).
- Embed pihak ketiga memakai *facade* atau `loading="lazy"`: video YouTube baru dimuat saat tombol play diklik; Google Maps lazy.
- Gambar: `loading="lazy"` + `decoding="async"` untuk gambar di bawah layar pertama; gambar hero pertama `fetchpriority="high"`; selalu beri dimensi/rasio agar tidak terjadi layout shift.
- Font di-host sendiri (diunduh saat build), satu file variable woff2, dengan fallback Arial yang metriknya disamakan.

**Aturan gambar upload (backend):**
- Setiap upload gambar diubah ke **WebP** dan dibuat beberapa ukuran (mis. thumbnail 400 px, sedang 800 px, besar 1600 px; banner 768/1280/1920 px), lalu dipakai lewat `srcset` + `sizes`.
- Batas ukuran file asli tetap divalidasi (PRD 4.4–4.7); file asli tidak disajikan langsung ke publik.

**Aturan server / deploy:**
- `php artisan optimize` (config, route, view, event cache) dan OPcache aktif.
- Kompresi gzip/brotli di web server; aset `/build/*` diberi `Cache-Control: public, max-age=31536000, immutable` (nama file sudah ber-hash).
- Inertia SSR (`npm run build:ssr`) diaktifkan untuk halaman publik.
- Query beranda (headline, berita, agenda, pengumuman, statistik, mitra) di-cache dan dibersihkan saat konten berubah.
- Cek Lighthouse (mobile) sebelum rilis; skor Performance target ≥ 90.

---

## 8. Kriteria Penerimaan (Acceptance Criteria)

**Workflow**
- [ ] User tidak bisa menerbitkan konten maupun melewati Operator.
- [ ] Operator tidak bisa menerbitkan konten secara final.
- [ ] Minta revisi & tolak wajib disertai catatan.
- [ ] Konten di `pending_supervisor` lebih dari 7 hari otomatis `published`, dengan log aktor `system`.
- [ ] Supervisor menerima pengingat pada hari ke-5 dan ke-6.

**Headline**
- [ ] Tanpa berita baru dalam 7 hari, headline = Berita Default.
- [ ] Berita baru terbit langsung menjadi headline.
- [ ] Pada hari ke-8 setelah terbit, headline kembali ke Berita Default tanpa campur tangan manual.
- [ ] Dua berita baru dalam seminggu: yang terbaru tampil.
- [ ] Berita dengan "Boleh jadi headline" nonaktif tidak menggeser headline.
- [ ] Hanya satu berita yang bisa berstatus default (dijaga di level database).

**Banner**
- [ ] Banner di luar jadwal atau nonaktif tidak tampil.
- [ ] Urutan slider mengikuti urutan di CMS.

**Dokumen**
- [ ] File di luar tipe yang diizinkan atau melebihi batas ukuran ditolak.
- [ ] Setiap unduhan menambah penghitung; nama file unduhan sesuai nama asli.

**Agenda**
- [ ] Agenda yang `ends_at`-nya lewat otomatis tampil di tab "Selesai" dan hilang dari beranda.
- [ ] Beranda menampilkan agenda mendatang urut dari yang terdekat.
- [ ] Agenda bertanda ditunda/dibatalkan menampilkan label di halaman publik.
- [ ] File `.ics` bisa diimpor ke Google Calendar / Outlook dengan waktu yang benar (WIB).
- [ ] Berita yang ditautkan ke agenda memunculkan tombol "Baca liputannya" di agenda tersebut.
- [ ] Agenda dan pengumuman tidak pernah menggeser headline berita.

**Pengumuman**
- [ ] Pengumuman yang lewat `valid_until` hilang dari beranda, tetap ada di arsip dengan label "Kedaluwarsa".
- [ ] Tidak bisa menyematkan lebih dari batas maksimal (default 3).
- [ ] Pengumuman disematkan selalu tampil paling atas.

**Dosen**
- [ ] Dosen nonaktif tidak tampil di direktori publik.
- [ ] Import CSV menolak baris dengan NIDN duplikat dan menampilkan laporan baris gagal.

---

## 9. Tahapan Pengerjaan (Milestone)

| Fase | Cakupan | Estimasi |
|---|---|---|
| **1. Fondasi** | Setup Laravel + Inertia React + Postgres, auth, peran & permission, layout CMS, manajemen pengguna | 1 minggu |
| **2. Berita & Workflow** | CRUD berita, kategori/tag, editor, state machine status, approval log, notifikasi, auto-publish scheduler | 2 minggu |
| **3. Beranda Publik** | Banner hero (CRUD + slider), logika headline, daftar & detail berita, SEO/SSR | 1,5 minggu |
| **4. Agenda & Pengumuman** | CRUD + workflow (pakai ulang trait), list & kalender agenda, `.ics`, tautan liputan, sematan & kedaluwarsa pengumuman, widget beranda | 1,5 minggu |
| **5. Dokumen** | CRUD dokumen + workflow, halaman unduhan, penghitung | 1 minggu |
| **6. Dosen** | CRUD dosen, import CSV, direktori & profil publik | 1 minggu |
| **7. Penyempurnaan** | Dashboard per peran, pengaturan situs, log aktivitas, halaman statis, testing, deploy | 1,5 minggu |

---

## 10. Keputusan

Semua pertanyaan terbuka sudah dijawab (16 November 2026).

| # | Topik | Keputusan |
|---|---|---|
| 1 | Auto-publish | Konten di `pending_supervisor` yang tidak ditindak Supervisor **lebih dari 7 hari** otomatis terbit. Konten yang tertahan di Operator **tidak** ikut auto-publish. |
| 2 | Banner | Tanpa persetujuan; dikelola langsung oleh Operator, Supervisor, dan Admin. |
| 3 | Peran Admin | Admin **boleh menyetujui & menerbitkan** konten (setara Supervisor), selain mengurus akun & pengaturan. |
| 4 | Durasi headline | **7 × 24 jam** sejak `published_at` (mis. terbit Senin 14.00, kembali ke default Senin berikutnya 14.00). |
| 5 | Akun dosen | **Tidak di v1.** Profil dosen dikelola Operator; akun dosen masuk backlog versi berikutnya. |
| 6 | Agenda & Pengumuman | Dua **modul terpisah** (bagian 4.6 dan 4.7) dengan workflow yang sama seperti berita. |
| 7 | Multi-prodi | User **tidak dibatasi** per prodi; semua konten milik fakultas. Kolom `study_program_id` di `users` hanya informasi opsional. |

### Backlog (setelah v1)
- Akun dosen untuk memperbarui profil sendiri (dengan persetujuan Operator)
- Multi-bahasa (ID/EN)
- Agenda berulang & pendaftaran peserta di dalam sistem
- Integrasi SINTA / SIAKAD otomatis
