import React, { Component } from 'react';
import {Button,Container} from 'react-bootstrap';
import Navbarmenu from './Navbarmenu';


class Addproduct extends Component {
    constructor() {
        super();
        this.state = {
            fields: {},
            errors: {}
        }

        this.handleChange = this.handleChange.bind(this);
        this.submitaddProductForm = this.submitaddProductForm.bind(this);

    };
    handleChange(e) {
        let fields = this.state.fields;
        console.log(e.target.value);
        if(e.target.name==="thumb"){
            fields[e.target.name] = "./images/"+e.target.files[0].name;
        }
        else{
        fields[e.target.name] = e.target.value;
        }
        this.setState({
            fields
        });

    }

    submitaddProductForm(e) {
        e.preventDefault(); 
        if (this.validateForm()) {
            this.addProduct();
        }

    }

    validateForm() {

        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        if (!fields["product_name"]) {
            formIsValid = false;
            errors["product_name"] = "*Please enter product name.";
        }


        if (!fields["description"]) {
            formIsValid = false;
            errors["description"] = "*Please write description.";
        }
        if (!fields["thumb"]) {
            formIsValid = false;
            errors["thumb"] = "*Please upload image";
        }

        if (!fields["price"]) {
            formIsValid = false;
            errors["price"] = "*Please enter price.";
        }


        this.setState({
            errors: errors
        });
        return formIsValid;


    }

    addProduct(){
        fetch("http://localhost:9000/product/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(this.state.fields)
        }).then(() => {
                alert("Product added successfully");
                window.location='/admin';
        })
    }
    render() {
        return (
            <div>
            <Navbarmenu/>
            <div>
            <Container>
                <br/>
                            <h1 className="text">Add Product</h1><br />

                            <form method="post" name="addProductForm" onSubmit={this.submitaddProductForm} >

                                <input type="text" name="product_name" value={this.state.fields.product_name} onChange={this.handleChange} placeholder="Enter product name" />
                                <div className="errorMsg">{this.state.errors.product_name}</div>

                                <input type="file" name="thumb" onChange={this.handleChange}  accept="image/*"/> 
                                <div className="errorMsg">{this.state.errors.thumb}</div>

                                <textarea name="description" value={this.state.fields.description} onChange={this.handleChange} placeholder="Enter description" />
                                <div className="errorMsg">{this.state.errors.description}</div>

                                <input type="number" name="price" value={this.state.fields.price} onChange={this.handleChange} placeholder="Enter price" />
                                <div className="errorMsg">{this.state.errors.price}</div>

                                <Button variant="success" type="submit" className='button'>Add</Button>
                            </form>
                </Container>
            </div>
            </div>
        );
    }
}

export default Addproduct;