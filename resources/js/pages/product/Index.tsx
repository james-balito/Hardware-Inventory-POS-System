import { Link, router } from '@inertiajs/react';
import { useState, useEffect, useMemo } from 'react';
import { create } from '@/routes/products';
import TableList from '@/components/table-list';
import { ProductTable } from '@/tables/product';
import { Product } from '@/interfaces/Interfaces';
import { ProductProps } from '@/interfaces/Props';
import { Package, Plus, Search, Filter, X } from 'lucide-react';
import { Head } from '@inertiajs/react';
import PageHeader from '@/components/header';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

Index.layout = {
    breadcrumbs: [
        {
            title: 'Inventory',
            href: '/products',
        },
        {
            title: 'Products',
            href: '/products',
        },
    ],
};

// Debounce hook
function useDebounce<Time>(value: Time, delay: number): Time {
    const [debouncedValue, setDebouncedValue] = useState<Time>(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
}

export default function Index({ products, categories, units }: ProductProps) {
    // States
    const [loading, setLoading] = useState(true);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(
        null,
    );
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeCategory, setActiveCategory] = useState<number | null>(null);
    const [stockFilter, setStockFilter] = useState<
        'all' | 'in_stock' | 'low_stock' | 'out_of_stock'
    >('all');
    const [searchInput, setSearchInput] = useState('');
    const [hiddenColumns, setHiddenColumns] = useState<string[]>([]);
    const debouncedSearch = useDebounce(searchInput, 300);

    useEffect(() => {
        const id = setTimeout(() => setLoading(false), 800);
        return () => clearTimeout(id);
    }, [products]);

    // Combined filter logic
    const filteredProducts = useMemo(() => {
        let result = products;

        // Search filter
        if (debouncedSearch.trim()) {
            const query = debouncedSearch.toLowerCase();
            result = result.filter(
                (product) =>
                    product.product_name?.toLowerCase().includes(query) ||
                    product.category?.category_name
                        ?.toLowerCase()
                        .includes(query),
            );
        }

        // Category filter
        if (activeCategory) {
            result = result.filter(
                (product) => product.category_id === activeCategory,
            );
        }

        // Stock filter
        if (stockFilter === 'in_stock') {
            result = result.filter((p) => Number(p.stock_quantity) > 4);
        } else if (stockFilter === 'low_stock') {
            result = result.filter(
                (p) =>
                    Number(p.stock_quantity) <= 4 &&
                    Number(p.stock_quantity) > 0,
            );
        } else if (stockFilter === 'out_of_stock') {
            result = result.filter((p) => Number(p.stock_quantity) === 0);
        }

        return result;
    }, [products, activeCategory, stockFilter, debouncedSearch]);

    // Product Actions Function
    const handleShowModal = (product: Product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const handleEdit = (id: number) => router.visit(`/products/${id}/edit`);

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this product?')) {
            router.delete(`/products/${id}`);
        }
    };

    // Stock filter handler
    const handleStockFilter = (
        filter: 'in_stock' | 'low_stock' | 'out_of_stock',
    ) => {
        setStockFilter(stockFilter === filter ? 'all' : filter);
    };

    const stockFilters = [
        { id: 1, value: 'in_stock', label: 'In Stock' },
        { id: 2, value: 'low_stock', label: 'Low Stock' },
        { id: 3, value: 'out_of_stock', label: 'Out of Stock' },
    ];

    // Determine active filters
    const hasActiveFilters = activeCategory !== null || stockFilter !== 'all';
    const hasSearchQuery = debouncedSearch.trim() !== '';

    // Dynamic empty message based on state
    const getEmptyMessage = () => {
        if (hasSearchQuery) {
            return {
                icon: <Search />,
                title: 'No results found',
                description: `No products matching "${debouncedSearch}". Try different keywords or check for typos.`,
            };
        }

        if (hasActiveFilters) {
            const categoryName = activeCategory
                ? categories.find((c) => c.id === activeCategory)?.category_name
                : null;

            const stockLabel =
                stockFilter !== 'all'
                    ? stockFilter === 'in_stock'
                        ? 'In Stock'
                        : stockFilter === 'low_stock'
                          ? 'Low Stock'
                          : 'Out of Stock'
                    : null;

            let description = 'No products found';

            if (categoryName && stockLabel) {
                description = `No products found in the "${categoryName}" category with "${stockLabel}" status. Try adjusting your filters.`;
            } else if (categoryName) {
                description = `No products found in the "${categoryName}" category. Try selecting a different category or clearing your filters.`;
            } else if (stockLabel) {
                description = `No products found with "${stockLabel}" status. Try selecting a different filter or clearing your filters.`;
            }

            return {
                icon: <Filter />,
                title: 'No matching products',
                description,
            };
        }

        return {
            icon: <Package />,
            title: 'No products yet',
            description: 'Add your first product to see it listed here.',
            onActionClick: () => router.visit(create()),
            buttonText: 'Product',
        };
    };

    // Stats
    const inStock = products.filter(
        (p) => Number(p.stock_quantity) >= 5,
    ).length;
    const lowStock = products.filter(
        (p) => Number(p.stock_quantity) < 5 && Number(p.stock_quantity) > 0,
    ).length;
    const outOfStock = products.filter(
        (p) => Number(p.stock_quantity) === 0,
    ).length;

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50">
                <Head title="Products | Macmac Hardware" />
                <div className="mx-10 py-8">
                    {/* Header skeleton */}
                    <div className="mb-8 flex items-end justify-between">
                        <div className={`flex flex-row`}>
                            <div className="h-12 w-13 animate-pulse rounded bg-slate-200" />
                            <div className={`ml-4 flex flex-col`}>
                                <div className="h-4 w-20 animate-pulse rounded bg-slate-200" />
                                <div className="mt-1 h-7 w-25 animate-pulse rounded bg-slate-200" />
                            </div>
                        </div>
                        <div className="h-10 w-36 animate-pulse rounded-xl bg-slate-200" />
                    </div>

                    <div className="mb-4 h-10 w-full animate-pulse rounded-xl bg-slate-200" />

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

                    <div className="flex animate-pulse gap-5 bg-slate-50">
                        {[...Array(10)].map((_, i) => (
                            <div
                                key={i}
                                className="my-2 h-7 w-28 rounded bg-slate-200"
                            />
                        ))}
                    </div>

                    {/* Table skeleton */}
                    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
                        <div className="flex animate-pulse gap-3 border-b border-slate-200 bg-slate-50 px-6 py-3.5">
                            <div className="mr-10 h-5 w-6 rounded bg-slate-200" />
                            {[...Array(7)].map((_, i) => (
                                <div
                                    key={i}
                                    className="mr-10 h-5 w-20 rounded bg-slate-200"
                                />
                            ))}
                        </div>

                        {[...Array(10)].map((_, i) => (
                            <div
                                key={i}
                                className="mr-10 flex animate-pulse flex-row items-start justify-items-start gap-8 border-b border-slate-100 px-6 py-4"
                            >
                                <div className="my-2 h-4 w-6 justify-self-start rounded bg-slate-100" />
                                <div className="my-2 h-4 w-32 justify-self-start rounded bg-slate-100" />
                                <div className="my-2 h-4 w-20 justify-self-start rounded bg-slate-100" />
                                <div className="my-2 h-4 w-24 justify-self-start rounded bg-slate-100" />
                                <div className="my-2 h-4 w-20 justify-self-start rounded bg-slate-100" />
                                <div className="my-2 h-4 w-20 justify-self-start rounded bg-slate-100" />
                                <div className="my-2 h-4 w-24 justify-self-start rounded bg-slate-100" />
                                <div className="my-2 h-4 w-20 justify-self-start rounded bg-slate-100" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    const visibleColumns = useMemo(() => {
        // Filter out hidden columns
        return ProductTable.columns.filter(
            (col) => !hiddenColumns.includes(col.key),
        );
    }, [hiddenColumns]);

    return (
        <div className="min-h-screen bg-slate-50">
            <div className="mx-10 py-8">
                {/* Page Header */}
                <div className="mb-8 flex items-end justify-between">
                    <Head title="Products | Macmac Hardware" />
                    <PageHeader
                        headerTitle="Inventory"
                        icon={<Package />}
                        title="Products"
                    />
                    <Link href={create()}>
                        <button className="flex cursor-pointer items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-600">
                            <Plus className="h-4 w-4" />
                            Add Product
                        </button>
                    </Link>
                </div>

                {/* Summary Stats */}
                <div className="mb-6 grid grid-cols-4 gap-4">
                    <button
                        onClick={() => setStockFilter('all')}
                        className={`flex cursor-pointer flex-col items-start rounded-xl border border-blue-400 bg-white p-4 transition-all hover:shadow-md`}
                    >
                        <p className="mb-2 text-xs font-semibold tracking-wider text-blue-400 uppercase">
                            Total Products
                        </p>
                        <p className="font-mono text-2xl font-bold text-blue-700">
                            {products.length}
                        </p>
                    </button>

                    <button
                        onClick={() => handleStockFilter('in_stock')}
                        className={`flex cursor-pointer flex-col items-start rounded-xl border border-green-400 bg-white p-4 transition-all hover:shadow-md`}
                    >
                        <p className="mb-2 text-xs font-semibold tracking-wider text-green-500 uppercase">
                            In Stock
                        </p>
                        <p className="font-mono text-2xl font-bold text-green-600">
                            {inStock}
                        </p>
                        <span className="text-xs text-gray-500">
                            {products.length > 0
                                ? ((inStock / products.length) * 100).toFixed(1)
                                : 0}
                            % of total
                        </span>
                    </button>

                    <button
                        onClick={() => handleStockFilter('low_stock')}
                        className={`flex cursor-pointer flex-col items-start rounded-xl border border-orange-400 bg-white p-4 transition-all hover:shadow-md`}
                    >
                        <p className="mb-2 text-xs font-semibold tracking-wider text-orange-400 uppercase">
                            Low in Stock
                        </p>
                        <p className="font-mono text-2xl font-bold text-orange-500">
                            {lowStock}
                        </p>
                        <span className="text-xs text-gray-500">
                            {products.length > 0
                                ? ((lowStock / products.length) * 100).toFixed(
                                      1,
                                  )
                                : 0}
                            % of total
                        </span>
                    </button>

                    <button
                        onClick={() => handleStockFilter('out_of_stock')}
                        className={`flex cursor-pointer flex-col items-start rounded-xl border border-red-400 bg-white p-4 transition-all hover:shadow-md`}
                    >
                        <p className="mb-2 text-xs font-semibold tracking-wider text-red-400 uppercase">
                            Out of Stock
                        </p>
                        <p className="font-mono text-2xl font-bold text-red-500">
                            {outOfStock}
                        </p>
                        <span className="text-xs text-gray-500">
                            {products.length > 0
                                ? (
                                      (outOfStock / products.length) *
                                      100
                                  ).toFixed(1)
                                : 0}
                            % of total
                        </span>
                    </button>
                </div>

                {/* Search Bar + Filters */}
                <div className="mb-4 flex flex-row items-center gap-4">
                    <div className="relative w-full">
                        <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search products by name or category..."
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                            className="w-full rounded-lg border border-slate-200 bg-white py-2 pr-4 pl-10 text-sm text-slate-700 placeholder:text-slate-400 focus:border-slate-400 focus:ring-1 focus:ring-slate-400 focus:outline-none"
                        />
                        {searchInput && (
                            <button
                                onClick={() => setSearchInput('')}
                                className="absolute top-1/2 right-3 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        )}
                    </div>

                    {/* Category Filter */}
                    <Select
                        value={activeCategory?.toString() || 'all'}
                        onValueChange={(value) => {
                            setActiveCategory(
                                value === 'all' ? null : Number(value),
                            );
                        }}
                    >
                        <SelectTrigger className="my-2 w-1/2 border border-gray-200 bg-white font-normal text-gray-600">
                            <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Categories</SelectItem>
                            {categories.map((category) => (
                                <SelectItem
                                    key={category.id}
                                    value={category.id.toString()}
                                >
                                    {category.category_name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    {/* Stock Filter */}
                    <Select
                        value={stockFilter}
                        onValueChange={(value) => {
                            if (value === 'all') {
                                setStockFilter('all');
                            } else {
                                handleStockFilter(
                                    value as
                                        | 'in_stock'
                                        | 'low_stock'
                                        | 'out_of_stock',
                                );
                            }
                        }}
                    >
                        <SelectTrigger className="my-2 w-1/2 border border-gray-200 bg-white font-normal text-gray-600">
                            <SelectValue placeholder="Select a stock" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Status</SelectItem>
                            {stockFilters.map((stock) => (
                                <SelectItem key={stock.id} value={stock.value}>
                                    {stock.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    {/* Column Visibility Toggle */}
                    <Select
                        value="Select columns"
                        onValueChange={(value) => {
                            setHiddenColumns((prev) =>
                                prev.includes(value)
                                    ? prev.filter((c) => c !== value)
                                    : [...prev, value],
                            );
                        }}
                    >
                        <SelectTrigger className="my-2 w-1/3 border border-gray-200 bg-white font-normal text-gray-600">
                            <SelectValue>
                                Filter Columns
                            </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                            {ProductTable.columns.map((col) => (
                                <SelectItem key={col.key} value={col.key}>
                                    <div className="flex w-full items-center justify-between gap-2">
                                        <span
                                            className={
                                                hiddenColumns.includes(col.key)
                                                    ? 'opacity-30'
                                                    : ''
                                            }
                                        >
                                            {hiddenColumns.includes(col.key)
                                                ? ''
                                                : '✓'}
                                        </span>
                                        <span>{col.label}</span>
                                    </div>
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* Active Filters Indicator */}
                {hasActiveFilters && (
                    <div className="mb-4 flex items-center gap-2">
                        <Filter className="h-3.5 w-3.5 text-slate-400" />
                        <span className="text-xs text-slate-500">
                            Active filters:
                        </span>

                        {activeCategory && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700">
                                {
                                    categories.find(
                                        (c) => c.id === activeCategory,
                                    )?.category_name
                                }
                                <button
                                    onClick={() => setActiveCategory(null)}
                                    className="ml-0.5 rounded-full p-0.5 hover:bg-blue-200"
                                >
                                    <X className="h-3 w-3" />
                                </button>
                            </span>
                        )}

                        {stockFilter !== 'all' && (
                            <span
                                className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                    stockFilter === 'in_stock'
                                        ? 'bg-green-50 text-green-700'
                                        : stockFilter === 'low_stock'
                                          ? 'bg-amber-50 text-amber-700'
                                          : 'bg-red-50 text-red-700'
                                }`}
                            >
                                {stockFilter === 'in_stock' && 'In Stock'}
                                {stockFilter === 'low_stock' && 'Low Stock'}
                                {stockFilter === 'out_of_stock' &&
                                    'Out of Stock'}
                                <button
                                    onClick={() => setStockFilter('all')}
                                    className="ml-0.5 rounded-full p-0.5 hover:bg-black/10"
                                >
                                    <X className="h-3 w-3" />
                                </button>
                            </span>
                        )}

                        <button
                            onClick={() => {
                                setActiveCategory(null);
                                setStockFilter('all');
                            }}
                            className="cursor-pointer text-xs text-slate-500 underline hover:text-slate-700"
                        >
                            Clear all filters
                        </button>
                    </div>
                )}

                {/* Table */}
                <TableList
                    columns={visibleColumns}
                    actions={ProductTable.actions}
                    indexLabel="#"
                    indexStartFrom={1}
                    showIndex={true}
                    data={filteredProducts}
                    onView={handleShowModal}
                    onEdit={(item) => handleEdit(item.id)}
                    onDelete={(item) => handleDelete(item.id)}
                    emptyTableMessage={getEmptyMessage()}
                    useDropdown={true}
                />

                {/* View Modal */}
                <div className={`${isModalOpen ? 'block' : 'hidden'}`}></div>
            </div>
        </div>
    );
}
