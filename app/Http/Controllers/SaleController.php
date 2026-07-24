<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Sale;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class SaleController extends Controller
{
    public function index()
    {
        $sales = Sale::with('products')->get();

        return Inertia::render('sales/Index', [
            'sales' => $sales
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $products = Product::with(['category', 'unit'])
            ->where('stock_quantity', '>', 0)  // Only show in-stock products
            ->get();

        return Inertia::render('sales/Create', [
            'products' => $products,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'products'             => 'required|array|min:1',
            'products.*.id'       => 'required|exists:products,id',
            'products.*.quantity' => 'required|integer|min:1',
        ]);

        DB::beginTransaction();

        try {
            $subTotal = 0;
            $items    = [];

            foreach ($request->products as $item) {
                $product  = Product::lockForUpdate()->findOrFail($item['id']);
                $quantity = $item['quantity'];
                $price    = $product->sale_price;
                $total    = $price * $quantity;

                if ($product->stock_quantity < $quantity) {
                    DB::rollBack();
                    return back()->withErrors([
                        'message' => "Insufficient stock for {$product->product_name}. Available: {$product->stock_quantity}, Requested: {$quantity}"
                    ]);
                }

                $product->decrement('stock_quantity', $quantity);

                $subTotal += $total;

                $items[$product->id] = [
                    'quantity'   => (float) $quantity,
                    'item_price' => $price,   // ← Matches migration column name
                    'total'      => $total,
                ];
            }

            $sale = Sale::create([
                'invoice_number' => 'INV-' . strtoupper(uniqid()),
                'sub_total'      => $subTotal,
                'total'          => $subTotal,
                'status'         => 'completed',
            ]);

            $sale->products()->attach($items);

            DB::commit();

            return redirect()->route('sales.index')
                ->with('success', 'Sale created successfully.');
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->withErrors(['message' => 'Failed to create sale: ' . $e->getMessage()]);
        }
    }
    /**
     * Display the specified resource.
     */
    public function show(Sale $sale)
    {
        $sale->load('products');

        return Inertia::render('sales/Show', [
            'sale' => $sale,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Sale $sale)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Sale $sale)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Sale $sale)
    {
        //
    }
}
