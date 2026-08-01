import { useForm } from '@inertiajs/react';
import { FormEvent, useEffect } from 'react';
import { FormTextInput } from '@/components/form/form-text-input';
import { FormTextarea } from '@/components/form/form-textarea';
import { FormActions } from '@/components/form/form-actions';

interface UnitFormProps {
    onCancel: () => void;
    onSuccess?: () => void;
    initialData?: {
        unit_name: string;
        abbreviation: string;
    };
    submitRoute: string;
    method?: 'post' | 'put';
    submitLabel?: string;
}

export function UnitForm({ 
    onCancel, 
    onSuccess, 
    initialData = { unit_name: '', abbreviation: '' },
    submitRoute,
    method = 'post',
    submitLabel = 'Create Units  '
}: UnitFormProps) {

    console.log('UnitForm initialData:', initialData);

    const { data, setData, post, put, processing, errors } = useForm({
        unit_name: initialData.unit_name,
        abbreviation: initialData.abbreviation,
    });
    
    console.log('UnitForm data:', data);

    useEffect(() => {
        setData({
            unit_name: initialData.unit_name,
            abbreviation: initialData.abbreviation,
        })
    },[initialData.unit_name, initialData.abbreviation, setData]);

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        
        const options = {
            onSuccess: () => {
                onSuccess?.();
            },
        };

        if (method === 'put') {
            put(submitRoute, options);
        } else {
            post(submitRoute, options);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <FormTextInput
                id="unit_name"
                label="Unit Name"
                value={data.unit_name}
                onChange={(value) => setData('unit_name', value)}
                error={errors.unit_name}
                placeholder="e.g. Centimeter"
                required
            />

            <FormTextarea
                id="abbreviation"
                label="Abbreviation"
                value={data.abbreviation}
                onChange={(value) => setData('abbreviation', value)}
                error={errors.abbreviation}
                placeholder="e.g. CM..."
                rows={3}
            />

            <FormActions
                onCancel={onCancel}
                isProcessing={processing}
                submitLabel={submitLabel}
                processingLabel="Creating Unit..."
            />
        </form>
    );
}