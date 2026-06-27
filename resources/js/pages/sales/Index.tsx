// resources/js/Pages/Sales/Index.tsx
import { Link, router } from "@inertiajs/react";
import { useState, useEffect } from "react";
import { Plus, ReceiptText } from "lucide-react";
import TableList from "@/components/table-list";
import { SaleTable } from "@/tables/sales";
import type { Sale } from "@/pages/interfaces/Interfaces";

interface SaleProps {
    sales: Sale[];
}

export default function Index({ sales }: SaleProps) {
    const [showSales, setShowSales] = useState<Sale[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setShowSales(sales);
            setLoading(false);
        }, 800);

        return () => clearTimeout(timeoutId);
    }, [sales]);

    const handleView = (sale: Sale) => {
        router.visit(`/sales/${sale.id}`);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50">
                <div className="max-w-6xl mx-auto px-6 py-8">
                    {/* Header skeleton */}
                    <div className="flex items-end justify-between mb-8">
                        <div>
                            <div className="h-3 w-20 bg-slate-200 rounded animate-pulse mb-3" />
                            <div className="h-8 w-32 bg-slate-200 rounded animate-pulse" />
                        </div>
                        <div className="h-10 w-36 bg-slate-200 rounded-xl animate-pulse" />
                    </div>

                    {/* Stats skeleton */}
                    <div className="grid grid-cols-3 gap-4 mb-6">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="bg-white border border-slate-200 rounded-xl p-4 animate-pulse">
                                <div className="h-3 w-24 bg-slate-100 rounded mb-3" />
                                <div className="h-8 w-16 bg-slate-100 rounded" />
                            </div>
                        ))}
                    </div>

                    {/* Table skeleton */}
                    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                        <div className="bg-slate-50 border-b border-slate-200 px-6 py-3.5 flex gap-8 animate-pulse">
                            {[...Array(5)].map((_, i) => (
                                <div key={i} className="h-3 w-20 bg-slate-200 rounded" />
                            ))}
                        </div>
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="px-6 py-4 border-b border-slate-100 flex gap-8 animate-pulse">
                                <div className="h-4 w-6 bg-slate-100 rounded" />
                                <div className="h-4 w-32 bg-slate-100 rounded" />
                                <div className="h-4 w-20 bg-slate-100 rounded" />
                                <div className="h-4 w-24 bg-slate-100 rounded" />
                                <div className="h-4 w-20 bg-slate-100 rounded" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    // Stats
    const totalSales = sales.length;
    const totalRevenue = sales.reduce((sum, sale) => sum + Number(sale.total), 0);
    const todaySales = sales.filter(sale => {
        const saleDate = new Date(sale.created_at);
        const today = new Date();
        return saleDate.toDateString() === today.toDateString();
    }).length;
    const monthlySales = sales.filter(sales => {
        const saleDate = new Date(sales.created_at);
        const month = new Date().getMonth();
        return saleDate.getMonth() === month;
    })

    return (
        <div className="min-h-screen bg-slate-50">
            <div className="max-w-6xl mx-auto py-8">

                {/* Page Header */}
                <div className="flex items-end justify-between mb-8">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-1">
                            Point of Sale
                        </p>
                        <h1 className="text-2xl font-bold text-slate-900">Sales History</h1>
                    </div>
                    <Link href="/sales/create">
                        <button className="flex items-center gap-2 bg-slate-900 hover:bg-blue-600 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors cursor-pointer">
                            <Plus className="w-4 h-4" />
                            New Sale
                        </button>
                    </Link>
                </div>

                {/* Summary Stats */}
                <div className="grid grid-cols-4 gap-4 mb-6">
                    <div className="bg-white border border-slate-300 rounded-xl p-4">
                        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                            Total Sales
                        </p>
                        <p className="text-2xl font-bold text-slate-900 font-mono">
                            {totalSales}
                        </p>
                    </div>
                    <div className="bg-green-200/10 border border-green-300 rounded-xl p-4">
                        <p className="text-xs font-semibold uppercase tracking-wider text-green-500 mb-2">
                            Total Revenue
                        </p>
                        <p className="text-2xl font-bold text-green-600 font-mono">
                            ₱{totalRevenue.toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </p>
                    </div>
                    <div className="bg-orange-200/10 border border-orange-300 rounded-xl p-4">
                        <p className="text-xs font-semibold uppercase tracking-wider text-orange-500 mb-2">
                            {new Date().toLocaleString('en-US', { month: 'long'})} Sales
                        </p>
                        <p className="text-2xl font-bold text-orange-600 font-mono">
                            {monthlySales.length}
                        </p>
                    </div>
                    <div className="bg-blue-200/10 border border-blue-300 rounded-xl p-4">
                        <p className="text-xs font-semibold uppercase tracking-wider text-blue-500 mb-2">
                            Today's Sales
                        </p>
                        <p className="text-2xl font-bold text-blue-600 font-mono">
                            {todaySales}
                        </p>
                    </div>
                </div>

                {/* Sales Table */}
                {sales.length > 0 ? (
                    <TableList
                        columns={SaleTable.columns}
                        actions={SaleTable.actions}
                        indexLabel="#"
                        indexStartFrom={1}
                        showIndex={true}
                        data={showSales}
                        onView={handleView}
                        emptyTableMessage={{
                            icon: <ReceiptText />,
                            title: "No sales yet",
                            description: "Start a new transaction to see it listed here.",
                            onActionClick: () => router.visit('/sales/create'),
                            buttonText: "New Sale"
                        }}
                    />
                ) : (
                    <div className="bg-white border border-slate-200 rounded-xl p-12 flex flex-col items-center justify-center text-center">
                        <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
                            <ReceiptText className="w-8 h-8 text-slate-400" />
                        </div>
                        <h3 className="text-lg font-semibold text-slate-900 mb-1">No sales yet</h3>
                        <p className="text-sm text-slate-500 mb-6 max-w-sm">
                            Your sales history will appear here once you start processing transactions.
                        </p>
                        <Link href="/sales/create">
                            <button className="flex items-center gap-2 bg-slate-900 hover:bg-blue-600 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors">
                                <Plus className="w-4 h-4" />
                                Create Your First Sale
                            </button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}