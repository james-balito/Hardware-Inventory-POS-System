// resources/js/Contexts/ToastContext.tsx
import { CheckCircle, XCircle, X } from 'lucide-react';
import { createContext, useContext, useState, useCallback } from 'react';

type ToastType = 'success' | 'error' | 'loading';

interface Toast {
    id: number;
    type: ToastType;
    message: string;
}

interface ToastContextType {
    addToast: (type: ToastType, message: string) => number;
    removeToast: (id: number) => void;
    updateToast: (id: number, type: ToastType, message: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const addToast = useCallback((type: ToastType, message: string) => {
        const id = Date.now();
        setToasts(prev => [...prev, { id, type, message }]);

        return id;
    }, []);

    const removeToast = useCallback((id: number) => {
        setToasts(prev => prev.filter(toast => toast.id !== id));
    }, []);

    const updateToast = useCallback((id: number, type: ToastType, message: string) => {
        setToasts(prev => prev.map(toast => 
            toast.id === id ? { ...toast, type, message } : toast
        ));
    }, []);

    return (
        <ToastContext.Provider value={{ addToast, removeToast, updateToast }}>
            {children}
            
            {/* Toast Container */}
            <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm w-full">
                {toasts.map(toast => (
                    <ToastItem 
                        key={toast.id} 
                        toast={toast} 
                        onClose={() => removeToast(toast.id)} 
                    />
                ))}
            </div>
        </ToastContext.Provider>
    );
}

// Toast Item Component
function ToastItem({ toast, onClose }: { toast: Toast; onClose: () => void }) {
    const icons = {
        success: <CheckCircle className="w-5 h-5 text-green-500" />,
        error: <XCircle className="w-5 h-5 text-red-500" />,
        loading: (
            <svg className="animate-spin w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
            </svg>
        ),
    };

    const bgColors = {
        success:
            'border-green-200 bg-green-50 dark:border-slate-600 dark:bg-slate-900/95',
        error:
            'border-red-200 bg-red-50 dark:border-slate-600 dark:bg-slate-900/95',
        loading:
            'border-blue-200 bg-blue-50 dark:border-slate-600 dark:bg-slate-900/95',
    };

    return (
        <div className={`flex items-center gap-3 rounded-xl border p-4 shadow-lg ${bgColors[toast.type]} animate-slide-in`}>
            {icons[toast.type]}
            <p className="flex-1 text-sm font-medium text-slate-700 dark:text-slate-200">{toast.message}</p>
            <button onClick={onClose} className="text-slate-400 transition hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-200">
                <X className="w-4 h-4" />
            </button>
        </div>
    );
}

// Hook to use toast
export function useToast() {
    const context = useContext(ToastContext);

    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }

    return context;
}
