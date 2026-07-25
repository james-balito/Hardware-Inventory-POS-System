import { shortFormatDate, shortFormatTime } from '@/components/format-time-and-date';

export const ProductTable = {
    columns: [
        { key: 'product_name', label: 'Product Name' },
        {
            key: 'wholesale_price',
            label: 'Wholesale Price',
            render: (value: number) =>
                `₱${Number(value).toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
        },
        {
            key: 'sale_price',
            label: 'Sale Price',
            render: (value: number) =>
                `₱${Number(value).toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
        },
        {
            key: 'stock_quantity',
            label: 'Stock Quantity',
            render: (value: number, row: any) => {
                const unit_abbreviation = row.unit?.abbreviation || 'unit';
                const outOfStock = 'Out of Stock';
                const inStock = 'In Stock';
                const lowStock = 'Low Stock';
                const displayValue =
                    value > 1
                        ? `${unit_abbreviation.toLowerCase()}s`
                        : unit_abbreviation.toLowerCase();

                // Show warning border for low stock (less than 5)
                if (value >= 5) {
                    return (
                        <div>
                            <span className="inline-block rounded-xl border border-green-400 bg-green-50 px-2 py-1 text-xs font-medium text-green-700">
                                {value} {displayValue}
                            </span>
                            <span className={`text-xs text-green-600`}>
                                &nbsp; {inStock}
                            </span>
                        </div>
                    );
                }
                // Low Stock
                if (value >= 1) {
                    return (
                        <div>
                            <span className="inline-block rounded-xl border border-orange-400 bg-orange-50 px-2 py-1 text-xs font-medium text-orange-700">
                                {value} {displayValue}
                            </span>
                            <span className={`text-xs text-orange-600`}>
                                &nbsp; {lowStock}
                            </span>
                        </div>
                    );
                }

                // Out of stock - red border
                if (value === 0) {
                    return (
                        <div>
                            <span className="inline-block rounded-xl border border-red-400 bg-red-50 px-2 py-1 text-xs font-medium text-red-700">
                                {value} {displayValue}
                            </span>
                            <span className={`text-xs text-red-500`}>
                                &nbsp; {outOfStock}
                            </span>
                        </div>
                    );
                }

                // Normal stock - no special styling
                return `${value} ${displayValue}`;
            },
        },
        {
            key: 'category',
            label: 'Category',
            render: (_value: any, row: any) =>
                row.category?.category_name || 'No Category',
        },
        {
            key: 'created_at',
            label: 'Created Date',
            render: (value: string) => {
                return `${shortFormatDate(value)} ${shortFormatTime(value)}`;
            }
        },
    ],

    actions: ['view', 'edit', 'delete'],
};
