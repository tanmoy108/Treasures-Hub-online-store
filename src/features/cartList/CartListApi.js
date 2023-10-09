export function PostCart(cart) {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8000/carts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cart)
    })
    const data = await response.json()
    console.log("dataaa", data)
    resolve({ data })
  });
}
export function GetCart(id) {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8000/carts?userId=' + id)
    const data = await response.json()
    // console.log("dataaa",data)
    resolve({ data })
  });
}

export function PatchCart(item) {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8000/carts/' + item.id, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item)
    })
    const data = await response.json()
    // console.log("dataaa",data)
    resolve({ data })
  });
}
export function DeleteCart(id) {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8000/carts/' + id, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    })
    const data = await response.json()
    console.log("dataaa", data)
    resolve({ data })
  });
}

export function ClearCart(userid) {
  return new Promise(async (resolve) => {
    const response = await GetCart(userid)
    const data = await response.data
    for (let item of data) {
      await DeleteCart(item.id)
    }

    resolve({ status: "success" })
  });
}