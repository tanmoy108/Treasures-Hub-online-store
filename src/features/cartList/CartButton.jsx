import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectCart } from './CartLIstSlice'

const CartButton = ({ HandleOrder }) => {
    const cartProducts = useSelector(selectCart)
    const totalPrice = cartProducts.reduce((acc, item) => item.price * item.quantity + acc, 0)
    const totalQuantity = cartProducts.reduce((total, item) => item.quantity + total, 0)
    return (
        <>
            {cartProducts.length &&
                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                    <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Subtotal</p>
                        <p>${totalPrice}</p>
                    </div>
                    <p className="mt-0.5 text-sm text-gray-500">
                        Shipping and taxes calculated at checkout.
                    </p>
                    <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Product Quantiy</p>
                        <p>{totalQuantity}</p>
                    </div>
                    <div className="mt-6">
                        {!HandleOrder ?
                            <Link to="/checkout"
                                className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700">
                                CheckOut</Link> :
                            <div onClick={HandleOrder}
                                className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700">
                                Pay and Order</div>}
                    </div>
                    <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                        <p>
                            or
                            <Link to="/">
                                <button
                                    type="button"
                                    className="font-medium text-indigo-600 hover:text-indigo-500"
                                >
                                    Continue Shopping
                                    <span aria-hidden="true"> &rarr;</span>
                                </button>
                            </Link>
                        </p>
                    </div>
                </div>}
        </>
    )
}

export default CartButton