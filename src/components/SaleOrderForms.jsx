import React from "react";
import { Formik, Field, FieldArray, Form } from "formik";
import { Button, TextField } from "@mui/material";
import { Autocomplete } from "@mui/material";
import { Input } from "@mui/material";
import { Products, Data } from "../store/data";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  customerName: Yup.string().required("Required"),
  products: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().required("Required"),
      quantity: Yup.number().required("Required"),
      price: Yup.number().required("Required"), // Ensure price is required
    })
  ),
});

const SalesOrderForms = () => {
  const customerOptions = Data.map((c) => c.companyName);
  return (
    <Formik
      initialValues={{
        customerName: "",
        products: [{ name: "", quantity: 1, totalPrice: 0, price: 0 }],
        totalCost: 0,
      }}
      validationSchema={validationSchema}
      onSubmit={async (values) => {
        // Calculate total cost
        const totalCost = values.products.reduce(
          (sum, product) => sum + product.totalPrice,
          0
        );
        // Add totalCost to form values
        const formValuesWithTotalCost = { ...values, totalCost };
        // Submit form values
        await new Promise((r) => setTimeout(r, 500));
        alert(JSON.stringify(formValuesWithTotalCost, null, 2));
      }}>
      {({ values, handleSubmit, setFieldValue }) => (
        <Form className="form" style={{ margin: 10 }}>
          <Field
            name="customerName"
            component={({ field, form }) => (
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
                  />
                )}
              />
            )}
          />

          <hr style={{ height: 5, backgroundColor: "black" }} />
          <FieldArray name="products">
            {({ push }) => (
              <div
                style={{ display: "flex", gap: 10, flexDirection: "column" }}>
                {values.products.map((product, index) => {
                  const productOptions = Products.map((p) => p.name);
                  return (
                    <div key={index} style={{ display: "flex", gap: 10 }}>
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
                                product.quantity * selectedProduct?.salesPrice;
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
                                style={{ flex: 1, width: 200 }}
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
                          const selectedProduct = Products.find(
                            (p) => p.name === product.name
                          );
                          if (value > selectedProduct?.onHand) {
                            return "Quantity cannot exceed available stock";
                          }
                        }}
                        onChange={(event) => {
                          const newValue = parseInt(event.target.value);
                          setFieldValue(`products.${index}.quantity`, newValue);
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
                    </div>
                  );
                })}
                <Button
                  variant="contained"
                  color="secondary"
                  type="button"
                  onClick={() =>
                    push({ name: "", quantity: 1, totalPrice: 0, price: 0 })
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
                name="totalCost"
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
              // type="submit"
            >
              Save
            </Button>

            <Button variant="contained" color="info" type="button">
              Save & Print
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default SalesOrderForms;
