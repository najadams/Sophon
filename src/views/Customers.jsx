import React from "react";
import { useQuery } from "react-query";
import TableCreater from "../components/TableCreater";
import AddItem from "../components/AddItem";
import { useSelector } from "react-redux";
import CustomerForm from "../components/CustomerForm";
import { tableActions } from "../config/Functions";
import SearchField from "../components/SearchField";
import axios from '../config'

const Customers = () => {
  const companyId = useSelector((state) => state.company.data.id);
  const fetchCustomers = async (companyId) => {
    try {
      const response = await axios.get(`/api/customers/${companyId}`);
      const data = response.data.customers.map((item, index) => ({
        id: item._id,
        index: index + 1,
        company: item.company,
        name: item.name,
        phone: item.phone,
        email: item.email,
        address: item.address ? item.address : "None",
      }));
      return data;
    } catch (error) {
      throw new Error("Failed to fetch customers");
    }
  }
  const {
    data: customers,
    isLoading,
    isError,
  } = useQuery(["api/customers", companyId], () =>
    fetchCustomers(companyId)
  );

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;

  return (
    <div className="page">
      <div className="heading">
        <div>
          <h1>Customers</h1>
        </div>
        <SearchField />
        <AddItem>
          <CustomerForm />
        </AddItem>
      </div>

      <div className="content">
        {customers.length > 0 ? (
          <TableCreater companyId={companyId} type="customers" />
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
