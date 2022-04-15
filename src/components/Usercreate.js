import React, { Component } from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Navbarmenu from './Navbarmenu';

class Usercreate extends Component {
    constructor() {
        super();
        this.state = {
            fields: {},
            confirmpassword: null,
            errors: {}
        }

        this.handleChange = this.handleChange.bind(this);
        this.submituserRegistrationForm = this.submituserRegistrationForm.bind(this);

    };

    handleChange(e) {
        let fields = this.state.fields;
        fields[e.target.name] = e.target.value;
        this.setState({
            fields
        });

    }

    submituserRegistrationForm(e) {
        e.preventDefault();
        if (this.validateForm()) {
           
            this.create();
        }

    }

    validateForm() {

        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        if (!fields["username"]) {
            formIsValid = false;
            errors["username"] = "*Please enter your username.";
        }

        if (typeof fields["username"] !== "undefined") {
            if (!fields["username"].match(/^[a-zA-Z ]*$/)) {
                formIsValid = false;
                errors["username"] = "*Please enter alphabet characters only.";
            }
        }

        if (!fields["email"]) {
            formIsValid = false;
            errors["email"] = "*Please enter your email-ID.";
        }

        if (typeof fields["email"] !== "undefined") {
            //regular expression for email validation
            var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            if (!pattern.test(fields["email"])) {
                formIsValid = false;
                errors["email"] = "*Please enter valid email-ID.";
            }
        }
    

        if (!fields["phone"]) {
            formIsValid = false;
            errors["phone"] = "*Please enter your mobile no.";
        }

        if (typeof fields["phone"] !== "undefined") {
            if (!fields["phone"].match(/^[0-9]{10}$/)) {
                formIsValid = false;
                errors["phone"] = "*Please enter valid mobile no.";
            }
        }

        if (!fields["password"]) {
            formIsValid = false;
            errors["password"] = "*Please enter your password.";
        }

        if (typeof fields["password"] !== "undefined") {
            if (!fields["password"].match(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/)) {
                formIsValid = false;
                errors["password"] = "*Please enter secure and strong password.";
            }
        }
        if(!this.state.confirmpassword)
        {
            errors["confirmpassword"] = "*Please enter the password.";
        }

        if (fields["password"] && fields["password"] !== this.state.confirmpassword) {
            formIsValid = false;
            errors["confirmpassword"] = "*Please enter the same password.";
        }

        this.setState({
            errors: errors
        });
        return formIsValid;


    }

    create() {
        fetch("http://localhost:9000/user/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(this.state.fields)
        }).then(() => {
            alert("New User added successfully");
            window.location='/login';
        })
    }


    render() {
        return (
            <div>
                <Navbarmenu />
                <Container>
                    <Row sm={2} md={2} lg={2}>
                        <Col sm={1}>
                            <br /><br /><br /><br />
                            <h1 className="text">Register</h1><br />

                            <form method="post" name="userRegistrationForm" onSubmit={this.submituserRegistrationForm} >

                                <input type="text" name="username" value={this.state.fields.username} onChange={this.handleChange} placeholder="Enter Username" />
                                <div className="errorMsg">{this.state.errors.username}</div>

                                <input type="text" name="email" value={this.state.fields.email} onChange={this.handleChange} placeholder="Enter Email ID" />
                                <div className="errorMsg">{this.state.errors.email}</div>

                                <input type="text" name="phone" value={this.state.fields.phone} onChange={this.handleChange} placeholder="Enter Mobile Number" />
                                <div className="errorMsg">{this.state.errors.phone}</div>

                                <input type="password" name="password" value={this.state.fields.password} onChange={this.handleChange} placeholder="Enter Password" />
                                <div className="errorMsg">{this.state.errors.password}</div>

                                <input type="password" name="confirmpassword" value={this.state.confirmpassword} onChange={(event) => { this.setState({ confirmpassword: event.target.value }) }} placeholder="Confirm Password" />
                                <div className="errorMsg">{this.state.errors.confirmpassword}</div>
                                <Button variant="success" type="submit" className='button'>Sign-up</Button>
                            </form>
                            <p>Already a user? <Link className='lnk' to="/login">Login</Link></p>
                        </Col>
                        <Col sm={1}>
                            <img src="./images/login.png" width="100%" alt="login" />
                        </Col>
                    </Row>
                </Container>



            </div>
        );
    }


}
export default Usercreate;