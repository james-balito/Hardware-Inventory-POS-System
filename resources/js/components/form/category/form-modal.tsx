// resources/js/Components/Form/CategoryForm.tsx
import { useForm } from '@inertiajs/react';
import { FormEvent } from 'react';
import { FormTextInput } from '@/components/form/form-text-input';
import { FormTextarea } from '@/components/form/form-textarea';
import { FormActions } from '@/components/form/form-actions';

interface CategoryFormProps {
    onCancel: () => void;
    onSuccess?: () => void;
    initialData?: {
        category_name: string;
        description: string;
    };
    submitRoute: string;
    method?: 'post' | 'put';
    submitLabel?: string;
}

export function CategoryForm({ 
    onCancel, 
    onSuccess, 
    initialData = { category_name: '', description: '' },
    submitRoute,
    method = 'post',
    submitLabel = 'Create Category'
}: CategoryFormProps) {
    const { data, setData, post, put, processing, errors } = useForm({
        category_name: initialData.category_name,
        description: initialData.description,
    });

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
                id="category_name"
                label="Category Name"
                value={data.category_name}
                onChange={(value) => setData('category_name', value)}
                error={errors.category_name}
                placeholder="e.g. Construction Materials"
                required
            />

            <FormTextarea
                id="description"
                label="Description"
                value={data.description}
                onChange={(value) => setData('description', value)}
                error={errors.description}
                placeholder="Briefly describe this category..."
                optional
                rows={3}
            />

            <FormActions
                onCancel={onCancel}
                isProcessing={processing}
                submitLabel={submitLabel}
                processingLabel="Saving..."
            />
        </form>
    );
}