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
import { addNewLog } from "../requestsUtils";

const useStyles = makeStyles((theme) => ({
  title: {
    margin: 20,
    color: "DarkGreen"
  },
  inputs: {
    margin: 10,
    width: "22ch",
    borderColor: "DarkGreen"
  },
  login: {
    marginTop: 50,
    backgroundColor: "DarkGreen"
  },
  registerArea: {
    marginTop: 6,
    color: "grey"
  }
}));

function LoginScreen() {
  const classes = useStyles();
  const [userName, setUserName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [newUser, setNewUser] = React.useState(false);
  const { setIsLoggedIn, setIsRegistered, setUserInfo } = store_state;
  const [wrongPassword, setWrongPassword] = React.useState(false);
  const [rememberMe, setRememberMe] = React.useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleUserNameChange = (event) => {
    setUserName(event.target.value);
  };

  const handleRememberMeChange = (event) => {
    setRememberMe(event.target.checked);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  function setCookie(cname, cvalue) {
    const d = new Date();
    if (rememberMe) {
      d.setTime(d.getTime() + 10 * 24 * 60 * 60 * 1000);
    } else {
      d.setTime(d.getTime() + 30 * 60 * 1000);
    }

    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

  const login = () => {
    setCookie("experationTime", userName);
    fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({ userName, passWord: password, rememberMe })
    })
      .then((res) => {
        return res.json();
      })
      .then(
        (result) => {
          if (result?.reason === "wrong password") {
            setWrongPassword(true);
            setNewUser(false);
            console.log("wrong password");
          } else {
            console.log("good password");
            result?.registered &&
              setUserInfo({ userName: userName, id: result.id });
            setIsLoggedIn(result?.registered);
            setNewUser(!result?.registered);
            addNewLog(userName, "logged in");
            setWrongPassword(false);
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
        Log in
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
        <input
          type="checkbox"
          className="form-control"
          id="rememberMe"
          placeholder="Remember Me"
          onChange={handleRememberMeChange}
        />
        <label htmlFor="rememberMe">Remember me</label>
      </div>
      <div>
        <Typography className={classes.registerArea}>
          Don't have a user yet?
          <Button
            color="primary"
            onClick={() => {
              setIsRegistered(false);
            }}
            style={{ color: "black" }}
          >
            click to register
          </Button>
        </Typography>
      </div>
      {wrongPassword && (
        <Typography variant="h6" color="primary" style={{ color: "red" }}>
          Wrong Password
        </Typography>
      )}
      {newUser && (
        <Typography variant="h6" color="primary" style={{ color: "red" }}>
          Please Register Before Login
        </Typography>
      )}
      <Button
        variant="contained"
        color="primary"
        className={classes.login}
        onClick={login}
      >
        Log In
      </Button>
    </div>
  );
}

export default LoginScreen;
