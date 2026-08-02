import { Modal } from '@/components/modal';
import { useToast } from '@/components/contexts/toast-context';
import { router } from '@inertiajs/react';
import { UnitForm } from '@/components/form/unit/form-modal';

interface CreateUnitModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function CreateUnitModal({ isOpen, onClose }: CreateUnitModalProps) {
    const { addToast } = useToast();

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Add New Unit" size="md">
            <UnitForm
                submitRoute="/units"
                method="post"
                submitLabel="Create Unit"
                onCancel={onClose}
                onSuccess={() => {
                    addToast('success', 'Unit created successfully!');
                    onClose();
                    router.reload();
                }}
            />
        </Modal>
    );
}