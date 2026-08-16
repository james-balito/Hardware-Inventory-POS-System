import { Link } from '@inertiajs/react';
import {
    LayoutGrid,
    PlusCircle,
    Clock,
    Package,
    Tag,
    Ruler,
} from 'lucide-react';
import AppLogo from '@/components/app-logo';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import type { NavItem } from '@/types';

const generalNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutGrid,
        permission: 'view reports',
    },
];

const salesNavItems: NavItem[] = [
    {
        title: 'Sales Form',
        href: '/sales/create',
        icon: PlusCircle,
        permission: 'create sale',
    },
    {
        title: 'Sales',
        href: '/sales',
        icon: Clock,
        permission: 'view sales',
    },
];

const inventoryNavItems: NavItem[] = [
    {
        title: 'Products',
        href: '/products',
        icon: Package,
        permission: 'view products',
    },
    {
        title: 'Categories',
        href: '/categories',
        icon: Tag,
        permission: 'view category',
    },
    {
        title: 'Units',
        href: '/units',
        icon: Ruler,
        permission: 'view units',
    },
];

const ManagementNavItems: NavItem[] = [
    {
        title: 'Users',
        href: '/users',
        icon: Ruler,
        permission: 'view users',
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={'/dashboard'} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={generalNavItems} />
                <NavMain items={salesNavItems} navLabel="Sales" />
                <NavMain items={inventoryNavItems} navLabel="Inventory" />
                <NavMain items={ManagementNavItems} navLabel="Management" />
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
