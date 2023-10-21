export function fetchUserOrder() {
  return new Promise(async (resolve) =>{
    const response = await fetch(`/orders/user`) 
    const data = await response.json()
    resolve({data})
  });
}
export function fetchUserInfo() {
  return new Promise(async (resolve) =>{
    const response = await fetch('/users/info') 
    const data = await response.json()
    resolve({data})
  });
}

export function PatchUsers(userData) {
  return new Promise(async (resolve) => {

    const response = await fetch('/users/update',
      {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      }
    )
    const data = await response.json()
    resolve({ data })
  });
}