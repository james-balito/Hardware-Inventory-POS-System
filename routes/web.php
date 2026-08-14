<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\SaleController;
use App\Http\Controllers\UnitController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('auth/login');
})->name('home');

// routes/web.php
Route::middleware(['auth', 'verified'])->group(function () {
    // Everyone with auth can view
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // Products
    Route::get('/products', [ProductController::class, 'index'])
        ->name('products.index')
        ->middleware('permission:view products');

    Route::get('/products/create', [ProductController::class, 'create'])
        ->name('products.create')
        ->middleware('permission:create product');

    Route::post('/products', [ProductController::class, 'store'])
        ->name('products.store')
        ->middleware('permission:create product');

    Route::get('/products/{product}/edit', [ProductController::class, 'edit'])
        ->name('products.edit')
        ->middleware('permission:edit product');

    Route::put('/products/{product}', [ProductController::class, 'update'])
        ->name('products.update')
        ->middleware('permission:edit product');

    Route::delete('/products/{product}', [ProductController::class, 'destroy'])
        ->name('products.destroy')
        ->middleware('permission:delete product');

    // Sales
    Route::get('/sales/create', [SaleController::class, 'create'])
        ->name('sales.create')
        ->middleware('permission:create sale');

    Route::post('/sales', [SaleController::class, 'store'])
        ->name('sales.store')
        ->middleware('permission:create sale');

    // Reports (admin only)
    Route::get('/dashboard', [DashboardController::class, 'index'])
        ->middleware('permission:view reports');

    // Categories
    Route::get('/categories', [CategoryController::class, 'index'])
        ->name('categories.index')
        ->middleware('permission:view category');

    Route::get('/categories/create', [CategoryController::class, 'create'])
        ->name('categories.create')
        ->middleware('permission:create category');

    Route::post('/categories', [CategoryController::class, 'store'])
        ->name('categories.store')
        ->middleware('permission:create category');

    Route::get('/categories/{category}/edit', [CategoryController::class, 'edit'])
        ->name('categories.edit')
        ->middleware('permission:edit category');

    Route::put('/categories/{category}', [CategoryController::class, 'update'])
        ->name('categories.update')
        ->middleware('permission:edit category');

    Route::delete('/categories/{category}', [CategoryController::class, 'destroy'])
        ->name('categories.destroy')
        ->middleware('permission:delete category');

    // Units
    Route::get('/units', [UnitController::class, 'index'])
        ->name('units.index')
        ->middleware('permission:view unit');    

    Route::get('/units/create', [UnitController::class, 'create'])
        ->name('units.create')
        ->middleware('permission:create unit');

    Route::post('/units', [UnitController::class, 'store'])
        ->name('units.store')
        ->middleware('permission:create unit');

    Route::get('/units/{unit}/edit', [UnitController::class, 'edit'])
        ->name('units.edit')
        ->middleware('permission:edit unit');

    Route::put('/units/{unit}', [UnitController::class, 'update'])
        ->name('units.update')
        ->middleware('permission:edit unit');

    Route::delete('/units/{unit}', [UnitController::class, 'destroy'])
        ->name('units.destroy')
        ->middleware('permission:delete unit');

});

require __DIR__ . '/settings.php';
