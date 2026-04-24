
// Product Database Interface and Props
import { Column, Product } from '@/pages/interfaces/Interfaces';

export interface ProductProps {
    products: Product[];
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
};


