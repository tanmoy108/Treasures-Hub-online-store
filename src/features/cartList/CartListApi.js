export function PostCart(cart) {
  return new Promise(async (resolve) =>{
    const response = await fetch('http://localhost:8000/carts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cart)
    }) 
    const data = await response.json()
    console.log("dataaa",data)
    resolve({data})
  });
}
export function GetCart(id) {
  return new Promise(async (resolve) =>{
    const response = await fetch('http://localhost:8000/carts?userId='+id) 
    const data = await response.json()
    console.log("dataaa",data)
    resolve({data})
  });
}
