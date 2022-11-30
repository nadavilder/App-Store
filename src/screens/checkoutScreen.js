import _ from "lodash";
import React, { useState, useEffect } from "react";
import Table from "@material-ui/core/Table";
import Button from "@material-ui/core/Button";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import store_state from "../state";
import { addNewLog } from '../requestsUtils';

function CheckoutScreen() {
  const { getUserInfo } = store_state;
  const userInfo = getUserInfo();

  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/api/getCart?id=${userInfo.id}`, {
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
          setCart(result);
        },
        (error) => {
          console.log("error", error);
        }
      );
  }, []);

  const getTotalPrice = () => {
    let sum = 0;
    _.forEach(cart, (item) => {
      sum += item.price;
    });
    return sum;
  };

  function createData(title, price) {
    return { title, price };
  }

  const clearCart = () => {
    console.log(userInfo.id);
    fetch(`http://localhost:5000/api/emptyCart?id=${userInfo.id}`, {
      method: "POST",
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
          setCart(result);
        },
        (error) => {
          console.log("error", error);
        }
      );
  };

  const rows = _.map(cart, (item) => createData(item.name, item.price));

  const onPayClick = () => {
    addNewLog(userInfo.userName, `made purchase of ${cart.length} items in total amount of ${getTotalPrice()}$`);
    clearCart();
    alert("Thanks for buying here!");

  };

  return (
    <div>
      <Typography variant="h4" color="primary" style={{ color: "DarkGreen" }}>
        Checkout
      </Typography>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell style={{ fontWeight: "600" }}>Item Name</TableCell>
              <TableCell align="right" style={{ fontWeight: "600" }}>
                Price
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.title}
                </TableCell>
                <TableCell align="right">{row.price + " $"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Typography
        variant="h5"
        color="primary"
        style={{ margin: 20, color: "DarkGreen" }}
      >
        Total Price: {getTotalPrice()}$
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={onPayClick}
        style={{ margin: 20, backgroundColor: "DarkGreen" }}
      >
        Pay
      </Button>
    </div>
  );
}

export default CheckoutScreen;
