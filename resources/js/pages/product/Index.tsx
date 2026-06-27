import { Link, router } from "@inertiajs/react";
import { useState, useEffect } from "react";
import { create } from "@/routes/products";
import TableList from "@/components/table-list";
import { ProductTable } from "@/tables/product";
import { Product } from "@/pages/interfaces/Interfaces";
import { ProductProps } from "@/pages/interfaces/Props";
import { Package, Plus } from "lucide-react";

export default function Index({ products }: ProductProps) {
    const [loading, setLoading] = useState(true);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const id = setTimeout(() => setLoading(false), 800);
        return () => clearTimeout(id);
    }, [products]);

    const handleShowModal = (product: Product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const handleEdit   = (id: number) => router.visit(`/products/${id}/edit`);
    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this product?')) {
            router.delete(`/products/${id}`);
        }
    };

    // ── Loading skeleton ──
    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50">
                <div className="max-w-6xl mx-auto py-8">
                    <div className="flex items-end justify-between mb-8">
                        <div>
                            <div className="h-3 w-20 bg-slate-200 rounded animate-pulse mb-3" />
                            <div className="h-8 w-36 bg-slate-200 rounded animate-pulse" />
                        </div>
                        <div className="h-10 w-32 bg-slate-200 rounded-xl animate-pulse" />
                    </div>

                    <div className="grid grid-cols-4 gap-4 mb-6">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="bg-white border border-slate-200 rounded-xl p-4 animate-pulse">
                                <div className="h-3 w-24 bg-slate-100 rounded mb-3" />
                                <div className="h-8 w-16 bg-slate-100 rounded" />
                            </div>
                        ))}
                    </div>

                    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                        <div className="bg-slate-50 border-b border-slate-200 px-6 py-3.5 flex gap-20 animate-pulse">
                            {[...Array(8)].map((_, i) => (
                                <div key={i} className="h-3 w-20 bg-slate-200 rounded" />
                            ))}
                        </div>
                        {[...Array(10)].map((_, i) => (
                            <div key={i} className="px-6 py-4 border-b border-slate-100 flex gap-8 animate-pulse">
                                <div className="h-4 w-6 bg-slate-100 rounded" />
                                <div className="h-4 w-40 bg-slate-100 rounded" />
                                <div className="h-4 w-24 bg-slate-100 rounded" />
                                <div className="h-4 w-24 bg-slate-100 rounded" />
                                <div className="h-4 w-24 bg-slate-100 rounded" />
                                <div className="h-4 w-40 bg-slate-100 rounded" />
                                <div className="h-4 w-24 bg-slate-100 rounded" />
                                <div className="h-4 w-24 bg-slate-100 rounded" />
                                <div className="h-4 w-24 bg-slate-100 rounded" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    const inStock    = products.filter(p => Number(p.stock_quantity) > 0).length;
    const lowStock    = products.filter(p => Number(p.stock_quantity) < 5).length;
    const outOfStock = products.filter(p => Number(p.stock_quantity) === 0).length;

    return (
        <div className="min-h-screen bg-slate-50">
            <div className="max-w-6xl mx-10 py-8">

                {/* Page Header */}
                <div className="flex items-end justify-between mb-8">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-1">
                            Inventory
                        </p>
                        <h1 className="text-2xl font-bold text-slate-900">Products</h1>
                    </div>
                    <Link href={create()}>
                        <button className="flex items-center gap-2 bg-slate-900 hover:bg-blue-600 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors cursor-pointer">
                            <Plus className="w-4 h-4" />
                            Add Product
                        </button>
                    </Link>
                </div>

                {/* Summary Stats */}
                <div className="grid grid-cols-4 gap-4 mb-6">
                    <div className="bg-white border border-slate-200 rounded-xl p-4">
                        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                            Total Products
                        </p>
                        <p className="text-2xl font-bold text-blue-700 font-mono">{products.length}</p>
                    </div>
                    <div className="bg-white border border-slate-200 rounded-xl p-4">
                        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                            In Stock
                        </p>
                        <p className="text-2xl font-bold text-green-600 font-mono">{inStock}</p>
                    </div>
                     <div className="bg-white border border-slate-200 rounded-xl p-4">
                        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                            Low in Stock
                        </p>
                        <p className="text-2xl font-bold text-orange-500 font-mono">{lowStock}</p>
                    </div>
                    <div className="bg-white border border-slate-200 rounded-xl p-4">
                        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                            Out of Stock
                        </p>
                        <p className="text-2xl font-bold text-red-500 font-mono">{outOfStock}</p>
                    </div>
                </div>

                {/* Table */}
                <TableList
                    columns={ProductTable.columns}
                    actions={ProductTable.actions}
                    indexLabel="#"
                    indexStartFrom={1}
                    showIndex={true}
                    data={products}
                    onView={handleShowModal}
                    onEdit={(item) => handleEdit(item.id)}
                    onDelete={(item) => handleDelete(item.id)}
                    emptyTableMessage={{
                        icon: <Package />,
                        title: "No products yet",
                        description: "Add your first product to see it listed here.",
                        onActionClick: () => router.visit(create()),
                        buttonText: "Product"
                    }}
                />
            </div>
        </div>
    );
}