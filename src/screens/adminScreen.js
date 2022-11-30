import React, { useState, useEffect } from "react";
import _ from "lodash";
import Typography from "@material-ui/core/Typography";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import CreateArea from "../components/CreateArea";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import SearchBar from "material-ui-search-bar";
import { addNewLog } from "../requestsUtils";
import store_state from "../state";

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

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
});

function AdminScreen() {
  const { getUserInfo } = store_state;
  const userInfo = getUserInfo();
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChangeTabs = (event, newValue) => {
    setValue(newValue);
  };
  const [logs, setLogs] = useState([]);
  const [products, setProducts] = useState([]);
  const [rows, setRows] = useState([]);
  const [searched, setSearched] = useState("");

  const deleteItem = (value) => {
    fetch(`http://localhost:5000/api/deleteProduct?id=${value.id}&username=${userInfo.userName}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    }).then((res) => {
      if (res.status === 200) {
        console.log("OK");
        fetch(`http://localhost:5000/api/getAllProducts`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          }
        })
          .then((res) => {
            return res.json();
          })
          .then(
            (result) => {
              setProducts(result);
            },
            (error) => {
              console.log("error", error);
            }
          );
      } else {
        console.log("FAILURE");
      }
    });
  };

  useEffect(() => {
    fetch(`http://localhost:5000/api/getAllLogs`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    })
      .then((res) => {
        return res.json();
      })
      .then(
        (result) => {
          setLogs(result);
          return result;
        },
        (error) => {
          console.log("error", error);
        }
      )
      .then((result) => {
        var newArrayDataOfOjbect = Object.values(result);
        setRows(newArrayDataOfOjbect);
      });
  }, []);

  useEffect(() => {
    fetch(`http://localhost:5000/api/getAllProducts`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    })
      .then((res) => {
        return res.json();
      })
      .then(
        (result) => {
          setProducts(result);
        },
        (error) => {
          console.log("error", error);
        }
      );
  }, []);

  function addProduct(newProduct) {
    let request_body = newProduct
    request_body["userName"]=userInfo.userName
    fetch("http://localhost:5000/api/addNewProduct", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(request_body)
    }).then((res) => {
      if (res.status === 200) {
        console.log("OK");
        fetch(`http://localhost:5000/api/getAllProducts`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          }
        })
          .then((res) => {
            return res.json();
          })
          .then(
            (result) => {
              setProducts(result);
              addNewLog(userInfo.userName,`made purchase of ${newProduct}` )
            },
            (error) => {
              console.log("error", error);
            }
          );
      } else {
        console.log("FAILURE");
      }
    });
  }

  const requestSearch = (searchedVal) => {
    var newArrayDataOfOjbect = Object.values(logs);
    const filteredRows = newArrayDataOfOjbect.filter((row) => {
      return row.username.toLowerCase().startsWith(searchedVal.toLowerCase());
    });
    setRows(filteredRows);
  };

  const cancelSearch = () => {
    setSearched("");
    requestSearch(searched);
  };

  return (
    <div>
      <Tabs
        variant="fullWidth"
        value={value}
        onChange={handleChangeTabs}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab label="Logs" {...a11yProps(0)} />
        <Tab label="Products" {...a11yProps(1)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <Paper>
          <SearchBar
            value={searched}
            onChange={(searchVal) => requestSearch(searchVal)}
            onCancelSearch={() => cancelSearch()}
          />
          <TableContainer>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell style={{ fontWeight: "600" }}>UserName</TableCell>
                  <TableCell style={{ fontWeight: "600" }} align="right">
                    Action
                  </TableCell>
                  <TableCell style={{ fontWeight: "600" }} align="right">
                    Time
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell component="th" scope="row">
                      {row.username}
                    </TableCell>
                    <TableCell align="right">{row.action}</TableCell>
                    <TableCell align="right">{row.time}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <List
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          >
            {_.map(products, (product) => (
              <ListItem
                key={product.id}
                secondaryAction={
                  <IconButton
                    aria-label="comment"
                    onClick={() => {
                      deleteItem(product);
                    }}
                  >
                    <DeleteIcon value={product.id} />
                  </IconButton>
                }
              >
                <ListItemText primary={product.name} />
              </ListItem>
            ))}
          </List>
          <CreateArea onAdd={addProduct} className={classes.addProduct} />
        </div>
      </TabPanel>
    </div>
  );
}

export default AdminScreen;
