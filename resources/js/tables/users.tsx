import { RoleWithPermissions } from '@/interfaces/Interfaces';
import { User } from '@/interfaces/Interfaces';

export const UserTable = {
    columns: [
        { key: 'id', label: 'NO.' },
        { key: 'name', label: 'Name' },
        { key: 'email', label: 'Email' },
        {
            key: 'roles',
            label: 'Position',
            render: (value: RoleWithPermissions[], row: User) => (
                <div>
                    {value?.map((role) => (
                        <span key={role.id}>{role.name}</span>
                    )) || <span>No Role</span>}
                </div>
            ),
        },
        {
            key: 'roles',
            label: 'Permissions',
            render: (value: RoleWithPermissions[], row: User) => (
                <div>
                    {value?.map((role) => (
                        <span key={role.id} className ={`flex flex-wrap`}>
                            {role.permissions?.map((perm) => (
                                <span
                                    key={perm}
                                    className="rounded-full bg-slate-100 px-2 py-0.5 mr-1 mb-2 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                                >
                                    {perm}
                                </span>
                            ))}
                        </span>
                    )) || <span>No Permission</span>}
                </div>
            ),
        },
    ],
    actions: ['view', 'edit', 'delete'],
};
