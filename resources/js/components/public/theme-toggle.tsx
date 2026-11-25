import { Check, Moon, Sun } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useAppearance } from '@/hooks/use-appearance';
import { cn } from '@/lib/utils';

/**
 * Tombol pengalih Dark/Light mode di pojok kanan atas navbar untuk tampilan PC.
 */
export function ThemeToggleButton({ className }: { className?: string }) {
    const { resolvedAppearance, updateAppearance } = useAppearance();
    const isDark = resolvedAppearance === 'dark';

    const toggleTheme = () => {
        updateAppearance(isDark ? 'light' : 'dark');
    };

    return (
        <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={toggleTheme}
            aria-label={isDark ? 'Aktifkan mode terang' : 'Aktifkan mode gelap'}
            title={isDark ? 'Ganti ke Light Mode' : 'Ganti ke Dark Mode'}
            className={cn(
                'size-9 rounded-full border-white/25 bg-white/10 text-white transition-colors hover:border-brand-yellow/70 hover:bg-white/20 hover:text-brand-yellow',
                className,
            )}
        >
            {isDark ? (
                <Sun className="size-4 text-brand-yellow" />
            ) : (
                <Moon className="size-4 text-white" />
            )}
        </Button>
    );
}

/**
 * Pop-up kotak kecil di pojok kanan bawah untuk mengatur Dark dan Light mode pada tampilan mobile/HP.
 */
export function MobileThemePopup() {
    const { resolvedAppearance, updateAppearance } = useAppearance();
    const [open, setOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const isDark = resolvedAppearance === 'dark';

    useEffect(() => {
        if (!open) {
            return;
        }

        const handlePointerDown = (event: MouseEvent | TouchEvent) => {
            if (
                containerRef.current &&
                !containerRef.current.contains(event.target as Node)
            ) {
                setOpen(false);
            }
        };

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setOpen(false);
            }
        };

        document.addEventListener('mousedown', handlePointerDown);
        document.addEventListener('touchstart', handlePointerDown);
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('mousedown', handlePointerDown);
            document.removeEventListener('touchstart', handlePointerDown);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [open]);

    return (
        <div
            ref={containerRef}
            className="fixed right-4 bottom-4 z-50 flex flex-col items-end lg:hidden"
        >
            {open && (
                <div
                    role="dialog"
                    aria-label="Pengaturan tema tampilan"
                    className="mb-2 w-40 rounded-xl border border-border bg-popover p-1.5 text-popover-foreground shadow-xl shadow-black/20"
                >
                    <p className="px-2.5 py-1 text-[11px] font-bold tracking-wide text-muted-foreground uppercase">
                        Tema Tampilan
                    </p>
                    <div className="mt-1 flex flex-col gap-1">
                        <button
                            type="button"
                            onClick={() => {
                                updateAppearance('light');
                                setOpen(false);
                            }}
                            className={cn(
                                'flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-xs font-semibold transition-colors',
                                !isDark
                                    ? 'bg-primary-soft text-primary'
                                    : 'text-foreground/80 hover:bg-muted',
                            )}
                        >
                            <span className="flex items-center gap-2">
                                <Sun className="size-3.5 text-amber-500" />
                                Light Mode
                            </span>
                            {!isDark && <Check className="size-3.5" />}
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                updateAppearance('dark');
                                setOpen(false);
                            }}
                            className={cn(
                                'flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-xs font-semibold transition-colors',
                                isDark
                                    ? 'bg-primary-soft text-primary'
                                    : 'text-foreground/80 hover:bg-muted',
                            )}
                        >
                            <span className="flex items-center gap-2">
                                <Moon className="size-3.5 text-primary" />
                                Dark Mode
                            </span>
                            {isDark && <Check className="size-3.5" />}
                        </button>
                    </div>
                </div>
            )}

            <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => setOpen((value) => !value)}
                aria-expanded={open}
                aria-label="Pengaturan tema Dark dan Light mode"
                className="size-11 rounded-xl border-border bg-card/95 text-foreground shadow-lg shadow-black/15 backdrop-blur-md hover:border-primary/40 hover:bg-primary-soft hover:text-primary"
            >
                {isDark ? (
                    <Moon className="size-5 text-primary" />
                ) : (
                    <Sun className="size-5 text-amber-500" />
                )}
            </Button>
        </div>
    );
}
