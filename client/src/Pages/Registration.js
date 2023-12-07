import React from 'react';
import {Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from "yup";
import axios from "axios";


function Registration() {

  const initialValues = {
    username: "",
    password: "",
};

const validationSchema = Yup.object().shape({

    username: Yup.string().min(3).max(15).required(),
    password: Yup.string().min(4).max(20).required(),
});

const onSubmit =(data)=>{
    axios.post("https://full-stack-api-sushanthnandeti-5a86740447dd.herokuapp.com/auth",data).then(()=>{
      console.log(data);    
    })

}

  return (
    <div>
          <Formik  initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            <Form className="formContainer">

                <label> UserName: </label>
                <ErrorMessage name="username" component="span" />
                <Field
                    id = "inputCreatePost"
                    name = "username"
                    placeholder = "(Ex: Sushanth123...)"
                />

                <label> Password: </label>
                <ErrorMessage name="password" component="span" />
                <Field
                    id = "inputCreatePost"
                    type= "password"
                    name = "password"
                    placeholder = "(Your Password...)"
                />

                <button type="submit"> Register</button>
            </Form>

        </Formik>


    </div>
  )
}

export default Registration