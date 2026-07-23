import { Head } from '@inertiajs/react';
import { useState, useEffect } from 'react';
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
import { formatDate } from '@/components/format-time-and-date';

interface DataProps {
    products: Product[];
    sales: Sale[];
}

// ── Loading Skeleton Component ──
function DashboardSkeleton() {
    return (
        <div className="space-y-6 p-6">
            {/* Stats Cards Skeleton */}
            <div className="grid grid-cols-4 gap-4">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="bg-white border border-slate-200 rounded-xl p-5 animate-pulse">
                        <div className="flex items-center justify-between mb-3">
                            <div className="w-10 h-10 rounded-lg bg-slate-200" />
                            <div className="h-6 w-16 bg-slate-200 rounded-full" />
                        </div>
                        <div className="h-3 w-24 bg-slate-200 rounded mb-2" />
                        <div className="h-8 w-32 bg-slate-200 rounded mb-2" />
                        <div className="h-3 w-20 bg-slate-200 rounded" />
                    </div>
                ))}
            </div>

            {/* Charts Section Skeleton */}
            <div className="grid grid-cols-3 gap-6">
                {/* Bar Chart Skeleton */}
                <div className="col-span-2 bg-white border border-slate-200 rounded-xl p-6 animate-pulse">
                    <div className="flex items-center gap-2 mb-6">
                        <div className="w-5 h-5 bg-slate-200 rounded" />
                        <div className="h-4 w-32 bg-slate-200 rounded" />
                    </div>
                    
                    <div className="flex items-end gap-3 h-48">
                        {[...Array(7)].map((_, i) => (
                            <div key={i} className="flex-1 flex flex-col items-center gap-2">
                                <div className="h-4 w-12 bg-slate-200 rounded" />
                                <div 
                                    className="w-full bg-slate-200 rounded-t-md"
                                    style={{ height: `${Math.random() * 120 + 20}px` }}
                                />
                                <div className="h-3 w-8 bg-slate-200 rounded" />
                            </div>
                        ))}
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-slate-100">
                        <div className="flex items-center justify-between">
                            <div className="h-4 w-24 bg-slate-200 rounded" />
                            <div className="h-4 w-28 bg-slate-200 rounded" />
                        </div>
                    </div>
                </div>

                {/* Category Chart Skeleton */}
                <div className="bg-white border border-slate-200 rounded-xl p-6 animate-pulse">
                    <div className="flex items-center gap-2 mb-6">
                        <div className="w-5 h-5 bg-slate-200 rounded" />
                        <div className="h-4 w-36 bg-slate-200 rounded" />
                    </div>
                    
                    <div className="space-y-3">
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="space-y-1">
                                <div className="flex justify-between">
                                    <div className="h-4 w-20 bg-slate-200 rounded" />
                                    <div className="h-4 w-12 bg-slate-200 rounded" />
                                </div>
                                <div className="w-full bg-slate-100 rounded-full h-2">
                                    <div 
                                        className="bg-slate-200 h-2 rounded-full"
                                        style={{ width: `${Math.random() * 60 + 20}%` }}
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
                    <div key={tableIndex} className="bg-white border border-slate-200 rounded-xl overflow-hidden animate-pulse">
                        <div className="px-6 py-4 border-b border-slate-200">
                            <div className="h-4 w-28 bg-slate-200 rounded" />
                        </div>
                        <div className="divide-y divide-slate-100">
                            {[...Array(4)].map((_, rowIndex) => (
                                <div key={rowIndex} className="px-6 py-3 flex items-center justify-between">
                                    <div className="space-y-1">
                                        <div className="h-4 w-32 bg-slate-200 rounded" />
                                        <div className="h-3 w-20 bg-slate-100 rounded" />
                                    </div>
                                    <div className="h-4 w-20 bg-slate-200 rounded" />
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

    useEffect(() => {
        const timeout = setTimeout(() => setLoading(false), 800);
        return () => clearTimeout(timeout);
    }, []);

    if (loading) {
        return <DashboardSkeleton />;
    }

    // ── Computed Stats ──
    const totalProducts = products.length;
    const totalSales = sales.length;
    
    const totalRevenue = sales.reduce((sum, sale) => sum + Number(sale.total), 0);
    
    const totalStockValue = products.reduce((sum, product) => {
        return sum + (Number(product.wholesale_price) * Number(product.stock_quantity));
    }, 0);
    
    const totalOrders = sales.reduce((sum, sale) => {
        return sum + (sale.products?.reduce((s: number, p: any) => s + (p.pivot?.quantity || 0), 0) || 0);
    }, 0);
    
    const lowStockProducts = products.filter(p => Number(p.stock_quantity) > 0 && Number(p.stock_quantity) <= 5);
    const outOfStockProducts = products.filter(p => Number(p.stock_quantity) === 0);
    const inStockProducts = products.filter(p => Number(p.stock_quantity) > 5);
    
    const today = new Date().toDateString();
    const todaySales = sales.filter(sale => new Date(sale.created_at).toDateString() === today);
    const todayRevenue = todaySales.reduce((sum, sale) => sum + Number(sale.total), 0);
    
    // Recent sales (last 5)
    const recentSales = [...sales]
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        .slice(0, 5);

    // Top products by stock quantity
    const topProducts = [...products]
        .sort((a, b) => Number(b.stock_quantity) - Number(a.stock_quantity))
        .slice(0, 5);

    // Chart data - Sales by day (last 7 days)
    const last7Days = [...Array(7)].map((_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - i);
        return date.toDateString();
    }).reverse();

    const salesByDay = last7Days.map(day => {
        const daySales = sales.filter(sale => new Date(sale.created_at).toDateString() === day);
        return {
            day: new Date(day).toLocaleDateString('en-US', { weekday: 'short' }),
            count: daySales.length,
            revenue: daySales.reduce((sum, sale) => sum + Number(sale.total), 0),
        };
    });

    // Chart data - Products by category
    const categoryData = products.reduce((acc: Record<string, number>, product) => {
        const catName = product.category?.category_name || 'Uncategorized';
        acc[catName] = (acc[catName] || 0) + 1;
        return acc;
    }, {});

    const maxRevenue = Math.max(...salesByDay.map(d => d.revenue), 1);

    return (
        <>
            <Head title="Dashboard" />
            
            <div className="space-y-6 p-6">
                
                {/* ── Stats Cards ── */}
                <div className="grid grid-cols-4 gap-4">
                    {/* Total Revenue */}
                    <div className="bg-white border border-slate-200 rounded-xl p-5">
                        <div className="flex items-center justify-between mb-3">
                            <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                                <DollarSign className="w-5 h-5 text-green-600" />
                            </div>
                            <span className="flex items-center gap-1 text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                                <ArrowUpRight className="w-3 h-3" />
                                Revenue
                            </span>
                        </div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                            Total Revenue
                        </p>
                        <p className="text-2xl font-bold text-slate-900 font-mono">
                            ₱{totalRevenue.toLocaleString('en-PH', { minimumFractionDigits: 2 })}
                        </p>
                        <p className="text-xs text-slate-400 mt-1">
                            Today: ₱{todayRevenue.toLocaleString('en-PH', { minimumFractionDigits: 2 })}
                        </p>
                    </div>

                    {/* Total Sales */}
                    <div className="bg-white border border-slate-200 rounded-xl p-5">
                        <div className="flex items-center justify-between mb-3">
                            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                                <ReceiptText className="w-5 h-5 text-blue-600" />
                            </div>
                            <span className="flex items-center gap-1 text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                                <ShoppingCart className="w-3 h-3" />
                                Sales
                            </span>
                        </div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                            Total Sales
                        </p>
                        <p className="text-2xl font-bold text-slate-900 font-mono">
                            {totalSales}
                        </p>
                        <p className="text-xs text-slate-400 mt-1">
                            Total Orders: {totalOrders} items
                        </p>
                    </div>

                    {/* Total Products */}
                    <div className="bg-white border border-slate-200 rounded-xl p-5">
                        <div className="flex items-center justify-between mb-3">
                            <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                                <Package className="w-5 h-5 text-purple-600" />
                            </div>
                            <span className="flex items-center gap-1 text-xs font-medium text-purple-600 bg-purple-50 px-2 py-1 rounded-full">
                                <TrendingUp className="w-3 h-3" />
                                Inventory
                            </span>
                        </div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                            Total Products
                        </p>
                        <p className="text-2xl font-bold text-slate-900 font-mono">
                            {totalProducts}
                        </p>
                        <p className="text-xs text-slate-400 mt-1">
                            Stock Value: ₱{totalStockValue.toLocaleString('en-PH', { minimumFractionDigits: 2 })}
                        </p>
                    </div>

                    {/* Stock Alerts */}
                    <div className="bg-white border border-slate-200 rounded-xl p-5">
                        <div className="flex items-center justify-between mb-3">
                            <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
                                <AlertTriangle className="w-5 h-5 text-amber-600" />
                            </div>
                        </div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                            Stock Alerts
                        </p>
                        <div className="flex items-baseline gap-2">
                            <p className="text-2xl font-bold text-red-600 font-mono">
                                {outOfStockProducts.length}
                            </p>
                            <span className="text-xs text-red-500">Out</span>
                            <p className="text-2xl font-bold text-amber-600 font-mono ml-2">
                                {lowStockProducts.length}
                            </p>
                            <span className="text-xs text-amber-500">Low</span>
                        </div>
                        <p className="text-xs text-slate-400 mt-1">
                            {inStockProducts.length} in stock
                        </p>
                    </div>
                </div>

                {/* ── Charts Section ── */}
                <div className="grid grid-cols-3 gap-6">
                    
                    {/* Sales Bar Chart */}
                    <div className="col-span-2 bg-white border border-slate-200 rounded-xl p-6">
                        <div className="flex items-center gap-2 mb-6">
                            <BarChart3 className="w-5 h-5 text-slate-500" />
                            <h3 className="text-sm font-semibold text-slate-900">Sales This Week</h3>
                        </div>
                        
                        <div className="flex items-end gap-3 h-48">
                            {salesByDay.map((day) => (
                                <div key={day.day} className="flex-1 flex flex-col items-center gap-2">
                                    <div className="w-full flex flex-col items-center gap-1">
                                        <span className="text-xs font-medium text-slate-600">
                                            ₱{day.revenue.toLocaleString('en-PH', { maximumFractionDigits: 0 })}
                                        </span>
                                        <div 
                                            className="w-full bg-blue-500 rounded-t-md transition-all hover:bg-blue-600"
                                            style={{ 
                                                height: `${(day.revenue / maxRevenue) * 140}px`,
                                                minHeight: day.revenue > 0 ? '8px' : '2px'
                                            }}
                                        />
                                    </div>
                                    <span className="text-xs text-slate-400">{day.day}</span>
                                </div>
                            ))}
                        </div>
                        
                        <div className="mt-4 pt-4 border-t border-slate-100">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-slate-500">Total this week</span>
                                <span className="font-semibold text-slate-900">
                                    ₱{salesByDay.reduce((sum, d) => sum + d.revenue, 0).toLocaleString('en-PH', { minimumFractionDigits: 2 })}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Products by Category */}
                    <div className="bg-white border border-slate-200 rounded-xl p-6">
                        <div className="flex items-center gap-2 mb-6">
                            <PieChart className="w-5 h-5 text-slate-500" />
                            <h3 className="text-sm font-semibold text-slate-900">Products by Category</h3>
                        </div>
                        
                        <div className="space-y-3">
                            {Object.entries(categoryData).map(([category, count]) => {
                                const percentage = ((count / totalProducts) * 100).toFixed(0);
                                const colors: Record<string, string> = {
                                    'Hardware': 'bg-blue-500',
                                    'Construction': 'bg-green-500',
                                    'Electrical': 'bg-amber-500',
                                    'Plumbing': 'bg-purple-500',
                                    'Paint': 'bg-red-500',
                                    'Tools': 'bg-indigo-500',
                                    'Uncategorized': 'bg-slate-400',
                                };
                                const barColor = colors[category] || 'bg-slate-500';
                                
                                return (
                                    <div key={category} className="space-y-1">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-slate-600">{category}</span>
                                            <span className="text-slate-900 font-medium">{count} ({percentage}%)</span>
                                        </div>
                                        <div className="w-full bg-slate-100 rounded-full h-2">
                                            <div 
                                                className={`${barColor} h-2 rounded-full transition-all`}
                                                style={{ width: `${percentage}%` }}
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* ── Bottom Section: Tables ── */}
                <div className="grid grid-cols-2 gap-6">
                    
                    {/* Recent Sales */}
                    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                        <div className="px-6 py-4 border-b border-slate-200">
                            <h3 className="text-sm font-semibold text-slate-900">Recent Sales</h3>
                        </div>
                        <div className="divide-y divide-slate-100">
                            {recentSales.length === 0 ? (
                                <div className="px-6 py-8 text-center text-sm text-slate-400">
                                    No sales yet
                                </div>
                            ) : (
                                recentSales.map(sale => (
                                    <div key={sale.id} className="px-6 py-3 flex items-center justify-between hover:bg-slate-50 transition-colors">
                                        <div>
                                            <p className="text-sm font-medium text-slate-900">{sale.invoice_number}</p>
                                            <p className="text-xs text-slate-400">{formatDate(sale.created_at)}</p>
                                        </div>
                                        <p className="text-sm font-semibold text-slate-900 font-mono">
                                            ₱{Number(sale.total).toLocaleString('en-PH', { minimumFractionDigits: 2 })}
                                        </p>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    {/* Top Products */}
                    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                        <div className="px-6 py-4 border-b border-slate-200">
                            <h3 className="text-sm font-semibold text-slate-900">Top Products by Stock</h3>
                        </div>
                        <div className="divide-y divide-slate-100">
                            {topProducts.length === 0 ? (
                                <div className="px-6 py-8 text-center text-sm text-slate-400">
                                    No products yet
                                </div>
                            ) : (
                                topProducts.map((product, index) => (
                                    <div key={product.id} className="px-6 py-3 flex items-center gap-3 hover:bg-slate-50 transition-colors">
                                        <span className="text-xs font-bold text-slate-400 w-5">#{index + 1}</span>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-slate-900 truncate">{product.product_name}</p>
                                            <p className="text-xs text-slate-400">{product.category?.category_name || 'No Category'}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm font-semibold text-slate-900 font-mono">
                                                {product.stock_quantity}
                                            </p>
                                            <p className="text-xs text-slate-400">
                                               units
                                            </p>
                                        </div>
                                    </div>
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