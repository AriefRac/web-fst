<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Halaman publik
|--------------------------------------------------------------------------
| Sementara memakai Route::inertia + data dummy di frontend.
| Nanti diganti controller yang mengirim data dari database.
*/

Route::inertia('/', 'public/home')->name('home');

// Halaman Profil Resmi
Route::inertia('/profil/sambutan-dekan', 'public/profil/sambutan-dekan')->name('profil.sambutan-dekan');
Route::inertia('/profil/sekilas-fst', 'public/profil/sekilas-fst')->name('profil.sekilas-fst');

$placeholders = [
    // Profil
    'profil'               => 'Profil Fakultas',
    'struktur-organisasi'  => 'Struktur Organisasi',
    'alumni'               => 'Alumni',

    // Akademik
    'program-studi'        => 'Program Studi',
    'dosen'                => 'Dosen',
    'kalender'             => 'Kalender Akademik',
    'beasiswa'             => 'Beasiswa',
    'etika-mahasiswa'      => 'Etika Mahasiswa',
    'akreditasi'           => 'Akreditasi',

    // Penelitian
    'matematika'           => 'Penelitian Matematika',
    'fisika'               => 'Penelitian Fisika',
    'kimia'                => 'Penelitian Kimia',
    'biologi'              => 'Penelitian Biologi',
    'informatika'          => 'Penelitian Informatika',

    // Informasi & Layanan
    'berita'               => 'Berita',
    'pengumuman'           => 'Pengumuman',
    'agenda'               => 'Agenda',
    'dokumen'              => 'Dokumen',
    'layanan-administrasi' => 'Layanan Administrasi',
    'kritik-saran'         => 'Kritik & Saran',
];

foreach ($placeholders as $path => $title) {
    Route::inertia($path, 'public/placeholder', ['title' => $title])->name("{$path}.index");
    Route::inertia("{$path}/{slug}", 'public/placeholder', ['title' => $title])->name("{$path}.show");
}

/*
|--------------------------------------------------------------------------
| CMS (sementara memakai dashboard bawaan starter kit)
|--------------------------------------------------------------------------
*/

Route::middleware(['auth'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

require __DIR__.'/settings.php';
