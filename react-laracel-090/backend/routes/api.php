<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/
Route::get('products', [ProductController::class, 'index']);
Route::get('products/search', [ProductController::class, 'search']);
Route::post('products/create', [ProductController::class, 'store']);
Route::get('categories', [CategoryController::class, 'index']);
Route::post('categories/create', [CategoryController::class, 'store']);


// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });




