import React, { useState, useEffect, useCallback } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
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
import { useMediaQuery } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useQuery } from "react-query";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    fontSize: "16px",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: "14px",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const TableCreater = ({ companyId, data, type }) => {
  const [Headers, setHeaders] = useState([]);
  const [Data, setData] = useState([]);
  const isSmallScreen = useMediaQuery("(max-width:1120px)");
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("mymd"));

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

 const {
   data: fetchedData,
   isError,
   error,
 } = useQuery(
   [type, companyId], // Unique key for the query
   async () => {
     if (data) {
       return data;
     } else {
       if (type === "customers") {
         return await tableActions.fetchCustomers(companyId);
       } else if (type === "products") {
         return await tableActions.fetchProducts(companyId);
       }
     }
   },
   {
     staleTime: 1000 * 60 * 5, // The data will be considered fresh for 5 minutes
     cacheTime: 1000 * 60 * 30, // The data will be cached for 30 minutes
     retry: 1, // Retry once if the data fetching fails
   }
 );

 useEffect(() => {
   if (fetchedData) {
     setHeaders(Object.keys(fetchedData[0]).filter((key) => key !== "id"));
     setData(fetchedData);
   }
 }, [fetchedData]);

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

  const handleDelete = (row) => {
    if (type === "products") {
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

  if (isError) {
    return (
      {error}
    )
  }

  return (
    <Paper sx={{ width: "100%", overflowX: "hidden", overflowY: "hidden" }}>
      <TableContainer
        component={Paper}
        style={{
          overflowX: isMobile && "hidden",
          maxHeight: isSmallScreen ? 400 : "auto", // Set max height for small screens
          overflowY: isSmallScreen ? "auto" : "hidden", // Enable vertical scroll for small screens
        }}>
        <Table
          sx={{ minWidth: 650 }}
          size={isSmallScreen ? "small" : "medium"}
          dense={isSmallScreen} // Make table dense for small screens
          stickyHeader
          aria-label="sticky table">
          <TableHead>
            <TableRow>
              {Headers.map((header, index) => (
                <StyledTableCell key={index} align="left">
                  {header}
                </StyledTableCell>
              ))}
              <StyledTableCell align="center">Edit</StyledTableCell>
              <StyledTableCell align="center">Delete</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody className="table__body">
            {Data.map((row) => {
              return (
                <StyledTableRow key={row.id}>
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
                </StyledTableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default TableCreater;
