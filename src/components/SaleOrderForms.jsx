import React, { useState, useContext, useEffect } from "react";
import { Formik, Field, FieldArray, Form } from "formik";
import { Button, TextField, Typography } from "@mui/material";
import { Autocomplete } from "@mui/material";
import { Input } from "@mui/material";
import * as Yup from "yup";
import { tableActions } from "../config/Functions";
import { useSelector } from "react-redux";
import { DialogContext } from "../context/context";
import { useQuery } from "react-query";
import axios from "../config/index";
import useMediaQuery from "@mui/material/useMediaQuery";

const validationSchema = Yup.object().shape({
  customerName: Yup.string().required("Customer name is required"),
  products: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().required("Product name is required"),
      quantity: Yup.number()
        .required("Quantity is required")
        .min(1, "Quantity must be at least 1"),
      price: Yup.number().required("Price is required"),
    })
  ),
  total: Yup.number().required(),
});

const SalesOrderForms = ({ customerOptions, Products }) => {
  const workerId = useSelector((state) => state.workers.currentUser);
  const handleClose = useContext(DialogContext);
  const companyId = useSelector((state) => state.company.data.id);
  const [error, setError] = useState(null);
  const matchesMobile = useMediaQuery("(max-width:600px)");

  return (
    <div>
      <Formik
        initialValues={{
          customerName: "",
          products: [{ name: "", quantity: 1, totalPrice: 0, price: 0 }],
          total: 0,
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          const total = values.products.reduce(
            (sum, product) => sum + product?.totalPrice,
            0
          );
          values.total = total;
          try {
            console.log(values);
            setSubmitting(true);
            await tableActions.addReceipt(values, companyId, workerId);
          } catch (error) {
            console.log(error);
          }
          console.log(values);
        }}>
        {({ values, handleSubmit, setFieldValue, resetForm }) => (
          <Form className="form" style={{ margin: 10 }}>
            <Field name="customerName">
              {({ field, form }) => {
                const hasError = Boolean(
                  form.errors.customerName && form.touched.customerName
                );
                return (
                  <Autocomplete
                    {...field}
                    options={customerOptions}
                    value={field.value}
                    onChange={(event, newValue) => {
                      form.setFieldValue(field.name, newValue || "");
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        style={{ paddingBottom: 10 }}
                        label="Customer Name"
                        fullWidth
                        error={hasError}
                        helperText={hasError ? form.errors.customerName : ""}
                      />
                    )}
                  />
                );
              }}
            </Field>

            <hr style={{ height: 5, backgroundColor: "black" }} />
            <FieldArray name="products">
              {({ push, remove }) => (
                <div
                  style={{
                    display: "flex",
                    gap: matchesMobile ? 20 : 10,
                    flexDirection: matchesMobile ? "column" : "row",
                  }}>
                  {values.products.map((product, index) => {
                    const productOptions = Products.map((p) => p.name);
                    return (
                      <div key={index}>
                        <Field name={`products.${index}.name`}>
                          {({ field, form }) => (
                            <Autocomplete
                              options={productOptions}
                              value={product.name}
                              onChange={(event, newValue) => {
                                form.setFieldValue(field.name, newValue);
                                const selectedProduct = Products.find(
                                  (p) => p.name === newValue
                                );
                                const newTotalPrice =
                                  product.quantity *
                                  selectedProduct?.salesPrice;
                                setFieldValue(
                                  `products.${index}.totalPrice`,
                                  newTotalPrice
                                );
                                setFieldValue(
                                  `products.${index}.price`,
                                  selectedProduct?.salesPrice || 0
                                ); // Update price
                              }}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  label="Product Name"
                                  fullWidth={matchesMobile}
                                />
                              )}
                              autoSelect // Automatically select the first option
                            />
                          )}
                        </Field>

                        <Field
                          style={{
                            paddingRight: 10,
                            // flex: 1,
                            marginTop: matchesMobile ? 10 : 0,
                            width: matchesMobile ? "50%" : "auto",
                          }}
                          as={TextField}
                          name={`products.${index}.quantity`}
                          label="Quantity"
                          type="number"
                          validate={(value) => {
                            const selectedProduct = Products.find(
                              (p) => p.name === product.name
                            );
                            if (value > selectedProduct?.onhand) {
                              return "Quantity cannot exceed available stock";
                            }
                          }}
                          onChange={(event) => {
                            const newValue = parseInt(event.target.value);
                            setFieldValue(
                              `products.${index}.quantity`,
                              newValue
                            );
                            const selectedProduct = Products.find(
                              (p) => p.name === product.name
                            );
                            const newTotalPrice =
                              newValue * selectedProduct?.salesPrice;
                            setFieldValue(
                              `products.${index}.totalPrice`,
                              newTotalPrice
                            );
                          }}
                        />
                        <Field name={`products.${index}.price`}>
                          {({ field }) => (
                            <Input
                              value={
                                Products.find((p) => p.name === product.name)
                                  ?.salesPrice
                              }
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
                              value={product.totalPrice}
                              label="Total Price"
                              readOnly
                              inputProps={{
                                style: { textAlign: "right" },
                              }}
                            />
                          )}
                        </Field>
                        <Button
                          style={{ height: "80%", marginTop: 20 }}
                          variant="contained"
                          color="error"
                          onClick={() => remove(index)}>
                          Remove
                        </Button>
                      </div>
                    );
                  })}
                  <Button
                    variant="contained"
                    color="secondary"
                    type="button"
                    onClick={() => {
                      push({
                        name: "",
                        quantity: 1,
                        totalPrice: 0,
                        price: 0,
                      });
                    }}
                    disabled={
                      values.products.length > 0 &&
                      !Object.values(
                        values.products[values.products.length - 1]
                      ).every(Boolean)
                    }>
                    Add Product
                  </Button>
                </div>
              )}
            </FieldArray>
            <Field name="total">
              {({ field }) => (
                <Input
                  value={values.products.reduce(
                    (sum, product) => sum + product?.totalPrice,
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

            <div style={{ display: "flex", gap: 20 }}>
              <Button
                variant="contained"
                color="success"
                onClick={handleSubmit}
                type="submit">
                Save
              </Button>

              <Button variant="contained" color="info" type="submit">
                Save & Print
              </Button>
            </div>
          </Form>
        )}
      </Formik>
      {error && (
        <Typography align="center" color="red">
          {error}
        </Typography>
      )}
    </div>
  );
};

export default SalesOrderForms;