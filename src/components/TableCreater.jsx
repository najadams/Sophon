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

const TableCreater = ({ tableName, Data, type = "product" }) => {
  // const content = {
  //   product: <ProductForm />,
  //   customer: <CustomerForm />,
  //   default: <ProductForm />,
  // };

  const [Headers, setHeaders] = useState([]);

  useEffect(() => {
    if (Data.length > 0) {
      const items = Object.keys(Data[0]);
      setHeaders(items);
    }
  }, [Data]);

  // const handleEdit = async (row) => {
  //    try {
  //      const item = await axios.patch(`${API_BASE_URL}/api/${type}/:id`, (row));
  //      console.log(row)

  //   } catch (error) {
  //     console.log(error.response.data.message);
  //   }
  // };

  const handleDelete = (row) => {
    console.log("Delete", row);
  };

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow style={{ fontWeight: "bold", fontSize: 32 }}>
            {Headers.map((header) => (
              <TableCell align="left">{header}</TableCell>
            ))}
            <TableCell align="center">Edit</TableCell>
            <TableCell align="center">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Data.map((row, index) => (
            <TableRow key={row._id}>
              {Headers.map((header) => (
                <TableCell align="left">{row[header]}</TableCell>
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
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableCreater;
