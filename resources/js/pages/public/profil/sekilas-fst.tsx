import { Head } from '@inertiajs/react';
import {
    BookOpen,
    FlaskConical,
    Globe2,
    GraduationCap,
    ShieldCheck,
    Target,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { SectionHeading } from '@/components/public/section-heading';
import { sekilasFst } from '@/data/dummy';
import { site } from '@/data/site';

const sectionAnchors = [
    { href: '#sejarah', label: 'Timeline & Sejarah' },
    { href: '#visi-misi', label: 'Visi & Misi' },
    { href: '#tujuan', label: 'Tujuan FST' },
    { href: '#sasaran-strategis', label: 'Sasaran Strategis' },
];

const objectiveIcons: LucideIcon[] = [
    GraduationCap,
    FlaskConical,
    BookOpen,
    Globe2,
    ShieldCheck,
];

function scrollToSection(hash: string) {
    const target = document.querySelector(hash);
    if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
    }
}

export default function SekilasFst() {
    return (
        <>
            <Head title="Sekilas FST" />

            {/* Tajuk halaman & navigasi cepat antar bagian */}
            <section className="relative overflow-hidden border-b bg-muted/30 py-14 md:py-20 dark:bg-neutral-900/40">
                <div className="pointer-events-none absolute -top-24 -right-24 size-96 rounded-full bg-[radial-gradient(circle,var(--primary-soft)_0%,transparent_70%)]" />
                <div className="pointer-events-none absolute -bottom-24 -left-24 size-96 rounded-full bg-[radial-gradient(circle,color-mix(in_oklch,var(--brand-yellow)_18%,transparent)_0%,transparent_70%)]" />

                <div className="relative mx-auto max-w-6xl px-4 md:px-6">
                    <p className="mb-2 text-xs font-bold tracking-[0.18em] text-primary uppercase">
                        Profil Fakultas
                    </p>
                    <h1 className="text-3xl font-extrabold tracking-tight text-foreground md:text-4xl lg:text-5xl">
                        Sekilas {site.facultyShort}
                    </h1>
                    <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
                        Mengenal perjalanan sejarah, tonggak perkembangan, visi
                        dan misi, tujuan, serta sasaran strategis{' '}
                        {site.facultyName} {site.university}.
                    </p>

                    <nav
                        aria-label="Navigasi bagian Sekilas FST"
                        className="mt-7 flex flex-wrap gap-2.5"
                    >
                        {sectionAnchors.map((item) => (
                            <a
                                key={item.href}
                                href={item.href}
                                onClick={(e) => {
                                    e.preventDefault();
                                    scrollToSection(item.href);
                                }}
                                className="inline-flex items-center rounded-full border-2 border-neutral-300/90 bg-card px-4 py-2 text-xs font-semibold text-foreground shadow-xs transition-colors hover:border-primary/40 hover:bg-primary hover:text-primary-foreground md:text-sm dark:border-neutral-700"
                            >
                                {item.label}
                            </a>
                        ))}
                    </nav>
                </div>
            </section>

            {/* 1. Timeline ringkas (kiri, ~42% lebar) + Sejarah FST (kanan, ~58% lebar) */}
            <section id="sejarah" className="scroll-mt-20 py-14 md:py-20">
                <div className="mx-auto max-w-6xl px-4 md:px-6">
                    <div className="grid gap-8 lg:grid-cols-12 lg:items-stretch lg:gap-10">
                        {/* Timeline Sejarah FST ringkas poin-poin di kiri (5/12 kolom) */}
                        <div className="lg:col-span-5">
                            <div className="rounded-2xl border-2 border-neutral-300/90 bg-muted/30 p-5 md:p-6 dark:border-neutral-700 dark:bg-neutral-900/60">
                                <div className="border-b-2 border-neutral-300/90 pb-4 dark:border-neutral-700">
                                    <p className="text-xs font-bold tracking-[0.18em] text-primary uppercase">
                                        Jejak Langkah
                                    </p>
                                    <h2 className="mt-1 text-xl font-bold tracking-tight text-foreground md:text-2xl">
                                        Timeline Sejarah FST
                                    </h2>
                                </div>

                                <ol className="relative mt-5 space-y-3.5 before:absolute before:top-2 before:bottom-3 before:left-[7px] before:w-0.5 before:bg-primary/40">
                                    {sekilasFst.timeline.map((item) => (
                                        <li
                                            key={item.year}
                                            className="relative flex items-start gap-3 pl-6"
                                        >
                                            <span
                                                aria-hidden="true"
                                                className="absolute top-1.5 left-0 size-4 rounded-full bg-primary ring-4 ring-background"
                                            />
                                            <div className="min-w-0">
                                                <span className="inline-block rounded-full bg-brand-yellow px-2 py-0.5 text-[11px] leading-none font-bold text-brand-yellow-foreground tabular-nums">
                                                    {item.year}
                                                </span>
                                                <p className="mt-1 text-sm leading-snug font-medium text-foreground/90">
                                                    {item.title}
                                                </p>
                                            </div>
                                        </li>
                                    ))}
                                </ol>
                            </div>
                        </div>

                        {/* Narasi sejarah dalam scroll area di kanan (7/12 kolom): di PC tingginya mengikuti card Timeline */}
                        <div className="lg:relative lg:col-span-7">
                            <div className="flex flex-col rounded-2xl border-2 border-neutral-300/90 bg-card p-5 md:p-6 lg:absolute lg:inset-0 dark:border-neutral-700">
                                <div className="shrink-0 border-b-2 border-neutral-300/90 pb-4 dark:border-neutral-700">
                                    <p className="text-xs font-bold tracking-[0.18em] text-primary uppercase">
                                        Latar Belakang &amp; Sejarah
                                    </p>
                                    <h2 className="mt-1 inline-flex max-w-full flex-col">
                                        <span className="text-lg font-bold tracking-tight text-foreground sm:text-xl md:text-2xl">
                                            {site.facultyName}
                                        </span>
                                        <span className="mt-0.5 text-[12.5px] font-semibold tracking-tight text-muted-foreground [text-align-last:justify] sm:text-[14px] md:text-[17px]">
                                            {site.university}
                                        </span>
                                    </h2>
                                </div>

                                <div
                                    tabIndex={0}
                                    aria-label="Naskah Sejarah Fakultas Sains dan Teknologi"
                                    className="mt-4 max-h-56 min-h-0 flex-1 [scrollbar-width:thin] space-y-3.5 overflow-y-auto pr-2 text-sm leading-relaxed text-foreground/85 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none sm:max-h-64 md:text-base lg:max-h-none"
                                >
                                    {sekilasFst.historyParagraphs.map(
                                        (paragraph, idx) => (
                                            <p key={idx}>{paragraph}</p>
                                        ),
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. Visi & Misi FST */}
            <section
                id="visi-misi"
                className="scroll-mt-20 bg-muted/40 py-16 md:py-24 dark:bg-neutral-900/60"
            >
                <div className="mx-auto max-w-6xl px-4 md:px-6">
                    <SectionHeading
                        eyebrow="Arah & Komitmen"
                        title="Visi & Misi FST"
                    />

                    {/* Kartu Visi (rata tengah, tanpa ikon) */}
                    <div className="relative overflow-hidden rounded-2xl border-2 border-brand-yellow/60 bg-surface-purple px-6 py-8 text-center text-white shadow-md md:px-10 md:py-10">
                        <span
                            aria-hidden="true"
                            className="absolute inset-x-0 top-0 h-1 bg-brand-yellow"
                        />

                        <span className="text-xs font-bold tracking-[0.18em] text-brand-yellow uppercase">
                            Visi Fakultas
                        </span>
                        <p className="mx-auto mt-3 max-w-4xl text-xl leading-snug font-bold text-balance md:text-2xl">
                            &ldquo;{sekilasFst.vision}&rdquo;
                        </p>
                    </div>

                    {/* Daftar Misi */}
                    <div className="mt-10">
                        <h3 className="mb-5 text-lg font-bold tracking-tight text-foreground md:text-xl">
                            Misi Fakultas
                        </h3>

                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {sekilasFst.missions.map((mission, idx) => (
                                <div
                                    key={idx}
                                    className="flex h-full flex-col rounded-2xl border-2 border-neutral-300/90 bg-card p-6 dark:border-neutral-700"
                                >
                                    <span className="inline-flex w-fit items-center justify-center rounded-lg bg-primary-soft px-2.5 py-1 text-xs font-extrabold text-primary tabular-nums">
                                        {String(idx + 1).padStart(2, '0')}
                                    </span>
                                    <p className="mt-4 text-sm leading-relaxed text-foreground/85 md:text-base">
                                        {mission}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. Tujuan FST */}
            <section id="tujuan" className="scroll-mt-20 py-16 md:py-24">
                <div className="mx-auto max-w-6xl px-4 md:px-6">
                    <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
                        {/* Pengantar kiri (sticky di desktop) */}
                        <div className="lg:col-span-4">
                            <div className="lg:sticky lg:top-28">
                                <SectionHeading
                                    eyebrow="Arah Tujuan"
                                    title="Tujuan FST"
                                />
                                <div className="rounded-2xl border-2 border-neutral-300/90 bg-card p-6 dark:border-neutral-700">
                                    <span className="flex size-11 items-center justify-center rounded-xl bg-brand-yellow text-brand-yellow-foreground">
                                        <Target className="size-5" />
                                    </span>
                                    <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
                                        Lima tujuan utama penyelenggaraan
                                        pendidikan, penelitian, pengabdian
                                        kepada masyarakat, kerja sama, dan tata
                                        kelola di {site.facultyName}.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* 5 Poin Tujuan FST */}
                        <ol className="space-y-4 lg:col-span-8">
                            {sekilasFst.objectives.map((objective, idx) => {
                                const Icon = objectiveIcons[idx] ?? Target;

                                return (
                                    <li key={idx}>
                                        <div className="flex items-start gap-4 rounded-2xl border-2 border-neutral-300/90 bg-card p-5 md:p-6 dark:border-neutral-700">
                                            <div className="flex shrink-0 flex-col items-center gap-1.5">
                                                <span className="flex size-11 items-center justify-center rounded-xl bg-primary-soft text-primary">
                                                    <Icon className="size-5" />
                                                </span>
                                                <span className="text-[11px] font-extrabold text-muted-foreground tabular-nums">
                                                    {String(idx + 1).padStart(
                                                        2,
                                                        '0',
                                                    )}
                                                </span>
                                            </div>

                                            <p className="pt-0.5 text-sm leading-relaxed text-foreground/90 md:text-base">
                                                {objective}
                                            </p>
                                        </div>
                                    </li>
                                );
                            })}
                        </ol>
                    </div>
                </div>
            </section>

            {/* 4. Sasaran Strategis FST */}
            <section
                id="sasaran-strategis"
                className="scroll-mt-20 bg-muted/40 py-16 md:py-24 dark:bg-neutral-900/60"
            >
                <div className="mx-auto max-w-6xl px-4 md:px-6">
                    <SectionHeading
                        eyebrow="Target Capaian"
                        title="Sasaran Strategis FST"
                    />

                    <ol className="grid gap-4 md:grid-cols-2">
                        {sekilasFst.strategicTargets.map((target, idx) => (
                            <li key={idx}>
                                <div className="flex h-full items-start gap-4 rounded-2xl border-2 border-neutral-300/90 bg-card p-5 md:p-6 dark:border-neutral-700">
                                    <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-xs font-extrabold text-primary tabular-nums">
                                        {String(idx + 1).padStart(2, '0')}
                                    </span>
                                    <p className="pt-1 text-sm leading-relaxed text-foreground/90 md:text-base">
                                        {target}
                                    </p>
                                </div>
                            </li>
                        ))}
                    </ol>
                </div>
            </section>
        </>
    );
}
