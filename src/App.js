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
import Protected from './features/auth/component/Protected';

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
    element: <Protected><Checkout/></Protected>,
  },
  {
    path: "/specificProduct/:id",
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
