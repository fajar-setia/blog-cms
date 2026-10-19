export type UserRole = 'admin' | 'author';

export interface AuthUser {
    id: number;
    name: string;
    email: string;
    role: UserRole;
}

export interface AuthPageProps {
    auth: {
        user: AuthUser | null;
    };
}