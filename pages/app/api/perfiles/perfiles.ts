// const apiUrl = new URL("https://huninorte.herokuapp.com/api")
const apiUrl = new URL("http://172.23.0.10:4000/api/profile")

export const get = (url: string, options: RequestInit, params?: {}): Promise<any> => {
    return fetch(`${apiUrl}/${url}${params ? `?${new URLSearchParams(params)}` : ''}`, { method: 'GET',  headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`, 'Content-Type': 'application/json'}, ...options }).then(response => response.json());
}

export const post = (url: string, data: any, options: RequestInit): Promise<any> => {
    return fetch(`${apiUrl}/${url}`, { method: 'POST', body: JSON.stringify(data), headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}`, 'Content-Type': 'application/json'} }).then(response => response.json());
}

export const put = (url: string, data: any, options: RequestInit): Promise<any> => {
    return fetch(`${apiUrl}/${url}`, { method: 'PUT', body: JSON.stringify(data), headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}`, 'Content-Type': 'application/json' }, ...options }).then(response => response.json());
}

export default {
    get,
    post,
    put,
}