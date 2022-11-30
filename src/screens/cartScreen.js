import React, { useState, useEffect } from "react";
import _ from "lodash";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import store_state from "../state";

function CartScreen() {
  const { getUserInfo } = store_state;
  const userInfo = getUserInfo();
  console.log("userInfo-id", userInfo.id);
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

  function MediaCard(item) {
    const onItemClick = () => {
      fetch(
        `http://localhost:5000/api/removeProductFromCart?userId=${userInfo.id}&productId=${item.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          }
        }
      )
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

    return (
      <Card style={{ maxWidth: 345, margin: 34 }} key={item.id}>
        <CardActionArea>
          <CardMedia
            style={{ height: 200, width: 250 }}
            image={item.image}
            title={item.name}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {item.name}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {item.description}
            </Typography>
            <Typography
              variant="body1"
              color="textSecondary"
              component="p"
              style={{ marginTop: 4 }}
            >
              {item.price + " $"}
            </Typography>
            <Button
              size="small"
              variant="contained"
              color="primary"
              style={{ marginTop: 10, backgroundColor: "DarkGreen" }}
              onClick={onItemClick}
            >
              Remove
            </Button>
          </CardContent>
        </CardActionArea>
      </Card>
    );
  }

  return (
    <div>
      <Typography variant="h4" color="primary" style={{ color: "DarkGreen" }}>
        Your Cart
      </Typography>
      <div style={{ display: "flex", "flex-wrap": "wrap" }}>
        {cart && _.map(cart, (item) => MediaCard(item))}
      </div>
    </div>
  );
}

export default CartScreen;
