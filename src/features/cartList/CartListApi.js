export function PostCart(cart) {
  return new Promise(async (resolve) => {
    const response = await fetch('/carts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cart)
    })
    const data = await response.json()
    resolve({ data })
  });
}
export function GetCart() {
  return new Promise(async (resolve) => {
    const response = await fetch('/carts')
    const data = await response.json()
    resolve({ data })
  });
}

export function PatchCart(item) {
  return new Promise(async (resolve) => {
    const response = await fetch('/carts/'+item.id, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item)
    })
    const data = await response.json()
    resolve({ data })
  });
}
export function DeleteCart(id) {
  return new Promise(async (resolve) => {
    const response = await fetch('/carts/'+id, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    })
    const data = await response.json()
    resolve({ data })
  });
}

export function ClearCart() {
  return new Promise(async (resolve) => {
    const response = await GetCart()
    const data = await response.data
    for (let item of data) {
      await DeleteCart(item.id)
    }

    resolve({ status: "success" })
  });
}