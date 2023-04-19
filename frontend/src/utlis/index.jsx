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
    if (payload === null) {
      delete fetchBody.body
    }
    // check if this request need a Authorization header
    if (path.slice(0, 6) === 'player' || path === 'admin/auth/login' || path === 'admin/auth/register') {
      delete fetchBody.headers.Authorization
    }
    const response = await fetch(`http://localhost:5005/${path}`, fetchBody)
    const data = await response.json();
    return data;
  } catch (err) {
    console.log('err is ', err)
  }
}
