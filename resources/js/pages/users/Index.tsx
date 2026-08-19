import type { User } from '@/interfaces/Interfaces';
import TableList from '@/components/table-list';
import { UserTable } from '@/tables/users';
import { Head, router } from '@inertiajs/react';
import PageHeader from '@/components/header';
import { UsersRound } from 'lucide-react';
import { useState } from 'react';
import { Modal } from '@/components/modal';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface UserProps {
    users: User[];
}

Index.layout = {
    breadcrumbs: [
        {
            title: 'Users',
            href: '/users',
        },
    ],
};

export default function Index({ users }: UserProps) {
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleShow = (user: User) => {
        setSelectedUser(user);
        setIsModalOpen(true);
    };

    const handleEdit = (user: User) => router.visit(`/users/${user.id}/edit`);

    const handleAddUser = () => router.visit('/users/create');

    return (
        <div className={`mx-10 my-5`}>
            <Head title="Users | Macmac Hardware" />

            <div className = {`flex items-center justify-between`}>
                <PageHeader
                    headerTitle="Management"
                    icon={<UsersRound />}
                    title="Users"
                />

                <Button onClick={handleAddUser}>
                    <Plus />
                    Add User
                </Button>
            </div>

            <div className={`mt-4`}>
                <TableList
                    data={users}
                    columns={UserTable.columns}
                    actions={UserTable.actions}
                    onView={(user) => handleShow(user)}
                    onEdit={(user) => router.visit(`/users/${user.id}/edit`)}
                    onDelete={() => {}}
                    showIndex={false}
                />
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                size="sm"
                title="User Details"
                children={
                    <div className="space-y-3">
                        <div>
                            <p className="text-xs font-medium text-slate-400">
                                Name
                            </p>
                            <p className="font-semibold text-slate-800">
                                {selectedUser?.name}
                            </p>
                        </div>
                        <div>
                            <p className="text-xs font-medium text-slate-400">
                                Email
                            </p>
                            <p className="font-semibold text-slate-800">
                                {selectedUser?.email}
                            </p>
                        </div>
                        <div>
                            <p className="text-xs font-medium text-slate-400">
                                Role
                            </p>
                            <div className="flex flex-wrap gap-1">
                                {selectedUser?.roles?.map((role) => (
                                    <span
                                        key={role.name}
                                        className="rounded-full bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700"
                                    >
                                        {role.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div>
                            <p className="text-xs font-medium text-slate-400">
                                Permissions
                            </p>
                            <div className="flex flex-wrap gap-1">
                                {selectedUser?.roles?.[0]?.permissions?.map(
                                    (perm) => (
                                        <span
                                            key={perm}
                                            className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600"
                                        >
                                            {perm}
                                        </span>
                                    ),
                                )}
                            </div>
                        </div>
                    </div>
                }
            />
        </div>
    );
}
