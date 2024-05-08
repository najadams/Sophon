import React from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  Divider,
  FormControlLabel,
  Switch,
} from "@mui/material";

const EmployeeForm = () => {
  return (
    <div className="page">
      <Container maxWidth="lg">
        <Typography variant="h4" gutterBottom>
          Add Employee
        </Typography>
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Information
          </Typography>
          <Divider />
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Employee Name"
                fullWidth
                variant="outlined"
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="UserName"
                fullWidth
                variant="outlined"
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Contact"
                fullWidth
                variant="outlined"
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Email"
                fullWidth
                variant="outlined"
                margin="normal"
              />
            </Grid>
          </Grid>
        </Paper>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Privileges
          </Typography>
          <Divider />
          <FormControlLabel
            control={<Switch />}
            label="Only Make Sales"
          />
          <FormControlLabel
            control={<Switch />}
            label="Add Inventory or Customers"
          />
          <FormControlLabel
            control={<Switch />}
            label="Edit Existing Data"
          />
          <FormControlLabel
            control={<Switch />}
            label="Access To Data"
          />
        </Paper>
        <Button variant="contained" color="primary" sx={{ mt: 3 }}>
          Add Employee
        </Button>
      </Container>
    </div>
  );
};

export default EmployeeForm;
