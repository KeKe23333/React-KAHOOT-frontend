export default async function fetchRequest (path, methods, payload) {
  try {
    const response = await fetch(`http://localhost:5005/admin/${path}`, {
      method: methods,
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(payload)
    })
    const data = await response.json();
    console.log('fetch respons is', data)
    if (data.token) { 
      localStorage.setItem('token', data.token);
    }
  } catch (err) {
    console.log('err is ', err)
  }
}
