import { Link } from '@inertiajs/react';
import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { AnimatePresence, m, useReducedMotion } from 'motion/react';
import { useCallback, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { Banner } from '@/types/content';

type HeroSliderProps = {
    banners: Banner[];
    /** Jeda antar slide dalam milidetik (PRD: ±6 detik). */
    interval?: number;
};

export function HeroSlider({ banners, interval = 6000 }: HeroSliderProps) {
    const reduceMotion = useReducedMotion();

    const [emblaRef, emblaApi] = useEmblaCarousel(
        { loop: true },
        reduceMotion
            ? []
            : [
                  Autoplay({
                      delay: interval,
                      stopOnMouseEnter: true,
                      stopOnInteraction: false,
                  }),
              ],
    );
    const [selected, setSelected] = useState(0);

    useEffect(() => {
        if (!emblaApi) {
            return;
        }

        const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
        emblaApi.on('select', onSelect);

        return () => {
            emblaApi.off('select', onSelect);
        };
    }, [emblaApi]);

    const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

    if (banners.length === 0) {
        return null;
    }

    const active = banners[selected];

    return (
        <section
            className="relative isolate overflow-hidden bg-primary-strong"
            aria-roledescription="carousel"
            aria-label="Banner utama"
        >
            <div ref={emblaRef} className="overflow-hidden">
                <div className="flex">
                    {banners.map((banner, index) => (
                        <div
                            key={banner.id}
                            className="relative h-[70vh] max-h-[720px] min-h-[420px] min-w-0 flex-[0_0_100%]"
                            aria-roledescription="slide"
                            aria-label={`${index + 1} dari ${banners.length}`}
                        >
                            <picture>
                                {banner.imageMobile && (
                                    <source
                                        media="(max-width: 767px)"
                                        srcSet={banner.imageMobile}
                                    />
                                )}
                                <m.img
                                    src={banner.imageDesktop}
                                    alt=""
                                    className="absolute inset-0 size-full object-cover"
                                    animate={{
                                        scale:
                                            selected === index && !reduceMotion
                                                ? 1.08
                                                : 1,
                                    }}
                                    transition={{
                                        duration: interval / 1000 + 1,
                                        ease: 'linear',
                                    }}
                                    // Slide pertama = elemen LCP: muat secepatnya
                                    loading={index === 0 ? 'eager' : 'lazy'}
                                    fetchPriority={index === 0 ? 'high' : 'low'}
                                    decoding={index === 0 ? 'sync' : 'async'}
                                />
                            </picture>
                            <div className="absolute inset-0 bg-gradient-to-r from-primary-strong/90 via-primary-strong/55 to-black/10" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                        </div>
                    ))}
                </div>
            </div>

            {/* Teks slide aktif, dianimasikan ulang setiap ganti slide */}
            <div className="pointer-events-none absolute inset-0 flex items-center">
                <div className="mx-auto w-full max-w-7xl px-4 pt-4 pb-28 md:px-6">
                    <AnimatePresence mode="wait">
                        <m.div
                            key={active.id}
                            className="pointer-events-auto max-w-2xl text-white"
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            variants={{
                                hidden: {},
                                visible: {
                                    transition: { staggerChildren: 0.12 },
                                },
                                exit: {
                                    opacity: 0,
                                    transition: { duration: 0.2 },
                                },
                            }}
                        >
                            <m.span
                                variants={fadeUp}
                                className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold tracking-wide backdrop-blur"
                            >
                                <span className="size-1.5 rounded-full bg-brand-yellow" />
                                Fakultas Sains dan Teknologi
                            </m.span>
                            <m.h1
                                variants={fadeUp}
                                className="text-3xl font-extrabold tracking-tight text-balance md:text-5xl lg:text-6xl"
                            >
                                {active.title}
                            </m.h1>
                            {active.subtitle && (
                                <m.p
                                    variants={fadeUp}
                                    className="mt-4 text-base text-white/85 md:text-lg"
                                >
                                    {active.subtitle}
                                </m.p>
                            )}
                            {active.ctaUrl && active.ctaLabel && (
                                <m.div variants={fadeUp} className="mt-8">
                                    <Button
                                        asChild
                                        size="lg"
                                        className="h-12 rounded-full bg-brand-yellow px-7 font-bold text-brand-yellow-foreground shadow-lg shadow-black/20 hover:bg-brand-yellow/90"
                                    >
                                        {/^https?:\/\//.test(active.ctaUrl) ? (
                                            // Tautan ke situs lain (mis. PMB) tidak boleh lewat Inertia
                                            <a
                                                href={active.ctaUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                {active.ctaLabel}
                                            </a>
                                        ) : (
                                            <Link href={active.ctaUrl}>
                                                {active.ctaLabel}
                                            </Link>
                                        )}
                                    </Button>
                                </m.div>
                            )}
                        </m.div>
                    </AnimatePresence>
                </div>
            </div>

            {banners.length > 1 && (
                <>
                    <div className="absolute right-4 bottom-20 flex gap-2 md:right-6 md:bottom-24">
                        <Button
                            size="icon"
                            variant="secondary"
                            className="rounded-full bg-white/15 text-white backdrop-blur hover:bg-white/25"
                            onClick={scrollPrev}
                            aria-label="Slide sebelumnya"
                        >
                            <ChevronLeft className="size-5" />
                        </Button>
                        <Button
                            size="icon"
                            variant="secondary"
                            className="rounded-full bg-white/15 text-white backdrop-blur hover:bg-white/25"
                            onClick={scrollNext}
                            aria-label="Slide berikutnya"
                        >
                            <ChevronRight className="size-5" />
                        </Button>
                    </div>

                    <div className="absolute bottom-[88px] left-1/2 flex -translate-x-1/2 gap-2 md:bottom-[104px]">
                        {banners.map((banner, index) => (
                            <button
                                key={banner.id}
                                type="button"
                                onClick={() => emblaApi?.scrollTo(index)}
                                aria-label={`Ke slide ${index + 1}`}
                                aria-current={selected === index}
                                className={cn(
                                    'h-1.5 rounded-full bg-white/50 transition-all duration-300',
                                    selected === index
                                        ? 'w-8 bg-brand-yellow'
                                        : 'w-1.5 hover:bg-white/80',
                                )}
                            />
                        ))}
                    </div>
                </>
            )}
        </section>
    );
}

const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
    },
};
