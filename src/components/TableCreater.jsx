import React, { useState, useEffect, useCallback } from "react";
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
import axios from "../config";
import { useQueryClient, useMutation } from "react-query";
import { tableActions } from "../config/Functions";

const TableCreater = ({ companyId,data,  type }) => {
  const [Headers, setHeaders] = useState([]);
  const [Data, setData] = useState([]);

    const fetchData = useCallback(async () => {
      try {
        let fetchedData;
        if (data) {
          fetchedData = data;
        } else {
          if (type === "customers") {
            fetchedData = await tableActions.fetchCustomers(companyId);
          } else if (type === "products") {
            fetchedData = await tableActions.fetchProducts(companyId);
          }
        }
        setHeaders(Object.keys(fetchedData[0]).filter((key) => key !== "id"));
        setData(fetchedData);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    }, [companyId, type, data]);
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Inside your TableCreater component
  const queryClient = useQueryClient();

  const deleteProductMutation = useMutation(
    (id) => axios.delete(`/api/product/${id}`),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["api/products"]);
        fetchData();
      },
      onError: (error) => {
        console.error("Failed to delete product:", error);
      },
    }
  );

  const deleteCustomerMutation = useMutation(
    (id) => axios.delete(`/api/customer/${id}`),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["api/customers", companyId]);
        fetchData();
      },
      onError: (error) => {
        console.error("Failed to delete customer:", error);
      },
    }
  );

  const editProductMutation = useMutation(
    (values) => axios.patch(`/api/product/${values.id}`, values),
    {
      onSuccess: () => {
        console.log("first")
        queryClient.invalidateQueries(["api/products", companyId]);
        fetchData();
      },
      onError: (error) => {
        console.error("Failed to edit product:", error);
      },
    }
  );

  const editCustomerMutation = useMutation(
    (values) => axios.patch(`/api/customer/${values.id}`, values),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["api/customers", companyId]);
        fetchData();
      },
      onError: (error) => {
        console.error("Failed to edit customer:", error);
      },
    }
  );
  const addProductMutation = useMutation(
    (values) => axios.post(`/api/product`, values),
    {
      onSuccess: () => {
        console.log("first")
        queryClient.invalidateQueries(["api/products", companyId]);
        fetchData();
      },
      onError: (error) => {
        console.error("Failed to edit product:", error);
      },
    }
  );

  const addCustomerMutation = useMutation(
    (values) => axios.post(`/api/customer`, values),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["api/customers", companyId]);
        fetchData();
      },
      onError: (error) => {
        console.error("Failed to edit customer:", error);
      },
    }
  );


  const handleDelete = (row) => {
    if (type === "products") {
      window.alert("coco");
      deleteProductMutation.mutate(row.id);
    } else {
      deleteCustomerMutation.mutate(row.id);
    }
    console.log("Delete", row.name);
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
                    {type === "products" ? (
                      <ProductForm
                        editMutation={editProductMutation}
                        data={row}
                      />
                    ) : (
                      <CustomerForm
                        editMutation={editCustomerMutation}
                        data={row}
                      />
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
