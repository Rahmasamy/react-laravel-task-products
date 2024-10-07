<?php

namespace App\Http\Controllers;

use App\Http\Requests\CategoryRequest;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    //
    public function index()
    {
        $courses = Category::all();

        return response()->json(['message' => 'categories get successfully!', 'data' => $courses], 200);

    }
    public function store(CategoryRequest $request)
    {

        $validatedData = $request->validated();

        $category = Category::create($validatedData);
        return response()->json(['message' => 'category created successfully!', 'data' => $category], 201);
    }

}
