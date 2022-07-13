// const apiUrl = new URL("https://huninorte.herokuapp.com/api/cup")
const apiUrl = new URL("http://localhost:4000/api/cup")

export const get = (url: string, options: RequestInit, params?: {}): Promise<any> => {
    return fetch(`${apiUrl}${url ? `/${url}` : ''}${params ? `?${new URLSearchParams(params)}` : ''}`, { method: 'GET',  headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`, 'Content-Type': 'application/json'}, ...options }).then(response => response.json());
}

export const post = (url: string, data: any, options: RequestInit): Promise<any> => {
    return fetch(`${apiUrl}/${url}`, { method: 'POST', body: JSON.stringify(data), headers: { 'Content-Type': 'application/json', ...options?.headers }, ...options }).then(response => response.json());
}

export const put = (url: string, data: any, options: RequestInit): Promise<any> => {
    return fetch(`${apiUrl}/${url}`, { method: 'PUT', body: JSON.stringify(data), headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}`, 'Content-Type': 'application/json' }, ...options }).then(response => response.json());
}

export const remove = (url: string, data: any, options: RequestInit): Promise<any> => {
    return fetch(`${apiUrl}/${url}`, { method: 'DELETE', body: JSON.stringify(data), headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}`, 'Content-Type': 'application/json' }, ...options }).then(response => response.json());
}

export default {
    get,
    post,
    put,
    remove
}