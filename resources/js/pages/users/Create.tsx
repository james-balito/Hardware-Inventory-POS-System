import { Head, useForm, router } from '@inertiajs/react';
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
import { UserRound, Eye, EyeOff, Shield, KeyRound } from 'lucide-react';
import PageHeader from '@/components/header';
import type { RoleWithPermissions } from '@/interfaces/Interfaces';

interface CreateProps {
    roles: RoleWithPermissions[];
}

Create.layout = {
    breadcrumbs: [
        { title: 'Management', href: '/users' },
        { title: 'Users', href: '/users' },
        { title: 'Create User', href: '/users/create' },
    ],
};

export default function Create({ roles }: CreateProps) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        role_id: '',
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Get selected role to show permissions
    const selectedRole = roles.find(
        (role) => role.id.toString() === data.role_id,
    );

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        post('/users', {
            onSuccess: () => {
                router.visit('/users');
            },
        });
    }

    return (
        <div className="mx-10 my-5">
            <Head title="Create User | Macmac Hardware" />

            <PageHeader
                headerTitle="Management"
                icon={<UserRound />}
                title="Create User"
            />

            <form onSubmit={handleSubmit} className="mt-6 max-w-2xl">
                <div className="space-y-6 rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-600/10">
                    {/* Name */}
                    <div>
                        <label className="mb-1 block text-xs font-semibold text-slate-500">
                            Full Name
                        </label>
                        <Input
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            placeholder="e.g. John Doe"
                            className="max-w-md"
                        />
                        {errors.name && (
                            <p className="mt-1 text-xs text-red-500">{errors.name}</p>
                        )}
                    </div>

                    {/* Email */}
                    <div>
                        <label className="mb-1 block text-xs font-semibold text-slate-500">
                            Email Address
                        </label>
                        <Input
                            type="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            placeholder="e.g. john@example.com"
                            className="max-w-md"
                        />
                        {errors.email && (
                            <p className="mt-1 text-xs text-red-500">{errors.email}</p>
                        )}
                    </div>

                    {/* Password */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="mb-1 block text-xs font-semibold text-slate-500">
                                Password
                            </label>
                            <div className="relative max-w-md">
                                <KeyRound className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
                                <Input
                                    type={showPassword ? 'text' : 'password'}
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    placeholder="Minimum 8 characters"
                                    className="pl-9 pr-10"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute top-1/2 right-3 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-4 w-4" />
                                    ) : (
                                        <Eye className="h-4 w-4" />
                                    )}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="mt-1 text-xs text-red-500">{errors.password}</p>
                            )}
                        </div>

                        <div>
                            <label className="mb-1 block text-xs font-semibold text-slate-500">
                                Confirm Password
                            </label>
                            <div className="relative max-w-md">
                                <KeyRound className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
                                <Input
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    value={data.password_confirmation}
                                    onChange={(e) =>
                                        setData('password_confirmation', e.target.value)
                                    }
                                    placeholder="Re-enter password"
                                    className="pl-9 pr-10"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute top-1/2 right-3 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                >
                                    {showConfirmPassword ? (
                                        <EyeOff className="h-4 w-4" />
                                    ) : (
                                        <Eye className="h-4 w-4" />
                                    )}
                                </button>
                            </div>
                            {errors.password_confirmation && (
                                <p className="mt-1 text-xs text-red-500">
                                    {errors.password_confirmation}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Role Selection */}
                    <div>
                        <label className="mb-1 flex items-center gap-1 text-xs font-semibold text-slate-500">
                            <Shield className="h-3 w-3" /> Role
                        </label>
                        <Select
                            value={data.role_id}
                            onValueChange={(value) => setData('role_id', value)}
                        >
                            <SelectTrigger className="w-[220px]">
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
                        {errors.role_id && (
                            <p className="mt-1 text-xs text-red-500">{errors.role_id}</p>
                        )}
                    </div>

                    {/* Selected Role Permissions */}
                    <div>
                        <label className="mb-1 block text-xs font-semibold text-slate-500">
                            Role Permissions
                        </label>
                        {selectedRole?.permissions?.length ? (
                            <div className="flex flex-wrap gap-1">
                                {selectedRole.permissions.map((perm) => (
                                    <span
                                        key={perm}
                                        className={`rounded-full border px-2 py-0.5 text-xs font-medium ${
                                            perm.startsWith('view')
                                                ? 'border-sky-200 bg-sky-50 text-sky-700'
                                                : perm.startsWith('create')
                                                  ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                                                  : perm.startsWith('edit')
                                                    ? 'border-amber-200 bg-amber-50 text-amber-700'
                                                    : perm.startsWith('delete')
                                                      ? 'border-red-200 bg-red-50 text-red-700'
                                                      : 'border-slate-200 bg-slate-50 text-slate-600'
                                        }`}
                                    >
                                        {perm}
                                    </span>
                                ))}
                            </div>
                        ) : (
                            <p className="text-xs text-slate-400">
                                Select a role to see its permissions
                            </p>
                        )}
                    </div>
                </div>

                {/* Actions */}
                <div className="mt-6 flex items-center gap-3">
                    <Button
                        type="submit"
                        disabled={processing}
                        className="bg-blue-600 px-6 hover:bg-blue-700"
                    >
                        {processing ? 'Creating...' : 'Create User'}
                    </Button>
                    <button
                        type="button"
                        onClick={() => router.visit('/users')}
                        className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}