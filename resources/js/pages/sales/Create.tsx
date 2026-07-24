import { useState } from 'react';
import ProductCard from '@/components/product-card';
import { ProductProps } from '@/interfaces/Props';
import { Product } from '@/interfaces/Interfaces';
import { router } from '@inertiajs/react';
import PageHeader from '@/components/header';
import { ShoppingCart } from 'lucide-react';

export default function CreateSale({ products }: ProductProps) {
    const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
    const [quantities, setQuantities] = useState<Record<number, number>>({});
    const [processing, setProcessing] = useState(false);

    const getQty = (id: number) => quantities[id] ?? 1;

    const handleQuantityChange = (productId: number, qty: number) => {
        if (isNaN(qty) || qty < 1) return;
        if (!Number.isInteger(qty)) return;
        setQuantities((prev) => ({ ...prev, [productId]: qty }));
    };

    const grandTotal = selectedProducts.reduce((sum, p) => {
        return sum + Number(p.sale_price) * getQty(p.id);
    }, 0);

    const handleAddProduct = (product: Product) => {
        setSelectedProducts((prev) => {
            const exists = prev.find((p) => p.id === product.id);
            if (exists) {
                alert('Product already added to sale');
                return prev;
            }
            return [...prev, product];
        });
    };

    const handleRemoveProduct = (productId: number) => {
        setSelectedProducts((prev) => prev.filter((p) => p.id !== productId));
        setQuantities((prev) => {
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

        router.post(
            '/sales',
            {
                products: selectedProducts.map((p) => ({
                    id: p.id,
                    quantity: getQty(p.id),
                })),
            },
            {
                onSuccess: () => {
                    // Redirect happens automatically from the controller
                    // But we can reset state if staying on the page
                    setSelectedProducts([]);
                    setQuantities({});
                },
                onError: (errors) => {
                    console.error('Sale creation failed:', errors);
                    alert(
                        errors.message ||
                            'Failed to create sale. Please try again.',
                    );
                },
                onFinish: () => {
                    setProcessing(false);
                },
            },
        );
    };

    return (
        <div className="flex h-screen overflow-hidden bg-slate-50">
            <form onSubmit={handleSubmit} className="flex h-full w-full">
                {/* ── Left: Product Grid ── */}
                <div className="flex-1 overflow-y-auto p-8">
                    <PageHeader
                        headerTitle="Point of Sale"
                        icon={<ShoppingCart />}
                        title="Create Sale"
                    />

                    <div className="mt-4 grid grid-cols-3 gap-4">
                        {products.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                onAddOrder={handleAddProduct}
                            />
                        ))}
                    </div>
                </div>

                {/* ── Right: Sale Summary Sidebar ── */}
                <div className="flex w-96 flex-col border-l border-slate-800 bg-slate-900">
                    {/* Header */}
                    <div className="border-b border-slate-800 px-6 py-5">
                        <p className="mb-1 text-xs font-semibold tracking-widest text-slate-500 uppercase">
                            Current Order
                        </p>
                        <h2 className="text-lg font-semibold text-white">
                            Sale Summary
                        </h2>
                    </div>

                    {/* Items List */}
                    <div className="flex-1 overflow-y-auto p-6">
                        {selectedProducts.length === 0 ? (
                            <div className="flex h-full flex-col items-center justify-center gap-3">
                                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-800">
                                    <svg
                                        className="h-6 w-6 text-slate-600"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                                        />
                                    </svg>
                                </div>
                                <div className="text-center">
                                    <p className="text-sm font-medium text-slate-400">
                                        No items added
                                    </p>
                                    <p className="mt-1 text-xs text-slate-600">
                                        Select products from the left panel
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {selectedProducts.map((product) => (
                                    <div
                                        key={product.id}
                                        className="rounded-xl bg-slate-800 p-4"
                                    >
                                        {/* Product name + remove */}
                                        <div className="mb-3 flex items-start justify-between">
                                            <span className="flex-1 pr-3 text-sm leading-tight font-medium text-white">
                                                {product.product_name}
                                            </span>
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleRemoveProduct(
                                                        product.id,
                                                    )
                                                }
                                                className="shrink-0 text-slate-600 transition-colors hover:text-red-400"
                                            >
                                                <svg
                                                    className="h-4 w-4"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M6 18L18 6M6 6l12 12"
                                                    />
                                                </svg>
                                            </button>
                                        </div>

                                        {/* Quantity stepper + line total */}
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        handleQuantityChange(
                                                            product.id,
                                                            Math.max(
                                                                1,
                                                                getQty(
                                                                    product.id,
                                                                ) - 1,
                                                            ),
                                                        )
                                                    }
                                                    className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-700 font-medium text-slate-300 transition-colors hover:bg-slate-600 hover:text-white"
                                                >
                                                    −
                                                </button>
                                                <input
                                                    type="text"
                                                    inputMode="numeric"
                                                    value={getQty(product.id)}
                                                    onChange={(e) => {
                                                        const value =
                                                            e.target.value.replace(
                                                                /\D/g,
                                                                '',
                                                            );
                                                        const qty = parseInt(
                                                            value,
                                                            10,
                                                        );
                                                        if (value === '')
                                                            return;
                                                        if (
                                                            !isNaN(qty) &&
                                                            qty >= 1
                                                        ) {
                                                            handleQuantityChange(
                                                                product.id,
                                                                qty,
                                                            );
                                                        }
                                                    }}
                                                    className="w-20 cursor-pointer rounded-lg border border-slate-600 bg-slate-700 px-1 py-1 text-center text-sm text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        handleQuantityChange(
                                                            product.id,
                                                            getQty(product.id) +
                                                                1,
                                                        )
                                                    }
                                                    className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-700 font-medium text-slate-300 transition-colors hover:bg-slate-600 hover:text-white"
                                                >
                                                    +
                                                </button>
                                            </div>

                                            <span className="font-mono text-sm font-semibold text-white">
                                                ₱
                                                {(
                                                    Number(product.sale_price) *
                                                    getQty(product.id)
                                                ).toFixed(2)}
                                            </span>
                                        </div>

                                        {/* Unit price hint */}
                                        <p className="mt-2 text-xs text-slate-500">
                                            ₱
                                            {Number(product.sale_price).toFixed(
                                                2,
                                            )}{' '}
                                            × {getQty(product.id)}{' '}
                                            {getQty(product.id) === 1
                                                ? 'unit'
                                                : 'units'}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Footer: totals + submit */}
                    {selectedProducts.length > 0 && (
                        <div className="space-y-4 border-t border-slate-800 p-6">
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-500">
                                        {selectedProducts.length}{' '}
                                        {selectedProducts.length === 1
                                            ? 'item'
                                            : 'items'}
                                    </span>
                                    <span className="font-mono text-slate-400">
                                        ₱{grandTotal.toFixed(2)}
                                    </span>
                                </div>
                                <div className="flex items-baseline justify-between">
                                    <span className="font-semibold text-white">
                                        Total
                                    </span>
                                    <span className="font-mono text-2xl font-bold text-white">
                                        ₱{grandTotal.toFixed(2)}
                                    </span>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full rounded-xl bg-blue-600 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-blue-500 active:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-900 disabled:text-blue-600"
                            >
                                {processing ? (
                                    <span className="flex items-center justify-center gap-2">
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
