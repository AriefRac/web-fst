import type { Partner } from '@/data/partners';

/**
 * Logo mitra yang bergeser terus-menerus (marquee).
 * - Daftar dirender dua kali agar perulangannya mulus (geser -50% lalu ulang).
 * - Berhenti saat di-hover; logo abu-abu jadi berwarna saat di-hover.
 * - Jika pengguna memilih "reduce motion", tampil sebagai grid statis.
 */
export function PartnerMarquee({ partners }: { partners: Partner[] }) {
    return (
        <>
            <div className="group relative overflow-hidden motion-reduce:hidden">
                {/* Fade di kiri & kanan */}
                <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-background to-transparent" />
                <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-background to-transparent" />

                <ul className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
                    {[...partners, ...partners].map((partner, i) => (
                        <li
                            key={`${partner.name}-${i}`}
                            className="flex w-44 shrink-0 items-center justify-center px-6 md:w-52"
                            aria-hidden={i >= partners.length}
                        >
                            <PartnerLogo partner={partner} />
                        </li>
                    ))}
                </ul>
            </div>

            <ul className="hidden flex-wrap items-center justify-center gap-10 motion-reduce:flex">
                {partners.map((partner) => (
                    <li key={partner.name}>
                        <PartnerLogo partner={partner} />
                    </li>
                ))}
            </ul>
        </>
    );
}

function PartnerLogo({ partner }: { partner: Partner }) {
    return (
        <img
            src={partner.logo}
            alt={partner.name}
            title={partner.name}
            // Lazy: section ini paling bawah. Salinan kedua di marquee memakai
            // URL yang sama, jadi diambil dari cache browser (tidak diunduh ulang).
            loading="lazy"
            decoding="async"
            className="h-16 w-auto max-w-full object-contain opacity-60 grayscale transition duration-300 hover:scale-105 hover:opacity-100 hover:grayscale-0 md:h-20"
        />
    );
}
