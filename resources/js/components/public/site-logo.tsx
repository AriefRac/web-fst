import { Link } from '@inertiajs/react';
import { site } from '@/data/site';
import { cn } from '@/lib/utils';

export function SiteLogo({
    className,
    inverted = false,
}: {
    className?: string;
    inverted?: boolean;
}) {
    return (
        <Link href="/" className={cn('flex items-center gap-3', className)}>
            <img
                src={site.logo}
                srcSet={`${site.logo} 1x, ${site.logo2x} 2x, ${site.logo3x} 3x`}
                alt={`Logo ${site.university}`}
                className="h-11 w-auto"
                width={37}
                height={44}
            />
            <span className="leading-tight">
                <span
                    className={cn(
                        'block text-sm font-bold',
                        inverted ? 'text-white' : 'text-primary-strong',
                    )}
                >
                    {site.facultyName}
                </span>
                <span
                    className={cn(
                        'block text-xs',
                        inverted ? 'text-white/80' : 'text-muted-foreground',
                    )}
                >
                    {site.university}
                </span>
            </span>
        </Link>
    );
}
