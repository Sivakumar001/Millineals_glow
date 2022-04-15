import React, { Component } from 'react';
import {Table,Container} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Navbarmenu from './Navbarmenu';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
  import { faTrash,faEdit } from '@fortawesome/free-solid-svg-icons'
class Adminlist extends Component {
    constructor()
    {
        super();
        this.state={
            list:null,
        }
    }
    componentDidMount(){
        this.getData();
    }
    getData(){
        fetch("http://localhost:9000/product/getAll").then((response)=>{
         response.json().then((result)=>{
         this.setState({list:result})
})
        })
    }
    delete(id){
        fetch("http://localhost:9000/product/"+id, {
            method: "DELETE",
        }).then(() => {
            
                alert("Product deleted successfully");
                this.getData();
            
        })
    }
    render() {
        
        return (
            <div><Navbarmenu/>
            <div>
                <h1 className='text'>Products</h1>               
                {
                this.state.list?
                <div><Container>
                    <Table className="styled-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Price</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                    {
                        this.state.list.map((item,i)=>
                           <tbody>
                               <tr key={item.id}>
                               <td>{item.id}</td>
                               <td><img src={item.thumb} width="50px" alt="products" /></td>
                               <td>{item.product_name}</td>
                               <td>{item.description}</td>
                               <td>{item.price}</td>
                               <td><Link className="lnk" to={"/productupdate/"+item.id}><FontAwesomeIcon icon={faEdit} color="orange" /></Link>&nbsp;<Link className="lnk" to="" onClick={()=>{if (window.confirm('Are you sure you wish to delete this Product?')) this.delete(item.id)}}><FontAwesomeIcon icon={faTrash} color="red" /></Link></td>
                               </tr>
                           </tbody>
                        )
                    }
                    </Table>
                    </Container>
                </div>
                :
                <p>Loading...</p>
                }
            </div></div>
        );
    }
}

export default Adminlist;