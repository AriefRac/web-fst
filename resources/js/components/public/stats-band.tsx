import { BookOpen, GraduationCap, Handshake, UsersRound } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { CountUp } from '@/components/motion/count-up';
import { Reveal } from '@/components/motion/reveal';
import { site } from '@/data/site';

const icons: Record<string, LucideIcon> = {
    Dosen: UsersRound,
    Mahasiswa: GraduationCap,
    'Program Studi': BookOpen,
    'Perjanjian Kerja Sama': Handshake,
};

/**
 * Kartu statistik yang "menumpang" di tepi bawah hero (margin negatif),
 * jadi tetap putih dan tidak menambah area ungu yang luas.
 */
export function StatsBand() {
    return (
        <section className="theme-light relative z-10 mx-auto -mt-14 max-w-6xl px-4 md:-mt-16 md:px-6">
            <Reveal y={32}>
                <div className="grid grid-cols-2 overflow-hidden rounded-2xl border bg-white shadow-xl shadow-primary/10 md:grid-cols-4">
                    {site.stats.map((stat, i) => {
                        const Icon = icons[stat.label] ?? UsersRound;

                        return (
                            <div
                                key={stat.label}
                                className="group relative flex flex-col items-center gap-2 p-6 text-center md:flex-row md:gap-4 md:p-7 md:text-left [&:not(:first-child)]:border-l max-md:[&:nth-child(3)]:border-l-0 max-md:[&:nth-child(n+3)]:border-t"
                            >
                                <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                                    <Icon className="size-6" />
                                </span>
                                <div>
                                    <CountUp
                                        to={stat.value}
                                        duration={1.8 + i * 0.15}
                                        className="block text-3xl font-extrabold tracking-tight text-primary-strong tabular-nums md:text-4xl"
                                    />
                                    <span className="text-sm font-medium text-muted-foreground">
                                        {stat.label}
                                    </span>
                                </div>
                                <span className="absolute inset-x-6 bottom-0 h-[3px] origin-center scale-x-0 rounded-t-full bg-brand-yellow transition-transform duration-300 group-hover:scale-x-100" />
                            </div>
                        );
                    })}
                </div>
            </Reveal>
        </section>
    );
}
