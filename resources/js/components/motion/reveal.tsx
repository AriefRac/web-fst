import { m } from 'motion/react';
import type { HTMLMotionProps } from 'motion/react';

type RevealProps = HTMLMotionProps<'div'> & {
    /** Jeda sebelum animasi mulai, dalam detik. */
    delay?: number;
    /** Jarak geser awal dalam piksel. */
    y?: number;
};

/**
 * Membungkus elemen agar muncul (fade + geser ke atas) saat masuk viewport.
 * Otomatis tanpa animasi jika pengguna mengaktifkan "reduce motion"
 * (diatur oleh <MotionConfig reducedMotion="user"> di PublicLayout).
 */
export function Reveal({ delay = 0, y = 24, children, ...props }: RevealProps) {
    return (
        <m.div
            initial={{ opacity: 0, y }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
            {...props}
        >
            {children}
        </m.div>
    );
}
