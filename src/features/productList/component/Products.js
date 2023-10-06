import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectProduct } from '../ProductSlice';
import { Link } from 'react-router-dom';
import { StarIcon } from '@heroicons/react/24/solid';


export default function Products() {
  const productArray = useSelector(selectProduct);
  // const dispatch = useDispatch();
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4  sm:px-6  lg:max-w-7xl lg:px-8">
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {productArray.map((product) => (
            <Link to="/specificProduct" >
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
                    <p className="text-sm font-medium text-gray-900">${Math.round(product.price * (1 - product.discountPercentage / 100))}</p>
                    <p className="text-sm font-medium line-through text-gray-500">${product.price}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}