import { isSubGroup } from '@/data/navigation';
import type { NavChildren } from '@/data/navigation';

/** Menu dianggap aktif jika URL sekarang berada di bawah href-nya. */
export function isActiveNav(currentUrl: string, href: string): boolean {
    const path = currentUrl.split('?')[0];

    return href === '/' ? path === '/' : path.startsWith(href);
}

/** Mengekstrak semua link dari NavChildren (baik list datar maupun list dengan subgroup) */
export function extractNavLinks(children: NavChildren): { href: string }[] {
    return children.flatMap((item) => (isSubGroup(item) ? item.links : [item]));
}

/** Grup dropdown aktif jika salah satu link di dalamnya aktif. */
export function isActiveGroup(
    currentUrl: string,
    children: NavChildren,
): boolean {
    const links = extractNavLinks(children);
    return links.some((link) => isActiveNav(currentUrl, link.href));
}
