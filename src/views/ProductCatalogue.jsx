import React from 'react'
import ProductForm from '../components/ProductForm';
import TableCreater from '../components/TableCreater';
import AddItem from '../components/AddItem';

const ProductCatalogue = () => {
 const Data = [
   {
     _id: "1",
     Name: "John Doe",
     Role: "Software Engineer",
     Experience: "5 years",
     Skills: "React, Node.js",
   },
   {
     _id: "2",
     Name: "Jane Smith",
     Role: "Data Scientist",
     Experience: "3 years",
     Skills: "Python, R, SQL",
   },
 ];
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
        <TableCreater tableName={'Stock'} Data={Data} />
      </div>
    </div>
  );
}


export default ProductCatalogue