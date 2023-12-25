import React, { useState, useEffect } from "react";
import MainPage from "./pages/MainPage/MainPage";
import AuthPage from "./pages/Auth/AuthPage";
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';

function App() {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state) => state.isLoggedIn);

//   useEffect(() => {
//       const sessionId = Cookies.get('sessionid');
//       if (sessionId !== undefined) {
//         dispatch({ type: "LOGGED", payload: false });
//       }
//   }, []);

  return (
      isLoggedIn ? <MainPage /> : <AuthPage/>
  )
}

export default App;
