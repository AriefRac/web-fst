import { Link } from '@inertiajs/react';
import {
    ArrowRight,
    Atom,
    Cpu,
    Dna,
    FlaskConical,
    GraduationCap,
    Sigma,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Reveal } from '@/components/motion/reveal';
import { Button } from '@/components/ui/button';
import { site } from '@/data/site';
import { cn } from '@/lib/utils';
import type { StudyProgramSummary } from '@/types/content';

const programIcons: Record<string, LucideIcon> = {
    matematika: Sigma,
    kimia: FlaskConical,
    biologi: Dna,
    fisika: Atom,
    informatika: Cpu,
};

const defaultHoverClass = 'hover:bg-purple-700 dark:hover:bg-purple-800';

const programHoverClasses: Record<string, string> = {
    matematika: 'hover:bg-[#E04324] dark:hover:bg-[#C9381C]',
    kimia: 'hover:bg-purple-700 dark:hover:bg-purple-800',
    biologi: 'hover:bg-teal-600 dark:hover:bg-teal-700',
    fisika: 'hover:bg-blue-600 dark:hover:bg-blue-700',
    informatika: 'hover:bg-neutral-700 dark:hover:bg-neutral-700',
};

type StudyProgramsSectionProps = {
    programs: StudyProgramSummary[];
};

/**
 * Navigasi cepat daftar program studi di beranda setelah banner utama.
 * - PC (`md:` ke atas): grid 5 kolom bersekat tipis dengan ikon sudut kanan bawah
 *   berlapis ring konsentris dan badge akreditasi emas.
 * - Mobile (`< md`): daftar tombol ringkas tanpa ikon prodi untuk menghemat ruang.
 */
export function StudyProgramsSection({ programs }: StudyProgramsSectionProps) {
    if (programs.length === 0) {
        return null;
    }

    return (
        <section
            id="program-studi"
            className="scroll-mt-20 py-12 md:py-16"
            aria-label="Navigasi Program Studi"
        >
            <div className="mx-auto max-w-7xl px-4 md:px-6">
                <Reveal>
                    <div className="mb-8">
                        <p className="mb-2 text-xs font-bold tracking-[0.18em] text-primary uppercase">
                            Akademik
                        </p>
                        <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                            Program Studi (S1)
                        </h2>
                    </div>
                </Reveal>

                {/* Tampilan PC: satu bingkai terbagi 5 kolom bersekat tipis */}
                <Reveal delay={0.08} y={18}>
                    <div className="hidden overflow-hidden rounded-2xl border-2 border-neutral-300/90 bg-card shadow-md shadow-primary/5 md:grid md:grid-cols-5 md:divide-x-2 md:divide-neutral-300/90 dark:border-neutral-700 dark:md:divide-neutral-700">
                        {programs.map((program) => {
                            const Icon =
                                programIcons[program.slug] ?? GraduationCap;

                            const hoverColor =
                                programHoverClasses[program.slug] ??
                                defaultHoverClass;

                            return (
                                <Link
                                    key={program.id}
                                    href={program.href}
                                    className={cn(
                                        'group relative flex h-[184px] flex-col justify-between overflow-hidden p-5 transition-colors duration-300 focus-visible:z-10 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none focus-visible:ring-inset',
                                        hoverColor,
                                    )}
                                >
                                    <div className="relative z-10">
                                        <h3 className="text-base font-bold tracking-tight text-foreground transition-colors duration-300 group-hover:text-white lg:text-lg">
                                            {program.name}
                                        </h3>
                                        <span className="mt-2 inline-flex items-center rounded-full bg-brand-yellow px-2.5 py-0.5 text-[11px] font-bold text-white">
                                            {program.accreditation}
                                        </span>
                                    </div>

                                    {/* Kotak ikon/logo prodi simetris di sudut kanan bawah tanpa background tambahan */}
                                    <div
                                        aria-hidden="true"
                                        className="pointer-events-none absolute right-3 bottom-3"
                                    >
                                        <div className="rounded-[26px] border-[1.5px] border-neutral-300/70 p-2 transition-colors duration-300 group-hover:border-white/30 dark:border-neutral-700/70">
                                            <div className="rounded-[20px] border-[1.5px] border-neutral-300/90 p-2 transition-colors duration-300 group-hover:border-white/45 dark:border-neutral-700">
                                                <div
                                                    className={cn(
                                                        'flex size-14 items-center justify-center rounded-2xl border-2 border-neutral-300 bg-transparent transition-colors duration-300 group-hover:border-white/65 dark:border-neutral-600',
                                                        !program.logo &&
                                                            'text-primary group-hover:text-white',
                                                    )}
                                                >
                                                    {program.logo ? (
                                                        <img
                                                            src={program.logo}
                                                            alt=""
                                                            className="size-11 object-contain transition-transform duration-300 group-hover:scale-110"
                                                            loading="lazy"
                                                            decoding="async"
                                                        />
                                                    ) : (
                                                        <Icon className="size-7 transition-transform duration-300 group-hover:scale-110" />
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <span className="absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 bg-brand-yellow transition-transform duration-300 group-hover:scale-x-100" />
                                </Link>
                            );
                        })}
                    </div>
                </Reveal>

                {/* Tampilan Mobile/HP: tombol daftar ringkas tanpa logo prodi */}
                <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 sm:gap-3 md:hidden">
                    {programs.map((program) => {
                        const hoverColor =
                            programHoverClasses[program.slug] ??
                            defaultHoverClass;

                        return (
                            <Link
                                key={program.id}
                                href={program.href}
                                className={cn(
                                    'group relative flex items-center justify-between gap-3 overflow-hidden rounded-2xl border-2 border-neutral-300/90 bg-card px-4 py-3.5 shadow-xs transition-all duration-300 hover:border-transparent hover:shadow-md focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none dark:border-neutral-700',
                                    hoverColor,
                                )}
                            >
                                <span className="text-base font-bold tracking-tight text-foreground transition-colors duration-300 group-hover:text-white">
                                    {program.name}
                                </span>
                                <span className="inline-flex shrink-0 items-center rounded-full bg-brand-yellow px-2.5 py-0.5 text-[11px] font-bold text-white">
                                    {program.accreditation}
                                </span>
                                <span className="absolute inset-x-4 bottom-0 h-[3px] origin-left scale-x-0 rounded-t-full bg-brand-yellow transition-transform duration-300 group-hover:scale-x-100" />
                            </Link>
                        );
                    })}
                </div>

                <Reveal delay={0.12} y={14}>
                    <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                        <Button
                            asChild
                            size="lg"
                            className="h-12 rounded-full bg-brand-yellow px-7 font-bold text-brand-yellow-foreground shadow-md shadow-primary/10 hover:bg-brand-yellow/90"
                        >
                            <a
                                href={site.links.pmb}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Info Pendaftaran
                            </a>
                        </Button>

                        <Button
                            asChild
                            size="lg"
                            variant="outline"
                            className="group h-12 rounded-full border-2 border-neutral-300 bg-card px-7 font-semibold text-foreground shadow-xs transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground dark:border-neutral-700"
                        >
                            <Link href="/program-studi">
                                Semua Prodi
                                <ArrowRight className="ml-2 size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                            </Link>
                        </Button>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
