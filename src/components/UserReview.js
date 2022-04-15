import React,{useState,useEffect} from 'react';
import Navbarmenu from './Navbarmenu';
import { Button,Container,Table} from 'react-bootstrap';
import { useParams } from 'react-router-dom';



const UserReview = () => {
    const {id} = useParams();
    const [data, setState] = useState({list : "" });
    const [reviewdata,setReviewData] = useState({username : "",userreview : "",productname : "hello"});
    const [Allreview, setAllreview] = useState({fetchreviews : ""});

    useEffect(() => {
        fetch("http://localhost:9000/product/"+id).then((response)=>{
            response.json().then((result)=>{
                setState({list:result});       
        })
        })
        getAllreviewdata();
       

      }, []);

     


      const reviewUpdate = (event)=>{
        setReviewData((prevState)=>{
         return( {...prevState,
          [event.target.name] : event.target.value,
          productname : data.list.product_name
        }

         )
        })
      }
      

      const PostReview = ()=>{
       fetch("http://localhost:9000/review",{
         method : "POST",
         headers : {"content-type" : "application/json"},
         body: JSON.stringify(reviewdata)
       }).then((response)=>{
         alert("Review add successfully");
         getAllreviewdata();
       })   
      }

      const getAllreviewdata = () => {
        fetch("http://localhost:9000/get").then((response)=>{
          response.json().then((res)=>{
            setAllreview({fetchreviews:res})

          }) 
          })      
      }
      
    
      
     

  return (
    <div>
        <Navbarmenu />
        <Container><br/>
        
            <h1 className="text"> {data.list.product_name} Review</h1>
                <div style={{
                                float: "left",
                                marginLeft:"5%",
                                marginTop: "5%"
                              }}>
                    <Container>
                    
                    <h4 className='text'>ADD YOUR REVIEW HERE </h4>
                    
                    <br/>
                   <input  name="username"  onChange={reviewUpdate} type="text" placeholder="Enter your name" /><br/><br/>
                  
                   <textarea name="userreview" onChange={reviewUpdate} placeholder="Write about the product"/><br/><br/>
                   <label style={{
                                color: "#009879"
                              }}>
          
          
        </label>
                   <Button className='button' onClick={PostReview} variant="success">Add Review</Button>
        </Container>
                  </div>
                    <div style={{
                                float: "top",
                                marginLeft:"50%",
                                Position: "absolute",
                                marginTop : "5%"
                              }}>
                    <Container>
                {
                 

                  Allreview.fetchreviews  ? 
                 <div>    
                <Container>
                    <Table className="styled-table">
                        <thead>
                            <tr>
                                <th>Username</th>
                                <th>Review</th>
                                
                            </tr>
                        </thead>
                   
                  
                    {
                        Allreview.fetchreviews.filter(e => e.productname === data.list.product_name ).map((item,i)=>
                           <tbody>
                               <tr key={item.id}>
                               <td>{item.username}</td>
                               <td>{item.userreview}</td>
                               </tr>
                           </tbody>
                        )
                    }
                    </Table>
                    </Container>
                </div>
               :
               <h3>No Reviews Yet</h3>
                }

                    </Container>
                    </div>
        </Container>

    </div>
  )
}

export default UserReview;