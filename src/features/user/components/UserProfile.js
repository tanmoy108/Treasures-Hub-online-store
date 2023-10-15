import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { UpdateUserInfoAsync, selectUserInfo } from '../userSlice';
import { useForm } from "react-hook-form";

export default function UserProfile() {
  const [openForm, setOpenForm] = useState(-1)
  const [openAddForm, setOpenAddForm] = useState(false)
  const dispatch = useDispatch();
  const userInfo = useSelector(selectUserInfo)
  console.log(userInfo)
  const {
    register,
    handleSubmit,
    reset,
    setValue
  } = useForm()

  const OpenEditForm = (e, index) => {
    e.preventDefault()
    setOpenForm(index);
    setOpenAddForm(false)
    setValue("fullName", userInfo.address[index].fullName)
    setValue("phone", userInfo.address[index].phone)
    setValue("email", userInfo.address[index].email)
    setValue("streetAddress", userInfo.address[index].streetAddress)
    setValue("city", userInfo.address[index].city)
    setValue("region", userInfo.address[index].region)
    setValue("postalCode", userInfo.address[index].postalCode)
  }
  const HandleRemove = (e, index) => {
    const removeAddress = { ...userInfo, address: [...userInfo.address] }
    removeAddress.address.splice(index, 1)
    dispatch(UpdateUserInfoAsync(removeAddress))

  }
  const HandleEdit = (data, index) => {
    const updateAddress = { ...userInfo, address: [...userInfo.address] }
    updateAddress.address.splice(index, 1, data)
    dispatch(UpdateUserInfoAsync(updateAddress))
    setOpenForm(-1)
    reset()

  }
  const onAdd = (data) => {
    const updateAddress = { ...userInfo, address: [...userInfo.address, data] }
    dispatch(UpdateUserInfoAsync(updateAddress))
    reset()
    setOpenAddForm(false)

  }
  const HandleAddForm = () => {
    setOpenForm(-1);
    setOpenAddForm(true)
    reset()
    
  }

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">

          <div className="lg:col-span-5">
            <div className="mx-auto mt-3 bg-white max-w-7xl px-0 sm:px-0 lg:px-0 rounded-md">
              <div className="border-t border-gray-200 px-4 py-3 sm:px-6">
                <h1 className="text-2xl my-10 font-bold tracking-tight text-gray-900">
                  Street Address
                </h1>
                <h1 className="text-2xl my-10 font-bold tracking-tight text-gray-900">
                  {userInfo.name}
                </h1>
                <h1 className="text-2xl my-10 font-bold tracking-tight text-red-900">
                  {userInfo.email}
                </h1>
                <button
                  onClick={() => HandleAddForm()}
                  type="button"
                  className=" mb-12 rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Add Address
                </button>
                <div className="flow-root" >
                  <ul role="list" className="-my-6 divide-y divide-gray-200">
                    <div className="border-b border-gray-900/10 pb-12">
                      <ul role="list">
                        {openAddForm === true &&  <form noValidate onSubmit={handleSubmit((data) => {
                              onAdd(data)
                            })} className="bg-white px-5 py-12 mt-12">
                              <div className="space-y-12">
                                <div className="border-b border-gray-900/10 pb-12">
                                  <h2 className="text-2xl font-semibold leading-7 text-gray-900">
                                    Add Information
                                  </h2>


                                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                    <div className="sm:col-span-3">
                                      <label
                                        htmlFor="fullName"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                      >
                                        Full name
                                      </label>
                                      <div className="mt-2">
                                        <input
                                          type="text"
                                          {...register("fullName")}
                                          id="fullName"
                                          autoComplete="fullName"
                                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                      </div>
                                    </div>
                                    <div className="sm:col-span-3">
                                      <label
                                        htmlFor="phone"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                      >
                                        Phone No
                                      </label>
                                      <div className="mt-2">
                                        <input
                                          type="tel"
                                          {...register("phone")}
                                          id="phone"
                                          autoComplete="phone"
                                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                      </div>
                                    </div>

                                    <div className="sm:col-span-4">
                                      <label
                                        htmlFor="email"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                      >
                                        Email address
                                      </label>
                                      <div className="mt-2">
                                        <input
                                          id="email"
                                          {...register("email")}
                                          type="email"
                                          autoComplete="email"
                                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                      </div>
                                    </div>

                                    <div className="col-span-full">
                                      <label
                                        htmlFor="streetAddress"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                      >
                                        Street address
                                      </label>
                                      <div className="mt-2">
                                        <input
                                          type="text"
                                          {...register("streetAddress")}
                                          id="streetAddress"
                                          autoComplete="streetAddress"
                                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                      </div>
                                    </div>

                                    <div className="sm:col-span-2 sm:col-start-1">
                                      <label
                                        htmlFor="city"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                      >
                                        City
                                      </label>
                                      <div className="mt-2">
                                        <input
                                          type="text"
                                          {...register("city")}
                                          id="city"
                                          autoComplete="address-level2"
                                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                      </div>
                                    </div>

                                    <div className="sm:col-span-2">
                                      <label
                                        htmlFor="region"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                      >
                                        State / Province
                                      </label>
                                      <div className="mt-2">
                                        <input
                                          type="text"
                                          {...register("region")}
                                          id="region"
                                          autoComplete="address-level1"
                                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                      </div>
                                    </div>

                                    <div className="sm:col-span-2">
                                      <label
                                        htmlFor="postalCode"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                      >
                                        ZIP / Postal code
                                      </label>
                                      <div className="mt-2">
                                        <input
                                          type="text"
                                          {...register("postalCode")}
                                          id="postalCode"
                                          autoComplete="postalCode"
                                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <div className="mt-6 flex items-center justify-end gap-x-6">
                                  <button
                                    onClick={() => { setOpenAddForm(false); setOpenForm(-1); reset() }}
                                    type="button"
                                    className="rounded-md  px-3 py-2 text-sm font-semibold text-gray-500 shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                  >
                                    Cancel
                                  </button>
                                  <button
                                    type="submit"
                                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                  >
                                   Add Address
                                  </button>
                                </div>
                              </div>
                            </form>}
                        {userInfo.address && userInfo.address.map((address, index) => (
                          <>
                            {/* form start */}
                            {openForm === index && <form noValidate onSubmit={handleSubmit((data) => {
                              HandleEdit(data, index)
                            })} className="bg-white px-5 py-12 mt-12">
                              <div className="space-y-12">
                                <div className="border-b border-gray-900/10 pb-12">
                                  <h2 className="text-2xl font-semibold leading-7 text-gray-900">
                                    Edit Information
                                  </h2>


                                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                    <div className="sm:col-span-3">
                                      <label
                                        htmlFor="fullName"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                      >
                                        Full name
                                      </label>
                                      <div className="mt-2">
                                        <input
                                          type="text"
                                          {...register("fullName")}
                                          id="fullName"
                                          autoComplete="fullName"
                                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                      </div>
                                    </div>
                                    <div className="sm:col-span-3">
                                      <label
                                        htmlFor="phone"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                      >
                                        Phone No
                                      </label>
                                      <div className="mt-2">
                                        <input
                                          type="tel"
                                          {...register("phone")}
                                          id="phone"
                                          autoComplete="phone"
                                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                      </div>
                                    </div>

                                    <div className="sm:col-span-4">
                                      <label
                                        htmlFor="email"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                      >
                                        Email address
                                      </label>
                                      <div className="mt-2">
                                        <input
                                          id="email"
                                          {...register("email")}
                                          type="email"
                                          autoComplete="email"
                                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                      </div>
                                    </div>

                                    <div className="col-span-full">
                                      <label
                                        htmlFor="streetAddress"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                      >
                                        Street address
                                      </label>
                                      <div className="mt-2">
                                        <input
                                          type="text"
                                          {...register("streetAddress")}
                                          id="streetAddress"
                                          autoComplete="streetAddress"
                                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                      </div>
                                    </div>

                                    <div className="sm:col-span-2 sm:col-start-1">
                                      <label
                                        htmlFor="city"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                      >
                                        City
                                      </label>
                                      <div className="mt-2">
                                        <input
                                          type="text"
                                          {...register("city")}
                                          id="city"
                                          autoComplete="address-level2"
                                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                      </div>
                                    </div>

                                    <div className="sm:col-span-2">
                                      <label
                                        htmlFor="region"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                      >
                                        State / Province
                                      </label>
                                      <div className="mt-2">
                                        <input
                                          type="text"
                                          {...register("region")}
                                          id="region"
                                          autoComplete="address-level1"
                                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                      </div>
                                    </div>

                                    <div className="sm:col-span-2">
                                      <label
                                        htmlFor="postalCode"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                      >
                                        ZIP / Postal code
                                      </label>
                                      <div className="mt-2">
                                        <input
                                          type="text"
                                          {...register("postalCode")}
                                          id="postalCode"
                                          autoComplete="postalCode"
                                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <div className="mt-6 flex items-center justify-end gap-x-6">
                                  <button
                                    onClick={() => { setOpenAddForm(false); setOpenForm(-1); reset() }}
                                    type="button"
                                    className="rounded-md  px-3 py-2 text-sm font-semibold text-gray-500 shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                  >
                                    Cancel
                                  </button>
                                  <button
                                    type="submit"
                                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                  >
                                   Edit Address
                                  </button>
                                </div>
                              </div>
                            </form>}

                            {/* Address list */}
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
                              <div className="hidden sm:flex sm:flex-col sm:items-end">
                                <button
                                  onClick={(e) => OpenEditForm(e, index)}
                                  type="button"
                                  className="font-medium text-indigo-600 hover:text-indigo-500"
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={(e) => HandleRemove(e, index)}
                                  type="button"
                                  className="font-medium text-indigo-600 hover:text-indigo-500"
                                >
                                  Remove
                                </button>
                              </div>
                            </li>
                          </>
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
