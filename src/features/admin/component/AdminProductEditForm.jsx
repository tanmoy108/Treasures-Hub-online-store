import React, { useEffect } from 'react'
import { useForm } from "react-hook-form"
import { clearSpecificProduct, patchProductAsync, postProductAsync, selectBrandCount, selectCategoryCount, selectSpecificProduct, specificProductAsync } from '../../productList/ProductSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

const AdminProductEditForm = () => {
    const category = useSelector(selectCategoryCount)
    const brand = useSelector(selectBrandCount)
    const product = useSelector(selectSpecificProduct)
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const params = useParams();
    const {
        register,
        handleSubmit,
        reset,
        setValue,
    } = useForm()


    useEffect(() => {
        if (params.id) {
            dispatch(specificProductAsync(params.id))
        } else dispatch(clearSpecificProduct())
    }, [dispatch, params.id])


    useEffect(() => {
        if (params.id && product) {

            setValue("title", product.title)
            setValue("description", product.description)
            setValue("price", product.price)
            setValue("discountPercentage", product.discountPercentage)
            setValue("rating", product.rating)
            setValue("stock", product.stock)
            setValue("brand", product.brand)
            setValue("category", product.category)
            setValue("thumbnail", product.thumbnail)
            setValue("image1", product.images[0])
            setValue("image2", product.images[1])
            setValue("image3", product.images[2])
            setValue("image4", product.images[3])
        }

    }, [product,setValue, dispatch, params.id])


    const HandleData = (data) => {
        const newData = { ...data };
        newData.images = [];
        newData.images[0] = data.image1
        newData.images[1] = data.image2
        newData.images[2] = data.image3
        newData.images[3] = data.image4
        newData.price = +newData.price
        newData.stock = +newData.stock
        newData.discountPercentage = +newData.discountPercentage
        newData.rating = product ? product.raing : 0
        delete newData.image1
        delete newData.image2
        delete newData.image3
        delete newData.image4
        if (params.id) {
            newData.id = params.id
            dispatch(patchProductAsync(newData))
            reset()
        } else {
            dispatch(postProductAsync(newData))
            reset()
        }
    }

    const HandleDelete = () => {
        const deleteData = { ...product }
        deleteData.deleted = true;
        dispatch(patchProductAsync(deleteData))
        reset()
        navigate("/admin")
    }


    return (
        <form noValidate onSubmit={handleSubmit((data) => {
            HandleData(data)
        })} >
            <div className="space-y-12 px-5">
                <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">Product Generator</h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                        This information will be displayed publicly so be careful what you share.
                    </p>

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-4">
                            <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
                                Product Title
                            </label>
                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 sm:max-w-md">
                                    <input
                                        type="text"
                                        {...register("title")}
                                        id="title"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="col-span-full">
                            <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                                Description
                            </label>
                            <div className="mt-2">
                                <textarea
                                    id="description"
                                    {...register("description")}
                                    rows={3}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    defaultValue={''}
                                />
                            </div>
                            <p className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about yourself.</p>
                        </div>
                    </div>
                </div>

                <div className="border-b border-gray-900/10 pb-12">
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-2">
                            <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">
                                Price
                            </label>
                            <div className="mt-2">
                                <input
                                    type="number"
                                    {...register("price")}
                                    id="price"
                                    autoComplete="given-name"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-2">
                            <label htmlFor="stock" className="block text-sm font-medium leading-6 text-gray-900">
                                Stock
                            </label>
                            <div className="mt-2">
                                <input
                                    type="number"
                                    {...register("stock")}
                                    id="stock"
                                    autoComplete="family-name"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="discountPercentage" className="block text-sm font-medium leading-6 text-gray-900">
                                DiscountPercentage
                            </label>
                            <div className="mt-2">
                                <input
                                    type="number"
                                    {...register("discountPercentage")}
                                    id="discountPercentage"
                                    autoComplete="family-name"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>


                        <div className="sm:col-span-2">
                            <label htmlFor="category" className="block text-sm font-medium leading-6 text-gray-900">
                                Category
                            </label>
                            <div className="mt-2">
                                <select
                                    id="category"
                                    {...register("category")}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                >
                                    <option>Choose Category</option>
                                    {category.map((item,index) =>
                                        <option key={index} value={item.value}>{item.label}</option>
                                    )}

                                </select>
                            </div>
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="brand" className="block text-sm font-medium leading-6 text-gray-900">
                                Brand
                            </label>
                            <div className="mt-2">
                                <select
                                    id="brand"
                                    {...register("brand")}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                >
                                    <option>Choose brand</option>
                                    {brand.map((item,index) =>
                                        <option key={index} value={item.value}>{item.label}</option>
                                    )}
                                </select>
                            </div>
                        </div>

                        <div className="col-span-full">
                            <label htmlFor="thumbnail" className="block text-sm font-medium leading-6 text-gray-900">
                                Thumbnail
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    {...register("thumbnail")}
                                    id="thumbnail"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-2 sm:col-start-1">
                            <label htmlFor="image1" className="block text-sm font-medium leading-6 text-gray-900">
                                image1
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    {...register("image1")}
                                    id="image1"
                                    autoComplete="address-level2"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-1">
                            <label htmlFor="image2" className="block text-sm font-medium leading-6 text-gray-900">
                                Image2
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    {...register("image2")}
                                    id="image2"
                                    autoComplete="address-level1"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-1">
                            <label htmlFor="image3" className="block text-sm font-medium leading-6 text-gray-900">
                                Image3
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    {...register("image3")}
                                    id="image3"
                                    autoComplete="image3"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="image4" className="block text-sm font-medium leading-6 text-gray-900">
                                Image4
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    {...register("image4")}
                                    id="image4"
                                    autoComplete="image4"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                    </div>
                </div>

            
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6 px-5">
                <button onClick={() => reset()} type="button" className="text-sm font-semibold leading-6 text-gray-900">
                    Cancel
                </button>
                {product && <button onClick={() => HandleDelete()} type="button" className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                    Delete
                </button>}
                <button
                    type="submit"
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Save
                </button>
            </div>
        </form>
    )
}

export default AdminProductEditForm