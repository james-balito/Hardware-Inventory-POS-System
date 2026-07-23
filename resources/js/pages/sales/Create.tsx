import { useState } from 'react';
import ProductCard from '@/components/product-card';
import { ProductProps } from '@/interfaces/Props';
import { Product } from '@/interfaces/Interfaces';
import { router } from '@inertiajs/react';

export default function CreateSale({ products }: ProductProps) {
    const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
    const [quantities, setQuantities] = useState<Record<number, number>>({});
    const [processing, setProcessing] = useState(false);

    const getQty = (id: number) => quantities[id] ?? 1;

    const handleQuantityChange = (productId: number, qty: number) => {
        setQuantities(prev => ({ ...prev, [productId]: qty }));
    };

    const grandTotal = selectedProducts.reduce((sum, p) => {
        return sum + Number(p.sale_price) * getQty(p.id);
    }, 0);

    const handleAddProduct = (product: Product) => {
        setSelectedProducts(prev => {
            const exists = prev.find(p => p.id === product.id);
            if (exists) {
                alert('Product already added to sale');
                return prev;
            }
            return [...prev, product];
        });
    };

    const handleRemoveProduct = (productId: number) => {
        setSelectedProducts(prev => prev.filter(p => p.id !== productId));
        setQuantities(prev => {
            const updated = { ...prev };
            delete updated[productId]; // ✅ clean up quantity state too
            return updated;
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (selectedProducts.length === 0) {
            alert('Please add at least one product');
            return;
        }

        setProcessing(true);

        router.post('/sales', {
            products: selectedProducts.map(p => ({
                id: p.id,
                quantity: getQty(p.id),
            })),
        }, {
            onSuccess: () => {
                // Redirect happens automatically from the controller
                // But we can reset state if staying on the page
                setSelectedProducts([]);
                setQuantities({});
            },
            onError: (errors) => {
                console.error('Sale creation failed:', errors);
                alert(errors.message || 'Failed to create sale. Please try again.');
            },
            onFinish: () => {
                setProcessing(false);
            },
        });
    };

    return (
        <div className="flex h-screen overflow-hidden bg-slate-50">
            <form onSubmit={handleSubmit} className="flex w-full h-full">

                {/* ── Left: Product Grid ── */}
                <div className="flex-1 overflow-y-auto p-8">
                    <div className="mb-6">
                        <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-1">
                            Point of Sale
                        </p>
                        <h1 className="text-2xl font-bold text-slate-900">Sales Form</h1>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                        {products.map(product => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                onAddOrder={handleAddProduct}
                            />
                        ))}
                    </div>
                </div>

                {/* ── Right: Sale Summary Sidebar ── */}
                <div className="w-96 bg-slate-900 flex flex-col border-l border-slate-800">

                    {/* Header */}
                    <div className="px-6 py-5 border-b border-slate-800">
                        <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-1">
                            Current Order
                        </p>
                        <h2 className="text-white text-lg font-semibold">Sale Summary</h2>
                    </div>

                    {/* Items List */}
                    <div className="flex-1 overflow-y-auto p-6">
                        {selectedProducts.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-full gap-3">
                                <div className="w-14 h-14 rounded-full bg-slate-800 flex items-center justify-center">
                                    <svg className="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                                        />
                                    </svg>
                                </div>
                                <div className="text-center">
                                    <p className="text-slate-400 text-sm font-medium">No items added</p>
                                    <p className="text-slate-600 text-xs mt-1">Select products from the left panel</p>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {selectedProducts.map(product => (
                                    <div key={product.id} className="bg-slate-800 rounded-xl p-4">

                                        {/* Product name + remove */}
                                        <div className="flex justify-between items-start mb-3">
                                            <span className="text-white text-sm font-medium leading-tight flex-1 pr-3">
                                                {product.product_name}
                                            </span>
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveProduct(product.id)}
                                                className="text-slate-600 hover:text-red-400 transition-colors shrink-0"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                        </div>

                                        {/* Quantity stepper + line total */}
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <button
                                                    type="button"
                                                    onClick={() => handleQuantityChange(product.id, Math.max(1, getQty(product.id) - 1))}
                                                    className="w-7 h-7 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-300 hover:text-white transition-colors flex items-center justify-center font-medium"
                                                >
                                                    −
                                                </button>
                                                <input
                                                    type="number"
                                                    value={getQty(product.id)}
                                                    onChange={(e) => handleQuantityChange(product.id, Math.max(1, Number(e.target.value)))}
                                                    className="w-10 bg-slate-700 text-white text-center text-sm rounded-lg py-1 border border-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                                    min="1"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => handleQuantityChange(product.id, getQty(product.id) + 1)}
                                                    className="w-7 h-7 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-300 hover:text-white transition-colors flex items-center justify-center font-medium"
                                                >
                                                    +
                                                </button>
                                            </div>

                                            <span className="text-white font-semibold text-sm font-mono">
                                                ₱{(Number(product.sale_price) * getQty(product.id)).toFixed(2)}
                                            </span>
                                        </div>

                                        {/* Unit price hint */}
                                        <p className="mt-2 text-slate-500 text-xs">
                                            ₱{Number(product.sale_price).toFixed(2)} × {getQty(product.id)} {getQty(product.id) === 1 ? 'unit' : 'units'}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Footer: totals + submit */}
                    {selectedProducts.length > 0 && (
                        <div className="p-6 border-t border-slate-800 space-y-4">
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-500">
                                        {selectedProducts.length} {selectedProducts.length === 1 ? 'item' : 'items'}
                                    </span>
                                    <span className="text-slate-400 font-mono">₱{grandTotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between items-baseline">
                                    <span className="text-white font-semibold">Total</span>
                                    <span className="text-white font-bold text-2xl font-mono">
                                        ₱{grandTotal.toFixed(2)}
                                    </span>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full bg-blue-600 hover:bg-blue-500 active:bg-blue-700 disabled:bg-blue-900 disabled:text-blue-600 disabled:cursor-not-allowed text-white font-semibold py-3.5 rounded-xl transition-colors text-sm"
                            >
                                {processing ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                                        </svg>
                                        Processing...
                                    </span>
                                ) : (
                                    `Complete Sale · ₱${grandTotal.toFixed(2)}`
                                )}
                            </button>
                        </div>
                    )}
                </div>

            </form>
        </div>
    );
}