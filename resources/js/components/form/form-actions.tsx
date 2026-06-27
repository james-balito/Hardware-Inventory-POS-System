// resources/js/Components/Form/FormActions.tsx
interface FormActionsProps {
    onCancel: () => void;
    isProcessing?: boolean;
    submitLabel?: string;
    processingLabel?: string;
}

export function FormActions({ 
    onCancel, isProcessing = false, submitLabel = 'Submit', processingLabel = 'Saving...' 
}: FormActionsProps) {
    return (
        <div className="flex items-center justify-between pt-1">
            <button
                type="button"
                onClick={onCancel}
                className="text-sm text-slate-500 hover:text-slate-800 transition-colors"
            >
                Cancel
            </button>
            <button
                type="submit"
                disabled={isProcessing}
                className="flex items-center gap-2 bg-slate-900 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold px-8 py-2.5 rounded-xl transition-colors"
            >
                {isProcessing ? (
                    <>
                        <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                        </svg>
                        {processingLabel}
                    </>
                ) : submitLabel}
            </button>
        </div>
    );
}