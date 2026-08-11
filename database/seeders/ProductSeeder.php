<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Product;
use App\Models\Unit;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        // Disable foreign key checks
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');

        // Clear existing products
        Product::truncate();

        // Debug: Check what's in the database
        $this->command->info('Current categories: ' . Category::count());
        $this->command->info('Current units: ' . Unit::count());
        $this->command->info('Current products before seeding: ' . Product::count());

        // Get or create category
        $category = Category::first();
        if (!$category) {
            $this->command->info('No categories found. Creating default category...');
            $category = Category::create([
                'category_name' => 'General',
                'description' => 'General category for products'
            ]);
        }

        // Get or create unit
        $unit = Unit::first();
        if (!$unit) {
            $this->command->info('No units found. Creating default unit...');
            $unit = Unit::create([
                'unit_name' => 'Piece',
                'abbreviation' => 'pc'
            ]);
        }

        $this->command->info("Using Category: {$category->id} - {$category->category_name}");
        $this->command->info("Using Unit: {$unit->id} - {$unit->unit_name}");

        // Define products
        $products = [
            [
                'product_name' => 'Portland Cement 40kg',
                'description' => 'High-strength Portland cement for general construction',
                'wholesale_price' => 250.00,
                'sale_price' => 320.00,
                'stock_quantity' => 200,
                'category_id' => 1,
            ],
            [
                'product_name' => 'Galvanized Iron Sheet 8ft',
                'description' => 'Corrugated GI sheet, 0.4mm thick, 8ft x 3ft',
                'wholesale_price' => 380.00,
                'sale_price' => 450.00,
                'stock_quantity' => 150,
                'category_id' => 2,
            ],
            [
                'product_name' => 'Deformed Steel Bar 10mm',
                'description' => 'Grade 40 rebar, 6 meters length',
                'wholesale_price' => 180.00,
                'sale_price' => 220.00,
                'stock_quantity' => 500,
                'category_id' => 3,
            ],
            [
                'product_name' => 'Plywood 1/2" 4x8',
                'description' => 'Marine plywood, 1/2 inch thick, 4ft x 8ft',
                'wholesale_price' => 650.00,
                'sale_price' => 780.00,
                'stock_quantity' => 80,
                'category_id' => 6,
            ],
            [
                'product_name' => 'PVC Pipe 4" x 3m',
                'description' => 'PVC pipe for drainage, 4 inch diameter, 3 meters',
                'wholesale_price' => 320.00,
                'sale_price' => 395.00,
                'stock_quantity' => 120,
                'category_id' => 4,
            ],
            [
                'product_name' => 'Electrical Wire THHN 3.5mm²',
                'description' => 'Stranded copper wire, 150m per box',
                'wholesale_price' => 1200.00,
                'sale_price' => 1450.00,
                'stock_quantity' => 60,
                'category_id' => 4,
            ],
            [
                'product_name' => 'Hollow Block 4"',
                'description' => 'Standard CHB, 4 inch thickness, 400psi',
                'wholesale_price' => 15.00,
                'sale_price' => 22.00,
                'stock_quantity' => 1000,
                'category_id' => 1,
            ],
            [
                'product_name' => 'Angle Bar 2" x 3/16"',
                'description' => 'Steel angle bar, 6 meters length',
                'wholesale_price' => 450.00,
                'sale_price' => 550.00,
                'stock_quantity' => 90,
                'category_id' => 3,
            ],
            [
                'product_name' => 'Sand 1 cubic meter',
                'description' => 'Washed sand for concrete mix',
                'wholesale_price' => 850.00,
                'sale_price' => 1100.00,
                'stock_quantity' => 30,
                'category_id' => 1,
            ],
            [
                'product_name' => 'Latex Paint 4L White',
                'description' => 'Flat latex paint for interior walls, 4 liters',
                'wholesale_price' => 380.00,
                'sale_price' => 480.00,
                'stock_quantity' => 75,
                'category_id' => 5,
            ],
            [
                'product_name' => 'Tile Adhesive 25kg',
                'description' => 'Polymer-modified tile adhesive for floors and walls',
                'wholesale_price' => 280.00,
                'sale_price' => 350.00,
                'stock_quantity' => 60,
                'category_id' => 1,
            ],
            [
                'product_name' => 'GI Pipe 2" Sched 40',
                'description' => 'Galvanized iron pipe, 2 inch diameter, 6 meters',
                'wholesale_price' => 850.00,
                'sale_price' => 1050.00,
                'stock_quantity' => 45,
                'category_id' => 4,
            ],
            [
                'product_name' => 'Concrete Nail 3" 1kg',
                'description' => 'Hardened steel concrete nails, 3 inches, 1kg pack',
                'wholesale_price' => 120.00,
                'sale_price' => 155.00,
                'stock_quantity' => 300,
                'category_id' => 7,
            ],
            [
                'product_name' => 'Circuit Breaker 60A',
                'description' => 'Molded case circuit breaker, 2-pole, 60 amps',
                'wholesale_price' => 650.00,
                'sale_price' => 780.00,
                'stock_quantity' => 40,
                'category_id' => 4,
            ],
            [
                'product_name' => 'Door Knob Set Stainless',
                'description' => 'Lever-type door knob with mortise lock, stainless steel',
                'wholesale_price' => 420.00,
                'sale_price' => 550.00,
                'stock_quantity' => 55,
                'category_id' => 7,
            ],
            [
                'product_name' => 'Waterproofing Membrane 1L',
                'description' => 'Liquid-applied waterproofing for concrete roofs',
                'wholesale_price' => 350.00,
                'sale_price' => 450.00,
                'stock_quantity' => 70,
                'category_id' => 5,
            ],
            [
                'product_name' => 'Welding Rod 6013 1kg',
                'description' => 'AWS E6013 welding electrodes, 2.5mm, 1kg box',
                'wholesale_price' => 180.00,
                'sale_price' => 230.00,
                'stock_quantity' => 200,
                'category_id' => 3,
            ],
            [
                'product_name' => 'Ceramic Floor Tile 60x60',
                'description' => 'Polished ceramic tile, 60cm x 60cm, per piece',
                'wholesale_price' => 85.00,
                'sale_price' => 120.00,
                'stock_quantity' => 400,
                'category_id' => 6,
            ],
            [
                'product_name' => 'GI Corrugated Roofing 10ft',
                'description' => 'Galvanized iron corrugated roofing, 10ft x 3ft',
                'wholesale_price' => 480.00,
                'sale_price' => 580.00,
                'stock_quantity' => 100,
                'category_id' => 2,
            ],
            [
                'product_name' => 'Electrical Tape 3M',
                'description' => 'PVC electrical insulation tape, 19mm x 16m',
                'wholesale_price' => 45.00,
                'sale_price' => 65.00,
                'stock_quantity' => 500,
                'category_id' => 4,
            ],
            [
                'product_name' => 'Cement Board 4x8',
                'description' => 'Fiber cement board, 4ft x 8ft, 6mm thick',
                'wholesale_price' => 550.00,
                'sale_price' => 680.00,
                'stock_quantity' => 65,
                'category_id' => 6,
            ],
            [
                'product_name' => 'Threaded Rod 12mm x 1m',
                'description' => 'Zinc-plated threaded rod, 12mm diameter, 1 meter',
                'wholesale_price' => 75.00,
                'sale_price' => 95.00,
                'stock_quantity' => 250,
                'category_id' => 3,
            ],
            [
                'product_name' => 'Wood Screw Assorted 500pcs',
                'description' => 'Self-tapping wood screws, assorted sizes, 500 pieces',
                'wholesale_price' => 220.00,
                'sale_price' => 280.00,
                'stock_quantity' => 150,
                'category_id' => 7,
            ],
            [
                'product_name' => 'PEX Pipe 1/2" x 100m',
                'description' => 'Cross-linked polyethylene pipe for plumbing, 1/2 inch, 100m roll',
                'wholesale_price' => 1800.00,
                'sale_price' => 2200.00,
                'stock_quantity' => 25,
                'category_id' => 4,
            ],
            [
                'product_name' => 'Safety Hard Hat',
                'description' => 'ABS construction helmet with 6-point suspension',
                'wholesale_price' => 95.00,
                'sale_price' => 130.00,
                'stock_quantity' => 180,
                'category_id' => 8,
            ],
            [
                'product_name' => 'Wall Angle 25mm x 25mm',
                'description' => 'Galvanized steel wall angle for ceiling framing, 3m length',
                'wholesale_price' => 120.00,
                'sale_price' => 155.00,
                'stock_quantity' => 300,
                'category_id' => 3,
            ],
            [
                'product_name' => 'Metal Primer 4L Gray',
                'description' => 'Anti-corrosion metal primer, 4 liters, gray',
                'wholesale_price' => 420.00,
                'sale_price' => 520.00,
                'stock_quantity' => 50,
                'category_id' => 5,
            ],
            [
                'product_name' => 'Rubber Matting 1m x 10m',
                'description' => 'Industrial rubber matting roll, 3mm thick, 1m x 10m',
                'wholesale_price' => 2800.00,
                'sale_price' => 3400.00,
                'stock_quantity' => 15,
                'category_id' => 6,
            ],
            [
                'product_name' => 'Measuring Tape 5m',
                'description' => 'Heavy-duty steel measuring tape, 5 meters, auto-lock',
                'wholesale_price' => 150.00,
                'sale_price' => 195.00,
                'stock_quantity' => 120,
                'category_id' => 8,
            ],
            [
                'product_name' => 'Work Gloves Leather Pair',
                'description' => 'Genuine leather work gloves, reinforced palm',
                'wholesale_price' => 85.00,
                'sale_price' => 120.00,
                'stock_quantity' => 200,
                'category_id' => 8,
            ],
        ];

        // Insert products
        $createdCount = 0;
        foreach ($products as $productData) {
            try {
                $product = Product::create([
                    'product_name' => $productData['product_name'],
                    'description' => $productData['description'],
                    'wholesale_price' => $productData['wholesale_price'],
                    'sale_price' => $productData['sale_price'],
                    'stock_quantity' => $productData['stock_quantity'],
                    'category_id' => $category->id,
                    'unit_id' => $unit->id,
                ]);

                $createdCount++;
                $this->command->info("✅ Created: {$product->product_name}");
            } catch (\Exception $e) {
                $this->command->error("❌ Failed to create {$productData['product_name']}: " . $e->getMessage());
            }
        }

        // Re-enable foreign key checks
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        $this->command->newLine();
        $this->command->info("✅ Successfully created {$createdCount} products!");
        $this->command->info("📊 Final product count: " . Product::count());
    }
}
