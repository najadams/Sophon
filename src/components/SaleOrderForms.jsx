import React from "react";
import { Formik, Field, FieldArray, Form } from "formik";
import { Button, TextField } from "@mui/material";
// import { Autocomplete } from "formik-material-ui";
import { Autocomplete } from "@mui/material";
import { Input } from "@mui/material"; 
import { Products } from "../store/data";

const SalesOrderForms = () => {
  return (
    <Formik
      initialValues={{
        customerName: "",
        products: [{ name: "", quantity: 1 }],
      }}
      onSubmit={(values) => {
        // Handle form submission here
        console.log(values);
      }}>
      {({ values, handleSubmit }) => (
        <Form onSubmit={handleSubmit} className="form" style={{ margin: 10 }}>
          <Field
            component={TextField}
            type="text"
            name={`customerName`}
            label="Customer Name"
          />
          <FieldArray name="products">
            {({ push }) => (
              <div
                style={{ display: "flex", gap: 10, flexDirection: "column" }}>
                {values.products.map((product, index) => {
                  const productOptions = Products.map((p) => p.name);
                  const selectedProduct = Products.find(
                    (p) => p.name === product.name
                  );
                  const totalPrice =
                    product.quantity * (selectedProduct?.price || 0);
                  return (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        gap: 10,
                      }}>
                      <Field name={`products.${index}.name`}>
                        {({ field, form }) => (
                          <Autocomplete
                            options={productOptions}
                            value={product.name}
                            onChange={(event, newValue) => {
                              form.setFieldValue(field.name, newValue);
                            }}
                            renderInput={(params) => (
                              <TextField
                                style={{ flex: 1, width: 500 }}
                                {...params}
                                label="Product Name"
                                fullWidth
                              />
                            )}
                            autoSelect // Automatically select the first option
                          />
                        )}
                      </Field>

                      <Field
                        style={{ paddingRight: 10, flex: 1 }}
                        as={TextField}
                        name={`products.${index}.quantity`}
                        label="Quantity"
                        type="number"
                        validate={(value) => {
                          if (value > selectedProduct?.onhand) {
                            return "Quantity cannot exceed available stock";
                          }
                        }}
                      />
                      <Field name={`products.${index}.price`}>
                        {({ field }) => (
                          <Input
                            value={selectedProduct?.price}
                            label="Price"
                            readOnly
                            inputProps={{
                              style: { textAlign: "right" },
                            }}
                          />
                        )}
                      </Field>

                      <Field name={`products.${index}.totalPrice`}>
                        {({ field }) => (
                          <Input
                            value={totalPrice}
                            label="Total Price"
                            readOnly
                            inputProps={{
                              style: { textAlign: "right" },
                            }}
                          />
                        )}
                      </Field>
                    </div>
                  );
                })}
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
          <Field name="total">
            {({ field }) => (
              <Input
                value={values.products.reduce(
                  (sum, product) =>
                    sum +
                    product.quantity *
                      (Products.find((p) => p.name === product.name)?.price ||
                        0),
                  0
                )}
                label="Total"
                readOnly
                inputProps={{
                  style: { textAlign: "right" },
                }}
              />
            )}
          </Field>
        </Form>
      )}
    </Formik>
  );
};

export default SalesOrderForms