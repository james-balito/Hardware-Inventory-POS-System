// Product Interface
import { Product, Category, Unit } from '@/interfaces/Interfaces';

// Form UI Components
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
    Select,
    SelectContent,
    SelectTrigger,
    SelectValue,
    SelectGroup,
    SelectLabel,
    SelectItem,
} from '@/components/ui/select';

// Form Hooks
import { useForm, router } from '@inertiajs/react';
import { FormEvent, useState } from 'react';

// Lucide Icons
import {
    PhilippinePeso,
    PackageSearch,
    CheckCircle2,
    ArrowLeft,
} from 'lucide-react';

import { Head } from '@inertiajs/react';

Edit.layout = (props: { product: Product }) => ({
    breadcrumbs: [
        {
            title: 'Inventory',
            href: '/products/edit',
        },
        {
            title: 'Product',
            href: '/products/edit',
        },
        {
            title: 'Edit Product',
            href: '/products/edit',
        },
        {
            title: props.product.product_name,
            href: '/products/edit',
        },
    ],
});

export default function Edit({
    product,
    categories,
    units,
}: {
    product: Product;
    categories: Category[];
    units: Unit[];
}) {
    if (!product || !product.id) {
        return (
            <div className="flex h-screen items-center justify-center">
                <div className="text-center">
                    <p className="mb-2 text-red-500">
                        Error: Product data not found!
                    </p>
                    <Button onClick={() => router.visit('/products')}>
                        Back to Products
                    </Button>
                </div>
            </div>
        );
    }

    const { data, setData, put, processing, errors } = useForm({
        product_name: product.product_name || '',
        description: product.description || '',
        wholesale_price: product.wholesale_price || 0,
        sale_price: product.sale_price || 0,
        stock_quantity: product.stock_quantity || 0,
        category_id: product.category_id || 0,
        unit_id: product.unit_id || 0,
    });

    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // FIX 4: Product.id is now directly accessible
        put(`/products/${product.id}`, {
            onSuccess: () => {
                setSuccessMessage(
                    'Product updated successfully! Redirecting...',
                );
                setTimeout(() => {
                    router.visit('/products');
                }, 2000);
            },
            preserveScroll: true,
        });
    };

    return (
        <div className="flex w-full flex-col items-center px-4 py-10">
            <div className="w-full max-w-4xl">
                {/* Header */}
                <Head
                    title={`Edit Product - ${product.product_name} | Macmac Hardware`}
                />
                <div className="mb-6 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                            <PackageSearch className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                            <h1 className="text-lg font-semibold text-slate-900">
                                Edit Product
                            </h1>
                            <p className="text-sm text-slate-500">
                                {product.product_name}
                            </p>
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={() => router.visit('/products')}
                        className="flex cursor-pointer items-center gap-1.5 text-sm text-slate-500 transition-colors hover:text-slate-800"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Products
                    </button>
                </div>

                {successMessage && (
                    <div className="mb-6 flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-700">
                        <CheckCircle2 className="h-4 w-4 shrink-0" />
                        {successMessage}
                    </div>
                )}

                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Basic Information */}
                        <div className="space-y-4">
                            <div>
                                <h2 className="text-sm font-semibold text-slate-900">
                                    Basic Information
                                </h2>
                                <p className="text-xs text-slate-400">
                                    Product name and stock on hand
                                </p>
                            </div>
                            <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="product_name">
                                        Product Name{' '}
                                        <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        id="product_name"
                                        value={data.product_name}
                                        onChange={(e) =>
                                            setData(
                                                'product_name',
                                                e.target.value,
                                            )
                                        }
                                        placeholder="Enter product name"
                                        required
                                    />
                                    {errors.product_name && (
                                        <p className="text-sm text-red-500">
                                            {errors.product_name}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="stock_quantity">
                                        Stock Quantity{' '}
                                        <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        id="stock_quantity"
                                        value={data.stock_quantity}
                                        onChange={(e) =>
                                            setData(
                                                'stock_quantity',
                                                parseInt(e.target.value) || 0,
                                            )
                                        }
                                        placeholder="Enter stock quantity"
                                        type="number"
                                        step="1"
                                        min="0"
                                        max="9999"
                                        required
                                    />
                                    {errors.stock_quantity && (
                                        <p className="text-sm text-red-500">
                                            {errors.stock_quantity}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="border-t border-slate-100" />

                        {/* Pricing */}
                        <div className="space-y-4">
                            <div>
                                <h2 className="text-sm font-semibold text-slate-900">
                                    Pricing
                                </h2>
                                <p className="text-xs text-slate-400">
                                    Wholesale cost and customer-facing price
                                </p>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="wholesale_price">
                                        Wholesale Price{' '}
                                        <span className="text-red-500">*</span>
                                    </Label>
                                    <div className="relative">
                                        <PhilippinePeso className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-500" />
                                        <Input
                                            id="wholesale_price"
                                            value={data.wholesale_price}
                                            onChange={(e) =>
                                                setData(
                                                    'wholesale_price',
                                                    parseFloat(
                                                        e.target.value,
                                                    ) || 0,
                                                )
                                            }
                                            placeholder="Enter wholesale price"
                                            type="number"
                                            step="0.01"
                                            min="0"
                                            max="9999"
                                            required
                                            className="pl-8"
                                        />
                                    </div>
                                    {errors.wholesale_price && (
                                        <p className="text-sm text-red-500">
                                            {errors.wholesale_price}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="sale_price">
                                        Sale Price{' '}
                                        <span className="text-red-500">*</span>
                                    </Label>
                                    <div className="relative">
                                        <PhilippinePeso className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-500" />
                                        <Input
                                            id="sale_price"
                                            value={data.sale_price}
                                            onChange={(e) =>
                                                setData(
                                                    'sale_price',
                                                    parseFloat(
                                                        e.target.value,
                                                    ) || 0,
                                                )
                                            }
                                            placeholder="Enter sale price"
                                            type="number"
                                            step="0.01"
                                            min="0"
                                            max="9999"
                                            required
                                            className="pl-8"
                                        />
                                    </div>
                                    {errors.sale_price && (
                                        <p className="text-sm text-red-500">
                                            {errors.sale_price}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="border-t border-slate-100" />

                        {/* Classification */}
                        <div className="space-y-4">
                            <div>
                                <h2 className="text-sm font-semibold text-slate-900">
                                    Classification
                                </h2>
                                <p className="text-xs text-slate-400">
                                    How this product is grouped and measured
                                </p>
                            </div>
                            <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="category_id">
                                        Category{' '}
                                        <span className="text-red-500">*</span>
                                    </Label>
                                    <Select
                                        value={data.category_id.toString()}
                                        onValueChange={(value) =>
                                            setData(
                                                'category_id',
                                                parseInt(value),
                                            )
                                        }
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select a category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>
                                                    Categories
                                                </SelectLabel>
                                                {categories?.map((category) => (
                                                    <SelectItem
                                                        key={category.id}
                                                        value={category.id.toString()}
                                                    >
                                                        {category.category_name}
                                                    </SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                    {errors.category_id && (
                                        <p className="text-sm text-red-500">
                                            {errors.category_id}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="unit_id">
                                        Unit{' '}
                                        <span className="text-red-500">*</span>
                                    </Label>
                                    <Select
                                        value={data.unit_id.toString()}
                                        onValueChange={(value) =>
                                            setData('unit_id', parseInt(value))
                                        }
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select a unit" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Units</SelectLabel>
                                                {units?.map((unit) => (
                                                    <SelectItem
                                                        key={unit.id}
                                                        value={unit.id.toString()}
                                                    >
                                                        {unit.unit_name}
                                                    </SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                    {errors.unit_id && (
                                        <p className="text-sm text-red-500">
                                            {errors.unit_id}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="border-t border-slate-100" />

                        {/* Description */}
                        <div className="space-y-4">
                            <div>
                                <h2 className="text-sm font-semibold text-slate-900">
                                    Description
                                </h2>
                                <p className="text-xs text-slate-400">
                                    Optional — shown to staff, not customers
                                </p>
                            </div>
                            <div className="space-y-2">
                                <Textarea
                                    id="description"
                                    value={data.description}
                                    onChange={(e) =>
                                        setData('description', e.target.value)
                                    }
                                    placeholder="Enter product description"
                                    rows={4}
                                />
                                {errors.description && (
                                    <p className="text-sm text-red-500">
                                        {errors.description}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="flex gap-2 pt-2">
                            <Button type="submit" disabled={processing}>
                                {processing ? 'Updating...' : 'Update Product'}
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => router.visit('/products')}
                            >
                                Cancel
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
