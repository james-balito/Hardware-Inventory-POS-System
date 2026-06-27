<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Sale;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $products = Product::with('category', 'unit')->get();
        $sales = Sale::all();
        
        return Inertia::render('dashboard', [
            'products' => $products,
            'sales' => $sales
        ]);
    }
}
