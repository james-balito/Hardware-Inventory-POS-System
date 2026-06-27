// resources/js/tables/sales.ts
import { formatDate, formatTime } from "@/components/format-time-and-date";

export const SaleTable = {
    columns: [
        { 
            key: 'invoice_number', 
            label: 'Invoice #',
        },
        { 
            key: 'products', 
            label: 'Products Ordered',
            render: (_: any, row: any) => {
                const productNames = row.products?.map((p: any) => p.product_name) || [];
                
                if (productNames.length === 0) return '—';
                
                // Show first product name + count of remaining
                if (productNames.length === 1) {
                    return productNames[0];
                }
                
                return `${productNames[0]} +${productNames.length - 1} more`;
            }
        },
        { 
            key: 'item_count', 
            label: 'Items',
            render: (_: any, row: any) => {
                const totalQty = row.products?.reduce((sum: number, p: any) => {
                    return sum + (p.pivot?.quantity || 0);
                }, 0) || 0;
                return totalQty;
            }
        },
        {
            key: 'total',
            label: 'Total',
            render: (value: number) => `₱${Number(value).toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
        },
        {
            key: 'created_at',
            label: 'Date',
            render: (value: string) => formatDate(value)
        },
        {
            key: 'created_at',
            label: 'Time',
            render: (value: string) => formatTime(value)
        }
    ],

    actions: ['view'],
};