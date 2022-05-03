export interface IUser {
    fullname: string
    firstName: string
    role: 'patient' | 'admin'
    ccid: string,
    permissions: string
}