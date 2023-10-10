import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser } from '../../auth/AuthSlice';
import { fetchUserInfoAsync, selectUserInfo } from '../userSlice';

export default function UserProfile() {
  const userData = useSelector(selectUser);
  const dispatch = useDispatch();
  const userInfo = useSelector(selectUserInfo)
  console.log(userInfo)

  useEffect(() => {
    dispatch(fetchUserInfoAsync(userData.id))
  }, [dispatch, userData])

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
          {/* cart start */}

          <div className="lg:col-span-5">
            <div className="mx-auto mt-3 bg-white max-w-7xl px-0 sm:px-0 lg:px-0 rounded-md">
              <div className="border-t border-gray-200 px-4 py-3 sm:px-6">
                <h1 className="text-2xl my-10 font-bold tracking-tight text-gray-900">
                  Street Address
                </h1>
                <div className="flow-root" >
                  <ul role="list" className="-my-6 divide-y divide-gray-200">
                      <div className="border-b border-gray-900/10 pb-12">
                        <ul role="list">
                          {userInfo && userInfo.address.map((address, index) => (
                            <li
                              key={index}
                              className="flex justify-between gap-x-6 px-5 py-5 border-solid border-2 border-gray-200"
                            >
                              <div className="flex gap-x-4">
                                <div className="min-w-0 flex-auto">
                                  <p className="text-sm font-semibold leading-6 text-gray-900">
                                    {address.fullName}
                                  </p>
                                  <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                                    {address.streetAddress}
                                  </p>
                                  <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                                    {address.postalCode}
                                  </p>
                                </div>
                              </div>
                              <div className="hidden sm:flex sm:flex-col sm:items-end">
                                <p className="text-sm leading-6 text-gray-900">
                                  Phone: {address.phone}
                                </p>
                                <p className="text-sm leading-6 text-gray-500">
                                  {address.city}
                                </p>
                              </div>
                            </li>
                          ))}
                        </ul>
                        {/* address end */}
                      </div>
                  </ul>
                </div>

              </div>
            </div>
          </div>
          {/* cart end */}
        </div>
      </div>
    </>

  );
}
