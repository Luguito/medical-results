// const apiUrl = new URL("https://huninorte.herokuapp.com/api/lab-orders");
const apiUrl = new URL("http://localhost:4000/api/lab-orders")

export const get = (url: string, options: RequestInit, params?: {}): Promise<any> => {
    // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTA0LCJjY2lkIjoiMTc4NDE5NDIiLCJpYXQiOjE2NTQyNzk1NzgsImV4cCI6MThttp://localhostNDcxMTU3OH0.hvVdWvroubyTx2rRkSG1AO9vNI6xr7zcB7jjoPAp044'
    return fetch(`${apiUrl}${url.length == 0 ? '?' + new URLSearchParams(params) : `/${url}`}`, { method: 'GET',  headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`, 'Content-Type': 'application/json'}, ...options }).then(response => response.json());
}

export const post = (url: string, data: any, options: RequestInit): Promise<any> => {
    return fetch(`${apiUrl}/${url}`, { method: 'POST', body: JSON.stringify(data), headers: { 'Content-Type': 'application/json', ...options?.headers }, ...options }).then(response => response.json());
}

export const put = (url: string, data: any, options: RequestInit): Promise<any> => {
    return fetch(`${apiUrl}/${url}`, { method: 'PUT', body: JSON.stringify(data), headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}`, 'Content-Type': 'application/json' }, ...options }).then(response => response.json());
}


export default {
    get,
    post,
    put,
}