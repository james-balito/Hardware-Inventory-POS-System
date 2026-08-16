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
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        Product::truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        $this->command->info('Current categories: ' . Category::count());
        $this->command->info('Current units: ' . Unit::count());

        $units = Unit::pluck('id')->toArray();
        if (empty($units)) {
            $unit = Unit::create(['unit_name' => 'Piece', 'abbreviation' => 'pc']);
            $units = [$unit->id];
        }

        $products = [
            // ── Category 1: Cement & Aggregates (12 products) ──
            ['product_name' => 'Portland Cement 40kg', 'description' => 'High-strength Portland cement for general construction', 'wholesale_price' => 250.00, 'sale_price' => 320.00, 'stock_quantity' => 200, 'category_id' => 1],
            ['product_name' => 'White Cement 25kg', 'description' => 'White Portland cement for finishing and tile joints', 'wholesale_price' => 480.00, 'sale_price' => 580.00, 'stock_quantity' => 50, 'category_id' => 1],
            ['product_name' => 'Rapid Set Cement 20kg', 'description' => 'Fast-setting cement for repairs and anchoring', 'wholesale_price' => 350.00, 'sale_price' => 420.00, 'stock_quantity' => 40, 'category_id' => 1],
            ['product_name' => 'Washed Sand 1m³', 'description' => 'Washed sand for concrete mix and plastering', 'wholesale_price' => 850.00, 'sale_price' => 1100.00, 'stock_quantity' => 30, 'category_id' => 1],
            ['product_name' => 'Gravel 3/4" 1m³', 'description' => 'Crushed gravel for concrete mixture', 'wholesale_price' => 1200.00, 'sale_price' => 1500.00, 'stock_quantity' => 25, 'category_id' => 1],
            ['product_name' => 'Hollow Block 4"', 'description' => 'Standard CHB, 4 inch thickness, 400psi', 'wholesale_price' => 15.00, 'sale_price' => 22.00, 'stock_quantity' => 1000, 'category_id' => 1],
            ['product_name' => 'Hollow Block 6"', 'description' => 'Standard CHB, 6 inch thickness, 500psi', 'wholesale_price' => 22.00, 'sale_price' => 30.00, 'stock_quantity' => 800, 'category_id' => 1],
            ['product_name' => 'Ready Mix Concrete 1m³', 'description' => 'Pre-mixed concrete, 3000psi', 'wholesale_price' => 4200.00, 'sale_price' => 5000.00, 'stock_quantity' => 10, 'category_id' => 1],
            ['product_name' => 'Tile Adhesive 25kg', 'description' => 'Polymer-modified tile adhesive for floors and walls', 'wholesale_price' => 280.00, 'sale_price' => 350.00, 'stock_quantity' => 60, 'category_id' => 1],
            ['product_name' => 'Grout 2kg White', 'description' => 'Tile grout, white, 2kg bag', 'wholesale_price' => 85.00, 'sale_price' => 120.00, 'stock_quantity' => 150, 'category_id' => 1],
            ['product_name' => 'Cement Additive 1L', 'description' => 'Waterproofing and bonding additive for cement', 'wholesale_price' => 180.00, 'sale_price' => 240.00, 'stock_quantity' => 80, 'category_id' => 1],
            ['product_name' => 'Mortar Mix 40kg', 'description' => 'Pre-mixed mortar for bricklaying and plastering', 'wholesale_price' => 220.00, 'sale_price' => 280.00, 'stock_quantity' => 70, 'category_id' => 1],

            // ── Category 2: Roofing & Sheets (12 products) ──
            ['product_name' => 'GI Sheet 8ft', 'description' => 'Corrugated GI sheet, 0.4mm thick, 8ft x 3ft', 'wholesale_price' => 380.00, 'sale_price' => 450.00, 'stock_quantity' => 150, 'category_id' => 2],
            ['product_name' => 'GI Sheet 10ft', 'description' => 'Corrugated GI sheet, 0.4mm thick, 10ft x 3ft', 'wholesale_price' => 480.00, 'sale_price' => 580.00, 'stock_quantity' => 100, 'category_id' => 2],
            ['product_name' => 'GI Sheet 12ft', 'description' => 'Corrugated GI sheet, 0.4mm thick, 12ft x 3ft', 'wholesale_price' => 580.00, 'sale_price' => 700.00, 'stock_quantity' => 80, 'category_id' => 2],
            ['product_name' => 'Pre-painted Roofing 8ft', 'description' => 'Color-coated roofing sheet, 8ft', 'wholesale_price' => 650.00, 'sale_price' => 800.00, 'stock_quantity' => 60, 'category_id' => 2],
            ['product_name' => 'Pre-painted Roofing 10ft', 'description' => 'Color-coated roofing sheet, 10ft', 'wholesale_price' => 780.00, 'sale_price' => 950.00, 'stock_quantity' => 50, 'category_id' => 2],
            ['product_name' => 'Roof Ridge Cap 3ft', 'description' => 'GI ridge cap for roofing, 3ft', 'wholesale_price' => 150.00, 'sale_price' => 200.00, 'stock_quantity' => 120, 'category_id' => 2],
            ['product_name' => 'Roof Gutter 10ft', 'description' => 'GI gutter, 10ft length', 'wholesale_price' => 350.00, 'sale_price' => 450.00, 'stock_quantity' => 40, 'category_id' => 2],
            ['product_name' => 'Roof Flashing 10ft', 'description' => 'GI roof flashing, 10ft', 'wholesale_price' => 280.00, 'sale_price' => 360.00, 'stock_quantity' => 45, 'category_id' => 2],
            ['product_name' => 'Insulated Panel 4x8', 'description' => 'Insulated roofing panel, 4ft x 8ft', 'wholesale_price' => 1500.00, 'sale_price' => 1800.00, 'stock_quantity' => 20, 'category_id' => 2],
            ['product_name' => 'Translucent Sheet 8ft', 'description' => 'Fiberglass translucent roofing sheet, 8ft', 'wholesale_price' => 550.00, 'sale_price' => 680.00, 'stock_quantity' => 35, 'category_id' => 2],
            ['product_name' => 'Roof Sealant 1L', 'description' => 'Rubberized roof sealant, 1 liter', 'wholesale_price' => 250.00, 'sale_price' => 320.00, 'stock_quantity' => 90, 'category_id' => 2],
            ['product_name' => 'Roofing Screw 100pcs', 'description' => 'Self-drilling roofing screws with washer, 100pcs', 'wholesale_price' => 180.00, 'sale_price' => 240.00, 'stock_quantity' => 200, 'category_id' => 2],

            // ── Category 3: Steel & Metal (12 products) ──
            ['product_name' => 'Deformed Steel Bar 10mm', 'description' => 'Grade 40 rebar, 6 meters length', 'wholesale_price' => 180.00, 'sale_price' => 220.00, 'stock_quantity' => 500, 'category_id' => 3],
            ['product_name' => 'Deformed Steel Bar 12mm', 'description' => 'Grade 40 rebar, 6 meters length', 'wholesale_price' => 250.00, 'sale_price' => 310.00, 'stock_quantity' => 400, 'category_id' => 3],
            ['product_name' => 'Deformed Steel Bar 16mm', 'description' => 'Grade 40 rebar, 6 meters length', 'wholesale_price' => 420.00, 'sale_price' => 510.00, 'stock_quantity' => 300, 'category_id' => 3],
            ['product_name' => 'Angle Bar 1" x 3/16"', 'description' => 'Steel angle bar, 6 meters length', 'wholesale_price' => 320.00, 'sale_price' => 400.00, 'stock_quantity' => 120, 'category_id' => 3],
            ['product_name' => 'Angle Bar 2" x 3/16"', 'description' => 'Steel angle bar, 6 meters length', 'wholesale_price' => 450.00, 'sale_price' => 550.00, 'stock_quantity' => 90, 'category_id' => 3],
            ['product_name' => 'Flat Bar 1" x 1/4"', 'description' => 'Steel flat bar, 6 meters length', 'wholesale_price' => 280.00, 'sale_price' => 350.00, 'stock_quantity' => 110, 'category_id' => 3],
            ['product_name' => 'Square Bar 12mm', 'description' => 'Steel square bar, 6 meters length', 'wholesale_price' => 200.00, 'sale_price' => 260.00, 'stock_quantity' => 150, 'category_id' => 3],
            ['product_name' => 'GI Pipe 1" Sched 40', 'description' => 'Galvanized iron pipe, 1 inch, 6 meters', 'wholesale_price' => 480.00, 'sale_price' => 600.00, 'stock_quantity' => 60, 'category_id' => 3],
            ['product_name' => 'GI Pipe 2" Sched 40', 'description' => 'Galvanized iron pipe, 2 inch, 6 meters', 'wholesale_price' => 850.00, 'sale_price' => 1050.00, 'stock_quantity' => 45, 'category_id' => 3],
            ['product_name' => 'GI Pipe 3" Sched 40', 'description' => 'Galvanized iron pipe, 3 inch, 6 meters', 'wholesale_price' => 1300.00, 'sale_price' => 1580.00, 'stock_quantity' => 30, 'category_id' => 3],
            ['product_name' => 'Welding Rod 6013 1kg', 'description' => 'AWS E6013 welding electrodes, 2.5mm, 1kg box', 'wholesale_price' => 180.00, 'sale_price' => 230.00, 'stock_quantity' => 200, 'category_id' => 3],
            ['product_name' => 'Welding Rod 7018 1kg', 'description' => 'AWS E7018 low-hydrogen electrodes, 2.5mm, 1kg', 'wholesale_price' => 220.00, 'sale_price' => 280.00, 'stock_quantity' => 150, 'category_id' => 3],
            ['product_name' => 'Threaded Rod 12mm x 1m', 'description' => 'Zinc-plated threaded rod, 12mm diameter, 1 meter', 'wholesale_price' => 75.00, 'sale_price' => 95.00, 'stock_quantity' => 250, 'category_id' => 3],
            ['product_name' => 'C-Purlin 2x4 6m', 'description' => 'C-channel purlin, 2" x 4", 6 meters', 'wholesale_price' => 750.00, 'sale_price' => 920.00, 'stock_quantity' => 40, 'category_id' => 3],
            ['product_name' => 'Wall Angle 25mm x 25mm', 'description' => 'Galvanized steel wall angle for ceiling framing, 3m', 'wholesale_price' => 120.00, 'sale_price' => 155.00, 'stock_quantity' => 300, 'category_id' => 3],

            // ── Category 4: Plumbing & Electrical (14 products) ──
            ['product_name' => 'PVC Pipe 2" x 3m', 'description' => 'PVC pipe for drainage, 2 inch diameter, 3 meters', 'wholesale_price' => 180.00, 'sale_price' => 230.00, 'stock_quantity' => 150, 'category_id' => 4],
            ['product_name' => 'PVC Pipe 4" x 3m', 'description' => 'PVC pipe for drainage, 4 inch diameter, 3 meters', 'wholesale_price' => 320.00, 'sale_price' => 395.00, 'stock_quantity' => 120, 'category_id' => 4],
            ['product_name' => 'PVC Elbow 90° 4"', 'description' => 'PVC elbow, 90 degrees, 4 inch', 'wholesale_price' => 45.00, 'sale_price' => 60.00, 'stock_quantity' => 300, 'category_id' => 4],
            ['product_name' => 'PVC Tee 4"', 'description' => 'PVC tee fitting, 4 inch', 'wholesale_price' => 65.00, 'sale_price' => 85.00, 'stock_quantity' => 200, 'category_id' => 4],
            ['product_name' => 'PEX Pipe 1/2" x 100m', 'description' => 'Cross-linked polyethylene pipe for plumbing, 1/2 inch, 100m roll', 'wholesale_price' => 1800.00, 'sale_price' => 2200.00, 'stock_quantity' => 25, 'category_id' => 4],
            ['product_name' => 'PEX Pipe 3/4" x 50m', 'description' => 'Cross-linked polyethylene pipe for plumbing, 3/4 inch, 50m', 'wholesale_price' => 1500.00, 'sale_price' => 1850.00, 'stock_quantity' => 20, 'category_id' => 4],
            ['product_name' => 'Electrical Wire THHN 2.0mm²', 'description' => 'Stranded copper wire, 150m per box', 'wholesale_price' => 850.00, 'sale_price' => 1050.00, 'stock_quantity' => 80, 'category_id' => 4],
            ['product_name' => 'Electrical Wire THHN 3.5mm²', 'description' => 'Stranded copper wire, 150m per box', 'wholesale_price' => 1200.00, 'sale_price' => 1450.00, 'stock_quantity' => 60, 'category_id' => 4],
            ['product_name' => 'Electrical Wire THHN 5.5mm²', 'description' => 'Stranded copper wire, 150m per box', 'wholesale_price' => 1800.00, 'sale_price' => 2150.00, 'stock_quantity' => 40, 'category_id' => 4],
            ['product_name' => 'Circuit Breaker 20A', 'description' => 'Molded case circuit breaker, 2-pole, 20 amps', 'wholesale_price' => 350.00, 'sale_price' => 430.00, 'stock_quantity' => 70, 'category_id' => 4],
            ['product_name' => 'Circuit Breaker 60A', 'description' => 'Molded case circuit breaker, 2-pole, 60 amps', 'wholesale_price' => 650.00, 'sale_price' => 780.00, 'stock_quantity' => 40, 'category_id' => 4],
            ['product_name' => 'Electrical Tape 3M', 'description' => 'PVC electrical insulation tape, 19mm x 16m', 'wholesale_price' => 45.00, 'sale_price' => 65.00, 'stock_quantity' => 500, 'category_id' => 4],
            ['product_name' => 'Junction Box 4x4', 'description' => 'PVC junction box, 4 inch x 4 inch', 'wholesale_price' => 65.00, 'sale_price' => 85.00, 'stock_quantity' => 200, 'category_id' => 4],
            ['product_name' => 'Convenience Outlet 2-Gang', 'description' => 'Surface-type convenience outlet, 2-gang', 'wholesale_price' => 120.00, 'sale_price' => 160.00, 'stock_quantity' => 150, 'category_id' => 4],

            // ── Category 5: Paint & Finishing (12 products) ──
            ['product_name' => 'Latex Paint 1L White', 'description' => 'Flat latex paint for interior walls, 1 liter', 'wholesale_price' => 120.00, 'sale_price' => 160.00, 'stock_quantity' => 200, 'category_id' => 5],
            ['product_name' => 'Latex Paint 4L White', 'description' => 'Flat latex paint for interior walls, 4 liters', 'wholesale_price' => 380.00, 'sale_price' => 480.00, 'stock_quantity' => 75, 'category_id' => 5],
            ['product_name' => 'Semi-Gloss Latex 4L', 'description' => 'Semi-gloss latex paint, 4 liters', 'wholesale_price' => 450.00, 'sale_price' => 560.00, 'stock_quantity' => 60, 'category_id' => 5],
            ['product_name' => 'Enamel Paint 4L White', 'description' => 'Quick-dry enamel paint for metal and wood, 4 liters', 'wholesale_price' => 520.00, 'sale_price' => 640.00, 'stock_quantity' => 50, 'category_id' => 5],
            ['product_name' => 'Enamel Paint 1L White', 'description' => 'Quick-dry enamel paint for metal and wood, 1 liter', 'wholesale_price' => 150.00, 'sale_price' => 195.00, 'stock_quantity' => 120, 'category_id' => 5],
            ['product_name' => 'Metal Primer 4L Gray', 'description' => 'Anti-corrosion metal primer, 4 liters, gray', 'wholesale_price' => 420.00, 'sale_price' => 520.00, 'stock_quantity' => 50, 'category_id' => 5],
            ['product_name' => 'Metal Primer 1L Gray', 'description' => 'Anti-corrosion metal primer, 1 liter, gray', 'wholesale_price' => 130.00, 'sale_price' => 170.00, 'stock_quantity' => 100, 'category_id' => 5],
            ['product_name' => 'Wood Stain 1L Mahogany', 'description' => 'Oil-based wood stain, mahogany, 1 liter', 'wholesale_price' => 220.00, 'sale_price' => 280.00, 'stock_quantity' => 80, 'category_id' => 5],
            ['product_name' => 'Paint Roller 9" with Tray', 'description' => 'Paint roller 9 inches with tray', 'wholesale_price' => 120.00, 'sale_price' => 165.00, 'stock_quantity' => 150, 'category_id' => 5],
            ['product_name' => 'Paint Brush 2"', 'description' => 'High-quality paint brush, 2 inches', 'wholesale_price' => 45.00, 'sale_price' => 70.00, 'stock_quantity' => 300, 'category_id' => 5],
            ['product_name' => 'Paint Thinner 4L', 'description' => 'Lacquer thinner, 4 liters', 'wholesale_price' => 280.00, 'sale_price' => 350.00, 'stock_quantity' => 90, 'category_id' => 5],
            ['product_name' => 'Waterproofing Membrane 1L', 'description' => 'Liquid-applied waterproofing for concrete roofs', 'wholesale_price' => 350.00, 'sale_price' => 450.00, 'stock_quantity' => 70, 'category_id' => 5],

            // ── Category 6: Boards & Tiles (12 products) ──
            ['product_name' => 'Plywood 1/4" 4x8', 'description' => 'Marine plywood, 1/4 inch thick, 4ft x 8ft', 'wholesale_price' => 420.00, 'sale_price' => 520.00, 'stock_quantity' => 90, 'category_id' => 6],
            ['product_name' => 'Plywood 1/2" 4x8', 'description' => 'Marine plywood, 1/2 inch thick, 4ft x 8ft', 'wholesale_price' => 650.00, 'sale_price' => 780.00, 'stock_quantity' => 80, 'category_id' => 6],
            ['product_name' => 'Plywood 3/4" 4x8', 'description' => 'Marine plywood, 3/4 inch thick, 4ft x 8ft', 'wholesale_price' => 890.00, 'sale_price' => 1050.00, 'stock_quantity' => 50, 'category_id' => 6],
            ['product_name' => 'Cement Board 4x8', 'description' => 'Fiber cement board, 4ft x 8ft, 6mm thick', 'wholesale_price' => 550.00, 'sale_price' => 680.00, 'stock_quantity' => 65, 'category_id' => 6],
            ['product_name' => 'Cement Board 3x6', 'description' => 'Fiber cement board, 3ft x 6ft, 6mm thick', 'wholesale_price' => 320.00, 'sale_price' => 400.00, 'stock_quantity' => 70, 'category_id' => 6],
            ['product_name' => 'Gypsum Board 4x8', 'description' => 'Regular gypsum board, 4ft x 8ft, 9mm', 'wholesale_price' => 380.00, 'sale_price' => 470.00, 'stock_quantity' => 100, 'category_id' => 6],
            ['product_name' => 'Ceramic Floor Tile 60x60', 'description' => 'Polished ceramic tile, 60cm x 60cm, per piece', 'wholesale_price' => 85.00, 'sale_price' => 120.00, 'stock_quantity' => 400, 'category_id' => 6],
            ['product_name' => 'Ceramic Floor Tile 30x30', 'description' => 'Ceramic tile, 30cm x 30cm, per piece', 'wholesale_price' => 35.00, 'sale_price' => 55.00, 'stock_quantity' => 500, 'category_id' => 6],
            ['product_name' => 'Porcelain Tile 60x60', 'description' => 'Polished porcelain tile, 60cm x 60cm, per piece', 'wholesale_price' => 120.00, 'sale_price' => 165.00, 'stock_quantity' => 300, 'category_id' => 6],
            ['product_name' => 'Vinyl Tiles 12x12 20pcs', 'description' => 'Self-adhesive vinyl floor tiles, 20 pieces per box', 'wholesale_price' => 450.00, 'sale_price' => 560.00, 'stock_quantity' => 80, 'category_id' => 6],
            ['product_name' => 'Rubber Matting 1m x 10m', 'description' => 'Industrial rubber matting roll, 3mm thick, 1m x 10m', 'wholesale_price' => 2800.00, 'sale_price' => 3400.00, 'stock_quantity' => 15, 'category_id' => 6],
            ['product_name' => 'Acoustic Board 2x4', 'description' => 'Acoustic ceiling board, 2ft x 4ft', 'wholesale_price' => 180.00, 'sale_price' => 240.00, 'stock_quantity' => 120, 'category_id' => 6],

            // ── Category 7: Hardware & Fasteners (13 products) ──
            ['product_name' => 'Concrete Nail 2" 1kg', 'description' => 'Hardened steel concrete nails, 2 inches, 1kg pack', 'wholesale_price' => 110.00, 'sale_price' => 145.00, 'stock_quantity' => 300, 'category_id' => 7],
            ['product_name' => 'Concrete Nail 3" 1kg', 'description' => 'Hardened steel concrete nails, 3 inches, 1kg pack', 'wholesale_price' => 120.00, 'sale_price' => 155.00, 'stock_quantity' => 300, 'category_id' => 7],
            ['product_name' => 'Wood Screw Assorted 500pcs', 'description' => 'Self-tapping wood screws, assorted sizes, 500 pieces', 'wholesale_price' => 220.00, 'sale_price' => 280.00, 'stock_quantity' => 150, 'category_id' => 7],
            ['product_name' => 'Machine Bolt 10mm x 2" 10pcs', 'description' => 'Stainless steel machine bolts with nuts, 10 pieces', 'wholesale_price' => 85.00, 'sale_price' => 120.00, 'stock_quantity' => 200, 'category_id' => 7],
            ['product_name' => 'Expansion Bolt 12mm 10pcs', 'description' => 'Heavy-duty expansion bolts for concrete, 10 pieces', 'wholesale_price' => 150.00, 'sale_price' => 200.00, 'stock_quantity' => 180, 'category_id' => 7],
            ['product_name' => 'Door Knob Set Stainless', 'description' => 'Lever-type door knob with mortise lock, stainless steel', 'wholesale_price' => 420.00, 'sale_price' => 550.00, 'stock_quantity' => 55, 'category_id' => 7],
            ['product_name' => 'Door Hinge 4" Pair', 'description' => 'Heavy-duty steel door hinges, 4 inch, pair', 'wholesale_price' => 85.00, 'sale_price' => 115.00, 'stock_quantity' => 200, 'category_id' => 7],
            ['product_name' => 'Padlock 50mm', 'description' => 'Laminated steel padlock, 50mm', 'wholesale_price' => 150.00, 'sale_price' => 200.00, 'stock_quantity' => 100, 'category_id' => 7],
            ['product_name' => 'Door Closer', 'description' => 'Hydraulic door closer, floor spring type', 'wholesale_price' => 850.00, 'sale_price' => 1050.00, 'stock_quantity' => 30, 'category_id' => 7],
            ['product_name' => 'Drawer Slide 14" Pair', 'description' => 'Ball-bearing drawer slides, 14 inches, pair', 'wholesale_price' => 180.00, 'sale_price' => 240.00, 'stock_quantity' => 80, 'category_id' => 7],
            ['product_name' => 'Cabinet Handle 128mm', 'description' => 'Stainless steel cabinet handle, 128mm', 'wholesale_price' => 65.00, 'sale_price' => 95.00, 'stock_quantity' => 250, 'category_id' => 7],
            ['product_name' => 'Chain 3/16" x 10m', 'description' => 'Galvanized chain, 3/16 inch, 10 meters', 'wholesale_price' => 280.00, 'sale_price' => 360.00, 'stock_quantity' => 60, 'category_id' => 7],
            ['product_name' => 'Claw Hammer 16oz', 'description' => 'Steel claw hammer, 16 ounces', 'wholesale_price' => 220.00, 'sale_price' => 290.00, 'stock_quantity' => 100, 'category_id' => 7],

            // ── Category 8: Safety & Tools (13 products) ──
            ['product_name' => 'Safety Hard Hat', 'description' => 'ABS construction helmet with 6-point suspension', 'wholesale_price' => 95.00, 'sale_price' => 130.00, 'stock_quantity' => 180, 'category_id' => 8],
            ['product_name' => 'Safety Glasses Clear', 'description' => 'Anti-scratch safety glasses, clear lens', 'wholesale_price' => 45.00, 'sale_price' => 70.00, 'stock_quantity' => 300, 'category_id' => 8],
            ['product_name' => 'Work Gloves Leather Pair', 'description' => 'Genuine leather work gloves, reinforced palm', 'wholesale_price' => 85.00, 'sale_price' => 120.00, 'stock_quantity' => 200, 'category_id' => 8],
            ['product_name' => 'Work Gloves Rubber Pair', 'description' => 'Rubber-coated work gloves, chemical resistant', 'wholesale_price' => 55.00, 'sale_price' => 80.00, 'stock_quantity' => 250, 'category_id' => 8],
            ['product_name' => 'Measuring Tape 5m', 'description' => 'Heavy-duty steel measuring tape, 5 meters, auto-lock', 'wholesale_price' => 150.00, 'sale_price' => 195.00, 'stock_quantity' => 120, 'category_id' => 8],
            ['product_name' => 'Measuring Tape 10m', 'description' => 'Heavy-duty steel measuring tape, 10 meters, auto-lock', 'wholesale_price' => 250.00, 'sale_price' => 320.00, 'stock_quantity' => 100, 'category_id' => 8],
            ['product_name' => 'Spirit Level 24"', 'description' => 'Aluminum spirit level, 24 inches', 'wholesale_price' => 350.00, 'sale_price' => 450.00, 'stock_quantity' => 60, 'category_id' => 8],
            ['product_name' => 'Crowbar 24"', 'description' => 'Steel crowbar, 24 inches', 'wholesale_price' => 280.00, 'sale_price' => 360.00, 'stock_quantity' => 70, 'category_id' => 8],
            ['product_name' => 'Sledge Hammer 8lbs', 'description' => 'Fiberglass handle sledgehammer, 8 pounds', 'wholesale_price' => 450.00, 'sale_price' => 560.00, 'stock_quantity' => 40, 'category_id' => 8],
            ['product_name' => 'Wheelbarrow Heavy Duty', 'description' => 'Heavy-duty wheelbarrow with steel tub', 'wholesale_price' => 1800.00, 'sale_price' => 2200.00, 'stock_quantity' => 20, 'category_id' => 8],
            ['product_name' => 'Safety Vest Reflectorized', 'description' => 'High-visibility safety vest with reflector', 'wholesale_price' => 120.00, 'sale_price' => 165.00, 'stock_quantity' => 150, 'category_id' => 8],
            ['product_name' => 'Dust Mask N95 10pcs', 'description' => 'N95 dust masks, 10 pieces per pack', 'wholesale_price' => 180.00, 'sale_price' => 240.00, 'stock_quantity' => 200, 'category_id' => 8],
            ['product_name' => 'Tool Belt Leather', 'description' => 'Genuine leather tool belt with pouches', 'wholesale_price' => 550.00, 'sale_price' => 680.00, 'stock_quantity' => 50, 'category_id' => 8],
        ];

        $createdCount = 0;
        foreach ($products as $index => $productData) {
            try {
                $product = Product::create([
                    'product_name' => $productData['product_name'],
                    'description' => $productData['description'],
                    'wholesale_price' => $productData['wholesale_price'],
                    'sale_price' => $productData['sale_price'],
                    'stock_quantity' => $productData['stock_quantity'],
                    'category_id' => $productData['category_id'],
                    'unit_id' => $units[array_rand($units)],
                ]);

                $createdCount++;
                $this->command->info("✅ Created: {$product->product_name}");
            } catch (\Exception $e) {
                $this->command->error("❌ Failed to create {$productData['product_name']}: " . $e->getMessage());
            }
        }

        $this->command->newLine();
        $this->command->info("✅ Successfully created {$createdCount} products!");
        $this->command->info("📊 Final product count: " . Product::count());
    }
}