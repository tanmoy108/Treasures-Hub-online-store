export function PostOrder(item) {
  return new Promise(async (resolve) => {
    const response = await fetch('/orders',
      {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item)
      })
    const data = await response.json()
    resolve({ data })
  });
}
export function GetOrder(pagination) {
  let str = '';
  for (let key in pagination) {
    str += `${key}=${pagination[key]}&`
  }
  return new Promise(async (resolve) => {
    const response = await fetch(`/orders?` + str)
    const data = await response.json()
    const totalOrder = await response.headers.get('X-Total-Count')
    resolve({ data: { orders: data, totalOrders: +totalOrder } })
  })}

  export function PatchOrder(order) {
    return new Promise(async (resolve) => {
      const response = await fetch('/orders/'+order.id,
        {
          method: "PATCH",
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(order)
        })
      const data = await response.json()
      resolve({ data })
    });
  }