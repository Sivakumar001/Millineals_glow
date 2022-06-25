import React, { Component } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import Navbarmenu from "./Navbarmenu";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      fields: {},
      errors: {},
    };

    this.handleChange = this.handleChange.bind(this);
    this.submitLogin = this.submitLogin.bind(this);
  }

  handleChange(e) {
    let fields = this.state.fields;
    fields[e.target.name] = e.target.value;
    this.setState({
      fields,
    });
  }

  submitLogin(e) {
    e.preventDefault();
    if (this.validateForm()) {
      this.login();
    }
  }

  validateForm() {
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

    if (!fields["email"]) {
      formIsValid = false;
      errors["email"] = "*Please enter your email-ID.";
    }

    if (!fields["password"]) {
      formIsValid = false;
      errors["password"] = "*Please enter your password.";
    }

    this.setState({
      errors: errors,
    });
    return formIsValid;
  }

  login() {
    fetch("http://localhost:9000/user/login/" + this.state.fields.email).then(
      (data) => {
        data.json().then((response) => {
          if (response) {
            console.warn(response);
            if (response.password === this.state.fields.password) {
              if (response.username === "Admin") {
                localStorage.setItem("admin", response.id);
                alert("Login Successful");
                window.location = "/admin";
              } else {
                localStorage.setItem("login", response.id);
                alert("Login Successful");
                window.location = "/";
              }
            } else {
              alert("Invalid Password");
            }
          } else {
            alert("Invalid Email or Password");
          }
        });
      }
    );
  }

  render() {
    return (
      <div>
        <Navbarmenu />
        <div>
          <Container>
            <Row sm={2} md={2} lg={2}>
              <Col sm={1}>
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <h1 className="text">Login</h1>
                <br />
                <form onSubmit={this.submitLogin}>
                  <input
                    type="email"
                    name="email"
                    value={this.state.fields.email}
                    onChange={this.handleChange}
                    placeholder="Enter you email id"
                  />
                  <div className="errorMsg">{this.state.errors.email}</div>
                  <input
                    type="password"
                    name="password"
                    value={this.state.fields.password}
                    onChange={this.handleChange}
                    placeholder="Enter your password"
                  />
                  <div className="errorMsg">{this.state.errors.password}</div>
                  <Button className="button" variant="success" type="submit">
                    Login
                  </Button>
                </form>
                <p>
                  Wants to register?{" "}
                  <Link className="lnk" to="/create">
                    Sign-up
                  </Link>
                </p>
              </Col>
              <Col sm={1}>
                <img src="./images/login.png" width="100%" alt="login" />
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}

export default Login;
