import React from 'react'
import AddItem from '../components/AddItem';
import SalesOrderForms from '../components/SaleOrderForms';
import SearchField from '../components/SearchField';
import axios from '../config/index'
import { useSelector } from 'react-redux';
import TableCreater from '../components/TableCreater';
import { useQuery } from 'react-query';

const SalesOrders = () => {
  const companyId = useSelector(state => state.company.data.id)

  const fetchReceipts = async () => {
    try {
      const response = await axios.get(`/api/receipts/${companyId}`);
      const data = response.data.map((item, index) => ({
        index: index + 1,
        worker: item.worker,
        customer: item.customerid,
        details: item.detail,
        total: item.total,
      }));
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const {
    data: receipts,
    isLoading,
    isError,
  } = useQuery(["api/receipts", companyId], () =>
    fetchReceipts(companyId)
  );

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;

  return (
    <div className="page">
      <div className="heading">
        <div>
          <h1>Sales Order</h1>
        </div>
        <SearchField />
        <AddItem>
          <SalesOrderForms />
        </AddItem>
      </div>

      <div className="content">
        {receipts > 0 ? (
          <TableCreater data={receipts}  />
        ) : (
          <div className="content">
            <h2>No Sales Made yet</h2>
          </div>
        )}
      </div>
    </div>
  );
}

export default SalesOrders