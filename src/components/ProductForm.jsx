import React from "react";
import { Formik, Field, Form } from "formik";
import { TextField } from "formik-material-ui";
import Button from "@mui/material/Button";
import * as Yup from "yup";
import LinearProgress from "@mui/material/LinearProgress";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  costPrice: Yup.number().required("Required"),
  salesPrice: Yup.number().required("Required"),
  onHand: Yup.number().required("Required"),
});

const ProductForm = () => (
  <div>
    <h1>Product Information</h1>
    <Formik
      initialValues={{
        name: "",
        costPrice: "",
        salesPrice: "",
        onHand: "",
        // VendorDetails: { companyName: "", supplierName: "", phone: "" },
      }}
      validationSchema={validationSchema}
      onSubmit={async (values) => {
        await new Promise((r) => setTimeout(r, 500));
        alert(JSON.stringify(values, null, 2));
      }}>
      {({ submitForm, isSubmitting }) => (
        <Form className="form">
          <Field component={TextField} name="name" type="text" label="Name" />
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
          {/* <Field
            component={TextField}
            type="text"
            label="Company Name"
            name="companyName"
          /> */}
          <br />
          {isSubmitting && <LinearProgress />}
          <br />
          <Button
            variant="contained"
            color="primary"
            disabled={isSubmitting}
            onClick={submitForm}
            // type="submit"
          >
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  </div>
);


export default ProductForm



// import React from "react";
// import { Formik, Field, Form } from "formik";
// import { TextField } from "formik-material-ui";
// import Button from "@mui/material/Button";
// import * as Yup from "yup";
// import LinearProgress from "@mui/material/LinearProgress";

// const validationSchema = Yup.object().shape({
//   name: Yup.string().required("Required"),
//   costPrice: Yup.number().required("Required"),
//   salesPrice: Yup.number().required("Required"),
//   onHand: Yup.number().required("Required"),
// });

// const ProductForm = () => (
//   <div>
//     <h1>Product Information</h1>
//     <Formik
//       initialValues={{
//         name: "",
//         costPrice: "",
//         salesPrice: "",
//         address: "",
//       }}
//       validationSchema={validationSchema}
//       onSubmit={async (values) => {
//         await new Promise((r) => setTimeout(r, 500));
//         alert(JSON.stringify(values, null, 2));
//       }}>
//       {({ submitForm, isSubmitting }) => (
//         <Form className="form">
//           <Field component={TextField} name="name" type="text" label="Name" />
//           <br />
//           <Field component={TextField} name="phone" type="text" label="Phone" />
//           <br />
//           <Field
//             component={TextField}
//             type="email"
//             label="Email"
//             name="email"
//           />
//           <br />
//           <Field
//             component={TextField}
//             type="text"
//             label="Address"
//             name="address"
//           />
//           <br />
//           <Field
//             component={TextField}
//             type="text"
//             label="Company Name"
//             name="companyName"
//           />
//           <br />
//           {isSubmitting && <LinearProgress />}
//           <br />
//           <Button
//             variant="contained"
//             color="primary"
//             disabled={isSubmitting}
//             onClick={submitForm}>
//             Submit
//           </Button>
//         </Form>
//       )}
//     </Formik>
//   </div>
// );

// export default ProductForm;
