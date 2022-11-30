import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Button, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import store_state from "../state";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PaymentIcon from "@mui/icons-material/Payment";
import CallIcon from "@mui/icons-material/Call";
import CartScreen from "../screens/cartScreen";
import CheckoutScreen from "../screens/checkoutScreen";
import ContactUsScreen from "../screens/contactUsScreen";
import PropTypes from "prop-types";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import HomeIcon from "@mui/icons-material/Home";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import HomeScreen from "../screens/homeScreen";
import AdminScreen from "../screens/adminScreen";
import EventsScreen from "../screens/eventsScreen";
import TipsScreen from "../screens/tipsScreen";
import AboutUsScreen from "../screens/aboutUsScreen";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import RecommendIcon from "@mui/icons-material/Recommend";
import InfoIcon from "@mui/icons-material/Info";
import { addNewLog } from "../requestsUtils";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3} paddingX={10}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `nav-tab-${index}`,
    "aria-controls": `nav-tabpanel-${index}`
  };
}

const useStyles = makeStyles((theme) => ({
  container: {
    flexGrow: 1
  },
  logout: {
    position: "absolute",
    right: theme.spacing(2)
  },
  greeting: {
    position: "absolute",
    right: theme.spacing(20)
  },
  cart: {
    position: "absolute",
    right: theme.spacing(30),
    color: "black"
  },
  payment: {
    position: "absolute",
    right: theme.spacing(35),
    color: "black"
  },
  call: {
    position: "absolute",
    right: theme.spacing(40),
    color: "black"
  }
}));

export default function TopBar() {
  const classes = useStyles();
  const { setIsLoggedIn, setUserInfo, getUserInfo } = store_state;
  const [userName, setUserName] = useState({});

  const getUserName = () => {
    const userInfo = getUserInfo();
    if (userInfo && userInfo.userName) {
      return userInfo.userName;
    }
  };

  useEffect(() => {
    setUserName(getUserName());
  }, []);

  function setCookieOut(cname, cvalue) {
    const d = new Date();
    d.setTime(d.getTime());
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

  const logOut = () => {
    setCookieOut("experationTime", userName);
    setIsLoggedIn(false);
    setUserInfo({ userName: "" });
    addNewLog(userName, "logged out");
  };

  const [isCart, setIsCart] = useState(false);
  const [isCall, setIsCall] = useState(false);
  const [isPay, setIsPay] = useState(false);

  const [value, setValue] = useState(0);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    setIsAdmin(getUserName() === "admin");
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setIsCart((current) => false);
    setIsPay((current) => false);
    setIsCall((current) => false);
  };

  const handleClick = (name) => {
    if (name === "cart") {
      setIsCart((current) => true);
      setIsPay((current) => false);
      setIsCall((current) => false);
      setValue("");
    }
    if (name === "payment") {
      setIsPay((current) => true);
      setIsCart((current) => false);
      setIsCall((current) => false);
      setValue("");
    }
    if (name === "call") {
      setIsCall((current) => true);
      setIsCart((current) => false);
      setIsPay((current) => false);
      setValue("");
    }
  };

  return (
    <div className={classes.container}>
      <AppBar position="static" style={{ backgroundColor: "white" }}>
        <Toolbar>
          <IconButton
            color="primary"
            aria-label="add to shopping cart"
            className={classes.cart}
            onClick={() => {
              handleClick("cart");
            }}
          >
            <ShoppingCartIcon />
          </IconButton>
          <IconButton
            color="primary"
            aria-label="add to shopping cart"
            className={classes.payment}
            name="payment"
            onClick={() => {
              handleClick("payment");
            }}
          >
            <PaymentIcon />
          </IconButton>
          <IconButton
            color="primary"
            aria-label="add to shopping cart"
            className={classes.call}
            onClick={() => {
              handleClick("call");
            }}
          >
            <CallIcon />
          </IconButton>

          {userName && (
            <Typography className={classes.greeting} style={{ color: "black" }}>
              Hi {userName.toString()}!
            </Typography>
          )}
          <div className={classes.logout}>
            <Button
              variant="text"
              onClick={logOut}
              color="inherit"
              style={{ color: "black", fontSize: 12 }}
            >
              Log Out
            </Button>
          </div>
        </Toolbar>
      </AppBar>

      <div className={classes.root}>
        <Typography variant="h2" style={{ fontFamily: "ALEGREYA" }}>
          SucculenTLV
        </Typography>
        <Tabs
          variant="fullWidth"
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
          indicatorColor="primary"
        >
          <Tab label="Home" icon={<HomeIcon />} {...a11yProps(0)} />
          <Tab label="About Us" icon={<InfoIcon />} {...a11yProps(1)} />
          <Tab label="events" icon={<EventAvailableIcon />} {...a11yProps(2)} />
          <Tab label="Tips" icon={<RecommendIcon />} {...a11yProps(3)} />

          {isAdmin && (
            <Tab
              label="Admin Screen"
              icon={<SupervisorAccountIcon />}
              {...a11yProps(4)}
            />
          )}
        </Tabs>
        <TabPanel value={value} index={0}>
          <HomeScreen />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <AboutUsScreen />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <EventsScreen />
        </TabPanel>

        <TabPanel value={value} index={3}>
          <TipsScreen />
        </TabPanel>

        {isAdmin && (
          <TabPanel value={value} index={4}>
            <AdminScreen />
          </TabPanel>
        )}
      </div>
      {isPay && <CheckoutScreen />}
      {isCart && <CartScreen />}
      {isCall && <ContactUsScreen />}
    </div>
  );
}
