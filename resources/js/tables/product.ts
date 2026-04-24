// tables/category.tsx
import { formatDate, formatTime } from "@/components/format-time-and-date";

export const ProductTable = {
    columns: [
        { key: 'product_name', label: 'Product Name' },
        {
            key: 'wholesale_price',
            label: 'Wholesale Price',
            render: (value: number) => `₱${value.toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
        },
        {
            key: 'sale_price',
            label: 'Sale Price',
            render: (value: number) => `₱${value.toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
        },
        {
            key: 'stock_quantity',
            label: 'Stock Quantity',
        },
        {
            key: 'category',  // ← Simple key, no dot notation
            label: 'Category',
            render: (value: any, row: any) => row.category?.category_name || 'No Category'
        },
        {
            key: 'created_at',
            label: 'Created Date',
            render: (value: string) => formatDate(value)
        }
    ],

    actions: ['view', 'edit', 'delete'],  // Fixed: changed from 'action' to 'actions'
};