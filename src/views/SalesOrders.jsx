import React from 'react'
import AddItem from '../components/AddItem';
import SalesOrderForms from '../components/SaleOrderForms';
import SearchField from '../components/SearchField';

const SalesOrders = () => {
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
        <div className="filter">

        </div>
      </div>
    </div>
  );
}

export default SalesOrders