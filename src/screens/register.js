import React from "react";
import {
  Button,
  TextField,
  InputAdornment,
  IconButton,
  Typography,
  OutlinedInput,
  InputLabel,
  FormControl
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import store_state from "../state";

const useStyles = makeStyles((theme) => ({
  title: {
    margin: 20,
    color: "DarkGreen"
  },
  subtitle: {
    marginBottom: 40,
    color: "DarkGreen"
  },
  inputs: {
    margin: 10,
    width: "22ch"
  },
  registerButton: {
    marginTop: 50,
    backgroundColor: "Darkgreen"
  }
}));

const { setIsRegistered, setUserInfo } = store_state;

function RegisterScreen() {
  const classes = useStyles();
  const [userName, setUserName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [alreadyExist, setAlreadyExist] = React.useState(false);
  const [passwordInvalid, setPasswordInvalid] = React.useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleUserNameChange = (event) => {
    setUserName(event.target.value);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const registerUser = () => {
    setUserInfo({ userName: userName });

    fetch("http://localhost:5000/api/registerNewUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({ userName, passWord: password })
    })
      .then((res) => {
        return res.json();
      })
      .then(
        (result) => {
          console.log(result?.reason);
          setIsRegistered(result?.registered);
          if (result?.reason === "already exist") {
            setAlreadyExist(true);
            setPasswordInvalid(false);
          }
          if (result?.reason === "Password is not valid") {
            setPasswordInvalid(true);
            setAlreadyExist(false);
          }
        },
        (error) => {
          console.log("error", error);
        }
      );
  };

  return (
    <div>
      <img
        style={{ width: "100%", height: 500 }}
        alt="homePic"
        src="https://images.ctfassets.net/i3tkg7dt3kro/79ylUhwT3xN8XLic8Q2ZfA/739ca374c6a39c2edb37227794f56192/hnaging-plants-hero.jpg"
      />
      <Typography variant="h4" color="primary" className={classes.title}>
        Hi There!
      </Typography>
      <Typography variant="h5" color="primary" className={classes.subtitle}>
        Please register to continue
      </Typography>
      <TextField
        className={classes.inputs}
        label="User Name"
        variant="outlined"
        onChange={handleUserNameChange}
      />
      <FormControl variant="outlined" className={classes.inputs}>
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
        <OutlinedInput
          type={showPassword ? "text" : "password"}
          label="Password"
          variant="outlined"
          onChange={handlePasswordChange}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
      <div>
        <Button
          style={{ color: "black" }}
          color="primary"
          onClick={() => setIsRegistered(true)}
        >
          Already have a user?
        </Button>
      </div>
      {alreadyExist && (
        <Typography variant="h6" color="primary" style={{ color: "red" }}>
          User Already Exist
        </Typography>
      )}
      {passwordInvalid && (
        <Typography variant="h6" color="primary" style={{ color: "red" }}>
          password should contains 5-12 characters, digit, UpperCase letter and
          Not any other char
        </Typography>
      )}
      <Button
        variant="contained"
        color="primary"
        className={classes.registerButton}
        onClick={registerUser}
      >
        Register
      </Button>
    </div>
  );
}

export default RegisterScreen;
