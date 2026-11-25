import { Link, usePage } from '@inertiajs/react';
import { Menu } from 'lucide-react';
import { m } from 'motion/react';
import { lazy, Suspense, useEffect, useState } from 'react';
import { NavDropdown } from '@/components/public/nav-dropdown';
import { SiteLogo } from '@/components/public/site-logo';
import { ThemeToggleButton } from '@/components/public/theme-toggle';
import { Button } from '@/components/ui/button';
import { publicNav } from '@/data/navigation';
import { isActiveNav as isActive } from '@/lib/nav';
import { cn } from '@/lib/utils';

// Menu mobile + Radix Dialog hanya diunduh saat dibutuhkan
const loadMobileMenu = () => import('@/components/public/mobile-menu');
const MobileMenu = lazy(loadMobileMenu);

export function SiteHeader() {
    const { url } = usePage();
    const [scrolled, setScrolled] = useState(false);
    const [menuMounted, setMenuMounted] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        // Listener pasif: tidak menghambat scroll. React mengabaikan setState
        // dengan nilai yang sama, jadi re-render hanya terjadi saat melewati batas.
        const onScroll = () => setScrolled(window.scrollY > 40);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });

        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <m.header
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className={cn(
                'sticky top-0 z-50 w-full border-b border-white/10 bg-[oklch(0.22_0.1_300)]/95 backdrop-blur-md transition-shadow duration-300',
                scrolled ? 'shadow-md shadow-primary/5' : 'shadow-none',
            )}
        >
            {/* Animasi lampu berjalan berwarna emas di tepi bawah navbar */}
            <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 bottom-0 flex h-3 items-end overflow-hidden"
            >
                <span className="block h-[2px] w-1/3 animate-border-beam bg-gradient-to-r from-transparent via-brand-yellow to-transparent shadow-[0_0_10px_1px_var(--brand-yellow)] motion-reduce:hidden" />
            </div>

            <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 md:px-6">
                <SiteLogo inverted />

                <div className="hidden items-center gap-2 lg:flex">
                    <nav className="flex items-center gap-1">
                        {publicNav.map((item, index) => {
                            if (item.children) {
                                return (
                                    <NavDropdown
                                        key={item.label}
                                        label={item.label}
                                        links={item.children}
                                        url={url}
                                        align={
                                            index >= publicNav.length / 2
                                                ? 'right'
                                                : 'left'
                                        }
                                    />
                                );
                            }

                            const active = isActive(url, item.href);

                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={cn(
                                        'relative rounded-md px-3 py-2 text-sm font-semibold transition-colors hover:text-brand-yellow',
                                        active
                                            ? 'text-brand-yellow'
                                            : 'text-white/90',
                                    )}
                                >
                                    {item.label}
                                    {active && (
                                        <span className="absolute inset-x-3 -bottom-[17px] h-[3px] origin-center animate-nav-underline rounded-t-full bg-brand-yellow" />
                                    )}
                                </Link>
                            );
                        })}
                    </nav>
                    <ThemeToggleButton className="ml-2" />
                </div>

                <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-white/10 hover:text-brand-yellow lg:hidden"
                    aria-label="Buka menu"
                    aria-expanded={menuOpen}
                    // Mulai unduh menu saat jari/mouse menyentuh tombol, sebelum klik selesai
                    onPointerDown={loadMobileMenu}
                    onClick={() => {
                        setMenuMounted(true);
                        setMenuOpen(true);
                    }}
                >
                    <Menu className="size-6" />
                </Button>
                {menuMounted && (
                    <Suspense fallback={null}>
                        <MobileMenu
                            open={menuOpen}
                            onOpenChange={setMenuOpen}
                            url={url}
                        />
                    </Suspense>
                )}
            </div>
        </m.header>
    );
}
