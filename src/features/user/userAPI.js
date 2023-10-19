export function fetchUserOrder() {
  return new Promise(async (resolve) =>{
    const response = await fetch(`http://localhost:8000/orders/user`) 
    const data = await response.json()
    resolve({data})
  });
}
export function fetchUserInfo() {
  return new Promise(async (resolve) =>{
    const response = await fetch('http://localhost:8000/users/info') 
    const data = await response.json()
    resolve({data})
  });
}

export function PatchUsers(userData) {
  return new Promise(async (resolve) => {

    const response = await fetch('http://localhost:8000/users/update',
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