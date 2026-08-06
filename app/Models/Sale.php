<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Sale extends Model
{
    protected $fillable = [
        'user_id',
        'invoice_number',
        'sub_total',
        'discount',
        'delivery_cost',
        'total',
        'status'
    ];

    public function products()
    {
        return $this->belongsToMany(Product::class, 'product_sale')
                    ->withPivot('quantity', 'item_price', 'total')
                    ->withTimestamps();
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
