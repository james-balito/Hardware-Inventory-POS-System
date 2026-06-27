import { formatDate, formatTime } from "@/components/format-time-and-date";

export const ProductTable = {
    columns: [
        { key: 'product_name', label: 'Product Name' },
        {
            key: 'wholesale_price',
            label: 'Wholesale Price',
            render: (value: number) => `₱${Number(value).toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
        },
        {
            key: 'sale_price',
            label: 'Sale Price',
            render: (value: number) => `₱${Number(value).toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
        },
        {
            key: 'stock_quantity',
            label: 'Stock Quantity',
            render: (value: number, row: any) => {
                const unit_abbreviation = row.unit?.abbreviation || 'No Unit';
                if (value > 1) {
                    return `${value} ${unit_abbreviation.toLowerCase()}s`
                } else {
                    return `${value} ${unit_abbreviation.toLowerCase()}`
                }
            }
        },
        {
            key: 'category',
            label: 'Category',
            render: (_value: any, row: any) => row.category?.category_name || 'No Category'
        },
        {
            key: 'created_at',
            label: 'Created Date',
            render: (value: string) => formatDate(value)
        }
    ],

    actions: ['view', 'edit', 'delete'],
};