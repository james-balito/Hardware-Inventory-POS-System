import type { RoleWithPermissions } from '@/interfaces/Interfaces';
import TableList from '@/components/table-list';
import { RolesAndPermissionsTable } from '@/tables/rolesandpermissions';
import { Head, router } from '@inertiajs/react';
import PageHeader from '@/components/header';
import { Shield, Plus } from 'lucide-react';
import { Modal } from '@/components/modal';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface RoleProps {
    roles: RoleWithPermissions[];
}

Index.layout = {
    breadcrumbs: [
        {
            title: 'Management',
            href: '/roles',
        },
        {
            title: 'Roles',
            href: '/roles',
        },
    ],
};

export default function Index({ roles }: RoleProps) {
    const [openModal, setOpenModal] = useState(false);
    const [selectedRole, setSelectedRole] =
        useState<RoleWithPermissions | null>(null);

    const handleView = (role: RoleWithPermissions) => {
        console.log('Viewing role:', role);
        setSelectedRole(role);
        setOpenModal(true);
    };

    const handleAddRole = () => {
        router.visit('/roles/create');
    };

    return (
        <div className={`mx-10 my-5`}>
            <Head title={`Roles | MacMac Hardware`} />

            <div className={`mb-5 flex items-center justify-between`}>
                <PageHeader
                    headerTitle="Management"
                    icon={<Shield />}
                    title="Roles"
                />
                {roles.length >= 1 && (
                    <Button onClick={handleAddRole}>
                        <Plus /> Add Role
                    </Button>
                )}
            </div>

            <TableList
                columns={RolesAndPermissionsTable.columns}
                actions={RolesAndPermissionsTable.actions}
                onView={handleView}
                onEdit={() => {}}
                onDelete={() => {}}
                data={roles}
            />

            <Modal
                isOpen={openModal}
                onClose={() => setOpenModal(false)}
                title="View Role"
                children={
                    <>
                        <div className={`flex flex-col`}>
                            <span
                                className={`mb-3 text-sm font-semibold text-slate-900 dark:border-slate-700 dark:text-slate-100`}
                            >
                                Name
                            </span>
                            <span>
                                {selectedRole?.name?.[0].toUpperCase()}
                                {selectedRole?.name.slice(1)}
                            </span>

                            <span
                                className={`mt-2 mb-3 border-t-2 border-slate-200 pt-3 text-sm font-semibold text-slate-900 dark:border-slate-700 dark:text-slate-100`}
                            >
                                Permissions
                            </span>
                        </div>

                        <div className={`flex flex-wrap`}>
                            {selectedRole?.permissions.map((perm) => (
                                <span
                                    className={`mr-1 mb-2 rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300`}
                                >
                                    {perm}
                                </span>
                            ))}
                        </div>
                    </>
                }
            />
        </div>
    );
}
