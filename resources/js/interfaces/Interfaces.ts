// Category Database Interface
export interface Category {
    id: number,
    category_name: string,
    description: string,
    created_at: string,
    updated_at: string,
}

// Unit Database Interface
export interface Unit {
    id: number,
    unit_name: string,
    created_at: string,
    updated_at: string,
}

// Product Database Interface
export interface Product {
    id: number;
    product_name: string;
    description: string;
    wholesale_price: number;
    sale_price: number;
    stock_quantity: number;
    category_id: number;
    unit_id: number;
    category?: Category;
    unit?: Unit;
    created_at: string;
    updated_at: string;
}

// Sale Database Interface
export interface SaleProduct {
    id: number;
    product_name: string;
    sale_price: number;
    pivot: {
        quantity: number;
        item_price: number;
        unit: string;
        total: number;
    };

}

export interface Sale {
    id: number;
    invoice_number: string;
    sub_total: number;
    total: number;
    products: SaleProduct[];
    created_at: string;
    updated_at: string;
    delivery_cost?: number;
}

// Column Interface for TableList
export interface Column {
    label: string;
    key: string;
    render?: (value: any, item: any) => React.ReactNode;
}