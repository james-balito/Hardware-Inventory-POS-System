import type { Unit } from '@/types/unit';
import { UnitForm } from '@/components/form/unit/form-modal';
import { Modal } from '@/components/modal';

interface EditUnitModalProps {
    isOpen: boolean;
    onClose: () =>void;
    unit: Unit;
    onSuccess?: () => void
}


export function EditUnitModal({
    isOpen,
    onClose,
    unit,
    onSuccess,
}: EditUnitModalProps) {

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Edit Unit" size="md">
            <UnitForm
                key={unit.id}
                submitRoute={`/units/${unit.id}`}
                method="put"
                submitLabel="Update Unit"
                initialData={unit}
                onCancel={onClose}
                onSuccess={() => {
                    onClose();
                    onSuccess?.();
                }}
            />
        </Modal>
    );
};