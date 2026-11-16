import AuthLayoutTemplate from '@/layouts/auth/auth-simple-layout';
import { CmsProviders } from '@/layouts/cms-providers';

export default function AuthLayout({
    title = '',
    description = '',
    children,
}: {
    title?: string;
    description?: string;
    children: React.ReactNode;
}) {
    return (
        <CmsProviders>
            <AuthLayoutTemplate title={title} description={description}>
                {children}
            </AuthLayoutTemplate>
        </CmsProviders>
    );
}
