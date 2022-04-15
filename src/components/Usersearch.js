import React, { Component } from 'react';
import { Table,Container } from 'react-bootstrap';
import Navbarmenu from './Navbarmenu';

class Usersearch extends Component {
    constructor(){
        super();
        this.state={
            searchData:null,
            noData:false,
        }
    }
    search(key){
        fetch("http://localhost:3000/user?q="+key).then((data)=>{
            data.json().then((response)=>{
                if(response.length>0)
                {
               this.setState({searchData:response,noData:false})
                }
                else{
                    this.setState({noData:true,searchData:null})
                }
            })
        })
    }

    render() {
        
        return (
            <div>
            <Navbarmenu/>
            <div>
                <h1 className='text'>Search User</h1>
                <input type="text" onChange={(event)=>this.search(event.target.value)}/><br/><br/>
                <div>
                {
                    this.state.searchData?
                    <Container>
                    <div>
                         <Table  className="styled-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Username</th>
                                <th>Email</th>
                                <th>Phone Number</th>
                            </tr>
                        </thead>{
                           this.state.searchData.map((item)=>
                           <tbody>
                               <tr key={item.id}>
                               <td>{item.id}</td>
                               <td>{item.username}</td>
                               <td>{item.email}</td>
                               <td>{item.phone}</td> </tr>
                           </tbody>
                           )
                    }
                    </Table>
                    </div></Container>
                    :""
                }
                {
                   this.state.noData?<h3>No Data Found</h3>:null
                }
            </div>
            </div>
            </div>
        );
    }
}

export default Usersearch;