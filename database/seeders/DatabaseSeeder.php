<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create test user
        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => Hash::make('password'),
        ]);

        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        
        // Truncate tables in reverse order (children first, then parents)
        DB::table('products')->truncate();
        DB::table('categories')->truncate();
        DB::table('units')->truncate();
        
        // Call seeders in correct order (parents first, then children)
        $this->call(CategorySeeder::class);
        $this->call(UnitSeeder::class);
        $this->call(ProductSeeder::class);
        $this->call(RolePermissionSeeder::class);
        
        // Re-enable foreign key checks
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');
        
        $this->command->info('');
        $this->command->info('✅ ==================================');
        $this->command->info('✅ All seeders completed successfully!');
        $this->command->info('✅ ==================================');
        $this->command->info('');
    }
}