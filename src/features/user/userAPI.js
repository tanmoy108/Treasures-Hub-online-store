export function fetchUserOrder(userId) {
  return new Promise(async (resolve) =>{
    const response = await fetch('http://localhost:8000/orders?userId='+userId) 
    const data = await response.json()
    resolve({data})
  });
}
export function fetchUserInfo(id) {
  return new Promise(async (resolve) =>{
    const response = await fetch('http://localhost:8000/users/'+id) 
    const data = await response.json()
    resolve({data})
  });
}

export function PatchUsers(userData) {
  return new Promise(async (resolve) => {

    const response = await fetch('http://localhost:8000/users/' + userData.id,
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