import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GetOrderAsync, PatchOrderAsync, selectGetOrder, selectTotalOrder } from '../../order/orderSlice'
import Pagination from '../../productList/component/Pagination';
import { ITEMS_IN_PAGE } from '../../../app/constant';

const AdminOrderList = () => {
    const allOrder = useSelector(selectGetOrder);
    const TotalOrder = useSelector(selectTotalOrder);
    const dispatch = useDispatch()
    const [page, setPage] = useState(1)
    const [orderStatus, setOrderStatus] = useState(-1);

    const HandleOrderStatus = (order) => {
        setOrderStatus(order.id);
    }
    const HandleStatus = (e, order) => {
        const updateOrder = { ...order, status: e.target.value }
        dispatch(PatchOrderAsync(updateOrder))
        setOrderStatus(-1)
    }
    const HandlePage = (pageValue) => {
        setPage(pageValue)
    }
    useEffect(() => {
        const pagination = { _page: page, _limit: ITEMS_IN_PAGE }
        dispatch(GetOrderAsync(pagination))
    }, [dispatch, page])
    return (
        <>
            <div className="overflow-x-auto">
                <div className="bg-gray-100 flex items-center justify-centerfont-sans overflow-hidden">
                    <div className="w-full">
                        <div className="bg-white shadow-md rounded my-6">
                            <table className="min-w-max w-full table-auto">
                                <thead>
                                    <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                        <th className="py-3 px-2 text-left">Order</th>
                                        <th className="py-3 px-6 text-left">Items</th>
                                        <th className="py-3 px-6 text-center">Address</th>
                                        <th className="py-3 px-6 text-center">Total Amount</th>
                                        <th className="py-3 px-6 text-center">Status</th>
                                        <th className="py-3 px-6 text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="text-gray-600 text-sm font-light">
                                    {allOrder && allOrder.map((order, index) => (
                                        <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                                            <td className="py-3 px-2 text-left whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <span className="font-medium">{order.id}</span>
                                                </div>
                                            </td>
                                            <td className="py-3 px-6 text-left">
                                                {order.products.map((item,index )=> (
                                                    <div key={index} className="flex items-center">
                                                        <div className="mr-2">
                                                            <img
                                                                className="w-6 h-6 rounded-full"
                                                                src={item.thumbnail}
                                                                alt={item.title}
                                                            />
                                                        </div>
                                                        <span>{item.title} #{item.quantity}</span>
                                                    </div>
                                                ))}
                                            </td>
                                            <td className="py-3 px-6 text-center">
                                                <div className="flex items-center justify-center">
                                                    {order.address.streetAddress}-{order.address.city}-{order.address.postalCode}
                                                </div>
                                            </td>
                                            <td className="py-3 px-6 text-center">
                                                <div className="flex items-center justify-center">
                                                    {order.price}
                                                </div>
                                            </td>
                                            <td className="py-3 px-6 text-center">
                                                {orderStatus === order.id ? <select onChange={(e) => HandleStatus(e, order)}>
                                                    <option value="pending">Pending</option>
                                                    <option value="dispatched">Dipatched</option>
                                                    <option value="delivered">Delivered</option>
                                                    <option value="canceled">Canceled</option>
                                                </select> : <span className="bg-purple-200 text-purple-600 py-1 px-3 rounded-full text-xs">
                                                    {order.status}
                                                </span>
                                                }
                                            </td>
                                            <td className="py-3 px-6 text-center">
                                                <div className="flex item-center justify-center">
                                                    <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            stroke="currentColor"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                            />
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                                            />
                                                        </svg>
                                                    </div>
                                                    <div onClick={e => HandleOrderStatus(order)} className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            stroke="currentColor"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                                            />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}

                                </tbody>
                            </table>
                            <Pagination HandlePage={HandlePage} page={page} setPage={setPage} totalItems={TotalOrder} />
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default AdminOrderList