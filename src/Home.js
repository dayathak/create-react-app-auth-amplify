import React from 'react';
import Amplify from 'aws-amplify';
import aws_exports from './aws-exports';
import {API, Auth} from 'aws-amplify';
export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mycase : [],
      welcomeText: "Welcome to Case Manager!",
      bodyText: "Need to maximize customer lifetime value? Streamline service? Boost efficiency? Whatever challenges stand in your way, CaseManager helps you make better decisions and get work done. Our solutions save people time, so your employees and customers can get back to what matters most."

    }
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

  handleChange = (event)=>{
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const SourceLanguage='en';
    const TargetLanguage = this.state.language;
    const Text = this.state.bodyText;
   
    // alert(caseid)
     fetch ("https://g0dk99wgjb.execute-api.us-west-2.amazonaws.com/dev/translate?SourceLanguage="+SourceLanguage+"&TargetLanguage="+TargetLanguage+"&Text="+Text)
     .then(res => res.json() )
     .then((data) => {
       this.setState({mycase: data})
       console.log(this.state.mycase.body);
       
     }
     )
   }


  render(){
   
    return (
      

      
       
    <div>
      <form onSubmit={this.handleSubmit}> 
       <h1>{this.state.welcomeText}</h1>
       <left><p name="desc" id="desc">{this.state.bodyText}</p></left>
        <select name="language"  id="language"  onChange={this.handleChange}>
          <option value="">Select Language</option>
          <option value="en">English</option>
          <option value="es">Spanish</option>
          <option value="de">German</option>
        </select>
        <input type="submit" value="Translate"/>
      </form>
      <p>{this.state.mycase.body}</p>
      <audio id="player">test</audio>
    </div>
       
    );
  }
}