// resources/js/Components/Form/FormPageHeader.tsx
import { ArrowLeft } from 'lucide-react';
import { router } from '@inertiajs/react';

interface FormPageHeaderProps {
    title: string;
    subtitle?: string;
    backUrl: string;
    backLabel?: string;
}

export function FormPageHeader({ title, subtitle, backUrl, backLabel = 'Back' }: FormPageHeaderProps) {
    return (
        <div className="mb-8">
            <button
                type="button"
                onClick={() => router.visit(backUrl)}
                className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-500 cursor-pointer transition-colors mb-4"
            >
                <ArrowLeft className="w-4 h-4" />
                {backLabel}
            </button>
            {subtitle && (
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-1">{subtitle}</p>
            )}
            <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-400/80">{title}</h1>
        </div>
    );
}