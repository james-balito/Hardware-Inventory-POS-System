import { ReactNode } from 'react';
import { usePermissions } from '@/hooks/use-permission';

interface CanProps {
    permission?: string;
    permissions?: string[];
    role?: string;
    roles?: string[];
    children: ReactNode;
    fallback?: ReactNode;
}

export function Can({ permission, permissions, role, roles, children, fallback = null }: CanProps) {
    const { can, canAny, hasRole, hasAnyRole } = usePermissions();

    let allowed = true;

    if (permission) allowed = can(permission);
    if (permissions) allowed = canAny(permissions);
    if (role) allowed = hasRole(role);
    if (roles) allowed = hasAnyRole(roles);

    return allowed ? <>{children}</> : <>{fallback}</>;
}