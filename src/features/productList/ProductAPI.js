export function fetchAllProduct() {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8000/products')
    const data = await response.json()
    resolve({ data })
  });
}

export function fetchFilterProduct(filterSelect, sortSelect, pagination) {
  let str = '';
  console.log(filterSelect, sortSelect)
  for (let key in filterSelect) {
    const categoriesArray = filterSelect[key];
    if (categoriesArray.length) {
      const lastValueOfArray = categoriesArray[categoriesArray.length - 1];
      str += `${key}=${lastValueOfArray}&`
    }
  }
  for (let key in sortSelect) {
    str += `${key}=${sortSelect[key]}&`
  }
  for (let key in pagination) {
    str += `${key}=${pagination[key]}&`
  }
  return new Promise(async (resolve) => {
    const response = await fetch(`http://localhost:8000/products?` + str)
    console.log(response)
    const data = await response.json()
    const totalitem = await response.headers.get('X-Total-Count')
    resolve({ data:{products:data,totalItems:+totalitem} })
  });
}

