import React from 'react';
import './App.css';
import { Routes, Route } from "react-router-dom";
import Home from './Pages/Home/Home';
import Forgot from './Pages/Auth/Forgot';
import Register from './Pages/Auth/Register';
import Reset from './Pages/Auth/Reset';
import Login from './Pages/Auth/Login';
import Dashboard from './Pages/Dashboard/Dashboard';
import Sidebars from './Component/sidebar/Sidebars';
import Layout from './Component/Layout/Layout';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrivateRoute from './Component/protect/PrivateRoute';
import Addproduct from './Pages/Addproduct/Addproduct';
import ProductDetails from './Component/Products/ProductDetails/ProductDetails';
import EditProduct from './Pages/EditProduct/EditProduct';
import Profile from './Pages/Profile/Profile';
import EditProfile from './Pages/Profile/EditProfile';



const App = () => {
  return (
    <>
    <ToastContainer />
    
    <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/forgot" element={<Forgot/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/resetpassword/:resetToken" element={<Reset/>} />

        <Route element={<PrivateRoute/>}>
          
          <Route path='/dashboard' element={
            <Sidebars>
              <Layout>
                <Dashboard /> 
              </Layout>
            </Sidebars>
          }/>

          <Route path='/add-product' element={
            <Sidebars>
              <Layout>
                <Addproduct/>
              </Layout>
            </Sidebars>
          }/>

         <Route path='/product-detail/:id' element={
            <Sidebars>
              <Layout>
                 <ProductDetails/>
              </Layout>
            </Sidebars>
          }/>

         <Route path='/edit-product/:id' element={
            <Sidebars>
              <Layout>
                 <EditProduct/>
              </Layout>
            </Sidebars>
          }/>

         <Route path='/profile' element={
            <Sidebars>
              <Layout>
                 <Profile/>
              </Layout>
            </Sidebars>
          }/>

         <Route path='/edit-profile' element={
            <Sidebars>
              <Layout>
                 <EditProfile />
              </Layout>
            </Sidebars>
          }/>

        </Route>

    </Routes>
    </>
  )
};

export default App;



