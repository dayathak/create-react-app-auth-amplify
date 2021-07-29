import React from 'react';

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

 handleSubmit = (event) => {
   event.preventDefault();
   const caseid=this.state.caseid
  
   // alert(caseid)
    fetch ("https://g0dk99wgjb.execute-api.us-west-2.amazonaws.com/dev/cases?caseid="+caseid+"&tenantid=tenant1")
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
        <input type="text" id="caseid" name="caseid" placeholder="Case-xxxx" onChange={this.handleChange}></input>
        </label>
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
                           <td>{this.state.mycase.caseid}</td>
                           <td>{this.state.mycase.tenantid}</td>
                           <td>{this.state.mycase.tenantname}</td>
                           <td>{this.state.mycase.username}</td>
                           <td>{this.state.mycase.type}</td>
                           <td>{this.state.mycase.priority}</td>
                           <td>{this.state.mycase.status}</td>
                           <td>{this.state.mycase.description}</td>
                         </tr>
                 </tbody>
               </table>
               </div>
      </div>
    );
  }
}