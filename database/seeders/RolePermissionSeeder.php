<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RolePermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // app()[PermissionRegistrar::class]->registerPermissions();

        $permissions = [
            'view products',
            'create product',
            'edit product',
            'delete product',
            'view sales',
            'create sale',
            'edit sale',
            'delete sale',
            'view reports',
            'view category',
            'edit category',
            'create category',
            'delete category',
            'view units',
            'create unit',
            'edit unit',
            'delete unit',
            'view users',
            'create user',
            'edit user',
            'delete user',
        ];

        foreach ($permissions as $permission) {
            Permission::create(['name' => $permission]);
        }

        $admin = Role::create(['name' => 'admin']);
        $admin->givePermissionTo(Permission::all());

        $cashier = Role::create(['name' => 'cashier']);
        $cashier->givePermissionTo([
            'view reports',
            'view products',
            'view sales',
            'create sale',
        ]);
    }
}
