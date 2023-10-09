import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Navigate, useParams } from 'react-router-dom';
import { selectUser } from '../auth/AuthSlice';
import { CartClearAsync } from '../cartList/CartLIstSlice';
import { clearCurrentOrder, selectOrder } from './orderSlice';

export default function Order() {
  // const count = useSelector(selectCount);
  const dispatch = useDispatch();
  const userData = useSelector(selectUser)
  const params = useParams();

  useEffect(() => {
    dispatch(CartClearAsync(userData.id))
    dispatch(clearCurrentOrder())
  }, [dispatch, userData])

  return (
    <>
      {!params.id && <Navigate to="/" replace={true}></Navigate>}
      <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <h2 className="text-base font-semibold text-black">{`Order Number #${params?.id}`}</h2>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-green-700 sm:text-5xl">Order Successful</h1>
          <p className="mt-6 text-base leading-7 text-gray-600">Admin will check the order and deliver soon</p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              to="/"
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Go back home
            </Link>
            <a href="#" className="text-sm font-semibold text-gray-900">
              Contact support <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
      </main>
    </>
  );
}
