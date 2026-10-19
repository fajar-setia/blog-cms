import { usePage } from '@inertiajs/react';
import type { AuthPageProps } from '../types/auth';

export function useAuth() {
    const { auth } = usePage().props as unknown as AuthPageProps;

    const user = auth?.user ?? null;

    return {
        user,
        isAuthenticated: user !== null,
        isAdmin: user?.role === 'admin',
        isAuthor: user?.role === 'author',
    };
}