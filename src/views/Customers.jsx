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
  const {
    data: customers,
    isLoading,
    isError,
  } = useQuery(["api/customers", companyId], () =>
    tableActions.fetchCustomers(companyId)
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
