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
]);

function App() {
  const userData = useSelector(selectUser);
  const dispatch = useDispatch();
  useEffect(() => {
    if (userData) dispatch(CartGetAsync(userData.id))
  }, [userData])

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
