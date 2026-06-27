<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use App\Models\Unit;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $products = Product::with('category', 'unit')->get();
        return Inertia::render('product/Index', compact('products'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $categories = Category::all();
        $units = Unit::all();

        return Inertia::render('product/Create', [
            'categories' => $categories,
            'units' => $units,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'product_name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'wholesale_price' => 'required|numeric|min:0',
            'sale_price' => 'required|numeric|min:0|gt:wholesale_price',
            'stock_quantity' => 'required|integer|min:0',
            'category_id' => 'required|exists:categories,id',
            'unit_id' => 'required|exists:units,id',
        ], [
            'sale_price.gt' => 'The sale price must be greater than the wholesale price.',
        ]);

        Product::create($request->all());

        return redirect()->route('products.index')->with('success', 'Product created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        $categories = Category::all();
        $units = Unit::all();
        
        return Inertia::render('product/Edit', [
            'product' => $product, 
            'categories' => $categories,
            'units' => $units,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $product)
    {
        $request->validate([
            'product_name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'wholesale_price' => 'required|numeric|min:0',
            'sale_price' => 'required|numeric|min:0|gt:wholesale_price',
            'stock_quantity' => 'required|integer|min:0',
            'category_id' => 'required|exists:categories,id',
            'unit_id' => 'required|exists:units,id',
        ], [
            'sale_price.gt' => 'The sale price must be greater than the wholesale price.',
        ]);

        $product->update($request->all());
        
        return redirect()->route('products.index')->with('success', 'Product updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        $product->delete();
        
        return redirect()->route('products.index')->with('success', 'Product deleted successfully.');
    }
}