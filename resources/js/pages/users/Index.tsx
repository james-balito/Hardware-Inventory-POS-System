import type { UserRole } from '@/interfaces/Interfaces';
import TableList from '@/components/table-list';
import { UserTable } from '@/tables/users';
import { Head } from '@inertiajs/react';
import PageHeader from '@/components/header';
import { UsersRound } from 'lucide-react';

interface UserRoleProps {
    users: UserRole[];
}

Index.layout = {
    breadcrumbs: [
        {
            title: 'Users',
            href: '/users',
        },
    ],
};
export default function Index({ users }: UserRoleProps) {
    return (
        <div className={`mx-10 my-5`}>
            <Head title="Users | Macmac Hardware" />
            <PageHeader
                headerTitle="Management"
                icon={<UsersRound />}
                title="Users"
            />

            <div className={`mt-4`}>
                <TableList
                    data={users}
                    columns={UserTable.columns}
                    showIndex={false}
                />
            </div>
        </div>
    );
}
