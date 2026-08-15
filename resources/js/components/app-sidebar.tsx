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
    },
];

const salesNavItems: NavItem[] = [
    {
        title: 'Sales Form',
        href: '/sales/create',
        icon: PlusCircle,
    },
    {
        title: 'Sales',
        href: '/sales',
        icon: Clock,
    },
];

const inventoryNavItems: NavItem[] = [
    {
        title: 'Products',
        href: '/products',
        icon: Package,
    },
    {
        title: 'Categories',
        href: '/categories',
        icon: Tag,
    },
    {
        title: 'Units',
        href: '/units',
        icon: Ruler,
    },
];

const ManagementNavItems: NavItem[] = [
    {
        title: 'Users',
        href: '/users',
        icon: Ruler,
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
