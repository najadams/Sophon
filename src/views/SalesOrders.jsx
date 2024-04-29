import React, { useEffect, useState } from "react";
import AddItem from "../components/AddItem";
import SalesOrderForms from "../components/SaleOrderForms";
import SearchField from "../components/SearchField";
import { useSelector } from "react-redux";
import { useQuery } from "react-query";
import { tableActions } from "../config/Functions";
import CollapsibleTable from "../components/CollapsibleTable";
import axios from "../config";

const SalesOrders = () => {
  const companyId = useSelector((state) => state.company.data.id);
  const [customerOptions, setCustomerOptions] = useState([]);
  const [productOptions, setProductOptions] = useState([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      const response = await tableActions.fetchCustomersNames(companyId);
      setCustomerOptions(response);
    };

    fetchCustomers();
  }, [companyId]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await tableActions.fetchProductNames(companyId);
      setProductOptions(response);
    };

    fetchProducts();
  }, [companyId]);

  const fetchReceipts = async () => {
    try {
      const response = await axios.get(`/api/receipts/${companyId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching receipts:", error);
      throw error;
    }
  };

  const {
    data: receipts,
    isLoading,
    isError,
  } = useQuery(["receipts", companyId], fetchReceipts, {
    refetchOnWindowFocus: true,
  });

  return (
    <div className="page">
      <div className="heading">
        <div>
          <h1>Sales Order</h1>
        </div>
        <SearchField />
        <AddItem>
          <SalesOrderForms
            customerOptions={customerOptions}
            Products={productOptions}
          />
        </AddItem>
      </div>

      <div className="content">
        {!isLoading && !isError && receipts && receipts.length > 0 ? (
          <CollapsibleTable receipts={receipts} />
        ) : (
          <div className="content">
            <h2>No Sales Made yet</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default SalesOrders;
