import { AlertTriangle, Trash2, X } from 'lucide-react';
import { useEffect, useState } from 'react';

interface DeleteConfirmationModalProps {
    isOpen: boolean;
    dataName: string;
    onClose: () => void;
    onConfirm: () => void;
    isProcessing?: boolean;
}

export default function DeleteConfirmationModal({
    isOpen,
    onClose,
    dataName,
    onConfirm,
    isProcessing = false,
}: DeleteConfirmationModalProps) {
    const [isVisible, setIsVisible] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
            // Trigger animation on next frame
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    setIsAnimating(true);
                });
            });
        } else {
            setIsAnimating(false);
            // Wait for exit animation to finish before unmounting
            const timeout = setTimeout(() => {
                setIsVisible(false);
            }, 300);
            return () => clearTimeout(timeout);
        }
    }, [isOpen]);

    // Close on Escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
        }

        return () => document.removeEventListener('keydown', handleEscape);
    }, [isOpen, onClose]);

    if (!isVisible) return null;

    return (
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-300 ease-in-out ${
                isAnimating ? 'opacity-100' : 'opacity-0'
            }`}
        >
            {/* Backdrop */}
            <div
                className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-all duration-300 ease-in-out ${
                    isAnimating ? 'bg-black/50 backdrop-blur-sm' : 'bg-black/0 backdrop-blur-none'
                }`}
                onClick={onClose}
            />

            {/* Modal Card */}
            <div
                className={`relative w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl transition-all duration-300 ease-in-out dark:border-slate-700 dark:bg-slate-800 ${
                    isAnimating
                        ? 'translate-y-0 scale-100 opacity-100'
                        : 'translate-y-4 scale-95 opacity-0'
                }`}
            >
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 cursor-pointer rounded-lg p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-700 dark:hover:text-slate-300"
                >
                    <X className="h-4 w-4" />
                </button>

                {/* Warning icon */}
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-50 dark:bg-red-900/30">
                    <AlertTriangle className="h-7 w-7 text-red-500 dark:text-red-400" />
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                    Delete Confirmation
                </h3>

                {/* Message */}
                <p className="mt-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                    Are you sure you want to delete{' '}
                    <span className="font-semibold text-slate-700 dark:text-slate-200">
                        "{dataName}"
                    </span>
                    ? This action cannot be undone.
                </p>

                {/* Actions */}
                <div className="mt-6 flex items-center justify-end gap-3">
                    <button
                        onClick={onClose}
                        disabled={isProcessing}
                        className="cursor-pointer rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700/50"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        disabled={isProcessing}
                        className="flex cursor-pointer items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-red-300"
                    >
                        {isProcessing ? (
                            <>
                                <svg
                                    className="h-4 w-4 animate-spin"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    />
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8v8H4z"
                                    />
                                </svg>
                                Deleting...
                            </>
                        ) : (
                            <>
                                <Trash2 className="h-4 w-4" />
                                Delete
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}