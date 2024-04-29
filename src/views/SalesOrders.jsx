import React, {useEffect, useState} from 'react'
import AddItem from '../components/AddItem';
import SalesOrderForms from '../components/SaleOrderForms';
import SearchField from '../components/SearchField';
import { useSelector } from 'react-redux';
// import TableCreater from '../components/TableCreater';
import { tableActions } from '../config/Functions';
import CollapsibleTable from '../components/CollapsibleTable';

const SalesOrders = () => {
  const companyId = useSelector(state => state.company.data.id)
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

  

  // const fetchReceipts = async () => {
  //   try {
  //     const response = await axios.get(`/api/receipts/${companyId}`);
  //     const data = response.data.map((item, index) => ({
  //       index: index + 1,
  //       worker: item.worker,
  //       customer: item.customerid,
  //       details: item.detail,
  //       total: item.total,
  //     }));
  //     return data;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const {
  //   data: receipts,
  //   isLoading,
  //   isError,
  // } = useQuery(["api/receipts", companyId], () =>
  //   fetchReceipts(companyId)
  // );

  // if (isLoading) return <div>Loading...</div>;
  // if (isError) return <div>Error fetching data</div>;

  return (
    <div className="page">
      <div className="heading">
        <div>
          <h1>Sales Order</h1>
        </div>
        <SearchField />
        <AddItem>
          <SalesOrderForms customerOptions={customerOptions} Products={productOptions}  />
        </AddItem>
      </div>

      <div className="content">
        {/* {receipts > 0 ? (
          <TableCreater data={receipts}  />
        ) : (
          <div className="content">
            <h2>No Sales Made yet</h2>
          </div>
        )} */}
        <CollapsibleTable />
      </div>
    </div>
  );
}

export default SalesOrders