export default async function fetchRequest (path, methods, payload) {
  try {
    const fetchBody = {
      method: methods,
      headers: {
        'Content-type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token')
      },
      body: JSON.stringify(payload)
    }
    if (path === 'auth/login' || path === 'auth/register') {
      delete fetchBody.headers.Authorization
    }
    if (methods === 'GET' || methods === 'DELETE') {
      delete fetchBody.body
    }
    const response = await fetch(`http://localhost:5005/admin/${path}`, fetchBody)
    const data = await response.json();
    return data;
  } catch (err) {
    console.log('err is ', err)
  }
}
