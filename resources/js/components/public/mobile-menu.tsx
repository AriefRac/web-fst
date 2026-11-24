import { Link } from '@inertiajs/react';
import { ChevronDown } from 'lucide-react';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from '@/components/ui/sheet';
import { isSubGroup, publicNav } from '@/data/navigation';
import { site } from '@/data/site';
import { cn } from '@/lib/utils';
import { isActiveGroup, isActiveNav } from '@/lib/nav';

type MobileMenuProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    url: string;
};

function linkClass(active: boolean, nested = false): string {
    return cn(
        'rounded-md border-l-[3px] px-3 text-sm hover:bg-primary-soft hover:text-primary',
        nested ? 'py-2 font-medium' : 'py-2.5 font-semibold',
        active
            ? 'border-brand-yellow bg-primary-soft text-primary'
            : 'border-transparent',
    );
}

/**
 * Menu samping untuk layar kecil. File ini (beserta Radix Dialog) dimuat
 * secara lazy oleh SiteHeader saat tombol menu pertama kali disentuh,
 * jadi tidak membebani pengunjung desktop.
 */
export default function MobileMenu({
    open,
    onOpenChange,
    url,
}: MobileMenuProps) {
    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            {/* Sheet dirender di luar layout (portal), jadi perlu theme-light sendiri */}
            <SheetContent
                side="right"
                className="theme-light w-72 bg-background text-foreground"
            >
                <SheetHeader>
                    <SheetTitle className="text-primary">Menu</SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-1 overflow-y-auto px-4">
                    <Link
                        href="/"
                        onClick={() => onOpenChange(false)}
                        className={linkClass(url === '/')}
                    >
                        Beranda
                    </Link>
                    {publicNav.map((item) =>
                        item.children ? (
                            // <details> = accordion bawaan browser, tanpa JS tambahan
                            <details
                                key={item.label}
                                open={isActiveGroup(url, item.children)}
                                className="group"
                            >
                                <summary className="flex cursor-pointer list-none items-center justify-between rounded-md px-3 py-2.5 text-sm font-semibold hover:bg-primary-soft hover:text-primary [&::-webkit-details-marker]:hidden">
                                    {item.label}
                                    <ChevronDown className="size-4 transition-transform group-open:rotate-180" />
                                </summary>
                                <div className="mt-1 mb-2 ml-3 flex flex-col gap-1 border-l pl-2">
                                    {item.children.map((child) => {
                                        if (isSubGroup(child)) {
                                            return (
                                                <div
                                                    key={child.group}
                                                    className="mt-1 flex flex-col gap-0.5"
                                                >
                                                    <span className="px-3 py-1 text-[11px] font-bold tracking-wider text-muted-foreground uppercase">
                                                        {child.group}
                                                    </span>
                                                    {child.links.map((link) => (
                                                        <Link
                                                            key={link.href}
                                                            href={link.href}
                                                            onClick={() =>
                                                                onOpenChange(
                                                                    false,
                                                                )
                                                            }
                                                            className={linkClass(
                                                                isActiveNav(
                                                                    url,
                                                                    link.href,
                                                                ),
                                                                true,
                                                            )}
                                                        >
                                                            {link.label}
                                                        </Link>
                                                    ))}
                                                </div>
                                            );
                                        }

                                        return (
                                            <Link
                                                key={child.href}
                                                href={child.href}
                                                onClick={() =>
                                                    onOpenChange(false)
                                                }
                                                className={linkClass(
                                                    isActiveNav(
                                                        url,
                                                        child.href,
                                                    ),
                                                    true,
                                                )}
                                            >
                                                {child.label}
                                            </Link>
                                        );
                                    })}
                                </div>
                            </details>
                        ) : (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => onOpenChange(false)}
                                className={linkClass(
                                    isActiveNav(url, item.href),
                                )}
                            >
                                {item.label}
                            </Link>
                        ),
                    )}
                </nav>
                {/* Top bar tersembunyi di mobile, jadi tautannya dipindah ke sini */}
                <div className="mt-4 flex flex-col gap-2 border-t px-4 pt-4 text-sm">
                    <a
                        href={site.links.pmb}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-full bg-brand-yellow px-4 py-2.5 text-center font-bold text-brand-yellow-foreground"
                    >
                        Pendaftaran Mahasiswa Baru
                    </a>
                    <a
                        href={site.links.portalAkademik}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-md px-3 py-2 font-medium text-muted-foreground hover:text-primary"
                    >
                        Portal Akademik
                    </a>
                    <Link
                        href="/login"
                        className="rounded-md px-3 py-2 font-medium text-muted-foreground hover:text-primary"
                    >
                        Masuk CMS
                    </Link>
                </div>
            </SheetContent>
        </Sheet>
    );
}
