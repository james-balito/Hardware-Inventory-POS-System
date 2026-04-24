// Product Interface
import { Product } from "@/pages/interfaces/Interfaces";

// Form UI Components
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';

// Form Hooks
import { useForm, router } from '@inertiajs/react';
import { FormEvent, useState } from "react";

export default function Edit({ product }: { product: Product }) {
    const { data, setData, put, processing, errors } = useForm({
        product_name: product?.product_name || '',
        description: product?.description || '',
        wholesale_price: product?.wholesale_price || 0,
        sale_price: product?.sale_price || 0,
        stock_quantity: product?.stock_quantity || 0,
        category_id: product?.category_id || 0,
        unit_id: product?.unit_id || 0,
    });

    // useStates
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        put(`/products/${product.id}`, {
            onSuccess: () => {
                setSuccessMessage('Product updated successfully! Redirecting...');
            },
        });
    }


    return (
        <>
            <div>
                {successMessage && (
                    <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
                        {successMessage}
                    </div>
                )}

                <Card>
                    <CardHeader>
                        <CardTitle>Edit Category</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="product_name">Category Name</Label>
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
                                <Label htmlFor="description">Description (Optional)</Label>
                                <Textarea
                                    id="description"
                                    value={data.description}
                                    onChange={e => setData('description', e.target.value)}
                                    placeholder="Enter category description"
                                    rows={4}
                                />
                                {errors.description && (
                                    <p className="text-sm text-red-500">{errors.description}</p>
                                )}
                            </div>

                            <div className="flex gap-2">
                                <Button type="submit" disabled={processing}>
                                    {processing ? 'Updating...' : 'Update Category'}
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
                    </CardContent>
                </Card>
            </div>
        </>
    )
}