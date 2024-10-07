<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CategoryRequest extends FormRequest
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
            //

          "title"=> "required|string|min:3|max:40"
        ];
    }
    public function messages()
    {
        return [
            'title.required' => 'The title is required.',
            'title.string' => 'The title must be string.',
            'title.min' => 'the title is minimum  3',
            'title.max' => 'The title is maximum 40.',

        ];
    }
}
