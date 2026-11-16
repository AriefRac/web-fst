import { useInView, useReducedMotion } from 'motion/react';
import { useEffect, useRef } from 'react';

type CountUpProps = {
    to: number;
    /** Durasi animasi dalam detik. */
    duration?: number;
    className?: string;
};

const formatter = new Intl.NumberFormat('id-ID');

/** easeOutExpo: cepat di awal, melambat menjelang angka akhir. */
const easeOut = (t: number) => (t === 1 ? 1 : 1 - 2 ** (-10 * t));

/**
 * Angka yang menghitung naik dari 0 saat pertama kali terlihat di layar.
 * - Angka akhir sudah dirender sejak awal (SSR & tanpa JS tetap benar).
 * - Memakai requestAnimationFrame biasa dan mengubah teks langsung,
 *   tanpa re-render React dan tanpa engine animasi tambahan.
 */
export function CountUp({ to, duration = 2, className }: CountUpProps) {
    const ref = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, { once: true, margin: '-60px' });
    const reduceMotion = useReducedMotion();

    useEffect(() => {
        const el = ref.current;

        if (!el || !inView || reduceMotion) {
            return;
        }

        let frame = 0;
        const start = performance.now();

        const tick = (now: number) => {
            const progress = Math.min((now - start) / (duration * 1000), 1);
            el.textContent = formatter.format(
                Math.round(easeOut(progress) * to),
            );

            if (progress < 1) {
                frame = requestAnimationFrame(tick);
            }
        };

        frame = requestAnimationFrame(tick);

        return () => cancelAnimationFrame(frame);
    }, [inView, reduceMotion, to, duration]);

    return (
        <span ref={ref} className={className}>
            {formatter.format(to)}
        </span>
    );
}
