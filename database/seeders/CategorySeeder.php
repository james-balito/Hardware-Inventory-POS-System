<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        Category::truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        $categories = [
            ['id' => 1, 'category_name' => 'Cement & Aggregates', 'description' => 'Cement, sand, gravel, and concrete products'],
            ['id' => 2, 'category_name' => 'Roofing & Sheets', 'description' => 'Roofing sheets, gutters, and roofing accessories'],
            ['id' => 3, 'category_name' => 'Steel & Metal', 'description' => 'Steel bars, pipes, and metal products'],
            ['id' => 4, 'category_name' => 'Plumbing & Electrical', 'description' => 'Pipes, wires, breakers, and electrical supplies'],
            ['id' => 5, 'category_name' => 'Paint & Finishing', 'description' => 'Paints, primers, thinners, and finishing materials'],
            ['id' => 6, 'category_name' => 'Boards & Tiles', 'description' => 'Plywood, cement boards, gypsum boards, and tiles'],
            ['id' => 7, 'category_name' => 'Hardware & Fasteners', 'description' => 'Nails, screws, bolts, locks, and hardware accessories'],
            ['id' => 8, 'category_name' => 'Safety & Tools', 'description' => 'Safety equipment, hand tools, and work accessories'],
        ];

        foreach ($categories as $category) {
            Category::create($category);
        }

        $this->command->info('✓ Categories seeded: ' . Category::count());
    }
}