import React from "react";
import { useQuery,useMutation } from "react-query";
import TableCreater from "../components/TableCreater";
import AddItem from "../components/AddItem";
import axios from "../config/index";
import { useSelector } from "react-redux";
import CustomerForm from "../components/CustomerForm";
import { useQueryClient } from "react-query";


export const fetchCustomers = async (companyId) => {
  try {
    const response = await axios.get(`/api/customers/${companyId}`);
    const data = response.data.customers.map((item, index) => ({
      id : item._id,
      index : index + 1,
      company: item.company,
      name: item.name,
      phone : item.phone,
      email: item.email,
      address : item.address ? item.address : 'None'
      
    }));
    return data;
  } catch (error) {
    throw new Error("Failed to fetch customers");
  }
};

const Customers = () => {
  const queryClient = useQueryClient()
  const companyId = useSelector((state) => state.company.data.id);
  const mutation = useMutation(
    (newCustomer) => axios.post("/api/customer", newCustomer),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("api/customers");
      },
    }
  );
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
          <CustomerForm />
        </AddItem>
      </div>

      <div className="content">
        {customers.length > 0 ? (
          <TableCreater tableName={"Customers"} Data={customers} type="customers" />
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
