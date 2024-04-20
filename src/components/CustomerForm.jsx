import { DialogContext } from "../context/context";
import React, {useState, useContext} from "react";
import { Formik, Field, Form } from "formik";
import { TextField } from "formik-material-ui";
import { Typography, Snackbar } from "@mui/material";
import Button from "@mui/material/Button";
import * as Yup from "yup";
import LinearProgress from "@mui/material/LinearProgress";
import { useSelector, useDispatch } from "react-redux";
import axios from '../config'
import { ActionCreators } from "../actions/action";


const validationSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  phone: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  address: Yup.string(),
  company: Yup.string().required("Required"),
});

const CustomerForm = ({ data = null }) => {
  const [error, setError] = useState(null);
  const [done, setDone] = useState(false);
  const [open, setOpen] = useState(false);
  const companyId = useSelector((state) => state.company.data.id);
  const handleClose = useContext(DialogContext);
  const dispatch = useDispatch();

   const updateCustomer = async ({
     _id,
     name,
     phone,
     email,
     address,
     company
   }) => {
     try {
       const customer = await axios.patch(`/api/product/${data.id}`, {
         id: _id,
         name,
         phone,
         email,
         address,
         company
       });
       if (customer.status === 200) {
         setOpen(true);
         setTimeout(() => {
           handleClose(); // close the dialog
         }, 2000);
       }
     } catch (error) {
       setError(error.response?.data?.message || "An error occurred");
     }
   };

   const addCustomer = async ({ companyId, name, phone, email, address, company}) => {
     try {
       const customer = await axios.post(`/api/customer/`, {
         belongsTo : companyId,
         name,
         phone,
         email,
         address,
         company : company,
       });
       if (customer.status === 201) {
         setDone(true);
         setOpen(true);
         dispatch(ActionCreators.addCustomer(customer));
       }
     } catch (error) {
       setError(error.response?.data?.message || "An error occurred");
     }
   };

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
            company: "",
          }
        }
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(true);
          if (data) {
            updateCustomer(values).finally(() => setSubmitting(false));
          } else {
            addCustomer({ ...values, companyId }).finally(() =>
              setSubmitting(false)
            );
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
            />
            <br />
            <Field
              component={TextField}
              type="email"
              label="Email"
              name="email"
            />
            <br />
            <Field
              component={TextField}
              type="text"
              label="Address"
              name="address"
            />
            <br />
            <Field
              component={TextField}
              type="text"
              label="Company Name"
              name="company"
            />
            <br />
            {isSubmitting && <LinearProgress />}
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
                {data ? "Save Changes" : "Add Customer"}
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
          !data ? "Customer added successfully" : "Customer Changed Successfully"
        }
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      />
    </div>
  );};

export default CustomerForm;
