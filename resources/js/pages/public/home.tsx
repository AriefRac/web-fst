import { Head, Link } from '@inertiajs/react';
import { ArrowRight, Clock, MapPin, Pin, Quote } from 'lucide-react';
import { Reveal } from '@/components/motion/reveal';
import { HeroSlider } from '@/components/public/hero-slider';
import { PartnerMarquee } from '@/components/public/partner-marquee';
import { SectionHeading } from '@/components/public/section-heading';
import { StatsBand } from '@/components/public/stats-band';
import { YoutubeEmbed } from '@/components/public/youtube-embed';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    announcements,
    banners,
    headlinePost,
    latestPosts,
    upcomingEvents,
} from '@/data/dummy';
import { partners } from '@/data/partners';
import { site } from '@/data/site';
import { dateBadge, formatDate, formatTime } from '@/lib/format';
import type { EventExecutionStatus } from '@/types/content';

const executionLabel: Partial<Record<EventExecutionStatus, string>> = {
    postponed: 'Ditunda',
    cancelled: 'Dibatalkan',
};

function CategoryBadge({ children }: { children: string }) {
    return (
        <span className="inline-flex items-center rounded-full bg-primary-soft px-2.5 py-0.5 text-xs font-semibold text-primary">
            {children}
        </span>
    );
}

export default function Home() {
    return (
        <>
            <Head title="Beranda" />

            <HeroSlider banners={banners} />

            <StatsBand />

            {/* Sambutan dekan */}
            <section className="relative overflow-hidden py-20 md:py-24">
                {/* Dekorasi lembut */}
                <div className="pointer-events-none absolute -top-24 -right-24 size-72 rounded-full bg-primary-soft blur-3xl" />
                <div className="pointer-events-none absolute -bottom-24 -left-24 size-72 rounded-full bg-brand-yellow/15 blur-3xl" />

                <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 md:grid-cols-5 md:gap-16 md:px-6">
                    <Reveal className="md:col-span-2" y={32}>
                        <div className="relative mx-auto max-w-sm">
                            <div className="absolute -right-4 -bottom-4 size-full rounded-2xl border-2 border-brand-yellow" />
                            <div className="relative overflow-hidden rounded-2xl bg-primary-soft shadow-xl shadow-primary/10">
                                <img
                                    src={site.dean.photo}
                                    srcSet={`${site.dean.photo} 600w, ${site.dean.photo2x} 1000w`}
                                    sizes="(min-width: 768px) 384px, 90vw"
                                    alt={`Foto ${site.dean.name}`}
                                    width={600}
                                    height={750}
                                    loading="lazy"
                                    className="aspect-[4/5] w-full object-cover object-top"
                                />
                                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-primary-strong/90 to-transparent p-5 pt-16 text-white">
                                    <p className="font-bold">
                                        {site.dean.name}
                                    </p>
                                    <p className="text-sm text-white/80">
                                        Dekan {site.facultyName}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Reveal>

                    <Reveal className="md:col-span-3" delay={0.15}>
                        <SectionHeading
                            eyebrow="Profil Fakultas"
                            title="Sambutan Dekan"
                        />
                        <div className="relative">
                            <Quote className="absolute -top-2 -left-1 size-10 text-brand-yellow/40" />
                            {/* TODO: ganti dengan teks sambutan resmi */}
                            <div className="relative space-y-4 pl-6 text-lg leading-relaxed text-foreground/80">
                                <p>
                                    Assalamu&apos;alaikum warahmatullahi
                                    wabarakatuh.
                                </p>
                                <p>
                                    Selamat datang di {site.facultyName}{' '}
                                    {site.university}. Kami berkomitmen
                                    menghadirkan pendidikan sains dan teknologi
                                    yang unggul, berdaya saing, dan berlandaskan
                                    nilai-nilai keislaman.
                                </p>
                            </div>
                        </div>
                        <Button
                            asChild
                            className="mt-8 h-11 rounded-full px-6 font-semibold"
                        >
                            <Link href="/profil">
                                Selengkapnya
                                <ArrowRight className="size-4" />
                            </Link>
                        </Button>
                    </Reveal>
                </div>
            </section>

            {/* Headline + berita terbaru */}
            <section className="bg-neutral-50 py-20 md:py-24">
                <div className="mx-auto max-w-7xl px-4 md:px-6">
                    <Reveal>
                        <SectionHeading
                            eyebrow="Kabar Fakultas"
                            title="Berita Terkini"
                            moreHref="/berita"
                        />
                    </Reveal>

                    <div className="grid gap-8 lg:grid-cols-5">
                        <Reveal className="lg:col-span-3">
                            <Link
                                href={`/berita/${headlinePost.slug}`}
                                className="group block overflow-hidden rounded-2xl border bg-white transition-shadow hover:shadow-xl hover:shadow-primary/10"
                            >
                                <div className="relative overflow-hidden">
                                    <img
                                        src={headlinePost.thumbnail}
                                        alt=""
                                        className="aspect-video w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        loading="lazy"
                                        decoding="async"
                                    />
                                    <span className="absolute top-4 left-4 rounded-full bg-brand-yellow px-3 py-1 text-xs font-bold text-brand-yellow-foreground">
                                        Utama
                                    </span>
                                </div>
                                <div className="p-6">
                                    <CategoryBadge>
                                        {headlinePost.category}
                                    </CategoryBadge>
                                    <h3 className="mt-3 text-2xl font-bold tracking-tight text-balance transition-colors group-hover:text-primary md:text-3xl">
                                        {headlinePost.title}
                                    </h3>
                                    <p className="mt-3 text-muted-foreground">
                                        {headlinePost.excerpt}
                                    </p>
                                    <p className="mt-4 text-sm text-muted-foreground">
                                        {formatDate(headlinePost.publishedAt)}
                                    </p>
                                </div>
                            </Link>
                        </Reveal>

                        <div className="flex flex-col gap-4 lg:col-span-2">
                            {latestPosts.map((post, i) => (
                                <Reveal key={post.id} delay={0.1 * (i + 1)}>
                                    <Link
                                        href={`/berita/${post.slug}`}
                                        className="group flex gap-4 rounded-xl border bg-white p-3 transition-shadow hover:shadow-lg hover:shadow-primary/10"
                                    >
                                        <div className="w-32 shrink-0 overflow-hidden rounded-lg md:w-36">
                                            <img
                                                src={post.thumbnail}
                                                alt=""
                                                className="aspect-[4/3] size-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                loading="lazy"
                                            />
                                        </div>
                                        <div className="min-w-0 py-1">
                                            <p className="text-xs font-semibold text-primary">
                                                {post.category}
                                            </p>
                                            <h4 className="mt-1 line-clamp-2 font-bold transition-colors group-hover:text-primary">
                                                {post.title}
                                            </h4>
                                            <p className="mt-2 text-xs text-muted-foreground">
                                                {formatDate(post.publishedAt)}
                                            </p>
                                        </div>
                                    </Link>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Pengumuman + agenda */}
            <section className="mx-auto grid max-w-7xl gap-12 px-4 py-20 md:px-6 md:py-24 lg:grid-cols-2">
                <div>
                    <Reveal>
                        <SectionHeading
                            eyebrow="Informasi"
                            title="Pengumuman"
                            moreHref="/pengumuman"
                        />
                    </Reveal>
                    <ul className="divide-y overflow-hidden rounded-2xl border">
                        {announcements.map((item, i) => (
                            <Reveal key={item.id} delay={0.05 * i} y={12}>
                                <li>
                                    <Link
                                        href={`/pengumuman/${item.slug}`}
                                        className="group flex items-start gap-3 border-l-[3px] border-transparent p-4 transition-colors hover:border-brand-yellow hover:bg-primary-soft/60"
                                    >
                                        {item.isPinned ? (
                                            <Pin className="mt-0.5 size-4 shrink-0 fill-brand-yellow text-brand-yellow" />
                                        ) : (
                                            <span className="size-4 shrink-0" />
                                        )}
                                        <div className="min-w-0 flex-1">
                                            <p className="font-semibold transition-colors group-hover:text-primary">
                                                {item.title}
                                            </p>
                                            <p className="mt-1 text-xs text-muted-foreground">
                                                {item.category} ·{' '}
                                                {formatDate(item.publishedAt)}
                                            </p>
                                        </div>
                                        {item.priority === 'important' && (
                                            <Badge variant="destructive">
                                                Penting
                                            </Badge>
                                        )}
                                    </Link>
                                </li>
                            </Reveal>
                        ))}
                    </ul>
                </div>

                <div>
                    <Reveal>
                        <SectionHeading
                            eyebrow="Segera Hadir"
                            title="Agenda Mendatang"
                            moreHref="/agenda"
                        />
                    </Reveal>
                    <ul className="flex flex-col gap-4">
                        {upcomingEvents.map((event, i) => {
                            const badge = dateBadge(event.startsAt);
                            const status =
                                executionLabel[event.executionStatus];

                            return (
                                <Reveal key={event.id} delay={0.08 * i} y={12}>
                                    <li>
                                        <Link
                                            href={`/agenda/${event.slug}`}
                                            className="group flex gap-4 rounded-2xl border p-4 transition-shadow hover:shadow-lg hover:shadow-primary/10"
                                        >
                                            <div className="relative flex w-16 shrink-0 flex-col items-center justify-center overflow-hidden rounded-xl bg-primary py-2 text-primary-foreground">
                                                <span className="absolute inset-x-0 top-0 h-1 bg-brand-yellow" />
                                                <span className="text-2xl leading-none font-extrabold">
                                                    {badge.day}
                                                </span>
                                                <span className="mt-1 text-xs font-semibold uppercase">
                                                    {badge.month}
                                                </span>
                                            </div>
                                            <div className="min-w-0">
                                                <div className="flex flex-wrap items-center gap-2">
                                                    <CategoryBadge>
                                                        {event.category}
                                                    </CategoryBadge>
                                                    {status && (
                                                        <Badge variant="outline">
                                                            {status}
                                                        </Badge>
                                                    )}
                                                </div>
                                                <p className="mt-1.5 font-bold transition-colors group-hover:text-primary">
                                                    {event.title}
                                                </p>
                                                <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
                                                    <span className="flex items-center gap-1">
                                                        <Clock className="size-3.5" />
                                                        {formatTime(
                                                            event.startsAt,
                                                        )}{' '}
                                                        WIB
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <MapPin className="size-3.5" />
                                                        {event.venue}
                                                    </span>
                                                </p>
                                            </div>
                                        </Link>
                                    </li>
                                </Reveal>
                            );
                        })}
                    </ul>
                </div>
            </section>

            {/* Video profil fakultas */}
            <section className="bg-neutral-50 py-20 md:py-24">
                <div className="mx-auto max-w-5xl px-4 md:px-6">
                    <Reveal>
                        <SectionHeading
                            align="center"
                            eyebrow="Kenali Kami"
                            title="Video Profil Fakultas"
                        />
                    </Reveal>
                    <Reveal delay={0.1} y={32}>
                        <div className="relative">
                            <div className="absolute -inset-3 -z-0 rounded-3xl bg-gradient-to-br from-primary/15 via-transparent to-brand-yellow/25" />
                            <div className="relative">
                                <YoutubeEmbed
                                    videoId={site.profileVideo.youtubeId}
                                    start={site.profileVideo.start}
                                    title={`Video Profil ${site.facultyName}`}
                                />
                            </div>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* Mitra kerja sama */}
            <section className="pt-20 md:pt-24">
                <div className="mx-auto max-w-7xl px-4 md:px-6">
                    <Reveal>
                        <SectionHeading
                            align="center"
                            eyebrow="Kolaborasi"
                            title="Mitra Kerja Sama"
                        />
                    </Reveal>
                </div>
                <Reveal delay={0.1}>
                    <PartnerMarquee partners={partners} />
                </Reveal>
            </section>
        </>
    );
}
