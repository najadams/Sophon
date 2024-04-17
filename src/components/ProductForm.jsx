
import { useState } from "react";
import { Formik, Field, Form } from "formik";
import { TextField } from "formik-material-ui";
import Button from "@mui/material/Button";
import * as Yup from "yup";
import LinearProgress from "@mui/material/LinearProgress";
import axios from "axios";
import { API_BASE_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { Typography, Snackbar } from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  costPrice: Yup.number().required("Required"),
  salesPrice: Yup.number().required("Required"),
  onHand: Yup.number().required("Required"),
});

const ProductForm = () => {
  const [error, setError] = useState(null);
  const [done, setDone] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const addProduct = async({name, costPrice, salesPrice, onHand}) => {
    try {
      const product = await axios.post(`${API_BASE_URL}/api/product/`, {
        name,
        costprice: costPrice,
        salesprice: salesPrice,
        onhand : onHand,
      });
      if (product.status === 201) {
        setDone(true);
        setOpen(true);
        setTimeout(() => navigate('/products'), 2000);
      }
    } catch (error) {
      setError(error.response.data.message);
    }
  }

  return (
    <div>
      <h1>Product Information</h1>
      <Formik
        initialValues={{
          name: "",
          costPrice: "",
          salesPrice: "",
          onHand: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(true);
          addProduct(values).finally(() => setSubmitting(false));
        }}>
        {({ submitForm, isSubmitting, handleChange, resetForm }) => (
          <Form className="form">
            <Field
              component={TextField}
              name="name"
              type="text"
              label="Name"
              onChange={(e) => {
                handleChange(e);
                setError(null);
              }}
            />
            <br />
            <Field
              component={TextField}
              type="number"
              label="costPrice"
              name="costPrice"
            />
            <br />
            <Field
              component={TextField}
              type="number"
              label="salesPrice"
              name="salesPrice"
            />
            <br />
            <Field
              component={TextField}
              type="number"
              label="onHand"
              name="onHand"
            />
            <br />
            {isSubmitting && <LinearProgress />}
            <br />
            {done ? (
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  resetForm()
                  setDone(false)  
                }}>
                Product Added
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                disabled={isSubmitting}
                onClick={submitForm}>
                Add Product
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
      {/* <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={() => setOpen(false)}
        message="Product added succesfully"
        anchorOrigin={{ vertical: "top", horizontal: "center" }}>
        <CheckCircleIcon />
      </Snackbar> */}
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={() => setOpen(false)}
        message="Product added succesfully"
        anchorOrigin={{ vertical: "top", horizontal: "center" }} />
    </div>
  );
};

export default ProductForm;
