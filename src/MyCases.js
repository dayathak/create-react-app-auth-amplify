import React from 'react';
import {Button} from 'react-bootstrap';
import {API, Auth} from 'aws-amplify';
import { Link } from "react-router-dom";


export default class MyCases extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mycases: []

    }
  };

  async componentDidMount() {
    try {
        let sessionObject = await Auth.currentSession();
        //let tkn = sessionObject.idToken.jwtToken;
        let usr=sessionObject.idToken.payload.email;
        let user = await Auth.currentAuthenticatedUser();
        const userid = user.username;
        console.log(userid);
        const mycases = this.cases(userid);
        //this.setState({ mycases });
        //alert(usr);
    } catch (e) {
        alert(e);
    }
}

  cases(userid){
    //let apinName = "casemanager";
    fetch('https://g0dk99wgjb.execute-api.us-west-2.amazonaws.com/dev/cases/usercases?userid='+userid)
    .then(res => res.json() )
    .then((data) => {
      this.setState({mycases: data})
    }
    )
}

  render(){
      
        return(  
          <div>
            
          <div>
               <table style={{"marginTop":"2%"}} className="table table-hover">
                 <thead>
                   <tr>
                     <th>#</th>
                     <th>Case ID</th>
                     <th>Tenant ID</th>
                   </tr>
                 </thead>
                 <tbody>
                   {
                     this.state.mycases.map((cases, index) => {
                       return(
                         <tr key={index}>
                          <td>{index+1}</td>
                           <td>{cases.caseid}</td>
                           <td>{cases.tenantid}</td>
                         </tr>
                       )
                      }
                     )
                   }
                 </tbody>


               </table>
               </div>
               </div>
    );
  }


}