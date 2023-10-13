export const ITEMS_IN_PAGE = 12;
export const dicountPrice = (product) =>{
    return Math.round(product.price * (1 - product.discountPercentage / 100))
}