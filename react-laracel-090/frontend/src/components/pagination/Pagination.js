import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../redux/ProductSlice";

export const Pagination = () => {
  const { products, loading, totalCount } = useSelector(
    (state) => state.product
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [perPage, setPerPage] = useState(4);
  const dispatch = useDispatch();

  useEffect(() => {
    const queryParams = new URLSearchParams();
    queryParams.append("page", currentPage);
    queryParams.append("per_page", perPage);

    dispatch(getProducts({ queryParams: queryParams.toString() }));
  }, [currentPage, perPage, dispatch]);

  useEffect(() => {
    if (totalCount) {
      setTotalPages(Math.ceil(totalCount / perPage));
    }
  }, [totalCount, perPage]);

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handlePerPageChange = (event) => {
    setPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  return (
    <div className="flex items-center justify-between mt-4 space-x-2">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1 || loading}
        className={`px-4 py-2 bg-gray-200 text-gray-600 rounded-lg ${
          currentPage === 1 || loading ? "opacity-50 cursor-not-allowed" : ""
        }`}>
        Previous
      </button>

      <div className=" space-x-2 pagei">
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`px-3 py-1 text-gray-600 rounded-lg ${
              currentPage === index + 1
                ? "bg-yellow-300"
                : "bg-gray-200 hover:bg-gray-300"
            }`}>
            {index + 1}
          </button>
        ))}

        <div className="mt-4">
          <label className="text-gray-600 ">
            <span style={{ marginRight: "5rem" }}> Items per page:</span>
            <select
              value={perPage}
              onChange={handlePerPageChange}
              className="ml-2 px-3 py-1 border border-gray-300 rounded-md">
              <option value={10}>10</option>
              <option value={4}>4</option>
              <option value={8}>8</option>
              <option value={12}>12</option>
              <option value={20}>20</option>
            </select>
          </label>
        </div>
      </div>

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages || loading}
        className={`px-4 py-2 bg-gray-200 text-gray-600 rounded-lg ${
          currentPage === totalPages || loading
            ? "opacity-50 cursor-not-allowed"
            : ""
        }`}>
        Next
      </button>
    </div>
  );
};
