import React from 'react';
import Amplify from 'aws-amplify';
import aws_exports from './aws-exports';
import {API, Auth} from 'aws-amplify';
export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  };
  async componentDidMount() {
    try {
        //let sessionObject = await Auth.currentSession();
        //let tkn = sessionObject.idToken.jwtToken;
        //let usr=sessionObject.idToken.payload.email;
        let user = await Auth.currentAuthenticatedUser();
        const userid = user.username;
        this.userid=userid;
        console.log(userid);

    } catch (e) {
        alert(e);
    }
}
  render(){
   
    return (
      
       
       <div>
        <form onSubmit={this.handleSubmit}>
          
          <h1>Welcome to Case Manager!</h1>
       <p name="desc" id="desc">"Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a type specimen book."</p>
        <select name="language"  id="language"  onChange={this.handleChange}>
        <option value="">Select Language</option>
          <option value="eng">English</option>
          <option value="fr">French</option>
        </select>
       
        <input type="submit" value="Translate"/>
        </form>

        </div>
       
    );
  }
}