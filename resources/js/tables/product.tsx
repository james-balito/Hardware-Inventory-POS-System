export const ProductTable = {
    columns: [
        { key: 'product_name', label: 'Product' },
        {
            key: 'category',
            label: 'Category',
            render: (_value: any, row: any) =>
                row.category?.category_name || 'No Category',
        },
        {
            key: 'stock_status',
            label: 'Stock Status',
            render: (_value: any, row: any) => {
                const value = row.stock_quantity; // Read from row, not from key

                if (value >= 5) {
                    return (
                        <span className="text-xs text-green-600 dark:text-green-400">In Stock</span>
                    );
                }
                if (value >= 1) {
                    return (
                        <span className="text-xs text-orange-600 dark:text-orange-400">
                            Low Stock
                        </span>
                    );
                }
                if (value === 0) {
                    return (
                        <span className="text-xs text-red-500 dark:text-red-400">
                            Out of Stock
                        </span>
                    );
                }
                return `${value}`;
            },
        },
        {
            key: 'stock_quantity',
            label: 'Quantity',
            render: (value: number, row: any) => {
                const unit_abbreviation = row.unit?.abbreviation || 'unit';
                const displayValue =
                    value > 1
                        ? `${unit_abbreviation.toLowerCase()}s`
                        : unit_abbreviation.toLowerCase();

                // Show warning border for low stock (less than 5)
                if (value >= 5) {
                    return (
                        <div>
                            <span className="inline-block rounded-xl border border-green-400 bg-green-50 px-2 py-1 text-xs font-medium text-green-700 dark:bg-green-500/10 dark:text-green-400">
                                {value} {displayValue}
                            </span>
                        </div>
                    );
                }
                // Low Stock
                if (value >= 1) {
                    return (
                        <div>
                            <span className="inline-block rounded-xl border border-orange-400 bg-orange-50 px-2 py-1 text-xs font-medium text-orange-700 dark:bg-orange-500/10 dark:text-orange-400">
                                {value} {displayValue}
                            </span>
                        </div>
                    );
                }

                // Out of stock - red border
                if (value === 0) {
                    return (
                        <div>
                            <span className="inline-block rounded-xl border border-red-400 bg-red-50 px-2 py-1 text-xs font-medium text-red-700 dark:bg-red-500/10 dark:text-red-400">
                                {value} {displayValue}
                            </span>
                        </div>
                    );
                }

                // Normal stock - no special styling
                return `${value} ${displayValue}`;
            },
        },
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
            key: 'total_value',
            label: 'Total Value',
            render: (value: number, row: any) => {
                const saleValue = row.sale_price;
                const quantityValue = row.stock_quantity;
                const totalValue = quantityValue * saleValue || '-';
                return `₱${Number(totalValue).toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
            },
        },
        // {
        //     key: 'created_at',
        //     label: 'Created Date',
        //     render: (value: string) => {
        //         return `${shortFormatDate(value)} ${shortFormatTime(value)}`;
        //     },
        // },
    ],

    actions: ['view', 'edit', 'delete'],
};
