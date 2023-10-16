import React from 'react';
import CartBox from './CartBox';
import CartButton from './CartButton';

export default function CartList() {
  return (
    <>
    <div>
        <div className="mx-auto mt-12 bg-white max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
            <h1 className="text-4xl my-5 font-bold tracking-tight text-gray-900">
              Cart
            </h1>
            <div className="flow-root">
              <CartBox />
            </div>
          </div>

          <CartButton/>
        </div>
      </div>
    </>
  )
}
