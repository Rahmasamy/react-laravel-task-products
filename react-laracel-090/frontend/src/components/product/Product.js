import React from "react";

export default function Product({ product }) {
  return (
    <div className=" bg-white  rounded-lg ">
      <img
        src={`http://localhost:8000/${product.image}`}
        alt={product.title}
        className="w-full h-64 object-cover "
      />
      <div className="">
        <p className="text-lg font-semibold mt-4">{product.title}</p>

        <p className="text-gray-500 text-small mt-1 ">By: {product.desc}</p>
        <p className="text-gray-700 text-sm mt-1">
          £{product.price.toFixed(2)}
        </p>
        <p className="text-red-500 text-sm font-medium mt-2">
          {product.category_title}
        </p>
      </div>
    </div>
  );
}
