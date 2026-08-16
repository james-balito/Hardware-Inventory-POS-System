import { Link, router } from '@inertiajs/react';
import { useState, useEffect, useMemo } from 'react';
import { create } from '@/routes/products';
import TableList from '@/components/table-list';
import { ProductTable } from '@/tables/product';
import { Product } from '@/interfaces/Interfaces';
import { ProductProps } from '@/interfaces/Props';
import {
    Package,
    Plus,
    Search,
    Filter,
    X,
    PhilippinePeso,
    ChevronLeft,
} from 'lucide-react';
import { Head } from '@inertiajs/react';
import PageHeader from '@/components/header';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import {
    Pagination,
    PaginationContent,
    PaginationLink,
    PaginationItem,
    PaginationPrevious,
    PaginationNext,
    PaginationEllipsis,
} from '@/components/ui/pagination';
import { Modal } from '@/components/modal';

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

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    function getPaginationRange(
        current: number,
        total: number,
    ): (number | '...')[] {
        if (total <= 7) {
            return Array.from({ length: total }, (_, i) => i + 1);
        }

        const range: (number | '...')[] = [1];

        if (current > 3) range.push('...');

        const start = Math.max(2, current - 1);
        const end = Math.min(total - 1, current + 1);
        for (let i = start; i <= end; i++) range.push(i);

        if (current < total - 2) range.push('...');

        range.push(total);

        return range;
    }

    useEffect(() => {
        const id = setTimeout(() => setLoading(false), 800);
        return () => clearTimeout(id);
    }, [products]);

    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

    // Pagination button functions
    const firstPage = () => {
        setCurrentPage(1);
    };

    const lastPage = () => {
        setCurrentPage(totalPages);
    };

    const handlePrev = () => {
        if (currentPage === 1) return null;
        setCurrentPage((prevPage) => prevPage - 1);
    };

    const handleNext = () => {
        if (currentPage === totalPages) return null;
        setCurrentPage((prevPage) => prevPage + 1);
    };
    // end of pagination button functions

    const paginatedProducts = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage;
        return filteredProducts.slice(start, start + itemsPerPage);
    }, [filteredProducts, currentPage]);

    useEffect(() => {
        setCurrentPage(1);
    }, [activeCategory, stockFilter, debouncedSearch]);

    // Product Actions Function
    const handleShowModal = (product: Product) => {
        console.log('Full Item:', product);
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

    // Category filter handler
    const handleCategoryFilter = (value: string) => {
        setActiveCategory(value === 'all' ? null : Number(value));
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

    // Shared stock-status classifier, used identically by the stat cards
    // above and the detail modal below, so a product's status always
    // reads the same color/label no matter where you're looking at it.
    const getStockStatus = (qty: number) => {
        if (qty === 0) {
            return {
                label: 'Out of Stock',
                classes:
                    'bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400',
            };
        }
        if (qty < 5) {
            return {
                label: 'Low Stock',
                classes:
                    'bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400',
            };
        }
        return {
            label: 'In Stock',
            classes:
                'bg-green-50 text-green-700 dark:bg-green-500/10 dark:text-green-400',
        };
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 dark:bg-slate-600/10">
                <Head title="Products | Macmac Hardware" />
                <div className="mx-10 py-8">
                    {/* Header skeleton */}
                    <div className="mb-8 flex items-end justify-between">
                        <div className={`flex flex-row`}>
                            <div className="h-12 w-13 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
                            <div className={`ml-4 flex flex-col`}>
                                <div className="h-4 w-20 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
                                <div className="mt-1 h-7 w-25 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
                            </div>
                        </div>

                        <div className="h-10 w-35 animate-pulse rounded-xl bg-slate-200 dark:bg-slate-700" />
                    </div>

                    {/* Stats skeleton */}
                    <div className="mb-6 grid grid-cols-4 gap-4">
                        {[...Array(4)].map((_, i) => (
                            <div
                                key={i}
                                className="animate-pulse rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-600 dark:bg-slate-900/70"
                            >
                                <div className="mb-3 h-3 w-24 rounded bg-slate-100 dark:bg-slate-700" />
                                <div className="h-8 w-10 rounded bg-slate-100 dark:bg-slate-700" />
                                <div className="my-2 h-4 w-16 rounded bg-slate-100 dark:bg-slate-700" />
                            </div>
                        ))}
                    </div>

                    <div className="mb-1 flex animate-pulse gap-5 bg-slate-50 dark:bg-slate-900/10">
                        <div className="mb-4 h-7 w-3/4 rounded bg-slate-200 dark:bg-slate-700" />
                        <div className="mb-4 h-7 w-1/2 rounded bg-slate-200 dark:bg-slate-700" />
                        <div className="mb-4 h-7 w-1/2 rounded bg-slate-200 dark:bg-slate-700" />
                        <div className="mb-4 h-7 w-1/2 rounded bg-slate-200 dark:bg-slate-700" />
                    </div>

                    {/* Table skeleton */}
                    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-slate-600 dark:bg-slate-600/10">
                        <div className="flex animate-pulse gap-3 border-b border-slate-200 bg-slate-50 px-6 py-3.5 dark:border-slate-600 dark:bg-slate-600/10">
                            <div className="mr-10 h-5 w-6 rounded bg-slate-200 dark:bg-slate-700" />
                            {[...Array(9)].map((_, i) => (
                                <div
                                    key={i}
                                    className="mr-10 h-5 w-20 rounded bg-slate-200 dark:bg-slate-700"
                                />
                            ))}
                        </div>

                        {[...Array(10)].map((_, i) => (
                            <div
                                key={i}
                                className="flex animate-pulse flex-row items-start justify-items-start gap-8 gap-10 border-b border-slate-100 px-6 py-4 dark:border-slate-700"
                            >
                                <div className="my-2 h-4 w-6 justify-self-start rounded bg-slate-100 dark:bg-slate-600" />
                                {[...Array(9)].map((_, i) => (
                                    <div className="my-2 h-4 w-32 justify-self-start rounded bg-slate-100 dark:bg-slate-600" />
                                ))}
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

    const selectedStockStatus = selectedProduct
        ? getStockStatus(Number(selectedProduct.stock_quantity))
        : null;

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-600/10">
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
                        className={`hover:dark: flex cursor-pointer flex-col items-start rounded-xl border border-blue-400 bg-white p-4 transition-all hover:shadow-md dark:bg-slate-900/70`}
                    >
                        <p className="mb-2 text-xs font-semibold tracking-wider text-blue-400 uppercase">
                            Total Products
                        </p>
                        <p className="font-mono text-2xl font-bold text-blue-700">
                            {products.length}
                        </p>
                        <button
                            className={`cursor-pointer text-xs text-gray-500 hover:text-slate-600 dark:text-slate-400 hover:dark:text-slate-100`}
                            // using the document and linking the id and adds a scroll animation and smooth rendering the behavior
                            onClick={() => {
                                document
                                    .getElementById('product')
                                    ?.scrollIntoView({ behavior: 'smooth' });
                            }}
                        >
                            View all
                        </button>
                    </button>

                    <button
                        onClick={() => handleStockFilter('in_stock')}
                        className={`flex cursor-pointer flex-col items-start rounded-xl border border-green-400 bg-white p-4 transition-all hover:shadow-md dark:bg-slate-900/70`}
                    >
                        <p className="mb-2 text-xs font-semibold tracking-wider text-green-500 uppercase">
                            In Stock
                        </p>
                        <p className="font-mono text-2xl font-bold text-green-600">
                            {inStock}
                        </p>
                        <span className="text-xs text-gray-500 dark:text-slate-400">
                            {products.length > 0
                                ? ((inStock / products.length) * 100).toFixed(1)
                                : 0}
                            % of total
                        </span>
                    </button>

                    <button
                        onClick={() => handleStockFilter('low_stock')}
                        className={`flex cursor-pointer flex-col items-start rounded-xl border border-orange-400 bg-white p-4 transition-all hover:shadow-md dark:bg-slate-900/70`}
                    >
                        <p className="mb-2 text-xs font-semibold tracking-wider text-orange-400 uppercase">
                            Low in Stock
                        </p>
                        <p className="font-mono text-2xl font-bold text-orange-500">
                            {lowStock}
                        </p>
                        <span className="text-xs text-gray-500 dark:text-slate-400">
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
                        className={`flex cursor-pointer flex-col items-start rounded-xl border border-red-400 bg-white p-4 transition-all hover:shadow-md dark:bg-slate-900/70`}
                    >
                        <p className="mb-2 text-xs font-semibold tracking-wider text-red-400 uppercase">
                            Out of Stock
                        </p>
                        <p className="font-mono text-2xl font-bold text-red-500">
                            {outOfStock}
                        </p>
                        <span className="text-xs text-gray-500 dark:text-slate-400">
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
                            className="w-full rounded-lg border border-slate-200 bg-white py-2 pr-4 pl-10 text-sm text-slate-700 placeholder:text-slate-400 focus:border-slate-400 focus:ring-1 focus:ring-slate-400 focus:outline-none dark:border-slate-600 dark:bg-slate-900/70 dark:text-slate-200 dark:placeholder:text-slate-500"
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
                        onValueChange={(value) => handleCategoryFilter(value)}
                    >
                        <SelectTrigger className="my-2 w-1/2 border border-gray-200 bg-white font-normal text-gray-600 dark:border-slate-600 dark:bg-slate-900/70 dark:text-slate-300 dark:ring-slate-600 dark:hover:bg-slate-800">
                            <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent className="max-h-45 overflow-y-auto border border-gray-200 bg-white font-normal text-gray-600 dark:border-slate-600 dark:bg-slate-900/70 dark:text-slate-300">
                            <SelectItem
                                value="all"
                                className={`cursor-pointer bg-white font-normal text-gray-600 dark:border-slate-600 dark:bg-slate-900/70 dark:text-slate-300 dark:hover:bg-slate-800`}
                            >
                                All Categories
                            </SelectItem>
                            {categories.map((category) => (
                                <SelectItem
                                    value={category.id.toString()}
                                    key={category.id}
                                    className={`cursor-pointer bg-white font-normal text-gray-600 dark:border-slate-600 dark:bg-slate-900/70 dark:text-slate-300 dark:hover:bg-slate-800`}
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
                        <SelectTrigger className="my-2 w-1/2 border border-gray-200 bg-white font-normal text-gray-600 dark:border-slate-600 dark:bg-slate-900/70 dark:text-slate-300 dark:ring-slate-600 dark:hover:bg-slate-800">
                            <SelectValue placeholder="Select a stock" />
                        </SelectTrigger>
                        <SelectContent className="border border-gray-200 bg-white font-normal text-gray-600 dark:border-slate-600 dark:bg-slate-900/70 dark:text-slate-300">
                            <SelectItem
                                value="all"
                                className={`bg-white font-normal text-gray-600 dark:border-slate-600 dark:bg-slate-900/70 dark:text-slate-300`}
                            >
                                All Status
                            </SelectItem>
                            {stockFilters.map((stock) => (
                                <SelectItem
                                    key={stock.id}
                                    value={stock.value}
                                    className={`cursor-pointer bg-white font-normal text-gray-600 dark:border-slate-600 dark:bg-slate-900/70 dark:text-slate-300 dark:hover:bg-slate-800`}
                                >
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
                        <SelectTrigger className="my-2 w-1/2 border border-gray-200 bg-white font-normal text-gray-600 dark:border-slate-600 dark:bg-slate-900/70 dark:text-slate-300 dark:ring-slate-600 dark:hover:bg-slate-800">
                            <SelectValue>Filter Columns</SelectValue>
                        </SelectTrigger>
                        <SelectContent
                            className={`cursor-pointer bg-white font-normal text-gray-600 dark:border-slate-600 dark:bg-slate-900/70 dark:text-slate-300`}
                        >
                            {ProductTable.columns.map((col) => (
                                <SelectItem
                                    key={col.key}
                                    value={col.key}
                                    className={`cursor-pointer bg-white font-normal text-gray-600 dark:border-slate-600 dark:bg-slate-900/70 dark:text-slate-300 dark:hover:bg-slate-800`}
                                >
                                    <div className="flex w-full items-center justify-between gap-2">
                                        <span
                                            className={
                                                hiddenColumns.includes(col.key)
                                                    ? 'opacity-30'
                                                    : ''
                                            }
                                        >
                                            {hiddenColumns.includes(col.key)
                                                ? '\u00A0\u00A0\u00A0\u00A0'
                                                : '✓'}
                                        </span>
                                        <span>{col.label === '#' ? 'ID' : col.label}</span>
                                    </div>
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* Active Filters Indicator */}
                {hasActiveFilters && (
                    <div className="mb-4 flex items-center gap-2">
                        <Filter className="h-3.5 w-3.5 text-slate-400 dark:text-slate-500" />
                        <span className="text-xs text-slate-500 dark:text-slate-400">
                            Active filters:
                        </span>

                        {activeCategory && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700 dark:bg-blue-500/10 dark:text-blue-400 border dark:border-blue-400/50">
                                {
                                    categories.find(
                                        (c) => c.id === activeCategory,
                                    )?.category_name
                                }
                                <button
                                    onClick={() => setActiveCategory(null)}
                                    className="ml-0.5 rounded-full p-0.5 hover:bg-blue-200 dark:hover:bg-blue-800"
                                >
                                    <X className="h-3 w-3" />
                                </button>
                            </span>
                        )}

                        {stockFilter !== 'all' && (
                            <span
                                className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                    stockFilter === 'in_stock'
                                        ? 'border bg-green-50 text-green-700 dark:border-green-400/50 dark:bg-green-500/10 dark:text-green-400'
                                        : stockFilter === 'low_stock'
                                          ? 'border bg-amber-50 text-amber-700 dark:border-amber-300/50 dark:bg-amber-500/10 dark:text-amber-400'
                                          : 'border bg-red-50 text-red-700 dark:border-red-400/50 dark:bg-red-500/10 dark:text-red-400'
                                }`}
                            >
                                {stockFilter === 'in_stock' && 'In Stock'}
                                {stockFilter === 'low_stock' && 'Low Stock'}
                                {stockFilter === 'out_of_stock' &&
                                    'Out of Stock'}
                                <button
                                    onClick={() => setStockFilter('all')}
                                    className="ml-0.5 cursor-pointer rounded-full p-0.5 hover:bg-black/10 dark:hover:bg-white/10"
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
                            className="cursor-pointer text-xs text-slate-500 underline hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300"
                        >
                            Clear all filters
                        </button>
                    </div>
                )}

                {/* Table */}
                <section id="product">
                    <TableList
                        columns={visibleColumns}
                        actions={ProductTable.actions}
                        indexLabel="#"
                        indexStartFrom={1}
                        showIndex={false}
                        data={paginatedProducts}
                        onView={handleShowModal}
                        onEdit={(item) => handleEdit(item.id)}
                        onDelete={(item) => handleDelete(item.id)}
                        emptyTableMessage={getEmptyMessage()}
                        useDropdown={true}
                    />

                    {/* Pagination footer */}
                    <div className="flex flex-col items-center justify-between gap-3 border-t border-slate-200 px-4 py-3 sm:flex-row dark:border-slate-700">
                        <div className="min-w-[140px] text-xs text-slate-500 dark:text-slate-400">
                            <span className="font-medium text-slate-700 dark:text-slate-300">
                                <span className="text-slate-400">Page</span>{' '}
                                {currentPage}{' '}
                                <span className="text-slate-400">of</span>{' '}
                                {totalPages || 1}
                            </span>
                        </div>

                        <Pagination>
                            <PaginationContent>
                                <PaginationLink
                                    onClick={firstPage}
                                    className={`-mr-3 ml-3 flex cursor-pointer hover:bg-transparent hover:text-slate-500  dark:hover:text-slate-400 ${currentPage === 1 ? 'pointer-events-none opacity-40' : 'cursor-pointer'}`}
                                >
                                    <ChevronLeftIcon
                                        className={`-mr-5 h-4 w-4`}
                                    />
                                    <ChevronLeftIcon className={`h-4 w-4`} />
                                </PaginationLink>
                                <PaginationItem>
                                    <PaginationPrevious
                                        onClick={handlePrev}
                                        className={
                                            currentPage === 1
                                                ? 'pointer-events-none opacity-40'
                                                : 'cursor-pointer hover:bg-transparent hover:text-slate-400'
                                        }
                                    />
                                </PaginationItem>

                                {getPaginationRange(
                                    currentPage,
                                    totalPages,
                                ).map((page, i) =>
                                    page === '...' ? (
                                        <PaginationItem key={`ellipsis-${i}`}>
                                            <PaginationEllipsis />
                                        </PaginationItem>
                                    ) : (
                                        <PaginationItem key={page}>
                                            <PaginationLink
                                                isActive={page === currentPage}
                                                onClick={() =>
                                                    setCurrentPage(
                                                        page as number,
                                                    )
                                                }
                                                className="cursor-pointer"
                                            >
                                                {page}
                                            </PaginationLink>
                                        </PaginationItem>
                                    ),
                                )}

                                <PaginationItem>
                                    <PaginationNext
                                        onClick={handleNext}
                                        className={
                                            currentPage === totalPages ||
                                            totalPages === 0
                                                ? 'pointer-events-none opacity-40'
                                                : 'cursor-pointer hover:bg-transparent hover:text-slate-400'
                                        }
                                    />
                                </PaginationItem>
                                <PaginationLink
                                    onClick={lastPage}
                                    className={`mr-3 -ml-3 flex cursor-pointer hover:bg-transparent hover:text-slate-500 dark:hover:text-slate-400 ${currentPage === totalPages ? 'pointer-events-none opacity-40' : 'cursor-pointer'}`}
                                >
                                    <ChevronRightIcon className={`h-4 w-4`} />
                                    <ChevronRightIcon
                                        className={`-ml-5 h-4 w-4`}
                                    />
                                </PaginationLink>
                            </PaginationContent>
                        </Pagination>

                        <span className="min-w-[140px] text-right text-xs text-slate-500 dark:text-slate-400">
                            Showing{' '}
                            <span
                                className={`text-slate-700 dark:text-slate-200`}
                            >
                                {paginatedProducts.length}
                            </span>{' '}
                            of{' '}
                            <span
                                className={`text-slate-700 dark:text-slate-200`}
                            >
                                {products.length}
                            </span>{' '}
                            results
                        </span>
                    </div>
                </section>

                {/* View Modal */}
                <Modal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    size="sm"
                    title={'Product Details'}
                    children={
                        <div className="space-y-5">
                            {/* Name + badges */}
                            <div>
                                <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
                                    {selectedProduct?.product_name}
                                </h3>
                                <div className="mt-2 flex flex-wrap items-center gap-2">
                                    {selectedProduct?.category
                                        ?.category_name && (
                                        <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                                            {
                                                selectedProduct.category
                                                    .category_name
                                            }
                                        </span>
                                    )}
                                    {selectedProduct?.unit?.unit_name && (
                                        <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                                            {selectedProduct.unit.unit_name}
                                        </span>
                                    )}
                                    {selectedStockStatus && (
                                        <span
                                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${selectedStockStatus.classes}`}
                                        >
                                            {selectedStockStatus.label}
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="border-t border-slate-100 dark:border-slate-700" />

                            {/* Detail rows */}
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                                        Product ID
                                    </span>
                                    <span className="font-mono text-sm text-slate-700 dark:text-slate-200">
                                        {selectedProduct?.id}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                                        Stock Quantity
                                    </span>
                                    <span className="font-mono text-sm text-slate-700 dark:text-slate-200">
                                        {selectedProduct?.stock_quantity}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                                        Wholesale Price
                                    </span>
                                    <span className="flex items-center gap-0.5 font-mono text-sm text-slate-700 dark:text-slate-200">
                                        <PhilippinePeso className="h-3 w-3" />
                                        {Number(
                                            selectedProduct?.wholesale_price ??
                                                0,
                                        ).toFixed(2)}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                                        Sale Price
                                    </span>
                                    <span className="flex items-center gap-0.5 font-mono text-sm text-slate-700 dark:text-slate-200">
                                        <PhilippinePeso className="h-3 w-3" />
                                        {Number(
                                            selectedProduct?.sale_price ?? 0,
                                        ).toFixed(2)}
                                    </span>
                                </div>
                            </div>

                            {selectedProduct?.description && (
                                <>
                                    <div className="border-t border-slate-100 dark:border-slate-700" />
                                    <div>
                                        <p className="mb-1 text-xs font-medium text-slate-500 dark:text-slate-400">
                                            Description
                                        </p>
                                        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                                            {selectedProduct.description}
                                        </p>
                                    </div>
                                </>
                            )}
                        </div>
                    }
                />
            </div>
        </div>
    );
}
