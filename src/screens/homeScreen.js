import React, { useState, useEffect } from "react";
import _ from "lodash";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import store_state from "../state";
import SearchBar from "material-ui-search-bar";

function HomeScreen() {
  const { getUserInfo } = store_state;
  const userInfo = getUserInfo();
  const [allItems, setAllItems] = useState(undefined);
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [searched, setSearched] = useState("");
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

  const isItemInCart = (itemId) => {
    return !!cart.find((item) => {
      return item.id === itemId;
    });
  };

  useEffect(() => {
    fetch("http://localhost:5000/api/getAllProducts", {
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
          setAllItems(result);
          return result;
        },
        (error) => {
          console.log("error", error);
        }
      )
      .then((result) => {
        var newArrayDataOfOjbect = Object.values(result);
        setProducts(newArrayDataOfOjbect);
      });
  }, []);

  const requestSearch = (searchedVal) => {
    var newArrayDataOfOjbect = Object.values(allItems);

    const filteredproducts = newArrayDataOfOjbect.filter((product) => {
      return (
        product.name.toLowerCase().startsWith(searchedVal.toLowerCase()) ||
        product.description.toLowerCase().startsWith(searchedVal.toLowerCase())
      );
    });
    setProducts(filteredproducts);
  };

  const cancelSearch = () => {
    setSearched("");
    requestSearch(searched);
  };

  const MediaCard = (item) => {
    const onItemClick = () => {
      if (isItemInCart(item.id)) {
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
      } else {
        fetch(
          `http://localhost:5000/api/addProductToCart?userId=${userInfo.id}&productId=${item.id}`,
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
      }
    };

    return (
      <Card style={{ maxWidth: 345, margin: 34 }}>
        <CardActionArea
          onClick={onItemClick}
          style={
            isItemInCart(item.id)
              ? {
                  borderStyle: "solid",
                  borderWidth: "3px",
                  borderColor: "LightGreen"
                }
              : undefined
          }
        >
          <CardMedia
            style={{ height: 200, width: 250 }}
            image={item.image}
            title={item.name}
          />
          <CardContent style={{ padding: "7px" }}>
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
              {isItemInCart(item.id) ? "Remove" : "Add"}
            </Button>
          </CardContent>
        </CardActionArea>
      </Card>
    );
  };

  return (
    <div>
      <img
        style={{ width: "100%", height: 500 }}
        alt="homePic"
        src="https://images.ctfassets.net/i3tkg7dt3kro/79ylUhwT3xN8XLic8Q2ZfA/739ca374c6a39c2edb37227794f56192/hnaging-plants-hero.jpg"
      />
      <div
        style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      >
        <SearchBar
          value={searched}
          onChange={(searchVal) => requestSearch(searchVal)}
          onCancelSearch={() => cancelSearch()}
          style={{
            width: "500px",
            marginTop: "20px",
            backgroundColor: "WhiteSmoke"
          }}
        />
      </div>
      <div
        style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      >
        {allItems && _.map(products, (item) => MediaCard(item))}
      </div>
    </div>
  );
}

export default HomeScreen;