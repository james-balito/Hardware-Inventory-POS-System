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

export interface RoleWithPermissions {
    name: string;
    permissions: string[];
}

// User Interface
export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    two_factor_enabled?: boolean;
    roles?: RoleWithPermissions[];        // ← Role names like ['admin']
    role_names?: string;     // ← "admin" or "cashier, manager"
    created_at: string;
    updated_at: string;
}

export interface UserRole {
    id: number;
    user_id: number;
    role: RoleWithPermissions[];
    created_at: string;
    updated_at: string;
}

// Column Interface for TableList
export interface Column {
    label: string;
    key: string;
    render?: (value: any, item: any) => React.ReactNode;
}