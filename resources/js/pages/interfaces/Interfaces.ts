// Interfaces for Database Models to display data in the frontend

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

// Column Interface for TableList
export interface Column {
    label: string;
    key: string;
    render?: (value: any, item: any) => React.ReactNode;
}