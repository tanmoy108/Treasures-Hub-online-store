export const ITEMS_IN_PAGE = 12;
export const discountPrice = (product) =>{
    return Math.round(product.price * (1 - product.discountPercentage / 100))
}
// export const OrderPrice = (price) =>{
//     return Math.round(price * (1 - product.discountPercentage / 100))
// }