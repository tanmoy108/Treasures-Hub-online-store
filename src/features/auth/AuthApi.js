export function PostUsers(userData) {
  return new Promise(async (resolve) => {

    const response = await fetch('http://localhost:8000/users',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      }
    )
    const data = await response.json()
    resolve({ data })
  });
}
export function fetchUsers(userData) {
  return new Promise(async (resolve, reject) => {
    const email = userData.email;
    const password = userData.password;
    console.log({ email, password })

    const response = await fetch('http://localhost:8000/users?email=' + email)
    const data = await response.json()
    if (data.length) {
      console.log("true", data);
      if (password === data[0].password) {
        resolve({ data: data[0] })
      } else reject({ message: 'wrong information' })
    } else
      reject({ message: 'wrong information' })
  });
}
