import React from 'react';
import {API, Auth} from 'aws-amplify';
import { Button } from 'react-bootstrap';

export default class ViewCase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mycase: []
    }
  }
  

  
  handleChange = (event)=>{
    this.setState({[event.target.name]: event.target.value});
  }

 handleSubmit = async (event) => {
   event.preventDefault();
   const caseid=this.state.caseid;
   let sessionObject =  await Auth.currentSession();
   let tkn = sessionObject.idToken.jwtToken;
   var bearertkn= "Bearer "+tkn;
   let user =  Auth.currentAuthenticatedUser();
   var tenantid=sessionObject.idToken.payload.website;
   console.log(tenantid);
   var myInit ={
                headers: {
                          'Content-Type': 'application/json',
                          'Authorization': bearertkn
                          }

                }
    console.log(myInit);
  
   // alert(caseid)
    fetch ("https://g0dk99wgjb.execute-api.us-west-2.amazonaws.com/dev/cases?caseid="+caseid+"&tenantid="+tenantid, myInit)
    .then(res => res.json() )
    .then((data) => {
      this.setState({mycase: data})
      console.log(this.state.mycase.caseid);
      
    }
    )
  }



  render(){
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            <h1>Enter Case ID to view</h1>
        <input type="text" id="caseid" name="caseid" placeholder="T<tenant id>-<caseid>" onChange={this.handleChange}></input>
        </label>
        <br/>

        <input type="submit" value="Submit"/>
        </form>
        <div>
               <table style={{"marginTop":"2%", "width":"100%"}} >
                 <thead>
                   <tr>
                   
                     <th>Case ID</th>
                     <th>Tenant ID</th>
                     <th>Tenant Name</th>
                     <th>User Name</th>
                     <th>Case Type</th>
                     <th>Priority</th>
                     <th>Status</th>
                     <th>Description</th>
                    
                   </tr>
                 </thead>
                 <tbody>
                        <tr>
                           <td style={{"border-bottom": "0px"}}>{this.state.mycase.caseid}</td>
                           <td style={{"border-bottom": "0px"}}>{this.state.mycase.tenantid}</td>
                           <td style={{"border-bottom": "0px"}}>{this.state.mycase.tenantname}</td>
                           <td style={{"border-bottom": "0px"}}>{this.state.mycase.username}</td>
                           <td style={{"border-bottom": "0px"}}>{this.state.mycase.type}</td>
                           <td style={{"border-bottom": "0px"}}>{this.state.mycase.priority}</td>
                           <td style={{"border-bottom": "0px"}}>{this.state.mycase.status}</td>
                           <td style={{"border-bottom": "0px"}}>{this.state.mycase.description}</td>
                         </tr>
                 </tbody>
               </table>
               </div>
      </div>
    );
  }
}