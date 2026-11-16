/**
 * Tipe konten publik. Bentuknya mengikuti model data di docs/PRD.md
 * supaya nanti tinggal diganti dengan props dari controller Laravel.
 */

export type Banner = {
    id: number;
    title: string;
    subtitle?: string | null;
    imageDesktop: string;
    imageMobile?: string | null;
    ctaLabel?: string | null;
    ctaUrl?: string | null;
};

export type PostSummary = {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    thumbnail: string;
    category: string;
    publishedAt: string; // ISO 8601
};

export type EventLocationType = 'offline' | 'online' | 'hybrid';
export type EventExecutionStatus = 'scheduled' | 'postponed' | 'cancelled';

export type EventSummary = {
    id: number;
    title: string;
    slug: string;
    category: string;
    startsAt: string;
    endsAt: string;
    locationType: EventLocationType;
    venue?: string | null;
    executionStatus: EventExecutionStatus;
};

export type AnnouncementSummary = {
    id: number;
    title: string;
    slug: string;
    category: string;
    priority: 'normal' | 'important';
    isPinned: boolean;
    publishedAt: string;
};

export type LecturerSummary = {
    id: number;
    name: string; // sudah termasuk gelar
    slug: string;
    photo: string;
    studyProgram: string;
    functionalPosition: string;
};

export type DocumentCategoryLink = {
    label: string;
    count: number;
    href: string;
};
