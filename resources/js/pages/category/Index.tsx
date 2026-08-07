// resources/js/Pages/Categories/Index.tsx
import { Link, router, Head } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { Plus, Tag } from 'lucide-react';
import ShowListModal from '@/components/show-list-modal';
import { CreateCategoryModal } from '@/components/modals/category/create-category-modal';
import { EditCategoryModal } from '@/components/modals/category/edit-category-modal';
import { useToast } from '@/components/contexts/toast-context';
import type { Category } from '@/types/category';
import TableList from '@/components/table-list';
import { CategoryTable } from '@/tables/category';
import PageHeader from '@/components/header';

interface CategoryProps {
    categories: Category[];
}

Index.layout = {
    breadcrumbs: [
        {
            title: 'Inventory',
            href: '/categories',
        },
        {
            title: 'Categories',
            href: '/categories',
        },
    ],
};

export default function Index({ categories }: CategoryProps) {
    const [showCategories, setShowCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(
        null,
    );
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editKey, setEditKey] = useState(0);
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

    const handleEdit = (item: Category) => {
        console.log('Full Item:', item);
        setSelectedCategory(item);
        setEditKey((prev) => prev + 1);
        setIsEditModalOpen(true);
    };

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this category?')) {
            const toastId = addToast('loading', 'Deleting category...');

            router.delete(`/categories/${id}`, {
                onSuccess: () => {
                    updateToast(
                        toastId,
                        'success',
                        'Category deleted successfully!',
                    );
                    // Remove from local state immediately
                    setShowCategories((prev) =>
                        prev.filter((cat) => cat.id !== id),
                    );
                },
                onError: (errors) => {
                    updateToast(
                        toastId,
                        'error',
                        'Failed to delete category. Please try again.',
                    );
                },
            });
        }
    };

    const tableConfig = CategoryTable();
    const { columns, actions } = tableConfig;

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 dark:bg-slate-900/10">
                <Head title={`Categories | Macmac Hardware`} />
                <div className="mx-10 py-8">
                    <div className="mb-8 flex items-end justify-between">
                        <div className={`flex flex-row`}>
                            {/* <div className="mb-3 h-3 w-20 animate-pulse rounded bg-slate-200" /> */}
                            <div className="h-12 w-13 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
                            <div className={`ml-4 flex flex-col`}>
                                <div className="h-4 w-20 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
                                <div className="mt-1 h-7 w-30 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
                            </div>
                        </div>
                        <div className="h-10 w-32 animate-pulse rounded-xl bg-slate-200 dark:bg-slate-700" />
                    </div>

                    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-950/70">
                        <div className="flex animate-pulse gap-20 border-b border-slate-200 bg-slate-50 px-6 py-3.5 dark:border-slate-700 dark:bg-slate-900/80">
                            {[...Array(8)].map((_, i) => (
                                <div
                                    key={i}
                                    className="h-3 w-20 rounded bg-slate-200 dark:bg-slate-700"
                                />
                            ))}
                        </div>
                        {[...Array(10)].map((_, i) => (
                            <div
                                key={i}
                                className="flex animate-pulse gap-8 border-b border-slate-100 px-6 py-4 dark:border-slate-800"
                            >
                                <div className="h-4 w-6 rounded bg-slate-100 dark:bg-slate-800" />
                                <div className="h-4 w-24 rounded bg-slate-100 dark:bg-slate-800" />
                                <div className="h-4 w-40 rounded bg-slate-100 dark:bg-slate-800" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="mx-10 min-h-screen bg-slate-50 py-8 dark:bg-slate-900/10">
            <Head title={`Categories | Macmac Hardware`} />
            <div className="mb-8 flex items-end justify-between">
                <PageHeader
                    headerTitle="Inventory"
                    icon={<Tag />}
                    title="Categories"
                />
                <button
                    onClick={() => setIsCreateModalOpen(true)}
                    className="flex cursor-pointer items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-600"
                >
                    <Plus className="h-4 w-4" />
                    Add Category
                </button>
            </div>

            <div className="mt-4">
                <TableList
                    columns={columns}
                    actions={actions}
                    data={showCategories}
                    onView={handleShowModal}
                    onEdit={(item) => handleEdit(item)}
                    onDelete={(item) => handleDelete(item.id)}
                />
            </div>

            {/* View Modal */}
            <ShowListModal
                trigger={<div style={{ display: 'none' }} />}
                title="Category Details"
                category={selectedCategory || undefined}
                description={
                    selectedCategory
                        ? `Information for category: ${selectedCategory.category_name}`
                        : ''
                }
                open={isViewModalOpen}
                onOpenChange={setIsViewModalOpen}
            />

            {/* Create Modal */}
            <CreateCategoryModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
            />

            {selectedCategory && isEditModalOpen && (
                <EditCategoryModal
                    key={editKey}
                    isOpen={isEditModalOpen}
                    onClose={() => setIsEditModalOpen(false)}
                    category={selectedCategory}
                    onSuccess={() => setIsEditModalOpen(false)}
                />
            )}
        </div>
    );
}
