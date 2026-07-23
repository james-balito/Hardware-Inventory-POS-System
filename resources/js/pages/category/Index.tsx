// resources/js/Pages/Categories/Index.tsx
import { Link, router } from "@inertiajs/react";
import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import ShowListModal from "@/components/show-list-modal";
import { CreateCategoryModal } from "@/components/modals/category/create-category-modal";
import { useToast } from '@/components/contexts/toast-context';
import type { Category } from "@/types/category";
import TableList from "@/components/table-list";
import { CategoryTable } from "@/tables/category";

interface CategoryProps {
    categories: Category[];
}

export default function Index({ categories }: CategoryProps) {
    const [showCategories, setShowCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const { addToast, updateToast } = useToast();

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setShowCategories(categories);
            setLoading(false);
        }, 1000);

        return () => clearTimeout(timeoutId);
    }, [categories]);

    const handleShowModal = (category: Category) => {
        setSelectedCategory(category);
        setIsViewModalOpen(true);
    };

    const handleEdit = (id: number) => {
        router.visit(`/categories/${id}/edit`);
    };

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this category?')) {
            const toastId = addToast('loading', 'Deleting category...');
            
            router.delete(`/categories/${id}`, {
                onSuccess: () => {
                    updateToast(toastId, 'success', 'Category deleted successfully!');
                    // Remove from local state immediately
                    setShowCategories(prev => prev.filter(cat => cat.id !== id));
                },
                onError: (errors) => {
                    updateToast(toastId, 'error', 'Failed to delete category. Please try again.');
                }
            });
        }
    };

    const tableConfig = CategoryTable();
    const { columns, actions } = tableConfig;

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

                    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                        <div className="bg-slate-50 border-b border-slate-200 px-6 py-3.5 flex gap-20 animate-pulse">
                            {[...Array(8)].map((_, i) => (
                                <div key={i} className="h-3 w-20 bg-slate-200 rounded" />
                            ))}
                        </div>
                        {[...Array(10)].map((_, i) => (
                            <div key={i} className="px-6 py-4 border-b border-slate-100 flex gap-8 animate-pulse">
                                <div className="h-4 w-6 bg-slate-100 rounded" />
                                <div className="h-4 w-24 bg-slate-100 rounded" />
                                <div className="h-4 w-40 bg-slate-100 rounded" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-8">
            <div className="flex items-end justify-between mb-8 mx-8">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-1">
                        Inventory
                    </p>
                    <h1 className="text-2xl font-bold text-slate-900">Categories</h1>
                </div>
                <button 
                    onClick={() => setIsCreateModalOpen(true)}
                    className="flex items-center gap-2 bg-slate-900 hover:bg-blue-600 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors cursor-pointer"
                >
                    <Plus className="w-4 h-4" />
                    Add Category
                </button>
            </div>

            <div className="mt-4 mx-8">
                <TableList
                    columns={columns}
                    actions={actions}
                    data={showCategories}
                    onView={handleShowModal}
                    onEdit={(item) => handleEdit(item.id)}
                    onDelete={(item) => handleDelete(item.id)}
                />
            </div>

            {/* View Modal */}
            <ShowListModal
                trigger={<div style={{ display: 'none' }} />}
                title="Category Details"
                category={selectedCategory || undefined}
                description={selectedCategory ? `Information for category: ${selectedCategory.category_name}` : ''}
                open={isViewModalOpen}
                onOpenChange={setIsViewModalOpen}
            />

            {/* Create Modal */}
            <CreateCategoryModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
            />
        </div>
    );
}