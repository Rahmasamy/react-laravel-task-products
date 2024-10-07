<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;
    //hasmany
    protected $fillable=["id", "title"];

    public function products(){
        return $this->hasMany(Product::class);
    }
}
