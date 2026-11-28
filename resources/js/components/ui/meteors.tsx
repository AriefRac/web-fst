import { cn } from '@/lib/utils';

type MeteorsProps = {
    number?: number;
    className?: string;
};

/**
 * Efek hujan meteor bergaya Aceternity UI.
 * Memakai distribusi deterministik agar aman untuk SSR & React Compiler (tanpa Math.random di render).
 */
export function Meteors({ number = 10, className }: MeteorsProps) {
    const meteors = Array.from({ length: number }, (_, idx) => {
        // Sebaran deterministik lebih renggang dan jeda lebih panjang agar tidak ramai
        const leftPercent = ((idx * 43 + 11) % 100) - 5;
        const topPercent = ((idx * 19 + 5) % 35) - 10;
        const delaySeconds = (((idx * 29) % 100) / 10).toFixed(2);
        const durationSeconds = (4.5 + ((idx * 17) % 50) / 10).toFixed(2);

        return {
            left: `${leftPercent}%`,
            top: `${topPercent}%`,
            animationDelay: `${delaySeconds}s`,
            animationDuration: `${durationSeconds}s`,
        };
    });

    return (
        <>
            {meteors.map((style, idx) => (
                <span
                    key={`meteor-${idx}`}
                    aria-hidden="true"
                    style={style}
                    className={cn(
                        'animate-meteor-effect pointer-events-none absolute size-0.5 rounded-full bg-slate-200 shadow-[0_0_0_1px_rgba(255,255,255,0.15)] will-change-transform motion-reduce:hidden',
                        "before:absolute before:top-1/2 before:h-px before:w-[64px] before:-translate-y-1/2 before:bg-gradient-to-r before:from-slate-300/80 before:via-purple-300/40 before:to-transparent before:content-['']",
                        className,
                    )}
                />
            ))}
        </>
    );
}
