import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import { CmsProviders } from '@/layouts/cms-providers';
import type { BreadcrumbItem } from '@/types';

export default function AppLayout({
    breadcrumbs = [],
    children,
}: {
    breadcrumbs?: BreadcrumbItem[];
    children: React.ReactNode;
}) {
    return (
        <CmsProviders>
            <AppLayoutTemplate breadcrumbs={breadcrumbs}>
                {children}
            </AppLayoutTemplate>
        </CmsProviders>
    );
}
