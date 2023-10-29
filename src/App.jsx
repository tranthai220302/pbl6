import React from 'react'
import {
  createBrowserRouter,
  RouterProvider,
  Outlet
} from "react-router-dom";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import './App.css'
import Navbar from './compoments/Navbar/Navbar';
import Footer from './compoments/Footer/Footer';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Chat from './pages/Chat/Chat';
const queryClient = new QueryClient()
const App = () => {
  const Layout = () =>{
    return (
      <QueryClientProvider client={queryClient}>
        <div className="app">
          <Navbar/>
          <Outlet/>
          <Footer/>
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
          path: '/chat',
          element: <Chat/>
        },
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