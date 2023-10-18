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
import { fetchUserInfoAsync } from './features/user/userSlice';
import LogoutPage from './pages/LogoutPage';
import AdminProtected from './features/auth/component/AdminProtected';
import AdminSpecificPage from './pages/AdminSpecificPage';
import AdminEditProductFormPage from './pages/AdminEditProductFormPage';
import AdminOrderListPage from './pages/AdminOrderListPage';
import { positions, Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import CartPage from './pages/CartPage';
import StripeCheckout from './pages/StripeCheckout';

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
    path: "/cart",
    element: <Protected><CartPage/></Protected>,
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
    path: "/admin/orderlist",
    element: <AdminProtected><AdminOrderListPage /></AdminProtected>,
  },
  {
    path: "/stripe_checkout",
    element: <Protected><StripeCheckout /></Protected>,
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

  const options = {
    timeout: 5000,
    position: positions.TOP_RIGHT
  };

  return (
    <div className="App">
      <Provider template={AlertTemplate} {...options}>
        <RouterProvider router={router} />
      </Provider>
    </div>
  );
}

export default App;
