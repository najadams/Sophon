import React from 'react'
import AddItem from '../components/AddItem';
import SalesOrderForms from '../components/SaleOrderForms';

const SalesOrders = () => {
  return (
    <div className="page">
      <div className="heading">
        <div>
          <h1>Sales Order</h1>
        </div>
        <AddItem>
          <SalesOrderForms />
        </AddItem>
      </div>

      <div className="content">
        {/* <TableCreater tableName={"Stock"} Data={Data} /> */}
      </div>
    </div>
  );
}

export default SalesOrders