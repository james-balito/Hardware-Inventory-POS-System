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
            <div className="min-h-screen bg-slate-50 dark:bg-slate-900/70">
                <div className="mx-8 px-6 py-8">
                    <Head title="Sales | Macmac Hardware" />
                    {/* Header skeleton */}
                    <div className="mb-8 flex items-end justify-between">
                        <div className={`flex flex-row`}>
                            {/* <div className="mb-3 h-3 w-20 animate-pulse rounded bg-slate-200" /> */}
                            <div className="h-12 w-13 animate-pulse rounded bg-slate-200" />
                            <div className={`ml-4 flex flex-col`}>
                                <div className="h-4 w-25 animate-pulse rounded bg-slate-200" />
                                <div className="mt-1 h-7 w-15 animate-pulse rounded bg-slate-200" />
                            </div>
                        </div>
                        <div className="h-10 w-36 animate-pulse rounded-xl bg-slate-200" />
                    </div>

                    {/* Stats skeleton */}
                    <div className="mb-6 grid grid-cols-4 gap-4">
                        {[...Array(4)].map((_, i) => (
                            <div
                                key={i}
                                className="animate-pulse rounded-xl border border-slate-200 bg-white p-4"
                            >
                                <div className="mb-3 h-3 w-24 rounded bg-slate-100" />
                                <div className="h-8 w-16 rounded bg-slate-100" />
                            </div>
                        ))}
                    </div>

                    {/* Table skeleton */}
                    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
                        <div className="flex animate-pulse gap-8 border-b border-slate-200 bg-slate-50 px-6 py-3.5">
                            {[...Array(5)].map((_, i) => (
                                <div
                                    key={i}
                                    className="h-3 w-20 rounded bg-slate-200"
                                />
                            ))}
                        </div>
                        {[...Array(5)].map((_, i) => (
                            <div
                                key={i}
                                className="flex animate-pulse gap-8 border-b border-slate-100 px-6 py-4"
                            >
                                <div className="h-4 w-6 rounded bg-slate-100" />
                                <div className="h-4 w-32 rounded bg-slate-100" />
                                <div className="h-4 w-20 rounded bg-slate-100" />
                                <div className="h-4 w-24 rounded bg-slate-100" />
                                <div className="h-4 w-20 rounded bg-slate-100" />
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
            <div className="mx-auto max-w-6xl py-8">
                {/* Page Header */}
                <div className="mb-8 flex items-end justify-between">
                    <PageHeader
                        headerTitle="Point of Sale"
                        icon={<Clock />}
                        title="Sales"
                    />
                    <Link href="/sales/create">
                        <button className="flex cursor-pointer items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white border dark:border-slate-600 dark:bg-slate-900/70 dark:hover:bg-slate-900 dark:text-slate-50 transition-colors hover:bg-blue-600">
                            <Plus className="h-4 w-4" />
                            New Sale
                        </button>
                    </Link>
                </div>

                {/* Summary Stats */}
                <div className="mb-6 grid grid-cols-4 gap-4">
                    <div className="rounded-xl border border-slate-400 bg-white dark:bg-slate-900/30 p-4">
                        <p className="mb-2 text-xs font-semibold tracking-wider text-slate-500 dark:text-slate-300 uppercase">
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
                    <div className="rounded-xl border border-green-300 bg-green-600/10 p-4">
                        <p className="mb-2 text-xs font-semibold tracking-wider text-green-500 uppercase">
                            Total Sales
                        </p>
                        <p className="font-mono text-2xl font-bold text-green-600">
                            {totalSales}
                        </p>
                    </div>
                    <div className="rounded-xl border border-orange-300 bg-orange-200/10 p-4">
                        <p className="mb-2 text-xs font-semibold tracking-wider text-orange-500 uppercase">
                            Month of{' '}
                            {new Date().toLocaleString('en-US', {
                                month: 'long',
                            })}{' '}
                            Sales
                        </p>
                        <p className="font-mono text-2xl font-bold text-orange-600">
                            {monthlySales.length}
                        </p>
                    </div>
                    <div className="rounded-xl border border-blue-300 bg-blue-200/10 p-4">
                        <p className="mb-2 text-xs font-semibold tracking-wider text-blue-500 uppercase">
                            Today's Sales
                        </p>
                        <p className="font-mono text-2xl font-bold text-blue-600">
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
                            title: 'No sales yet',
                            description:
                                'Start a new transaction to see it listed here.',
                            onActionClick: () => router.visit('/sales/create'),
                            buttonText: 'New Sale',
                        }}
                    />
                ) : (
                    <div className="flex flex-col items-center justify-center rounded-xl border border-slate-200 bg-white p-12 text-center">
                        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
                            <ReceiptText className="h-8 w-8 text-slate-400" />
                        </div>
                        <h3 className="mb-1 text-lg font-semibold text-slate-900">
                            No sales yet
                        </h3>
                        <p className="mb-6 max-w-sm text-sm text-slate-500">
                            Your sales history will appear here once you start
                            processing transactions.
                        </p>
                        <Link href="/sales/create">
                            <button className="flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-600">
                                <Plus className="h-4 w-4" />
                                Create Your First Sale
                            </button>
                        </Link>
                    </div>
                )}

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
