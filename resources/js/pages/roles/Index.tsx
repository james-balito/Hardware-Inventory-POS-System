import type { RoleWithPermissions } from '@/interfaces/Interfaces';
import TableList from '@/components/table-list';
import { RolesAndPermissionsTable } from '@/tables/rolesandpermissions';
import { Head } from '@inertiajs/react';
import PageHeader from '@/components/header';
import { Shield } from 'lucide-react';

interface RoleProps {
    roles: RoleWithPermissions[];
}

export default function Index({ roles }: RoleProps) {
    return (
        <div className={`mx-10 my-5`}>
            <Head title={`Roles | MacMac Hardware`} />

            <div className={`mb-5`}>
                <PageHeader
                    headerTitle="Management"
                    icon={<Shield />}
                    title="Roles"
                />
            </div>

            <TableList
                columns={RolesAndPermissionsTable.columns}
                actions={RolesAndPermissionsTable.actions}
                onView={() => {}}
                onEdit={() => {}}
                onDelete={() => {}}
                data={roles}
            />
        </div>
    );
}
