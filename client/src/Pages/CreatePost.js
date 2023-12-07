import React, { useEffect} from "react";
import {Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
//import { AuthContext } from '../helpers/AuthContext';


function CreatePost() {

    let navigate = useNavigate();
    //const {authState} = useContext(AuthContext);

    const initialValues = {
        title: "",
        postText: "",
    };

    useEffect(()=>{
        if(!localStorage.getItem("accessToken")) {
            navigate('/login');
        }
    }, []);

    const validationSchema = Yup.object().shape({
        title: Yup.string().required(),
        postText: Yup.string().required(),
    });

    const onSubmit = (data) => {

        axios.post('https://full-stack-api-sushanthnandeti-5a86740447dd.herokuapp.com/posts',data, 
        {headers: {accessToken: localStorage.getItem('accessToken')}}).then((response) => {
            navigate("/");
    });
        
    };

  return (
    <div className="createPostPage" > 
        <Formik  initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            <Form className="formContainer">
                <label>Title: </label>
                <ErrorMessage name="title" component="span" />
                <Field
                    id = "inputCreatePost"
                    name = "title"
                    placeholder = "(Ex: Title...)"
                />

                <label> Post: </label>
                <ErrorMessage name="post" component="span" />
                <Field
                    id = "inputCreatePost"
                    name = "postText"
                    placeholder = "(Ex: Post...)"
                />

                <button type="submit">Create Post</button>
            </Form>

        </Formik>

    </div>
  )
}

export default CreatePost;