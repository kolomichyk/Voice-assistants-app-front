import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import DetailedPage from './pages/DetailedPage/DetailedPage'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import AboutPage from './pages/AboutPage/AboutPage'
import DraftPage from './pages/DraftPage/DraftPage'
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

const defaultState = {
 draft_id: 0,
 searchString: "",
 login: "Гость",
 isLoggedIn: false,
};

const reducer = (state = defaultState, action) => {
 switch (action.type) {
   case "UPDATE_DRAFT_ID":
     return {...state, draft_id: action.payload}
   case "UPDATE_SEARCH_STRING":
     return {...state, searchString: action.payload}
   case "UPDATE_LOGIN":
     return {...state, login: action.payload}
   case "LOGGEDCHANGE":
    return {...state, isLoggedIn: action.payload}
   default:
     return state
 }
};

const store = configureStore({
 reducer: reducer
});

const router = createBrowserRouter([
  {
    path: '/',
    element:  <App></App> 
  },
  {
    path: '/details/:action_id',
    element: <DetailedPage></DetailedPage>
  },
  {
    path: '/about',
    element: <AboutPage></AboutPage>
  },
  {
    path: '/Draft',
    element: <DraftPage></DraftPage>
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
   <div>
     <RouterProvider router={router} />
   </div>
 </Provider>
)