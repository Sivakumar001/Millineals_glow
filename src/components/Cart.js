import React, { Component } from "react";
import { Table, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Navbarmenu from "./Navbarmenu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
class Cart extends Component {
  constructor() {
    super();
    this.state = {
      list: {},
      totalprice: null,
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

  delete(id) {
    fetch("http://localhost:9000/cart/" + id, {
      method: "DELETE",
    }).then(() => {
      this.getData();
    });
  }
  total() {
    /* eslint-disable */
    const total = this.state.list.reduce(
      (total, currentItem) => (total = total + currentItem.total),
      0
    );
    /* eslint-disable */
    return total;
  }
  placeOrder() {
    window.location = "/checkout";
  }

  render() {
    return (
      <div>
        <Navbarmenu />

        <div>
          <h1 className="text">Cart</h1>
          {this.state.list.length ? (
            <div>
              <Container>
                <Table className="styled-table">
                  <thead>
                    <tr>
                      <th>Product Name</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Sub-Total</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  {this.state.list.map((item, i) => (
                    <tbody>
                      <tr key={item.id}>
                        <td>{item.product_name}</td>
                        <td>{item.price}</td>
                        <td>{item.quantity}</td>
                        <td>{item.total}</td>
                        <td>
                          <Link
                            className="lnk"
                            to=""
                            onClick={() => {
                              if (
                                window.confirm(
                                  "Are you sure you wish to delete this?"
                                )
                              )
                                this.delete(item.id);
                            }}
                          >
                            <FontAwesomeIcon icon={faTrash} color="red" />
                          </Link>
                        </td>
                      </tr>
                    </tbody>
                  ))}
                  <tfoot>
                    <tr>
                      <td></td>
                      <td></td>
                      <td> Total : {this.total()} Rs.</td>
                    </tr>
                  </tfoot>
                </Table>
                <br />
                <Button
                  className="button"
                  variant="success"
                  onClick={() => {
                    this.placeOrder();
                  }}
                >
                  Order
                </Button>
              </Container>
            </div>
          ) : (
            <h2
              style={{
                marginTop: "15%",
              }}
            >
              --- Cart Is Empty ---
            </h2>
          )}
        </div>
      </div>
    );
  }
}

export default Cart;
