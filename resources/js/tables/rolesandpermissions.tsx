import { RoleWithPermissions } from '@/interfaces/Interfaces';

export const RolesAndPermissionsTable = {
    columns: [
        {
            key: 'name',
            label: 'Name',
        },
        {
            key: 'permissions',
            label: 'Permissions',
            render: (value: string[]) => (
                <div>
                    <span className={`flex flex-wrap`}>
                        {value.map((permission) => (
                            <span
                                key={permission}
                                className="mr-1 mb-2 rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                            >
                                {permission}
                            </span>
                        ))}
                    </span>
                </div>
            ),
        },
    ],

    actions: ['view', 'edit', 'delete'],
};
