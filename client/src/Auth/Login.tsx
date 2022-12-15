import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { onLogin } from "./auth.api";
import API from "../http/api";
import { useNavigate } from "react-router-dom";


function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://www.linkedin.com/in/had%C5%BEo-otuzbir-11a0a01b8/">
        Hadžo Otuzbir
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function Login({ setToken }: any) {

  const [{ email, password }, setCredentials] = useState({
    email: '',
    password: ''
  });

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [submitedAtLeastOnce, setSubmitedAtLeastOnce] = useState(false);
  // const [token, setToken] = useState("");

  const [serverError, setServerError] = useState("");

  const navigate = useNavigate()

  const handleEmail = (value: any) => {
    if (!value) {
      setEmailError("Required field!");
    } else {
      setEmailError("");
    }
    setCredentials({
      email: value,
      password

    });
  };

  const handlePassword = (value: any) => {
    if (!value) {
      setPasswordError("Required field");
    } else if (value && value.length < 5) {
      setPasswordError("At least 5 characters!");
    } else {
      setPasswordError("");
    }
    setCredentials({
      password: value,
      email
    });
  }

  React.useEffect(() => {
    handleEmail(email);
    handlePassword(password);
  }, [email, password]);


  async function handleSubmit(e: any) {
    e.preventDefault();

    setSubmitedAtLeastOnce(true);
    setServerError("");
    if (
      !!emailError ||
      !!passwordError
    ) {
      return;
    } else {

    API().onLogin({
      email,
      password
    })
      .then((res: any) => {
        console.log("Login response on 200: ", res)
        setToken(res.data.token)
        localStorage.setItem("access_token", res.data.token);

      })
      .catch((Error) => {
        console.log(Error);
        if (Error?.response.status === 400) {
          setServerError("Incorrect username or password!")
        }
        else {
          setServerError("Unknown Error!")
        }
      });
      
      navigate('/')

    }

    // console.log("token koji sam dobio: ", token)
  }

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={5}
          sx={{
            backgroundImage:
              "url(https://imgs.search.brave.com/bls2Oe6dvKS0B7NkY3INcWRlqjI4ZkOWpJABo7l7Tdg/rs:fit:1200:1200:1/g:ce/aHR0cHM6Ly93d3cu/YXRobGV0YWRlc2su/Y29tL3dwLWNvbnRl/bnQvdXBsb2Fkcy8y/MDE2LzA4L2pvaW4t/YmFja2dyb3VuZC5q/cGc)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={7} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
            <Typography component="h1" variant="h5">
              Sign In
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>


              <TextField
                margin="normal"
                fullWidth
                id="email"
                label="Email"
                name="email"
                onChange={(e) => handleEmail(e.target.value)}
                helperText={
                  !!emailError && submitedAtLeastOnce ? emailError : ""
                }
                error={!!emailError && submitedAtLeastOnce}
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                fullWidth
                name="password"
                label="Password"
                helperText={
                  !!passwordError && submitedAtLeastOnce ? passwordError : ""
                }
                error={!!passwordError && submitedAtLeastOnce}
                onChange={(e) => handlePassword(e.target.value)}
                type="password"
                id="password"
                autoComplete="current-password"
              />

              {serverError ? <Typography sx={{ color: "red" }}>{serverError}</Typography> : null}

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={
                  submitedAtLeastOnce &&
                  (
                    !!emailError ||
                    !!passwordError
                  )
                }
              >
                LOGIN
              </Button>
              <a href='/register'>You don't have an accoutn? Create one!</a>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};