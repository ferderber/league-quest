export async function handleResponse (response) {
  const body = await response.json();
  if (response.status < 300 && response.status >= 200) {
    return body;
  }
  if (body) {
    throw body;
  }
  throw response.statusText;
}
export function getHeaders () {
  const token = localStorage.getItem('token');
  const headers = new Headers();
  if (token) {
    headers.append('Authorization', `Bearer ${token}`);
  }
  headers.append('Content-Type', 'application/json');
  return headers;
}
