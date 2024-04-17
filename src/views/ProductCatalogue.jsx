import React from 'react'
import ProductForm from '../components/ProductForm';
import TableCreater from '../components/TableCreater';
import AddItem from '../components/AddItem';
import { Data } from '../store/data'

const ProductCatalogue = () => {
  return (
    <div className="page">
      <div className="heading">
        <div>
          <h1>Products</h1>
        </div>
        <AddItem>
          <ProductForm />
        </AddItem>
      </div>

      <div className="content">
        <TableCreater tableName={'Stock'} Data={Data} type='product' />
      </div>
    </div>
  );
}


export default ProductCatalogue