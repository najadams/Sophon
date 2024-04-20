import React from "react";
import { useQuery } from "react-query";
import ProductForm from "../components/ProductForm";
import TableCreater from "../components/TableCreater";
import AddItem from "../components/AddItem";
import axios from "../config/index";
import { useSelector } from "react-redux";

const fetchCustomers = async (companyId) => {
  try {
    const response = await axios.get(`/api/customers/${companyId}`);
    const data = response.data.customers.map((item, index) => ({
      id: index + 1,
      name: `${item.firstname}  ${item.lastname}`,
      company: item.company,
      
    }));
    return data;
  } catch (error) {
    throw new Error("Failed to fetch customers");
  }
};

const Customers = () => {
  const companyId = useSelector((state) => state.company.data.id);
  const {
    data: customers,
    isLoading,
    isError,
  } = useQuery(["api/customers", companyId], () => fetchCustomers(companyId));

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;

  return (
    <div className="page">
      <div className="heading">
        <div>
          <h1>Customers</h1>
        </div>
        <AddItem>
          <ProductForm />
        </AddItem>
      </div>

      <div className="content">
        {customers.length > 0 ? (
          <TableCreater tableName={"Stock"} Data={customers} type="product" />
        ) : (
          <div className="content">
            <h2>Add Customers to Get Started</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default Customers;
