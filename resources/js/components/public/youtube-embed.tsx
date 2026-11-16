import { Play } from 'lucide-react';
import { AnimatePresence, m } from 'motion/react';
import { useState } from 'react';

type YoutubeEmbedProps = {
    videoId: string;
    title: string;
    /** Detik awal video. */
    start?: number;
};

/**
 * Embed YouTube dengan "facade": yang dimuat awalnya hanya thumbnail,
 * iframe YouTube (±1 MB script) baru dimuat setelah tombol play diklik.
 * Memakai youtube-nocookie.com agar tidak memasang cookie pelacak sebelum diputar.
 */
export function YoutubeEmbed({ videoId, title, start = 0 }: YoutubeEmbedProps) {
    const [playing, setPlaying] = useState(false);
    // Versi WebP dari YouTube ±30-40% lebih kecil dari JPG; fallback ke JPG
    // kualitas sedang jika video tidak punya thumbnail resolusi tinggi.
    const [thumb, setThumb] = useState(
        `https://i.ytimg.com/vi_webp/${videoId}/maxresdefault.webp`,
    );

    const src = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&start=${start}`;

    return (
        <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-neutral-900 shadow-xl shadow-primary/10">
            <AnimatePresence initial={false}>
                {playing ? (
                    <m.iframe
                        key="iframe"
                        src={src}
                        title={title}
                        className="absolute inset-0 size-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    />
                ) : (
                    <m.button
                        key="facade"
                        type="button"
                        onClick={() => setPlaying(true)}
                        className="group absolute inset-0 size-full cursor-pointer"
                        aria-label={`Putar video: ${title}`}
                        exit={{ opacity: 0 }}
                    >
                        <img
                            src={thumb}
                            alt=""
                            loading="lazy"
                            decoding="async"
                            onError={() =>
                                setThumb(
                                    `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
                                )
                            }
                            className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <span className="absolute inset-0 bg-gradient-to-t from-primary-strong/70 via-primary-strong/20 to-transparent" />
                        <span className="absolute inset-0 flex items-center justify-center">
                            <span className="relative flex size-20 items-center justify-center">
                                {/* Animasi CSS: jalan di GPU, tanpa JS per frame */}
                                <span className="absolute inset-0 animate-ping rounded-full bg-brand-yellow/40 [animation-duration:1.8s] motion-reduce:animate-none" />
                                <span className="relative flex size-20 items-center justify-center rounded-full bg-brand-yellow text-brand-yellow-foreground shadow-lg transition-transform duration-300 group-hover:scale-110">
                                    <Play className="ml-1 size-8 fill-current" />
                                </span>
                            </span>
                        </span>
                    </m.button>
                )}
            </AnimatePresence>
        </div>
    );
}
