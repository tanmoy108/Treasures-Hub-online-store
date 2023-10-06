import React from 'react';
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

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },
  {
    path: "/login",
    element: <LoginPage/>,
  },
  {
    path: "/signup",
    element: <SignupPage/>,
  },
  {
    path: "/checkout",
    element: <Checkout/>,
  },
  {
    path: "//specificProduct",
    element: <SpecificPage/>,
  },
]);

function App() {
  return (
    <div className="App">
       <RouterProvider router={router} />
    </div>
  );
}

export default App;
