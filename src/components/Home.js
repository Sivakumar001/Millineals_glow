import React, { Component } from "react";
import { Button, Container } from "react-bootstrap";
import Navbarmenu from "./Navbarmenu";
import { Link } from "react-router-dom";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      search: null,
      list: null,
      cart: null,
      quantity: 1,
      pname: null,
      pprice: null,
      total: null,
      prevquantity: null,
    };
  }
  componentDidMount() {
    this.getData();
    this.getCart();
  }
  getData() {
    fetch("http://localhost:9000/product/getAll").then((response) => {
      response.json().then((result) => {
        this.setState({ list: result });
      });
    });
  }

  getCart() {
    fetch(
      "http://localhost:9000/cart/getAll/" + localStorage.getItem("login")
    ).then((response) => {
      response.json().then((result) => {
        this.setState({ cart: result });
      });
    });
  }
  tocart(id, name, prc) {
    if (localStorage.getItem("login") || localStorage.getItem("admin")) {
      let alreadyInCart = false;
      let prevQ = 0,
        cartid = 0;
      this.state.cart.forEach((x) => {
        if (x.product_name === name) {
          alreadyInCart = true;
          prevQ = x.quantity;
          cartid = x.id;
        }
      });
      if (alreadyInCart) {
        fetch("http://localhost:9000/cart/" + cartid, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userid: localStorage.getItem("login"),
            id: cartid,
            product_name: name,
            price: prc,
            /* eslint-disable */
            total: (this.state.quantity + prevQ) * parseInt(prc),
            quantity: this.state.quantity + prevQ,
          }),
        }).then((response) => {
          alert("Already in cart, Quantity updated !!");
          window.location = "/cart";
        });
      } else {
        if (this.state.cart.length === 5) {
          alert("Cart is full");
        } else {
          fetch("http://localhost:9000/cart/add", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userid: localStorage.getItem("login"),
              product_name: name,
              price: prc,
              total: this.state.quantity * parseInt(prc),
              quantity: this.state.quantity,
            }),
          }).then(() => {
            alert("Product added to cart successfully");
            this.setState({ quantity: 1 });
            window.location = "/cart";
          });
        }
      }
    } else {
      alert("Please Login to proceed");
      window.location = "/login";
    }
  }

  render() {
    return (
      <div>
        <Navbarmenu />

        <div>
          {" "}
          <Container>
            <div style={{ margin: "2% 0% 3% 65%" }}>
              <label style={{ fontSize: "20px" }}>SEARCH : </label>
              <input
                name="search-bar"
                onChange={(e) => this.setState({ search: e.target.value })}
                type="text"
                style={{ margin: "1%", borderRadius: "3px" }}
              />
            </div>
            {this.state.list ? (
              <div className="main_content">
                {this.state.search
                  ? this.state.list
                      .filter(
                        (e, i) =>
                          e.product_name.toUpperCase() ===
                          this.state.search.toUpperCase()
                      )
                      .map((item, i) => (
                        <div className="card" key={item.id}>
                          <div className="card_img">
                            <img src={item.thumb} alt="products" />
                          </div>
                          <div className="card_header">
                            <h2>{item.product_name}</h2>
                            <p>{item.description}</p>
                            <p className="price">
                              {item.price}
                              <span> Rs.</span>
                            </p>
                            <p>
                              Quantity :{" "}
                              <input
                                className="inp"
                                type="number"
                                defaultValue="1"
                                min="1"
                                max="10"
                                onChange={(event) => {
                                  this.setState({
                                    quantity: event.target.value,
                                  });
                                }}
                              />
                            </p>
                            <Button
                              variant="success"
                              className="btn"
                              onClick={() => {
                                this.tocart(
                                  item.id,
                                  item.product_name,
                                  item.price
                                );
                              }}
                            >
                              Add to cart
                            </Button>
                            <p style={{ textDecoration: "none" }}>
                              <Link
                                to={`/review/${item.id}`}
                                style={{
                                  textDecoration: "none",
                                  color: "#009879",
                                }}
                              >
                                Reviews
                              </Link>
                            </p>
                          </div>
                        </div>
                      ))
                  : this.state.list.map((item, i) => (
                      <div className="card" key={item.id}>
                        <div className="card_img">
                          <img src={item.thumb} alt="products" />
                        </div>
                        <div className="card_header">
                          <h2>{item.product_name}</h2>
                          <p>{item.description}</p>
                          <p className="price">
                            {item.price}
                            <span> Rs.</span>
                          </p>
                          <p>
                            Quantity :{" "}
                            <input
                              className="inp"
                              type="number"
                              defaultValue="1"
                              min="1"
                              max="10"
                              onChange={(event) => {
                                this.setState({ quantity: event.target.value });
                              }}
                            />
                          </p>
                          <Button
                            variant="success"
                            className="btn"
                            onClick={() => {
                              this.tocart(
                                item.id,
                                item.product_name,
                                item.price
                              );
                            }}
                          >
                            Add to cart
                          </Button>
                          <p style={{ textDecoration: "none" }}>
                            <Link
                              to={`/review/${item.id}`}
                              style={{
                                textDecoration: "none",
                                color: "#009879",
                              }}
                            >
                              Reviews
                            </Link>
                          </p>
                        </div>
                      </div>
                    ))}
              </div>
            ) : (
              <p>Loading...</p>
            )}
          </Container>
        </div>
      </div>
    );
  }
}

export default Home;
