import React, { useEffect } from 'react';
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import './App.css';
import Home from './pages/Home';
import AdminHome from './pages/AdminHome';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Checkout from './pages/Checkout';
import SpecificPage from './pages/SpecificPage';
import Protected from './features/auth/component/Protected';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from './features/auth/AuthSlice';
import { CartGetAsync } from './features/cartList/CartLIstSlice';
import Order from './features/order/Order';
import NotFound from './pages/NotFound';
import UserOrderPage from './pages/UserOrderPage';
import UserInfoPage from './pages/UserInfoPage';
import { fetchUserInfoAsync, fetchUserOrderAsync } from './features/user/userSlice';
import LogoutPage from './pages/LogoutPage';
import AdminProtected from './features/auth/component/AdminProtected';
import AdminSpecificPage from './pages/AdminSpecificPage';
import AdminEditProductFormPage from './pages/AdminEditProductFormPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/admin",
    element: <AdminProtected><AdminHome /></AdminProtected>,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/logout",
    element: <LogoutPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/checkout",
    element: <Protected><Checkout /></Protected>,
  },
  {
    path: "/specificProduct/:id",
    element: <SpecificPage />,
  },
  {
    path: "/admin/addProduct",
    element: <AdminProtected><AdminEditProductFormPage /></AdminProtected>,
  },
  {
    path: "/admin/addProduct/:id",
    element: <AdminProtected><AdminEditProductFormPage /></AdminProtected>,
  },
  {
    path: "/admin/specificProduct/:id",
    element: <AdminProtected><AdminSpecificPage /></AdminProtected>,
  },
  {
    path: "/order/:id",
    element: <Protected><Order /></Protected>,
  },
  {
    path: "/profile",
    element: <Protected><UserInfoPage /></Protected>,
  },
  {
    path: "/myorder",
    element: <Protected><UserOrderPage /></Protected>,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

function App() {
  const userData = useSelector(selectUser);
  const dispatch = useDispatch();
  useEffect(() => {
    if (userData) {
      dispatch(CartGetAsync(userData.id))
      dispatch(fetchUserInfoAsync(userData.id))
    }
  }, [dispatch, userData])


  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
