import { Head } from '@inertiajs/react';
import { useState, useEffect, useLayoutEffect, useRef } from 'react';
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

function DashboardSkeleton() {
    return (
        <div className="space-y-6 p-6">
            <Head title="Dashboard | Macmac Hardware" />
            <div className="grid grid-cols-4 gap-4">
                {[...Array(4)].map((_, i) => (
                    <div
                        key={i}
                        className="animate-pulse rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-600/10"
                    >
                        <div className="mb-3 flex items-center justify-between">
                            <div className="h-10 w-10 rounded-lg bg-slate-200 dark:bg-slate-700" />
                            <div className="h-6 w-16 rounded-full bg-slate-200 dark:bg-slate-700" />
                        </div>
                        <div className="mb-2 h-3 w-24 rounded bg-slate-200 dark:bg-slate-700" />
                        <div className="mb-2 h-8 w-32 rounded bg-slate-200 dark:bg-slate-700" />
                        <div className="h-3 w-20 rounded bg-slate-200 dark:bg-slate-700" />
                    </div>
                ))}
            </div>
            <div className="grid grid-cols-3 gap-6">
                <div className="col-span-2 animate-pulse rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-600/10">
                    <div className="mb-6 flex items-center gap-2">
                        <div className="h-5 w-5 rounded bg-slate-200 dark:bg-slate-700" />
                        <div className="h-4 w-32 rounded bg-slate-200 dark:bg-slate-700" />
                    </div>
                    <div className="flex h-48 items-end gap-3">
                        {[...Array(12)].map((_, i) => (
                            <div
                                key={i}
                                className="flex flex-1 flex-col items-center gap-2"
                            >
                                <div className="h-4 w-12 rounded bg-slate-200 dark:bg-slate-700" />
                                <div
                                    className="w-full rounded-t-md bg-slate-200 dark:bg-slate-700"
                                    style={{
                                        height: `${Math.random() * 120 + 20}px`,
                                    }}
                                />
                                <div className="h-3 w-8 rounded bg-slate-200 dark:bg-slate-700" />
                            </div>
                        ))}
                    </div>
                    <div className="mt-4 border-t border-slate-100 pt-4 dark:border-slate-800">
                        <div className="flex items-center justify-between">
                            <div className="h-4 w-24 rounded bg-slate-200 dark:bg-slate-700" />
                            <div className="h-4 w-28 rounded bg-slate-200 dark:bg-slate-700" />
                        </div>
                    </div>
                </div>
                <div className="animate-pulse rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-600/10">
                    <div className="mb-6 flex items-center gap-2">
                        <div className="h-5 w-5 rounded bg-slate-200 dark:bg-slate-700" />
                        <div className="h-4 w-36 rounded bg-slate-200 dark:bg-slate-700" />
                    </div>
                    <div className="space-y-3">
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="space-y-1">
                                <div className="flex justify-between">
                                    <div className="h-4 w-20 rounded bg-slate-200 dark:bg-slate-700" />
                                    <div className="h-4 w-12 rounded bg-slate-200 dark:bg-slate-700" />
                                </div>
                                <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-slate-700">
                                    <div
                                        className="h-2 rounded-full bg-slate-200 dark:bg-slate-700"
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
            <div className="grid grid-cols-2 gap-6">
                {[...Array(2)].map((_, tableIndex) => (
                    <div
                        key={tableIndex}
                        className="animate-pulse overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-600/10"
                    >
                        <div className="border-b border-slate-200 px-6 py-4 dark:border-slate-700">
                            <div className="h-4 w-28 rounded bg-slate-200 dark:bg-slate-800" />
                        </div>
                        <div className="divide-y divide-slate-100 dark:divide-slate-700">
                            {[...Array(4)].map((_, rowIndex) => (
                                <div
                                    key={rowIndex}
                                    className="flex items-center justify-between px-6 py-3"
                                >
                                    <div className="space-y-1">
                                        <div className="h-4 w-32 rounded bg-slate-200 dark:bg-slate-800" />
                                        <div className="h-3 w-20 rounded bg-slate-100 dark:bg-slate-700" />
                                    </div>
                                    <div className="h-4 w-20 rounded bg-slate-200 dark:bg-slate-700" />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default function Dashboard({ products, sales }: DataProps) {
    const [loading, setLoading] = useState(true);
    const [chartView, setChartView] = useState<'week' | 'month'>('week');

    const barChartCardRef = useRef<HTMLDivElement>(null);
    const categoryChartCardRef = useRef<HTMLDivElement>(null);
    const barRefs = useRef<(HTMLDivElement | null)[]>([]);
    const categoryBarRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const timeout = setTimeout(() => setLoading(false), 800);
        return () => clearTimeout(timeout);
    }, []);

    useEffect(() => {
        if (loading) return;
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
    }, [loading]);

    useLayoutEffect(() => {
        if (loading) return;
        gsap.fromTo(
            barRefs.current.filter(Boolean),
            { scaleY: 0 },
            {
                scaleY: 1,
                duration: 0.5,
                ease: 'power3.out',
                stagger: 0.05,
                transformOrigin: 'bottom',
            },
        );
    }, [loading, chartView]);

    useEffect(() => {
        if (loading) return;
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

    if (loading) return <DashboardSkeleton />;

    // ── Stats ──
    const totalProducts = products.length;
    const totalSales = sales.length;
    const totalRevenue = sales.reduce(
        (sum, sale) => sum + Number(sale.total),
        0,
    );
    const totalStockValue = products.reduce(
        (sum, product) =>
            sum +
            Number(product.wholesale_price) * Number(product.stock_quantity),
        0,
    );
    const totalOrders = sales.reduce(
        (sum, sale) =>
            sum +
            (sale.products?.reduce(
                (s: number, p: any) => s + (p.pivot?.quantity || 0),
                0,
            ) || 0),
        0,
    );

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

    const recentSales = [...sales]
        .sort(
            (a, b) =>
                new Date(b.created_at).getTime() -
                new Date(a.created_at).getTime(),
        )
        .slice(0, 5);

    const topProducts = [...products]
        .sort((a, b) => Number(b.stock_quantity) - Number(a.stock_quantity))
        .slice(0, 5);

    // ── Chart Data ──
    // Weekly (last 7 days)
    const salesByDay = [...Array(7)]
        .map((_, i) => {
            const date = new Date();
            date.setDate(date.getDate() - i);
            return date.toDateString();
        })
        .reverse()
        .map((day) => {
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

    // Monthly (all 12 months of current year)
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();

    const salesByMonth = [...Array(12)].map((_, i) => {
        const monthSales = sales.filter((sale) => {
            const saleDate = new Date(sale.created_at);
            return (
                saleDate.getMonth() === i &&
                saleDate.getFullYear() === currentYear
            );
        });
        return {
            month: new Date(currentYear, i, 1).toLocaleDateString('en-US', {
                month: 'short',
            }),
            count: monthSales.length,
            revenue: monthSales.reduce(
                (sum, sale) => sum + Number(sale.total),
                0,
            ),
        };
    });

    const currentMonthData = salesByMonth[currentMonth];

    // Category data
    const categoryData = products.reduce(
        (acc: Record<string, number>, product) => {
            const catName = product.category?.category_name || 'Uncategorized';
            acc[catName] = (acc[catName] || 0) + 1;
            return acc;
        },
        {},
    );

    // Active chart
    const activeChartData =
        chartView === 'week'
            ? salesByDay.map((d) => ({ label: d.day, revenue: d.revenue }))
            : salesByMonth.map((d) => ({ label: d.month, revenue: d.revenue }));

    const activeMax = Math.max(...activeChartData.map((d) => d.revenue), 1);
    const activeTotal = activeChartData.reduce((sum, d) => sum + d.revenue, 0);

    barRefs.current = [];
    categoryBarRefs.current = [];

    return (
        <>
            <Head title="Dashboard | Macmac Hardware" />
            <div className="mx-4 space-y-6 p-6">
                {/* ── Stats Cards ── */}
                <div className="grid grid-cols-4 gap-4">
                    <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-600/10">
                        <div className="mb-3 flex items-center justify-between">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg border bg-green-100 dark:border-green-700 dark:bg-green-900/60">
                                <DollarSign className="h-5 w-5 text-green-600 dark:text-green-500" />
                            </div>
                            <span className="flex items-center gap-1 rounded-full border bg-green-50 px-2 py-1 text-xs font-medium text-green-500 dark:border-green-800 dark:bg-green-900/60">
                                <ArrowUpRight className="h-3 w-3" /> Revenue
                            </span>
                        </div>
                        <p className="mb-1 text-xs font-semibold tracking-wider text-slate-400 uppercase dark:text-slate-300/60">
                            Total Revenue
                        </p>
                        <p className="font-mono text-2xl font-bold text-slate-900 dark:text-white">
                            ₱
                            {totalRevenue.toLocaleString('en-PH', {
                                minimumFractionDigits: 2,
                            })}
                        </p>
                        <p className="mt-1 text-xs text-slate-400 dark:text-slate-300/70">
                            Today: ₱
                            {todayRevenue.toLocaleString('en-PH', {
                                minimumFractionDigits: 2,
                            })}
                        </p>
                    </div>
                    <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-600/10">
                        <div className="mb-3 flex items-center justify-between">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg border bg-blue-100 dark:border-blue-800 dark:bg-blue-900/60">
                                <ReceiptText className="h-5 w-5 text-blue-600" />
                            </div>
                            <span className="flex items-center gap-1 rounded-full border bg-blue-50 px-2 py-1 text-xs font-medium text-blue-600 dark:border-blue-800 dark:bg-blue-900/60">
                                <ShoppingCart className="h-3 w-3" /> Sales
                            </span>
                        </div>
                        <p className="mb-1 text-xs font-semibold tracking-wider text-slate-400 uppercase dark:text-slate-300/60">
                            Total Sales
                        </p>
                        <p className="font-mono text-2xl font-bold text-slate-900 dark:text-white">
                            {totalSales}
                        </p>
                        <p className="mt-1 text-xs text-slate-400 dark:text-slate-300/70">
                            Total Orders: {totalOrders} items
                        </p>
                    </div>
                    <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-600/10">
                        <div className="mb-3 flex items-center justify-between">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg border bg-purple-100 dark:border-purple-800 dark:bg-purple-900/60">
                                <Package className="h-5 w-5 text-purple-600" />
                            </div>
                            <span className="flex items-center gap-1 rounded-full border bg-purple-50 px-2 py-1 text-xs font-medium text-purple-600 dark:border-purple-800 dark:bg-purple-900/60">
                                <TrendingUp className="h-3 w-3" /> Inventory
                            </span>
                        </div>
                        <p className="mb-1 text-xs font-semibold tracking-wider text-slate-400 uppercase dark:text-slate-300/70">
                            Total Products
                        </p>
                        <p className="font-mono text-2xl font-bold text-slate-900 dark:text-white">
                            {totalProducts}
                        </p>
                        <p className="mt-1 text-xs text-slate-400 dark:text-slate-300/70">
                            Stock Value: ₱
                            {totalStockValue.toLocaleString('en-PH', {
                                minimumFractionDigits: 2,
                            })}
                        </p>
                    </div>
                    <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-600/10">
                        <div className="mb-3 flex items-center justify-between">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg border bg-amber-100 dark:border-amber-700 dark:bg-amber-900/70">
                                <AlertTriangle className="h-5 w-5 text-amber-600" />
                            </div>
                        </div>
                        <p className="mb-1 text-xs font-semibold tracking-wider text-slate-400 uppercase dark:text-slate-300/60">
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
                        <p className="mt-1 text-xs text-slate-400 dark:text-slate-300/70">
                            {inStockProducts.length} in stock
                        </p>
                    </div>
                </div>

                {/* ── Charts ── */}
                <div className="grid grid-cols-3 gap-6">
                    <div
                        ref={barChartCardRef}
                        className="col-span-2 rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-600/10"
                    >
                        <div className="mb-6 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <BarChart3 className="h-5 w-5 text-slate-500" />
                                <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-300">
                                    Sales This{' '}
                                    {chartView === 'week' ? 'Week' : 'Month'}
                                </h3>
                            </div>
                            <div className="flex gap-1 rounded-full bg-slate-100 p-1 dark:bg-slate-800">
                                {(['week', 'month'] as const).map((view) => (
                                    <button
                                        key={view}
                                        onClick={() => setChartView(view)}
                                        className={`cursor-pointer rounded-full px-3 py-1 text-xs font-medium capitalize transition-colors ${
                                            chartView === view
                                                ? 'bg-white text-slate-900 shadow-sm dark:bg-slate-700 dark:text-white'
                                                : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
                                        }`}
                                    >
                                        {view}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="flex h-48 items-end gap-3">
                            {activeChartData.map((entry, index) => (
                                <div
                                    key={`${chartView}-${entry.label}-${index}`}
                                    className="flex flex-1 flex-col items-center gap-2"
                                >
                                    <div className="flex w-full flex-col items-center gap-1">
                                        <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
                                            ₱
                                            {entry.revenue.toLocaleString(
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
                                                height: `${(entry.revenue / activeMax) * 140}px`,
                                                minHeight:
                                                    entry.revenue > 0
                                                        ? '8px'
                                                        : '2px',
                                            }}
                                        />
                                    </div>
                                    <span className="text-xs text-slate-400 dark:text-slate-300">
                                        {entry.label}
                                    </span>
                                </div>
                            ))}
                        </div>

                        <div className="mt-4 border-t border-slate-100 pt-4 dark:border-slate-800">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-slate-500 dark:text-slate-400">
                                    {chartView === 'week'
                                        ? 'Total this week'
                                        : `${currentMonthData.month} Sales`}
                                </span>
                                <span className="font-semibold text-slate-900 dark:text-slate-300">
                                    ₱
                                    {chartView === 'week'
                                        ? activeTotal.toLocaleString('en-PH', {
                                              minimumFractionDigits: 2,
                                          })
                                        : currentMonthData.revenue.toLocaleString(
                                              'en-PH',
                                              { minimumFractionDigits: 2 },
                                          )}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div
                        ref={categoryChartCardRef}
                        className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-600/10"
                    >
                        <div className="mb-6 flex items-center gap-2">
                            <PieChart className="h-5 w-5 text-slate-500 dark:text-slate-300" />
                            <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-300">
                                Products by Category
                            </h3>
                        </div>
                        <div className="max-h-[250px] space-y-3 overflow-y-auto pr-2 scrollbar-hidden">
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
                                                <span className="text-slate-600 dark:text-slate-400">
                                                    {category}
                                                </span>
                                                <span className="font-medium text-slate-900 dark:text-slate-400">
                                                    {count} ({percentage}%)
                                                </span>
                                            </div>
                                            <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-slate-700">
                                                <div
                                                    ref={(el) => {
                                                        categoryBarRefs.current[
                                                            index
                                                        ] = el;
                                                    }}
                                                    className={`${barColor} h-2 rounded-full transition-colors duration-300`}
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

                {/* ── Tables ── */}
                <div className="grid grid-cols-2 gap-6">
                    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-600/10">
                        <div className="border-b border-slate-200 px-6 py-4 dark:border-slate-800">
                            <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-300">
                                Recent Sales
                            </h3>
                        </div>
                        <div className="divide-y divide-slate-100 dark:divide-slate-800">
                            {recentSales.length === 0 ? (
                                <div className="px-6 py-8 text-center text-sm text-slate-400">
                                    No sales yet
                                </div>
                            ) : (
                                recentSales.map((sale) => (
                                    <a
                                        key={sale.id}
                                        href="/sales"
                                        className="flex items-center justify-between px-6 py-3 transition-colors hover:bg-slate-50 dark:hover:bg-slate-900/40"
                                    >
                                        <div>
                                            <p className="text-sm font-medium text-slate-900 dark:text-slate-300">
                                                {sale.invoice_number}
                                            </p>
                                            <p className="text-xs text-slate-400 dark:text-slate-300/70">
                                                {formatDate(sale.created_at)}{' '}
                                                {shortFormatTime(
                                                    sale.created_at,
                                                )}
                                            </p>
                                        </div>
                                        <p className="font-mono text-sm font-semibold text-slate-900 dark:text-slate-300">
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
                    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-600/10">
                        <div className="border-b border-slate-200 px-6 py-4 dark:border-slate-800">
                            <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-300">
                                Top Products by Stock
                            </h3>
                        </div>
                        <div className="divide-y divide-slate-100 dark:divide-slate-800">
                            {topProducts.length === 0 ? (
                                <div className="px-6 py-8 text-center text-sm text-slate-400 dark:text-slate-300">
                                    No products yet
                                </div>
                            ) : (
                                topProducts.map((product, index) => (
                                    <a
                                        key={product.id}
                                        href="/products"
                                        className="flex items-center gap-3 px-6 py-3 transition-colors hover:bg-slate-50 dark:hover:bg-slate-900/40"
                                    >
                                        <span className="w-5 text-xs font-bold text-slate-400 dark:text-slate-300">
                                            #{index + 1}
                                        </span>
                                        <div className="min-w-0 flex-1">
                                            <p className="truncate text-sm font-medium text-slate-900 dark:text-slate-300">
                                                {product.product_name}
                                            </p>
                                            <p className="text-xs text-slate-400 dark:text-slate-400/80">
                                                {product.category
                                                    ?.category_name ||
                                                    'No Category'}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-mono text-sm font-semibold text-slate-900 dark:text-slate-400">
                                                {product.stock_quantity}
                                            </p>
                                            <p className="text-xs text-slate-400 dark:text-slate-300/60">
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
    breadcrumbs: [{ title: 'Dashboard', href: dashboard() }],
};
