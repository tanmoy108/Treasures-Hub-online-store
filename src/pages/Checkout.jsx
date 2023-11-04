import { Navigate } from 'react-router-dom';
import Navbar from '../features/navbar/Navbar';
import CartBox from '../features/cartList/CartBox';
import CartButton from '../features/cartList/CartButton';
import { useDispatch, useSelector } from 'react-redux';
import { selectCart } from '../features/cartList/CartLIstSlice';
import { useForm } from "react-hook-form";
import { PostOrderAsync, selectOrder } from '../features/order/orderSlice';
import { patchUserAsync, selectUser } from '../features/auth/AuthSlice';
import { useState } from 'react';
import { selectUserInfo } from '../features/user/userSlice';
import { discountPrice } from '../app/constant';

function Checkout() {
    const cartProducts = useSelector(selectCart)
    const userData = useSelector(selectUser);
    const userInfo = useSelector(selectUserInfo);
    const orderData = useSelector(selectOrder);
    const dispatch = useDispatch();
    const [selectAddress, setSelectAddress] = useState(null);
    const [payment, setPayment] = useState("card");
    const {
        register,
        handleSubmit,
        reset,
    } = useForm()

    const totalPrice = cartProducts.reduce((acc, item) => discountPrice(item.product) * item.quantity + acc, 0)
    const totalQuantity = cartProducts.reduce((total, item) => item.quantity + total, 0)

    const HandleOrder = () => {
        console.log(totalPrice,totalQuantity)
       if(selectAddress && payment)
       {
        dispatch(PostOrderAsync(
            {
                products: cartProducts,
                address: selectAddress,
                price: totalPrice,
                quantity: totalQuantity,
                method: payment,
                status: "pending"
            }
        ))
       }
    }

    const onSubmit = (data) => {
        dispatch(patchUserAsync(
            {
                ...userInfo,
                address: [...userInfo.address, data]
            }))
        reset()
    }
    const HandleAddress = (index) => {
        setSelectAddress(userInfo.address[index])
    }
    const HandlePayment = (e) => {
        setPayment(e.target.value)
    }
    return (
        <>
            {!cartProducts.length && <Navigate to="/" replace={true}></Navigate>}
            {orderData && orderData.method==="cash" && <Navigate to={`/order/${orderData.id}`} replace={true}></Navigate>}
            {orderData && orderData.method==="card" && <Navigate to="/stripe_checkout" replace={true}></Navigate>}
            <Navbar>
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
                        {/* checkout form start */}
                        <div className="lg:col-span-3">
                            <form noValidate onSubmit={handleSubmit(onSubmit)} className="bg-white px-5 py-12 mt-12">
                                <div className="space-y-12">
                                    <div className="border-b border-gray-900/10 pb-12">
                                        <h2 className="text-2xl font-semibold leading-7 text-gray-900">
                                            Personal Information
                                        </h2>
                                        <p className="mt-1 text-sm leading-6 text-gray-600">
                                            Use a permanent address where you can receive mail.
                                        </p>

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
                                                        {...register("fullName",{ required: "Name is required" })}
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
                                                        {...register("phone",{ required: "Phone is required" })}
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
                                                        value={userInfo.email}
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
                                                        {...register("streetAddress",{ required: "Address is required" })}
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
                                                        {...register("city",{ required: "City is required" })}
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
                                                        {...register("region",{ required: "Region is required" })}
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
                                                        {...register("postalCode",{ required: "Postal code is required" })}
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
                                            onClick={() => reset()}
                                            type="button"
                                            className="text-sm font-semibold leading-6 text-gray-900"
                                        >
                                            Reset
                                        </button>
                                        <button
                                            type="submit"
                                            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                        >
                                            Add Address
                                        </button>
                                    </div>
                                    {/* address start */}
                                    <div className="border-b border-gray-900/10 pb-12">
                                        <h2 className="text-base font-semibold leading-7 text-gray-900">
                                            Addresses
                                        </h2>
                                        <p className="mt-1 text-sm leading-6 text-gray-600">
                                            Choose from Existing addresses
                                        </p>
                                        <ul>
                                            {userInfo.address.map((address, index) => (
                                                <li
                                                    key={index}
                                                    className="flex justify-between gap-x-6 px-5 py-5 border-solid border-2 border-gray-200"
                                                >
                                                    <div className="flex gap-x-4">
                                                        <input
                                                            onChange={() => HandleAddress(index)}
                                                            name="address"
                                                            type="radio"
                                                            value={selectAddress}
                                                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                        />
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
                                        {/* cash start */}
                                        <div className="mt-10 space-y-10">
                                            <fieldset>
                                                <legend className="text-sm font-semibold leading-6 text-gray-900">
                                                    Payment Methods
                                                </legend>
                                                <p className="mt-1 text-sm leading-6 text-gray-600">
                                                    Choose One
                                                </p>
                                                <div className="mt-6 space-y-6">
                                                    <div className="flex items-center gap-x-3">
                                                        <input
                                                            id="cash"
                                                            name="payments"
                                                            type="radio"
                                                            value="cash"
                                                            checked={payment === 'cash'}
                                                            onClick={HandlePayment}
                                                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                        />
                                                        <label
                                                            htmlFor="cash"
                                                            className="block text-sm font-medium leading-6 text-gray-900"
                                                        >
                                                            Cash
                                                        </label>
                                                    </div>
                                                    <div className="flex items-center gap-x-3">
                                                        <input
                                                            id="card"
                                                            name="payments"
                                                            type="radio"
                                                            value="card"
                                                            checked={payment === "card"}
                                                            onClick={HandlePayment}
                                                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                        />
                                                        <label
                                                            htmlFor="card"
                                                            className="block text-sm font-medium leading-6 text-gray-900"
                                                        >
                                                            Card Payment
                                                        </label>
                                                    </div>
                                                </div>
                                            </fieldset>
                                        </div>
                                        {/* cash end */}
                                    </div>
                                </div>


                            </form>
                        </div>
                        {/* checkout form end */}


                        {/* cart start */}
                        <div className="lg:col-span-2">
                            <div className="mx-auto mt-12 bg-white max-w-7xl px-0 sm:px-0 lg:px-0">
                                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                                    <h1 className="text-4xl my-5 font-bold tracking-tight text-gray-900">
                                        Cart
                                    </h1>
                                    <CartBox />
                                </div>

                                <CartButton HandleOrder={HandleOrder} />
                            </div>
                        </div>
                        {/* cart end */}
                    </div>
                </div>
            </Navbar>
        </>

    );
}

export default Checkout;