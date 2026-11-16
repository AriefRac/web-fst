const TIME_ZONE = 'Asia/Jakarta';

/** 14 November 2026 */
export function formatDate(iso: string): string {
    return new Intl.DateTimeFormat('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        timeZone: TIME_ZONE,
    }).format(new Date(iso));
}

/** 08.00 */
export function formatTime(iso: string): string {
    return new Intl.DateTimeFormat('id-ID', {
        hour: '2-digit',
        minute: '2-digit',
        timeZone: TIME_ZONE,
    }).format(new Date(iso));
}

/** { day: '05', month: 'Des' } untuk badge tanggal agenda */
export function dateBadge(iso: string): { day: string; month: string } {
    const date = new Date(iso);

    return {
        day: new Intl.DateTimeFormat('id-ID', {
            day: '2-digit',
            timeZone: TIME_ZONE,
        }).format(date),
        month: new Intl.DateTimeFormat('id-ID', {
            month: 'short',
            timeZone: TIME_ZONE,
        }).format(date),
    };
}
