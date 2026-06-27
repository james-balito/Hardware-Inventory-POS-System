<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'product_name',
        'description',
        'wholesale_price',
        'sale_price',
        'stock_quantity',
        'is_delivery',
        'category_id',
        'unit_id'
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function unit()
    {
        return $this->belongsTo(Unit::class);
    }

    public function sales()
    {
        return $this->belongsToMany(Sale::class, 'product_sale')
                    ->withPivot('quantity', 'item_price', 'total')
                    ->withTimestamps();
    }
}