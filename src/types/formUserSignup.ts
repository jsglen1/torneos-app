export enum TypeDefineRolUser {
    user = 'user',
    admin = 'admin',
    super_admin = 'super_admin',
}

export interface TypeFormUserSignup {
    name: string
    email: string
    password: string
    role: TypeDefineRolUser
}