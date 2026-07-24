import { Product } from '@/interfaces/Interfaces';
import { PhilippinePeso } from 'lucide-react';

interface ProductCardProps {
    product: Product;
    onAddOrder?: (product: Product) => void;
}

export default function ProductCard({ product, onAddOrder }: ProductCardProps) {
    return (
        <div className="flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:border-slate-300 hover:shadow-md">
            {/* Image Placeholder */}
            <button
                className="flex h-28 cursor-pointer items-center justify-center bg-slate-100 transition-all ease-in-out hover:scale-110"
                onClick={() => onAddOrder?.(product)}
            >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-200">
                    <svg
                        className="h-6 w-6 text-slate-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                        />
                    </svg>
                </div>
            </button>

            {/* Body */}
            <div className="flex flex-1 flex-col p-4">
                {/* Product Name */}
                <h2 className="mb-2 line-clamp-2 text-sm leading-tight font-semibold text-slate-900">
                    {product.product_name}
                </h2>

                {/* Price */}
                <div className="mb-3 flex items-center gap-0.5">
                    <PhilippinePeso className="h-3.5 w-3.5 shrink-0 text-slate-700" />
                    <span className="font-mono text-base font-bold text-slate-900">
                        {Number(product.sale_price).toFixed(2)}
                    </span>
                </div>

                {/* Category + Unit Badges */}
                <div className="mb-4 flex flex-wrap gap-1.5">
                    {product.category?.category_name && (
                        <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-500">
                            {product.category.category_name}
                        </span>
                    )}
                    {product.unit?.unit_name && (
                        <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-500">
                            {product.unit.unit_name}
                        </span>
                    )}
                </div>

                {/* Add Button */}
                <button
                    type="button"
                    onClick={() => onAddOrder?.(product)}
                    className="mt-auto w-full cursor-pointer rounded-lg bg-slate-900 py-2.5 text-xs font-semibold text-white transition-colors duration-200 hover:bg-blue-600"
                >
                    + Add to Order
                </button>
            </div>
        </div>
    );
}
