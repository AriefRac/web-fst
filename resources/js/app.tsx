import { createInertiaApp } from '@inertiajs/react';
import type { ResolvedComponent } from '@inertiajs/react';
import { initializeTheme } from '@/hooks/use-appearance';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

type PageLayout = ResolvedComponent['layout'];
type PageModule = { default: ResolvedComponent };
type LayoutKey = 'public' | 'auth' | 'settings' | 'app';

const pages = import.meta.glob<PageModule>('./pages/**/*.tsx');

/**
 * Layout dimuat dinamis sesuai jenis halaman, jadi setiap layout menjadi
 * chunk terpisah. Pengunjung halaman publik tidak ikut mengunduh kode CMS
 * (sidebar, dropdown, tooltip, toast), dan sebaliknya.
 *
 * Opsi `layout` milik Inertia harus sinkron (halaman CMS memakai
 * `Page.layout = { title, ... }` sebagai props untuk layout default),
 * jadi modul layout dimuat lebih dulu di `resolve` lalu disimpan di cache.
 */
const layoutCache = new Map<LayoutKey, PageLayout>();

function layoutKey(name: string): LayoutKey {
    if (name.startsWith('public/')) {
        return 'public';
    }

    if (name.startsWith('auth/')) {
        return 'auth';
    }

    if (name.startsWith('settings/')) {
        return 'settings';
    }

    return 'app';
}

async function loadLayout(key: LayoutKey): Promise<PageLayout> {
    switch (key) {
        case 'public':
            return (await import('@/layouts/public-layout')).default;
        case 'auth':
            return (await import('@/layouts/auth-layout')).default;
        case 'settings': {
            const [app, settings] = await Promise.all([
                import('@/layouts/app-layout'),
                import('@/layouts/settings/layout'),
            ]);

            return [app.default, settings.default];
        }
        default:
            return (await import('@/layouts/app-layout')).default;
    }
}

async function ensureLayout(key: LayoutKey): Promise<void> {
    if (!layoutCache.has(key)) {
        layoutCache.set(key, await loadLayout(key));
    }
}

void createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    resolve: async (name) => {
        // Halaman & layout diunduh paralel
        const [module] = await Promise.all([
            pages[`./pages/${name}.tsx`]?.(),
            ensureLayout(layoutKey(name)),
        ]);

        if (!module) {
            throw new Error(`Page not found: ${name}`);
        }

        return module.default;
    },
    layout: (name) => layoutCache.get(layoutKey(name)) ?? null,
    strictMode: true,
    progress: {
        color: '#EAB014',
    },
});

// This will set light / dark mode on load...
initializeTheme();
