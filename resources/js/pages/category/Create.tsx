import { useForm, router } from '@inertiajs/react';
import { FormTextInput } from '@/components/form/form-text-input';
import { FormTextarea } from '@/components/form/form-textarea';
import { FormSection } from '@/components/form/form-section';
import { FormActions } from '@/components/form/form-actions';
import { FormPageHeader } from '@/components/form/form-page-header';
import { SuccessBanner } from '@/components/form/success-banner';
import { FormLayout } from '@/components/form/form-layout';
import React, { FormEvent, useState } from 'react';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        category_name: '',
        description: '',
    });
    
    const [successMessage, setSuccessMessage] = useState('');

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        post('/categories', {
            onSuccess: () => {
                setSuccessMessage('Category created successfully! Redirecting...');
            },
        });
    }

    return (
        <div className="mx-auto py-8 max-w-2xl">

            {successMessage && <SuccessBanner message={successMessage} />}

            <FormPageHeader
                title="Add New Category"
                subtitle="Inventory"
                backUrl="/categories"
                backLabel='Back to Categories'
            />

            <FormLayout onSubmit={handleSubmit}>
                <FormSection title="Category Details">
                    <FormTextInput
                        id='category_name'
                        label="Category Name"
                        value={data.category_name}
                        onChange={(value) => setData('category_name', value)}
                        error={errors.category_name}
                    />

                    <FormTextarea
                        id='description'
                        label="Description"
                        value={data.description}
                        onChange={(value) => setData('description', value)}
                        error={errors.description}
                    />
                </FormSection>

                <FormActions
                    isProcessing={processing}
                    onCancel={() => router.visit('/categories')}
                />
            </FormLayout>
        </div>
    );
}