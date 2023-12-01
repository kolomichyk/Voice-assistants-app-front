import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import DetailedPage from './pages/DetailedPage/DetailedPage'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import AboutPage from './pages/AboutPage/AboutPage'
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
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <div>
    <RouterProvider router={router} />
  </div>
)