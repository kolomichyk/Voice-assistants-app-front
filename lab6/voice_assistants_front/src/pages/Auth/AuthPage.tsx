import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from 'axios';
import Cookies from 'js-cookie';
import { useDispatch} from 'react-redux';

interface IUser {
 username: string;
 password: string;
}

const AuthPage: React.FC = () => {
 const dispatch = useDispatch();
 const [successful, setSuccessful] = useState<boolean>(false);
 const [message, setMessage] = useState<string>("");

 const initialValues: IUser = {
  username: "",
  password: "",
 };

 const validationSchema = Yup.object().shape({
  username: Yup.string()
    .required("Username is required"),
  password: Yup.string()
    .required("Password is required"),
 });

 const handleLogin = (values: IUser) => {
   try {
       axios({
           url: 'http://127.0.0.1:8000/login/',
           method: 'POST',
           data: {
             login: values.username,
             password: values.password
           },
           withCredentials: true
         }).then((response) => {
       if (response.status === 201) {
          dispatch({ type: "UPDATE_LOGIN", payload: values.username });
          dispatch({ type: "LOGGEDCHANGE", payload: true });

        //   Cookies.set("sessionid", response.data, {
        //   path: "/",
        //   expires: new Date(Date.now() + 25920000),
        //  });
         setSuccessful(true);
       } else {
         setSuccessful(false);
       }
     }).catch((error) => {
       console.error(error);
     });
   } catch (error) {
     console.error(error);
   }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "50vh",
      }}
    >
      <div 
        className="card card-container"
        style={{ width: "300px" }}
      >
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleLogin}
        >
          <Form>
           {!successful && (
             <div>
               <div className="form-group">
                <label htmlFor="username">Имя пользователя</label>
                <Field name="username" type="text" className="form-control" as="input" id="username" />
                <ErrorMessage
                  name="username"
                  component="div"
                  className="alert alert-danger"
                />
                </div>

                <div className="form-group">
                <label htmlFor="password">Пароль</label>
                <Field
                  name="password"
                  type="password"
                  className="form-control"
                  as="input"
                  id="password"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="alert alert-danger"
                />
              </div>


               <div className="form-group">
                <button type="submit" className="btn btn-primary btn-block">Войти</button>
               </div>
             </div>
           )}

           {message && (
             <div className="form-group">
               <div
                className={
                  successful ? "Авторизация прошла успешно" : "Не удалось авторизовать пользователя"
                }
                role="alert"
               >
                {message}
               </div>
             </div>
           )}
         </Form>
        </Formik>
      </div>
    </div>
   );
};

export default AuthPage;


 

