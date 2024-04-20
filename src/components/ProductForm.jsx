
import { useState , useContext } from "react";
import { Formik, Field, Form } from "formik";
import { TextField } from "formik-material-ui";
import Button from "@mui/material/Button";
import * as Yup from "yup";
import LinearProgress from "@mui/material/LinearProgress";
import axios from "axios";
import { API_BASE_URL } from "../config";
import { Typography, Snackbar } from "@mui/material";
import { DialogContext } from "../context/context";
import { useDispatch } from "react-redux";
import { ActionCreators } from "../actions/action";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  costPrice: Yup.number().required("Required"),
  salesPrice: Yup.number().required("Required"),
  onHand: Yup.number().required("Required"),
});

const ProductForm = ({data}) => {
  const [error, setError] = useState(null);
  const [done, setDone] = useState(false);
  const [open, setOpen] = useState(false);
  const handleClose = useContext(DialogContext);
  const dispatch = useDispatch();

   const updateProduct = async ({ _id, name, costPrice, salesPrice, onHand }) => {
     try {
       const product = await axios.patch(
         `${API_BASE_URL}/api/product/${data.id}`,
         {
           id : _id,
           name,
           costprice: costPrice,
           salesprice: salesPrice,
           onhand: onHand,
         }
       );
       if (product.status === 200) {
         setOpen(true);
         setTimeout(() => {
           handleClose(); // close the dialog
         }, 2000);
        }
     } catch (error) {
       setError(error.response.data.message);
     }
   };

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
        dispatch(ActionCreators.addProduct(product));

      }
    } catch (error) {
      setError(error.response.data.message);
    }
  }


  return (
    <div>
      <h1>Product Information</h1>
      <Formik
        initialValues={
          data || {
            name: "",
            costPrice: "",
            salesPrice: "",
            onHand: "",
          }
        }
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(true);
          if (data) {
            updateProduct(values).finally(() => setSubmitting(false));
          } else {
            addProduct(values).finally(() => setSubmitting(false));
          }
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
                  resetForm();
                  setDone(false);
                }}>
                Product Added! Click to Add New Product
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                disabled={isSubmitting}
                onClick={submitForm}>
                {data ? "Save Changes" : "Add Product"}
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
        message="Product added succesfully"
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      />
    </div>
  );
};

export default ProductForm;
