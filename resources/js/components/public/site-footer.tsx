import { Link } from '@inertiajs/react';
import { ExternalLink, Mail, MapPin, Phone } from 'lucide-react';
import { SiteLogo } from '@/components/public/site-logo';
import { publicNavLinks } from '@/data/navigation';
import { site } from '@/data/site';

const mapsEmbedSrc = `https://www.google.com/maps?q=${encodeURIComponent(site.mapsQuery)}&output=embed`;

export function SiteFooter() {
    return (
        <footer className="mt-24 border-t bg-neutral-50">
            {/* Garis aksen ungu + kuning */}
            <div className="flex h-1">
                <span className="flex-[3] bg-primary" />
                <span className="flex-1 bg-brand-yellow" />
            </div>

            <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:px-6 lg:grid-cols-12">
                <div className="lg:col-span-4">
                    <SiteLogo />
                    <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
                        <li className="flex gap-2.5">
                            <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
                            {site.address}
                        </li>
                        <li>
                            <a
                                href={site.phoneHref}
                                className="flex gap-2.5 hover:text-primary"
                            >
                                <Phone className="mt-0.5 size-4 shrink-0 text-primary" />
                                {site.phone}
                            </a>
                        </li>
                        <li>
                            <a
                                href={`mailto:${site.email}`}
                                className="flex gap-2.5 hover:text-primary"
                            >
                                <Mail className="mt-0.5 size-4 shrink-0 text-primary" />
                                {site.email}
                            </a>
                        </li>
                    </ul>
                </div>

                <div className="lg:col-span-3">
                    <p className="mb-4 text-sm font-bold text-primary-strong">
                        Navigasi
                    </p>
                    <ul className="grid grid-cols-2 gap-2.5 text-sm text-muted-foreground">
                        {publicNavLinks.map((item) => (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    className="transition-colors hover:text-primary"
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="lg:col-span-5">
                    <div className="mb-4 flex items-center justify-between">
                        <p className="text-sm font-bold text-primary-strong">
                            Lokasi Kampus
                        </p>
                        <a
                            href={site.mapsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary-strong"
                        >
                            Buka di Google Maps
                            <ExternalLink className="size-3" />
                        </a>
                    </div>
                    <div className="overflow-hidden rounded-xl border bg-white">
                        <iframe
                            src={mapsEmbedSrc}
                            title={`Peta lokasi ${site.facultyName}`}
                            className="h-56 w-full"
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            allowFullScreen
                        />
                    </div>
                </div>
            </div>

            <div className="border-t py-6 text-center text-xs text-muted-foreground">
                © {new Date().getFullYear()} {site.facultyName},{' '}
                {site.university}
            </div>
        </footer>
    );
}
