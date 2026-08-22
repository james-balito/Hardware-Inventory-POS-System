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
                        <span key={role.id}>{(role.name).charAt(0).toUpperCase() + role.name.slice(1)}</span>
                    )) || <span>No Role</span>}
                </div>
            ),
        },
    ],
    actions: ['view', 'edit', 'delete'],
};
