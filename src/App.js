import React, { useEffect } from 'react';
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import './App.css';
import Home from './pages/Home';
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

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <LoginPage />,
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
    element: <NotFound/>,
  },
]);

function App() {
  const userData = useSelector(selectUser);
  const dispatch = useDispatch();
  useEffect(() => {
    if (userData) dispatch(CartGetAsync(userData.id))
  }, [dispatch,userData])

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
