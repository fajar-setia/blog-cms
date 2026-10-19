import { Head } from '@inertiajs/react';
import LoginForm from '../components/LoginForm';

export default function Login() {
    return (
        <>
            <Head title="Login - Blog CMS" />

            <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
                <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-md">
                    <div className="mb-8 text-center">
                        <h1 className="text-3xl font-bold text-slate-800">
                            Welcome Back
                        </h1>

                        <p className="mt-2 text-sm text-slate-500">
                            Sign in to manage your blog
                        </p>
                    </div>

                    <LoginForm />
                </div>
            </main>
        </>
    );
}