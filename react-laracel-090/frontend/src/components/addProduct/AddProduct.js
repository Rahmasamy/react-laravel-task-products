import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  getCategory,
  show_add_products_Component,
} from "../../redux/ProductSlice";

const AddProduct = ({ onProductAdded }) => {
  const { categorys, loading, error, show_add_products_Component_value } =
    useSelector((state) => state.product);
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [desc, setDesc] = useState("");
  const [category_id, setCategory_id] = useState("");
  const [image, setImage] = useState(null);
  const [error1, setError] = useState("");
  const [addsuc, setAddsuc] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("price", price);
    formData.append("desc", desc);
    formData.append("category_id", category_id);
    formData.append("image", image);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/products/create",
        formData
      );
      console.log("Product added:", response.data);

      setAddsuc("Product added successfully!");
      
      setTitle("");
      setPrice("");
      setDesc("");
      setCategory_id("");
      setImage(null);

      setTimeout(() => {
        setAddsuc("");
        handleToggle();
      }, 2000);
    } catch (error) {
      setError(error.response?.data?.message || "Error adding product");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleToggle = () => {
    dispatch(show_add_products_Component());
  };

  return (
    <div
      className={`fixed inset-0 bg-white bg-opacity-90 flex justify-center items-center transition-opacity ${
        show_add_products_Component_value ? "opacity-100 block" : "opacity-0 hidden"
      }`}>
      
      <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full relative">
        
        
        <div className="text-right">
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={handleToggle}>
            X
          </button>
        </div>

        
        {addsuc && (
          <div className="absolute top-2 right-2 text-green-600 font-semibold bg-green-100 border border-green-400 rounded-lg px-4 py-2 shadow-md transition">
            {addsuc}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800">Sell an item</h2>

          
          {error1 && <p className="text-red-500">{error1}</p>}

          
          <div className="border-2 border-dashed border-gray-300 p-4 rounded-lg text-center">
            <label className="block mb-2 text-sm text-gray-600">
              Upload photos
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              required
              className="block mx-auto"
            />
          </div>

          
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded-lg"
          />

          
          <textarea
            placeholder="Describe your item"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded-lg"
          />

          
          <div>
            <label className="block mb-1 text-sm text-gray-600">Category</label>
            <select
              id="sort"
              value={category_id}
              onChange={(e) => setCategory_id(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg">
              <option value="">Select</option>
              {categorys.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.title}
                </option>
              ))}
            </select>
          </div>

          
          <div>
            <label className="block mb-1 text-sm text-gray-600">
              Item price
            </label>
            <div className="flex items-center">
              <span className="px-3 py-2 bg-gray-100 border border-r-0 border-gray-300 rounded-l-lg">
                £
              </span>
              <input
                type="number"
                placeholder="0.00"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                className="w-full p-2 border border-gray-300 rounded-r-lg"
              />
            </div>
          </div>

          
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
            disabled={loading || isSubmitting}
            style={{ backgroundColor: "#D9F99D", color: "#000" }}>
            {loading || isSubmitting ? "Adding..." : "Upload item"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
