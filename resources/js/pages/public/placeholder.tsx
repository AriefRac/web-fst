import { Head } from '@inertiajs/react';
import { Reveal } from '@/components/motion/reveal';

/** Halaman sementara untuk menu publik yang belum dibuat. */
export default function Placeholder({ title }: { title: string }) {
    return (
        <>
            <Head title={title} />
            <section className="mx-auto max-w-7xl px-4 py-24 md:px-6">
                <Reveal>
                    <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
                        {title}
                    </h1>
                    <p className="mt-4 text-muted-foreground">
                        Halaman ini sedang dikerjakan.
                    </p>
                </Reveal>
            </section>
        </>
    );
}
