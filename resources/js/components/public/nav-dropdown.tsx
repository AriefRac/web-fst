import { Link } from '@inertiajs/react';
import { ChevronDown } from 'lucide-react';
import { useId, useState } from 'react';
import type { FocusEvent, KeyboardEvent } from 'react';
import { isSubGroup } from '@/data/navigation';
import type { NavChildren, NavLink } from '@/data/navigation';
import { isActiveGroup, isActiveNav } from '@/lib/nav';
import { cn } from '@/lib/utils';

type NavDropdownProps = {
    label: string;
    links: NavChildren;
    url: string;
    /** Sisi tempat panel menempel; menu di sebelah kanan pakai 'right' agar tidak keluar layar. */
    align?: 'left' | 'right';
};

/**
 * Dropdown menu desktop, dibuat tanpa library (cukup state + CSS transition)
 * supaya tidak menambah bundle. Terbuka saat hover, klik, atau fokus keyboard;
 * tertutup dengan Escape, klik link, atau saat fokus keluar.
 */
export function NavDropdown({
    label,
    links,
    url,
    align = 'left',
}: NavDropdownProps) {
    const [open, setOpen] = useState(false);
    const menuId = useId();
    const active = isActiveGroup(url, links);
    const hasSubgroups = links.some((item) => isSubGroup(item));

    const handleBlur = (event: FocusEvent<HTMLDivElement>) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
            setOpen(false);
        }
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'Escape') {
            setOpen(false);
        }
    };

    const renderLink = (link: NavLink) => {
        const linkActive = isActiveNav(url, link.href);

        return (
            <li key={link.href}>
                <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                        'block rounded-lg border-l-[3px] px-3 py-2 text-sm font-medium transition-colors hover:bg-primary-soft hover:text-primary',
                        linkActive
                            ? 'border-brand-yellow bg-primary-soft text-primary'
                            : 'border-transparent text-foreground/80',
                    )}
                >
                    {link.label}
                </Link>
            </li>
        );
    };

    return (
        <div
            className="relative"
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
        >
            <button
                type="button"
                aria-expanded={open}
                aria-controls={menuId}
                onClick={() => setOpen((value) => !value)}
                className={cn(
                    'relative flex items-center gap-1 rounded-md px-3 py-2 text-sm font-semibold transition-colors hover:text-primary',
                    active || open ? 'text-primary' : 'text-foreground/70',
                )}
            >
                {label}
                <ChevronDown
                    className={cn(
                        'size-4 transition-transform duration-200',
                        open && 'rotate-180',
                    )}
                />
                {active && (
                    <span className="absolute inset-x-3 -bottom-[17px] h-[3px] origin-center animate-nav-underline rounded-t-full bg-brand-yellow" />
                )}
            </button>

            {/* pt-4 = jembatan tak terlihat agar hover tidak putus saat mouse turun ke panel */}
            <div
                id={menuId}
                className={cn(
                    'absolute top-full z-50 pt-4 transition duration-200',
                    align === 'right' ? 'right-0' : 'left-0',
                    open
                        ? 'visible translate-y-0 opacity-100'
                        : 'pointer-events-none invisible -translate-y-1 opacity-0',
                )}
            >
                <div
                    className={cn(
                        'overflow-hidden rounded-xl border bg-white p-3 shadow-xl shadow-primary/10',
                        hasSubgroups ? 'w-[520px]' : 'w-60',
                    )}
                >
                    {/* Garis aksen di atas panel */}
                    <div aria-hidden className="-mx-3 -mt-3 mb-3 flex h-1">
                        <span className="flex-[3] bg-primary" />
                        <span className="flex-1 bg-brand-yellow" />
                    </div>

                    {hasSubgroups ? (
                        <div className="grid grid-cols-2 divide-x divide-neutral-100">
                            {links.map((item, idx) => {
                                if (isSubGroup(item)) {
                                    return (
                                        <div
                                            key={item.group}
                                            className={cn(
                                                'flex flex-col gap-1.5',
                                                idx === 0 ? 'pr-3' : 'pl-3',
                                            )}
                                        >
                                            <div className="px-3 py-1.5 text-xs font-black tracking-wide text-foreground uppercase">
                                                {item.group}
                                            </div>
                                            <ul className="flex flex-col gap-0.5">
                                                {item.links.map(renderLink)}
                                            </ul>
                                        </div>
                                    );
                                }
                                return <ul key={idx}>{renderLink(item)}</ul>;
                            })}
                        </div>
                    ) : (
                        <ul className="flex flex-col gap-0.5">
                            {links.map((link) => renderLink(link as NavLink))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
}
