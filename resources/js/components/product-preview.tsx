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
    name, salePrice, wholesalePrice, stock, category, unit, margin 
}: ProductPreviewProps) {
    return (
        <div className="sticky top-8 space-y-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                Live Preview
            </p>

            {/* Product Card Preview */}
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                <div className="bg-slate-100 h-32 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center">
                        <Package className="w-6 h-6 text-slate-400" />
                    </div>
                </div>

                <div className="p-4 space-y-3">
                    <h2 className="text-sm font-semibold text-slate-900 leading-tight line-clamp-2 min-h-[2.5rem]">
                        {name || (
                            <span className="text-slate-300">Product name</span>
                        )}
                    </h2>

                    <div className="flex items-center gap-0.5">
                        <PhilippinePeso className="w-3.5 h-3.5 text-slate-700 shrink-0" />
                        <span className="text-base font-bold text-slate-900 font-mono">
                            {salePrice
                                ? Number(salePrice).toFixed(2)
                                : <span className="text-slate-300 font-normal text-sm">0.00</span>
                            }
                        </span>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${category ? 'bg-slate-100 text-slate-500' : 'bg-slate-50 text-slate-300'}`}>
                            {category?.category_name ?? 'No category'}
                        </span>
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${unit ? 'bg-slate-100 text-slate-500' : 'bg-slate-50 text-slate-300'}`}>
                            {unit?.unit_name ?? 'No unit'}
                        </span>
                    </div>

                    <div className="w-full bg-slate-900 text-white text-xs font-semibold py-2.5 rounded-lg text-center opacity-40 cursor-not-allowed select-none">
                        + Add to Order
                    </div>
                </div>
            </div>

            {/* Details Panel */}
            <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-3">
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                    Details
                </p>

                <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                        <span className="text-slate-500">Wholesale</span>
                        <span className="font-mono text-slate-700">
                            {wholesalePrice ? `₱${Number(wholesalePrice).toFixed(2)}` : '—'}
                        </span>
                    </div>

                    <div className="flex justify-between text-sm">
                        <span className="text-slate-500">Stock</span>
                        <span className="font-mono text-slate-700">
                            {stock
                                ? `${stock}${unit ? ` ${unit.unit_name}` : ''}`
                                : '—'
                            }
                        </span>
                    </div>

                    {/* Margin — only shows when both prices are filled */}
                    {wholesalePrice && salePrice && (
                        <div className="flex justify-between text-sm border-t border-slate-100 pt-2">
                            <span className="text-slate-500">Margin</span>
                            <span className={`font-mono font-semibold ${margin >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                                {margin >= 0 ? '+' : ''}₱{margin.toFixed(2)}
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}