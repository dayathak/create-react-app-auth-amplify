import React, { useEffect } from "react";
import { withRouter } from 'react-router';
import { Redirect } from 'react-router';
import ReactDOM from "react-dom";
import { Formik, Form, useField, useFormikContext } from "formik";
import * as Yup from "yup";
import styled from "@emotion/styled";
import "./styles.css";
import "./styles-custom.css";
import {API, Auth} from 'aws-amplify';



const MyTextInput = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and alse replace ErrorMessage entirely.
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input className="text-input" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};



       
function postData(cases){
  const apiName = 'casemanager';
  const path = '/cases';
  const myInit = { // OPTIONAL
      body: JSON.stringify(cases), // case object to be posted
      //headers: {}, // OPTIONAL
  };

  return  API.post(apiName, path, myInit);
  alert("case created successfully")
}

function postData2(cases, token){
  

 
  fetch('https://g0dk99wgjb.execute-api.us-west-2.amazonaws.com/dev/cases', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
      },
    body: JSON.stringify(cases)
  });

}



const MyCheckbox = ({ children, ...props }) => {
  const [field, meta] = useField({ ...props, type: "checkbox" });
  return (
    <>
      <label className="checkbox">
        <input {...field} {...props} type="checkbox" />
        {children}
      </label>
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

// Styled components ....
const StyledSelect = styled.select`
  color: var(--blue);
`;

const StyledErrorMessage = styled.div`
  font-size: 12px;
  color: var(--red-600);
  width: 400px;
  margin-top: 0.25rem;
  &:before {
    content: "❌ ";
    font-size: 10px;
  }
  @media (prefers-color-scheme: dark) {
    color: var(--red-300);
  }
`;

const StyledLabel = styled.label`
  margin-top: 1rem;
`;

const MySelect = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and alse replace ErrorMessage entirely.
  const [field, meta] = useField(props);
  return (
    <>
      <StyledLabel htmlFor={props.id || props.name}>{label}</StyledLabel>
      <StyledSelect {...field} {...props} />
      {meta.touched && meta.error ? (
        <StyledErrorMessage>{meta.error}</StyledErrorMessage>
      ) : null}
    </>
  );
};



class CreateCase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {message: ""}
  };

  async componentDidMount() {
    try {
        //let sessionObject = await Auth.currentSession();
        //let tkn = sessionObject.accessToken.jwtToken;
        //let usr=sessionObject.idToken.payload.email;
        let user = await Auth.currentAuthenticatedUser();
        const userid = user.username;
        var tenant_id=user.attributes.website;
        this.state.tenantid = tenant_id;
        //console.log(tenant_id);
    } catch (e) {
        alert(e);
    }
  }






  
  
  render(){
    return (
      <>
      
     
      <h1>Create Case</h1>
      <Formik


    
        initialValues={{
          caseid: "",
          type: "",
          description: "",
          status: "",
          SLA: "",
          acceptedTerms: false, // added for our checkbox
          priority: "",
          userid: "",
          tenantid: this.state.tenantid,
          tenantname: "",
          message: ""
          

        }}
        validationSchema={Yup.object({
          caseid: Yup.string()
            .max(15, "Must be 10 characters or less")
            .required("Required"),
          acceptedTerms: Yup.boolean()
            .required("Required")
            .oneOf([true], "You must accept the terms and conditions."),
          priority: Yup.string()
            // specify the set of valid values for job type
            // @see http://bit.ly/yup-mixed-oneOf
            .required("Required")
        })}
        onSubmit={async (values, { setSubmitting }) => {
          await new Promise(r => setTimeout(r, 500));

          let user = await Auth.currentAuthenticatedUser();
          let sessionObject = await Auth.currentSession();
          let tkn = sessionObject.idToken.jwtToken;
          var bearertkn= "Bearer "+tkn;
          const userid = user.username;
          var tenant_id=user.attributes.website;
          console.log(tenant_id);
          values.userid=userid;
          values.username=user.attributes.email;
          values.tenantid=tenant_id;
          values.tenantname = ((values.tenantid=='tenant1') ? 'ABC Corp' : 'XYZ Corp');
          

          postData2(values, bearertkn);
          //await alert("Case submitted");
         values.message=(values.caseid +" has been created. Go to ViewCase tab for details.");
         alert(values.caseid + " has been submitted");
        this.state.message=values.message;

          this.props.history.push('/createcase');
          setSubmitting(false);
          
          
        }}
      >
        <Form>
          <MyTextInput
            label="Case ID"
            name="caseid"
            type="text"
            placeholder= "TX-N, e.g. TX-1 for tenantX"
          />
          <MySelect label="Case Type" name="type">
            <option value="">Select</option>
            <option value="fraud">Fraud</option>
            <option value="claim">Claim</option>
            <option value="investigation">Investigation</option>
      
          </MySelect>
          <MyTextInput
            label="Description"
            name="description"
            type="text"
            placeholder="case description"
          />
          <MyTextInput
            label="Case Status"
            name="status"
            type="text"
            placeholder="Open"
          />
          <MyTextInput
            label="SLA"
            name="SLA"
            type="text"
            placeholder="SLA in days"
          />

          <MySelect label="Priority" name="priority">
            <option value="">Select</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
      
          </MySelect>
          <MyCheckbox name="acceptedTerms">
            Case details have been verified.
          </MyCheckbox>

          <button type="submit">Submit</button>

        </Form>
      </Formik>
      <h5>{this.state.message}</h5>

      </>
    
    );
  }
}
export default withRouter(CreateCase);
