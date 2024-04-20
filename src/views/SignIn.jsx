import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from '../config/'
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ActionCreators } from "../actions/action";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}>
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

const SignIn = () => {
  const dispatch = useDispatch()
  const [error, setError] = useState(null);
  const navigate = useNavigate()

  // login function
 const login = async (companyname, password) => {
   try {
     const response = await axios.post(`/login`, {
       companyname,
       password,
     });

     if (response.status !== 200) {
       setError("Invalid Credentials");
       throw new Error("Login failed");
     }

      const { companydata, token } = response.data;

     dispatch(ActionCreators.setAuthToken(token));
    //  dispatch(ActionCreators.fetchCompanySuccess(response.data.company))
     console.log(companydata)
     window.localStorage.setItem("access_token", token);
     navigate("/dashboard");

     // Dispatch fetchUserSuccess after setting the auth token and navigating
     dispatch(ActionCreators.fetchInventorySuccess(companydata))
     dispatch(ActionCreators.fetchUserRequest());
     dispatch(ActionCreators.fetchUserSuccess(companydata.workers));
     console.log(companydata.workers);

     return response.data;
   } catch (error) {
     setError( "An error occurred");
     dispatch(
       ActionCreators.fetchUserFailure(
         "An error occurred"
       )
     );
     console.error(error.response?.data?.message || error.message);
   }
 };


  const handleSubmit = async(event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const companyname = data.get("company")
    const password = data.get("password")
    if (!companyname || !password) {
      setError("fill all fields");
      return;
    }
    await login(companyname.toLocaleLowerCase(), password);
    return; 
  };

  return (
    <div className="notlogin">
      <ThemeProvider theme={defaultTheme}>
        <Grid container component="main" sx={{ height: "100vh" }}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage:
                "url(https://source.unsplash.com/random?wallpapers)",
              backgroundRepeat: "no-repeat",
              backgroundColor: (t) =>
                t.palette.mode === "light"
                  ? t.palette.grey[50]
                  : t.palette.grey[900],
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square>
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}>
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="company"
                  label="Company Name"
                  name="company"
                  autoComplete="company"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained" 
                  sx={{ mt: 3, mb: 2 }}>
                  Sign In
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="/register" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
                <Typography variant="body2" align="center" color="red">
                  {error}
                </Typography>
                <Copyright sx={{ mt: 5 }} />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    </div>
  );
}

export default SignIn;