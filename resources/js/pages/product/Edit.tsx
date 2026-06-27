// Product Interface
import { Product, Category, Unit } from "@/pages/interfaces/Interfaces";

// Form UI Components
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectTrigger, SelectValue, SelectGroup, SelectLabel, SelectItem } from '@/components/ui/select';

// Form Hooks
import { useForm, router } from '@inertiajs/react';
import { FormEvent, useState } from "react";

// Lucide Icons
import { PhilippinePeso } from 'lucide-react';

export default function Edit({ product, categories, units }: {
    product: Product;  
    categories: Category[];
    units: Unit[];
}) {

    console.log('Product prop:', product);
    console.log('Categories prop:', categories);
    console.log('Units prop:', units);

    if (!product || !product.id) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="text-center">
                    <p className="text-red-500 mb-2">Error: Product data not found!</p>
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
                setSuccessMessage('Product updated successfully! Redirecting...');
                setTimeout(() => {
                    router.visit('/products');
                }, 2000);
            },
            preserveScroll: true,
        });
    }

    return (
        <div className="flex justify-center w-full">
            {successMessage && (
                <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
                    {successMessage}
                </div>
            )}

            <div className="border-2 rounded-lg m-8 p-4 w-full max-w-4xl">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-x-8">
                        <div className="space-y-2">
                            <Label htmlFor="product_name">Product Name</Label>
                            <Input
                                id="product_name"
                                value={data.product_name}
                                onChange={e => setData('product_name', e.target.value)}
                                placeholder="Enter product name"
                                required
                            />
                            {errors.product_name && (
                                <p className="text-sm text-red-500">{errors.product_name}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="stock_quantity">Stock Quantity</Label>
                            <Input
                                id="stock_quantity"
                                value={data.stock_quantity}
                                onChange={e => setData('stock_quantity', parseInt(e.target.value) || 0)}
                                placeholder="Enter stock quantity"
                                type="number"
                                step="1"
                                min="0"
                                max="9999"
                                required
                            />
                            {errors.stock_quantity && (
                                <p className="text-sm text-red-500">{errors.stock_quantity}</p>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="wholesale_price">Wholesale Price</Label>
                            <div className="relative">
                                <PhilippinePeso className="absolute h-4 w-4 text-gray-500 top-1/2 -translate-y-1/2 left-3" />
                                <Input
                                    id="wholesale_price"
                                    value={data.wholesale_price}
                                    onChange={e => setData('wholesale_price', parseFloat(e.target.value) || 0)}
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
                                <p className="text-sm text-red-500">{errors.wholesale_price}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="sale_price">Sale Price</Label>
                            <div className="relative">
                                <PhilippinePeso className="absolute h-4 w-4 text-gray-500 top-1/2 -translate-y-1/2 left-3" />
                                <Input
                                    id="sale_price"
                                    value={data.sale_price}
                                    onChange={e => setData('sale_price', parseFloat(e.target.value) || 0)}
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
                                <p className="text-sm text-red-500">{errors.sale_price}</p>
                            )}
                        </div>
                    </div>

                    {/* Categories Select */}
                    <div className="space-y-2">
                        <Label htmlFor="category_id">Category</Label>
                        <Select
                            value={data.category_id.toString()}
                            onValueChange={(value) => setData('category_id', parseInt(value))}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Categories</SelectLabel>
                                    {categories?.map((category) => (
                                        <SelectItem key={category.id} value={category.id.toString()}>
                                            {category.category_name}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        {errors.category_id && (
                            <p className="text-sm text-red-500">{errors.category_id}</p>
                        )}
                    </div>

                    {/* Units Select */}
                    <div className="space-y-2">
                        <Label htmlFor="unit_id">Unit</Label>
                        <Select
                            value={data.unit_id.toString()}
                            onValueChange={(value) => setData('unit_id', parseInt(value))}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select a unit" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Units</SelectLabel>
                                    {units?.map((unit) => (
                                        <SelectItem key={unit.id} value={unit.id.toString()}>
                                            {unit.unit_name}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        {errors.unit_id && (
                            <p className="text-sm text-red-500">{errors.unit_id}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Description (Optional)</Label>
                        <Textarea
                            id="description"
                            value={data.description}
                            onChange={e => setData('description', e.target.value)}
                            placeholder="Enter product description"
                            rows={4}
                        />
                        {errors.description && (
                            <p className="text-sm text-red-500">{errors.description}</p>
                        )}
                    </div>

                    <div className="flex gap-2">
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
    );
}