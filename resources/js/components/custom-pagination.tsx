import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
    currentPage: number;
    totalItems: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export function CustomPagination({ currentPage, totalPages,totalItems, onPageChange }: PaginationProps) {
    if (totalPages <= 1) return null;

    const pages: (number | string)[] = [];
    
    // Always show first page
    pages.push(1);
    
    // Ellipsis after first page
    if (currentPage > 3) pages.push('...');
    
    // Pages around current
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
        pages.push(i);
    }
    
    // Ellipsis before last page
    if (currentPage < totalPages - 2) pages.push('...');
    
    // Always show last page
    if (totalPages > 1) pages.push(totalPages);

    return (
        <div className="flex items-center justify-between border-t border-slate-200 px-4 py-3 dark:border-slate-700">
            <p className="text-sm text-slate-500 dark:text-slate-400">
                Page {currentPage} of {totalPages}
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400">
                Page {totalItems} of {totalPages}
            </p>
            <div className="flex items-center gap-1">
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-30 dark:text-slate-400 dark:hover:bg-slate-800"
                >
                    <ChevronLeft className="h-4 w-4" />
                </button>
                
                {pages.map((page, i) =>
                    typeof page === 'string' ? (
                        <span key={`ellipsis-${i}`} className="px-2 text-sm text-slate-400">...</span>
                    ) : (
                        <button
                            key={page}
                            onClick={() => onPageChange(page)}
                            className={`min-w-[36px] rounded-lg px-2 py-1.5 text-sm font-medium transition-colors ${
                                currentPage === page
                                    ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900'
                                    : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800'
                            }`}
                        >
                            {page}
                        </button>
                    )
                )}
                
                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-30 dark:text-slate-400 dark:hover:bg-slate-800"
                >
                    <ChevronRight className="h-4 w-4" />
                </button>
            </div>
        </div>
    );
}