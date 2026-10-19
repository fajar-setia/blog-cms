import { router } from '@inertiajs/react';

import type {
    LoginCredentials,
    RegisterCredentials,
} from '../types/auth.types';

export const authService = {
    login: (data: LoginCredentials) => {
        router.post('/login', {...data});
    },

    register: (data: RegisterCredentials) => {
        router.post('/register', {...data});
    },

    logout: () => {
        router.post('/logout');
    },
};