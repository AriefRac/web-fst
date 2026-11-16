/**
 * Fitur animasi Motion dipisah ke chunk sendiri dan dimuat setelah halaman
 * tampil (lihat PublicLayout), jadi tidak menghambat render pertama.
 */
export { domAnimation as default } from 'motion/react';
