import { Head } from '@inertiajs/react';
import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { dashboard } from '@/routes';
import { Product, Sale } from '../interfaces/Interfaces';
import {
    Package,
    ShoppingCart,
    TrendingUp,
    DollarSign,
    AlertTriangle,
    ArrowUpRight,
    ReceiptText,
    BarChart3,
    PieChart,
} from 'lucide-react';
import { formatDate, shortFormatTime } from '@/components/format-time-and-date';

interface DataProps {
    products: Product[];
    sales: Sale[];
}

// ── Loading Skeleton Component ──
function DashboardSkeleton() {
    return (
        <div className="space-y-6 p-6">
            <Head title="Dashboard | Macmac Hardware" />
            {/* Stats Cards Skeleton */}
            <div className="grid grid-cols-4 gap-4">
                {[...Array(4)].map((_, i) => (
                    <div
                        key={i}
                        className="animate-pulse rounded-xl border border-slate-200 bg-white p-5"
                    >
                        <div className="mb-3 flex items-center justify-between">
                            <div className="h-10 w-10 rounded-lg bg-slate-200" />
                            <div className="h-6 w-16 rounded-full bg-slate-200" />
                        </div>
                        <div className="mb-2 h-3 w-24 rounded bg-slate-200" />
                        <div className="mb-2 h-8 w-32 rounded bg-slate-200" />
                        <div className="h-3 w-20 rounded bg-slate-200" />
                    </div>
                ))}
            </div>

            {/* Charts Section Skeleton */}
            <div className="grid grid-cols-3 gap-6">
                {/* Bar Chart Skeleton */}
                <div className="col-span-2 animate-pulse rounded-xl border border-slate-200 bg-white p-6">
                    <div className="mb-6 flex items-center gap-2">
                        <div className="h-5 w-5 rounded bg-slate-200" />
                        <div className="h-4 w-32 rounded bg-slate-200" />
                    </div>

                    <div className="flex h-48 items-end gap-3">
                        {[...Array(7)].map((_, i) => (
                            <div
                                key={i}
                                className="flex flex-1 flex-col items-center gap-2"
                            >
                                <div className="h-4 w-12 rounded bg-slate-200" />
                                <div
                                    className="w-full rounded-t-md bg-slate-200"
                                    style={{
                                        height: `${Math.random() * 120 + 20}px`,
                                    }}
                                />
                                <div className="h-3 w-8 rounded bg-slate-200" />
                            </div>
                        ))}
                    </div>

                    <div className="mt-4 border-t border-slate-100 pt-4">
                        <div className="flex items-center justify-between">
                            <div className="h-4 w-24 rounded bg-slate-200" />
                            <div className="h-4 w-28 rounded bg-slate-200" />
                        </div>
                    </div>
                </div>

                {/* Category Chart Skeleton */}
                <div className="animate-pulse rounded-xl border border-slate-200 bg-white p-6">
                    <div className="mb-6 flex items-center gap-2">
                        <div className="h-5 w-5 rounded bg-slate-200" />
                        <div className="h-4 w-36 rounded bg-slate-200" />
                    </div>

                    <div className="space-y-3">
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="space-y-1">
                                <div className="flex justify-between">
                                    <div className="h-4 w-20 rounded bg-slate-200" />
                                    <div className="h-4 w-12 rounded bg-slate-200" />
                                </div>
                                <div className="h-2 w-full rounded-full bg-slate-100">
                                    <div
                                        className="h-2 rounded-full bg-slate-200"
                                        style={{
                                            width: `${Math.random() * 60 + 20}%`,
                                        }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom Tables Skeleton */}
            <div className="grid grid-cols-2 gap-6">
                {[...Array(2)].map((_, tableIndex) => (
                    <div
                        key={tableIndex}
                        className="animate-pulse overflow-hidden rounded-xl border border-slate-200 bg-white"
                    >
                        <div className="border-b border-slate-200 px-6 py-4">
                            <div className="h-4 w-28 rounded bg-slate-200" />
                        </div>
                        <div className="divide-y divide-slate-100">
                            {[...Array(4)].map((_, rowIndex) => (
                                <div
                                    key={rowIndex}
                                    className="flex items-center justify-between px-6 py-3"
                                >
                                    <div className="space-y-1">
                                        <div className="h-4 w-32 rounded bg-slate-200" />
                                        <div className="h-3 w-20 rounded bg-slate-100" />
                                    </div>
                                    <div className="h-4 w-20 rounded bg-slate-200" />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

// ── Main Dashboard Component ──
export default function Dashboard({ products, sales }: DataProps) {
    const [loading, setLoading] = useState(true);

    // Refs for the GSAP entrance animation. Declared unconditionally at
    // the top, before the `if (loading) return ...` below — React's
    // Rules of Hooks require every hook to run in the same order on
    // every render, so nothing hook-related can live after a
    // conditional return.
    const barChartCardRef = useRef<HTMLDivElement>(null);
    const categoryChartCardRef = useRef<HTMLDivElement>(null);
    const barRefs = useRef<(HTMLDivElement | null)[]>([]);
    const categoryBarRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const timeout = setTimeout(() => setLoading(false), 800);
        return () => clearTimeout(timeout);
    }, []);

    // Runs once, right after `loading` flips to false and the real chart
    // DOM (not the skeleton) has actually mounted — refs are only
    // populated once that render commits, which is exactly when this
    // effect fires.
    useEffect(() => {
        if (loading) return;

        // The two chart cards fade + rise in together
        gsap.fromTo(
            [barChartCardRef.current, categoryChartCardRef.current],
            { opacity: 0, y: 16 },
            {
                opacity: 1,
                y: 0,
                duration: 0.5,
                ease: 'power2.out',
                stagger: 0.1,
            },
        );

        // Sales bars grow upward from the baseline. scaleY (not height!)
        // is the key — height is already correctly set by React from
        // real data on first paint, so GSAP only needs to visually
        // scale that existing box from 0 to full size vertically.
        gsap.fromTo(
            barRefs.current.filter(Boolean),
            { scaleY: 0 },
            {
                scaleY: 1,
                duration: 0.6,
                ease: 'power3.out',
                stagger: 0.06,
                transformOrigin: 'bottom',
                delay: 0.15,
            },
        );

        // Category bars grow left-to-right the same way, via scaleX
        gsap.fromTo(
            categoryBarRefs.current.filter(Boolean),
            { scaleX: 0 },
            {
                scaleX: 1,
                duration: 0.6,
                ease: 'power3.out',
                stagger: 0.08,
                transformOrigin: 'left',
                delay: 0.3,
            },
        );
    }, [loading]);

    if (loading) {
        return <DashboardSkeleton />;
    }

    // ── Computed Stats ──
    const totalProducts = products.length;
    const totalSales = sales.length;

    const totalRevenue = sales.reduce(
        (sum, sale) => sum + Number(sale.total),
        0,
    );

    const totalStockValue = products.reduce((sum, product) => {
        return (
            sum +
            Number(product.wholesale_price) * Number(product.stock_quantity)
        );
    }, 0);

    const totalOrders = sales.reduce((sum, sale) => {
        return (
            sum +
            (sale.products?.reduce(
                (s: number, p: any) => s + (p.pivot?.quantity || 0),
                0,
            ) || 0)
        );
    }, 0);

    const lowStockProducts = products.filter(
        (p) => Number(p.stock_quantity) > 0 && Number(p.stock_quantity) <= 5,
    );
    const outOfStockProducts = products.filter(
        (p) => Number(p.stock_quantity) === 0,
    );
    const inStockProducts = products.filter(
        (p) => Number(p.stock_quantity) > 5,
    );

    const today = new Date().toDateString();
    const todaySales = sales.filter(
        (sale) => new Date(sale.created_at).toDateString() === today,
    );
    const todayRevenue = todaySales.reduce(
        (sum, sale) => sum + Number(sale.total),
        0,
    );

    // Recent sales (last 5)
    const recentSales = [...sales]
        .sort(
            (a, b) =>
                new Date(b.created_at).getTime() -
                new Date(a.created_at).getTime(),
        )
        .slice(0, 5);

    // Top products by stock quantity
    const topProducts = [...products]
        .sort((a, b) => Number(b.stock_quantity) - Number(a.stock_quantity))
        .slice(0, 5);

    // Chart data - Sales by day (last 7 days)
    const last7Days = [...Array(7)]
        .map((_, i) => {
            const date = new Date();
            date.setDate(date.getDate() - i);
            return date.toDateString();
        })
        .reverse();

    const salesByDay = last7Days.map((day) => {
        const daySales = sales.filter(
            (sale) => new Date(sale.created_at).toDateString() === day,
        );
        return {
            day: new Date(day).toLocaleDateString('en-US', {
                weekday: 'short',
            }),
            count: daySales.length,
            revenue: daySales.reduce(
                (sum, sale) => sum + Number(sale.total),
                0,
            ),
        };
    });

    // Chart data - Products by category
    const categoryData = products.reduce(
        (acc: Record<string, number>, product) => {
            const catName = product.category?.category_name || 'Uncategorized';
            acc[catName] = (acc[catName] || 0) + 1;
            return acc;
        },
        {},
    );

    const maxRevenue = Math.max(...salesByDay.map((d) => d.revenue), 1);

    // Reset the ref arrays each render before re-populating them via the
    // callback refs below — otherwise stale entries from a previous
    // render (e.g. if the data set shrinks) would linger in the array.
    barRefs.current = [];
    categoryBarRefs.current = [];

    return (
        <>
            <Head title="Dashboard | Macmac Hardware" />

            <div className="mx-4 space-y-6 p-6">
                {/* ── Stats Cards ── */}
                <div className="grid grid-cols-4 gap-4">
                    {/* Total Revenue */}
                    <div className="rounded-xl border border-slate-200 bg-white p-5">
                        <div className="mb-3 flex items-center justify-between">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
                                <DollarSign className="h-5 w-5 text-green-600" />
                            </div>
                            <span className="flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-600">
                                <ArrowUpRight className="h-3 w-3" />
                                Revenue
                            </span>
                        </div>
                        <p className="mb-1 text-xs font-semibold tracking-wider text-slate-400 uppercase">
                            Total Revenue
                        </p>
                        <p className="font-mono text-2xl font-bold text-slate-900">
                            ₱
                            {totalRevenue.toLocaleString('en-PH', {
                                minimumFractionDigits: 2,
                            })}
                        </p>
                        <p className="mt-1 text-xs text-slate-400">
                            Today: ₱
                            {todayRevenue.toLocaleString('en-PH', {
                                minimumFractionDigits: 2,
                            })}
                        </p>
                    </div>

                    {/* Total Sales */}
                    <div className="rounded-xl border border-slate-200 bg-white p-5">
                        <div className="mb-3 flex items-center justify-between">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                                <ReceiptText className="h-5 w-5 text-blue-600" />
                            </div>
                            <span className="flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-600">
                                <ShoppingCart className="h-3 w-3" />
                                Sales
                            </span>
                        </div>
                        <p className="mb-1 text-xs font-semibold tracking-wider text-slate-400 uppercase">
                            Total Sales
                        </p>
                        <p className="font-mono text-2xl font-bold text-slate-900">
                            {totalSales}
                        </p>
                        <p className="mt-1 text-xs text-slate-400">
                            Total Orders: {totalOrders} items
                        </p>
                    </div>

                    {/* Total Products */}
                    <div className="rounded-xl border border-slate-200 bg-white p-5">
                        <div className="mb-3 flex items-center justify-between">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100">
                                <Package className="h-5 w-5 text-purple-600" />
                            </div>
                            <span className="flex items-center gap-1 rounded-full bg-purple-50 px-2 py-1 text-xs font-medium text-purple-600">
                                <TrendingUp className="h-3 w-3" />
                                Inventory
                            </span>
                        </div>
                        <p className="mb-1 text-xs font-semibold tracking-wider text-slate-400 uppercase">
                            Total Products
                        </p>
                        <p className="font-mono text-2xl font-bold text-slate-900">
                            {totalProducts}
                        </p>
                        <p className="mt-1 text-xs text-slate-400">
                            Stock Value: ₱
                            {totalStockValue.toLocaleString('en-PH', {
                                minimumFractionDigits: 2,
                            })}
                        </p>
                    </div>

                    {/* Stock Alerts */}
                    <div className="rounded-xl border border-slate-200 bg-white p-5">
                        <div className="mb-3 flex items-center justify-between">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100">
                                <AlertTriangle className="h-5 w-5 text-amber-600" />
                            </div>
                        </div>
                        <p className="mb-1 text-xs font-semibold tracking-wider text-slate-400 uppercase">
                            Stock Alerts
                        </p>
                        <div className="flex items-baseline gap-2">
                            <p className="font-mono text-2xl font-bold text-red-600">
                                {outOfStockProducts.length}
                            </p>
                            <span className="text-xs text-red-500">Out</span>
                            <p className="ml-2 font-mono text-2xl font-bold text-amber-600">
                                {lowStockProducts.length}
                            </p>
                            <span className="text-xs text-amber-500">Low</span>
                        </div>
                        <p className="mt-1 text-xs text-slate-400">
                            {inStockProducts.length} in stock
                        </p>
                    </div>
                </div>

                {/* ── Charts Section ── */}
                <div className="grid grid-cols-3 gap-6">
                    {/* Sales Bar Chart */}
                    <div
                        ref={barChartCardRef}
                        className="col-span-2 rounded-xl border border-slate-200 bg-white p-6"
                    >
                        <div className="mb-6 flex items-center gap-2">
                            <BarChart3 className="h-5 w-5 text-slate-500" />
                            <h3 className="text-sm font-semibold text-slate-900">
                                Sales This Week
                            </h3>
                        </div>

                        <div className="flex h-48 items-end gap-3">
                            {salesByDay.map((day, index) => (
                                <div
                                    key={day.day}
                                    className="flex flex-1 flex-col items-center gap-2"
                                >
                                    <div className="flex w-full flex-col items-center gap-1">
                                        <span className="text-xs font-medium text-slate-600">
                                            ₱
                                            {day.revenue.toLocaleString(
                                                'en-PH',
                                                { maximumFractionDigits: 0 },
                                            )}
                                        </span>
                                        <div
                                            ref={(el) => {
                                                barRefs.current[index] = el;
                                            }}
                                            className="w-full rounded-t-md bg-blue-500 transition-colors hover:bg-blue-600"
                                            style={{
                                                height: `${(day.revenue / maxRevenue) * 140}px`,
                                                minHeight:
                                                    day.revenue > 0
                                                        ? '8px'
                                                        : '2px',
                                            }}
                                        />
                                    </div>
                                    <span className="text-xs text-slate-400">
                                        {day.day}
                                    </span>
                                </div>
                            ))}
                        </div>

                        <div className="mt-4 border-t border-slate-100 pt-4">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-slate-500">
                                    Total this week
                                </span>
                                <span className="font-semibold text-slate-900">
                                    ₱
                                    {salesByDay
                                        .reduce((sum, d) => sum + d.revenue, 0)
                                        .toLocaleString('en-PH', {
                                            minimumFractionDigits: 2,
                                        })}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Products by Category */}
                    <div
                        ref={categoryChartCardRef}
                        className="rounded-xl border border-slate-200 bg-white p-6"
                    >
                        <div className="mb-6 flex items-center gap-2">
                            <PieChart className="h-5 w-5 text-slate-500" />
                            <h3 className="text-sm font-semibold text-slate-900">
                                Products by Category
                            </h3>
                        </div>

                        <div className="space-y-3">
                            {Object.entries(categoryData).map(
                                ([category, count], index) => {
                                    const percentage = (
                                        (count / totalProducts) *
                                        100
                                    ).toFixed(0);
                                    const colors: Record<string, string> = {
                                        Hardware: 'bg-blue-500',
                                        Construction: 'bg-green-500',
                                        Electrical: 'bg-amber-500',
                                        Plumbing: 'bg-purple-500',
                                        Paint: 'bg-red-500',
                                        Tools: 'bg-indigo-500',
                                        Uncategorized: 'bg-slate-400',
                                    };
                                    const barColor =
                                        colors[category] || 'bg-slate-500';

                                    return (
                                        <div
                                            key={category}
                                            className="space-y-1"
                                        >
                                            <div className="flex justify-between text-sm">
                                                <span className="text-slate-600">
                                                    {category}
                                                </span>
                                                <span className="font-medium text-slate-900">
                                                    {count} ({percentage}%)
                                                </span>
                                            </div>
                                            <div className="h-2 w-full rounded-full bg-slate-100">
                                                <div
                                                    ref={(el) => {
                                                        categoryBarRefs.current[
                                                            index
                                                        ] = el;
                                                    }}
                                                    className={`${barColor} h-2 rounded-full transition-colors`}
                                                    style={{
                                                        width: `${percentage}%`,
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    );
                                },
                            )}
                        </div>
                    </div>
                </div>

                {/* ── Bottom Section: Tables ── */}
                <div className="grid grid-cols-2 gap-6">
                    {/* Recent Sales */}
                    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
                        <div className="border-b border-slate-200 px-6 py-4">
                            <h3 className="text-sm font-semibold text-slate-900">
                                Recent Sales
                            </h3>
                        </div>
                        <div className="divide-y divide-slate-100">
                            {recentSales.length === 0 ? (
                                <div className="px-6 py-8 text-center text-sm text-slate-400">
                                    No sales yet
                                </div>
                            ) : (
                                recentSales.map((sale) => (
                                    <a
                                        key={sale.id}
                                        href="/sales"
                                        className="flex items-center justify-between px-6 py-3 transition-colors hover:bg-slate-50"
                                    >
                                        <div>
                                            <p className="text-sm font-medium text-slate-900">
                                                {sale.invoice_number}
                                            </p>
                                            <p className="text-xs text-slate-400">
                                                {formatDate(sale.created_at)}{' '}
                                                {shortFormatTime(
                                                    sale.created_at,
                                                )}
                                            </p>
                                        </div>
                                        <p className="font-mono text-sm font-semibold text-slate-900">
                                            ₱
                                            {Number(sale.total).toLocaleString(
                                                'en-PH',
                                                { minimumFractionDigits: 2 },
                                            )}
                                        </p>
                                    </a>
                                ))
                            )}
                        </div>
                    </div>

                    {/* Top Products */}
                    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
                        <div className="border-b border-slate-200 px-6 py-4">
                            <h3 className="text-sm font-semibold text-slate-900">
                                Top Products by Stock
                            </h3>
                        </div>
                        <div className="divide-y divide-slate-100">
                            {topProducts.length === 0 ? (
                                <div className="px-6 py-8 text-center text-sm text-slate-400">
                                    No products yet
                                </div>
                            ) : (
                                topProducts.map((product, index) => (
                                    <a
                                        key={product.id}
                                        href="/products"
                                        className="flex items-center gap-3 px-6 py-3 transition-colors hover:bg-slate-50"
                                    >
                                        <span className="w-5 text-xs font-bold text-slate-400">
                                            #{index + 1}
                                        </span>
                                        <div className="min-w-0 flex-1">
                                            <p className="truncate text-sm font-medium text-slate-900">
                                                {product.product_name}
                                            </p>
                                            <p className="text-xs text-slate-400">
                                                {product.category
                                                    ?.category_name ||
                                                    'No Category'}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-mono text-sm font-semibold text-slate-900">
                                                {product.stock_quantity}
                                            </p>
                                            <p className="text-xs text-slate-400">
                                                units
                                            </p>
                                        </div>
                                    </a>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

Dashboard.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
    ],
};
