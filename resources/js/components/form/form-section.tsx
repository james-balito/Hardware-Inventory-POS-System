// resources/js/Components/Form/FormSection.tsx
interface FormSectionProps {
    title: string;
    children: React.ReactNode;
    className?: string;
}

export function FormSection({ title, children, className = '' }: FormSectionProps) {
    return (
        <div className={`bg-white border border-slate-200 dark:border-slate-800 dark:bg-slate-600/10 rounded-xl p-6 space-y-4 ${className}`}>
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                {title}
            </p>
            {children}
        </div>
    );
}