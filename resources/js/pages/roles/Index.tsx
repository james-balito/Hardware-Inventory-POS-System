import type { RoleWithPermissions } from '@/interfaces/Interfaces';
import TableList from '@/components/table-list';
import { RolesAndPermissionsTable } from '@/tables/rolesandpermissions';
import { Head, router, useForm } from '@inertiajs/react';
import PageHeader from '@/components/header';
import {
    Shield,
    Plus,
    X,
    Check,
    Search,
    ChevronDown,
    Lock,
    KeyRound,
} from 'lucide-react';
import { Modal } from '@/components/modal';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

// Form components
import { FormLayout } from '@/components/form/form-layout';
import { FormPageHeader } from '@/components/form/form-page-header';
import { FormSection } from '@/components/form/form-section';
import { FormTextInput } from '@/components/form/form-text-input';

interface RoleProps {
    roles: RoleWithPermissions[];
}

Index.layout = {
    breadcrumbs: [
        { title: 'Management', href: '/roles' },
        { title: 'Roles', href: '/roles' },
    ],
};

export default function Index({ roles }: RoleProps) {
    const [openModal, setOpenModal] = useState(false);
    const [selectedRole, setSelectedRole] =
        useState<RoleWithPermissions | null>(null);

    const handleView = (role: RoleWithPermissions) => {
        setSelectedRole(role);
        setOpenModal(true);
    };

    // Create Role functions
    const [openCreateModal, setOpenCreateModal] = useState(false);
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        permissions: [] as string[],
    });

    const allPermissions = [
        ...new Set(roles.flatMap((role) => role.permissions)),
    ];

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredPermissions = allPermissions.filter((perm) =>
        perm.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    const allSelected =
        allPermissions.length > 0 &&
        allPermissions.every((perm) => data.permissions.includes(perm));

    const togglePermission = (permission: string) => {
        setData(
            'permissions',
            data.permissions.includes(permission)
                ? data.permissions.filter((p) => p !== permission)
                : [...data.permissions, permission],
        );
    };

    const toggleAllPermissions = () => {
        setData('permissions', allSelected ? [] : allPermissions);
    };

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        post('/roles', {
            onSuccess: () => {
                setOpenCreateModal(false);
                setData('name', '');
                setData('permissions', []);
                setSearchTerm('');
                setIsDropdownOpen(false);
            },
        });
    }


    // Edit Role functions
    const [openEditModal, setOpenEditModal] = useState(false);

    const handleEdit = (role: RoleWithPermissions) => {
        setSelectedRole(role);
        setOpenEditModal(true);
    };

    return (
        <div className="mx-10 my-5">
            <Head title="Roles | MacMac Hardware" />

            <div className="mb-6 flex items-end justify-between">
                <PageHeader
                    headerTitle="Management"
                    icon={<Shield />}
                    title="Roles"
                />
                <Button
                    onClick={() => setOpenCreateModal(true)}
                    className="flex items-center gap-2 bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-600"
                >
                    <Plus className="h-4 w-4" />
                    Add Role
                </Button>
            </div>

            <TableList
                columns={RolesAndPermissionsTable.columns}
                actions={RolesAndPermissionsTable.actions}
                onView={handleView}
                onEdit={() => {}}
                onDelete={() => {}}
                data={roles}
            />

            {/* View Role Modal */}
            <Modal
                isOpen={openModal}
                onClose={() => setOpenModal(false)}
                title="Role Details"
                size="sm"
                children={
                    <div className="space-y-4">
                        <div>
                            <p className="text-xs font-semibold tracking-wider text-slate-400 uppercase">
                                Role Name
                            </p>
                            <div className="mt-1 flex items-center gap-2">
                                <Shield className="h-4 w-4 text-slate-500" />
                                <span className="text-lg font-semibold text-slate-900 capitalize dark:text-slate-100">
                                    {selectedRole?.name}
                                </span>
                            </div>
                        </div>

                        <div className="border-t border-slate-200 pt-4 dark:border-slate-700">
                            <p className="text-xs font-semibold tracking-wider text-slate-400 uppercase">
                                Permissions ({selectedRole?.permissions.length})
                            </p>
                            <div className="mt-2 flex flex-wrap gap-1.5">
                                {selectedRole?.permissions.map((perm) => {
                                    const action = perm.startsWith('view')
                                        ? 'view'
                                        : perm.startsWith('create')
                                          ? 'create'
                                          : perm.startsWith('edit')
                                            ? 'edit'
                                            : perm.startsWith('delete')
                                              ? 'delete'
                                              : 'default';

                                    const styles = {
                                        view: 'border-sky-200 bg-sky-50 text-sky-700 dark:border-sky-800 dark:bg-sky-900/40 dark:text-sky-300',
                                        create: 'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300',
                                        edit: 'border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-800 dark:bg-amber-900/40 dark:text-amber-300',
                                        delete: 'border-red-200 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-900/40 dark:text-red-300',
                                        default:
                                            'border-slate-200 bg-slate-50 text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300',
                                    }[action];

                                    return (
                                        <span
                                            key={perm}
                                            className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium ${styles}`}
                                        >
                                            {perm}
                                        </span>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                }
            />

            {/* Create Role Modal */}
            <Modal
                isOpen={openCreateModal}
                onClose={() => setOpenCreateModal(false)}
                title="Create New Role"
                size="lg"
                children={
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Role Name */}
                        <div>
                            <label className="mb-1.5 block text-xs font-semibold tracking-wider text-slate-400 uppercase">
                                Role Name
                            </label>
                            <div className="relative">
                                <Lock className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
                                <Input
                                    value={data.name}
                                    onChange={(e) =>
                                        setData('name', e.target.value)
                                    }
                                    placeholder="e.g. Staff"
                                    className="pl-9"
                                />
                            </div>
                            {errors.name && (
                                <p className="mt-1 text-xs text-red-500">
                                    {errors.name}
                                </p>
                            )}
                        </div>

                        {/* Permissions Multi-Select */}
                        <div>
                            <label className="mb-1.5 block text-xs font-semibold tracking-wider text-slate-400 uppercase">
                                Permissions
                            </label>

                            <div className="relative">
                                {/* Trigger */}
                                <button
                                    type="button"
                                    onClick={() =>
                                        setIsDropdownOpen(!isDropdownOpen)
                                    }
                                    className="flex w-full items-center justify-between rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 transition hover:border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:border-slate-600"
                                >
                                    <span className="truncate">
                                        {data.permissions.length > 0
                                            ? `${data.permissions.length} selected`
                                            : 'Select permissions...'}
                                    </span>
                                    <ChevronDown
                                        className={`h-4 w-4 text-slate-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                                    />
                                </button>

                                {/* Dropdown */}
                                {isDropdownOpen && (
                                    <div className="absolute z-10 mt-1 w-full rounded-lg border border-slate-200 bg-white shadow-xl dark:border-slate-700 dark:bg-slate-800">
                                        {/* Search */}
                                        <div className="border-b border-slate-100 p-2 dark:border-slate-700">
                                            <div className="relative">
                                                <Search className="absolute top-1/2 left-2.5 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
                                                <input
                                                    type="text"
                                                    placeholder="Search..."
                                                    value={searchTerm}
                                                    onChange={(e) =>
                                                        setSearchTerm(
                                                            e.target.value,
                                                        )
                                                    }
                                                    className="w-full rounded-md border border-slate-200 bg-white py-1.5 pr-3 pl-8 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-blue-400 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-200"
                                                />
                                            </div>
                                        </div>

                                        {/* Select All */}
                                        <button
                                            type="button"
                                            onClick={toggleAllPermissions}
                                            className="flex w-full cursor-pointer items-center gap-2 border-b border-slate-100 px-3 py-2.5 text-left transition hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-700/50"
                                        >
                                            <span
                                                className={`flex h-4 w-4 items-center justify-center rounded border ${
                                                    allSelected
                                                        ? 'border-blue-600 bg-blue-600'
                                                        : 'border-slate-300 dark:border-slate-600'
                                                }`}
                                            >
                                                {allSelected && (
                                                    <Check className="h-3 w-3 text-white" />
                                                )}
                                            </span>
                                            <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
                                                Select All
                                            </span>
                                            <span className="ml-auto text-xs text-slate-400">
                                                {data.permissions.length}/
                                                {allPermissions.length}
                                            </span>
                                        </button>

                                        {/* List */}
                                        <div className="max-h-52 overflow-y-auto">
                                            {filteredPermissions.length > 0 ? (
                                                filteredPermissions.map(
                                                    (permission) => (
                                                        <button
                                                            key={permission}
                                                            type="button"
                                                            onClick={() =>
                                                                togglePermission(
                                                                    permission,
                                                                )
                                                            }
                                                            className="flex w-full cursor-pointer items-center gap-2 px-3 py-2 text-left transition hover:bg-slate-50 dark:hover:bg-slate-700/50"
                                                        >
                                                            <span
                                                                className={`flex h-4 w-4 items-center justify-center rounded border ${
                                                                    data.permissions.includes(
                                                                        permission,
                                                                    )
                                                                        ? 'border-blue-600 bg-blue-600'
                                                                        : 'border-slate-300 dark:border-slate-600'
                                                                }`}
                                                            >
                                                                {data.permissions.includes(
                                                                    permission,
                                                                ) && (
                                                                    <Check className="h-3 w-3 text-white" />
                                                                )}
                                                            </span>
                                                            <span className="text-sm text-slate-700 dark:text-slate-200">
                                                                {permission}
                                                            </span>
                                                        </button>
                                                    ),
                                                )
                                            ) : (
                                                <p className="px-3 py-3 text-sm text-slate-400">
                                                    No permissions found
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Selected badges */}
                            {data.permissions.length > 0 && (
                                <div className="mt-2 flex flex-wrap gap-1.5">
                                    {data.permissions.map((perm) => (
                                        <span
                                            key={perm}
                                            className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700 dark:bg-blue-900/40 dark:text-blue-300"
                                        >
                                            {perm}
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    togglePermission(perm)
                                                }
                                                className="ml-0.5 rounded-full p-0.5 transition hover:bg-blue-200 dark:hover:bg-blue-800"
                                            >
                                                <X className="h-3 w-3" />
                                            </button>
                                        </span>
                                    ))}
                                </div>
                            )}
                            {errors.permissions && (
                                <p className="mt-1 text-xs text-red-500">
                                    {errors.permissions}
                                </p>
                            )}
                        </div>

                        {/* Actions */}
                        <div className="flex items-center justify-end gap-3 border-t border-slate-200 pt-4 dark:border-slate-700">
                            <button
                                type="button"
                                onClick={() => setOpenCreateModal(false)}
                                className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700/50"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={
                                    processing ||
                                    !data.name ||
                                    data.permissions.length === 0
                                }
                                className="rounded-lg bg-blue-600 px-6 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400"
                            >
                                {processing ? 'Creating...' : 'Create Role'}
                            </button>
                        </div>
                    </form>
                }
            />

            <Modal
                isOpen={openEditModal}
                onClose={() => setOpenEditModal(false)}
                title = "Edit Role Details"
                children={
                    <>
                        {' '}
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Role Name */}
                            <div>
                                <label className="mb-1.5 block text-xs font-semibold tracking-wider text-slate-400 uppercase">
                                    Role Name
                                </label>
                                <div className="relative">
                                    <Lock className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
                                    <Input
                                        value={data.name}
                                        onChange={(e) =>
                                            setData('name', e.target.value)
                                        }
                                        placeholder="e.g. Staff"
                                        className="pl-9"
                                    />
                                </div>
                                {errors.name && (
                                    <p className="mt-1 text-xs text-red-500">
                                        {errors.name}
                                    </p>
                                )}
                            </div>

                            {/* Permissions Multi-Select */}
                            <div>
                                <label className="mb-1.5 block text-xs font-semibold tracking-wider text-slate-400 uppercase">
                                    Permissions
                                </label>

                                <div className="relative">
                                    {/* Trigger */}
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setIsDropdownOpen(!isDropdownOpen)
                                        }
                                        className="flex w-full items-center justify-between rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 transition hover:border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:border-slate-600"
                                    >
                                        <span className="truncate">
                                            {data.permissions.length > 0
                                                ? `${data.permissions.length} selected`
                                                : 'Select permissions...'}
                                        </span>
                                        <ChevronDown
                                            className={`h-4 w-4 text-slate-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                                        />
                                    </button>

                                    {/* Dropdown */}
                                    {isDropdownOpen && (
                                        <div className="absolute z-10 mt-1 w-full rounded-lg border border-slate-200 bg-white shadow-xl dark:border-slate-700 dark:bg-slate-800">
                                            {/* Search */}
                                            <div className="border-b border-slate-100 p-2 dark:border-slate-700">
                                                <div className="relative">
                                                    <Search className="absolute top-1/2 left-2.5 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
                                                    <input
                                                        type="text"
                                                        placeholder="Search..."
                                                        value={searchTerm}
                                                        onChange={(e) =>
                                                            setSearchTerm(
                                                                e.target.value,
                                                            )
                                                        }
                                                        className="w-full rounded-md border border-slate-200 bg-white py-1.5 pr-3 pl-8 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-blue-400 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-200"
                                                    />
                                                </div>
                                            </div>

                                            {/* Select All */}
                                            <button
                                                type="button"
                                                onClick={toggleAllPermissions}
                                                className="flex w-full cursor-pointer items-center gap-2 border-b border-slate-100 px-3 py-2.5 text-left transition hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-700/50"
                                            >
                                                <span
                                                    className={`flex h-4 w-4 items-center justify-center rounded border ${
                                                        allSelected
                                                            ? 'border-blue-600 bg-blue-600'
                                                            : 'border-slate-300 dark:border-slate-600'
                                                    }`}
                                                >
                                                    {allSelected && (
                                                        <Check className="h-3 w-3 text-white" />
                                                    )}
                                                </span>
                                                <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
                                                    Select All
                                                </span>
                                                <span className="ml-auto text-xs text-slate-400">
                                                    {data.permissions.length}/
                                                    {allPermissions.length}
                                                </span>
                                            </button>

                                            {/* List */}
                                            <div className="max-h-52 overflow-y-auto">
                                                {filteredPermissions.length >
                                                0 ? (
                                                    filteredPermissions.map(
                                                        (permission) => (
                                                            <button
                                                                key={permission}
                                                                type="button"
                                                                onClick={() =>
                                                                    togglePermission(
                                                                        permission,
                                                                    )
                                                                }
                                                                className="flex w-full cursor-pointer items-center gap-2 px-3 py-2 text-left transition hover:bg-slate-50 dark:hover:bg-slate-700/50"
                                                            >
                                                                <span
                                                                    className={`flex h-4 w-4 items-center justify-center rounded border ${
                                                                        data.permissions.includes(
                                                                            permission,
                                                                        )
                                                                            ? 'border-blue-600 bg-blue-600'
                                                                            : 'border-slate-300 dark:border-slate-600'
                                                                    }`}
                                                                >
                                                                    {data.permissions.includes(
                                                                        permission,
                                                                    ) && (
                                                                        <Check className="h-3 w-3 text-white" />
                                                                    )}
                                                                </span>
                                                                <span className="text-sm text-slate-700 dark:text-slate-200">
                                                                    {permission}
                                                                </span>
                                                            </button>
                                                        ),
                                                    )
                                                ) : (
                                                    <p className="px-3 py-3 text-sm text-slate-400">
                                                        No permissions found
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Selected badges */}
                                {data.permissions.length > 0 && (
                                    <div className="mt-2 flex flex-wrap gap-1.5">
                                        {data.permissions.map((perm) => (
                                            <span
                                                key={perm}
                                                className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700 dark:bg-blue-900/40 dark:text-blue-300"
                                            >
                                                {perm}
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        togglePermission(perm)
                                                    }
                                                    className="ml-0.5 rounded-full p-0.5 transition hover:bg-blue-200 dark:hover:bg-blue-800"
                                                >
                                                    <X className="h-3 w-3" />
                                                </button>
                                            </span>
                                        ))}
                                    </div>
                                )}
                                {errors.permissions && (
                                    <p className="mt-1 text-xs text-red-500">
                                        {errors.permissions}
                                    </p>
                                )}
                            </div>

                            {/* Actions */}
                            <div className="flex items-center justify-end gap-3 border-t border-slate-200 pt-4 dark:border-slate-700">
                                <button
                                    type="button"
                                    onClick={() => setOpenCreateModal(false)}
                                    className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700/50"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={
                                        processing ||
                                        !data.name ||
                                        data.permissions.length === 0
                                    }
                                    className="rounded-lg bg-blue-600 px-6 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400"
                                >
                                    {processing ? 'Creating...' : 'Create Role'}
                                </button>
                            </div>
                        </form>
                    </>
                }
            />
        </div>
    );
}
