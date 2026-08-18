import type { User, RoleWithPermissions } from '@/interfaces/Interfaces';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectTrigger,
    SelectValue,
    SelectGroup,
    SelectItem,
} from '@/components/ui/select';
import { UserRound, MoveLeft } from 'lucide-react';
import { Head } from '@inertiajs/react';

interface UserProps {
    user: User;
    roles: RoleWithPermissions[];
}

Edit.layout = {
    breadcrumbs: [
        { title: 'Management', href: '/users' },
        { title: 'Users', href: '/users' },
        { title: 'Edit User', href: '/users' },
    ],
};

export default function Edit({ user, roles }: UserProps) {
    const [selectedRoleId, setSelectedRoleId] = useState<string>(
        user.roles?.[0]?.id?.toString() || '',
    );

    // Get the selected role object
    const selectedRole = roles.find(
        (role) => role.id.toString() === selectedRoleId,
    );

    return (
        <div className="mx-10 my-5">
            <Head title={`Edit ${user.name} | Macmac Hardware`} />

            <a
                href="/users"
                className="group mb-6 flex items-center gap-3 text-sm text-slate-400 hover:text-slate-700"
            >
                <MoveLeft className="text-slate-400 transition-colors group-hover:text-slate-700" />
                Back to Users
            </a>

            
            <div className="mb-6 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800">
                    <UserRound className="h-6 w-6 text-slate-500" />
                </div>
                <div>
                    <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                        Edit User: {user.name}
                    </h1>
                    <p className="text-sm text-slate-500">{user.email}</p>
                </div>
            </div>

            {/* Name input */}
            <div className="mb-4">
                <label className="mb-1 block text-xs font-semibold text-slate-500">
                    Name
                </label>
                <Input defaultValue={user.name} className="max-w-md" />
            </div>

            {/* Email input */}
            <div className="mb-4">
                <label className="mb-1 block text-xs font-semibold text-slate-500">
                    Email
                </label>
                <Input defaultValue={user.email} className="max-w-md" />
            </div>

            {/* Role select */}
            <div className="mb-4">
                <label className="mb-1 block text-xs font-semibold text-slate-500">
                    Role
                </label>
                <Select
                    value={selectedRoleId}
                    onValueChange={setSelectedRoleId}
                >
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {roles.map((role) => (
                                <SelectItem
                                    key={role.id}
                                    value={role.id.toString()}
                                >
                                    {role.name}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>

            {/* Show permissions for the selected role */}
            <div className="mb-4">
                <label className="mb-1 block text-xs font-semibold text-slate-500">
                    Permissions
                </label>
                <div className="flex flex-wrap gap-1">
                    {selectedRole?.permissions?.length ? (
                        selectedRole.permissions.map((perm) => (
                            <span
                                key={perm}
                                className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                            >
                                {perm}
                            </span>
                        ))
                    ) : (
                        <span className="text-xs text-slate-400">
                            No permissions
                        </span>
                    )}
                </div>
            </div>

            <Button className="mt-4">Save Changes</Button>
        </div>
    );
}
