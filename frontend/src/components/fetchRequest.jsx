export default async function fetchRequest (path, methods, payload, success) {
  const response = await fetch(`http://localhost:5005/admin/${path}`, {
    method: methods,
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(payload)
  })
  const data = await response.json();
  success(data.token);
}
