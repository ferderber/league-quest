import { handleResponse, getHeaders } from '@/api/helper';

export async function login (credentials) {
  return fetch((process.env.API_URL ? process.env.API_URL : '/api') + '/user/authenticate', {
    method: 'post',
    headers: getHeaders(),
    body: JSON.stringify(credentials)
  }).catch(() => Promise.reject({ message: 'Server is not responding' })).then(handleResponse);
}
export async function signup (credentials) {
  return fetch((process.env.API_URL ? process.env.API_URL : '/api') + '/user', {
    method: 'POST',
    body: JSON.stringify(credentials),
    headers: getHeaders()
  }).catch(() => Promise.reject({ message: 'Server is not responding' })).then(handleResponse);
}
export async function getUser () {
  return fetch((process.env.API_URL ? process.env.API_URL : '/api') + '/user', {
    method: 'get',
    headers: getHeaders()
  }).catch(() => Promise.reject({ message: 'Server is not responding' })).then(handleResponse);
}
export async function getStats () {
  return fetch((process.env.API_URL ? process.env.API_URL : '/api') + '/user/stats/100', {
    method: 'get',
    headers: getHeaders()
  }).catch(() => Promise.reject({ message: 'Server is not responding' })).then(handleResponse);
}
export async function patchUser (userPatch) {
  return fetch(`${process.env.API_URL ? process.env.API_URL : '/api'}/user`, {
    method: 'PATCH',
    headers: getHeaders(),
    body: JSON.stringify(userPatch)
  }).catch(() => Promise.reject({ message: 'Server is not responding' })).then(handleResponse);
}
