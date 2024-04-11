import React from 'react'
import CustomerForm from '../components/CustomerForm'
import AddItem from '../components/AddItem'
import TableCreater from '../components/TableCreater';
import { Data } from '../store/data'

const Customers = () => {
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
        <TableCreater Data={Data} />
      </div>
    </div>
  );
}

export default Customers