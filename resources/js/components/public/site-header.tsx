import { Link, usePage } from '@inertiajs/react';
import { Mail, Menu, Phone } from 'lucide-react';
import { m } from 'motion/react';
import { lazy, Suspense, useEffect, useState } from 'react';
import { NavDropdown } from '@/components/public/nav-dropdown';
import { SiteLogo } from '@/components/public/site-logo';
import { Button } from '@/components/ui/button';
import { publicNav } from '@/data/navigation';
import { site } from '@/data/site';
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
        <>
            {/* Top bar: kontak + tautan cepat. Ungu sebagai aksen, tidak dominan */}
            <div className="hidden bg-primary-strong text-xs text-white/85 md:block">
                <div className="mx-auto flex h-9 max-w-7xl items-center justify-between px-4 md:px-6">
                    <div className="flex items-center gap-5">
                        <a
                            href={site.phoneHref}
                            className="flex items-center gap-1.5 hover:text-brand-yellow"
                        >
                            <Phone className="size-3.5 text-brand-yellow" />
                            {site.phone}
                        </a>
                        <a
                            href={`mailto:${site.email}`}
                            className="flex items-center gap-1.5 hover:text-brand-yellow"
                        >
                            <Mail className="size-3.5 text-brand-yellow" />
                            {site.email}
                        </a>
                    </div>
                    <div className="flex items-center gap-5">
                        <a
                            href={site.links.portalAkademik}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-brand-yellow"
                        >
                            Portal Akademik
                        </a>
                        <Link href="/login" className="hover:text-brand-yellow">
                            Masuk CMS
                        </Link>
                        <a
                            href={site.links.pmb}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-full bg-brand-yellow px-3 py-1 font-bold text-brand-yellow-foreground transition-colors hover:bg-white"
                        >
                            PMB
                        </a>
                    </div>
                </div>
            </div>

            <m.header
                initial={{ y: -80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className={cn(
                    'sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur-md transition-shadow duration-300',
                    scrolled ? 'shadow-md shadow-primary/5' : 'shadow-none',
                )}
            >
                <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 md:px-6">
                    <SiteLogo />

                    <nav className="hidden items-center gap-1 lg:flex">
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
                                        'relative rounded-md px-3 py-2 text-sm font-semibold transition-colors hover:text-primary',
                                        active
                                            ? 'text-primary'
                                            : 'text-foreground/70',
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

                    <Button
                        variant="ghost"
                        size="icon"
                        className="text-primary lg:hidden"
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
        </>
    );
}
