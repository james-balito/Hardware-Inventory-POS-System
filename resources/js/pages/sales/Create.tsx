import { Head, router } from '@inertiajs/react';
import gsap from 'gsap';
import {
    ArrowRight,
    CheckCircle2,
    Grid2X2,
    List,
    Minus,
    PackageOpen,
    Plus,
    Search,
    ShoppingBag,
    Trash2,
    X,
} from 'lucide-react';
import { useLayoutEffect, useMemo, useRef, useState } from 'react';
import { useToast } from '@/components/contexts/toast-context';
import ProductCard from '@/components/product-card';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import type { Product } from '@/interfaces/Interfaces';
import type { ProductProps } from '@/interfaces/Props';

function SaleLineItem({ children }: { children: React.ReactNode }) {
    const ref = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        gsap.fromTo(
            ref.current,
            { opacity: 0, y: -10, scale: 0.97 },
            { opacity: 1, y: 0, scale: 1, duration: 0.3, ease: 'power2.out' },
        );
    }, []);

    return <div ref={ref}>{children}</div>;
}

CreateSale.layout = {
    breadcrumbs: [
        { title: 'Point of Sale', href: '/sales' },
        { title: 'Sales', href: '/sales/create' },
        { title: 'Create Sale', href: '/sales/create' },
    ],
};

const formatCurrency = (amount: number) =>
    amount.toLocaleString('en-PH', {
        style: 'currency',
        currency: 'PHP',
        minimumFractionDigits: 2,
    });

export default function CreateSale({ products }: ProductProps) {
    const { addToast, removeToast } = useToast();
    const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
    const [quantities, setQuantities] = useState<Record<number, number>>({});
    const [processing, setProcessing] = useState(false);
    const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
    const [search, setSearch] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');
    const [view, setView] = useState<'grid' | 'list'>('grid');
    const [deliveryCost, setDeliveryCost] = useState(0);
    const [showDeliveryInput, setShowDeliveryInput] = useState(false);
    const pageRef = useRef<HTMLDivElement>(null);
    const sidebarRef = useRef<HTMLElement>(null);

    useLayoutEffect(() => {
        const context = gsap.context(() => {
            gsap.fromTo(
                '[data-pos-intro]',
                { opacity: 0, y: 14 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.45,
                    stagger: 0.08,
                    ease: 'power2.out',
                },
            );
            gsap.fromTo(
                sidebarRef.current,
                { opacity: 0, x: 28 },
                {
                    opacity: 1,
                    x: 0,
                    duration: 0.5,
                    delay: 0.12,
                    ease: 'power2.out',
                },
            );
        }, pageRef);

        return () => context.revert();
    }, []);

    const categories = useMemo(
        () => [
            'All',
            ...Array.from(
                new Set(
                    products
                        .map((product) => product.category?.category_name)
                        .filter((category): category is string =>
                            Boolean(category),
                        ),
                ),
            ),
        ],
        [products],
    );

    const visibleProducts = useMemo(() => {
        const term = search.trim().toLowerCase();

        return products.filter((product) => {
            const matchesCategory =
                activeCategory === 'All' ||
                product.category?.category_name === activeCategory;
            const matchesSearch =
                !term ||
                product.product_name.toLowerCase().includes(term) ||
                product.category?.category_name?.toLowerCase().includes(term);

            return matchesCategory && matchesSearch;
        });
    }, [activeCategory, products, search]);

    const getQty = (id: number) => quantities[id] ?? 1;
    const itemCount = selectedProducts.reduce(
        (total, product) => total + getQty(product.id),
        0,
    );
    const grandTotal = selectedProducts.reduce(
        (sum, product) => sum + Number(product.sale_price) * getQty(product.id),
        0,
    ) + deliveryCost;

    const notify = (type: 'success' | 'error' | 'loading', message: string) => {
        const toastId = addToast(type, message);
        window.setTimeout(() => removeToast(toastId), 3200);

        return toastId;
    };

    const handleQuantityChange = (product: Product, qty: number) => {
        if (!Number.isInteger(qty) || qty < 1) {
            return;
        }

        if (qty > product.stock_quantity) {
            notify(
                'error',
                `Only ${product.stock_quantity} ${product.unit?.unit_name ?? 'item(s)'} available.`,
            );

            return;
        }

        setQuantities((previous) => ({ ...previous, [product.id]: qty }));
    };

    const handleAddProduct = (product: Product) => {
        const alreadyAdded = selectedProducts.some(
            (item) => item.id === product.id,
        );

        if (alreadyAdded) {
            handleQuantityChange(product, getQty(product.id) + 1);

            return;
        }

        setSelectedProducts((previous) => [...previous, product]);
        setQuantities((previous) => ({ ...previous, [product.id]: 1 }));
        notify('success', `${product.product_name} added to the order.`);
    };

    const handleRemoveProduct = (productId: number) => {
        setSelectedProducts((previous) =>
            previous.filter((product) => product.id !== productId),
        );
        setQuantities((previous) => {
            const next = { ...previous };
            delete next[productId];

            return next;
        });
    };

    const clearOrder = () => {
        setSelectedProducts([]);
        setQuantities({});
    };

    const openConfirmation = () => {
        if (!selectedProducts.length) {
            notify('error', 'Add at least one product before proceeding.');

            return;
        }

        notify('success', 'Order ready — review it before confirming payment.');
        setIsConfirmationOpen(true);
    };

    const confirmSale = () => {
        setProcessing(true);
        const toastId = addToast('loading', 'Creating your sale…');

        router.post(
            '/sales',
            {
                products: selectedProducts.map((product) => ({
                    id: product.id,
                    quantity: getQty(product.id),
                })),
                delivery_cost: deliveryCost,
            },
            {
                onSuccess: () => {
                    setIsConfirmationOpen(false);
                    clearOrder();
                },
                onError: (errors) => {
                    removeToast(toastId);
                    notify(
                        'error',
                        errors.message ||
                            'The sale could not be created. Please try again.',
                    );
                },
                onFinish: () => setProcessing(false),
            },
        );
    };

    return (
        <div
            ref={pageRef}
            className="min-h-[calc(100vh-4rem)] bg-slate-50 text-slate-900 dark:bg-slate-600/10 dark:text-slate-100"
        >
            <Head title="Point of Sale | Macmac Hardware" />
            <div className="grid min-h-[calc(100vh-10.5rem)] xl:grid-cols-[minmax(0,1fr)_25rem]">
                <main className="min-w-0 p-5 sm:p-8">
                    <div
                        data-pos-intro
                        className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between"
                    >
                        <label className="relative block max-w-xl flex-1">
                            <Search className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-slate-400" />
                            <input
                                value={search}
                                onChange={(event) =>
                                    setSearch(event.target.value)
                                }
                                placeholder="Search products by name or category…"
                                className="h-11 w-full rounded-xl border border-slate-200 bg-white pr-4 pl-11 text-sm text-slate-700 shadow-sm transition outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 dark:border-slate-800 dark:bg-slate-600/10 dark:text-slate-200 dark:placeholder:text-slate-500 dark:focus:ring-blue-500/20"
                            />
                        </label>

                        <div className="inline-flex w-fit rounded-xl border border-slate-200 bg-white p-1 shadow-sm dark:border-slate-800 dark:bg-slate-600/10">
                            <button
                                type="button"
                                onClick={() => setView('grid')}
                                className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition ${view === 'grid' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800'}`}
                            >
                                <Grid2X2 className="h-4 w-4" /> Grid
                            </button>
                            <button
                                type="button"
                                onClick={() => setView('list')}
                                className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition ${view === 'list' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800'}`}
                            >
                                <List className="h-4 w-4" /> List
                            </button>
                        </div>
                    </div>

                    <div
                        data-pos-intro
                        className="mt-5 flex gap-2 overflow-x-auto pb-1"
                    >
                        {categories.map((category) => (
                            <button
                                key={category}
                                type="button"
                                onClick={() => setActiveCategory(category)}
                                className={`rounded-xl border px-4 py-2 text-sm font-medium whitespace-nowrap transition ${activeCategory === category ? 'border-blue-600 bg-blue-600 text-white shadow-sm' : 'border-slate-200 bg-white text-slate-600 hover:border-blue-200 hover:text-blue-700 dark:border-slate-800 dark:bg-slate-600/10 dark:text-slate-300 dark:hover:border-slate-700 dark:hover:text-blue-300'}`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>

                    {visibleProducts.length ? (
                        <div
                            data-pos-intro
                            className={`mt-6 ${view === 'grid' ? 'grid grid-cols-1 gap-4 sm:grid-cols-2 2xl:grid-cols-3' : 'grid grid-cols-1 gap-3'}`}
                        >
                            {visibleProducts.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    view={view}
                                    isAdded={selectedProducts.some(
                                        (item) => item.id === product.id,
                                    )}
                                    onAddOrder={handleAddProduct}
                                />
                            ))}
                        </div>
                    ) : (
                        <div
                            data-pos-intro
                            className="mt-6 flex min-h-72 flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center dark:border-slate-800 dark:bg-slate-600/10"
                        >
                            <PackageOpen className="h-10 w-10 text-slate-300 dark:text-slate-600" />
                            <h2 className="mt-3 font-semibold text-slate-800 dark:text-slate-200">
                                No products found
                            </h2>
                            <p className="mt-1 text-sm text-slate-500">
                                Try another product name or category.
                            </p>
                        </div>
                    )}
                </main>

                <aside
                    ref={sidebarRef}
                    className="flex min-h-[34rem] flex-col border-t border-slate-200 bg-white xl:min-h-0 xl:border-t-0 xl:border-l dark:border-slate-800 dark:bg-slate-600/10"
                >
                    <div className="flex items-start justify-between border-b border-slate-100 px-5 py-5 dark:border-slate-800">
                        <div>
                            <h2 className="font-semibold text-slate-950 dark:text-slate-100">
                                Current Order
                            </h2>
                            <p className="mt-1 text-xs text-slate-500">
                                {itemCount
                                    ? `${itemCount} item${itemCount === 1 ? '' : 's'} in this order`
                                    : 'Add products to begin'}
                            </p>
                        </div>
                        <div>
                            {selectedProducts.length > 0 && (
                                <button
                                    type="button"
                                    onClick={clearOrder}
                                    className="flex items-center gap-1.5 text-xs font-semibold text-red-500 transition hover:text-red-700"
                                >
                                    <Trash2 className="h-3.5 w-3.5" /> Clear
                                    order
                                </button>
                            )}
                        </div>

                        <div className="absolute top-11 right-5">
                            <button
                                type="button"
                                onClick={() =>
                                    setShowDeliveryInput(!showDeliveryInput)
                                }
                                className={`flex items-center gap-2 rounded-lg border px-3 py-1.5 text-xs font-medium transition ${
                                    deliveryCost > 0
                                        ? 'border-amber-300 bg-amber-50 text-amber-700 dark:border-amber-800 dark:bg-amber-500/10 dark:text-amber-400'
                                        : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-600/10 dark:text-slate-300'
                                }`}
                            >
                                <svg
                                    className="h-3.5 w-3.5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M13 10V3L4 14h7v7l9-11h-7z"
                                    />
                                </svg>
                                {deliveryCost > 0
                                    ? `Delivery: ${formatCurrency(deliveryCost)}`
                                    : 'Add Delivery'}
                            </button>

                            {showDeliveryInput && (
                                <div className="absolute top-full right-0 z-10 mt-2 w-56 rounded-xl border border-slate-200 bg-white p-4 shadow-lg dark:border-slate-800 dark:bg-slate-950">
                                    <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                                        Delivery Cost
                                    </label>
                                    <div className="mt-2 flex items-center gap-2">
                                        <span className="text-sm text-slate-500">
                                            ₱
                                        </span>
                                        <input
                                            type="number"
                                            value={deliveryCost || ''}
                                            onChange={(e) =>
                                                setDeliveryCost(
                                                    Number(e.target.value) || 0,
                                                )
                                            }
                                            placeholder="0.00"
                                            min="0"
                                            step="0.01"
                                            className="w-full rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-slate-800 dark:bg-slate-600/10 dark:text-slate-200"
                                        />
                                    </div>
                                    <div className="mt-3 flex gap-2">
                                        {[50, 100, 150].map((amount) => (
                                            <button
                                                key={amount}
                                                type="button"
                                                onClick={() =>
                                                    setDeliveryCost(amount)
                                                }
                                                className={`flex-1 rounded-lg border px-2 py-1 text-xs font-medium transition ${
                                                    deliveryCost === amount
                                                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                                                        : 'border-slate-200 text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:text-slate-400'
                                                }`}
                                            >
                                                ₱{amount}
                                            </button>
                                        ))}
                                    </div>
                                    {deliveryCost > 0 && (
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setDeliveryCost(0);
                                                setShowDeliveryInput(false);
                                            }}
                                            className="mt-2 w-full text-xs text-red-500 hover:text-red-700"
                                        >
                                            Remove delivery cost
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="min-h-0 flex-1 overflow-y-auto px-5 py-3">
                        {!selectedProducts.length ? (
                            <div className="flex h-full min-h-56 flex-col items-center justify-center text-center">
                                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 dark:bg-blue-500/10">
                                    <ShoppingBag className="h-6 w-6 text-blue-500" />
                                </div>
                                <p className="mt-4 text-sm font-semibold text-slate-700 dark:text-slate-300">
                                    Your order is empty
                                </p>
                                <p className="mt-1 max-w-48 text-xs leading-5 text-slate-500">
                                    Choose a product from the catalog to add it
                                    here.
                                </p>
                            </div>
                        ) : (
                            <div className="divide-y divide-slate-100 dark:divide-slate-800">
                                {selectedProducts.map((product) => (
                                    <SaleLineItem key={product.id}>
                                        <div className="py-4">
                                            <div className="flex gap-3">
                                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-500">
                                                    <PackageOpen className="h-5 w-5" />
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                    <div className="flex gap-2">
                                                        <div className="min-w-0 flex-1">
                                                            <p className="truncate text-sm font-semibold text-slate-800 dark:text-slate-200">
                                                                {
                                                                    product.product_name
                                                                }
                                                            </p>
                                                            <p className="mt-0.5 text-xs text-slate-500">
                                                                {formatCurrency(
                                                                    Number(
                                                                        product.sale_price,
                                                                    ),
                                                                )}{' '}
                                                                each
                                                            </p>
                                                        </div>
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                handleRemoveProduct(
                                                                    product.id,
                                                                )
                                                            }
                                                            aria-label={`Remove ${product.product_name}`}
                                                            className="text-slate-400 transition hover:text-red-500"
                                                        >
                                                            <X className="h-4 w-4" />
                                                        </button>
                                                    </div>
                                                    <div className="mt-3 flex items-center justify-between gap-2">
                                                        <div className="inline-flex items-center rounded-lg border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-600/10">
                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    handleQuantityChange(
                                                                        product,
                                                                        getQty(
                                                                            product.id,
                                                                        ) - 1,
                                                                    )
                                                                }
                                                                className="p-1.5 text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-500/10"
                                                                aria-label="Decrease quantity"
                                                            >
                                                                <Minus className="h-3.5 w-3.5" />
                                                            </button>
                                                            <span className="min-w-8 border-x border-slate-200 px-2 py-1 text-center text-xs font-semibold dark:border-slate-800 dark:text-slate-200">
                                                                {getQty(
                                                                    product.id,
                                                                )}
                                                            </span>
                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    handleQuantityChange(
                                                                        product,
                                                                        getQty(
                                                                            product.id,
                                                                        ) + 1,
                                                                    )
                                                                }
                                                                className="p-1.5 text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-500/10"
                                                                aria-label="Increase quantity"
                                                            >
                                                                <Plus className="h-3.5 w-3.5" />
                                                            </button>
                                                        </div>
                                                        <p className="text-sm font-bold text-slate-900 dark:text-slate-100">
                                                            {formatCurrency(
                                                                Number(
                                                                    product.sale_price,
                                                                ) *
                                                                    getQty(
                                                                        product.id,
                                                                    ),
                                                            )}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </SaleLineItem>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="border-t border-slate-200 p-5 dark:border-slate-800">
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between text-slate-500 dark:text-slate-400">
                                <span>Subtotal ({itemCount} items)</span>
                                <span className="font-medium text-slate-700 dark:text-slate-300">
                                    {formatCurrency(grandTotal)}
                                </span>
                            </div>
                            <div className="flex items-end justify-between pt-2">
                                <span className="font-semibold text-slate-900 dark:text-slate-100">
                                    Total
                                </span>
                                <span className="text-2xl font-bold tracking-tight text-slate-950 dark:text-slate-100">
                                    {formatCurrency(grandTotal)}
                                </span>
                            </div>
                        </div>
                        <button
                            type="button"
                            onClick={openConfirmation}
                            disabled={!selectedProducts.length}
                            className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400"
                        >
                            Proceed to Payment{' '}
                            <ArrowRight className="h-4 w-4" />
                        </button>
                    </div>
                </aside>
            </div>

            <Dialog
                open={isConfirmationOpen}
                onOpenChange={setIsConfirmationOpen}
            >
                <DialogContent className="max-w-md overflow-hidden border border-slate-200 bg-white p-0 shadow-2xl dark:border-slate-800 dark:bg-slate-600/10 dark:text-slate-100">
                    <div className="bg-blue-600 px-6 py-7 text-white">
                        <CheckCircle2 className="h-8 w-8" />
                        <DialogTitle className="mt-4 text-xl">
                            Confirm this order?
                        </DialogTitle>
                        <DialogDescription className="mt-1 text-blue-100">
                            Please review the total before recording this sale.
                        </DialogDescription>
                    </div>
                    <DialogHeader className="gap-3 px-6 pt-6">
                        <div className="flex justify-between text-sm text-slate-500 dark:text-slate-400">
                            <span>
                                {itemCount} item{itemCount === 1 ? '' : 's'}
                            </span>
                            <span>Payment due</span>
                        </div>
                        <div className="flex items-baseline justify-between">
                            <span className="font-medium text-slate-700 dark:text-slate-300">
                                Order total
                            </span>
                            <span className="text-2xl font-bold text-slate-950 dark:text-slate-100">
                                {formatCurrency(grandTotal)}
                            </span>
                        </div>
                    </DialogHeader>
                    <DialogFooter className="flex-row gap-3 px-6 pb-6">
                        <button
                            type="button"
                            onClick={() => setIsConfirmationOpen(false)}
                            disabled={processing}
                            className="flex-1 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:opacity-60 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-900/40"
                        >
                            Back to order
                        </button>
                        <button
                            type="button"
                            onClick={confirmSale}
                            disabled={processing}
                            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:opacity-60"
                        >
                            {processing ? 'Confirming…' : 'Confirm order'}
                        </button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
