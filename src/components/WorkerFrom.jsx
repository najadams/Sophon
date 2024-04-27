import React, { useState, useContext } from "react";
import { Formik, Field, Form } from "formik";
import { TextField } from "formik-material-ui";
import {
  Typography,
  Snackbar,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import Button from "@mui/material/Button";
import * as Yup from "yup";
import LinearProgress from "@mui/material/LinearProgress";
import { useSelector, useDispatch } from "react-redux";
import { ActionCreators } from "../actions/action";
import { tableActions } from "../config/Functions";
import { DialogContext } from "../context/context";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  phone: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  address: Yup.string(),
  adminstatus: Yup.boolean()
    .oneOf([true, false], "AdminStatus"),
});

const WorkerForm = ({ data, editMutation }) => {
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [done, setDone] = useState(false);
  const handleClose = useContext(DialogContext);
  const companyId = useSelector((state) => state.company.data.id);
  const dispatch = useDispatch();

  return (
    <div>
      <h1>Customer Information</h1>
      <Formik
        initialValues={
          data || {
            name: "",
            phone: "",
            email: "",
            address: "",
            agreeToTerms: false,
          }
        }
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(true);
          try {
            let error;
            let customer;
            if (data) {
              error = await tableActions.updateCustomer(values);
            } else {
              const result = await tableActions.addCustomer({
                ...values,
                companyId,
              });
              if (typeof result === "string") {
                error = result;
              } else {
                customer = result;
                dispatch(ActionCreators.addCustomer(customer));
                setDone(true);
              }
            }
            if (error) {
              setError(error); // Set the error state if there's an error
            } else {
              setOpen(true); // Open the Snackbar on success
              editMutation.mutate(values);
              setTimeout(() => {
                handleClose(); // Close the Snackbar after a delay
              }, 2000);
            }
          } catch (err) {
            console.error(err);
          } finally {
            setSubmitting(false);
          }
        }}>
        {({ submitForm, isSubmitting, handleChange, resetForm }) => (
          <Form className="form">
            <Field component={TextField} name="name" type="text" label="Name" />
            <br />
            <Field
              component={TextField}
              name="phone"
              type="text"
              label="Phone"
              onChange={(e) => {
                handleChange(e);
                setError(null);
              }}
            />
            <br />
            <Field
              component={TextField}
              type="email"
              label="Email"
              name="email"
              onChange={(e) => {
                handleChange(e);
                setError(null);
              }}
            />
            <br />
            <Field
              component={TextField}
              type="text"
              label="Address"
              name="address"
              onChange={(e) => {
                handleChange(e);
                setError(null);
              }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={values.adminstatus}
                  onChange={handleChange}
                  name="adminstatus"
                  color="primary"
                />
              }
              label="I agree to the terms and conditions"
            />
            <br />
            {isSubmitting && <LinearProgress />}
            <br />
            {done ? (
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  resetForm();
                  setDone(false);
                }}>
                Customer Added! Click to Add New Customer
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                disabled={isSubmitting}
                onClick={submitForm}>
                {data ? "Save Changes" : "Add Worker"}
              </Button>
            )}
          </Form>
        )}
      </Formik>
      {error && (
        <Typography align="center" color="red">
          {error}
        </Typography>
      )}
      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={() => setOpen(false)}
        message={
          !data
            ? "Worker added successfully"
            : "Worker Changed Successfully"
        }
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      />
    </div>
  );
};

export default WorkerForm;