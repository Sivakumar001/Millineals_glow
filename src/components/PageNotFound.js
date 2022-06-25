import React, { Component } from "react";
import Navbarmenu from "./Navbarmenu";
import { Container, Button } from "react-bootstrap";

class PageNotFound extends Component {
  nextPage() {
    if (localStorage.getItem("admin")) {
      window.location = "/admin";
    } else {
      window.location = "/";
    }
  }
  render() {
    return (
      <div>
        <Navbarmenu />
        <Container>
          <img
            className="pagenotfound"
            src="./images/pagenotfound.png"
            alt="pagenotfound"
          />
        </Container>
        <Button variant="success" onClick={this.nextPage}>
          Go Back To Home
        </Button>
      </div>
    );
  }
}

export default PageNotFound;
