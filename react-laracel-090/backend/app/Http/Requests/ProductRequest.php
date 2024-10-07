<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProductRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            'desc' => 'required|string|max:255',
            'title' => 'required|string|max:100',
            'price' => 'required|numeric|min:0',
            'category_id' => 'required|exists:categories,id',
        ];
    }

    // Custom error messages
    public function messages()
    {
        return [
            'image.required' => 'The product image is required.',
            'image.image' => 'Please upload a valid image file.',
            'image.mimes' => 'Allowed image types are jpeg, png, jpg, and gif.',
            'desc.required' => 'The product description is required.',
            'title.required' => 'The product title is required.',
            'price.required' => 'The product price is required.',
            'category_id.required' => 'Please select a category.',
        ];
    }
}
