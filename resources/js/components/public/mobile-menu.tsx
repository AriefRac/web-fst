import { Link } from '@inertiajs/react';
import { ChevronDown, ExternalLink } from 'lucide-react';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from '@/components/ui/sheet';
import { isSubGroup, publicNav } from '@/data/navigation';
import { isActiveGroup, isActiveNav } from '@/lib/nav';
import { cn } from '@/lib/utils';

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
            <SheetContent
                side="right"
                className="w-72 bg-background text-foreground"
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
                                                    <span className="px-3 pt-2 pb-1 text-xs font-extrabold tracking-wide text-primary uppercase">
                                                        {child.group}
                                                    </span>
                                                    {child.links.map((link) =>
                                                        /^https?:\/\//.test(
                                                            link.href,
                                                        ) ? (
                                                            <a
                                                                key={link.href}
                                                                href={link.href}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                onClick={() =>
                                                                    onOpenChange(
                                                                        false,
                                                                    )
                                                                }
                                                                className={cn(
                                                                    linkClass(
                                                                        false,
                                                                        true,
                                                                    ),
                                                                    'flex items-center justify-between gap-2',
                                                                )}
                                                            >
                                                                <span>
                                                                    {link.label}
                                                                </span>
                                                                <ExternalLink className="size-3.5 shrink-0 opacity-60" />
                                                            </a>
                                                        ) : (
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
                                                        ),
                                                    )}
                                                </div>
                                            );
                                        }

                                        return /^https?:\/\//.test(
                                            child.href,
                                        ) ? (
                                            <a
                                                key={child.href}
                                                href={child.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                onClick={() =>
                                                    onOpenChange(false)
                                                }
                                                className={cn(
                                                    linkClass(false, true),
                                                    'flex items-center justify-between gap-2',
                                                )}
                                            >
                                                <span>{child.label}</span>
                                                <ExternalLink className="size-3.5 shrink-0 opacity-60" />
                                            </a>
                                        ) : (
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
            </SheetContent>
        </Sheet>
    );
}
