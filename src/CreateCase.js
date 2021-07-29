import React, { useEffect } from "react";
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

function postData2(cases){
  

 
  fetch('https://g0dk99wgjb.execute-api.us-west-2.amazonaws.com/dev/cases', {
    method: 'POST',
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

async function getCurrentUser(values) {
  let user = await Auth.currentAuthenticatedUser();
   const userid = user.username;
   console.log(userid);
   
   
  
  
};

export default class CreateCase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  };
/* async componentDidMount() {
    try {
        let sessionObject = await Auth.currentSession();
        let tkn = sessionObject.accessToken.jwtToken;
        let usr=sessionObject.idToken.payload.email;
        let user = await Auth.currentAuthenticatedUser();
        const userid = user.username;
        console.log(userid);
    } catch (e) {
        alert(e);
    }
}*/


  
  
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
          tenantid: "tenant1",
          tenantname: "ABC Corp"

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
          // values.tenantid="tenant2";
          //alert(values.tenantid)
          let user = await Auth.currentAuthenticatedUser();
          const userid = user.username;
          values.userid=userid;
          postData2(values);
          
          setSubmitting(false);
          
        }}
      >
        <Form>
          <MyTextInput
            label="Case ID"
            name="caseid"
            type="text"
            placeholder="Unique identifier for the case e.g. Case-1234"
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
    </>
    );
  }
}

