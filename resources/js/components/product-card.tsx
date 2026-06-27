import { Product } from '@/pages/interfaces/Interfaces';
import { PhilippinePeso } from 'lucide-react';

interface ProductCardProps {
    product: Product;
    onAddOrder?: (product: Product) => void;
}

export default function ProductCard({ product, onAddOrder }: ProductCardProps) {
    return (
        <div className="flex flex-col bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-200">

            {/* Image Placeholder */}
            <div className="bg-slate-100 h-28 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center">
                    <svg
                        className="w-6 h-6 text-slate-400"
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
            </div>

            {/* Body */}
            <div className="flex flex-col flex-1 p-4">

                {/* Product Name */}
                <h2 className="text-sm font-semibold text-slate-900 leading-tight line-clamp-2 mb-2">
                    {product.product_name}
                </h2>

                {/* Price */}
                <div className="flex items-center gap-0.5 mb-3">
                    <PhilippinePeso className="w-3.5 h-3.5 text-slate-700 shrink-0" />
                    <span className="text-base font-bold text-slate-900 font-mono">
                        {Number(product.sale_price).toFixed(2)}
                    </span>
                </div>

                {/* Category + Unit Badges */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                    {product.category?.category_name && (
                        <span className="text-xs bg-slate-100 text-slate-500 font-medium px-2 py-0.5 rounded-full">
                            {product.category.category_name}
                        </span>
                    )}
                    {product.unit?.unit_name && (
                        <span className="text-xs bg-slate-100 text-slate-500 font-medium px-2 py-0.5 rounded-full">
                            {product.unit.unit_name}
                        </span>
                    )}
                </div>

                {/* Add Button */}
                <button
                    type="button"
                    onClick={() => onAddOrder?.(product)}
                    className="mt-auto w-full bg-slate-900 hover:bg-blue-600 text-white text-xs font-semibold py-2.5 rounded-lg transition-colors duration-200"
                >
                    + Add to Order
                </button>
            </div>
        </div>
    );
}