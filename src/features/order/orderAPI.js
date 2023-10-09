export function PostOrder(item) {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8000/orders',
      {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item)
      })
    const data = await response.json()
    resolve({ data })
  });
}