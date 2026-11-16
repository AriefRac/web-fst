import { Link } from '@inertiajs/react';
import { site } from '@/data/site';
import { cn } from '@/lib/utils';

export function SiteLogo({ className }: { className?: string }) {
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
                <span className="block text-sm font-bold text-primary-strong">
                    {site.facultyName}
                </span>
                <span className="block text-xs text-muted-foreground">
                    {site.university}
                </span>
            </span>
        </Link>
    );
}
