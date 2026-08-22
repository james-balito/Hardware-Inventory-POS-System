import { FormPageHeader } from '@/components/form/form-page-header';
import { FormSection } from '@/components/form/form-section';
import { FormTextInput } from '@/components/form/form-text-input';
import { useForm } from '@inertiajs/react';
import { useState } from 'react';
import type { RoleWithPermissions } from '@/interfaces/Interfaces';

interface RoleProps {
    roles: RoleWithPermissions[];
}

Create.layout = {
    breadcrumbs: [
        {
            title: 'Management',
            href: '/roles',
        },
         {
            title: 'Roles',
            href: '/roles',
        },
         {
            title: 'Create New Role',
            href: '/roles/create',
        },
    ]
}
export default function Create({ roles }: RoleProps) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        permissions: [] as string[],
    });

    const allPermissions = [
        ...new Set(roles.flatMap((role) => role.permissions)),
    ];

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    // Filter permissions by search
    const filteredPermissions = allPermissions.filter((perm) =>
        perm.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    // Check if all permissions are selected
    const allSelected =
        allPermissions.length > 0 &&
        allPermissions.every((perm) => data.permissions.includes(perm));

    // Toggle single permission
    const togglePermission = (permission: string) => {
        setData(
            'permissions',
            data.permissions.includes(permission)
                ? data.permissions.filter((p) => p !== permission)
                : [...data.permissions, permission],
        );
    };

    // Toggle all permissions
    const toggleAllPermissions = () => {
        setData('permissions', allSelected ? [] : allPermissions);
    };

    return (
        <div className="mx-auto max-w-5xl py-8">
            <FormPageHeader
                title="Add New Role"
                subtitle="Management"
                backUrl="/roles"
                backLabel="Back to Roles"
            />

            <FormSection title="Role Information">
                <FormTextInput
                    id="name"
                    label="Role Name"
                    value={data.name}
                    onChange={(value) => setData('name', value)}
                    error={errors.name}
                    placeholder="e.g. Staff"
                    required
                />

                {/* Multi-Select Permissions */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">
                        Permissions
                    </label>

                    {/* Dropdown trigger */}
                    <div className="relative">
                        <button
                            type="button"
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="flex w-full items-center justify-between rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 transition hover:bg-slate-50"
                        >
                            <span className="truncate">
                                {data.permissions.length > 0
                                    ? `${data.permissions.length} permission(s) selected`
                                    : 'Select permissions'}
                            </span>
                            <svg
                                className={`h-4 w-4 text-slate-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 9l-7 7-7-7"
                                />
                            </svg>
                        </button>

                        {/* Dropdown content */}
                        {isDropdownOpen && (
                            <div className="absolute z-10 mt-1 w-full rounded-lg border border-slate-200 bg-white shadow-lg">
                                {/* Search */}
                                <div className="border-b border-slate-100 p-2">
                                    <input
                                        type="text"
                                        placeholder="Search permissions..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full rounded-md border border-slate-200 px-2 py-1 text-sm outline-none focus:ring-2 focus:ring-blue-400"
                                    />
                                </div>

                                {/* Select All */}
                                <label className="flex cursor-pointer items-center gap-2 border-b border-slate-100 px-3 py-2 hover:bg-slate-50">
                                    <input
                                        type="checkbox"
                                        checked={allSelected}
                                        onChange={toggleAllPermissions}
                                        className="h-4 w-4 cursor-pointer rounded border-slate-300 accent-blue-600"
                                    />
                                    <span className="text-sm font-medium text-slate-700">
                                        Select All
                                    </span>
                                    <span className="ml-auto text-xs text-slate-400">
                                        {data.permissions.length}/{allPermissions.length}
                                    </span>
                                </label>

                                {/* Permission list */}
                                <div className="max-h-56 overflow-y-auto">
                                    {filteredPermissions.length > 0 ? (
                                        filteredPermissions.map((permission) => (
                                            <label
                                                key={permission}
                                                className="flex cursor-pointer items-center gap-2 px-3 py-2 transition hover:bg-slate-50"
                                            >
                                                <input
                                                    type="checkbox"
                                                    checked={data.permissions.includes(permission)}
                                                    onChange={() => togglePermission(permission)}
                                                    className="h-4 w-4 cursor-pointer rounded border-slate-300 accent-blue-600"
                                                />
                                                <span className="text-sm text-slate-700">
                                                    {permission}
                                                </span>
                                            </label>
                                        ))
                                    ) : (
                                        <p className="px-3 py-2 text-sm text-slate-400">
                                            No permissions found
                                        </p>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Selected permissions badges */}
                    {data.permissions.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-1">
                            {data.permissions.map((perm) => (
                                <span
                                    key={perm}
                                    className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700"
                                >
                                    {perm}
                                    <button
                                        type="button"
                                        onClick={() => togglePermission(perm)}
                                        className="ml-1 text-blue-400 hover:text-blue-600"
                                    >
                                        ×
                                    </button>
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            </FormSection>

            {/* Actions */}
            <div className="mt-6 flex items-center gap-3">
                <button
                    type="submit"
                    disabled={processing}
                    className="rounded-lg bg-blue-600 px-6 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50"
                >
                    {processing ? 'Creating...' : 'Create Role'}
                </button>
            </div>
        </div>
    );
}