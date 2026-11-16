import { Head, Link } from '@inertiajs/react';
import { FileText, MapPin, Pin } from 'lucide-react';
import { motion } from 'motion/react';
import { Reveal } from '@/components/motion/reveal';
import { HeroSlider } from '@/components/public/hero-slider';
import { SectionHeading } from '@/components/public/section-heading';
import { Badge } from '@/components/ui/badge';
import {
    announcements,
    banners,
    documentCategories,
    headlinePost,
    latestPosts,
    lecturers,
    upcomingEvents,
} from '@/data/dummy';
import { dateBadge, formatDate, formatTime } from '@/lib/format';
import type { EventExecutionStatus } from '@/types/content';

const executionLabel: Partial<Record<EventExecutionStatus, string>> = {
    postponed: 'Ditunda',
    cancelled: 'Dibatalkan',
};

export default function Home() {
    return (
        <>
            <Head title="Beranda" />

            <HeroSlider banners={banners} />

            {/* Headline + berita terbaru */}
            <section className="mx-auto max-w-7xl px-4 pt-20 md:px-6">
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
                            className="group block"
                        >
                            <div className="overflow-hidden rounded-xl">
                                <img
                                    src={headlinePost.thumbnail}
                                    alt=""
                                    className="aspect-video w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                            </div>
                            <div className="mt-5">
                                <Badge variant="secondary">
                                    {headlinePost.category}
                                </Badge>
                                <h3 className="mt-3 text-2xl font-semibold tracking-tight text-balance group-hover:underline md:text-3xl">
                                    {headlinePost.title}
                                </h3>
                                <p className="mt-3 text-muted-foreground">
                                    {headlinePost.excerpt}
                                </p>
                                <p className="mt-3 text-sm text-muted-foreground">
                                    {formatDate(headlinePost.publishedAt)}
                                </p>
                            </div>
                        </Link>
                    </Reveal>

                    <div className="flex flex-col gap-6 lg:col-span-2">
                        {latestPosts.map((post, i) => (
                            <Reveal key={post.id} delay={0.1 * (i + 1)}>
                                <Link
                                    href={`/berita/${post.slug}`}
                                    className="group flex gap-4"
                                >
                                    <div className="w-32 shrink-0 overflow-hidden rounded-lg md:w-40">
                                        <img
                                            src={post.thumbnail}
                                            alt=""
                                            className="aspect-video size-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            loading="lazy"
                                        />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-xs font-medium text-muted-foreground">
                                            {post.category} ·{' '}
                                            {formatDate(post.publishedAt)}
                                        </p>
                                        <h4 className="mt-1 line-clamp-2 font-semibold group-hover:underline">
                                            {post.title}
                                        </h4>
                                        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                                            {post.excerpt}
                                        </p>
                                    </div>
                                </Link>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pengumuman + agenda */}
            <section className="mx-auto mt-24 grid max-w-7xl gap-12 px-4 md:px-6 lg:grid-cols-2">
                <div>
                    <Reveal>
                        <SectionHeading
                            eyebrow="Informasi"
                            title="Pengumuman"
                            moreHref="/pengumuman"
                        />
                    </Reveal>
                    <ul className="divide-y rounded-xl border">
                        {announcements.map((item, i) => (
                            <Reveal key={item.id} delay={0.05 * i} y={12}>
                                <li>
                                    <Link
                                        href={`/pengumuman/${item.slug}`}
                                        className="flex items-start gap-3 p-4 transition-colors hover:bg-muted/50"
                                    >
                                        {item.isPinned ? (
                                            <Pin className="mt-0.5 size-4 shrink-0" />
                                        ) : (
                                            <span className="size-4 shrink-0" />
                                        )}
                                        <div className="min-w-0 flex-1">
                                            <p className="font-medium">
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
                                            className="flex gap-4 rounded-xl border p-4 transition-colors hover:bg-muted/50"
                                        >
                                            <div className="flex w-16 shrink-0 flex-col items-center justify-center rounded-lg bg-primary py-2 text-primary-foreground">
                                                <span className="text-2xl leading-none font-semibold">
                                                    {badge.day}
                                                </span>
                                                <span className="mt-1 text-xs uppercase">
                                                    {badge.month}
                                                </span>
                                            </div>
                                            <div className="min-w-0">
                                                <div className="flex flex-wrap items-center gap-2">
                                                    <span className="text-xs font-medium text-muted-foreground">
                                                        {event.category}
                                                    </span>
                                                    {status && (
                                                        <Badge variant="outline">
                                                            {status}
                                                        </Badge>
                                                    )}
                                                </div>
                                                <p className="mt-1 font-semibold">
                                                    {event.title}
                                                </p>
                                                <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                                                    <MapPin className="size-3.5" />
                                                    {formatTime(event.startsAt)}{' '}
                                                    WIB · {event.venue}
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

            {/* Sorotan dosen */}
            <section className="mx-auto mt-24 max-w-7xl px-4 md:px-6">
                <Reveal>
                    <SectionHeading
                        eyebrow="Tenaga Pendidik"
                        title="Dosen Kami"
                        moreHref="/dosen"
                    />
                </Reveal>
                <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
                    {lecturers.map((lecturer, i) => (
                        <Reveal key={lecturer.id} delay={0.08 * i}>
                            <Link
                                href={`/dosen/${lecturer.slug}`}
                                className="group block"
                            >
                                <div className="overflow-hidden rounded-xl bg-muted">
                                    <motion.img
                                        src={lecturer.photo}
                                        alt={lecturer.name}
                                        className="aspect-[3/4] w-full object-cover"
                                        whileHover={{ scale: 1.05 }}
                                        transition={{ duration: 0.4 }}
                                        loading="lazy"
                                    />
                                </div>
                                <p className="mt-3 font-semibold group-hover:underline">
                                    {lecturer.name}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    {lecturer.functionalPosition} ·{' '}
                                    {lecturer.studyProgram}
                                </p>
                            </Link>
                        </Reveal>
                    ))}
                </div>
            </section>

            {/* Pintasan dokumen */}
            <section className="mx-auto mt-24 max-w-7xl px-4 md:px-6">
                <Reveal>
                    <SectionHeading
                        eyebrow="Unduhan"
                        title="Dokumen"
                        moreHref="/dokumen"
                    />
                </Reveal>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                    {documentCategories.map((cat, i) => (
                        <Reveal key={cat.label} delay={0.06 * i}>
                            <motion.div
                                whileHover={{ y: -4 }}
                                transition={{ duration: 0.2 }}
                            >
                                <Link
                                    href={cat.href}
                                    className="flex flex-col gap-3 rounded-xl border p-5 transition-colors hover:bg-muted/50"
                                >
                                    <FileText className="size-6" />
                                    <span className="font-semibold">
                                        {cat.label}
                                    </span>
                                    <span className="text-sm text-muted-foreground">
                                        {cat.count} dokumen
                                    </span>
                                </Link>
                            </motion.div>
                        </Reveal>
                    ))}
                </div>
            </section>
        </>
    );
}
