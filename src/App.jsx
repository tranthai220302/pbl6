import React, { useState } from 'react'
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  useLocation
} from "react-router-dom";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import './App.css'
import Header from './compoments/Header/Header';
import Footer from './compoments/Footer/Footer';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Chat from './pages/Chat/Chat';
import LoginAdmin from './pages/Admin/Login/LoginAdmin';
import HomeAdmin from './pages/Admin/Home/HomeAdmin';
import Customer from './pages/Admin/Customer/Customer';
import Store from './pages/Admin/Store/Store';
import BookList from './pages/BookList/BookList';
import ProductInf from './pages/ProductInf/ProductInf';
import RequestStore from './pages/Admin/requestStore/requestStore';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SliderMenu from './compoments/SliderMenu/SliderMenu';
import ReportPage from './pages/Admin/ReportPage/ReportPage';
import Satistical from './pages/Admin/Satistical/Satistical';
const queryClient = new QueryClient()
const App = () => {
  const [openChat, setOpenChat] = useState(false)
  
  const Layout = () =>{
    const isAdminPage = useLocation().pathname.includes('/admin');
    const isLoginPage = useLocation().pathname.includes('/login');
    const isRegisterPage = useLocation().pathname.includes('/register');


    console.log(isAdminPage)
    return (
      <QueryClientProvider client={queryClient}>
        <div className="app">
          {!isAdminPage && !isLoginPage && !isRegisterPage && (<Header setOpenChat={setOpenChat} />)}
          {isAdminPage && <SliderMenu />}
          {openChat && (<Chat setOpenChat={setOpenChat} />)}
          <Outlet/>
          {!isAdminPage && !isLoginPage && !isRegisterPage && (<Footer />)}
          <ToastContainer />
        </div>
      </QueryClientProvider>
    )
  }
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout/>,
      children : [
        {
          path: '/',
          element : <Home/>
        },
        {
          path : '/login',
          element: <Login/>
        },
        {
          path: '/register',
          element: <Register/>
        },
        {
          path: '/booklist',
          element: <BookList/>
        },
        {
          path: '/productinformation',
          element: <ProductInf/>
        },
        {
          path: '/admin/login',
          element: <LoginAdmin />
        },
        {
          path: '/admin/home',
          element: <HomeAdmin />
        },
        {
          path: '/admin/customer',
          element: <Customer />
        },
        {
          path: '/admin/store',
          element: <Store />
        },
        {
          path : '/admin/requestStore',
          element: <RequestStore />
        },
        {
          path : '/admin/report',
          element: <ReportPage />
        },
        {
          path : '/admin/satistical',
          element: <Satistical />
        }
      ]
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App