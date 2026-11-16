import { Link } from '@inertiajs/react';
import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
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
            className="relative isolate overflow-hidden bg-neutral-900"
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
                                <motion.img
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
                                    loading={index === 0 ? 'eager' : 'lazy'}
                                />
                            </picture>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />
                        </div>
                    ))}
                </div>
            </div>

            {/* Teks slide aktif, dianimasikan ulang setiap ganti slide */}
            <div className="pointer-events-none absolute inset-0 flex items-end">
                <div className="mx-auto w-full max-w-7xl px-4 pb-20 md:px-6 md:pb-24">
                    <AnimatePresence mode="wait">
                        <motion.div
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
                            <motion.h1
                                variants={fadeUp}
                                className="text-3xl font-semibold tracking-tight text-balance md:text-5xl"
                            >
                                {active.title}
                            </motion.h1>
                            {active.subtitle && (
                                <motion.p
                                    variants={fadeUp}
                                    className="mt-4 text-base text-white/85 md:text-lg"
                                >
                                    {active.subtitle}
                                </motion.p>
                            )}
                            {active.ctaUrl && active.ctaLabel && (
                                <motion.div variants={fadeUp} className="mt-8">
                                    <Button
                                        asChild
                                        size="lg"
                                        variant="secondary"
                                    >
                                        <Link href={active.ctaUrl}>
                                            {active.ctaLabel}
                                        </Link>
                                    </Button>
                                </motion.div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            {banners.length > 1 && (
                <>
                    <div className="absolute right-4 bottom-6 flex gap-2 md:right-6">
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

                    <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 gap-2">
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
                                        ? 'w-8 bg-white'
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
