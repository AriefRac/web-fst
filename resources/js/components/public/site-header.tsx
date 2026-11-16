import { Link, usePage } from '@inertiajs/react';
import { Menu } from 'lucide-react';
import { motion, useMotionValueEvent, useScroll } from 'motion/react';
import { useState } from 'react';
import AppLogoIcon from '@/components/app-logo-icon';
import { Button } from '@/components/ui/button';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import { publicNav } from '@/data/navigation';
import { cn } from '@/lib/utils';

function isActive(currentUrl: string, href: string): boolean {
    const path = currentUrl.split('?')[0];

    return href === '/' ? path === '/' : path.startsWith(href);
}

export function SiteHeader() {
    const { url } = usePage();
    const { scrollY } = useScroll();
    const [scrolled, setScrolled] = useState(false);

    useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y > 16));

    return (
        <motion.header
            initial={{ y: -80 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className={cn(
                'sticky top-0 z-50 w-full border-b transition-colors duration-300',
                scrolled
                    ? 'border-border bg-background/85 backdrop-blur-md'
                    : 'border-transparent bg-background',
            )}
        >
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">
                <Link href="/" className="flex items-center gap-2.5">
                    <AppLogoIcon className="size-8 fill-current" />
                    <span className="leading-tight">
                        <span className="block text-sm font-semibold">
                            Fakultas Teknik
                        </span>
                        <span className="block text-xs text-muted-foreground">
                            Universitas Contoh
                        </span>
                    </span>
                </Link>

                <nav className="hidden items-center gap-1 lg:flex">
                    {publicNav.map((item) => {
                        const active = isActive(url, item.href);

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    'relative rounded-md px-3 py-2 text-sm font-medium transition-colors hover:text-foreground',
                                    active
                                        ? 'text-foreground'
                                        : 'text-muted-foreground',
                                )}
                            >
                                {item.label}
                                {active && (
                                    <motion.span
                                        layoutId="nav-underline"
                                        className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-foreground"
                                    />
                                )}
                            </Link>
                        );
                    })}
                </nav>

                <Sheet>
                    <SheetTrigger asChild>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="lg:hidden"
                            aria-label="Buka menu"
                        >
                            <Menu className="size-5" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="right" className="w-72">
                        <SheetHeader>
                            <SheetTitle>Menu</SheetTitle>
                        </SheetHeader>
                        <nav className="flex flex-col gap-1 px-4">
                            {publicNav.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={cn(
                                        'rounded-md px-3 py-2.5 text-sm font-medium hover:bg-accent',
                                        isActive(url, item.href) && 'bg-accent',
                                    )}
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </nav>
                    </SheetContent>
                </Sheet>
            </div>
        </motion.header>
    );
}
