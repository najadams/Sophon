import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import {
  Container,
  Typography,
  Button,
  Grid,
  Paper,
  Divider,
  FormControlLabel,
  Snackbar,
  Switch,
} from "@mui/material";
import { TextField } from "formik-material-ui";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import { tableActions } from "../config/Functions";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Employee Name is required"),
  username: Yup.string().required("Username is required"),
  contact: Yup.string().required("Contact is required"),
  password: Yup.string().required("Password is required"),
  privileges: Yup.object().shape({
    makeSalesOnly: Yup.boolean(),
    addInventory: Yup.boolean(),
    editData: Yup.boolean(),
    accessData: Yup.boolean(),
  }),
});

const WorkerForm = () => {
  const [open, setOpen] = useState(false);
  const companyId = useSelector((state) => state.companyState.data.id);
  const [error, setError] = useState(null);
  return (
    <div className="page">
      <Container maxWidth="lg">
        <Typography variant="h4" gutterBottom>
          Add Employee
        </Typography>
        <Formik
          initialValues={{
            name: "",
            username: "",
            contact: "",
            password: "",
            privileges: {
              makeSalesOnly: false,
              addInventory: false,
              editData: false,
              accessData: false,
            },
          }}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            setSubmitting(true);
            try {
              await tableActions.addWorker({ ...values, companyId });
              if (error) {
                setError(error);
              }
              console.log(JSON.stringify(values, null, 2));
              setOpen(true);
              resetForm();
            } catch (error) {
              console.log(error);
            }
          }}>
          {({ values, setFieldValue, handleChange, errors }) => (
            <Form>
              <Paper sx={{ p: 3, mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Information
                </Typography>
                <Divider />
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <Field
                      component={TextField}
                      name="name"
                      label="Employee Name"
                      fullWidth
                      variant="outlined"
                      margin="normal"
                      onBlur={(e) => {
                        const trimmedValue = e.target.value.trim(); // Trim leading and trailing whitespace
                        const lowercaseValue = trimmedValue.toLowerCase(); // Convert to lowercase
                        e.target.value = lowercaseValue; // Update the input value
                        handleChange(e); // Proceed with Formik's handleChange
                      }}
                    />
                    <ErrorMessage name="name" component="div" />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field
                      component={TextField}
                      name="username"
                      label="Username"
                      fullWidth
                      variant="outlined"
                      margin="normal"
                      onBlur={(e) => {
                        const trimmedValue = e.target.value.trim(); // Trim leading and trailing whitespace
                        const lowercaseValue = trimmedValue.toLowerCase(); // Convert to lowercase
                        e.target.value = lowercaseValue; // Update the input value
                        handleChange(e); // Proceed with Formik's handleChange
                      }}
                    />
                    <ErrorMessage name="username" component="div" />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field
                      component={TextField}
                      name="contact"
                      label="Contact"
                      fullWidth
                      variant="outlined"
                      margin="normal"
                    />
                    <ErrorMessage name="contact" component="div" />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field
                      component={TextField}
                      type="password"
                      name="password"
                      label="Password"
                      fullWidth
                      variant="outlined"
                      margin="normal"
                    />
                    <ErrorMessage name="password" component="div" />
                  </Grid>
                </Grid>
              </Paper>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Privileges
                </Typography>
                <Divider />
                <FormControlLabel
                  control={
                    <Switch
                      checked={values.privileges.makeSalesOnly}
                      onChange={() => {
                        setFieldValue(
                          "privileges.makeSalesOnly",
                          !values.privileges.makeSalesOnly
                        );
                        if (!values.privileges.makeSalesOnly) {
                          // Turn off other switches if makeSalesOnly is turned on
                          setFieldValue("privileges.addInventory", false);
                          setFieldValue("privileges.editData", false);
                          setFieldValue("privileges.accessData", false);
                        }
                      }}
                    />
                  }
                  label="Only Make Sales"
                />

                <FormControlLabel
                  control={
                    <Switch
                      checked={values.privileges.accessData}
                      disabled={
                        values.privileges.makeSalesOnly ||
                        (values.privileges.addInventory &&
                          values.privileges.editData) ||
                        values.privileges.editData ||
                        values.privileges.addInventory
                      }
                      onChange={() => {
                        setFieldValue(
                          "privileges.accessData",
                          !values.privileges.accessData
                        );
                      }}
                    />
                  }
                  label="Access To Data"
                />

                <FormControlLabel
                  control={
                    <Switch
                      checked={values.privileges.addInventory}
                      disabled={values.privileges.makeSalesOnly}
                      onChange={() => {
                        setFieldValue(
                          "privileges.addInventory",
                          !values.privileges.addInventory
                        );
                        // Automatically turn on accessData if addInventory is turned on
                        if (
                          !values.privileges.accessData ||
                          !values.privileges.editData
                        ) {
                          setFieldValue("privileges.accessData", true);
                        }
                      }}
                    />
                  }
                  label="Add New Data"
                />

                <FormControlLabel
                  control={
                    <Switch
                      checked={values.privileges.editData}
                      disabled={values.privileges.makeSalesOnly}
                      onChange={() => {
                        setFieldValue(
                          "privileges.editData",
                          !values.privileges.editData
                        );
                        // Automatically turn on accessData if editData is turned on
                        if (
                          !values.privileges.accessData &&
                          !values.privileges.addInventory
                        ) {
                          setFieldValue("privileges.accessData", true);
                        }
                      }}
                    />
                  }
                  label="Edit Existing Data"
                />
              </Paper>
              <Button
                variant="contained"
                color="primary"
                sx={{ mt: 3 }}
                type="submit">
                Add Employee
              </Button>
            </Form>
          )}
        </Formik>
      </Container>
      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={() => setOpen(false)}
        message={"Employee successfully Added"}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      />
    </div>
  );
};

export default WorkerForm;
