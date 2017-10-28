import { handleResponse, getHeaders } from '@/api/helper';

export async function acceptQuest (quest) {
  return fetch((process.env.API_URL ? process.env.API_URL : '/api') + '/quest/' + quest.id + '/activate', {
    method: 'POST',
    headers: getHeaders()
  }).catch(() => Promise.reject({ message: 'Server is not responding' })).then(handleResponse);
}
export async function getQuests () {
  return fetch((process.env.API_URL ? process.env.API_URL : '/api') + '/quest', {
    method: 'GET',
    headers: getHeaders()
  }).catch(() => Promise.reject({ message: 'Server is not responding' })).then(handleResponse);
}
export async function updateQuests () {
  return fetch((process.env.API_URL ? process.env.API_URL : '/api') + '/quest/update', {
    method: 'POST',
    headers: getHeaders()
  }).catch(() => Promise.reject({ message: 'Server is not responding' })).then(handleResponse);
}
export async function getQuestOffers () {
  return fetch((process.env.API_URL ? process.env.API_URL : '/api') + '/quest', {
    method: 'POST',
    headers: getHeaders()
  }).catch(() => Promise.reject({ message: 'Server is not responding' })).then(handleResponse);
}
