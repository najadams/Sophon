import React, {useEffect, useState} from 'react'
import CustomerForm from '../components/CustomerForm'
import AddItem from '../components/AddItem'
import TableCreater from '../components/TableCreater';
import axios from '../config/index';

const Customers = () => {
  const [customers, setCustomers] = useState(null)
  useEffect(() => {
    const getCustomers = async () => {
      const results = await axios.get(`/api/customers`);
      setCustomers(
        results.data.customers.map((items) => {
          return {
            name: items.name,
            costPrice: items.costprice,
            salesPrice: items.salesprice,
            onHand: items.onhand,
          };
        })
      );
      return;
    };
    getCustomers();
  }, []);

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
        {/* <TableCreater Data={customers} type='customer' /> */}
      </div>
    </div>
  );
}

export default Customers