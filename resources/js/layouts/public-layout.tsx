import { LazyMotion, MotionConfig } from 'motion/react';
import type { ReactNode } from 'react';
import { SiteFooter } from '@/components/public/site-footer';
import { SiteHeader } from '@/components/public/site-header';

const loadMotionFeatures = () =>
    import('@/lib/motion-features').then((mod) => mod.default);

/**
 * Layout untuk semua halaman publik (resources/js/pages/public/*).
 * - `theme-light`: halaman publik selalu tema terang (putih), walaupun
 *   pengguna memilih dark mode untuk CMS.
 * - LazyMotion + domAnimation: hanya fitur animasi yang dipakai yang
 *   dibundel (animate, variants, exit, hover, inView), dan dimuat async
 *   setelah render pertama. `strict` membuat error kalau ada yang memakai
 *   `motion.*` (versi berat); selalu pakai `m.*`.
 * - reducedMotion="user": animasi transform mati bila pengguna
 *   mengaktifkan "reduce motion" di sistem operasinya.
 */
export default function PublicLayout({ children }: { children: ReactNode }) {
    return (
        <LazyMotion features={loadMotionFeatures} strict>
            <MotionConfig reducedMotion="user">
                <div
                    className="theme-light flex min-h-screen flex-col bg-background text-foreground"
                    style={{ colorScheme: 'light' }}
                >
                    <SiteHeader />
                    <main className="flex-1">{children}</main>
                    <SiteFooter />
                </div>
            </MotionConfig>
        </LazyMotion>
    );
}
