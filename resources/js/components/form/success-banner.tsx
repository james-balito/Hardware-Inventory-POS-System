// resources/js/Components/Form/SuccessBanner.tsx
interface SuccessBannerProps {
    message: string;
}

export function SuccessBanner({ message }: SuccessBannerProps) {
    if (!message) return null;
    
    return (
        <div className="mb-6 flex items-center gap-3 p-4 bg-green-50 border border-green-200 text-green-700 rounded-xl">
            <svg className="w-5 h-5 text-green-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-sm font-medium">{message}</p>
        </div>
    );
}