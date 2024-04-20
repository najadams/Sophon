import React from "react";
import { useQuery } from "react-query";
import ProductForm from "../components/ProductForm";
import TableCreater from "../components/TableCreater";
import AddItem from "../components/AddItem";
import { API_BASE_URL } from "../config";
import axios from "../config/index";

const fetchProducts = async () => {
  const response = await axios.get(`/api/products`);
  const data = response.data.products.map((items, index) => ({
    id: index + 1,
    name: items.name,
    costPrice: items.costprice,
    salesPrice: items.salesprice,
    onHand: items.onhand,
  }));
  return data;
};

const ProductCatalogue = () => {
  const {
    data: products,
    isLoading,
    isError,
  } = useQuery("products", fetchProducts);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;

  return (
    <div className="page">
      <div className="heading">
        <div>
          <h1>Products</h1>
        </div>
        <AddItem>
          <ProductForm />
        </AddItem>
      </div>

      <div className="content">
        {products ? (
          <TableCreater tableName={"Stock"} Data={products} type="product" />
        ) : (
          <div className="nocontent">
            <h2>Add Products to Get Started</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCatalogue;
