import { Card, CardContent } from "@/components/ui/card";
import { Link, router } from "@inertiajs/react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { create, edit } from "@/routes/products";
import { formatDate, formatTime } from "@/components/format-time-and-date";
import TableList from "@/components/table-list";
import { ProductTable } from "@/tables/product";
import ShowListModal from "@/components/show-list-modal";
import { Product } from "@/pages/interfaces/Interfaces";
import { ProductProps } from "@/pages/interfaces/Props";
import { Package } from "lucide-react";

export default function Index({ products }: ProductProps) {
    const [showProducts, setShowProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setShowProducts(products);
            setLoading(false);
        }, 1000);

        return () => clearTimeout(timeoutId);
    }, [products]);

    const handleShowModal = (product: Product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const handleEdit = (id: number) => {
        console.log(`Edit product with ID: ${id}`);
        router.visit(`/products/${id}/edit`);
    };

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this product?')) {
            console.log(`Delete product with ID: ${id}`);
            router.delete(`/products/${id}`, {
                onSuccess: () => {
                    console.log('Product deleted successfully');
                },
                onError: (errors) => {
                    console.error('Error deleting product:', errors);
                }
            });
        }
    };

    if (loading) {
        return (
            <div className="container py-8">
                <div className="flex justify-between items-center mx-8">
                    <h1 className="text-3xl font-bold">Product List</h1>
                    <Link href={create()} className="inline-block">
                        <Button>Add Product</Button>
                    </Link>
                </div>
                <p className="mx-8 my-4">Loading products...</p>
            </div>
        );
    }

    return (
        <div className="container py-8">
            <div className="flex justify-between items-center mb-6 mx-8">
                <h1 className="text-3xl font-bold">Product List</h1>
                {products.length === 1 && (
                    <Link href={create()} className="inline-block">
                        <Button>Add Product</Button>
                    </Link>
                )}
            </div>

            <div className="mx-8">
                <TableList
                    columns={ProductTable.columns}
                    actions={ProductTable.actions}
                    indexLabel="#"
                    indexStartFrom={1}
                    showIndex={true}
                    data={products}
                    onView={handleShowModal}
                    onEdit={(item) => handleEdit(item.id)}
                    onDelete={(item) => handleDelete(item.id)}
                    emptyTableMessage={{
                        icon: <Package />,
                        title: "No Products Found",
                        description: "Click Add Product to see them listed here.",
                        onActionClick: () => router.visit(create()),
                        buttonText: "Product"
                    }}
                />

                {/* Alternative: Controlled modal approach */}
                {/* <ShowListModal
                trigger={<div style={{ display: 'none' }} />}
                title="Category Details"
                product={selectedProduct || undefined}
                open={isModalOpen}
                onOpenChange={setIsModalOpen}
            /> */}
            </div>
        </div>
    );
}