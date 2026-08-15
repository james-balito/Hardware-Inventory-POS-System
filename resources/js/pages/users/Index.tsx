import type { User } from '@/interfaces/Interfaces';
import TableList from '@/components/table-list';
import { UserTable } from '@/tables/users';
import { Head } from '@inertiajs/react';
import PageHeader from '@/components/header';
import { UsersRound } from 'lucide-react';

interface UserProps {
    users: User[];
}

Index.layout = {
    breadcrumbs: [
        {
            title: 'Users',
            href: '/users'
        }
    ]
}
export default function Index({ users }: UserProps) {
    return (
        <div className = {`mx-10 my-5`}>
            <Head title="Users | Macmac Hardware" />
            <PageHeader
                headerTitle="Inventory"
                icon={<UsersRound />}
                title="Products"
            />

            <div className = {`mt-4`}>
                <TableList data={users} columns={UserTable.columns} />
            </div>
        </div>
    );
}
