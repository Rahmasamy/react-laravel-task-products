<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Carbon\Carbon;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $imagesWoman = [
            'images/1728246786-leather jacket.jpg',
            'images/1728246786-leather jacket.jpg',
            'images/1728246786-leather jacket.jpg',
            'images/1728246786-leather jacket.jpg',
            'images/1728246786-leather jacket.jpg',
            'images/1728246786-leather jacket.jpg',
            'images/1728246786-leather jacket.jpg',
            'images/1728246786-leather jacket.jpg',
            'images/1728246786-leather jacket.jpg',
            'images/1728246786-leather jacket.jpg',
        ];

        $imagesman = [
            'images/1728246168-leather jacket.jpg',
            'images/1728246168-leather jacket.jpg',
            'images/1728246168-leather jacket.jpg',
            'images/1728246168-leather jacket.jpg',
            'images/1728246168-leather jacket.jpg',
            'images/1728246168-leather jacket.jpg',
            'images/1728246168-leather jacket.jpg',
            'images/1728246168-leather jacket.jpg',
            'images/1728246168-leather jacket.jpg',
            'images/1728246168-leather jacket.jpg',
        ];

        $titles = [
            'Classic Leather Jacket',
            'Modern Stylish Jacket',
            // 'Casual Everyday Jacket',
            // 'Trendy Outdoor Jacket',
            'Bold Fashion Leather Jacket',
            'Elegant Evening Jacket',
            // 'Sporty Leather Jacket',
            'Warm Winter Jacket',
            // 'Vintage Inspired Jacket',
            'Chic Urban Jacket',
            'Lightweight Summer Jacket',
            'Rugged Adventure Jacket',
            // 'Luxe Faux Leather Jacket',
            'Biker Style Jacket',
            'Denim Look Jacket',
        ];

        $descriptions = [
            'A stylish jacket perfect for the fall.',
            'Comfort meets elegance in this leather jacket.',
            'A trendy piece that completes any outfit.',
            'Durable and comfortable for everyday use.',
            'Fashion-forward and functional leather jacket.',
            'A timeless classic for any wardrobe.',
            'Perfect for layering or standalone wear.',
            'A bold choice for those who dare to stand out.',
            'Designed for comfort and style.',
            'Ideal for outdoor adventures and casual outings.',
        ];


        $prices = [
            150,
            200,
            250,
            300,
            350,
        ];

        for ($i = 0; $i <= 9; $i++) {
            Product::create([
                'image' => $imagesman[$i],
                'desc' => $descriptions[array_rand($descriptions)],
                'title' => $titles[array_rand($titles)],
                'price' => $prices[array_rand($prices)],
                'category_id' => 1,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ]);
        }


        for ($i = 0; $i <= 9; $i++) {
            Product::create([
                'image' => $imagesWoman[$i],
                'desc' => $descriptions[array_rand($descriptions)],
                'title' => $titles[array_rand($titles)],
                'price' => $prices[array_rand($prices)],
                'category_id' => 2,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ]);
        }
    }
}
