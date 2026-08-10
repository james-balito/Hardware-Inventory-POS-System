// resources/js/Pages/Products/Create.tsx
import { useForm, router } from '@inertiajs/react';
import { PhilippinePeso, Package } from 'lucide-react';
import { FormEvent, useState } from 'react';
import type { Unit } from '@/types/unit';
import type { Category } from '@/types/category';
import { FormTextInput } from '@/components/form/form-text-input';
import { FormNumberInput } from '@/components/form/form-number-input';
import { FormTextarea } from '@/components/form/form-textarea';
import { FormSelect } from '@/components/form/form-select';
import { FormSection } from '@/components/form/form-section';
import { FormActions } from '@/components/form/form-actions';
import { FormPageHeader } from '@/components/form/form-page-header';
import { SuccessBanner } from '@/components/form/success-banner';
import { FormLayout } from '@/components/form/form-layout';
import { ProductPreview } from '@/components/product-preview';

Create.layout =  {
    breadcrumbs: [
        {
            title: 'Inventory',
            href: '/products',
        },
        {
            title: 'Products',
            href: '/products',
        },
        {
            title: 'Add New Product',
            href: '/products/create',
        },
    ]
}

export default function Create({ categories, units }: { categories: Category[], units: Unit[] }) {
    const { data, setData, post, processing, errors } = useForm({
        product_name: '',
        description: '',
        wholesale_price: '',
        sale_price: '',
        stock_quantity: '',
        category_id: '',
        unit_id: '',
    });

    const [successMessage, setSuccessMessage] = useState('');

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        post('/products', {
            onSuccess: () => setSuccessMessage('Product created successfully! Redirecting...'),
        });
    }

    const selectedCategory = categories.find(c => c.id.toString() === data.category_id);
    const selectedUnit = units.find(u => u.id.toString() === data.unit_id);
    const margin = Number(data.sale_price) - Number(data.wholesale_price);

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900/10">
            <div className="max-w-5xl mx-auto py-8">
                <FormPageHeader 
                    title="Add New Product"
                    subtitle="Inventory"
                    backUrl="/products" 
                    backLabel="Back to Products"
                />

                <SuccessBanner message={successMessage} />

                <FormLayout 
                    onSubmit={handleSubmit}
                    sidebar={
                        <div className="sticky top-8 space-y-4">
                            {/* Your preview component here */}
                            <ProductPreview 
                                name={data.product_name}
                                salePrice={data.sale_price}
                                wholesalePrice={data.wholesale_price}
                                stock={data.stock_quantity}
                                category={selectedCategory}
                                unit={selectedUnit}
                                margin={margin}
                            />
                        </div>
                    }
                >
                    <FormSection title="Product Information">
                        <FormTextInput
                            id="product_name"
                            label="Product Name"
                            value={data.product_name}
                            onChange={(value) => setData('product_name', value)}
                            error={errors.product_name}
                            placeholder="e.g. Concrete Mix 40kg"
                            required
                        />
                        <FormTextarea
                            id="description"
                            label="Description"
                            value={data.description}
                            onChange={(value) => setData('description', value)}
                            error={errors.description}
                            placeholder="Briefly describe this product..."
                            optional
                        />
                    </FormSection>

                    <FormSection title="Pricing & Stock">
                        <div className="grid grid-cols-3 gap-4">
                            <FormNumberInput
                                id="wholesale_price"
                                label="Wholesale"
                                value={data.wholesale_price}
                                onChange={(value) => setData('wholesale_price', value)}
                                error={errors.wholesale_price}
                                placeholder="0.00"
                                icon={<PhilippinePeso className="w-4 h-4" />}
                                min={0}
                                required
                            />
                            <FormNumberInput
                                id="sale_price"
                                label="Sale Price"
                                value={data.sale_price}
                                onChange={(value) => setData('sale_price', value)}
                                error={errors.sale_price}
                                placeholder="0.00"
                                icon={<PhilippinePeso className="w-4 h-4" />}
                                min={0}
                                required
                            />
                            <FormNumberInput
                                id="stock_quantity"
                                label="Stock Qty"
                                value={data.stock_quantity}
                                onChange={(value) => setData('stock_quantity', value)}
                                error={errors.stock_quantity}
                                placeholder="0"
                                min={0}
                                required
                            />
                        </div>
                    </FormSection>

                    <FormSection title="Classification">
                        <div className="grid grid-cols-2 gap-4">
                            <FormSelect
                                id="category_id"
                                label="Category"
                                value={data.category_id}
                                onChange={(value) => setData('category_id', value)}
                                options={categories.map(c => ({ id: c.id, name: c.category_name }))}
                                error={errors.category_id}
                                placeholder="Select a category"
                                groupLabel="Categories"
                                required
                            />
                            <FormSelect
                                id="unit_id"
                                label="Unit"
                                value={data.unit_id}
                                onChange={(value) => setData('unit_id', value)}
                                options={units.map(u => ({ id: u.id, name: u.unit_name }))}
                                error={errors.unit_id}
                                placeholder="Select a unit"
                                groupLabel="Units"
                                required
                            />
                        </div>
                    </FormSection>

                    <FormActions
                        onCancel={() => router.visit('/products')}
                        isProcessing={processing}
                        submitLabel="Create Product"
                        processingLabel="Creating..."
                    />
                </FormLayout>
            </div>
        </div>
    );
}