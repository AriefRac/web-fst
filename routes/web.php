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

$placeholders = [
    'profil' => 'Profil Fakultas',
    'berita' => 'Berita',
    'agenda' => 'Agenda',
    'pengumuman' => 'Pengumuman',
    'dosen' => 'Dosen',
    'dokumen' => 'Dokumen',
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

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

require __DIR__.'/settings.php';
