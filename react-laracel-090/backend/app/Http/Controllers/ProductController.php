<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductRequest;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $query = Product::join('categories', 'products.category_id', '=', 'categories.id')
            ->select('products.*', 'categories.title as category_title');

        if ($request->has('category_id')) {
            $query->where('products.category_id', $request->category_id);
        }

        if ($request->has('query')) {
            $query->where('products.title', 'like', "%" . $request->query . "%");
        }

        if ($request->has('search')) {
            $search = $request->input('search');

            $query->where(function ($q) use ($search) {
                $q->where('categories.title', 'like', '%' . $search . '%')
                    ->orWhere('products.title', 'like', '%' . $search . '%');
            });
        }


        if ($request->has('sort_by')) {
            $sortField = 'created_at';
            $sortOrder = 'desc';

            switch ($request->sort_by) {
                case 'asc':
                    $sortField = 'price';
                    $sortOrder = 'asc';
                    break;
                case 'desc':
                    $sortField = 'price';
                    $sortOrder = 'desc';
                    break;
                case 'title_asc':
                    $sortField = 'title';
                    $sortOrder = 'asc';
                    break;
                case 'title_desc':
                    $sortField = 'title';
                    $sortOrder = 'desc';
                    break;
            }

            $query->orderBy($sortField, $sortOrder);
        }

        $perPage = $request->input('per_page', 4);
        $products = $query->paginate($perPage);

        $response = [
            'current_page' => $products->currentPage(),
            'last_page' => $products->lastPage(),
            'per_page' => $products->perPage(),
            'total' => $products->total(),
            'data' => $products->items(),
        ];


        return response()->json($response);
    }


    public function store(Request $request)
    {

        $validated = $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:7048',
            'desc' => 'required|string|max:255',
            'title' => 'required|string|max:100',
            'price' => 'required|numeric|min:0',
            'category_id' => 'required|exists:categories,id',
        ]);

        if ($request->hasFile('image')) {
            $productImage = time() . '-' . $request->title . '.' . $request->image->extension();
            $request->image->move(public_path('images'), $productImage);
            $validated['image'] = 'images/' . $productImage;
        } else {
            $validated['image'] = 'default.jpg';
        }


        $product = Product::create([
            'image' => $validated['image'],
            'desc' => $validated['desc'],
            'title' => $validated['title'],
            'price' => $validated['price'],
            'category_id' => $validated['category_id'],
        ]);


        return response()->json([
            'message' => 'Product created successfully!',
            'product' => $product
        ], 201);
    }
    public function search(Request $request)
    {
        $query = $request->input('query');
        $products = Product::where('title', 'like', value: "%{$query}%")->get();

        return response()->json($products);
    }
}
