import React, {useState, useContext} from "react";
import { Formik, Field, FieldArray, Form } from "formik";
import { Button, TextField, Typography } from "@mui/material";
import { Autocomplete } from "@mui/material";
import { Input } from "@mui/material";
import { Products, Data } from "../store/data";
import * as Yup from "yup";
import { tableActions } from "../config/Functions";
import { useSelector } from "react-redux";
import { DialogContext } from "../context/context";


const validationSchema = Yup.object().shape({
  customerName: Yup.string()
    .required("Customer name is required")
    .test(
      "is-valid-customer",
      "Customer name must be selected from the list",
      (value) => {
        // Check if the customer name is included in the list of options
        return Data.map((c) => c.companyName).includes(value);
      }
    ),
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


const SalesOrderForms = () => {
  const workerId = useSelector((state) => state.workers.currentUser);
  const handleClose = useContext(DialogContext)
  const companyId = useSelector((state) => state.company.data.id)
  const [error, setError] = useState(null)
  const customerOptions = Data.map((c) => c.companyName);

    useEffect(() => {
      // Fetch customer details from MongoDB database
      const fetchCustomers = async () => {
        try {
          const response = await fetch("/api/customers"); // Adjust the endpoint URL according to your backend setup
          if (response.ok) {
            const data = await response.json();
            setCustomerOptions(data.customers); // Assuming customers are returned in the form { companyName: "Company Name" }
          } else {
            throw new Error("Failed to fetch customers");
          }
        } catch (error) {
          console.error("Error fetching customers:", error);
          setError("Failed to fetch customers");
        }
      };

      fetchCustomers();
    }, []);

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
          const total = values.products.reduce((sum, product) => sum + product?.totalPrice, 0)
          values.total = total
          console.log(values)
          window.alert(JSON.stringify(values, null, 2)); 
          setSubmitting(true);
          try {
            await tableActions.addReceipt(values)
          } catch (error) {
            console.log(error)
          }
          console.log(values)
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
                      push({ name: "", quantity: 1, totalPrice: 0, price: 0 });
                      console.log("first")
                    }
                    }
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
                type="submit"
              >
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