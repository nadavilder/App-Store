import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Input from "@material-ui/core/Input";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 40
  },
  input: {
    Width: 400,
    marginRight: 20
  }
}));

function ContactUsScreen() {
  const classes = useStyles();

  const onSendClick = () => {
    document.getElementById("contactUsForm").reset();
    alert("Thanks for Email us!");
  };

  return (
    <div>
      <Typography
        variant="h4"
        color="primary"
        style={{ margin: 20, color: "DarkGreen" }}
      >
        Contact Us
      </Typography>
      <Typography
        variant="subtitle1"
        color="primary"
        style={{ color: "black" }}
      >
        Sarona Market, Tel Aviv-Yafo
      </Typography>
      <Typography
        variant="subtitle1"
        color="primary"
        style={{ color: "black" }}
      >
        Tel: 077-1234567
      </Typography>
      <Typography
        variant="subtitle1"
        color="primary"
        style={{ color: "black" }}
      >
        Email: israelisraeli@plants.com
      </Typography>
      <Typography
        variant="subtitle1"
        color="primary"
        style={{ color: "black" }}
      >
        Facebook: www.facebook.com/plants/fakegroup
      </Typography>

      <Typography
        variant="h5"
        color="primary"
        style={{ margin: 20, color: "DarkGreen" }}
      >
        Give a Feedback
      </Typography>
      <form id="contactUsForm">
        <Input
          placeholder="Full Name"
          required
          className={classes.input}
          type="text"
        />
        <Input placeholder="Email" className={classes.input} type="email" />
        <Input placeholder="Title" className={classes.input} type="text" />
        <Input
          type="text"
          placeholder="Write Your Message Here"
          multiline
          fullWidth
        />
      </form>

      <Button
        variant="contained"
        color="primary"
        className={classes.root}
        onClick={onSendClick}
        style={{ margin: 20, backgroundColor: "DarkGreen" }}
      >
        SEND
      </Button>
    </div>
  );
}

export default ContactUsScreen;
