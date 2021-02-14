import { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useRecoilState } from "recoil";
import React, { useEffect } from "react";
import cookie from "js-cookie";
import cookieCutter from "cookie-cutter";

import { useRouter } from "next/router";
import { loginState, tokenState } from "../../states";
import { LockOpen } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const classes = useStyles();
  const router = useRouter();
  const [auth, setAuth] = useRecoilState(loginState);
  const [passcode, setPasscode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [token, setToken] = useRecoilState(tokenState);

  const loginUser = async (credentials) => {
    console.log(credentials);
    return fetch("https://popcorn-review.herokuapp.com/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    }).then((data) => data.json());
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const data = await loginUser({ passcode: passcode });
    setToken(data.token);
  };

  useEffect(() => {
    if (token !== null) {
      router.push("/");
    }
  }, [token]);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography variant="h5" color="error">
          {errorMessage}
        </Typography>
        <form className={classes.form}>
          <TextField
            margin="normal"
            inputProps={{ style: { fontSize: 60, textAlign: "center" } }}
            value={passcode}
            onChange={(e) => setPasscode(e.target.value)}
            fullWidth
            name="password"
            type="password"
            placeholder="PIN-CODE"
            id="password"
            autoComplete="current-password"
          />

          <Button
            type="submit"
            fullWidth
            startIcon={<LockOpen />}
            size="large"
            variant="outlined"
            onClick={(e) => onSubmit(e)}
            className={classes.submit}
          >
            Đăng nhập
          </Button>
        </form>
      </div>
      <Box mt={8}></Box>
    </Container>
  );
}