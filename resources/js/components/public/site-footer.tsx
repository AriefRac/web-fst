import { Link } from '@inertiajs/react';
import { Mail, MapPin, Phone } from 'lucide-react';
import { publicNav } from '@/data/navigation';

export function SiteFooter() {
    return (
        <footer className="mt-24 border-t bg-muted/40">
            <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 md:grid-cols-3 md:px-6">
                <div>
                    <p className="text-lg font-semibold">Fakultas Teknik</p>
                    <p className="text-sm text-muted-foreground">
                        Universitas Contoh
                    </p>
                    <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                        <li className="flex gap-2">
                            <MapPin className="mt-0.5 size-4 shrink-0" />
                            Jl. Pendidikan No. 1, Kota Contoh
                        </li>
                        <li className="flex gap-2">
                            <Phone className="mt-0.5 size-4 shrink-0" />
                            (021) 000-0000
                        </li>
                        <li className="flex gap-2">
                            <Mail className="mt-0.5 size-4 shrink-0" />
                            fakultas@contoh.ac.id
                        </li>
                    </ul>
                </div>

                <div>
                    <p className="mb-4 text-sm font-semibold">Navigasi</p>
                    <ul className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                        {publicNav.map((item) => (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    className="hover:text-foreground"
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <p className="mb-4 text-sm font-semibold">Tautan</p>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>Portal Akademik</li>
                        <li>E-Learning</li>
                        <li>Perpustakaan</li>
                    </ul>
                </div>
            </div>
            <div className="border-t py-6 text-center text-xs text-muted-foreground">
                © {new Date().getFullYear()} Fakultas Teknik, Universitas Contoh
            </div>
        </footer>
    );
}
