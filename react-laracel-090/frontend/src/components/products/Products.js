import React from "react";
import "./Products.css";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../loading/Loading";
import AddProduct from "../addProduct/AddProduct";
import Product from "../product/Product";
import { TabBar } from "../tab-bar/TabBar";
import { Pagination } from "../pagination/Pagination";

export default function Products() {
  const {
    products,
    loading,
    error,
    show_add_products_Component_value,
    empty_data,
  } = useSelector((state) => state.product);

  return (
    <div className="body bg-white">
      {show_add_products_Component_value && <AddProduct />}

      <TabBar />
      <div className="bg-white">
        {loading && <Loading />}
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
          {error && <p className="error">{error}</p>}

          {products.map((product) => (
            <Product key={product.id} product={product} />
          ))}
        </div>
        {empty_data && <p className="warnning">no data about your search</p>}
        <Pagination />
      </div>
    </div>
  );
}
