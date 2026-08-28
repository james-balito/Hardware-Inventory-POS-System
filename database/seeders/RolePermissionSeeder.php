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
            // products permission
            'view products',
            'create product',
            'edit product',
            'delete product',

            // sales permission
            'view sales',
            'create sale',
            'edit sale',
            'delete sale',

            // dashboard permission
            'view reports',

            // categories permission
            'view category',
            'edit category',
            'create category',
            'delete category',

            // units permission
            'view units',
            'create unit',
            'edit unit',
            'delete unit',
            
            // users permission 
            'view users',
            'create user',
            'edit user',
            'delete user',

            // roles permission
            'view roles',
            'create role',
            'edit role',
            'delete role'
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
