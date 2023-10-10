import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser } from '../../auth/AuthSlice';
import { fetchUserOrderAsync, selectUserOrder } from '../userSlice';

export default function UserOrder() {
  const userData = useSelector(selectUser);
  const dispatch = useDispatch();
  const userOrder = useSelector(selectUserOrder)
  console.log(userOrder)

  useEffect(() => {
    dispatch(fetchUserOrderAsync(userData.id))
  }, [dispatch, userData])

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
          {/* cart start */}
          {userOrder && userOrder.map((product, index) => (
          <div className="lg:col-span-5" key={index} >
            <div className="mx-auto mt-3 bg-white max-w-7xl px-0 sm:px-0 lg:px-0 rounded-md">
              <div className="border-t border-gray-200 px-4 py-3 sm:px-6">
                <h1 className="text-2xl my-3 font-bold tracking-tight text-gray-900">
                  Order #{product.id}
                </h1>
                <h1 className="text-1xl my-1 font-bold tracking-tight text-orange-600">
                  Status: {product.status}
                </h1>
                <ul className='my-2'><span className='font-bold text-gray-800'>Shipping Address:</span>
                  <li className="text-slate-600 " >Street: {product.address.streetAddress}</li>
                  <li className="text-slate-600 ">City: {product.address.city}</li>
                  </ul>
                  <div className="flow-root" >
                    <ul role="list" className="-my-6 divide-y divide-gray-200">
                      {userOrder && product.products.map((item, index) => (
                        <li key={index} className="flex py-6">
                          <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                            <img
                              src={item.thumbnail}
                              alt={item.title}
                              className="h-full w-full object-cover object-center"
                            />
                          </div>

                          <div className="ml-4 flex flex-1 flex-col">
                            <div>
                              <div className="flex justify-between text-base font-medium text-gray-900">
                                <h3>
                                  {item.title}
                                </h3>
                                <p className="ml-4">{item.price}</p>
                              </div>
                              {/* <p className="mt-1 text-sm text-gray-500">{item.color ? item.color : ''}</p> */}
                            </div>
                            <div className="flex flex-1 items-center justify-between text-sm">
                              <p className="text-gray-500">Quantity {item.quantity}</p>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                
              </div>
            </div>
          </div>))}
          {/* cart end */}
        </div>
      </div>
    </>

  );
}
