// resources/js/Components/Form/FormSection.tsx
interface FormSectionProps {
    title: string;
    children: React.ReactNode;
    className?: string;
}

export function FormSection({ title, children, className = '' }: FormSectionProps) {
    return (
        <div className={`bg-white border border-slate-200 rounded-xl p-6 space-y-4 ${className}`}>
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                {title}
            </p>
            {children}
        </div>
    );
}