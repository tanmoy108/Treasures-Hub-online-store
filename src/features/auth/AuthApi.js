export function PostUsers(userData) {
  return new Promise(async (resolve) => {

    const response = await fetch('/auth/signup',
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
export function LoginUsers(userData) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch('/auth/signin',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(userData)
        })
      if (response.ok) {
        const data = await response.json()
        resolve({data})
      } else {
        const err = await response.json()
        reject(err)
      }
    } catch (error) {
      reject(error)
    }

  });
}
export function CheckAuth() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch('/auth/check')
      if (response.ok) {
        const data = await response.json()
        resolve({data})
      } else {
        const err = await response.json()
        reject(err)
      }
    } catch (error) {
      reject(error)
    }

  });
}
export function logout() {
  return new Promise(async (resolve) => {
    resolve({ status: "success" })
  });
}
