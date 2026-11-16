import { MotionConfig } from 'motion/react';
import type { ReactNode } from 'react';
import { SiteFooter } from '@/components/public/site-footer';
import { SiteHeader } from '@/components/public/site-header';

/**
 * Layout untuk semua halaman publik (resources/js/pages/public/*).
 * reducedMotion="user" mematikan animasi transform bila pengguna
 * mengaktifkan "reduce motion" di sistem operasinya.
 */
export default function PublicLayout({ children }: { children: ReactNode }) {
    return (
        <MotionConfig reducedMotion="user">
            <div className="flex min-h-screen flex-col bg-background text-foreground">
                <SiteHeader />
                <main className="flex-1">{children}</main>
                <SiteFooter />
            </div>
        </MotionConfig>
    );
}
