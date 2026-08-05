    interface PageHeaderProps {
    title: string;
    icon: React.ReactNode;
    headerTitle?: string;
}
export default function PageHeader({
    title,
    icon,
    headerTitle,
}: PageHeaderProps) {
    return (
        <div className={`flex flex-row`}>
            <span className={`rounded-md bg-black p-3 text-white dark:bg-slate-600/20 border dark:border-slate-600 dark:text-slate-100`}>{icon}</span>

            <div className={`flex flex-col ml-4`}>
                <p className="text-xs font-semibold tracking-widest text-slate-400 dark:text-slate-500 uppercase">
                    {headerTitle}
                </p>

                <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-300/90">{title}</h1>
            </div>
        </div>
    );
}
