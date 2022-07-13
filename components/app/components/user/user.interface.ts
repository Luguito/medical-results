export interface IUser {
    fullname: string
    firstName: string
    role: 'patient' | 'admin' | string
    ccid: string,
    permissions: string
}