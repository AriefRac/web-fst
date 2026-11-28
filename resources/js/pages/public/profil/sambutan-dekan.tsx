import { Head } from '@inertiajs/react';
import { Quote } from 'lucide-react';
import { Reveal } from '@/components/motion/reveal';
import { SectionHeading } from '@/components/public/section-heading';
import { CardBody, CardContainer, CardItem } from '@/components/ui/3d-card';
import { site } from '@/data/site';

export default function SambutanDekan() {
    return (
        <>
            <Head title="Sambutan Dekan" />

            <section className="relative overflow-hidden py-16 md:py-24">
                {/* Dekorasi lembut latar belakang (radial-gradient ringan tanpa blur-3xl) */}
                <div className="pointer-events-none absolute -top-24 -right-24 size-96 rounded-full bg-[radial-gradient(circle,var(--primary-soft)_0%,transparent_70%)]" />
                <div className="pointer-events-none absolute -bottom-24 -left-24 size-96 rounded-full bg-[radial-gradient(circle,color-mix(in_oklch,var(--brand-yellow)_18%,transparent)_0%,transparent_70%)]" />

                <div className="relative mx-auto max-w-6xl px-4 md:px-6">
                    <Reveal>
                        <SectionHeading
                            eyebrow="Profil Fakultas"
                            title="Sambutan Dekan"
                        />
                    </Reveal>

                    <div className="mt-8 grid items-center gap-12 md:grid-cols-5 md:gap-16">
                        {/* Foto & Identitas Dekan */}
                        <Reveal className="md:col-span-2" y={32}>
                            <div className="flex flex-col items-center">
                                <CardContainer className="inter-var w-full">
                                    <CardBody className="group/card relative h-auto w-full rounded-2xl border border-primary/10 bg-white p-3 shadow-xl shadow-primary/5 transition-shadow hover:shadow-2xl hover:shadow-primary/10 dark:border-white/[0.2] dark:bg-neutral-900">
                                        <CardItem
                                            translateZ="80"
                                            className="w-full"
                                        >
                                            <div className="relative overflow-hidden rounded-xl bg-primary-soft shadow-inner">
                                                <img
                                                    src={site.dean.photo}
                                                    srcSet={`${site.dean.photo} 600w, ${site.dean.photo2x} 1000w`}
                                                    sizes="(min-width: 768px) 384px, 90vw"
                                                    alt={`Foto ${site.dean.name}`}
                                                    width={600}
                                                    height={750}
                                                    loading="lazy"
                                                    className="aspect-[4/5] w-full object-cover object-top transition-transform duration-500 group-hover/card:scale-105"
                                                />
                                            </div>
                                        </CardItem>
                                    </CardBody>
                                </CardContainer>

                                {/* Keterangan Dekan di Bawah Foto */}
                                <div className="mt-4 text-center">
                                    <h3 className="text-lg font-bold text-foreground">
                                        {site.dean.name}
                                    </h3>
                                    <p className="mt-1 text-sm font-semibold text-primary">
                                        Dekan {site.facultyName}
                                    </p>
                                    <p className="mt-0.5 text-xs text-muted-foreground">
                                        {site.university}
                                    </p>
                                </div>
                            </div>
                        </Reveal>

                        {/* Naskah Sambutan Dekan */}
                        <Reveal className="md:col-span-3" delay={0.15}>
                            <div className="relative">
                                <Quote className="absolute -top-3 -left-2 size-12 text-brand-yellow/40" />
                                <div className="relative space-y-5 pl-8 text-base leading-relaxed text-foreground/85 md:text-lg">
                                    <p className="font-semibold text-primary">
                                        Assalamu&apos;alaikum warahmatullahi
                                        wabarakatuh.
                                    </p>
                                    <p>
                                        Selamat datang di {site.facultyName}{' '}
                                        {site.university}. Kami berkomitmen
                                        menghadirkan pendidikan sains dan
                                        teknologi yang unggul, inovatif, dan
                                        berdaya saing serta berlandaskan
                                        nilai-nilai keislaman.
                                    </p>
                                    <p>
                                        Melalui portal ini, kami menyajikan
                                        informasi program studi, riset, dan
                                        kegiatan akademik secara transparan bagi
                                        sivitas akademika maupun masyarakat.
                                        Mari bersama memajukan bangsa melalui
                                        sains dan teknologi.
                                    </p>
                                    <p className="pt-2 font-semibold text-primary">
                                        Wassalamu&apos;alaikum warahmatullahi
                                        wabarakatuh.
                                    </p>
                                </div>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>
        </>
    );
}
