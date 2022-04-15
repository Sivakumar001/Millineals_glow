import React, { Component } from 'react';
import {Table,Container} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Navbarmenu from './Navbarmenu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
  import { faTrash ,faEdit} from '@fortawesome/free-solid-svg-icons'
class Userlist extends Component {
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
        fetch("http://localhost:9000/user/getAll").then((response)=>{
         response.json().then((result)=>{
         this.setState({list:result})
})
        })
    }
    delete(id){
        fetch("http://localhost:9000/user/"+id, {
            method: "DELETE",
        }).then(() => {
            alert("User deleted successfully");
            this.getData();
        })
    }
    render() {
        
        return (
            <div>
                <Navbarmenu/>
            <div>
                <h1 className='text'>User List</h1>               
                {
                this.state.list?
                <div><Container>
                    <Table className="styled-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Username</th>
                                <th>Email</th>
                                <th>Phone Number</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                    {
                        this.state.list.map((item,i)=>
                           <tbody>
                               <tr key={item.id}>
                               <td>{item.id}</td>
                               <td>{item.username}</td>
                               <td>{item.email}</td>
                               <td>{item.phone}</td>
                               <td><Link className="lnk" to={"/update/"+item.id}><FontAwesomeIcon icon={faEdit} color="orange" /></Link>&nbsp;<Link className="lnk" to="" onClick={()=>{if (window.confirm('Are you sure you wish to delete this?')) this.delete(item.id)}}><FontAwesomeIcon icon={faTrash} color="red" /></Link></td>
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
            </div>
            </div>
        );
    }
}

export default Userlist;