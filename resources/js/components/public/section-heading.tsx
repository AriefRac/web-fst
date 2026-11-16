import { Link } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

type SectionHeadingProps = {
    eyebrow?: string;
    title: string;
    moreHref?: string;
    moreLabel?: string;
    align?: 'left' | 'center';
};

export function SectionHeading({
    eyebrow,
    title,
    moreHref,
    moreLabel = 'Lihat semua',
    align = 'left',
}: SectionHeadingProps) {
    const centered = align === 'center';

    return (
        <div
            className={cn(
                'mb-8 flex items-end gap-4',
                centered ? 'justify-center text-center' : 'justify-between',
            )}
        >
            <div>
                {eyebrow && (
                    <p className="mb-2 text-xs font-bold tracking-[0.18em] text-primary uppercase">
                        {eyebrow}
                    </p>
                )}
                <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                    {title}
                </h2>
            </div>
            {moreHref && !centered && (
                <Link
                    href={moreHref}
                    className="group inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-primary hover:text-primary-strong"
                >
                    {moreLabel}
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
            )}
        </div>
    );
}
