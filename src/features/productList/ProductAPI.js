export function fetchAllProduct() {
  return new Promise(async (resolve) => {
    const response = await fetch('/products')
    const data = await response.json()
    resolve({ data })
  });
}

export function fetchFilterProduct(filterSelect, sortSelect, pagination,admin) {
  let str = '';
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
  if(admin)
  {
    str += `admin=true`
  }
 
  return new Promise(async (resolve) => {
    const response = await fetch(`/products?` + str)
    const data = await response.json()
    const totalitem = await response.headers.get('X-Total-Count')
    resolve({ data: { products: data, totalItems: +totalitem } })
  });
}

export function fetchAllCategories() {
  return new Promise(async (resolve) => {
    const response = await fetch('/categories')
    const data = await response.json()
    resolve({ data })
  });
}
export function fetchAllBrands() {
  return new Promise(async (resolve) => {
    const response = await fetch('/brands')
    const data = await response.json()
    resolve({ data })
  });
}
export function fetchProductById(id) {
  return new Promise(async (resolve) => {
    const response = await fetch('/products/' + id)
    const data = await response.json()
    resolve({ data })
  });
}
export function postProduct(newData) {
  return new Promise(async (resolve) => {
    const response = await fetch('/products/',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newData)
    })
    const data = await response.json()
    resolve({ data })
  });
}
export function patchProduct(newData) {
  return new Promise(async (resolve) => {
    const response = await fetch('/products/'+newData.id,
    {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newData)
    })
    const data = await response.json()
    resolve({ data })
  });
}


