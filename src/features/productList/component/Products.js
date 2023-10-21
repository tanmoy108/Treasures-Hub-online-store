import React from 'react';
import { useSelector } from 'react-redux';
import { selectProduct, selectProductStatus } from '../ProductSlice';
import { Link } from 'react-router-dom';
import { StarIcon } from '@heroicons/react/24/solid';
import { selectUserInfo } from '../../user/userSlice';
import { discountPrice } from '../../../app/constant';
import { InfinitySpin } from 'react-loader-spinner'


export default function Products() {
  const productArray = useSelector(selectProduct);
  const userInfo = useSelector(selectUserInfo);
  const status = useSelector(selectProductStatus);

  return (
    <div className="bg-white">
      {userInfo && userInfo.role === "admin" && <Link
        type="button"
        to="/admin/addProduct"
        className="cursor-pointer text-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Add Product
      </Link>}
      <div className="mx-auto max-w-2xl px-4  sm:px-6  lg:max-w-7xl lg:px-8">
        {status === "loading" ? <div className='w-full flex justify-center ' ><InfinitySpin
          width='200'
          color="#4fa94d"
        /></div> : null}
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {productArray.length>0 && productArray.map((product,index) => (
            <div key={index}>
              <Link to={`/specificProduct/${product.id}`} >
                <div key={product.id} className="group relative shadow-md p-2 rounded-md">
                  <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-60">
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                    />
                  </div>
                  <div className="mt-4 h-16 overflow-hidden flex justify-between">
                    <div>
                      <h3 className="text-sm text-gray-800">
                        <p>
                          <span aria-hidden="true" className="absolute inset-0" />
                          {product.title}
                        </p>
                      </h3>
                      <div className='flex flex-row items-center' >
                        <StarIcon className='h-4 w-4 mr-2 text-amber-600' />
                        <p className="text-sm text-amber-600">{product.rating}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">${discountPrice(product)}</p>
                      <p className="text-sm font-medium line-through text-gray-500">${product.price}</p>
                    </div>
                  </div>
                </div>
              </Link>
              {userInfo && userInfo.role === "admin" && <Link
                type="button"
                to={`/admin/addProduct/${product.id}`}

                className="w-full cursor-pointer text-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Edit Product
              </Link>}

              <div>
                {userInfo && userInfo.role === "admin" && product.deleted && <p className='text-red-500 text-center' > Deleted</p>}
                {product.stock <= 0 && <p className='bg-red-700 text-white text-center' > Out of Stock</p>}
              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
