import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import EditButton from "./EditButton";
import ProductForm from "./ProductForm";
import CustomerForm from "./CustomerForm";
import axios from '../config'

const TableCreater = ({ tableName, Data, type = "product" }) => {
  const [Headers, setHeaders] = useState([]);

  useEffect(
    (id) => {
      if (Data.length > 0) {
        // Extract all keys except 'id' from the first data item
        const items = Object.keys(Data[0]).filter((key) => key !== "id");
        setHeaders(items);
      }
    },
    [Data]
  );

  const deleteProduct = async (id) => {
    axios.delete(`/api/product/${id}`);
  };
  const deleteCustomer = async (id) => {
    axios.delete(`/api/customer/${id}`);
  };
  const handleDelete = (row, type) => {
    if (type === 'products') {
      deleteProduct(row.id);
    } else {
      deleteCustomer(row.id)
    }
    console.log("Delete", row.id);
  };

 const capitalizeFirstLetter = (str) => {
   if (typeof str === "string") {
     return str.charAt(0).toUpperCase() + str.slice(1);
   }
   return str;
 };

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead style={{ fontWeight: "bold", fontSize: 40 }}>
          <TableRow>
            {Headers.map((header, index) => (
              <TableCell key={index} align="left">
                {header}
              </TableCell>
            ))}
            <TableCell align="center">Edit</TableCell>
            <TableCell align="center">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Data.map((row) => {
            return (
              <TableRow key={row.id}>
                {/* Exclude ID from rendering */}
                {Headers.map((header) => (
                  <TableCell align="left">
                    {capitalizeFirstLetter(row[header])}
                  </TableCell>
                ))}
                <TableCell align="center">
                  <EditButton values={row}>
                    {type === "product" ? (
                      <ProductForm data={row} />
                    ) : (
                      <CustomerForm data={row} />
                    )}
                  </EditButton>
                </TableCell>
                <TableCell align="right">
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDelete(row)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableCreater;
