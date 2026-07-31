
// Product Database Interface and Props
import { Column, Product, Category, Unit } from '@/interfaces/Interfaces';

export interface ProductProps {
    products: Product[];
    categories: Category[];
    units: Unit[];
}

export interface CategoryProps {
    categories: Category[]
}

export interface UnitProps {
    units: Unit[]
}

// TableList Props
export interface TableListProps {
    columns: Column[];
    data: any[];
    actions?: string[];
    onView?: (item: any) => void;
    onEdit?: (item: any) => void;
    onDelete?: (item: any) => void;
    showIndex?: boolean;
    indexLabel?: string;
    indexStartFrom?: number;
    emptyTableMessage?: {
        icon: React.ReactNode;
        title: string;
        description: string;
        buttonText?: string;
        onActionClick?: () => void;
    } | string;
    useDropdown?: boolean;
};


