import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { CartDeleteAsync, CartPatchAsync, selectCart } from './CartLIstSlice';
import { selectUser } from '../auth/AuthSlice';

const CartBox = () => {
    const cartProducts = useSelector(selectCart)
    const userData = useSelector(selectUser);
    const dispatch = useDispatch();
  return (
    <>
    { cartProducts.length && <div className="flow-root">
                          <ul role="list" className="-my-6 divide-y divide-gray-200">
                            {userData && cartProducts.map((product) => (
                              <li key={product.id} className="flex py-6">
                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                  <img
                                    src={product.thumbnail}
                                    alt={product.title}
                                    className="h-full w-full object-cover object-center"
                                  />
                                </div>

                                <div className="ml-4 flex flex-1 flex-col">
                                  <div>
                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                      <h3>
                                        {product.title}
                                      </h3>
                                      <p className="ml-4">{product.price}</p>
                                    </div>
                                    <p className="mt-1 text-sm text-gray-500">{product.color ? product.color : ''}</p>
                                  </div>
                                  <div className="flex flex-1 items-end justify-between text-sm">
                                    {/* <p className="text-gray-500">Qty {product.quantity}</p> */}
                                    <div className="sm:col-span-3">
                                      <label htmlFor="quantity" className="block text-sm font-medium leading-6 text-gray-900">
                                        Quantity
                                      </label>
                                      <div className="mt-2">
                                        <select
                                          value={product.quantity}
                                          onChange={(e)=>dispatch(CartPatchAsync({...product,quantity:+e.target.value}))}
                                          id="quantity"
                                          name="quantity"
                                          autoComplete="quantity-name"
                                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                        >
                                          <option value="1">1</option>
                                          <option value="2">2</option>
                                          <option value="3">3</option>
                                          <option value="4">4</option>
                                          <option value="5">5</option>
                                        </select>
                                      </div>
                                    </div>

                                    <div className="flex">
                                      <button
                                      onClick={(e)=>(dispatch(CartDeleteAsync(product.id)))}
                                        type="button"
                                        className="font-medium text-indigo-600 hover:text-indigo-500"
                                      >
                                        Remove
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>}
    </>
  )
}

export default CartBox