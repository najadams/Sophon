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

const Settings = () => {
  return (
    <div className="page">
      <Container maxWidth="lg">
        <Typography variant="h4" gutterBottom>
          Settings
        </Typography>
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Store Information
          </Typography>
          <Divider />
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Store Name"
                fullWidth
                variant="outlined"
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Address"
                fullWidth
                variant="outlined"
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="City"
                fullWidth
                variant="outlined"
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Postal Code"
                fullWidth
                variant="outlined"
                margin="normal"
              />
            </Grid>
          </Grid>
        </Paper>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Notifications
          </Typography>
          <Divider />
          <FormControlLabel
            control={<Switch />}
            label="Receive email notifications"
          />
          <FormControlLabel
            control={<Switch />}
            label="Receive SMS notifications"
          />
        </Paper>
        <Button variant="contained" color="primary" sx={{ mt: 3 }}>
          Save Settings
        </Button>
      </Container>
    </div>
  );
};

export default Settings;
