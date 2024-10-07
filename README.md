
# **Welcome to the Project!** 🚀
# **Product Filtering and Searching Application** 🎉

###  **Overview**
This project is a full-stack application that provides robust product management capabilities with the following features:

**Filtering by category name**
 - Sorting by price (low to high, high to low)
 - Sorting by title (A to Z, Z to A)
 - Searching by category name or product title

**Backend: Laravel**
  - Implements API for product retrieval with filters, search, and sorting.
  - Uses Eloquent ORM to manage relationships between Product and Category.

**Frontend: React**
  - Uses Redux and createAsyncThunk for state management and handling API requests.
  - Implements pagination and search with dynamic product list updates based on user input.

# **Backend - Laravel**
# **Prerequisites**
  - PHP >= 8.0
  - Composer
  - MySQL or any other database supported by Laravel

# **Installation**
# **Clone the repository:**

`git clone <repository-url>`
`cd <repository-folder>`

# **Install dependencies:**

`composer install`

Set up your .env file: Copy the .env.example to .env and update your database credentials.
cp .env.example .env
# **Run database migrations:**

`php artisan migrate`

# **Seed your database with test data (optional):**


`php artisan db:seed`

# **Start the development server:**

# **Run Project :**
`php artisan serve`

# **API Endpoints**

**HTTP Method	URL	Description**
  - GET	/api/products	Get all products, with filtering, sorting, and searching
  - GET	/api/categories	Get all categories

ProductController
index method

```
public function index(Request $request)
{
    $query = Product::with('category'); // Eager load category relationship

    // Filter by category name
    if ($request->has('category_name')) {
        $categoryName = $request->input('category_name');
        $query->whereHas('category', function ($q) use ($categoryName) {
            $q->where('name', 'like', '%' . $categoryName . '%');
        });
    }

    // Search by product title or category name
    if ($request->has('query')) {
        $search = $request->input('query');
        $query->where('title', 'like', "%{$search}%")
              ->orWhereHas('category', function ($q) use ($search) {
                  $q->where('name', 'like', "%{$search}%");
              });
    }

    // Sort by price or title
    if ($request->has('sort_by')) {
        $sortBy = $request->input('sort_by');
        $sortField = 'title'; // Default sort by title
        $sortOrder = 'asc';   // Default order is ascending

        switch ($sortBy) {
            case 'price_desc':
                $sortField = 'price';
                $sortOrder = 'desc';
                break;
            case 'price_asc':
                $sortField = 'price';
                $sortOrder = 'asc';
                break;
            case 'title_desc':
                $sortField = 'title';
                $sortOrder = 'desc';
                break;
            case 'title_asc':
                $sortField = 'title';
                $sortOrder = 'asc';
                break;
        }
        $query->orderBy($sortField, $sortOrder);
    }

    // Return paginated products
    $products = $query->paginate(10);

    return response()->json($products);
}
```
# **Backend Functionality**

1. **Get Products** (With Filters, Sorting, and Search)
   - **URL**: `/api/products`
   - **Method**: `GET`
   - **Query Parameters**:
     - `category`: Filter by category name
     - `query`: Search by product title
     - `sort_by`: Sort the results (`price_asc`, `price_desc`, `title_asc`, `title_desc`)
2. **Post Product**
  - **URL**: `/api/products`
  - **Method**: `POST`

# **Database Schema**

## **Products Table**
### **Database Structure**

### **Product Table**

| Field        | Type    | Description                      |
| ------------ | ------- | --------------------------------- |
| `id`         | int     | Primary key                       |
| `title`      | string  | Product title                     |
| `price`      | decimal | Product price                     |
| `category_id`| int     | Foreign key to categories table   |

#### Categories Table

| Field   | Type   | Description   |
| ------- | ------ | ------------- |
| `id`    | int    | Primary key   |
| `name`  | string | Category name |

### Example Query for Filtering, Sorting, and Searching:



# **Frontend-React**
# **Prerequisites**
 - Node.js >= 12
 - npm or yarn
 - Installation


**Navigate to the frontend directory:**

`cd frontend`

# **Install dependencies:**
`npm install`

**Start the React development server:**

`npm start`

# **Redux - State Management**

## **ProductSlice.js**
```
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Fetch products with filters, sorting, and searching
export const getProducts = createAsyncThunk(
  'product/getProducts',
  async ({ searchValue, selectedCategory, sortOption }) => {
    const params = {
      query: searchValue,
      category_name: selectedCategory,
      sort_by: sortOption,
    };

    const response = await axios.get('http://localhost:8000/api/products', { params });
    return response.data;
  }
);

const productSlice = createSlice({
  name: 'product',
  initialState: {
    products: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.data;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

```
```
export default productSlice.reducer;
Product Component (React)
jsx
Copy code
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from './ProductSlice';

export default function Product() {
  const [searchValue, setSearchValue] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortOption, setSortOption] = useState('title_asc');
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector(state => state.product);

  useEffect(() => {
    dispatch(getProducts({ searchValue, selectedCategory, sortOption }));
  }, [searchValue, selectedCategory, sortOption, dispatch]);

  return (
    <div>
      <input
        type="text"
        placeholder="Search products"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <select onChange={(e) => setSelectedCategory(e.target.value)}>
        <option value="">All Categories</option>
        {/* Dynamically populate categories here */}
      </select>
      <select onChange={(e) => setSortOption(e.target.value)}>
        <option value="title_asc">A to Z</option>
        <option value="title_desc">Z to A</option>
        <option value="price_asc">Price Low to High</option>
        <option value="price_desc">Price High to Low</option>
      </select>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <div>
        {products.map((product) => (
          <div key={product.id}>
            <p>{product.title}</p>
            <p>{product.price}</p>
          </div>
        ))}

      </div>
    </div>
  );
}

        ```
