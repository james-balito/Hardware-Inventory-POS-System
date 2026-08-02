import { Modal } from '@/components/modal';
import { CategoryForm } from '@/components/form/category/form-modal';
import { useToast } from '@/components/contexts/toast-context';
import { router } from '@inertiajs/react';

interface CreateCategoryModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function CreateCategoryModal({ isOpen, onClose }: CreateCategoryModalProps) {
    const { addToast } = useToast();

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Add New Category" size="md">
            <CategoryForm
                submitRoute="/categories"
                method="post"
                submitLabel="Create Category"
                onCancel={onClose}
                onSuccess={() => {
                    addToast('success', 'Category created successfully!');
                    onClose();
                    router.reload();
                }}
            />
        </Modal>
    );
}