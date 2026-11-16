/** Menu dianggap aktif jika URL sekarang berada di bawah href-nya. */
export function isActiveNav(currentUrl: string, href: string): boolean {
    const path = currentUrl.split('?')[0];

    return href === '/' ? path === '/' : path.startsWith(href);
}

/** Grup dropdown aktif jika salah satu link di dalamnya aktif. */
export function isActiveGroup(
    currentUrl: string,
    links: { href: string }[],
): boolean {
    return links.some((link) => isActiveNav(currentUrl, link.href));
}
