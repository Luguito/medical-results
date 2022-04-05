const apiUrl = "https://huninorte.herokuapp.com/api"

export const get = (url: string, options: RequestInit): Promise<any> => {
    return fetch(`${apiUrl}/${url}`, { method: 'GET' }).then(response => response.json());
}

export const post = (url: string, data: any, options: RequestInit): Promise<any> => {
    return fetch(`${apiUrl}/${url}`, { method: 'POST', body: JSON.stringify(data) }).then(response => response.json());
}