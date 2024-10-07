import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCategory,
  getProducts,
  show_add_products_Component,
} from "../../redux/ProductSlice";

export const TabBar = () => {
  const { categorys, currentPage, perPage } = useSelector(
    (state) => state.product
  );

  const [searchValue, setSearchValue] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [category_title, setCategory_title] = useState("");
  const [perPage1, setPerPage] = useState(perPage);
  const [currentPage1, setCurrentPage] = useState(currentPage);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);

  useEffect(() => {
    const queryParams = new URLSearchParams();

    if (selectedCategory) queryParams.append("category_id", selectedCategory);
    if (sortOption) queryParams.append("sort_by", sortOption);
    if (searchValue) queryParams.append("search", searchValue);
    queryParams.append("page", currentPage);
    queryParams.append("per_page", perPage);
    dispatch(
      getProducts({
        queryParams: queryParams.toString(),
      })
    );
  }, [
    selectedCategory,
    sortOption,
    searchValue,
    dispatch,
    currentPage,
    perPage,
  ]);

  const handleToggle = () => {
    dispatch(show_add_products_Component());
  };

  return (
    <div className="w-full p-4 bg-gray-50 ">
      <div className="flex justify-between items-center">
        {}
        <div
          className="flex items-center justify-between border border-gray-300 rounded-md w-1/3"
          style={{ backgroundColor: "#fff" }}>
          <input
            type="text"
            placeholder="Search by Product Name or Category"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="p-2 w-full rounded-md focus:outline-none "
            style={{ backgroundColor: "#fff" }}
          />
          <span className="p-2">
            <svg
              className="w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-4.35-4.35M18 10.5A7.5 7.5 0 1 1 3 10.5a7.5 7.5 0 0 1 15 0z"></path>
            </svg>
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <label htmlFor="sort" className="text-gray-600">
            Sort by:
          </label>
          <select
            id="sort"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="p-2 border border-gray-300 rounded-md focus:outline-none">
            <option value="">Sort By</option>
            <option value="asc">Price: Low to High</option>
            <option value="desc">Price: High to Low</option>
            <option value="title_asc">A - Z</option>
            <option value="title_desc">Z - A</option>
          </select>
        </div>

        {}
        <div className="flex items-center space-x-2">
          <label htmlFor="category" className="text-gray-600">
            Filter by:
          </label>
          <select
            id="category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="p-2 border border-gray-300 rounded-md focus:outline-none">
            <option value="">Filter By</option>
            {Array.isArray(categorys) &&
              categorys.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.title}
                </option>
              ))}
          </select>
        </div>

        <button
          className="bg-green-300 text-white px-4 py-2 rounded-md font-bold hover:bg-green-500"
          style={{ backgroundColor: "#D9F99D", color: "#000" }}
          onClick={handleToggle}>
          + Sell Item
        </button>
      </div>
    </div>
  );
};
