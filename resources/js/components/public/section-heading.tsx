import { Link } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';

type SectionHeadingProps = {
    eyebrow?: string;
    title: string;
    moreHref?: string;
    moreLabel?: string;
};

export function SectionHeading({
    eyebrow,
    title,
    moreHref,
    moreLabel = 'Lihat semua',
}: SectionHeadingProps) {
    return (
        <div className="mb-8 flex items-end justify-between gap-4">
            <div>
                {eyebrow && (
                    <p className="mb-2 text-sm font-semibold tracking-wider text-muted-foreground uppercase">
                        {eyebrow}
                    </p>
                )}
                <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
                    {title}
                </h2>
            </div>
            {moreHref && (
                <Link
                    href={moreHref}
                    className="group inline-flex shrink-0 items-center gap-1 text-sm font-medium hover:underline"
                >
                    {moreLabel}
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
            )}
        </div>
    );
}
