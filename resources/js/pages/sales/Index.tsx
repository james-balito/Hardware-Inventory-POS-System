import { Link, router, Head } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { Plus, ReceiptText } from 'lucide-react';
import TableList from '@/components/table-list';
import { SaleTable } from '@/tables/sales';
import type { Sale } from '@/interfaces/Interfaces';
import SalesModal from '@/components/modals/sales/index-sales-modal';
import { Clock } from 'lucide-react';
import PageHeader from '@/components/header';

interface SaleProps {
    sales: Sale[];
}

Index.layout = {
    breadcrumbs: [
        {
            title: 'Point of Sale',
            href: '/sales',
        },
        {
            title: 'Sales',
            href: '/sales',
        },
    ],
};

export default function Index({ sales }: SaleProps) {
    const [showSales, setShowSales] = useState<Sale[]>([]);
    const [selectedSale, setSelectedSale] = useState<Sale | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setShowSales(sales);
            setLoading(false);
        }, 800);

        return () => clearTimeout(timeoutId);
    }, [sales]);

    const handleView = (sale: Sale) => {
        setSelectedSale(sale);
        setShowModal(true);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 dark:bg-slate-600/10">
                <div className="mx-6 px-6 py-8">
                    <Head title="Sales | Macmac Hardware" />
                    {/* Header skeleton */}
                    <div className="mb-8 flex items-end justify-between">
                        <div className={`flex flex-row`}>
                            {/* <div className="mb-3 h-3 w-20 animate-pulse rounded bg-slate-200" /> */}
                            <div className="h-12 w-13 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
                            <div className={`ml-4 flex flex-col`}>
                                <div className="h-4 w-25 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
                                <div className="mt-1 h-7 w-15 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
                            </div>
                        </div>
                        {sales.length > 0 && (
                            <div className="h-10 w-36 animate-pulse rounded-xl bg-slate-200 dark:bg-slate-700" />
                        )}
                    </div>

                    {/* Stats skeleton */}
                    <div className="mb-6 grid grid-cols-4 gap-4">
                        {[...Array(4)].map((_, i) => (
                            <div
                                key={i}
                                className="animate-pulse rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-600/10"
                            >
                                <div className="mb-3 h-3 w-24 rounded bg-slate-100 dark:bg-slate-700" />
                                <div className="h-8 w-16 rounded bg-slate-100 dark:bg-slate-700" />
                            </div>
                        ))}
                    </div>

                    {/* Table skeleton */}
                    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-600/10">
                        <div className="flex animate-pulse gap-8 border-b border-slate-200 bg-slate-50 px-6 py-3.5 dark:border-slate-700 dark:bg-slate-800">
                            {[...Array(5)].map((_, i) => (
                                <div
                                    key={i}
                                    className="h-3 w-20 rounded bg-slate-200 dark:bg-slate-700"
                                />
                            ))}
                        </div>
                        {[...Array(10)].map((_, i) => (
                            <div
                                key={i}
                                className="flex animate-pulse gap-8 border-b border-slate-100 px-6 py-4 dark:border-slate-700"
                            >
                                <div className="h-4 w-6 rounded bg-slate-100 dark:bg-slate-700" />
                                <div className="h-4 w-32 rounded bg-slate-100 dark:bg-slate-700" />
                                {[...Array(8)].map((_, i) => (
                                    <div
                                        key={i}
                                        className="h-4 w-20 rounded bg-slate-100 dark:bg-slate-700"
                                    />
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    // Stats
    const totalSales = sales.length;
    const totalRevenue = sales.reduce(
        (sum, sale) => sum + Number(sale.total),
        0,
    );
    const todaySales = sales.filter((sale) => {
        const saleDate = new Date(sale.created_at);
        const today = new Date();
        return saleDate.toDateString() === today.toDateString();
    }).length;
    const monthlySales = sales.filter((sales) => {
        const saleDate = new Date(sales.created_at);
        const month = new Date().getMonth();
        return saleDate.getMonth() === month;
    });

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900/30">
            <Head title="Sales | Macmac Hardware" />
            <div className="mx-10 py-8">
                {/* Page Header */}
                <div className="mb-8 flex items-end justify-between">
                    <PageHeader
                        headerTitle="Point of Sale"
                        icon={<Clock />}
                        title="Sales"
                    />
                    {sales.length >= 1 && (
                        <Link href="/sales/create">
                            <button className="flex cursor-pointer items-center gap-2 rounded-xl border bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-600 dark:border-slate-600 dark:bg-slate-900/70 dark:text-slate-50 dark:hover:bg-slate-900">
                                <Plus className="h-4 w-4" />
                                New Sale
                            </button>
                        </Link>
                    )}
                </div>

                {/* Summary Stats */}
                <div className="mb-6 grid grid-cols-4 gap-4">
                    <div className="rounded-xl border border-slate-400 bg-slate-200/10 p-4 dark:border-slate-600 dark:bg-slate-600/10">
                        <p className="mb-2 text-xs font-semibold tracking-wider text-slate-500 uppercase dark:text-slate-300">
                            Total Revenue
                        </p>
                        <p className="font-mono text-2xl font-bold text-slate-600 dark:text-slate-300">
                            ₱
                            {totalRevenue.toLocaleString('en-PH', {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                            })}
                        </p>
                    </div>
                    <div className="rounded-xl border border-green-300 bg-green-200/10 p-4 dark:border-green-600 dark:bg-green-600/10">
                        <p className="mb-2 text-xs font-semibold tracking-wider text-green-500 uppercase">
                            Total Sales
                        </p>
                        <p className="font-mono text-2xl font-bold text-green-600">
                            {totalSales}
                        </p>
                    </div>
                    <div className="rounded-xl border border-orange-300 bg-orange-200/10 p-4 dark:border-orange-600 dark:bg-orange-600/10">
                        <p className="mb-2 text-xs font-semibold tracking-wider text-orange-500 uppercase dark:text-orange-400">
                            Month of{' '}
                            {new Date().toLocaleString('en-US', {
                                month: 'long',
                            })}{' '}
                            Sales
                        </p>
                        <p className="font-mono text-2xl font-bold text-orange-600 dark:text-orange-500">
                            {monthlySales.length}
                        </p>
                    </div>
                    <div className="rounded-xl border border-blue-300 bg-blue-200/10 p-4 dark:border-blue-600 dark:bg-blue-600/10">
                        <p className="mb-2 text-xs font-semibold tracking-wider text-blue-500 uppercase">
                            Today's Sales
                        </p>
                        <p className="font-mono text-2xl font-bold text-blue-600">
                            {todaySales}
                        </p>
                    </div>
                </div>

                {/* Sales Table */}
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
                        title: 'No sales yet',
                        description:
                            'Start a new transaction to see it listed here.',
                        onActionClick: () => router.visit('/sales/create'),
                        buttonText: 'New Sale',
                    }}
                />

                <SalesModal
                    onClose={() => {
                        setSelectedSale(null);
                        setShowModal(false);
                    }}
                    isOpen={showModal}
                    sale={selectedSale}
                />
            </div>
        </div>
    );
}
