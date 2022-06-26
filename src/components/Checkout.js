import React, { Component } from "react";
import Navbarmenu from "./Navbarmenu";
import { Table, Button, Container } from "react-bootstrap";

class Checkout extends Component {
  constructor() {
    super();
    this.state = {
      list: null,
    };
  }
  componentDidMount() {
    this.getData();
  }
  getData() {
    fetch(
      "http://localhost:9000/cart/getAll/" + localStorage.getItem("login")
    ).then((response) => {
      response.json().then((result) => {
        this.setState({ list: result });
      });
    });
  }
  placeOrder() {
    this.state.list.map((ls) =>
      fetch("http://localhost:9000/cart/" + ls.id, {
        method: "DELETE",
      }).then(() => this.getData())
    );
    alert("Ordered Successfully");
  }
  total() {
    /* eslint-disable */
    const total = this.state.list.reduce(
      (total, currentItem) => (total = total + currentItem.total),
      0
    );

    return total;
  }

  render() {
    return (
      <div>
        <Navbarmenu />
        <Container>
          <br />
          <h1 className="text">Checkout</h1>
          <div className="row">
          <div className="col">
            <Container><br/>
              <input type="text" placeholder="enter your name" required></input><br /><br />
              <input type='text' placeholder="enter phone number" required></input><br /><br />
              <textarea placeholder="Enter your address" row="5" />
              <br />
              <br />
              <label
                style={{
                  color: "#009879",
                }}
              >
                Payment Option : &nbsp;
                <select className="drop">
                  <option value="cod">Cash On Delivery</option>
                  <option value="cod">Credit/Debit Card</option>
                  <option value="cod">NetBanking</option>
                </select>
              </label>
              <br />
              <br />
              <Button
                className="button"
                variant="success"
                onClick={() => this.placeOrder()}
              >
                Place Order
              </Button>
            </Container>
          </div>
          <div className="col-lg-auto">
            <Container>
              {this.state.list ? (
                <Table className="styled-table">
                  <thead>
                    <tr>
                      <th>Product Name</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Sub-Total</th>
                    </tr>
                  </thead>
                  {this.state.list.map((item, i) => (
                    <tbody>
                      <tr key={item.id}>
                        <td>{item.product_name}</td>
                        <td>{item.price}</td>
                        <td> {item.quantity}</td>
                        <td>{item.total}</td>
                      </tr>
                    </tbody>
                  ))}
                  <tfoot>
                    <tr>
                      <td></td>
                      <td> Total : {this.total()} Rs.</td>
                    </tr>
                  </tfoot>
                </Table>
              ) : (
                <p>Loading...</p>
              )}
            </Container>
          </div>
          </div>
        </Container>
      </div>
    );
  }
}

export default Checkout;
