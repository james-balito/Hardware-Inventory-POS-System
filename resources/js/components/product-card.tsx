import { Check, PackageOpen, Plus } from 'lucide-react';
import type { Product } from '@/interfaces/Interfaces';

interface ProductCardProps {
    product: Product;
    onAddOrder?: (product: Product) => void;
    view?: 'grid' | 'list';
    isAdded?: boolean;
}

const formatCurrency = (amount: number) =>
    amount.toLocaleString('en-PH', {
        style: 'currency',
        currency: 'PHP',
        minimumFractionDigits: 2,
    });

export default function ProductCard({
    product,
    onAddOrder,
    view = 'grid',
    isAdded = false,
}: ProductCardProps) {
    const isLowStock = product.stock_quantity <= 5;

    return (
        <button onClick = {() => onAddOrder?.(product)} title = {isAdded ? 'Added to cart' : 'Add to cart'} className={`group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md dark:border-slate-800 dark:bg-slate-600/10 dark:hover:border-slate-700 cursor-pointer ${view === 'list' ? 'flex items-center gap-4 p-4' : 'flex flex-col p-4'}`}>
            <div className={`flex shrink-0 items-center justify-center rounded-xl bg-slate-50 text-slate-400 dark:bg-slate-800 dark:text-slate-500 ${view === 'list' ? 'h-16 w-16' : 'h-32 w-full'}`}>
                <PackageOpen className={view === 'list' ? 'h-7 w-7' : 'h-10 w-10'} />
            </div>
            <div className={`min-w-0 flex-1 ${view === 'grid' ? 'pt-4' : ''}`}>
                <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-slate-900 dark:text-slate-100">{product.product_name}</p>
                        <p className="mt-1 text-lg font-bold tracking-tight text-left text-blue-700 dark:text-blue-400">{formatCurrency(Number(product.sale_price))}</p>
                    </div>
                    <span className={`shrink-0 rounded-full px-2 py-1 text-[11px] font-semibold ${isLowStock ? 'bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400' : 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400'}`}>
                        {isLowStock ? 'Low stock' : 'In stock'}
                    </span>
                </div>
                <div className={`flex items-center justify-between gap-3 ${view === 'grid' ? 'mt-4' : 'mt-2'}`}>
                    <div className="min-w-0">
                        {product.category?.category_name && <span className="inline-block max-w-full truncate rounded-full bg-slate-100 px-2 py-1 text-[11px] font-medium text-slate-500 dark:bg-slate-800 dark:text-slate-400">{product.category.category_name}</span>}
                        <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400">Stock: {product.stock_quantity} {product.unit?.unit_name ?? 'pcs'}</p>
                    </div>
                    <button type="button" onClick={() => onAddOrder?.(product)} className={`flex shrink-0 items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold transition ${isAdded ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-400 dark:hover:bg-emerald-500/20' : 'bg-blue-600 text-white hover:bg-blue-700'}`}>
                        {isAdded ? <><Check className="h-3.5 w-3.5" /> Add another</> : <><Plus className="h-3.5 w-3.5" /> Add to order</>}
                    </button>
                </div>
            </div>
        </button>
    );
}
