import { usePage } from '@inertiajs/react';

interface AuthUser {
    id: number;
    name: string;
    email: string;
    roles: string[];
    permissions: string[];
}

export function usePermissions() {
    const { auth } = usePage().props as unknown as { auth: { user: AuthUser | null } };
    const user = auth?.user;

    const permissions = user?.permissions ?? [];
    const roles = user?.roles ?? [];

    return {
        user,
        roles,
        permissions,
        can: (permission: string) => permissions.includes(permission),
        canAny: (perms: string[]) => perms.some((p) => permissions.includes(p)),
        canAll: (perms: string[]) => perms.every((p) => permissions.includes(p)),
        hasRole: (role: string) => roles.includes(role),
        hasAnyRole: (r: string[]) => r.some((role) => roles.includes(role)),
        hasAllRoles: (r: string[]) => r.every((role) => roles.includes(role)),
    };
}