export interface LoginCredentials {
    email: string;
    password: string;
    remember: boolean;
}

export interface RegisterCredentials {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
}

export interface User {
    id: number;
    name: string;
    email: string;
    role: 'admin' | 'author';
}