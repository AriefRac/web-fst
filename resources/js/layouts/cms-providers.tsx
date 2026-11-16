import type { ReactNode } from 'react';
import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';

/**
 * Provider yang hanya dibutuhkan CMS (tooltip sidebar & toast notifikasi).
 * Sengaja tidak dipasang global di app.tsx supaya Radix Tooltip dan Sonner
 * tidak ikut terunduh oleh pengunjung halaman publik.
 */
export function CmsProviders({ children }: { children: ReactNode }) {
    return (
        <TooltipProvider delayDuration={0}>
            {children}
            <Toaster />
        </TooltipProvider>
    );
}
