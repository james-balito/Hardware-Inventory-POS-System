// resources/js/Components/EditCategoryModal.tsx
import { Modal } from '@/components/modal';
import { CategoryForm } from '@/components/form/category/form-modal';
import type { Category } from '@/types/category';

interface EditCategoryModalProps {
    isOpen: boolean;
    onClose: () => void;
    category: Category;
    onSuccess?: () => void;
}

export function EditCategoryModal({
    isOpen,
    onClose,
    category,
    onSuccess,
}: EditCategoryModalProps) {
    console.log('EditCategoryModal category:', category);

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Edit Category"
            size="md"
        >
            <CategoryForm
                key={category.id}
                submitRoute={`/categories/${category.id}`}
                method="put"
                submitLabel="Update Category"
                initialData={{
                    category_name: category.category_name,
                    description: category.description || '',
                }}
                onCancel={onClose}
                onSuccess={() => {
                    onClose();
                    onSuccess?.();
                }}
            />
        </Modal>
    );
}
