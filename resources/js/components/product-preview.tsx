// resources/js/Components/ProductPreview.tsx
import { Package, PhilippinePeso } from 'lucide-react';
import type { Category } from '@/types/category';
import type { Unit } from '@/types/unit';

interface ProductPreviewProps {
    name: string;
    salePrice: string | number;
    wholesalePrice: string | number;
    stock: string | number;
    category?: Category;
    unit?: Unit;
    margin: number;
}

export function ProductPreview({
    name,
    salePrice,
    wholesalePrice,
    stock,
    category,
    unit,
    margin,
}: ProductPreviewProps) {
    return (
        <div className="sticky top-8 space-y-4">
            <p className="text-xs font-semibold tracking-widest text-slate-400 uppercase">
                Product Preview
            </p>

            {/* Product Card Preview */}
            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-600/10">
                <div className="flex h-32 items-center justify-center bg-slate-100 dark:bg-slate-800/40">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-200 dark:bg-slate-700">
                        <Package className="h-6 w-6 text-slate-400 dark:text-slate-500" />
                    </div>
                </div>

                <div className="space-y-3 p-4">
                    <h2 className="line-clamp-2 min-h-[2.5rem] text-sm leading-tight font-semibold text-slate-900 dark:text-slate-100">
                        {name || (
                            <span className="text-slate-300">Product name</span>
                        )}
                    </h2>

                    <div className="flex items-center gap-0.5">
                        <PhilippinePeso className="h-3.5 w-3.5 shrink-0 text-slate-700 dark:text-slate-400" />
                        <span className="font-mono text-base font-bold text-slate-900 dark:text-slate-400">
                            {salePrice ? (
                                Number(salePrice).toFixed(2)
                            ) : (
                                <span className="text-sm font-normal text-slate-300">
                                    0.00
                                </span>
                            )}
                        </span>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                        <span
                            className={`rounded-full px-2 py-0.5 text-xs font-medium ${category ? 'border bg-slate-100 text-slate-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400' : 'border bg-slate-50 text-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400'}`}
                        >
                            {category?.category_name ?? 'No category'}
                        </span>
                        <span
                            className={`rounded-full px-2 py-0.5 text-xs font-medium ${unit ? 'border bg-slate-100 text-slate-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400' : 'border bg-slate-50 text-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400'}`}
                        >
                            {unit?.unit_name ?? 'No unit'}
                        </span>
                    </div>

                    <div className="w-full cursor-not-allowed rounded-lg bg-slate-900 py-2.5 text-center text-xs font-semibold text-white opacity-40 select-none dark:bg-slate-700">
                        + Add to Order
                    </div>
                </div>
            </div>

            {/* Details Panel */}
            <div className="space-y-3 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-600/10">
                <p className="text-xs font-semibold tracking-widest text-slate-400 uppercase dark:text-slate-500">
                    Details
                </p>

                <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                        <span className="text-slate-500 dark:text-slate-500">Wholesale</span>
                        <span className="font-mono text-slate-700 dark:text-slate-400">
                            {wholesalePrice
                                ? `₱${Number(wholesalePrice).toFixed(2)}`
                                : '—'}
                        </span>
                    </div>

                    <div className="flex justify-between text-sm">
                        <span className="text-slate-500 dark:text-slate-500">Stock</span>
                        <span className="font-mono text-slate-700 dark:text-slate-400">
                            {stock
                                ? `${stock}${unit ? ` ${unit.unit_name}` : ''}`
                                : '—'}
                        </span>
                    </div>

                    {/* Margin — only shows when both prices are filled */}
                    {wholesalePrice && salePrice && (
                        <div className="flex justify-between border-t border-slate-100 pt-2 text-sm">
                            <span className="text-slate-500">Margin Profit per {unit?.unit_name}</span>
                            <span
                                className={`font-mono font-semibold ${margin >= 0 ? 'text-green-600' : 'text-red-500'}`}
                            >
                                {margin >= 0 ? '+ ' : ''}₱{margin.toFixed(2)}
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
