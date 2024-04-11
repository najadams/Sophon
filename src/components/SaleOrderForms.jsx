import React from "react";
import { Formik, Field, FieldArray, Form } from "formik";
import { Button, TextField } from "@mui/material";

const SalesOrderForms = () => {
  return (
      <Formik
      initialValues={{ products: [{ name: "", quantity: 1 }] }}
      onSubmit={(values) => {
        // Handle form submission here
        console.log(values);
      }}>
      {({ values, handleSubmit }) => (
        <Form onSubmit={handleSubmit} className="form" style={{ margin : 10}}>
          <FieldArray name="products">
            {({ push }) => (
              <div style={{display : "flex", gap: 10, flexDirection: 'column'}}>
                {values.products.map((product, index) => (
                  <div key={index}>
                    <Field
                      style={{paddingRight : 10}}
                      as={TextField}
                      name={`products.${index}.name`}
                      label="Product Name"
                    />
                    <Field
                      as={TextField}
                      name={`products.${index}.quantity`}
                      label="Quantity"
                      type="number"
                    />
                  </div>
                ))}
                <Button
                  variant="contained"
                  color="secondary"
                  type="button"
                  onClick={() => push({ name: "", quantity: 1 })}>
                  Add Product
                </Button>
              </div>
            )}
          </FieldArray>
                  <div style={{ display : 'flex', gap: 10}}>
            <Button variant="contained" color="success" type="submit">Save</Button>
            <Button
              variant="contained"
              color="info"
              type="button"
              onClick={() => {
                // Handle print receipt here
              }}>
              Print Receipt
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default SalesOrderForms;
